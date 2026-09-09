# 68. Kubernetes at scale: runbook

Run from the chapter directory, as shown in [shared setup](../../runbook.md).

## Prerequisites

Read access to the lab namespace; broader platform metrics are optional.

~~~powershell
kubectl -n k8s-learning-reliability get deploy,rs,pods,svc
kubectl -n k8s-learning-reliability get endpointslices -l kubernetes.io/service-name=reliable-catalog
kubectl -n k8s-learning-reliability get events --sort-by=.metadata.creationTimestamp
~~~

## Capacity model

List steady object counts and the extra churn from a rollout, crash loop, or scaling burst. For each likely bottleneck, name a measurable signal and its owner. Include IP quotas, storage attachments, admission latency, and monitoring cardinality.

If a large-cluster dashboard is provided, compare actual signals with the current supported envelope for that platform. A successful two-Pod exercise is not a scalability benchmark. No load, tuning, or infrastructure change occurs, so cleanup is unnecessary.
