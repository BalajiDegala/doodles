const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../kubernetes-learning-lab');
const read=p=>fs.readFileSync(path.join(root,p),'utf8').replace(/^\uFEFF/,'');
const write=(p,s)=>fs.writeFileSync(path.join(root,p),s.replaceAll('§',String.fromCharCode(96)).trimEnd()+'\n','utf8');
const map=JSON.parse(read('quality/source-map-81-110.json'));
const report='QUALITY-REVIEW-40-110.md';
for(const ch of ['07-production-incidents','08-production-governance'])write(ch+'/README.md',read(ch+'/README.md').replaceAll('QUALITY-REVIEW-60-110.md',report));
for(const file of ['lesson.md','manifest-guide.md','runbook.md']){
 const p='04-bookshop-operations/topics/40-service-mesh-foundations/'+file;
 write(p,read(p).replace(/^# (?!40\. )/,'# 40. '));
}
let coverage=read('COVERAGE.md').split('## Platform:')[0];
for(const [name,chapter,start,end] of [['Platform','05-bookshop-platform',41,60],['Reliability','06-bookshop-reliability',61,80]]){
 coverage+='## '+name+': topics '+start+'-'+end+'\n\nStart with the [chapter index]('+chapter+'/README.md).\n\n| Question | Lesson |\n| --- | --- |\n';
 for(const folder of fs.readdirSync(path.join(root,chapter,'topics'))){
  const number=Number(folder.split('-')[0]),title=read(chapter+'/topics/'+folder+'/lesson.md').split('\n')[0].replace(/^# \d+\. /,'');
  coverage+='| '+number+' | ['+title+']('+chapter+'/topics/'+folder+'/lesson.md) |\n';
 }
 coverage+='\n';
}
coverage+='## Incidents and recovery: topics 81-110\n\nThe question order below was checked against the supplied PDF, pages 38-54. Each lesson links its walkthrough and runbook.\n\n| Question | Source topic | PDF pages | Practice |\n| --- | --- | --- | --- |\n';
for(const t of map)coverage+='| '+t.number+' | ['+t.title+']('+t.chapter+'/topics/'+t.folder+'/lesson.md) | '+t.sourcePages+' | '+t.mode+' |\n';
coverage+='\n## Artifact and review status\n\n- The library contains 110 numbered topics and two additional blue-green/canary labs.\n- Topics 1-20 use the shared foundations runbook. Topics 21-110 have individual runbooks.\n- The committed 40-80 lessons were reviewed against their manifests, runbooks, and relevant primary documentation. Their useful explanations were retained, encoding was repaired, and heading/debug/discovery corrections were made.\n- All thirty 81-110 lessons, walkthroughs, and runbooks were rewritten. Their folders now match the source question numbers, and applicable exercises include bounded faults, explicit recovery, and cleanup.\n- Administrator investigations and unavailable optional integrations remain separate from successful runtime demonstrations.\n- See ['+report+']('+report+') for findings and [VALIDATION.md](VALIDATION.md) for checks and actual runtime evidence.\n\n## Source corrections\n\nThe PDF establishes the question sequence, not an infallible technical specification. The revised incident lessons correct Pending versus container waiting states, exit-137 interpretation, PDB scope and drain flags, retained-volume reuse, etcd alarm recovery, Secret incident evidence handling, Helm-version differences, Job cleanup selection, and Pod Security Admission behavior. Unsupported failure percentages and universal tuning prescriptions were removed.\n';
write('COVERAGE.md',coverage);
let main=read('README.md');
main=main.replace('The core project has 110 numbered topic folders. Topics 1-80 refer to the continuing story and runnable examples; topics 81-110 turn the same ideas into production incident and governance drills.','The library has 110 numbered topics across six topic chapters, plus two release-strategy extensions. The Bookshop story connects foundations, platform operation, and production incident response.');
main=main.replace('The operations and platform chapters add sixty more topic folders with individual runbooks and separate shared applications. The incident and governance chapters add thirty production troubleshooting topics.','The operations, platform, and reliability chapters add sixty topics with individual runbooks and shared applications. The incident and governance chapters add thirty source-matched troubleshooting topics with their own isolated catalogs.');
main=main.replace('Diagnose topics 81-95 from node, service, rollout, storage, DNS, and ingress symptoms','Diagnose topics 81-95: startup, nodes, routing, storage, DNS, datastore, secrets, operators, and HPA');
main=main.replace('Diagnose topics 96-110 from cost, admission, certificates, upgrades, quotas, and security symptoms','Diagnose topics 96-110: disk, ingress, policy, cleanup, costs, admission, certificates, Helm, data, and security');
main=main.replace('All operations topic commands run from §04-bookshop-operations§, including commands in its nested topic folders.'.replaceAll('§',String.fromCharCode(96)),'Each topic uses its own chapter directory, including commands in nested topic folders.');
main=main.replace('See [ROADMAP.md](ROADMAP.md) for the plan to grow this MVP into a full learning library.','See [ROADMAP.md](ROADMAP.md) for the content conventions and delivery checkpoint.');
main=main.replace('See [VALIDATION.md](VALIDATION.md) for local checks and the live-cluster verification still to perform.','See [VALIDATION.md](VALIDATION.md) for local checks, live results, and untested integration limits. The [quality review]('+report+') records the review of questions 40-110.');
write('README.md',main);
let roadmap=read('ROADMAP.md');
roadmap=roadmap.replace(/Current checkpoint:.*\n/, 'Current checkpoint: commit 6dd6a67 supplied the existing lessons through question 80, despite its stale roadmap text. Questions 40-80 have now been reviewed and questions 81-110 rewritten in the PDF order. The previous commit remains intact. See [quality review]('+report+') and [validation evidence](VALIDATION.md).\n');
write('ROADMAP.md',roadmap);
write(report,`# Quality review: Kubernetes questions 40-110

Review date: 2026-09-09. Baseline: commit §6dd6a67§, which contains questions 1-80. No commit was reset or rewritten. The uncommitted earlier 81-110 drafts were preserved in the workspace review backup before replacement.

## Findings and corrections

| Area | Finding before review | Resolution |
| --- | --- | --- |
| Source sequence | Questions 81-109 did not match their PDF topics; the four startup incidents were missing | Rebuilt the full 81-110 sequence from PDF pages 38-54 |
| Teaching content | All thirty late topics repeated generic response text and placeholder commands | Wrote distinct four-point summaries, memory cues, comparisons, Bookshop examples, diagnosis, and runbooks |
| Practical depth | Late topics had no specific manifests or observable repair steps | Added isolated startup/routing faults, PVC/DNS observations, HPA preview, NetworkPolicy, finalizer, eviction, Helm, TTL, and admission exercises |
| Text integrity | The heading edit had damaged UTF-8 punctuation in questions 41-80 | Restored committed prose with an exact-content guard while retaining numeric headings |
| Headings | Walkthroughs and runbooks in the reviewed range omitted question numbers | Numbered all three documents consistently for 40-110 |
| Q47 debugging | An asynchronous inspector could still be starting when logs were requested | Added a bounded completion wait and a timeout investigation path |
| Q58 discovery | Listing version names was described as proving served versions | Inspect served and storage flags explicitly |
| Validation scope | Topic counts and local links were presented as complete quality proof | Added source mapping and duplicate-content checks; report runtime and design evidence separately |
| Index accuracy | Range descriptions were stale or shifted, and individual runbook counts were overstated | Updated coverage, learning path, and roadmap from the actual topic files |

## Review of committed questions 40-80

The useful committed explanations and manifests were retained after review. In particular, they already distinguish mesh identity from authorization, manual metric fetches from scraping, headless DNS from port forwarding, CRDs from controllers, configuration rebuild from full recovery, and encoding from encryption. They do not promise fixed cloud prices, universal version-skew rules, automatic mesh coverage, or guaranteed canary percentages.

The review covered each lesson, its walkthrough/runbook, and referenced lab configuration. Concept-only topics remain design or observation exercises where no relevant installed controller exists. Such a lesson can be accurate without claiming a live integration was tested.

## Technical corrections in rewritten incidents

- Q81/Q84 separate Pod phase from scheduling and container waiting reasons.
- Q82/Q89 require status and event evidence before interpreting exit 137 as an OOM kill.
- Q87/Q104 distinguish Deployment rollout, eviction API, direct deletion, and drain flags.
- Q90 treats preStop timing as an application/routing design to verify, not a zero-error guarantee.
- Q92 includes quota versus filesystem diagnosis and alarm recovery, without direct Kubernetes-key deletion.
- Q93 invalidates credentials at their issuer and preserves incident evidence; it does not equate deleting logs with containment.
- Q94/Q102 distinguish admission and conversion failures and avoid blanket fail-open changes.
- Q99/Q108 require writer/data provenance before force deletion or retained-volume reuse.
- Q107 uses version-aware Helm guidance and does not teach release-Secret deletion as a routine fix.
- Q109 inspects terminal Job state and explains the limits of manual CronJob-template tests.
- Q110 distinguishes enforcement modes, admission history, kubelet checks, and runtime identity.

## Evidence and limits

The [coverage table](COVERAGE.md) maps every rewritten incident to its source pages and practice mode. [Validation](VALIDATION.md) records actual checks. File structure, syntax, server dry-run, runtime demonstrations, and administrator tabletop exercises establish different kinds of evidence; none substitutes for all the others.

This learning library does not claim a tested production cluster upgrade, datastore restore, real credential rotation, ingress-controller deployment, cloud failover, or node drain merely because its lesson and commands are present.
`);
