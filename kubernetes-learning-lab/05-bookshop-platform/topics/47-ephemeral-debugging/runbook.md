# 47. Ephemeral containers and kubectl debug: runbook

Run from the chapter directory, as shown in [shared setup](../../runbook.md).

## Prerequisites

A kubectl supporting the restricted debug profile, an ephemeral-container-capable cluster/runtime, and permission to update `pods/ephemeralcontainers`. If admission blocks the profile, inspect the authored example and skip injection.

~~~powershell
kubectl apply -f topics/47-ephemeral-debugging/manifests/
kubectl -n k8s-learning-platform wait --for=condition=Ready pod/debug-counter --timeout=120s
kubectl -n k8s-learning-platform debug pod/debug-counter --container=inspector --image=busybox:1.36 --target=counter --profile=restricted --attach=false -- sh -c 'ps; cat /etc/resolv.conf'
kubectl -n k8s-learning-platform wait --for=jsonpath='{.status.ephemeralContainerStatuses[0].state.terminated.reason}'=Completed pod/debug-counter --timeout=120s
kubectl -n k8s-learning-platform logs debug-counter -c inspector
kubectl -n k8s-learning-platform get pod debug-counter -o yaml
~~~

The wait allows the asynchronous inspector to start and finish before reading its log. It assumes this fresh exercise Pod has only the one ephemeral container. On timeout, inspect its status and events rather than adding a second inspector. Expect resolver data and process output, plus an ephemeral container entry. Missing target processes can mean unsupported targeting; it does not justify escalating the profile.

## Cleanup

The inspector’s terminated record remains until the Pod is removed.

~~~powershell
kubectl delete -f topics/47-ephemeral-debugging/manifests/ --ignore-not-found
~~~
