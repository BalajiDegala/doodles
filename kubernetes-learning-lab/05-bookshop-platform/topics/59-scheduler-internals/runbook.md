# Scheduler filtering and scoring: runbook

Run from the chapter directory, as shown in [shared setup](../../runbook.md).

## Prerequisites

Shared namespace and confirmation that the practice scheduler name is unused.

~~~powershell
kubectl apply -f topics/59-scheduler-internals/manifests/
kubectl -n k8s-learning-platform get pod scheduler-waiting -o wide
kubectl -n k8s-learning-platform get pod scheduler-waiting -o jsonpath='{.spec.schedulerName}'
kubectl -n k8s-learning-platform describe pod scheduler-waiting
~~~

Expect Pending and no assigned node. Events may be sparse because the named scheduler is absent; do not require an Insufficient CPU message. If it gets assigned, the assumption about scheduler availability was wrong—inspect the environment.

## Recovery and cleanup

The missing controller is the deliberate cause. Remove the disposable input rather than installing a cluster component.

~~~powershell
kubectl delete -f topics/59-scheduler-internals/manifests/ --ignore-not-found
~~~

Explain how this differs from a default-scheduler Pod rejected by filtering.
