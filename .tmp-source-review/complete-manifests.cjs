const fs = require('node:fs');
const path = require('node:path');
const yaml = require('./validation/node_modules/js-yaml');
const root = path.resolve(__dirname, '../kubernetes-learning-lab/04-bookshop-operations');
const ns = 'k8s-learning-operations';
const clone = x => JSON.parse(JSON.stringify(x));
let count = 0;
function write(name, data) {
  const dest = path.join(root, name);
  if (fs.existsSync(dest)) throw Error('Refusing to overwrite ' + dest);
  fs.mkdirSync(path.dirname(dest), {recursive: true});
  fs.writeFileSync(dest, data, 'utf8'); count++;
}
function save(name, ...docs) { write(name, docs.map(d => yaml.dump(d, {lineWidth: 110, noRefs: true})).join('---\n')); }
const security = {runAsNonRoot:true, runAsUser:1000, runAsGroup:1000, fsGroup:1000, seccompProfile:{type:'RuntimeDefault'}};
const containerSecurity = {allowPrivilegeEscalation:false, readOnlyRootFilesystem:true, capabilities:{drop:['ALL']}};
function container(name='worker', script='exec sleep 3600') {
  return {name, image:'busybox:1.36', command:['/bin/sh','-c'], args:[script], resources:{requests:{cpu:'5m',memory:'8Mi'},limits:{cpu:'50m',memory:'32Mi'}},securityContext:clone(containerSecurity)};
}
function pod(name, labels={}) {
  return {apiVersion:'v1',kind:'Pod',metadata:{name,namespace:ns,labels},spec:{automountServiceAccountToken:false,nodeSelector:{'kubernetes.io/os':'linux'},terminationGracePeriodSeconds:15,securityContext:clone(security),containers:[container()]}};
}
function obj(apiVersion,kind,name,spec) { return {apiVersion,kind,metadata:{name,namespace:ns},spec}; }
const base = yaml.load(fs.readFileSync(path.join(root,'manifests/20-deployment.yaml'),'utf8'));
function deployment(name) {
  const d=clone(base); d.metadata.name=name; d.spec.selector.matchLabels.app=name; d.spec.template.metadata.labels.app=name; return d;
}
function cm(name,data) { return {apiVersion:'v1',kind:'ConfigMap',metadata:{name,namespace:ns},data}; }
const p26=pod('placement-worker');
delete p26.spec.nodeSelector;
p26.spec.affinity={nodeAffinity:{requiredDuringSchedulingIgnoredDuringExecution:{nodeSelectorTerms:[{matchExpressions:[{key:'kubernetes.io/os',operator:'In',values:['linux']}]}]}}};
p26.spec.tolerations=[{key:'dedicated',operator:'Equal',value:'bookshop',effect:'NoSchedule'}];
p26.spec.containers[0].env=[{name:'NODE_NAME',valueFrom:{fieldRef:{fieldPath:'spec.nodeName'}}}];
p26.spec.containers[0].args=['echo "Placed on $NODE_NAME"; exec sleep 3600'];
save('topics/26-node-placement/manifests/10-placement.yaml',p26);
const helper=pod('nearby-helper');
helper.spec.affinity={podAffinity:{requiredDuringSchedulingIgnoredDuringExecution:[{labelSelector:{matchLabels:{app:'bookshop-ops'}},topologyKey:'kubernetes.io/hostname'}]}};
save('topics/27-pod-placement/manifests/10-nearby-helper.yaml',helper);
const spread=deployment('spread-display');
spread.spec.template.spec.affinity={podAntiAffinity:{preferredDuringSchedulingIgnoredDuringExecution:[{weight:100,podAffinityTerm:{labelSelector:{matchLabels:{app:'spread-display'}},topologyKey:'kubernetes.io/hostname'}}]}};
save('topics/27-pod-placement/manifests/20-spread-deployment.yaml',spread);
save('topics/28-horizontal-autoscaling/manifests/10-load-off.yaml',cm('scale-load',{enabled:'false'}));
save('topics/28-horizontal-autoscaling/variants/10-load-on.yaml',cm('scale-load',{enabled:'true'}));
const scale=deployment('scale-demo');
delete scale.spec.replicas;
const worker=container('worker','set -eu\nif [ "$(cat /load/enabled)" = "true" ]; then\n  echo "Starting at most 120 seconds of CPU work"\n  timeout 120 sh -c \'while :; do :; done\' || true\nfi\necho "Idle"\nexec sleep 86400\n');
worker.resources={requests:{cpu:'100m',memory:'16Mi'},limits:{cpu:'200m',memory:'32Mi'}};
worker.volumeMounts=[{name:'load',mountPath:'/load',readOnly:true}];
scale.spec.template.spec.containers=[worker];
scale.spec.template.spec.volumes=[{name:'load',configMap:{name:'scale-load'}}];
save('topics/28-horizontal-autoscaling/manifests/20-scale-deployment.yaml',scale);
save('topics/28-horizontal-autoscaling/manifests/30-hpa.yaml',obj('autoscaling/v2','HorizontalPodAutoscaler','scale-demo',{scaleTargetRef:{apiVersion:'apps/v1',kind:'Deployment',name:'scale-demo'},minReplicas:1,maxReplicas:3,metrics:[{type:'Resource',resource:{name:'cpu',target:{type:'Utilization',averageUtilization:50}}}],behavior:{scaleDown:{stabilizationWindowSeconds:60}}}));
save('topics/29-resource-and-node-autoscaling/optional/10-vpa.yaml',obj('autoscaling.k8s.io/v1','VerticalPodAutoscaler','bookshop-sizing',{targetRef:{apiVersion:'apps/v1',kind:'Deployment',name:'bookshop-ops'},updatePolicy:{updateMode:'Off'}}));
save('topics/30-network-policies/manifests/10-visitors.yaml',pod('visitor-approved',{access:'approved'}),pod('visitor-blocked',{access:'unapproved'}));
save('topics/30-network-policies/policy/20-catalog-ingress.yaml',obj('networking.k8s.io/v1','NetworkPolicy','catalog-approved-visitors',{podSelector:{matchLabels:{app:'bookshop-ops'}},policyTypes:['Ingress'],ingress:[{from:[{podSelector:{matchLabels:{access:'approved'}}}],ports:[{protocol:'TCP',port:8080}]}]}));
save('topics/31-rbac-and-service-accounts/manifests/10-serviceaccount.yaml',{apiVersion:'v1',kind:'ServiceAccount',metadata:{name:'stock-observer',namespace:ns},automountServiceAccountToken:false});
save('topics/31-rbac-and-service-accounts/manifests/20-role.yaml',{apiVersion:'rbac.authorization.k8s.io/v1',kind:'Role',metadata:{name:'pod-observer',namespace:ns},rules:[{apiGroups:[''],resources:['pods'],verbs:['get','list','watch']}]});
save('topics/31-rbac-and-service-accounts/manifests/30-rolebinding.yaml',{apiVersion:'rbac.authorization.k8s.io/v1',kind:'RoleBinding',metadata:{name:'stock-observer',namespace:ns},subjects:[{kind:'ServiceAccount',name:'stock-observer',namespace:ns}],roleRef:{apiGroup:'rbac.authorization.k8s.io',kind:'Role',name:'pod-observer'}});
const observer=pod('stock-observer'); observer.spec.serviceAccountName='stock-observer';
save('topics/31-rbac-and-service-accounts/manifests/40-observer.yaml',observer);
save('topics/33-storage-classes/manifests/10-pvc.yaml',obj('v1','PersistentVolumeClaim','bookshop-locker',{accessModes:['ReadWriteOnce'],resources:{requests:{storage:'1Gi'}}}));
const locker=pod('locker-reader');
locker.spec.containers[0].volumeMounts=[{name:'locker',mountPath:'/data'}];
locker.spec.volumes=[{name:'locker',persistentVolumeClaim:{claimName:'bookshop-locker'}}];
save('topics/33-storage-classes/manifests/20-consumer.yaml',locker);
save('topics/34-disruption-budgets/manifests/10-pdb.yaml',obj('policy/v1','PodDisruptionBudget','bookshop-availability',{minAvailable:1,selector:{matchLabels:{app:'bookshop-ops'}}}));
save('topics/34-disruption-budgets/variants/10-hold-all.yaml',obj('policy/v1','PodDisruptionBudget','bookshop-availability',{minAvailable:2,selector:{matchLabels:{app:'bookshop-ops'}}}));
const kbase='topics/35-kustomize-and-helm/base/';
const kdep=deployment('bookshop-custom'); kdep.spec.replicas=1; kdep.spec.template.spec.volumes[0].configMap.name='custom-page';
save(kbase+'20-deployment.yaml',kdep);
save(kbase+'10-page.yaml',cm('custom-page',{'index.html':'<h1>Bookshop Kustomize base</h1>\n'}));
save(kbase+'30-service.yaml',obj('v1','Service','bookshop-custom',{selector:{app:'bookshop-custom'},ports:[{name:'http',port:80,targetPort:'http'}],type:'ClusterIP'}));
save(kbase+'kustomization.yaml',{apiVersion:'kustomize.config.k8s.io/v1beta1',kind:'Kustomization',namespace:ns,resources:['10-page.yaml','20-deployment.yaml','30-service.yaml']});
save('topics/35-kustomize-and-helm/overlays/practice/kustomization.yaml',{apiVersion:'kustomize.config.k8s.io/v1beta1',kind:'Kustomization',resources:['../../base'],replicas:[{name:'bookshop-custom',count:2}],patches:[{path:'page-patch.yaml'}]});
save('topics/35-kustomize-and-helm/overlays/practice/page-patch.yaml',cm('custom-page',{'index.html':'<h1>Bookshop Kustomize practice</h1>\n'}));
save('topics/36-configuration-reloading/variants/10-page-evening.yaml',cm('bookshop-page',{'index.html':'<h1>Tiny Bookshop evening desk</h1>\n<p>New notice, same running server.</p>\n'}));
const secure=pod('secure-worker');
secure.spec.containers[0].volumeMounts=[{name:'work',mountPath:'/work'}]; secure.spec.volumes=[{name:'work',emptyDir:{}}];
save('topics/37-security-context/manifests/10-secure-worker.yaml',secure);
save('topics/38-pod-security-admission/manifests/00-namespace.yaml',{apiVersion:'v1',kind:'Namespace',metadata:{name:'k8s-learning-admission',labels:{'app.kubernetes.io/part-of':'kubernetes-learning-lab','pod-security.kubernetes.io/enforce':'restricted','pod-security.kubernetes.io/enforce-version':'v1.30','pod-security.kubernetes.io/warn':'restricted','pod-security.kubernetes.io/warn-version':'latest','pod-security.kubernetes.io/audit':'restricted','pod-security.kubernetes.io/audit-version':'latest'}}});
const good=pod('admission-good'); good.metadata.namespace='k8s-learning-admission';
save('topics/38-pod-security-admission/manifests/10-good-pod.yaml',good);
const bad=clone(good); bad.metadata.name='admission-missing-controls'; delete bad.spec.securityContext; delete bad.spec.containers[0].securityContext;
save('topics/38-pod-security-admission/negative/20-missing-controls.yaml',bad);
const hooks=pod('closing-worker');
hooks.spec.terminationGracePeriodSeconds=20;
hooks.spec.containers[0].args=['set -eu\ntrap \'echo "TERM received; closing complete"; exit 0\' TERM INT\necho "Main process started"\nseen_start=false\nseen_stop=false\nwhile true; do\n  if [ -f /state/started ] && [ "$seen_start" = false ]; then\n    echo "postStart marker observed"\n    seen_start=true\n  fi\n  if [ -f /state/stopping ] && [ "$seen_stop" = false ]; then\n    echo "preStop marker observed"\n    seen_stop=true\n  fi\n  sleep 1\ndone\n'];
hooks.spec.containers[0].lifecycle={postStart:{exec:{command:['/bin/sh','-c','echo started > /state/started']}},preStop:{exec:{command:['/bin/sh','-c','echo stopping > /state/stopping; sleep 3']}}};
hooks.spec.containers[0].volumeMounts=[{name:'state',mountPath:'/state'}]; hooks.spec.volumes=[{name:'state',emptyDir:{}}];
save('topics/39-lifecycle-hooks/manifests/10-closing-worker.yaml',hooks);
console.log('Created ' + count + ' manifest and Kustomize files.');
