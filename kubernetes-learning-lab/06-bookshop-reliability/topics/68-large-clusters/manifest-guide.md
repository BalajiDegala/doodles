# 68. Kubernetes at scale: reading the manifests

Read the [Deployment](../../manifests/20-deployment.yaml) and generated EndpointSlices from [question 55](../../../05-bookshop-platform/topics/55-endpointslices/manifest-guide.md). Each desired replica adds Pod/controller/status activity, not just CPU usage. Rolling updates and failing workloads add churn.

No scale-test manifest is included. The base’s two replicas provide a unit for estimating object counts and event rates, but multiplying those quantities cannot predict end-to-end cluster capacity. Separate API traffic, controller reconciliation, scheduler work, and data-plane traffic in the model.

Shared fields are explained in the [chapter manifest guide](../../manifest-guide.md). Continue with the [runbook](runbook.md).
