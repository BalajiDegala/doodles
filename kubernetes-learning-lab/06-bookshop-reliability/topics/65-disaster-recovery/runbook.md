# Disaster recovery: runbook

Run from the chapter directory, as shown in [shared setup](../../runbook.md).

## Prerequisites

A fresh recovery namespace, spare capacity, image access, and permission for the four resource types. Inspect an existing namespace before using it.

~~~powershell
kubectl get namespace k8s-learning-recovery
kubectl kustomize topics/65-disaster-recovery/restore/practice
kubectl apply -k topics/65-disaster-recovery/restore/practice
kubectl -n k8s-learning-recovery rollout status deployment/reliable-catalog --timeout=120s
kubectl -n k8s-learning-recovery exec deployment/reliable-catalog -- wget -T 3 -qO- http://reliable-catalog
~~~

Expect the reliability page from the separate namespace. Record elapsed time and dependencies. This proves configuration rebuild only; mark volume/database/etcd recovery untested.

## Recovery worksheet

For a real shop, list each state store, backup location, access/key dependency, consistency method, recovery target, and restore verification. A backup job reporting success is insufficient evidence by itself.

## Cleanup

After confirming that the namespace still contains only the drill:

~~~powershell
kubectl -n k8s-learning-recovery get deploy,pods,svc,cm,pvc
kubectl delete namespace k8s-learning-recovery
~~~
