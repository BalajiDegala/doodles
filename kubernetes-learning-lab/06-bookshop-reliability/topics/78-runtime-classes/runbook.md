# 78. RuntimeClass and sandboxing: runbook

Run from the chapter directory, as shown in [shared setup](../../runbook.md).

## Prerequisites

Base read permission and optional cluster-scoped RuntimeClass read access.

~~~powershell
kubectl get runtimeclasses
kubectl -n k8s-learning-reliability get pods -l app=reliable-catalog -o custom-columns=NAME:.metadata.name,RUNTIMECLASS:.spec.runtimeClassName,NODE:.spec.nodeName
~~~

If a class exists and is approved for inspection:

~~~powershell
kubectl get runtimeclass PASTE_CLASS_NAME -o yaml
~~~

Replace the placeholder with the inspected name. Record handler, overhead, scheduling constraints, supported nodes, and the provider’s isolation evidence. An empty class list means the optional class-selection exercise is unavailable, not that containers cannot run.

## Design result and cleanup

Name one workload that might benefit and the compatibility/performance tests it needs. Do not change the base’s runtime class without an approved installed option and a separate test plan. All commands are read-only; no cleanup is needed.
