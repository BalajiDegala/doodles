# EKS, GKE, and AKS

## Concise technical summary

1. EKS, GKE, and AKS provide managed Kubernetes services with different operating models.
2. Managed control planes still leave workload and data responsibilities to the customer.
3. Compute modes, identity, networking, upgrades, and billing require separate comparison.
4. Choose using current regional capabilities and team requirements, not a universal ranking.

Memory cue: Compare responsibilities before comparing logos.

## Plain meaning

Maya compares managed buildings: each supplies some maintenance, but rent, access rules, room options, and responsibilities differ.

## The Bookshop story

The same small catalog is used as a requirements checklist for AWS, Google Cloud, and Azure. No cloud account or cluster is created.

## Details and production use

EKS integrates with AWS IAM, compute, and networking options. GKE offers Standard and Autopilot operating models. AKS integrates with Azure infrastructure and identity services. The exact responsibility split depends on the selected mode and features.

Compare control-plane/compute charges, regional availability, supported versions, storage, egress, observability, identity, and upgrade policies using dated provider evidence. Avoid static claims that a control plane is always free, a provider is always most secure, or one service automatically operates the whole application.

Further reading: [Amazon EKS overview](https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html), [GKE overview](https://cloud.google.com/kubernetes-engine/docs/concepts/kubernetes-engine-overview), [AKS core concepts](https://learn.microsoft.com/en-us/azure/aks/core-aks-concepts).

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
