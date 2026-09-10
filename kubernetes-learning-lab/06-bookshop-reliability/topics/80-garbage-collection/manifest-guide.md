# 80. Garbage collection and ownership: reading the manifests

File: [disposable Deployment](manifests/10-disposable-deployment.yaml). It has one replica, unique `app: disposable-counter` selectors, and the shared read-only catalog page. Generated ReplicaSets/Pods receive controller ownership references; the authored Deployment does not hardcode their generated names or UIDs.

`--cascade=orphan` removes the Deployment while preserving its ReplicaSet. That ReplicaSet still manages its Pod. Deleting the ReplicaSet with `--cascade=foreground` then waits for its blocking dependents. The shared ConfigMap is referenced as configuration, not owned by this Deployment, so it remains.

Shared fields are explained in the [chapter manifest guide](../../manifest-guide.md). Continue with the [runbook](runbook.md).
