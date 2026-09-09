# Production Incident Clinic

Questions **81â€“95** turn production symptoms into safe Kubernetes investigations. Each topic has a lesson, walkthrough, and reversible runbook.

## Topics

- [81 node-notready](topics/81-node-notready/lesson.md) â€” Node NotReady: isolate the failure before evicting workloads
- [82 service-no-endpoints](topics/82-service-no-endpoints/lesson.md) â€” Service has no endpoints: prove selector, readiness, and port alignment
- [83 rollout-stuck](topics/83-rollout-stuck/lesson.md) â€” Deployment rollout stuck: distinguish readiness, capacity, and disruption blockers
- [84 pvc-pending](topics/84-pvc-pending/lesson.md) â€” PVC pending: classify storage class, binding mode, and provisioning failures
- [85 oomkilled](topics/85-oomkilled/lesson.md) â€” OOMKilled: account for the whole container memory footprint
- [86 rolling-503](topics/86-rolling-503/lesson.md) â€” Rolling update returns 503: make shutdown and readiness cooperate
- [87 dns-race](topics/87-dns-race/lesson.md) â€” DNS race or intermittent lookup failures inside Pods
- [88 etcd-full](topics/88-etcd-full/lesson.md) â€” etcd database full: recover safely before writes stop
- [89 secret-leak](topics/89-secret-leak/lesson.md) â€” Secret accidentally exposed in logs: contain, rotate, and scrub
- [90 operator-upgrade](topics/90-operator-upgrade/lesson.md) â€” Cluster upgrade breaks CRDs or operators
- [91 hpa-flapping](topics/91-hpa-flapping/lesson.md) â€” HPA flapping: stabilize scale-up and scale-down
- [92 eviction-disk](topics/92-eviction-disk/lesson.md) â€” Pod evicted for disk pressure: reclaim space without data loss
- [93 ingress-502](topics/93-ingress-502/lesson.md) â€” Ingress returns 502 after deployment
- [94 networkpolicy-cross-namespace](topics/94-networkpolicy-cross-namespace/lesson.md) â€” Cross-namespace traffic blocked after NetworkPolicy
- [95 statefulset-terminating](topics/95-statefulset-terminating/lesson.md) â€” StatefulSet Pod stuck terminating

Start with the [chapter story](story.md), then use the [manifest guide](manifest-guide.md) and [runbook](runbook.md).


