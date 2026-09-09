# RuntimeClass and sandboxing: reading the manifests

Read the [base Deployment](../../manifests/20-deployment.yaml). It omits `runtimeClassName` and therefore uses the platform’s default runtime handling. This differs from explicitly selecting a configured class.

An existing RuntimeClass has a cluster-scoped name and `handler`. Its optional `scheduling` constrains eligible nodes, and `overhead.podFixed` can add resource accounting beyond the application container requests. The node/runtime integration must implement that handler. No placeholder class or Pod is applied here because an invented handler cannot demonstrate a working sandbox.

Shared fields are explained in the [chapter manifest guide](../../manifest-guide.md). Continue with the [runbook](runbook.md).
