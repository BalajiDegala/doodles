# 92. etcd full: cluster writes blocked

Source: supplied Kubernetes PDF, question 92, pages 44. Practice: **Administrator investigation**.

## Concise technical summary

1. An etcd NOSPACE alarm can block normal writes even when reads still work.
2. Backend quota pressure differs from the host filesystem running out of space.
3. Compaction drops old revisions; defragmentation reclaims backend file space.
4. After recovery, clear the applicable alarm and verify writes and member health.

Memory cue: Quota or disk? Compact, reclaim, disarm, verify.

## Plain meaning

The office archive is full of old revisions. Removing old index entries and physically repacking the archive are separate jobs.

## The Bookshop story

Maya distinguishes a full cluster datastore from a catalog error using an administrator evidence checklist. The lab never fills or restores the live datastore.

## Diagnosis and production details

Have the datastore owner inspect alarms, per-member status, total backend size, in-use size, quota, and filesystem/inode capacity. Supported maintenance order depends on the deployed etcd version and platform. Read/delete behavior during a space alarm differs from normal writes; calling the whole cluster simply read-only hides recovery details.

Stop the writer generating excessive objects, preserve a usable backup/recovery path, compact an approved revision, and defragment members sequentially while maintaining quorum. After enough space is recovered, the owner disarms NOSPACE and tests a controlled write. Raising quota alone does not fix unbounded object churn. Do not delete Kubernetes keys directly through etcd.

Read the [manifest walkthrough](manifest-guide.md) and [runbook](runbook.md).

Further reading: [etcd maintenance](https://etcd.io/docs/v3.6/op-guide/maintenance/), [Operating etcd for Kubernetes](https://kubernetes.io/docs/tasks/administer-cluster/configure-upgrade-etcd/).
