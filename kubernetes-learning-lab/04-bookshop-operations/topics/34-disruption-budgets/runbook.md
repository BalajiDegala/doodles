# PodDisruptionBudgets: runbook

## Prerequisites

The base must have exactly two ready replicas and no ongoing rollout. You need PDB permissions and `create` on `pods/eviction`. Inspect existing budgets so an unrelated rule does not confuse the demonstration.

~~~powershell
kubectl -n k8s-learning-operations get deployment bookshop-ops
kubectl -n k8s-learning-operations get pdb
kubectl auth can-i create pods --subresource=eviction -n k8s-learning-operations
kubectl apply -f topics/34-disruption-budgets/manifests/
kubectl -n k8s-learning-operations wait --for=jsonpath='{.status.disruptionsAllowed}'=1 pdb/bookshop-availability --timeout=60s
~~~

## Test a permitted eviction without deleting

~~~powershell
$shopPods = kubectl -n k8s-learning-operations get pods -l app=bookshop-ops -o json | ConvertFrom-Json
$budgetPod = $shopPods.items | Where-Object { -not $_.metadata.deletionTimestamp -and ($_.status.conditions | Where-Object { $_.type -eq 'Ready' -and $_.status -eq 'True' }) } | Select-Object -First 1
if (-not $budgetPod) { throw 'No ready Bookshop Pod found' }
$evictionBody = @{apiVersion='policy/v1'; kind='Eviction'; metadata=@{name=$budgetPod.metadata.name; namespace='k8s-learning-operations'}; deleteOptions=@{preconditions=@{uid=$budgetPod.metadata.uid}}} | ConvertTo-Json -Depth 5
$evictionUrl = '/api/v1/namespaces/k8s-learning-operations/pods/' + $budgetPod.metadata.name + '/eviction?dryRun=All'
$evictionBody | kubectl create --raw $evictionUrl -f -
kubectl -n k8s-learning-operations get pods -l app=bookshop-ops
~~~

Expect a successful Status response and both existing Pods still present. Keep `?dryRun=All` in the URL.

## Test a blocked eviction

~~~powershell
kubectl apply -f topics/34-disruption-budgets/variants/10-hold-all.yaml
kubectl -n k8s-learning-operations wait --for=jsonpath='{.status.disruptionsAllowed}'=0 pdb/bookshop-availability --timeout=60s
$evictionBody | kubectl create --raw $evictionUrl -f -
~~~

Expect a nonzero exit and a budget violation, commonly HTTP 429 `TooManyRequests`. `Forbidden` is a permission failure; a missing or replaced Pod requires rebuilding the request, not claiming PDB success. Allow the budget controller time to update status.

## Restore and clean up

~~~powershell
kubectl apply -f topics/34-disruption-budgets/manifests/10-pdb.yaml
kubectl -n k8s-learning-operations wait --for=jsonpath='{.status.disruptionsAllowed}'=1 pdb/bookshop-availability --timeout=60s
kubectl delete -f topics/34-disruption-budgets/manifests/ --ignore-not-found
~~~

Always remove the restrictive variant even if a check fails. No node maintenance action is part of this exercise.
