# 81. Pod stuck in Pending: manifest walkthrough

[Fault Deployment](faults/10-worker.yaml) sets `nodeSelector.learning.bookshop/branch: absent-q81`. The [fixed Deployment](fixed/10-worker.yaml) removes that additional selector while retaining Linux placement, resources, and a working probe. Both files address `q81-worker`; applying the repair starts a new ReplicaSet.

The [shared manifest guide](../../manifest-guide.md) explains the catalog's selectors, port, resources, and security controls. Continue with the [runbook](runbook.md).
