# 88. PVC stuck in Pending: runbook

## Prerequisites

PVC create/delete and StorageClass read permission. Confirm the intentionally missing class is absent. Do not substitute a real provider class merely to make the demonstration pass.

Use [chapter setup](../../runbook.md) first. Stay in the chapter directory; topic paths below are relative to it. The setup sets `$ctx` to the reviewed context and `$ns` to `k8s-learning-incidents`.

~~~powershell
kubectl --context $ctx get storageclass bookshop-q88-missing
kubectl --context $ctx -n $ns apply -f topics/88-pvc-pending/faults/
kubectl --context $ctx -n $ns get pvc q88-claim
kubectl --context $ctx -n $ns describe pvc q88-claim
kubectl --context $ctx -n $ns get events --field-selector involvedObject.name=q88-claim --sort-by=.metadata.creationTimestamp
~~~

Expect NotFound for the class, then a Pending claim. Allow the controller time to emit the storage-class error.

## Choose a real repair on paper

For an actual incident, inspect the named class and its provisioner/bindingMode. Decide whether the workload should use a supported class, a waiting consumer, or a repaired provider. Reusing a claim with data needs a storage-owner plan; this lab does not mutate one.

## Verification and troubleshooting

The claim remains Pending with no spec.volumeName and class-related evidence. If it binds unexpectedly, stop and inspect the allocated PV and reclaim policy before cleanup. A healthy storage demonstration is available in question 33.

## Rollback and cleanup

Only after confirming this claim is still unbound:

~~~powershell
kubectl --context $ctx -n $ns delete pvc q88-claim --ignore-not-found
~~~
