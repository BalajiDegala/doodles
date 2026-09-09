# Garbage collection and ownership: runbook

Run from the chapter directory, as shown in [shared setup](../../runbook.md).

## Prerequisites

Ready base ConfigMap, room for one small Pod, and permission to create/delete this disposable Deployment and its ReplicaSet. Verify the selector is unused before applying.

~~~powershell
kubectl -n k8s-learning-reliability get deploy,rs,pods -l app=disposable-counter
kubectl apply -f topics/80-garbage-collection/manifests/
kubectl -n k8s-learning-reliability rollout status deployment/disposable-counter --timeout=120s
kubectl -n k8s-learning-reliability get rs,pods -l app=disposable-counter -o yaml
kubectl -n k8s-learning-reliability delete deployment disposable-counter --cascade=orphan --wait=true
kubectl -n k8s-learning-reliability get rs,pods -l app=disposable-counter
~~~

Expect the ReplicaSet and Pod to remain. Inspect ownerReferences before and after to explain why. Do not recreate the Deployment during the observation, since adoption could change the ownership story.

## Finish cleanup

~~~powershell
kubectl -n k8s-learning-reliability delete rs -l app=disposable-counter --cascade=foreground --wait=true --timeout=60s
kubectl -n k8s-learning-reliability get rs,pods -l app=disposable-counter
kubectl -n k8s-learning-reliability get configmap reliable-catalog-page
~~~

Expect no exercise ReplicaSet/Pod and the base ConfigMap still present. If interrupted before orphaning, delete the exact disposable Deployment first. Investigate remaining owners/finalizers rather than force-removing unknown finalizers.
