# ResourceQuota and LimitRange: runbook

Run from the chapter directory, as shown in [shared setup](../../runbook.md).

## Prerequisites

Permission for a fresh `k8s-learning-budgets` namespace, LimitRange, quota, and Pods. Inspect any existing namespace before using it.

~~~powershell
kubectl get namespace k8s-learning-budgets
kubectl apply -f topics/44-quotas-and-limitranges/manifests/00-namespace.yaml
kubectl apply -f topics/44-quotas-and-limitranges/manifests/
kubectl apply -f topics/44-quotas-and-limitranges/workloads/budget-one.yaml
kubectl -n k8s-learning-budgets get pod budget-one -o yaml
kubectl apply --dry-run=server -f topics/44-quotas-and-limitranges/negative/too-large.yaml
~~~

Expect default resources on budget-one and a LimitRange rejection for the oversized input. Then:

~~~powershell
kubectl apply -f topics/44-quotas-and-limitranges/workloads/budget-two.yaml
kubectl -n k8s-learning-budgets describe resourcequota counter-budget
kubectl apply --dry-run=server -f topics/44-quotas-and-limitranges/negative/budget-extra.yaml
~~~

Expect Pod usage 2 and a quota rejection. Both negative commands should exit nonzero for the stated reason; an unrelated permission error is not proof.

## Recovery and cleanup

Inspect policy values and quota usage if observations differ. Do not raise the limits just to make the failure inputs pass. After inspecting ownership and contents:

~~~powershell
kubectl -n k8s-learning-budgets get pods,limitrange,resourcequota
kubectl delete namespace k8s-learning-budgets
~~~
