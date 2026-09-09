const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../kubernetes-learning-lab');
const topics=JSON.parse(fs.readFileSync(path.join(__dirname,'new40-topics.json'),'utf8'));
const chapters=['05-bookshop-platform','06-bookshop-reliability'];
function write(file,content){const dest=path.join(root,file);if(fs.existsSync(dest))throw Error('Refusing overwrite: '+dest);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,content.replaceAll('§','`').trim()+'\n','utf8');}
function topic(n,d){const [slug,title]=topics[n-41],chapter=chapters[n<61?0:1],dir=chapter+'/topics/'+slug+'/';
write(dir+'lesson.md',`# ${title}\n\n## Concise technical summary\n\n${d.summary.map((s,i)=>`${i+1}. ${s}`).join('\n')}\n\nMemory cue: ${d.cue}\n\n## Plain meaning\n\n${d.plain}\n\n## The Bookshop story\n\n${d.story}\n\n## Details and production use\n\n${d.detail}\n\nFurther reading: ${d.source}.\n\nRead the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).`);
write(dir+'manifest-guide.md',`# ${title}: reading the manifests\n\n${d.guide}\n\nShared fields are explained in the [chapter manifest guide](../../manifest-guide.md). Continue with the [runbook](runbook.md).`);
write(dir+'runbook.md',`# ${title}: runbook\n\nRun from the chapter directory, as shown in [shared setup](../../runbook.md).\n\n${d.runbook}`);
}
function parents(){for(let i=0;i<2;i++){
const chapter=chapters[i],start=i?61:41,end=i?80:60,ns=i?'k8s-learning-reliability':'k8s-learning-platform',app=i?'reliable-catalog':'platform-catalog',port=i?8085:8084;
write(chapter+'/README.md',`# Tiny Bookshop: ${i?'reliability and scale':'platform engineering'}\n\nThis chapter covers source questions ${start}-${end} in their original order. Maya's Bookshop now needs ${i?'repeatable recovery, controlled change, and evidence of security and capacity':'monitoring, predictable networking, configuration delivery, and an understanding of cluster internals'}.\n\nStart with [the story](story.md), [manifest conventions](manifest-guide.md), and [shared setup](runbook.md). Each topic has four short technical points, a memory cue, a concrete Bookshop connection, field explanations, and a runbook.\n\n## Topic path\n\n| Question | Topic | Practice |\n| --- | --- | --- |\n${topics.slice(i*20,i*20+20).map(([slug,title],j)=>`| ${start+j} | [${title}](topics/${slug}/lesson.md) | [Walkthrough](topics/${slug}/manifest-guide.md) / [Runbook](topics/${slug}/runbook.md) |`).join('\n')}\n\n## Scope and dependencies\n\nThe base uses namespace §${ns}§ and two small BusyBox web Pods on Linux nodes. Every topic lists its extra requirements. Missing metrics, controllers, CRDs, policies, or permissions mean the relevant live exercise is skipped; they do not prevent reading or local design work.\n\n${i?'Native sidecars require Kubernetes 1.33+ for the stable feature. The Gateway and KEDA exercises require existing installations. The recovery exercise uses its own disposable namespace. Upgrade, etcd restore, node provisioning, audit configuration, and encryption configuration are administrator procedures explained through inspection and planning.':'Question 44 uses its own quota namespace. cert-manager and External Secrets exercises use existing controllers; the secret-store demonstration contains only a public dummy value. Priority, CoreDNS customization, GitOps, etcd, and operator topics include observation/design work without taking over cluster infrastructure.'}\n\nDo not apply the chapter recursively. §optional/§ needs declared dependencies; §negative/§ contains inputs for server dry-run only; §reference/§ contains configuration to read, not objects to install.\n\nSee [validation status](../VALIDATION.md) for evidence and remaining checks.`);
write(chapter+'/story.md',i?`# Maya prepares the Bookshop for a difficult day

The shop may open in another region (61), so Maya starts with a security review (62) and checks what the courier network actually protects (63). An upgrade needs an order of work (64), while a recovery plan needs proof that a replacement shop can open (65). Costs must be tied to useful capacity (66).

A shared entrance delegates routing to branch owners (67). More branches create pressure on management systems (68), so policy checks review what enters the platform (69). New rooms require a suitable capacity controller (70) and a conscious choice of hosting responsibilities (71).

Old API forms need replacing before an upgrade (72). A native helper must finish correctly with its report Job (73). Workload size, count, and event schedules must cooperate (74). Connections need explicit trust decisions (75), changes need audit evidence (76), and stored secrets need appropriate protection (77).

Some jobs need stronger runtime isolation (78). New releases progress only with meaningful checks (79). When the temporary counter closes, Maya follows its ownership chain so the right objects are cleaned up (80).

The recurring question is: what observation would prove this worked? A diagram is not a failover test, a backup file is not a successful restore, and a green resource condition is not proof of customer success.`:`# Maya builds the Bookshop platform

Maya first asks how to see the shop clearly: metrics show changing measurements (41), logs record individual events (42), and release comparisons reveal whether a new counter should serve visitors (43). Budgets prevent one team from taking all the shared space (44).

Visitors need usable routes (45) and sometimes the addresses of individual counters (46). A temporary inspector helps diagnose a running worker (47). Counters should spread sensibly (48), and priority should express urgency without casually displacing others (49).

Certificates identify a practice service (50). Git records intended configuration (51), a secret controller maps a source into a Kubernetes Secret (52), and images need an explicit pull/authentication strategy (53). DNS rules (54) and EndpointSlices (55) explain how names lead to ready destinations.

Finally Maya looks behind the desk: cluster state storage (56), API admission (57), custom resources and their controllers (58), scheduling decisions (59), and the runtime that starts each container (60).

The same small catalog connects these topics. Optional platform features are examined only when installed, and every exercise distinguishes a written configuration from observed behaviour.`);
write(chapter+'/manifest-guide.md',`# Reading the chapter manifests

| File | Purpose |
| --- | --- |
| [Namespace](manifests/00-namespace.yaml) | Creates §${ns}§ with a library ownership label |
| [Page and metrics](manifests/10-page.yaml) | Holds the visible HTML and a fixed teaching metric |
| [Deployment](manifests/20-deployment.yaml) | Maintains two §${app}§ web replicas |
| [Service](manifests/30-service.yaml) | Selects those replicas through one ClusterIP |

§apiVersion§ and §kind§ choose the API and resource. §metadata.name§ identifies the object; §metadata.namespace§ isolates names and cleanup. Deployment §matchLabels.app§ equals its Pod label and the Service selector. The Pod also carries §team: bookshop§ and §purpose: learning§ for inspection and cost attribution.

The page ConfigMap is mounted read-only at §/www§. §exec httpd -f -p 8080 -h /www§ makes BusyBox's foreground HTTP server the main process. Service port 80 targets named port §http§, which resolves to container port 8080. Readiness requests §/§ every five seconds. Each replica requests §25m§ CPU and §32Mi§ memory, limited to §100m§ and §64Mi§. Rolling updates allow one extra replica and zero intentionally unavailable replicas.

UID/GID/fsGroup 1000, non-root execution, dropped capabilities, disabled privilege escalation, a read-only image filesystem, and RuntimeDefault seccomp follow the [earlier security walkthrough](../04-bookshop-operations/topics/37-security-context/manifest-guide.md). API token mounting is disabled. Topic-owned writable data uses named volumes.

§/metrics§ contains a fixed Prometheus-format gauge, §bookshop_catalog_titles 60§. It demonstrates a scrapeable endpoint, not a request counter, live business metrics, or realistic load. BusyBox is a teaching tool; image tags are mutable and production selection should also consider verification and digests.

Namespace-scoped optional custom resources still need their controllers. Reference configuration such as an audit policy or Corefile is not installed with §kubectl apply§. Read each topic's exact fields and prerequisites before use.`);
write(chapter+'/runbook.md',`# Chapter setup and cleanup

## 1. Choose the practice context

From §F:\\ops2book§:

~~~powershell
cd kubernetes-learning-lab/${chapter}
kubectl config current-context
kubectl get --raw=/readyz --request-timeout=5s
kubectl get nodes -L kubernetes.io/os
kubectl get namespace ${ns}
~~~

Use the intended non-production cluster and compatible kubectl. A fresh namespace should return NotFound. If it exists, inspect its ownership and contents before using it. Linux nodes must be able to pull §busybox:1.36§, and you need permission to create the four base resource types.

## 2. Start the catalog

~~~powershell
kubectl apply -f manifests/00-namespace.yaml
kubectl apply --dry-run=server -f manifests/
kubectl apply -f manifests/
kubectl -n ${ns} rollout status deployment/${app} --timeout=120s
kubectl -n ${ns} get pods,svc
kubectl -n ${ns} port-forward service/${app} ${port}:80
~~~

Open §http://localhost:${port}§ and expect the Bookshop ${i?'reliability':'platform'} desk. Ctrl+C stops the forward. Port-forward connects to one Pod and is not a network-policy or load-balancing test.

## 3. Complete the topics

Stay in this chapter directory for all its topic commands. Follow the [topic index](README.md#topic-path), one exercise at a time. Replace §PASTE_...§ placeholders only with objects you inspected. Keep failed/skipped dependency checks distinct from successful runtime observations.

If startup fails, use §kubectl -n ${ns} describe pods -l app=${app}§. Image pull errors, scheduling shortages, and policy rejection require different fixes. Do not change unrelated cluster controls to force the lab to run.

## 4. Cleanup

First complete topic-specific cleanup, including ${i?'the recovery namespace, KEDA resources, and the network policy':'the separate quota namespace and any certificate/ExternalSecret resources'}. Inspect this namespace:

~~~powershell
kubectl -n ${ns} get deploy,pods,svc,cm,secret,job,pvc,networkpolicy
kubectl get namespace ${ns} --show-labels
~~~

Only if it still contains your disposable chapter resources:

~~~powershell
kubectl delete namespace ${ns}
~~~

This removes its namespaced resources. No exercise installs a cluster-wide add-on or changes a node, cloud account, or control-plane configuration.`);
}}
if(require.main===module)parents();
module.exports={topic,write};
