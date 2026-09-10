# 92. etcd full: cluster writes blocked: manifest walkthrough

There is no etcd mutation manifest. Workload YAML cannot compact the datastore. The [earlier disaster-recovery guide](../../../06-bookshop-reliability/topics/65-disaster-recovery/manifest-guide.md) distinguishes API state from volume data. The important fields are member health, revision, backend bytes, quota, and alarms.

The [shared manifest guide](../../manifest-guide.md) explains the catalog's selectors, port, resources, and security controls. Continue with the [runbook](runbook.md).
