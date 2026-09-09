# Node affinity, taints, and tolerations

## Concise technical summary

1. Node affinity selects or prefers nodes using their labels.
2. A taint discourages or blocks Pods that do not tolerate it.
3. A toleration permits a matching taint; it does not select that node.
4. Hard requirements can leave a Pod Pending when no eligible node fits.

Memory cue: Affinity attracts; taints repel; tolerations permit.

## Plain meaning

Maya asks for a room with Linux equipment. A reserved-room sign can exclude ordinary workers; an access pass allows entry but does not reserve that room.

## The Bookshop story

A placement worker requires a Linux node and carries permission for a hypothetical bookshop-reserved node. We do not change any real node labels or taints.

## Read the long names in pieces

`requiredDuringSchedulingIgnoredDuringExecution` means "must match when scheduled; a later label change does not by itself evict the running Pod." `preferredDuringSchedulingIgnoredDuringExecution` is a preference the scheduler scores alongside other factors.

Taint effects differ: `NoSchedule` blocks new placement without a matching toleration; `PreferNoSchedule` is a soft avoidance; `NoExecute` can also evict running Pods that do not tolerate it. A toleration for one effect does not automatically match every effect.

All scheduling requirements still apply: resources, volume topology, node readiness, affinity, and taints. A toleration is not a scheduling guarantee or an authorization system for the Kubernetes API.

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).

Further reading: [Assign Pods to nodes](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/), [taints and tolerations](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/).
