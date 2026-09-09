const fs=require('node:fs'), path=require('node:path'), yaml=require('./validation/node_modules/js-yaml');
const root=path.resolve(__dirname,'../kubernetes-learning-lab');
const chapters=['05-bookshop-platform','06-bookshop-reliability'];
const titles=[
['41-monitoring','Kubernetes monitoring'],['42-centralized-logging','Centralized logging'],['43-release-strategies','Blue-green and canary releases'],['44-quotas-and-limitranges','ResourceQuota and LimitRange'],['45-networking-and-cni','Networking and CNI plugins'],['46-headless-services','Headless Services'],['47-ephemeral-debugging','Ephemeral containers and kubectl debug'],['48-topology-spread','Topology spread constraints'],['49-priority-and-preemption','Priority and preemption'],['50-certificates-and-tls','cert-manager and TLS certificates'],['51-gitops','GitOps with Argo CD and Flux'],['52-external-secrets','External Secrets Operator'],['53-image-pulls','Image pulls and registry authentication'],['54-coredns','CoreDNS customization'],['55-endpointslices','EndpointSlices and Endpoints'],['56-etcd','etcd and cluster state'],['57-api-admission','API request flow and admission'],['58-crds-and-operators','CRDs and Operators'],['59-scheduler-internals','Scheduler filtering and scoring'],['60-container-runtimes','CRI, containerd, and CRI-O'],
['61-multiple-clusters','Multi-cluster strategies'],['62-security-hardening','Security hardening and kube-bench'],['63-mesh-traffic-and-identity','Mesh identity, traffic, and observability'],['64-cluster-upgrades','Cluster upgrade planning'],['65-disaster-recovery','Disaster recovery'],['66-cost-and-rightsizing','Cost allocation and right-sizing'],['67-gateway-api','Gateway API and Ingress'],['68-large-clusters','Kubernetes at scale'],['69-policy-and-supply-chain','Kyverno, Gatekeeper, and supply-chain policy'],['70-node-autoscalers','Karpenter and Cluster Autoscaler'],['71-managed-kubernetes','EKS, GKE, and AKS'],['72-api-deprecations','API deprecations'],['73-native-sidecars','Native sidecar containers'],['74-coordinated-autoscaling','HPA, VPA, and KEDA'],['75-zero-trust','Zero-trust networking'],['76-audit-logging','Kubernetes audit logging'],['77-secret-encryption','Secret encryption at rest'],['78-runtime-classes','RuntimeClass and sandboxing'],['79-progressive-delivery','Argo Rollouts and Flagger'],['80-garbage-collection','Garbage collection and ownership']];
fs.writeFileSync(path.join(__dirname,'new40-topics.json'),JSON.stringify(titles,null,2)+'\n');
let count=0;
function write(file,text){const dest=path.join(root,file);if(fs.existsSync(dest))throw Error('Exists: '+dest);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,text,'utf8');count++;}
function save(file,...docs){write(file,docs.map(d=>yaml.dump(d,{lineWidth:110,noRefs:true})).join('---\n'));}
const clone=x=>JSON.parse(JSON.stringify(x));
const sec={runAsNonRoot:true,runAsUser:1000,runAsGroup:1000,fsGroup:1000,seccompProfile:{type:'RuntimeDefault'}};
const csec={allowPrivilegeEscalation:false,readOnlyRootFilesystem:true,capabilities:{drop:['ALL']}};
const limits={requests:{cpu:'25m',memory:'32Mi'},limits:{cpu:'100m',memory:'64Mi'}};
function object(kind,name,ns,spec,apiVersion='v1'){return {apiVersion,kind,metadata:{name,namespace:ns},spec};}
function pod(name,ns,script='exec sleep 3600'){return object('Pod',name,ns,{automountServiceAccountToken:false,nodeSelector:{'kubernetes.io/os':'linux'},terminationGracePeriodSeconds:15,securityContext:clone(sec),containers:[{name:'worker',image:'busybox:1.36',imagePullPolicy:'IfNotPresent',command:['/bin/sh','-c'],args:[script],resources:clone(limits),securityContext:clone(csec)}]});}
function cm(name,ns,data){return {apiVersion:'v1',kind:'ConfigMap',metadata:{name,namespace:ns},data};}
function ns(name){return {apiVersion:'v1',kind:'Namespace',metadata:{name,labels:{'app.kubernetes.io/part-of':'kubernetes-learning-lab'}}};}
function deployment(name,namespace){const d=clone(yaml.load(fs.readFileSync(path.join(root,'04-bookshop-operations/manifests/20-deployment.yaml'),'utf8')));d.metadata={name,namespace};d.spec.selector.matchLabels.app=name;d.spec.template.metadata.labels={app:name,team:'bookshop',purpose:'learning'};d.spec.template.spec.containers[0].imagePullPolicy='IfNotPresent';d.spec.template.spec.volumes[0].configMap.name=name+'-page';return d;}
const pn='k8s-learning-platform',rn='k8s-learning-reliability',bn='k8s-learning-budgets';
for(const [i,name,namespace] of [[0,'platform-catalog',pn],[1,'reliable-catalog',rn]]){
 const chapter=chapters[i];
 save(chapter+'/manifests/00-namespace.yaml',ns(namespace));
 save(chapter+'/manifests/10-page.yaml',cm(name+'-page',namespace,{'index.html':`<h1>Tiny Bookshop ${i?'reliability':'platform'} desk</h1>\n`,metrics:'# HELP bookshop_catalog_titles Number of titles in the teaching catalog.\n# TYPE bookshop_catalog_titles gauge\nbookshop_catalog_titles 60\n'}));
 save(chapter+'/manifests/20-deployment.yaml',deployment(name,namespace));
 save(chapter+'/manifests/30-service.yaml',object('Service',name,namespace,{type:'ClusterIP',selector:{app:name},ports:[{name:'http',port:80,targetPort:'http'}]}));
}
function at(n,file){return chapters[n<61?0:1]+'/topics/'+titles[n-41][0]+'/'+file;}
save(at(41,'reference/prometheus-scrape.yaml'),{scrape_configs:[{job_name:'bookshop-platform',scrape_interval:'30s',metrics_path:'/metrics',static_configs:[{targets:['platform-catalog.k8s-learning-platform.svc:80']}]}]});
const log=pod('log-producer',pn,'echo \'{"level":"info","event":"catalog_started","request_id":"lesson-42"}\'\necho \'{"level":"warn","event":"supplier_delayed","request_id":"lesson-42"}\' >&2\necho \'{"level":"info","event":"catalog_complete","request_id":"lesson-42"}\'\n');log.spec.restartPolicy='Never';
save(at(42,'manifests/10-log-job.yaml'),object('Job','catalog-log-demo',pn,{backoffLimit:0,template:{metadata:{labels:{exercise:'logs-42'}},spec:log.spec}},'batch/v1'));
save(at(44,'manifests/00-namespace.yaml'),ns(bn));
save(at(44,'manifests/10-limitrange.yaml'),object('LimitRange','counter-defaults',bn,{limits:[{type:'Container',min:{cpu:'5m',memory:'8Mi'},max:{cpu:'200m',memory:'128Mi'},default:{cpu:'100m',memory:'64Mi'},defaultRequest:{cpu:'25m',memory:'32Mi'}}]}));
save(at(44,'manifests/20-quota.yaml'),object('ResourceQuota','counter-budget',bn,{hard:{pods:'2','requests.cpu':'500m','requests.memory':'256Mi','limits.cpu':'1','limits.memory':'512Mi'}}));
for(const name of ['budget-one','budget-two','budget-extra']){const p=pod(name,bn);delete p.spec.containers[0].resources;save(at(44,(name==='budget-extra'?'negative/':'workloads/')+name+'.yaml'),p);}
const big=pod('budget-too-large',bn);big.spec.containers[0].resources={requests:{cpu:'250m',memory:'32Mi'},limits:{cpu:'300m',memory:'64Mi'}};save(at(44,'negative/too-large.yaml'),big);
save(at(46,'manifests/10-headless.yaml'),object('Service','catalog-peers',pn,{clusterIP:'None',selector:{app:'platform-catalog'},ports:[{name:'http',port:80,targetPort:'http'}]}));
const debug=pod('debug-counter',pn);debug.spec.containers[0].name='counter';save(at(47,'manifests/10-debug-target.yaml'),debug);
const spread=deployment('topology-counters',pn);spread.spec.replicas=3;spread.spec.template.spec.volumes[0].configMap.name='platform-catalog-page';spread.spec.template.spec.topologySpreadConstraints=[{maxSkew:1,topologyKey:'kubernetes.io/hostname',whenUnsatisfiable:'ScheduleAnyway',labelSelector:{matchLabels:{app:'topology-counters'}}}];save(at(48,'manifests/10-spread.yaml'),spread);
save(at(50,'optional/10-issuer.yaml'),object('Issuer','bookshop-selfsigned',pn,{selfSigned:{}},'cert-manager.io/v1'));
save(at(50,'optional/20-certificate.yaml'),object('Certificate','catalog-lab',pn,{secretName:'catalog-lab-tls',subject:{organizations:['Bookshop learning lab']},dnsNames:['platform-catalog.k8s-learning-platform.svc'],duration:'24h',renewBefore:'8h',privateKey:{algorithm:'ECDSA',size:256,rotationPolicy:'Always'},issuerRef:{name:'bookshop-selfsigned',kind:'Issuer',group:'cert-manager.io'}},'cert-manager.io/v1'));
save(at(52,'optional/10-fake-store.yaml'),object('SecretStore','bookshop-fake',pn,{provider:{fake:{data:[{key:'/bookshop/practice',value:'not-a-real-password',version:'v1'}]}}},'external-secrets.io/v1'));
save(at(52,'optional/20-external-secret.yaml'),object('ExternalSecret','bookshop-import',pn,{refreshInterval:'1m',secretStoreRef:{name:'bookshop-fake',kind:'SecretStore'},target:{name:'bookshop-imported',creationPolicy:'Owner'},data:[{secretKey:'practice',remoteRef:{key:'/bookshop/practice',version:'v1'}}]},'external-secrets.io/v1'));
for(const [name,policy] of [['pull-cached','IfNotPresent'],['pull-resolve','Always']]){const p=pod(name,pn);p.spec.containers[0].imagePullPolicy=policy;save(at(53,'manifests/'+name+'.yaml'),p);}
write(at(54,'reference/Corefile'),'.:1053 {\n    errors\n    health :18080\n    ready :18181\n    hosts {\n        192.0.2.10 supplier.bookshop.test\n        fallthrough\n    }\n    forward . 192.0.2.53\n    cache 30\n}\n');
save(at(57,'manifests/10-admission-preview.yaml'),pod('admission-preview',pn));
const pending=pod('scheduler-waiting',pn);pending.spec.schedulerName='bookshop-uninstalled-scheduler';save(at(59,'manifests/10-custom-scheduler.yaml'),pending);
// Kustomize recovery copies only authored, non-secret base configuration.
for(const f of ['10-page.yaml','20-deployment.yaml','30-service.yaml']){
 const d=yaml.load(fs.readFileSync(path.join(root,chapters[1],'manifests',f),'utf8'));
 save(at(65,'restore/base/'+f),d);
}
save(at(65,'restore/base/kustomization.yaml'),{apiVersion:'kustomize.config.k8s.io/v1beta1',kind:'Kustomization',resources:['10-page.yaml','20-deployment.yaml','30-service.yaml']});
save(at(65,'restore/practice/kustomization.yaml'),{apiVersion:'kustomize.config.k8s.io/v1beta1',kind:'Kustomization',namespace:'k8s-learning-recovery',resources:['../base','namespace.yaml']});
save(at(65,'restore/practice/namespace.yaml'),ns('k8s-learning-recovery'));
save(at(67,'optional/10-route.yaml'),object('HTTPRoute','bookshop-route',rn,{parentRefs:[{name:'bookshop-gateway',namespace:rn}],hostnames:['bookshop.example.com'],rules:[{matches:[{path:{type:'PathPrefix',value:'/'}}],backendRefs:[{name:'reliable-catalog',port:80}]}]},'gateway.networking.k8s.io/v1'));
const native=pod('native-job',rn);native.spec.restartPolicy='Never';native.spec.volumes=[{name:'signals',emptyDir:{}}];
const side=clone(native.spec.containers[0]);side.name='helper';side.restartPolicy='Always';side.args=['touch /signals/ready\nwhile true; do echo "Helper heartbeat"; sleep 2; done\n'];side.volumeMounts=[{name:'signals',mountPath:'/signals'}];side.startupProbe={exec:{command:['test','-f','/signals/ready']},periodSeconds:1,failureThreshold:30};
native.spec.initContainers=[side];native.spec.containers[0].name='report';native.spec.containers[0].args=['test -f /signals/ready; echo "Bookshop report finished"'];native.spec.containers[0].volumeMounts=[{name:'signals',mountPath:'/signals',readOnly:true}];
save(at(73,'manifests/10-sidecar-job.yaml'),object('Job','native-report',rn,{backoffLimit:0,template:{metadata:{labels:{exercise:'native-sidecar'}},spec:native.spec}},'batch/v1'));
const kdep=deployment('event-counter',rn);delete kdep.spec.replicas;kdep.spec.template.spec.volumes[0].configMap.name='reliable-catalog-page';save(at(74,'manifests/10-event-counter.yaml'),kdep);
save(at(74,'optional/20-scaledobject.yaml'),object('ScaledObject','bookshop-hours',rn,{scaleTargetRef:{name:'event-counter'},pollingInterval:15,cooldownPeriod:30,minReplicaCount:0,maxReplicaCount:2,triggers:[{type:'cron',metadata:{timezone:'Asia/Kolkata',start:'0 9 * * *',end:'0 17 * * *',desiredReplicas:'2'}}]},'keda.sh/v1alpha1'));
const visitor1=pod('trusted-visitor',rn),visitor2=pod('unknown-visitor',rn);visitor1.metadata.labels={access:'approved'};visitor2.metadata.labels={access:'unapproved'};save(at(75,'manifests/10-visitors.yaml'),visitor1,visitor2);
save(at(75,'policy/20-catalog-ingress.yaml'),object('NetworkPolicy','catalog-identity-boundary',rn,{podSelector:{matchLabels:{app:'reliable-catalog'}},policyTypes:['Ingress'],ingress:[{from:[{podSelector:{matchLabels:{access:'approved'}}}],ports:[{protocol:'TCP',port:8080}]}]},'networking.k8s.io/v1'));
save(at(76,'reference/audit-policy.yaml'),{apiVersion:'audit.k8s.io/v1',kind:'Policy',rules:[{level:'Metadata',resources:[{group:'',resources:['secrets']}]},{level:'Metadata',namespaces:[rn]},{level:'None'}]});
save(at(77,'manifests/10-practice-secret.yaml'),{apiVersion:'v1',kind:'Secret',metadata:{name:'encryption-practice',namespace:rn},type:'Opaque',stringData:{note:'public-training-value'}});
const gc=deployment('disposable-counter',rn);gc.spec.replicas=1;gc.spec.template.spec.volumes[0].configMap.name='reliable-catalog-page';save(at(80,'manifests/10-disposable-deployment.yaml'),gc);
console.log('Created '+count+' manifest/reference files for questions 41-80.');
