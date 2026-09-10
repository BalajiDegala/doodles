# Production governance and recovery

Source questions **96-110**, in the PDF's order. Each topic has its own diagnosis, commands, expected evidence, and cleanup. Lab faults have names separate from the base application.

Start with the [story](story.md), [manifest guide](manifest-guide.md), and [setup](runbook.md).

| Question | Topic | Practice mode |
| --- | --- | --- |
| 96 | [Pod evicted due to disk pressure](topics/96-disk-pressure/lesson.md) | Read-only investigation and manifest preview |
| 97 | [Ingress returns 502 after deployment](topics/97-ingress-502/lesson.md) | Backend fault and repair |
| 98 | [Cross-namespace traffic blocked by NetworkPolicy](topics/98-cross-namespace-policy/lesson.md) | Policy fault and repair |
| 99 | [StatefulSet Pod stuck in Terminating](topics/99-statefulset-terminating/lesson.md) | Read-only investigation |
| 100 | [Cluster costs doubled overnight](topics/100-cost-spike/lesson.md) | Read-only cost investigation |
| 101 | [Namespace deletion blocked by finalizers](topics/101-namespace-finalizers/lesson.md) | Controlled finalizer drill |
| 102 | [Admission webhook blocks deployments cluster-wide](topics/102-admission-webhook-outage/lesson.md) | Read-only incident investigation |
| 103 | [Expired certificate breaks kubelet/API communication](topics/103-expired-certificates/lesson.md) | Administrator investigation |
| 104 | [Node drain disrupts workloads despite a PDB](topics/104-pdb-drain/lesson.md) | Dry-run eviction experiment |
| 105 | [API server overloaded: slow kubectl and timeouts](topics/105-api-overload/lesson.md) | Read-only control-plane investigation |
| 106 | [Pod resolves internal DNS but not external DNS](topics/106-external-dns/lesson.md) | Bounded DNS observation |
| 107 | [Helm release stuck in pending-upgrade](topics/107-helm-pending-upgrade/lesson.md) | Optional Helm recovery rehearsal |
| 108 | [Production accidentally mounts staging PV data](topics/108-wrong-pv-data/lesson.md) | Read-only data-provenance investigation |
| 109 | [CronJob accumulates thousands of completed Pods](topics/109-cronjob-accumulation/lesson.md) | Bounded Job cleanup drill |
| 110 | [Container runs as root despite Pod Security enforcement](topics/110-nonroot-enforcement/lesson.md) | Controlled admission test |

Administrator incidents use read-only investigation and decision exercises. They do not require breaking a node, filling etcd, exposing real credentials, or disrupting cluster admission. See [validation evidence](../VALIDATION.md) and the [quality review](../QUALITY-REVIEW-40-110.md).
