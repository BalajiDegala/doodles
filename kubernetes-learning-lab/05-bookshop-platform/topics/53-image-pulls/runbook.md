# Image pulls and registry authentication: runbook

Run from the chapter directory, as shown in [shared setup](../../runbook.md).

## Prerequisites

Base namespace and registry access. Always needs registry resolution even when content is cached.

~~~powershell
kubectl apply -f topics/53-image-pulls/manifests/
kubectl -n k8s-learning-platform wait --for=condition=Ready pod/pull-cached pod/pull-resolve --timeout=120s
kubectl -n k8s-learning-platform get pod pull-cached pull-resolve -o yaml
kubectl -n k8s-learning-platform describe pod pull-resolve
~~~

Compare requested image, explicit pull policy, imageID, and pull events. Equal IDs are expected if the tag resolves to the same content; they do not prove that Always skipped registry access. Cache messages do not guarantee behaviour on another node.

## Troubleshooting and cleanup

Distinguish missing tags, authentication denial, registry/network failure, and platform admission. Do not print registry Secret contents while diagnosing. An unavailable registry is a dependency failure for this test.

~~~powershell
kubectl delete -f topics/53-image-pulls/manifests/ --ignore-not-found
~~~
