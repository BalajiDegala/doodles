# 43. Blue-green and canary releases: reading the manifests

Reuse the [blue-green manifest guide](../../../02-blue-green-deployment/manifest-guide.md) and [canary manifest guide](../../../03-canary-deployment/manifest-guide.md).

The blue-green Service’s selector chooses one release label; its two Deployments have distinct identities. The canary Service selects both stable and canary Pods, while their replica counts affect the available endpoints. Their ConfigMaps make the served version visible.

These examples already have independent namespaces and full YAML explanations, so this question adds no duplicate manifests. A Service port-forward attaches to one Pod and cannot prove the traffic distribution. Follow the existing runbooks’ in-cluster request tests.

Shared fields are explained in the [chapter manifest guide](../../manifest-guide.md). Continue with the [runbook](runbook.md).
