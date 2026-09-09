# 101. Namespace deletion blocked by finalizers: runbook

## Prerequisites

Fresh disposable namespace and Namespace/ConfigMap lifecycle permissions. If the namespace or q101-held map already exists, inspect ownership before starting.

Use [chapter setup](../../runbook.md) first. Stay in the chapter directory; topic paths below are relative to it. The setup sets `$ctx` to the reviewed context and `$ns` to `k8s-learning-governance`.

~~~powershell
kubectl --context $ctx get namespace k8s-learning-finalizer
kubectl --context $ctx apply -f topics/101-namespace-finalizers/manifests/
kubectl --context $ctx delete namespace k8s-learning-finalizer --wait=false
kubectl --context $ctx get namespace k8s-learning-finalizer -o yaml
kubectl --context $ctx -n k8s-learning-finalizer get configmap q101-held -o yaml
~~~

Allow the namespace controller to process deletion. Look for deletionTimestamp and the held map's finalizer.

## Discover remaining resources

~~~powershell
$kinds = kubectl --context $ctx api-resources --verbs=list --namespaced -o name
foreach ($kind in $kinds) {
 kubectl --context $ctx -n k8s-learning-finalizer get $kind --ignore-not-found --request-timeout=5s
}
~~~

Do not discard errors: discovery/list failures are useful evidence.

## Release only the known dummy hold

~~~powershell
kubectl --context $ctx -n k8s-learning-finalizer patch configmap q101-held --type=json --patch-file topics/101-namespace-finalizers/reference/release-finalizer.json
kubectl --context $ctx wait --for=delete namespace/k8s-learning-finalizer --timeout=120s
~~~

## Verification and troubleshooting

The namespace remains Terminating while the dummy finalizer exists, then disappears after that hold is removed. A failed JSON test means the object differs from the exercise: inspect it instead of forcing the patch.

## Rollback and cleanup

The normal completion deletes both the map and namespace. If interrupted, inspect the known map, apply the same test-guarded patch, and finish namespace deletion. Never clear all finalizers or force namespace finalization.
