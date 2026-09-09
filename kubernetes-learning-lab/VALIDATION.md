# Validation checkpoint

Date: 2026-09-09. Content: 110 numbered source topics and two additional release-strategy labs. The [quality review](QUALITY-REVIEW-40-110.md) covers questions 40-80 and the complete rewrite of 81-110.

## Local checks

Passed: 345 Markdown files and their local links/anchors; 156 non-template YAML files containing 150 Kubernetes resource documents; and 18 rendered Helm/Kustomize documents. All 208 PowerShell command blocks parsed without syntax errors. Parsing does not execute commands or establish their runtime results.

The audit verifies Deployment selectors, Service ports and targets, authored configuration/storage/account references, declared workload security controls, and StatefulSet claim-template references. Deliberately invalid teaching inputs have narrowly scoped exceptions: the Q86 fault Service must select no workload, and the incomplete admission input is not expected to satisfy the normal security-control check.

There is exactly one topic for each number 1-110. Topics 21-110 have individual runbooks; topics 1-20 use the foundations chapter runbook. Each rewritten topic has a numbered lesson, walkthrough, runbook, four-point summary, memory cue, and explicit practice mode. The [source map](quality/source-map-81-110.json) records PDF pages 38-54. Additional checks detect duplicate topic documents, incorrect source headings, and damaged UTF-8 text. These establish consistency alongside editorial review; they are not complete API-schema or production validation.

Helm 4.0.5 and kubectl 1.34.1 with Kustomize 5.7.1 were used. From `04-bookshop-operations`:

~~~powershell
helm lint topics/32-helm-packaging/chart --strict
helm lint topics/32-helm-packaging/chart --strict -f topics/32-helm-packaging/values-evening.yaml
helm template desk topics/32-helm-packaging/chart -n k8s-learning-operations
helm template desk topics/32-helm-packaging/chart -n k8s-learning-operations -f topics/32-helm-packaging/values-evening.yaml
kubectl kustomize topics/35-kustomize-and-helm/base
kubectl kustomize topics/35-kustomize-and-helm/overlays/practice
~~~

Both chart values sets passed strict lint and rendered four documents each, including the test hook. The base/practice Kustomize configurations rendered three resources each; the Q66 recovery configuration rendered four. Replica counts, the changed Helm page checksum, patched Kustomize page, and restoration identities were checked. Helm 3 was not executed.

## Current live checks

The `rancher-desktop` cluster reported `v1.33.5+k3s1`. All 19 incident/governance checks passed, followed by both remaining namespace cleanup checks. The [runtime results](quality/runtime-81-110.json) record each outcome.

| Questions | Evidence observed |
| --- | --- |
| Shared setup | Both catalog Deployments became available and served their pages |
| 81-84 | Scheduling mismatch, crash logs, bad image, and missing ConfigMap reproduced; repairs succeeded; Q84 retained the same Pod UID |
| 86-87 | Empty Service selection and blocked readiness rollout reproduced and recovered |
| 88 | Missing StorageClass left an unbound claim; only the unbound test claim was removed |
| 91, 106 | Absolute internal DNS names resolved; the Q106 external name also resolved |
| 95 | Metrics were available and bounded HPA configuration was accepted; sustained oscillation was not induced |
| 96 | Ephemeral-storage manifest passed server dry-run; node disk exhaustion was not induced |
| 97 | Wrong backend target port failed, then succeeded after repair; this did not test an ingress controller |
| 98 | Cross-namespace traffic was denied, allowed for the intended client, and restored after policy cleanup |
| 101 | Dummy finalizer held namespace deletion; removing that exact dummy finalizer completed deletion |
| 104 | PDB rejected then allowed server-dry-run eviction; both Pod UIDs remained unchanged |
| 107 | Helm install, upgrade, rollback to revision 1, and chart response test passed |
| 109 | Job completed, logged the report, and TTL cleanup removed it and its Pod; CronJob history pruning was not tested |
| 110 | Restricted admission accepted the good Pod and rejected the root variant in dry-run; the running good Pod reported UID 1000 |

The corrected Q47 PowerShell completion wait and subsequent inspector logs also passed. Q58's CRD discovery returned explicit served/storage flags. Their [targeted results](quality/runtime-47-58.json) include successful cleanup.

All new exercises used absent-before-test learning namespaces, which were removed afterward. Real node drains, production releases, datastore state, and application credentials were not changed.

## Earlier evidence and remaining limits

The [earlier platform/reliability results](../.tmp-source-review/new40-live-results.json) include metrics, structured logs, quotas, topology, cert-manager issuance, image pulling, EndpointSlices, admission, scheduling, Kustomize recovery, native sidecars, NetworkPolicy, Secret round-trip, and owner-reference cleanup. Initial headless-DNS and asynchronous-inspector failures have [successful retry evidence](../.tmp-source-review/new40-live-retry-results.json). This review did not rerun every previously passing exercise.

External Secrets, KEDA, Argo CD, Flux, and service-mesh integrations remain conditional on installed controllers. Administrator investigations involving etcd maintenance, real credential rotation, operator/control-plane upgrades, certificate renewal, storage recovery, cloud costs, or actual node drain remain documented investigation/tabletop exercises. Their written review is complete; their production procedures are not claimed as executed.
