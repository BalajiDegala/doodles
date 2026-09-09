# 63. Mesh identity, traffic, and observability: runbook

Run from the chapter directory, as shown in [shared setup](../../runbook.md).

## Prerequisites

Base object reads need no mesh. Live mesh proof requires an already enrolled test workload, version-matched tooling, and permission from its owner.

~~~powershell
kubectl get namespace k8s-learning-reliability --show-labels
kubectl -n k8s-learning-reliability get pods -l app=reliable-catalog -o yaml
kubectl -n k8s-learning-reliability get service reliable-catalog -o yaml
~~~

## Evidence plan

For one request, record enrollment, negotiated protection, authenticated peer, authorization decision, route choice, response, and latency/error telemetry. Explain how a denied request and an unmeshed connection would look. A successful HTTP response alone proves none of the security claims.

When no mesh exists, mark runtime mesh checks skipped and complete the trace design. Do not add injection labels or enable broad policies.

## Cleanup

The exercise changes nothing; use the platform owner’s troubleshooting guide for gaps in existing telemetry.
