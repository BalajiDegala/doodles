const fs=require('node:fs'),path=require('node:path');
const yaml=require('./validation/node_modules/js-yaml');
const root=path.resolve(__dirname,'../kubernetes-learning-lab');
const chapters=['07-production-incidents','08-production-governance'],index=[];
const chapter=n=>chapters[n<=95?0:1],namespace=n=>n<=95?'k8s-learning-incidents':'k8s-learning-governance',app=n=>n<=95?'incident-catalog':'governance-catalog';
function write(file,s){const dest=path.join(root,file);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,s.replaceAll('§',String.fromCharCode(96)).trim()+'\n','utf8');}
function y(file,o){write(file,(Array.isArray(o)?o:[o]).map(d=>yaml.dump(d,{lineWidth:100,noRefs:true})).join('---\n'));}
function spec(n){const d=yaml.load(fs.readFileSync(path.join(root,'06-bookshop-reliability/manifests/20-deployment.yaml'),'utf8'));return JSON.parse(JSON.stringify(d.spec.template.spec).replaceAll('reliable-catalog',app(n)));}
function pod(n,name,modify=()=>{}){const s=spec(n);s.containers[0].name='worker';s.containers[0].command=['/bin/sh','-c'];s.containers[0].args=['sleep 3600'];delete s.containers[0].readinessProbe;delete s.containers[0].volumeMounts;delete s.volumes;s.restartPolicy='Never';modify(s);return {apiVersion:'v1',kind:'Pod',metadata:{name,namespace:namespace(n),labels:{exercise:'q'+n}},spec:s};}
function deployment(n,name,modify=()=>{}){const s=spec(n);modify(s);return {apiVersion:'apps/v1',kind:'Deployment',metadata:{name,namespace:namespace(n)},spec:{replicas:1,selector:{matchLabels:{app:name}},strategy:{type:'RollingUpdate',rollingUpdate:{maxSurge:1,maxUnavailable:0}},template:{metadata:{labels:{app:name,exercise:'q'+n}},spec:s}}};}
function service(n,name,selector,port=8080){return {apiVersion:'v1',kind:'Service',metadata:{name,namespace:namespace(n)},spec:{selector,ports:[{port:80,targetPort:port}]}};}
function add(n,slug,title,pages,d){
 const folder=n+'-'+slug,base=chapter(n)+'/topics/'+folder;
 const expand=s=>s.replaceAll('%APP%',app(n)).replaceAll('%NS%',namespace(n)).replaceAll('%TOPIC%',folder).replace(/(~~~powershell\r?\n)([\s\S]*?)(\r?\n~~~)/g,(_,open,body,close)=>open+body.replace(/\bK /g,'kubectl --context $ctx -n $ns ').replace(/\bC /g,'kubectl --context $ctx ')+close);
 if(d.summary.length!==4)throw Error('summary '+n);
 index.push({number:n,folder,chapter:chapter(n),title,sourcePages:pages,mode:d.mode});
 write(base+'/lesson.md',expand(`# ${n}. ${title}

Source: supplied Kubernetes PDF, question ${n}, pages ${pages}. Practice: **${d.mode}**.

## Concise technical summary

${d.summary.map((v,i)=>`${i+1}. ${v}`).join('\n')}

Memory cue: ${d.cue}

## Plain meaning

${d.plain}

## The Bookshop story

${d.story}

## Diagnosis and production details

${d.detail}

Read the [manifest walkthrough](manifest-guide.md) and [runbook](runbook.md).

Further reading: ${d.sources}.
`));
 write(base+'/manifest-guide.md',expand(`# ${n}. ${title}: manifest walkthrough

${d.guide}

The [shared manifest guide](../../manifest-guide.md) explains the catalog's selectors, port, resources, and security controls. Continue with the [runbook](runbook.md).
`));
 write(base+'/runbook.md',expand(`# ${n}. ${title}: runbook

## Prerequisites

${d.prereq}

Use [chapter setup](../../runbook.md) first. Stay in the chapter directory; topic paths below are relative to it. The setup sets §$ctx§ to the reviewed context and §$ns§ to §%NS%§.

${d.run}

## Verification and troubleshooting

${d.verify}

## Rollback and cleanup

${d.cleanup}
`));
 for(const [file,obj] of Object.entries(d.manifests||{}))y(base+'/'+file,obj);
}
function finish(){
 for(const [i,ch] of chapters.entries()){
  const n=i?96:81,ns=namespace(n),a=app(n);
  for(const f of ['00-namespace.yaml','10-page.yaml','20-deployment.yaml','30-service.yaml']){
   let s=fs.readFileSync(path.join(root,'06-bookshop-reliability/manifests',f),'utf8').replaceAll('k8s-learning-reliability',ns).replaceAll('reliable-catalog',a).replaceAll('reliability desk',i?'governance clinic':'incident clinic');
   write(ch+'/manifests/'+f,s);
  }
  const rows=index.filter(t=>t.chapter===ch);
  write(ch+'/README.md',`# ${i?'Production governance and recovery':'Production incident clinic'}

Source questions **${rows[0].number}-${rows.at(-1).number}**, in the PDF's order. Each topic has its own diagnosis, commands, expected evidence, and cleanup. Lab faults have names separate from the base application.

Start with the [story](story.md), [manifest guide](manifest-guide.md), and [setup](runbook.md).

| Question | Topic | Practice mode |
| --- | --- | --- |
${rows.map(t=>`| ${t.number} | [${t.title}](topics/${t.folder}/lesson.md) | ${t.mode} |`).join('\n')}

Administrator incidents use read-only investigation and decision exercises. They do not require breaking a node, filling etcd, exposing real credentials, or disrupting cluster admission. See [validation evidence](../VALIDATION.md) and the [quality review](../QUALITY-REVIEW-60-110.md).
`);
  write(ch+'/story.md',`# The Bookshop on-call shift

${i?"Maya's next shift brings failures beyond a single container: storage pressure, entry-point errors, trust rules, delayed cleanup, rising costs, and control-plane dependencies.":"A new catalog worker will not start. Maya first distinguishes scheduling, application crashes, image retrieval, and container setup. Each symptom leads to a different owner and repair."}

The chapter follows questions ${rows[0].number}-${rows.at(-1).number} in the supplied PDF. The common catalog is a known-good comparison, while each fault has a separate name. Keep the customer-visible symptom, evidence, change, and recovery observation together.

Confirm the catalog response, retained data where applicable, and the state of the controller responsible for the object. A completed worksheet records a design decision; it does not claim that a production failover happened.
`);
  write(ch+'/manifest-guide.md',`# Shared catalog fields

| File | Purpose |
| --- | --- |
| [Namespace](manifests/00-namespace.yaml) | Isolates the chapter in §${ns}§ |
| [Page](manifests/10-page.yaml) | Supplies the static catalog HTML and teaching metric |
| [Deployment](manifests/20-deployment.yaml) | Maintains two healthy §${a}§ replicas |
| [Service](manifests/30-service.yaml) | Maps port 80 to named container port §http§, 8080 |

The Deployment selector, Pod label, and Service selector agree on §app: ${a}§. The server reads its ConfigMap at §/www§. Each replica requests 25m CPU and 32Mi memory, with limits of 100m and 64Mi. The health probe reads §/§; rollout settings permit one surge replica and zero deliberately unavailable replicas.

UID/GID 1000, RuntimeDefault seccomp, dropped capabilities, disabled escalation, a read-only image filesystem, and no automatic API token keep the exercises small and unprivileged. See the [security walkthrough](../04-bookshop-operations/topics/37-security-context/manifest-guide.md).

Topic §faults/§ contains deliberate runtime failures, §fixed/§ contains repairs, §negative/§ is for admission rejection tests, and §optional/§ needs stated dependencies. Never recursively apply this chapter.
`);
  write(ch+'/runbook.md',`# Chapter setup and cleanup

## Select the practice cluster

From §F:\\ops2book§, open PowerShell and run:

~~~powershell
cd kubernetes-learning-lab/${ch}
$ctx = kubectl config current-context
$ns = '${ns}'
kubectl --context $ctx get --raw=/readyz --request-timeout=5s
kubectl --context $ctx get nodes -L kubernetes.io/os
kubectl --context $ctx get namespace $ns
~~~

Use a non-production Linux cluster and a compatible kubectl. The namespace should be absent; if it exists, verify it belongs to your prior exercise. You need permission for the base Namespace, ConfigMap, Deployment, and Service. Topic prerequisites list additional permissions. Nodes need access to §busybox:1.36§.

## Start and verify the known-good catalog

~~~powershell
kubectl --context $ctx apply -f manifests/00-namespace.yaml
kubectl --context $ctx apply --dry-run=server -f manifests/
kubectl --context $ctx apply -f manifests/
kubectl --context $ctx -n $ns rollout status deployment/${a} --timeout=120s
kubectl --context $ctx -n $ns exec deployment/${a} -- wget -T 3 -qO- http://${a}
~~~

Expect Bookshop HTML. Do not start a fault exercise until the base is healthy. Additional quotas or admission rules may reject a lab; investigate the exact error.

## Run one incident at a time

Follow the [topic index](README.md). Keep this PowerShell session so §$ctx§ and §$ns§ remain defined. Stop on unexpected nonzero exits. Deliberate failures are described beside the relevant step.

Real-incident inspection needs the affected namespace/object in a separately reviewed context. Apply commands and cleanup here are exclusively for disposable lab resources.

## Cleanup

Complete topic-specific cleanup first, especially finalizers, policies, and secondary namespaces. Inspect ownership before deleting the shared namespace:

~~~powershell
kubectl --context $ctx -n $ns get deploy,rs,pods,svc,cm,secret,job,cronjob,pvc,networkpolicy
kubectl --context $ctx get namespace $ns --show-labels
kubectl --context $ctx delete namespace $ns --timeout=120s
~~~

If deletion remains pending, use question 101's investigation. Do not remove an unknown finalizer to make cleanup look successful.
`);
 }
 write('quality/source-map-81-110.json',JSON.stringify(index,null,2));
}
module.exports={add,finish,pod,deployment,service,spec,namespace,app,write,y,index};
