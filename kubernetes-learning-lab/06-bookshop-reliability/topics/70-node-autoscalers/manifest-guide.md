# 70. Karpenter and Cluster Autoscaler: reading the manifests

The [Deployment](../../manifests/20-deployment.yaml) requests small resources and Linux placement. These constraints become part of capacity feasibility; observed low CPU alone does not mean a Pod can schedule.

No NodePool, NodeClass, cloud credential, or node group is authored. Those definitions depend on the provider and could create billable infrastructure. An existing controller may be managed outside visible cluster Pods, so discovery output alone cannot identify the full autoscaling arrangement.

Shared fields are explained in the [chapter manifest guide](../../manifest-guide.md). Continue with the [runbook](runbook.md).
