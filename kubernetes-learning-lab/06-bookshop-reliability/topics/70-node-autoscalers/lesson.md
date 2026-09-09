# Karpenter and Cluster Autoscaler

## Concise technical summary

1. Node autoscalers provision or remove capacity through platform integrations.
2. Cluster Autoscaler commonly works with configured node groups.
3. Karpenter uses provider integrations and workload/node-pool constraints to provision capacity.
4. Scaling and consolidation depend on feasibility, limits, availability, and disruption rules.

Memory cue: Work needs a room; the provider must actually supply one.

## Plain meaning

Maya can expand a predefined set of rooms or ask a provider for rooms matching current needs. Both approaches still depend on budget, building availability, and moving people safely.

## The Bookshop story

We review node capacity and the catalog’s scheduling constraints without creating an unschedulable load or requesting cloud machines.

## Details and production use

Compare supported providers, node lifecycle, instance constraints, operational ownership, and workload diversity for the actual implementation. Avoid universal “seconds versus minutes” or “always cheaper” rankings. Neither controller can repair a misspelled affinity label or an impossible storage topology by adding arbitrary nodes.

Consolidation and interruption handling need capacity and workload cooperation. Provider quotas, maximum sizes, budgets, and unavailable instance offerings can block provisioning. Node autoscaling is separate from HPA’s replica decisions and VPA’s resource sizing.

Further reading: [Kubernetes node autoscaling](https://kubernetes.io/docs/concepts/cluster-administration/node-autoscaling/), [Cluster Autoscaler](https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler), [Karpenter NodePools](https://karpenter.sh/docs/concepts/nodepools/).

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
