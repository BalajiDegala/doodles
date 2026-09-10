# 51. GitOps with Argo CD and Flux: runbook

Run from the chapter directory, as shown in [shared setup](../../runbook.md).

## Prerequisites

Local files are sufficient for the design exercise. Inspect existing controller resources only with permission.

~~~powershell
kubectl api-resources --api-group=argoproj.io
kubectl api-resources --api-group=kustomize.toolkit.fluxcd.io
kubectl -n k8s-learning-platform get deployment platform-catalog -o yaml
~~~

Missing custom APIs mean no live GitOps exercise is available.

## Write the reconciliation contract

Record the intended repository/path/revision, destination context/namespace, allowed resource types, review process, drift policy, prune policy, and recovery owner. Explain what happens if someone manually changes replicas. Compare an intentional Git change with an unauthorized drift correction.

If a pre-existing test Application/Kustomization is provided, read its observed revision, readiness/sync status, and events. Do not repoint it at these files or enable automation as part of this question.

## Troubleshooting and cleanup

Separate source authentication, render errors, destination permission, and unhealthy workloads. Discovery alone does not prove reconciliation. No repository or controller configuration is changed, so nothing needs cleanup.
