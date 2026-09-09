# 65. Disaster recovery

## Concise technical summary

1. Recovery requires matching each data type to a tested restore method.
2. An etcd snapshot protects API state rather than every application volume.
3. Velero and storage backup methods have scope and consistency requirements.
4. A restore drill must verify recovered application behaviour and recovery time.

Memory cue: A backup exists; a restore proves it is useful.

## Plain meaning

Maya keeps the counter plans, the stock records, and the keys separately. Rebuilding the counters is useful, but does not prove the missing stock records were recovered.

## The Bookshop story

We rebuild the disposable static catalog in a separate recovery namespace from authored files. This is a configuration-rebuild drill with an HTTP check, explicitly smaller than full disaster recovery.

## Details and production use

Define recovery point and time objectives from acceptable data loss and downtime. Database consistency, external services, credentials, encryption keys, storage drivers, and network routing can all affect recovery. Git contains only what was committed, and ordinary API exports are not a complete backup system.

Modern etcd recovery uses version-appropriate snapshot/restore tools; Kubernetes watch consumers can require revision-bump considerations during restoration. Velero’s object and volume coverage depends on configuration and supported plugins/methods. Never restore into a live control plane as an application lesson.

Further reading: [etcd recovery](https://etcd.io/docs/v3.6/op-guide/recovery/), [Velero documentation](https://velero.io/docs/main/).

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
