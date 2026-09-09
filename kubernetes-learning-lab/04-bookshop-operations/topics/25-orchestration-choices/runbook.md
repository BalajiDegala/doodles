# Orchestration choices: runbook

## Prerequisites

The shared Deployment is enough. This is a read-only comparison exercise, not a migration.

## Inspect the boundary

~~~powershell
kubectl -n k8s-learning-operations get deployment bookshop-ops -o yaml
kubectl -n k8s-learning-operations get service bookshop-ops -o yaml
~~~

Identify four intentions: run an image, maintain two copies, supply a page, and route to healthy copies. Then identify which fields express those intentions specifically in Kubernetes.

## Expected result

You can explain which pieces would move unchanged (image and HTTP interface) and which must be redesigned (workload objects, configuration delivery, service discovery, access policy, storage integration).

For Maya's existing cluster, retaining Kubernetes reuses a working platform. For a different team, fewer platform responsibilities or tighter AWS integration could change that decision.

## Troubleshooting and cleanup

If access is forbidden, read the authored files instead. Nothing is created or changed by this topic, so no rollback or cleanup is needed.
