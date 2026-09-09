# etcd and cluster state: reading the manifests

Read the [page ConfigMap](../../manifests/10-page.yaml) and [Deployment](../../manifests/20-deployment.yaml). They declare API state that the control plane persists. Live `metadata.uid` identifies an object incarnation and `resourceVersion` supports API concurrency/watch semantics; neither is an application backup.

The base stores only disposable configuration and serves it from a projected volume. A real database’s PVC data would live in its storage system, outside an ordinary etcd snapshot. There is no etcd Pod or snapshot command in this chapter because that would require control-plane credentials and an environment-specific recovery design.

Shared fields are explained in the [chapter manifest guide](../../manifest-guide.md). Continue with the [runbook](runbook.md).
