# API request flow and admission: runbook

Run from the chapter directory, as shown in [shared setup](../../runbook.md).

## Prerequisites

Shared namespace, reachable API, and permission to create Pods. The name must be unused.

~~~powershell
kubectl -n k8s-learning-platform get pod admission-preview
kubectl apply --dry-run=server -f topics/57-api-admission/manifests/10-admission-preview.yaml -o yaml
kubectl -n k8s-learning-platform get pod admission-preview
~~~

Expect NotFound before and after, with a successfully returned Pod specification in between. If the name already exists, stop and inspect ownership before interpreting the result.

## Explain the evidence

Identify authored versus server-returned fields, any warnings, and the distinction between Forbidden authorization errors and admission/schema rejection. A dry-run can still leave audit records even though it stores no Pod.

## Troubleshooting and cleanup

Read the exact webhook or validation error; do not disable admission to force a preview. No Pod should exist from this procedure, so no resource cleanup is needed.
