const fs = require('node:fs');
const path = require('node:path');
const yaml = require('./validation/node_modules/js-yaml');
const {spawnSync} = require('node:child_process');
const root = path.resolve(__dirname, '../kubernetes-learning-lab');
const operations = path.join(root, '04-bookshop-operations');
const platform = path.join(root, '05-bookshop-platform');
const reliability = path.join(root, '06-bookshop-reliability');
const practiceChapters = [operations, platform, reliability];
const failures = [];
const counts = {markdownFiles:0,localLinks:0,yamlFiles:0,resourceDocuments:0,renderedDocuments:0,numberedTopics:0,topicsWithIndividualRunbooks:0};
function files(dir) {return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(path.join(dir,e.name)):[path.join(dir,e.name)]);}
const all=files(root);
const label=f=>path.relative(root,f).replaceAll('\\','/');
const fail=(f,m)=>failures.push(label(f)+': '+m);
function anchors(content) {
  const found=new Set(); const seen={}; let fenced=false;
  for(const line of content.split(/\r?\n/)) {
    if(/^\s*(```|~~~)/.test(line)){fenced=!fenced;continue;}
    if(fenced)continue;
    const m=line.match(/^#{1,6}\s+(.+?)\s*#*$/); if(!m)continue;
    let slug=m[1].replace(/\[([^\]]+)\]\([^)]+\)/g,'$1').toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu,'').replace(/\s/g,'-');
    const n=seen[slug]||0; seen[slug]=n+1; if(n)slug+='-'+n; found.add(slug);
  }
  return found;
}
for(const file of all.filter(f=>f.endsWith('.md'))) {
  counts.markdownFiles++; const text=fs.readFileSync(file,'utf8');
  for(const match of text.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const href=match[1]; if(/^(https?:|mailto:)/.test(href))continue;
    const [relative,hash]=href.split('#'); const target=path.resolve(path.dirname(file),decodeURIComponent(relative||'')); counts.localLinks++;
    if(!fs.existsSync(target)){fail(file,'missing link '+href);continue;}
    if(hash && target.endsWith('.md') && !anchors(fs.readFileSync(target,'utf8')).has(decodeURIComponent(hash)))fail(file,'missing anchor '+href);
  }
}
const resources=[];
for(const file of all.filter(f=>/\.ya?ml$/.test(f) && !f.replaceAll('\\','/').includes('/chart/templates/'))) {
  counts.yamlFiles++;
  try {
    yaml.loadAll(fs.readFileSync(file,'utf8')).filter(Boolean).forEach(d=>{if(d.kind&&d.metadata){resources.push({file,d});counts.resourceDocuments++;}});
  }catch(e){fail(file,e.message);}
}
function render(tool,args,name,cwd=operations) {
  const r=spawnSync(tool,args,{cwd,encoding:'utf8',windowsHide:true});
  if(r.error||r.status!==0){failures.push(name+': '+(r.error?.message||r.stderr||r.stdout));return [];}
  const parsed=yaml.loadAll(r.stdout).filter(Boolean);
  fs.writeFileSync(path.join(__dirname,name+'.yaml'),r.stdout,'utf8');
  counts.renderedDocuments+=parsed.length;
  console.log(name+': '+parsed.length+' rendered documents');
  for(const d of parsed)resources.push({file:path.join(cwd,name),d});
  return parsed;
}
const chart='topics/32-helm-packaging/chart';
for(const extra of [[],['-f','topics/32-helm-packaging/values-evening.yaml']]) {
  const r=spawnSync('helm',['lint',chart,'--strict',...extra],{cwd:operations,encoding:'utf8',windowsHide:true});
  console.log(r.stdout.trim());if(r.error||r.status!==0)failures.push('helm lint: '+(r.error?.message||r.stderr||r.stdout));
}
const morning=render('helm',['template','desk',chart,'-n','k8s-learning-operations'],'helm-morning');
const evening=render('helm',['template','desk',chart,'-n','k8s-learning-operations','-f','topics/32-helm-packaging/values-evening.yaml'],'helm-evening');
const kbase=render('kubectl',['kustomize','topics/35-kustomize-and-helm/base'],'kustomize-base');
const kpractice=render('kubectl',['kustomize','topics/35-kustomize-and-helm/overlays/practice'],'kustomize-practice');
const recovery=render('kubectl',['kustomize','topics/65-disaster-recovery/restore/practice'],'kustomize-recovery',reliability);
function expect(condition,message){if(!condition)failures.push(message);}
function named(list,kind){return list.find(d=>d.kind===kind);}
expect(named(morning,'Deployment')?.spec.replicas===1,'Helm morning must have one replica');
expect(named(evening,'Deployment')?.spec.replicas===2,'Helm evening must have two replicas');
expect(named(morning,'Deployment')?.spec.template.metadata.annotations['checksum/page']!==named(evening,'Deployment')?.spec.template.metadata.annotations['checksum/page'],'Helm page change must change rollout checksum');
expect(named(kbase,'Deployment')?.spec.replicas===1,'Kustomize base must have one replica');
expect(named(kpractice,'Deployment')?.spec.replicas===2,'Kustomize practice must have two replicas');
expect(named(kpractice,'ConfigMap')?.data['index.html'].includes('practice'),'Kustomize patch must change page');
const id=d=>[d.apiVersion,d.kind,d.metadata?.namespace,d.metadata?.name].join('/');
expect(JSON.stringify(kbase.map(id).sort())===JSON.stringify(kpractice.map(id).sort()),'Kustomize restoration requires the same resource identities');
expect(recovery.length===4,'Recovery overlay must render four resources');
expect(recovery.every(d=>d.kind==='Namespace'?d.metadata.name==='k8s-learning-recovery':d.metadata.namespace==='k8s-learning-recovery'),'Recovery overlay must isolate every resource');
const has=(kind,name,ns)=>resources.some(({d})=>d.kind===kind&&d.metadata.name===name&&d.metadata.namespace===ns);
function podSpec(d){return d.kind==='Pod'?d.spec:d.kind==='CronJob'?d.spec?.jobTemplate?.spec?.template?.spec:d.spec?.template?.spec;}
const templates=resources.filter(({d})=>podSpec(d));
const matches=(selector,labels)=>Object.entries(selector||{}).every(([k,v])=>labels?.[k]===v);
for(const {file,d} of resources) {
  if(!d.apiVersion||!d.metadata?.name)fail(file,'resource missing identity');
  if(d.kind==='Namespace') {if(!d.metadata.name.startsWith('k8s-learning-'))fail(file,'unexpected namespace');}
  else if(!d.metadata.namespace?.startsWith('k8s-learning-'))fail(file,'resource missing lab namespace');
  if(d.kind==='Deployment'||d.kind==='StatefulSet'||d.kind==='DaemonSet') {
    if(!matches(d.spec.selector.matchLabels,d.spec.template.metadata.labels))fail(file,'selector does not match Pod template');
  }
  if(d.kind==='Service') {
    const targets=templates.filter(({d:t})=>t.metadata.namespace===d.metadata.namespace && matches(d.spec.selector,t.kind==='Pod'?t.metadata.labels:t.spec?.template?.metadata.labels));
    if(!targets.length)fail(file,'Service selects no authored workload');
    for(const port of d.spec.ports||[])if(typeof port.targetPort==='string'&&!targets.some(({d:t})=>podSpec(t).containers.some(c=>c.ports?.some(p=>p.name===port.targetPort))))fail(file,'unresolved Service targetPort '+port.targetPort);
  }
  const spec=podSpec(d);if(!spec)continue;
  const volumes=spec.volumes||[];
  for(const v of volumes) {
    for(const [field,kind] of [['configMap','ConfigMap'],['secret','Secret'],['persistentVolumeClaim','PersistentVolumeClaim']]) {
      if(!v[field])continue;const name=v[field].name||v[field].secretName||v[field].claimName;
      if(!has(kind,name,d.metadata.namespace))fail(file,'missing '+kind+' reference '+name);
    }
  }
  if(spec.serviceAccountName&&spec.serviceAccountName!=='default'&&!has('ServiceAccount',spec.serviceAccountName,d.metadata.namespace))fail(file,'missing ServiceAccount reference');
  for(const c of [...(spec.initContainers||[]),...spec.containers]) {
    for(const m of c.volumeMounts||[])if(!volumes.some(v=>v.name===m.name)&&!d.spec?.volumeClaimTemplates?.some(v=>v.metadata.name===m.name))fail(file,'unknown mounted volume '+m.name);
    for(const e of c.env||[]) {
      for(const [field,kind]of [['configMapKeyRef','ConfigMap'],['secretKeyRef','Secret']]) {
        const ref=e.valueFrom?.[field];if(!ref)continue;
        if(!resources.some(({d:t})=>t.kind===kind&&t.metadata.name===ref.name&&t.metadata.namespace===d.metadata.namespace&&(ref.key in (t.data||{})||ref.key in (t.stringData||{}))))fail(file,'missing environment key '+ref.name+'/'+ref.key);
      }
    }
    if(practiceChapters.some(chapter=>file.startsWith(chapter))&&!file.includes(path.sep+'negative'+path.sep)) {
      const sc={...spec.securityContext,...c.securityContext};
      if(sc.runAsNonRoot!==true||sc.allowPrivilegeEscalation!==false||sc.seccompProfile?.type!=='RuntimeDefault'||!sc.capabilities?.drop?.includes('ALL'))fail(file,'ordinary operations workload missing declared security controls');
    }
  }
}
const topicNumbers=[];
for(const chapter of [path.join(root,'01-kubernetes-basics'),...practiceChapters]) {
 for(const dir of fs.readdirSync(path.join(chapter,'topics'))) {
  counts.numberedTopics++;topicNumbers.push(Number(dir.slice(0,2)));
  const required=['lesson.md','manifest-guide.md'];
  if(practiceChapters.includes(chapter)){required.push('runbook.md');counts.topicsWithIndividualRunbooks++;}
  for(const f of required)if(!fs.existsSync(path.join(chapter,'topics',dir,f)))failures.push(dir+': missing '+f);
  const lesson=fs.readFileSync(path.join(chapter,'topics',dir,'lesson.md'),'utf8');
  expect((lesson.match(/^[1-4]\. /gm)||[]).length===4,dir+': needs four concise technical points');
  expect(lesson.includes('Memory cue:'),dir+': needs memory cue');
 }
}
expect(JSON.stringify(topicNumbers.sort((a,b)=>a-b))===JSON.stringify(Array.from({length:80},(_,i)=>i+1)),'Expected each topic 1-80 exactly once');
console.log(JSON.stringify({counts,failures},null,2));
fs.writeFileSync(path.join(__dirname,'validation-result.json'),JSON.stringify({counts,failures},null,2)+'\n');
process.exitCode=failures.length?1:0;
