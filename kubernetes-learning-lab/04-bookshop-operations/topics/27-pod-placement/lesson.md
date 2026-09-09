# Pod affinity and anti-affinity

## Concise technical summary

1. Pod affinity places a Pod near other matching Pods.
2. Pod anti-affinity places it away from matching Pods.
3. A topology key defines whether near means the same node or zone.
4. Preferences allow flexibility; required rules can block scheduling.

Memory cue: Near whom, apart from whom, across which boundary.

## Plain meaning

Maya seats the catalog helper beside a shop counter, but prefers duplicate counters in separate rooms so one room failure affects fewer workers.

## The Bookshop story

A helper uses affinity toward the shared bookshop-ops Pods. A separate two-replica display Deployment prefers to keep its own copies on different nodes.

## Two independent demonstrations

Pod affinity matches labels on other Pods, unlike node affinity, which matches node labels. The scheduler then compares the relevant node topology labels.

Here `kubernetes.io/hostname` means a node-sized boundary. `topology.kubernetes.io/zone` would mean a zone-sized boundary, if the cluster labels its nodes consistently.

Preferred anti-affinity is not a guarantee of one replica per node. A single-node cluster can run both replicas. Required anti-affinity would make the extra copy Pending if no second eligible node existed.

Neither rule moves already-running Pods merely because a better arrangement becomes possible. Strong availability design also needs enough capacity, suitable storage topology, healthy replicas, and an application that tolerates failures.

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).

Further reading: [Inter-Pod affinity and anti-affinity](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#inter-pod-affinity-and-anti-affinity).
