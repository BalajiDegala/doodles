# 89. OOMKilled while application memory appears normal

Source: supplied Kubernetes PDF, question 89, pages 42-43. Practice: **Read-only investigation**.

## Concise technical summary

1. Container memory includes more than an application heap.
2. OOMKilled status is stronger evidence than exit code 137 alone.
3. Current metrics can miss the peak that killed a previous container.
4. Size from measured total demand and investigate leaks before increasing limits.

Memory cue: Account for the container, not only the heap.

## Plain meaning

The stock ledger counts books but ignores shelves, packing material, and staff space. The room can overflow even while the book count seems reasonable.

## The Bookshop story

Maya compares the catalog's container limit with observed memory and reads status evidence. The exercise does not intentionally exhaust the practice node.

## Diagnosis and production details

Native allocations, thread stacks, subprocesses, memory-backed volumes, and charged cache can contribute to the cgroup total. A runtime's own heap metric may cover only one component. Node OOM and container-limit OOM need different capacity analysis.

Inspect lastState.terminated.reason, events, and retained monitoring around the timestamp. A single `kubectl top` sample after restart misses the failed container's peak. There is no universally correct heap percentage or limit multiplier: runtime, workload, off-heap demand, and service latency determine headroom. Larger limits may defer a leak and increase node risk.

Read the [manifest walkthrough](manifest-guide.md) and [runbook](runbook.md).

Further reading: [Assign memory resources](https://kubernetes.io/docs/tasks/configure-pod-container/assign-memory-resource/), [Resource management](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/).
