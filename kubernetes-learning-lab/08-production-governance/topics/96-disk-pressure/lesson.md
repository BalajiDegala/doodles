# 96. Pod evicted due to disk pressure

Source: supplied Kubernetes PDF, question 96, pages 46. Practice: **Read-only investigation and manifest preview**.

## Concise technical summary

1. DiskPressure can reflect low filesystem bytes or inodes on the node.
2. Container logs, writable layers, images, and disk-backed emptyDir consume different storage pools.
3. Pod eviction can destroy emptyDir data; a PVC has a separate lifecycle.
4. Use measured storage budgets and supported node cleanup instead of deleting kubelet directories.

Memory cue: Find the full filesystem, then protect its data.

## Plain meaning

The branch's loading area is full. Throwing away every box could discard customer orders; first distinguish rubbish, stock, and reusable crates.

## The Bookshop story

Maya inspects storage declarations and a bounded scratch-worker manifest. The exercise does not fill the node or trigger real eviction.

## Diagnosis and production details

Read the evicted Pod's status.reason/message, node DiskPressure condition, and events. Check both available bytes and inode exhaustion. Kubelet accounting depends on filesystem layout, runtime, and support for nodefs/imagefs/containerfs; one path or tool is not portable across all clusters.

Ephemeral-storage requests support scheduling and limits can trigger eviction, but they are not durable storage or guaranteed disk reservation. emptyDir sizeLimit alone does not reserve capacity. Memory-backed emptyDir is accounted as memory. Use approved image garbage collection and log rotation; manually removing runtime/kubelet directories risks active workloads.

Read the [manifest walkthrough](manifest-guide.md) and [runbook](runbook.md).

Further reading: [Node-pressure eviction](https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/), [Local ephemeral storage](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#local-ephemeral-storage).
