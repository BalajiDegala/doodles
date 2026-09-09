const fs=require('node:fs'),path=require('node:path');
const h=require('./quality-author.cjs');
const {pod,deployment,service,namespace,app}=h;
const clone=x=>JSON.parse(JSON.stringify(x));
const mf={};
for(const n of [81,82,83,87]){
 const name='q'+n+'-worker',fixed=deployment(n,name),bad=clone(fixed);
 if(n===81)bad.spec.template.spec.nodeSelector['learning.bookshop/branch']='absent-q81';
 if(n===82)bad.spec.template.spec.containers[0].args=["echo 'training: catalog configuration missing'; exit 1"];
 if(n===83){bad.spec.template.spec.containers[0].image='busybox:bookshop-q83-does-not-exist';bad.spec.template.spec.containers[0].imagePullPolicy='Always';}
 if(n===87){fixed.spec.progressDeadlineSeconds=60;bad.spec.progressDeadlineSeconds=60;bad.spec.template.spec.containers[0].readinessProbe.httpGet.path='/q87-never-ready';}
 mf[n]={'faults/10-worker.yaml':bad,'fixed/10-worker.yaml':fixed};
}
mf[84]={'faults/10-worker.yaml':pod(84,'q84-worker',s=>{s.volumes=[{name:'settings',configMap:{name:'q84-settings',optional:false}}];s.containers[0].volumeMounts=[{name:'settings',mountPath:'/settings',readOnly:true}];}),'fixed/10-settings.yaml':{apiVersion:'v1',kind:'ConfigMap',metadata:{name:'q84-settings',namespace:namespace(84)},data:{catalog:'ready'}}};
mf[86]={'faults/10-service.yaml':service(86,'q86-route',{app:'q86-missing'}),'fixed/10-service.yaml':service(86,'q86-route',{app:app(86)})};
mf[88]={'faults/10-claim.yaml':{apiVersion:'v1',kind:'PersistentVolumeClaim',metadata:{name:'q88-claim',namespace:namespace(88)},spec:{storageClassName:'bookshop-q88-missing',accessModes:['ReadWriteOnce'],resources:{requests:{storage:'1Mi'}}}}};
mf[91]={'manifests/10-reader.yaml':pod(91,'q91-reader')};
const hpa={apiVersion:'autoscaling/v2',kind:'HorizontalPodAutoscaler',metadata:{name:'q95-worker',namespace:namespace(95)},spec:{scaleTargetRef:{apiVersion:'apps/v1',kind:'Deployment',name:'q95-worker'},minReplicas:1,maxReplicas:3,metrics:[{type:'Resource',resource:{name:'cpu',target:{type:'Utilization',averageUtilization:70}}}],behavior:{scaleDown:{stabilizationWindowSeconds:300,policies:[{type:'Pods',value:1,periodSeconds:60}]}}}};
const target=deployment(95,'q95-worker');delete target.spec.replicas;
mf[95]={'manifests/10-worker.yaml':target,'optional/20-hpa.yaml':hpa};
mf[96]={'manifests/10-scratch-worker.yaml':pod(96,'q96-scratch',s=>{const c=s.containers[0];c.resources.requests['ephemeral-storage']='20Mi';c.resources.limits['ephemeral-storage']='40Mi';c.args=['echo training > /scratch/note; sleep 3600'];c.volumeMounts=[{name:'scratch',mountPath:'/scratch'}];s.volumes=[{name:'scratch',emptyDir:{sizeLimit:'16Mi'}}];})};
mf[97]={'faults/10-service.yaml':service(97,'q97-route',{app:app(97)},8081),'fixed/10-service.yaml':service(97,'q97-route',{app:app(97)},8080)};
const ns=(name,labels={})=>({apiVersion:'v1',kind:'Namespace',metadata:{name,labels:{'app.kubernetes.io/part-of':'kubernetes-learning-lab',...labels}}});
const clientNs='k8s-learning-cross-source';
const reader=pod(98,'q98-reader'),other=pod(98,'q98-other');
for(const p of [reader,other])p.metadata.namespace=clientNs;
reader.metadata.labels.role='reader';other.metadata.labels.role='other';
const deny={apiVersion:'networking.k8s.io/v1',kind:'NetworkPolicy',metadata:{name:'q98-ingress',namespace:namespace(98)},spec:{podSelector:{matchLabels:{app:'q98-server'}},policyTypes:['Ingress'],ingress:[]}};
const allow=clone(deny);allow.spec.ingress=[{from:[{namespaceSelector:{matchLabels:{'kubernetes.io/metadata.name':clientNs}},podSelector:{matchLabels:{role:'reader'}}}],ports:[{protocol:'TCP',port:8080}]}];
mf[98]={'manifests/00-client-namespace.yaml':ns(clientNs),'manifests/10-server.yaml':deployment(98,'q98-server'),'manifests/20-service.yaml':service(98,'q98-route',{app:'q98-server'}),'manifests/30-clients.yaml':[reader,other],'faults/10-policy.yaml':deny,'fixed/10-policy.yaml':allow};
mf[101]={'manifests/00-namespace.yaml':ns('k8s-learning-finalizer'),'manifests/10-held-map.yaml':{apiVersion:'v1',kind:'ConfigMap',metadata:{name:'q101-held',namespace:'k8s-learning-finalizer',finalizers:['learning.bookshop/hold-q101']},data:{purpose:'dummy hold with no external resource'}}};
const workers=deployment(104,'q104-workers');workers.spec.replicas=2;
const strict={apiVersion:'policy/v1',kind:'PodDisruptionBudget',metadata:{name:'q104-budget',namespace:namespace(104)},spec:{minAvailable:2,selector:{matchLabels:{app:'q104-workers'}}}};
const loose=clone(strict);loose.spec.minAvailable=1;
mf[104]={'manifests/10-workers.yaml':workers,'faults/20-pdb.yaml':strict,'fixed/20-pdb.yaml':loose};
mf[106]={'manifests/10-reader.yaml':pod(106,'q106-reader')};
const batch=pod(109,'report').spec;batch.containers[0].args=["echo 'Bookshop report complete'"];
mf[109]={'manifests/10-cronjob.yaml':{apiVersion:'batch/v1',kind:'CronJob',metadata:{name:'q109-report',namespace:namespace(109)},spec:{schedule:'*/5 * * * *',suspend:true,concurrencyPolicy:'Forbid',successfulJobsHistoryLimit:1,failedJobsHistoryLimit:1,jobTemplate:{spec:{backoffLimit:0,activeDeadlineSeconds:30,ttlSecondsAfterFinished:45,template:{metadata:{labels:{exercise:'q109'}},spec:batch}}}}}};
const good=pod(110,'q110-good'),rootPod=pod(110,'q110-root');
good.metadata.namespace=rootPod.metadata.namespace='k8s-learning-psa-review';rootPod.spec.securityContext.runAsUser=0;rootPod.spec.securityContext.runAsNonRoot=false;
mf[110]={'manifests/00-namespace.yaml':ns('k8s-learning-psa-review',{'pod-security.kubernetes.io/enforce':'restricted','pod-security.kubernetes.io/enforce-version':'v1.33'}),'manifests/10-good.yaml':good,'negative/10-root.yaml':rootPod};
for(const group of ['81-85','86-90','91-95','96-100','101-105','106-110']){
 for(const d of JSON.parse(fs.readFileSync(path.join(__dirname,'quality-'+group+'.json'),'utf8'))){
  h.add(d.n,d.slug,d.title,d.pages,{...d,manifests:mf[d.n]||{}});
 }
}
h.write('08-production-governance/topics/101-namespace-finalizers/reference/release-finalizer.json',JSON.stringify([{op:'test',path:'/metadata/finalizers/0',value:'learning.bookshop/hold-q101'},{op:'remove',path:'/metadata/finalizers/0'}],null,2));
h.finish();
console.log('Rewritten',h.index.length,'source-matched incident topics');

