# Multi-cluster strategies: reading the manifests

Read the [reliability namespace](../../manifests/00-namespace.yaml) and [Service](../../manifests/30-service.yaml). The namespace isolates names inside one cluster; creating another namespace is not a second cluster. Service DNS normally resolves within its cluster’s DNS domain.

No multi-cluster Service, federation controller, or remote kubeconfig is authored. A real design must specify discovery, routing, identity, data ownership/replication, and conflict handling. Reusing the same Deployment YAML in two places does not connect their data or traffic.

Shared fields are explained in the [chapter manifest guide](../../manifest-guide.md). Continue with the [runbook](runbook.md).
