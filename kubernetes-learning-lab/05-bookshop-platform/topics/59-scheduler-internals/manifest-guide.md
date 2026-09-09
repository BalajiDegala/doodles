# 59. Scheduler filtering and scoring: reading the manifests

File: [custom-scheduler wait](manifests/10-custom-scheduler.yaml).

`schedulerName: bookshop-uninstalled-scheduler` directs scheduling to a controller that this lab does not install. The Linux selector and small resource request remain ordinary. No node is deliberately filled and no Pod is made preempting.

The expected live evidence is an empty `spec.nodeName` while the Pod waits. The usual scheduler should not bind it on behalf of the named scheduler. The topic does not create a scheduler Deployment or mutate the shared catalog’s scheduling policy.

Shared fields are explained in the [chapter manifest guide](../../manifest-guide.md). Continue with the [runbook](runbook.md).
