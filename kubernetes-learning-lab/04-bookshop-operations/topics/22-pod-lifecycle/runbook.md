# Pod lifecycle: runbook

## Prerequisites

Create the shared namespace first. Scheduling gates need Kubernetes 1.30+ for the stable feature. Check `kubectl explain pod.spec.schedulingGates`.

## Run and inspect

~~~powershell
kubectl apply -f topics/22-pod-lifecycle/manifests/
kubectl -n k8s-learning-operations get pods -l exercise=lifecycle -w
~~~

Stop watching with Ctrl+C. The short status may say `SchedulingGated`, `Completed`, and `Error`. Read the actual phases:

~~~powershell
kubectl -n k8s-learning-operations get pods -l exercise=lifecycle -o custom-columns=NAME:.metadata.name,PHASE:.status.phase
kubectl -n k8s-learning-operations logs lifecycle-success
kubectl -n k8s-learning-operations logs lifecycle-failure
kubectl -n k8s-learning-operations describe pod lifecycle-pending
~~~

Expect Pending, Succeeded, and Failed respectively after image startup. The failed Pod's terminated state records exit code 1. A fleeting Running phase may finish too quickly to see.

## Recovery and cleanup

These are deliberate outcomes, not broken shop Pods:

~~~powershell
kubectl delete -f topics/22-pod-lifecycle/manifests/ --ignore-not-found
~~~

If success/failure Pods also stay Pending, inspect their events for image pulls, admission, or scheduling problems. Do not confuse those with the intended scheduling gate on `lifecycle-pending`.
