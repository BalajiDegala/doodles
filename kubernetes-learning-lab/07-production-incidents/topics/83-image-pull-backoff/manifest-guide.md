# 83. Pod stuck in ImagePullBackOff: manifest walkthrough

[Fault](faults/10-worker.yaml) uses `busybox:bookshop-q83-does-not-exist` with Always. [Repair](fixed/10-worker.yaml) restores `busybox:1.36` with IfNotPresent. If the failure is a timeout instead of a missing tag, the observation demonstrates a different pull problem.

The [shared manifest guide](../../manifest-guide.md) explains the catalog's selectors, port, resources, and security controls. Continue with the [runbook](runbook.md).
