# Security contexts: runbook

## Prerequisites

Use the shared namespace and Linux nodes that support the declared runtime controls. No privileged container or node access is needed.

~~~powershell
kubectl apply --dry-run=server -f topics/37-security-context/manifests/
kubectl apply -f topics/37-security-context/manifests/
kubectl -n k8s-learning-operations wait --for=condition=Ready pod/secure-worker --timeout=120s
kubectl -n k8s-learning-operations exec secure-worker -- id
~~~

Expect UID 1000 and GID 1000. Group names may be absent in this small image; numeric IDs are the useful evidence.

## Compare writable and read-only paths

~~~powershell
kubectl -n k8s-learning-operations exec secure-worker -- sh -c 'echo permitted > /work/note.txt'
kubectl -n k8s-learning-operations exec secure-worker -- cat /work/note.txt
kubectl -n k8s-learning-operations exec secure-worker -- touch /tmp/image-write-test
kubectl -n k8s-learning-operations exec secure-worker -- cat /proc/mounts
kubectl -n k8s-learning-operations get pod secure-worker -o yaml
~~~

Expect `permitted`, then a nonzero write failure on the image filesystem, normally `Read-only file system`. Inspect the `/` mount's `ro` flag and compare `/work`. A permission error alone does not prove a read-only mount. Inspect the Pod's actual security fields as well as the filesystem outcome.

## Troubleshooting and cleanup

`CreateContainerConfigError` can indicate an image/user mismatch. A failed `/work` write needs a mount/ownership check. Read Pod events and the [field explanations](manifest-guide.md); do not enable root or privilege escalation as a generic repair.

~~~powershell
kubectl delete -f topics/37-security-context/manifests/ --ignore-not-found
~~~

Deleting this Pod also removes its `emptyDir` note. The shared website is unaffected.
