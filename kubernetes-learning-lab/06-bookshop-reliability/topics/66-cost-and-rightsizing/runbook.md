# 66. Cost allocation and right-sizing: runbook

Run from the chapter directory, as shown in [shared setup](../../runbook.md).

## Prerequisites

Base inspection works without metrics. Usage checks require the resource metrics API; cost attribution needs an existing cost system.

~~~powershell
kubectl -n k8s-learning-reliability get deployment reliable-catalog -o yaml
kubectl -n k8s-learning-reliability top pods -l app=reliable-catalog
~~~

Calculate the declared totals and compare with available usage. Missing metrics means the sizing conclusion remains incomplete.

## Decision worksheet

Record historical peak/percentile usage, latency/error targets, throttling/OOM evidence, ownership labels, and the mechanism that would release billable capacity. Propose one change with a rollback trigger; do not make it from a single idle sample.

If no billing data is available, report resource quantities rather than inventing currency savings. No resources or billing settings change, so no cleanup is needed.
