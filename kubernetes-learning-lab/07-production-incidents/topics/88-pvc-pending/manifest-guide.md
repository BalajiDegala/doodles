# 88. PVC stuck in Pending: manifest walkthrough

[Claim](faults/10-claim.yaml) asks for 1Mi, ReadWriteOnce, and class `bookshop-q88-missing`. There is no matching StorageClass or consumer. The runbook deletes only this still-unbound claim after confirming that no volume was allocated.

The [shared manifest guide](../../manifest-guide.md) explains the catalog's selectors, port, resources, and security controls. Continue with the [runbook](runbook.md).
