# Horizontal Pod Autoscaling

## Concise technical summary

1. HPA changes a workload's replica count using observed metrics.
2. CPU utilization is measured against CPU requests, not CPU limits.
3. Minimums, maximums, and stabilization control scaling behaviour.
4. Metrics and spare node capacity are required; HPA does not create nodes.

Memory cue: Measure load, change copies, stay within bounds.

## Plain meaning

When each counter becomes busy, Maya opens more counters. She still needs floor space; writing 'open three counters' does not build a new room.

## The Bookshop story

A separate scale-demo worker produces a short, bounded CPU burst. It teaches HPA mechanics without sending load at the real shop or an external website.

## Understand the percentage

With a `100m` CPU request, `50%` utilization means about `50m` CPU use, not half a node and not half the `200m` limit.

A simplified calculation is `ceil(current replicas × observed metric / target metric)`. Two replicas averaging 80% against a 50% target suggest four replicas before applying bounds. This lab caps at three. Real calculations also account for missing metrics, readiness, tolerance, and stabilization.

CPU/memory resource metrics commonly come from Metrics Server. Custom metrics such as queue depth require a suitable adapter/provider. More traffic does not necessarily cause CPU scaling if CPU stays low.

Our workers each generate their own CPU load. More replicas do not divide that work, so this is a controller demonstration, not a realistic performance benchmark or a proof that the shop can handle more customers.

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).

Further reading: [HPA behaviour](https://kubernetes.io/docs/concepts/workloads/autoscaling/horizontal-pod-autoscale/), [resource metrics pipeline](https://kubernetes.io/docs/tasks/debug/debug-cluster/resource-metrics-pipeline/).
