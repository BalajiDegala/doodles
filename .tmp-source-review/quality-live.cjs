const fs=require('node:fs'),path=require('node:path'),{spawnSync}=require('node:child_process');
const root=path.resolve(__dirname,'../kubernetes-learning-lab'),ctx='rancher-desktop',results=[],owned=new Set();
const namespaces=['k8s-learning-incidents','k8s-learning-governance','k8s-learning-cross-source','k8s-learning-finalizer','k8s-learning-psa-review'];
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
function cmd(bin,args,opt={}){const r=spawnSync(bin,args,{encoding:'utf8',input:opt.input,timeout:180000,windowsHide:true,cwd:root});if(!opt.fail&&(r.status!==0||r.error))throw Error(bin+' '+args.join(' ')+'\n'+(r.stderr||r.error||r.stdout));return r;}
const k=(args,opt)=>cmd('kubectl',['--context',ctx,...args],opt);
const read=(ns,kind,name)=>JSON.parse(k(['-n',ns,'get',kind,name,'-o','json']).stdout);
const assert=(v,s)=>{if(!v)throw Error(s);};
async function until(fn,ms=90000){const end=Date.now()+ms;while(Date.now()<end){if(fn())return;await sleep(1800);}throw Error('Timed out waiting for expected evidence');}
async function check(name,fn){try{await fn();results.push({name,status:'passed'});console.log('PASS '+name);}catch(e){results.push({name,status:'failed',detail:e.message});console.log('FAIL '+name+': '+e.message);}}
const chapter=n=>n<=95?'07-production-incidents':'08-production-governance';
const topic=n=>{const d=fs.readdirSync(path.join(root,chapter(n),'topics')).find(d=>d.startsWith(n+'-'));return chapter(n)+'/topics/'+d;};
const apply=(p)=>k(['apply','-f',p]);
const ns=n=>n<=95?'k8s-learning-incidents':'k8s-learning-governance';
const app=n=>n<=95?'incident-catalog':'governance-catalog';
const ready=(n,name)=>k(['-n',ns(n),'rollout','status','deployment/'+name,'--timeout=120s']);
const http=(n,host,opt)=>k(['-n',ns(n),'exec','deployment/'+app(n),'--','wget','-T','3','-qO-','http://'+host],opt);
const pods=(n,selector)=>JSON.parse(k(['-n',ns(n),'get','pods','-l',selector,'-o','json']).stdout).items;
(async()=>{
 k(['get','--raw=/readyz','--request-timeout=5s']);
 for(const name of namespaces){const r=k(['get','namespace',name],{fail:true});if(r.status===0)throw Error('Pre-existing namespace; no mutation: '+name);assert(/NotFound/.test(r.stderr),'Namespace precheck failed: '+r.stderr);}
 const version=JSON.parse(k(['version','-o','json']).stdout);
 try{
  for(const n of [81,96]){owned.add(ns(n));apply(chapter(n)+'/manifests/00-namespace.yaml');apply(chapter(n)+'/manifests/');ready(n,app(n));assert(/Bookshop/i.test(http(n,app(n)).stdout),'Base HTML');}
  await check('Base catalogs',()=>{});
  await check('Q81 scheduler fault and repair',async()=>{
   assert(JSON.parse(k(['get','nodes','-l','learning.bookshop/branch=absent-q81','-o','json']).stdout).items.length===0,'Absent label must match no node');
   apply(topic(81)+'/faults/');
   await until(()=>{const p=pods(81,'app=q81-worker')[0];return p&&!p.spec.nodeName&&p.status.conditions?.some(c=>c.type==='PodScheduled'&&c.status==='False');});
   apply(topic(81)+'/fixed/');ready(81,'q81-worker');
   k(['-n',ns(81),'delete','deployment','q81-worker']);
  });
  await check('Q82 previous crash logs and repair',async()=>{
   apply(topic(82)+'/faults/');
   await until(()=>pods(82,'app=q82-worker').some(p=>p.status.containerStatuses?.some(c=>c.restartCount>=1)));
   const p=pods(82,'app=q82-worker')[0];
   const log=k(['-n',ns(82),'logs',p.metadata.name,'-c','web','--previous']).stdout;
   assert(log.includes('training: catalog configuration missing'),'Expected crash log');
   assert(p.status.containerStatuses[0].lastState.terminated.exitCode===1,'Expected exit 1');
   apply(topic(82)+'/fixed/');ready(82,'q82-worker');
   k(['-n',ns(82),'delete','deployment','q82-worker']);
  });
  await check('Q83 pull failure and repair',async()=>{
   apply(topic(83)+'/faults/');
   await until(()=>pods(83,'app=q83-worker').some(p=>p.status.containerStatuses?.some(c=>/ErrImagePull|ImagePullBackOff/.test(c.state?.waiting?.reason||''))),120000);
   const desc=k(['-n',ns(83),'describe','pods','-l','app=q83-worker']).stdout;
   assert(/not found|manifest unknown|not exist/i.test(desc),'Expected missing-tag evidence');
   apply(topic(83)+'/fixed/');ready(83,'q83-worker');
   k(['-n',ns(83),'delete','deployment','q83-worker']);
  });
  await check('Q84 missing ConfigMap and same-Pod recovery',async()=>{
   apply(topic(84)+'/faults/');
   await until(()=>{const p=read(ns(84),'pod','q84-worker');return p.spec.nodeName&&p.status.phase==='Pending';});
   const before=read(ns(84),'pod','q84-worker').metadata.uid;
   await until(()=>k(['-n',ns(84),'describe','pod','q84-worker']).stdout.includes('q84-settings')&&k(['-n',ns(84),'describe','pod','q84-worker']).stdout.includes('FailedMount'));
   apply(topic(84)+'/fixed/');
   k(['-n',ns(84),'wait','--for=condition=Ready','pod/q84-worker','--timeout=120s']);
   assert(read(ns(84),'pod','q84-worker').metadata.uid===before,'Same UID');
   assert(k(['-n',ns(84),'exec','q84-worker','--','cat','/settings/catalog']).stdout.trim()==='ready','Mounted data');
   k(['-n',ns(84),'delete','pod','q84-worker']);k(['-n',ns(84),'delete','cm','q84-settings']);
  });
  await check('Q86 missing Service selector and repair',async()=>{
   apply(topic(86)+'/faults/');assert(http(86,'q86-route',{fail:true}).status!==0,'Fault request must fail');
   apply(topic(86)+'/fixed/');await until(()=>http(86,'q86-route',{fail:true}).stdout.includes('Bookshop'));
   k(['-n',ns(86),'delete','service','q86-route']);
  });
  await check('Q87 failed readiness rollout and recovery',async()=>{
   apply(topic(87)+'/fixed/');ready(87,'q87-worker');apply(topic(87)+'/faults/');
   const r=k(['-n',ns(87),'rollout','status','deployment/q87-worker','--timeout=15s'],{fail:true});assert(r.status!==0,'Bad rollout should not complete');
   const ps=pods(87,'app=q87-worker');assert(ps.some(p=>p.status.conditions?.some(c=>c.type==='Ready'&&c.status==='True')),'Old ready Pod survives');
   assert(ps.some(p=>p.spec.containers[0].readinessProbe.httpGet.path==='/q87-never-ready'&&!p.status.conditions?.some(c=>c.type==='Ready'&&c.status==='True')),'New Pod unready');
   apply(topic(87)+'/fixed/');ready(87,'q87-worker');k(['-n',ns(87),'delete','deployment','q87-worker']);
  });
  await check('Q88 unbound missing-class PVC',async()=>{
   assert(k(['get','storageclass','bookshop-q88-missing'],{fail:true}).status!==0,'Class absent');
   apply(topic(88)+'/faults/');
   await until(()=>/not found/i.test(k(['-n',ns(88),'describe','pvc','q88-claim']).stdout));
   const p=read(ns(88),'pvc','q88-claim');assert(p.status.phase==='Pending'&&!p.spec.volumeName,'Claim must be unbound');
   k(['-n',ns(88),'delete','pvc','q88-claim']);
  });
  await check('Q91 cluster DNS absolute-name sample',async()=>{
   apply(topic(91)+'/manifests/');k(['-n',ns(91),'wait','--for=condition=Ready','pod/q91-reader','--timeout=120s']);
   const r=k(['-n',ns(91),'exec','q91-reader','--','nslookup','incident-catalog.k8s-learning-incidents.svc.cluster.local.']);
   assert(r.stdout.includes(read(ns(91),'svc','incident-catalog').spec.clusterIP),'Service address in answer');
   k(['-n',ns(91),'delete','pod','q91-reader']);
  });
  await check('Q95 HPA metrics and bounded configuration',async()=>{
   k(['get','--raw=/apis/metrics.k8s.io/v1beta1/nodes','--request-timeout=5s']);
   apply(topic(95)+'/manifests/');ready(95,'q95-worker');apply(topic(95)+'/optional/');
   await until(()=>read(ns(95),'hpa','q95-worker').status.conditions?.some(c=>c.type==='ScalingActive'&&c.status==='True'),120000);
   k(['-n',ns(95),'delete','hpa','q95-worker']);k(['-n',ns(95),'delete','deployment','q95-worker']);
  });
  await check('Q96 ephemeral-storage manifest server preview',()=>k(['apply','--dry-run=server','-f',topic(96)+'/manifests/']));
  await check('Q97 wrong targetPort and repair',async()=>{
   apply(topic(97)+'/faults/');assert(http(97,'q97-route',{fail:true}).status!==0,'Wrong port must fail');
   apply(topic(97)+'/fixed/');await until(()=>http(97,'q97-route',{fail:true}).stdout.includes('Bookshop'));
   k(['-n',ns(97),'delete','service','q97-route']);
  });
  await check('Q98 cross-namespace deny, allow, and restore',async()=>{
   owned.add('k8s-learning-cross-source');apply(topic(98)+'/manifests/');ready(98,'q98-server');
   k(['-n','k8s-learning-cross-source','wait','--for=condition=Ready','pod/q98-reader','pod/q98-other','--timeout=120s']);
   const fetch=name=>k(['-n','k8s-learning-cross-source','exec',name,'--','wget','-T','3','-qO-','http://q98-route.k8s-learning-governance.svc:80'],{fail:true});
   assert(fetch('q98-reader').status===0&&fetch('q98-other').status===0,'Both initially allowed');
   apply(topic(98)+'/faults/');await until(()=>fetch('q98-reader').status!==0&&fetch('q98-other').status!==0);
   apply(topic(98)+'/fixed/');await until(()=>fetch('q98-reader').status===0&&fetch('q98-other').status!==0);
   k(['-n',ns(98),'delete','networkpolicy','q98-ingress']);await until(()=>fetch('q98-other').status===0);
   k(['-n',ns(98),'delete','deployment','q98-server']);k(['-n',ns(98),'delete','svc','q98-route']);
   k(['delete','namespace','k8s-learning-cross-source','--timeout=120s']);owned.delete('k8s-learning-cross-source');
  });
  await check('Q101 dummy finalizer deletion lifecycle',async()=>{
   owned.add('k8s-learning-finalizer');apply(topic(101)+'/manifests/');
   k(['delete','namespace','k8s-learning-finalizer','--wait=false']);
   await until(()=>!!read('k8s-learning-finalizer','cm','q101-held').metadata.deletionTimestamp);
   assert(read('','namespace','k8s-learning-finalizer').status.phase==='Terminating','Namespace remains terminating');
   k(['-n','k8s-learning-finalizer','patch','cm','q101-held','--type=json','--patch-file',topic(101)+'/reference/release-finalizer.json']);
   k(['wait','--for=delete','namespace/k8s-learning-finalizer','--timeout=120s']);owned.delete('k8s-learning-finalizer');
  });
  await check('Q104 PDB denies/allows dry-run eviction without deletion',async()=>{
   apply(topic(104)+'/manifests/');ready(104,'q104-workers');apply(topic(104)+'/faults/');
   await until(()=>{const p=read(ns(104),'pdb','q104-budget');return p.status.observedGeneration===p.metadata.generation&&p.status.currentHealthy===2&&p.status.disruptionsAllowed===0;});
   const ps=pods(104,'app=q104-workers'),p=ps[0];
   const ev={apiVersion:'policy/v1',kind:'Eviction',metadata:{name:p.metadata.name,namespace:ns(104)},deleteOptions:{preconditions:{uid:p.metadata.uid}}};
   const url='/api/v1/namespaces/'+ns(104)+'/pods/'+p.metadata.name+'/eviction?dryRun=All';
   const request=()=>k(['create','--raw',url,'-f','-'],{input:JSON.stringify(ev),fail:true});
   const denied=request();assert(denied.status!==0&&/disruption budget/i.test(denied.stderr),'Specific PDB rejection');
   apply(topic(104)+'/fixed/');
   await until(()=>read(ns(104),'pdb','q104-budget').status.disruptionsAllowed===1);
   const allowed=request();assert(allowed.status===0,'Permitted dry-run eviction: '+allowed.stderr);
   assert(JSON.stringify(pods(104,'app=q104-workers').map(p=>p.metadata.uid).sort())===JSON.stringify(ps.map(p=>p.metadata.uid).sort()),'Both Pod UIDs retained');
   k(['-n',ns(104),'delete','pdb','q104-budget']);k(['-n',ns(104),'delete','deployment','q104-workers']);
  });
  await check('Q106 internal/external DNS sample',async()=>{
   apply(topic(106)+'/manifests/');k(['-n',ns(106),'wait','--for=condition=Ready','pod/q106-reader','--timeout=120s']);
   k(['-n',ns(106),'exec','q106-reader','--','nslookup','governance-catalog.k8s-learning-governance.svc.cluster.local.']);
   k(['-n',ns(106),'exec','q106-reader','--','nslookup','example.com.']);
   k(['-n',ns(106),'delete','pod','q106-reader']);
  });
  await check('Q107 Helm install/upgrade/rollback/test',async()=>{
   const c='04-bookshop-operations/topics/32-helm-packaging/chart',v='04-bookshop-operations/topics/32-helm-packaging/values-evening.yaml',hargs=['--kube-context',ctx,'-n',ns(107)];
   const helm=a=>cmd('helm',[...hargs,...a]);
   helm(['install','q107-desk',c,'--wait','--timeout','120s']);helm(['upgrade','q107-desk',c,'-f',v,'--wait','--timeout','120s']);helm(['rollback','q107-desk','1','--wait','--timeout','120s']);
   const test=helm(['test','q107-desk','--logs','--timeout','120s']);assert(test.stdout.includes('Page matches release values'),'Chart response test');
   helm(['uninstall','q107-desk','--wait','--timeout','120s']);k(['-n',ns(107),'delete','pod','q107-desk-page-test','--ignore-not-found']);
  });
  await check('Q109 completed Job and TTL dependent cleanup',async()=>{
   apply(topic(109)+'/manifests/');k(['-n',ns(109),'create','job','q109-once','--from=cronjob/q109-report']);
   k(['-n',ns(109),'wait','--for=condition=Complete','job/q109-once','--timeout=120s']);
   assert(k(['-n',ns(109),'logs','job/q109-once']).stdout.includes('Bookshop report complete'),'Report log');
   k(['-n',ns(109),'wait','--for=delete','job/q109-once','--timeout=120s']);
   await until(()=>pods(109,'job-name=q109-once').length===0);k(['-n',ns(109),'delete','cronjob','q109-report']);
  });
  await check('Q110 Restricted admission and runtime UID',async()=>{
   owned.add('k8s-learning-psa-review');apply(topic(110)+'/manifests/00-namespace.yaml');
   k(['apply','--dry-run=server','-f',topic(110)+'/manifests/10-good.yaml']);
   const bad=k(['apply','--dry-run=server','-f',topic(110)+'/negative/10-root.yaml'],{fail:true});
   assert(bad.status!==0&&/restricted/i.test(bad.stderr),'Restricted rejection');
   apply(topic(110)+'/manifests/10-good.yaml');
   k(['-n','k8s-learning-psa-review','wait','--for=condition=Ready','pod/q110-good','--timeout=120s']);
   assert(k(['-n','k8s-learning-psa-review','exec','q110-good','--','id','-u']).stdout.trim()==='1000','Runtime UID');
   assert(k(['-n','k8s-learning-psa-review','get','pod','q110-root'],{fail:true}).status!==0,'Negative Pod not persisted');
   k(['delete','namespace','k8s-learning-psa-review','--timeout=120s']);owned.delete('k8s-learning-psa-review');
  });
 }finally{
  for(const name of owned){
   if(name==='k8s-learning-finalizer'){
    const cm=k(['-n',name,'get','cm','q101-held','-o','json'],{fail:true});
    if(cm.status===0&&JSON.parse(cm.stdout).metadata.finalizers?.[0]==='learning.bookshop/hold-q101')k(['-n',name,'patch','cm','q101-held','--type=json','--patch-file',topic(101)+'/reference/release-finalizer.json'],{fail:true});
   }
   const r=k(['delete','namespace',name,'--ignore-not-found','--timeout=120s'],{fail:true});
   results.push({name:'Cleanup '+name,status:r.status===0?'passed':'failed',...(r.status?{detail:r.stderr}:{})});console.log((r.status?'FAIL ':'PASS ')+'cleanup '+name);
  }
  fs.writeFileSync(path.join(__dirname,'quality-live-results.json'),JSON.stringify({date:new Date().toISOString(),context:ctx,serverVersion:version.serverVersion.gitVersion,results},null,2));
 }
 process.exitCode=results.some(r=>r.status==='failed')?1:0;
})().catch(e=>{console.error(e);process.exitCode=1;});

