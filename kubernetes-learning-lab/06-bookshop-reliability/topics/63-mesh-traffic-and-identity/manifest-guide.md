# Mesh identity, traffic, and observability: reading the manifests

Read the [base Service](../../manifests/30-service.yaml) and [earlier mesh foundations](../../../04-bookshop-operations/topics/40-service-mesh-foundations/manifest-guide.md). The authored port and selector describe Kubernetes routing only.

For an existing enrolled workload, compare namespace/workload enrollment, source/destination identities, effective authentication/authorization policy, route rules, and telemetry. Mesh-specific custom resources are not interchangeable with ordinary NetworkPolicy or RBAC. No new mesh manifests are provided because this chapter does not select or install a mesh implementation.

Shared fields are explained in the [chapter manifest guide](../../manifest-guide.md). Continue with the [runbook](runbook.md).
