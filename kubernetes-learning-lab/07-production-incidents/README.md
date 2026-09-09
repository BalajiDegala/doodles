# Production incident clinic

Source questions **81-95**, in the PDF's order. Each topic has its own diagnosis, commands, expected evidence, and cleanup. Lab faults have names separate from the base application.

Start with the [story](story.md), [manifest guide](manifest-guide.md), and [setup](runbook.md).

| Question | Topic | Practice mode |
| --- | --- | --- |
| 81 | [Pod stuck in Pending](topics/81-pod-pending/lesson.md) | Fault and repair |
| 82 | [Pod stuck in CrashLoopBackOff](topics/82-crashloopbackoff/lesson.md) | Fault and repair |
| 83 | [Pod stuck in ImagePullBackOff](topics/83-image-pull-backoff/lesson.md) | Fault and repair |
| 84 | [Pod stuck in ContainerCreating](topics/84-container-creating/lesson.md) | Fault and repair |
| 85 | [Node NotReady: diagnose without losing workloads](topics/85-node-notready/lesson.md) | Read-only investigation |
| 86 | [Service not routing traffic to Pods](topics/86-service-routing/lesson.md) | Fault and repair |
| 87 | [Deployment rollout stuck](topics/87-rollout-stuck/lesson.md) | Fault and repair |
| 88 | [PVC stuck in Pending](topics/88-pvc-pending/lesson.md) | Bounded storage investigation |
| 89 | [OOMKilled while application memory appears normal](topics/89-oomkilled/lesson.md) | Read-only investigation |
| 90 | [Intermittent 503 errors during rolling updates](topics/90-rolling-503/lesson.md) | Read-only investigation and reusable drill |
| 91 | [DNS resolution fails intermittently inside Pods](topics/91-intermittent-dns/lesson.md) | Bounded DNS observation |
| 92 | [etcd full: cluster writes blocked](topics/92-etcd-space/lesson.md) | Administrator investigation |
| 93 | [Secret exposed in logs: incident response](topics/93-secret-log-leak/lesson.md) | Incident tabletop |
| 94 | [Cluster upgrade breaks CRDs and operators](topics/94-operator-upgrade/lesson.md) | Read-only investigation |
| 95 | [HPA repeatedly scales up and down](topics/95-hpa-flapping/lesson.md) | Optional autoscaling inspection |

Administrator incidents use read-only investigation and decision exercises. They do not require breaking a node, filling etcd, exposing real credentials, or disrupting cluster admission. See [validation evidence](../VALIDATION.md) and the [quality review](../QUALITY-REVIEW-40-110.md).
