# 108. Production accidentally mounts staging PV data

Source: supplied Kubernetes PDF, question 108, pages 53. Practice: **Read-only data-provenance investigation**.

## Concise technical summary

1. A bound volume can contain the wrong dataset despite valid Kubernetes status.
2. Trace PVC, PV, storage handle, claim UID, and application data provenance.
3. Released Retain volumes are not automatically clean or safely reusable.
4. Contain writes and restore the correct data through a storage-owner plan.

Memory cue: Bound is not proof of the right books.

## Plain meaning

Maya receives a locker key that works, but the locker contains another branch's stock. A functioning lock does not establish ownership of the contents.

## The Bookshop story

The learner traces a supplied test claim to its backend and records expected dataset identity. The lab does not bind real staging data into another environment.

## Diagnosis and production details

Namespace separation does not make a cluster-scoped PV an environment-isolated asset. Compare claimRef namespace/name/UID, labels, volumeHandle, backup lineage, and application-level markers. Labels by themselves do not enforce binding policy.

After a Retain claim is released, its PV normally stays Released with the old claim reference until an administrator handles reclamation. The source's accidental-rebinding scenario needs an intervening reclaim/reuse step or misconfiguration; it is not ordinary automatic reuse of any retained disk. Do not clear claimRef, erase a disk, or switch reclaimPolicy while investigating.

Read the [manifest walkthrough](manifest-guide.md) and [runbook](runbook.md).

Further reading: [PV reclamation and binding](https://kubernetes.io/docs/concepts/storage/persistent-volumes/), [StorageClasses](https://kubernetes.io/docs/concepts/storage/storage-classes/).
