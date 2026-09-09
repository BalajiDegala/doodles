# Cost allocation and right-sizing

## Concise technical summary

1. Requests reserve schedulable capacity while usage measures consumed resources.
2. Cost allocation links infrastructure spend to workloads, teams, and shared services.
3. Right-sizing needs historical demand and service performance evidence.
4. Reducing a request does not automatically reduce the cloud bill.

Memory cue: Attribute, measure, resize, verify the bill and the service.

## Plain meaning

Maya measures the desks actually used, checks peak trading hours, and counts shared rent. Shrinking a desk does not save rent if the same room remains leased.

## The Bookshop story

We calculate the catalog’s declared CPU/memory across two replicas, inspect optional current usage, and draft a sizing decision with a clear evidence gap.

## Details and production use

Short idle samples can hide bursts, startup needs, and tail latency. Include safety margins, throttling/OOM evidence, and scheduling effects. Savings depend on whether infrastructure can actually be released and on the provider’s billing model.

Spot/preemptible capacity needs interruption-tolerant application design; disruption budgets cannot prevent a provider from reclaiming capacity. Track persistent storage, load balancers, egress, observability, and idle/shared capacity too. Use current regional provider pricing instead of fixed savings percentages.

Further reading: [OpenCost allocation model](https://opencost.io/docs/specification/), [Kubernetes resource management](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/).

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
