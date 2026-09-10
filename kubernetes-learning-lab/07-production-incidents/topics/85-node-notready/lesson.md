# 85. Node NotReady: diagnose without losing workloads

Source: supplied Kubernetes PDF, question 85, pages 40-41. Practice: **Read-only investigation**.

## Concise technical summary

1. Ready=False and Ready=Unknown describe different health information.
2. Node conditions, Lease heartbeats, and kubelet/runtime evidence narrow the cause.
3. Cordon prevents ordinary new placement but does not evacuate Pods.
4. Drain or replacement requires spare capacity and a data-safety decision.

Memory cue: Heartbeat, pressure, reachability, then replacement.

## Plain meaning

A branch stops answering head office. It might have lost power, lost the phone line, or become overcrowded. Closing it without locating its stock can make the problem worse.

## The Bookshop story

Maya inventories one actual node and its workers, then writes a recovery decision. No kubelet is stopped and no desktop node is drained.

## Diagnosis and production details

Inspect Ready, MemoryPressure, DiskPressure, and PIDPressure separately. Unknown can mean missed heartbeat information; it is not proof that the machine stopped executing. Check not-ready/unreachable taints and workload tolerations. Eviction timing depends on those controls and platform behavior.

For a real outage compare runtime health, disk/inode availability, certificates/clock, API reachability, and provider health. A PDB cannot restore a failed node or save emptyDir data. Fence an unreachable stateful writer before allowing a conflicting replacement.

Read the [manifest walkthrough](manifest-guide.md) and [runbook](runbook.md).

Further reading: [Nodes and heartbeats](https://kubernetes.io/docs/concepts/architecture/nodes/), [Safe drain](https://kubernetes.io/docs/tasks/administer-cluster/safely-drain-node/).
