# Quality review: Kubernetes questions 40-110

Review date: 2026-09-09. Baseline: commit `6dd6a67`, which contains questions 1-80. No commit was reset or rewritten. The uncommitted earlier 81-110 drafts were preserved in the workspace review backup before replacement.

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
