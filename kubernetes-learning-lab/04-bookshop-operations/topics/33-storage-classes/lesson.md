# StorageClasses and dynamic provisioning

## Concise technical summary

1. A StorageClass describes storage offered by a cluster provisioner.
2. A PersistentVolumeClaim asks for capacity and access characteristics.
3. Dynamic provisioning can create a matching PersistentVolume for the claim.
4. Binding, expansion, and reclaim behaviour depend on the class and driver.

Memory cue: Class is the menu; claim is the order; volume is the locker.

## Plain meaning

Maya orders a locker from the building's storage desk. She describes how much space she needs. The desk allocates it using an existing service; Maya does not build a storage room herself.

## The Bookshop story

The `bookshop-locker` claim asks for 1 GiB from the existing default class. A reader Pod mounts the locker at `/data`. We write a note, replace the Pod, and check that the same note remains.

## Decisions behind a claim

`Immediate` binding starts allocation without waiting for a consumer. `WaitForFirstConsumer` coordinates binding with Pod placement, which matters when storage is tied to a node or zone. A waiting claim alone can therefore be normal.

`Delete` reclaim policy can remove backing storage after the claim is deleted. `Retain` leaves it for deliberate recovery or disposal. Neither policy is a backup. Expansion requires class and driver support; a larger claim is not permission to shrink an existing volume. [StorageClass reference](https://kubernetes.io/docs/concepts/storage/storage-classes/).

Choose reclaim policy, cost, performance, and recovery procedures with the storage owner. This lab consumes an existing class and does not modify the cluster default. `ReadWriteOnce` describes read/write mounting by one node; it does not guarantee exclusive access by one Pod or replicate application data.

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
