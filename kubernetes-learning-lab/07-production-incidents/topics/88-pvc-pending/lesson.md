# 88. PVC stuck in Pending

Source: supplied Kubernetes PDF, question 88, pages 42. Practice: **Bounded storage investigation**.

## Concise technical summary

1. Pending means the claim has not bound to a suitable volume.
2. StorageClass existence, provisioner health, size, access mode, and topology affect binding.
3. WaitForFirstConsumer can intentionally defer provisioning until a consuming Pod is scheduled.
4. Investigate events before replacing a claim or altering stored data.

Memory cue: Class, consumer, provisioner, topology.

## Plain meaning

Maya has requested a storage locker, but a request slip is not a locker assignment. The provider may be waiting to learn which branch needs it.

## The Bookshop story

A tiny disposable claim requests a deliberately nonexistent StorageClass. It demonstrates evidence gathering without allocating a cloud disk.

## Diagnosis and production details

For static volumes, compare capacity, access modes, volumeMode, class, selectors, and claim reservation. For dynamic provisioning, inspect CSI/controller events, provider permissions/quotas, and available topology. A PVC selector can prevent dynamic provisioning on implementations where it is unsupported.

WaitForFirstConsumer is not inherently broken, and setting a Pod nodeName directly bypasses the scheduler path needed for delayed binding. PV/PVC binding does not prove an application has mounted the correct dataset. Deleting a bound claim can trigger storage deletion through reclaim policy; do not use deletion as a generic fix.

Read the [manifest walkthrough](manifest-guide.md) and [runbook](runbook.md).

Further reading: [Persistent volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/), [StorageClass binding modes](https://kubernetes.io/docs/concepts/storage/storage-classes/#volume-binding-mode).
