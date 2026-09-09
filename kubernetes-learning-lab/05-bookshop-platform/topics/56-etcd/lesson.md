# etcd and cluster state

## Concise technical summary

1. etcd is Kubernetes’ standard strongly consistent backing store for API state.
2. Raft quorum lets a healthy majority agree on updates.
3. API objects and application volume contents are different kinds of data.
4. Storage health, capacity, and tested recovery are essential to control-plane reliability.

Memory cue: Remember the desired shop; separately protect the books.

## Plain meaning

Maya’s central ledger records which counters should exist. The books inside a storage locker are separate contents; copying the ledger does not copy those books.

## The Bookshop story

We inspect one ConfigMap through the API and distinguish its stored configuration from catalog data on a hypothetical PVC. The exercise never accesses the live datastore directly.

## Details and production use

Ordinary Kubernetes components use the API server rather than bypassing it to change etcd keys. API reads can involve caches, so a kubectl read is not proof of a direct disk read. Distribution-specific lightweight backends can differ from the standard etcd arrangement.

Three members tolerate one member failure; five tolerate two while quorum remains. More members also add coordination work. Latency, leader changes, database quota, compaction, and disk health need monitoring. Backup frequency and recovery objectives belong to an explicit service requirement, not a universal hourly rule.

Further reading: [Operating etcd for Kubernetes](https://kubernetes.io/docs/tasks/administer-cluster/configure-upgrade-etcd/), [etcd disaster recovery](https://etcd.io/docs/v3.6/op-guide/recovery/).

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
