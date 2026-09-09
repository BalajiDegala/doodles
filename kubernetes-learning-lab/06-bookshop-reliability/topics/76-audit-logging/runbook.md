# Kubernetes audit logging: runbook

Run from the chapter directory, as shown in [shared setup](../../runbook.md).

## Prerequisites

Base read access. Correlation requires an existing audit backend and an authorized reader.

~~~powershell
Get-Date -Format o
kubectl auth whoami
kubectl -n k8s-learning-reliability get deployment reliable-catalog
Get-Date -Format o
~~~

Record the time window, effective identity, verb get, resource deployments, namespace, and name. Do not export credentials. Ask the authorized audit reader to find the matching request/result and explain its stage and detail level.

## Expected result and limits

A matching audit record proves configured collection for that request. If unavailable, mark audit verification skipped; do not substitute kubectl get events or a container log.

## Cleanup

No audit policy or backend is installed. The read request may leave an audit record according to existing policy; no application resource needs removal.
