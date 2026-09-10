# 61. Multi-cluster strategies

## Concise technical summary

1. Multiple clusters can separate failure domains, environments, or regions.
2. Each cluster has its own API, identities, policies, and operational state.
3. Cross-cluster traffic and data replication require explicit supporting systems.
4. Failover succeeds only when dependencies, capacity, and routing are ready.

Memory cue: Separate control planes; connect only what is required.

## Plain meaning

Maya opens another branch so one building outage need not close every shop. Both branches still need catalog stock, staff access, and a way for customers to find the open branch.

## The Bookshop story

We inventory the local context and design a second Bookshop location without switching contexts or provisioning infrastructure.

## Details and production use

GitOps can distribute desired state to multiple targets, while fleet tools can centralize management. Neither automatically replicates databases or implements application failover. A shared identity provider, registry, region, or network can remain a common failure dependency.

Choose cluster boundaries from recovery, latency, ownership, and residency requirements. More clusters add upgrade, observability, cost, and policy-management work. Record the exact context and namespace for each operation; a familiar object name may exist in several clusters.

Further reading: [Kubernetes multi-cluster SIG](https://github.com/kubernetes/community/tree/master/sig-multicluster), [cluster access organization](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/).

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
