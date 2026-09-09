# 81. Pod stuck in Pending

Source: supplied Kubernetes PDF, question 81, pages 38. Practice: **Fault and repair**.

## Concise technical summary

1. Pending includes both waiting for scheduling and waiting for container setup.
2. PodScheduled and nodeName distinguish placement failures from node-side startup failures.
3. The scheduler considers requests and constraints, not just current CPU usage.
4. Repair the incompatible constraint and verify a replacement Pod becomes Ready.

Memory cue: Assigned a node? If not, read the scheduling reason.

## Plain meaning

A new worker may be waiting for a desk or for tools at an assigned desk. The same waiting-room sign hides two different problems.

## The Bookshop story

Maya requests a worker for a branch label that no node has. The exercise changes only its template; it does not relabel or fill nodes.

## Diagnosis and production details

| Evidence | Investigation |
| --- | --- |
| No nodeName, PodScheduled=False | FailedScheduling events: requests, taints, required affinity, topology, scheduling gates |
| Node assigned, containers waiting | Image, init-container, volume, sandbox, or runtime errors; continue with questions 83-84 |
| Unbound PVC | Check binding mode and storage events; WaitForFirstConsumer can legitimately wait for scheduling |

Low `kubectl top` usage is not proof of available requested capacity. A quota rejection may prevent a Pod from being created: inspect the owning controller's events. Node autoscaling cannot satisfy an arbitrary impossible label. There is no evidence for the PDF's fixed percentage claim about the most common cause.

Read the [manifest walkthrough](manifest-guide.md) and [runbook](runbook.md).

Further reading: [Debug Pods](https://kubernetes.io/docs/tasks/debug/debug-application/debug-pods/), [Pod lifecycle](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/).
