# Production Governance and Recovery

Questions **96â€“110** turn production symptoms into safe Kubernetes investigations. Each topic has a lesson, walkthrough, and reversible runbook.

## Topics

- [96 cluster-cost](topics/96-cluster-cost/lesson.md) â€” Cluster costs spike unexpectedly
- [97 namespace-finalizer](topics/97-namespace-finalizer/lesson.md) â€” Namespace deletion stuck on finalizers
- [98 admission-outage](topics/98-admission-outage/lesson.md) â€” Admission webhook outage blocks every deployment
- [99 certificate-expired](topics/99-certificate-expired/lesson.md) â€” Certificate expired: kubelet cannot talk to the API server
- [100 pdb-drain](topics/100-pdb-drain/lesson.md) â€” Node drain kills too many replicas despite a PDB
- [101 api-overload](topics/101-api-overload/lesson.md) â€” API server overloaded: slow kubectl and controller loops
- [102 external-dns](topics/102-external-dns/lesson.md) â€” Pod resolves cluster DNS but not external DNS
- [103 helm-stuck](topics/103-helm-stuck/lesson.md) â€” Helm release stuck in pending-upgrade
- [104 pv-mixup](topics/104-pv-mixup/lesson.md) â€” Production mounts data from staging
- [105 cronjob-flood](topics/105-cronjob-flood/lesson.md) â€” CronJob creates thousands of completed Pods
- [106 psa-enforcement](topics/106-psa-enforcement/lesson.md) â€” Pod Security Admission rejects a workload
- [107 upgrade-safety](topics/107-upgrade-safety/lesson.md) â€” Upgrade a cluster safely with a rollback plan
- [108 node-drain-pdb](topics/108-node-drain-pdb/lesson.md) â€” Node drain cannot evict a Pod because of PDB
- [109 resource-quota](topics/109-resource-quota/lesson.md) â€” Namespace quota blocks a new workload
- [110 nonroot-enforcement](topics/110-nonroot-enforcement/lesson.md) â€” Container runs as root despite a non-root policy

Start with the [chapter story](story.md), then use the [manifest guide](manifest-guide.md) and [runbook](runbook.md).


