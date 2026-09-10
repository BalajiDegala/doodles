# 105. API server overloaded: slow kubectl and timeouts: runbook

## Prerequisites

Namespace reads and optional platform metrics/audit access. A healthy baseline does not reproduce an overload. Do not grant metrics or audit permissions merely to run the lesson.

Use [chapter setup](../../runbook.md) first. Stay in the chapter directory; topic paths below are relative to it. The setup sets `$ctx` to the reviewed context and `$ns` to `k8s-learning-governance`.

~~~powershell
Get-Date -Format o
Measure-Command { kubectl --context $ctx -n $ns get deployment governance-catalog --request-timeout=5s }
kubectl --context $ctx get --raw=/readyz --request-timeout=5s
kubectl --context $ctx -n $ns get events --sort-by=.metadata.creationTimestamp --request-timeout=5s
~~~

## Trace one slow request

Record client versus server delay, response/error code, matching admission/audit evidence, and datastore latency. Identify the highest-volume caller through existing telemetry. Propose a bounded pause/rate-limit or client fix owned by that controller's operator.

## Verification and troubleshooting

A real mitigation should improve request latency/error rate, reduce queues, and let controllers catch up without starving critical requests. One fast kubectl call or a healthy readyz is insufficient evidence of sustained recovery.

## Rollback and cleanup

The sample creates no objects. Any later tuning or client pause needs a documented restoration plan and observation of both critical and ordinary API traffic.
