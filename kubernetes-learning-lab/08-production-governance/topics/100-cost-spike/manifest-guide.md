# 100. Cluster costs doubled overnight: manifest walkthrough

Read the base requests: two replicas total 50m CPU and 64Mi memory, excluding rollout surge and shared overhead. These quantities are not prices. Service type ClusterIP adds no authored cloud load balancer, but the surrounding cluster may have billable infrastructure.

The [shared manifest guide](../../manifest-guide.md) explains the catalog's selectors, port, resources, and security controls. Continue with the [runbook](runbook.md).
