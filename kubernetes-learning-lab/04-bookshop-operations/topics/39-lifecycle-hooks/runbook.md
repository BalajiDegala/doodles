# Lifecycle hooks: runbook

## Prerequisites

Use the shared namespace, image access, and two terminals. Both terminals should be in the operations chapter directory. The target is a standalone disposable worker, not the base website.

## Start and follow logs in terminal 1

~~~powershell
kubectl apply -f topics/39-lifecycle-hooks/manifests/
kubectl -n k8s-learning-operations wait --for=condition=Ready pod/closing-worker --timeout=120s
kubectl -n k8s-learning-operations logs -f closing-worker
~~~

Expect `Main process started` and `postStart marker observed`. The latter is printed by the main process after reading the file, so its log position does not prove which process started first.

## Request graceful deletion in terminal 2

~~~powershell
kubectl -n k8s-learning-operations delete pod closing-worker --wait=false
~~~

Keep terminal 1 following the existing stream. Expect `preStop marker observed`, followed by `TERM received; closing complete`, then stream completion. Ctrl+C can close a lingering log client after the Pod disappears.

~~~powershell
kubectl -n k8s-learning-operations wait --for=delete pod/closing-worker --timeout=60s
kubectl -n k8s-learning-operations get pod closing-worker
~~~

Expect `NotFound` after deletion. No controller recreates this standalone Pod.

## Troubleshooting and cleanup

If a marker is missing, distinguish a disconnected log client from a hook failure. Inspect Pod events while it still exists or namespace events soon afterwards. Hook failures may appear as `FailedPostStartHook` or `FailedPreStopHook`. Logs fetched after deletion may no longer be available.

~~~powershell
kubectl -n k8s-learning-operations get events --field-selector involvedObject.name=closing-worker --sort-by=.metadata.creationTimestamp
kubectl delete -f topics/39-lifecycle-hooks/manifests/ --ignore-not-found
~~~

Reapply the manifest for another attempt. Avoid force deletion or a zero grace period: those bypass the graceful path being observed. This example does not assert that hooks will run during node loss.
