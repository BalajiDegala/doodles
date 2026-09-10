# 90. Intermittent 503 errors during rolling updates: runbook

## Prerequisites

Healthy catalog, Pod/EndpointSlice reads, and optional ingress request logs with timestamps. Run the earlier lifecycle drill using its own setup and namespace.

Use [chapter setup](../../runbook.md) first. Stay in the chapter directory; topic paths below are relative to it. The setup sets `$ctx` to the reviewed context and `$ns` to `k8s-learning-incidents`.

~~~powershell
kubectl --context $ctx -n $ns get deployment incident-catalog -o yaml
kubectl --context $ctx -n $ns get pods -l app=incident-catalog -o wide
kubectl --context $ctx -n $ns get endpointslices -l kubernetes.io/service-name=incident-catalog -o yaml
kubectl --context $ctx -n $ns get events --sort-by=.metadata.creationTimestamp
~~~

## Correlate an incident

Build a timeline of rollout start, Pod deletionTimestamp, readiness loss, endpoint changes, TERM receipt, application exit, and failed request times. Identify the slowest propagation or drain step.

For contained signal practice, follow the [question 39 runbook](../../../04-bookshop-operations/topics/39-lifecycle-hooks/runbook.md), then return here and state which ingress/connection behavior it does not test.

## Verification and troubleshooting

Recovery evidence must include request success/error/latency across a representative rollout through the real entry point. Pod readiness alone and a backend port-forward are incomplete. A timing change without a repeatable traffic test is still a hypothesis.

## Rollback and cleanup

The inspection changes nothing. Clean up the reused lifecycle lab with its own commands. A production hook/timeout change should have a reviewed template rollback; it cannot undo already interrupted requests.
