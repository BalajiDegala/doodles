# 100. Cluster costs doubled overnight

Source: supplied Kubernetes PDF, question 100, pages 48-49. Practice: **Read-only cost investigation**.

## Concise technical summary

1. Separate price changes from increased resource quantity or runtime.
2. Attribute new capacity and shared costs to owners and recent changes.
3. Requests, current usage, and actual billed capacity are different measurements.
4. Remove only verified idle resources and measure service impact as well as savings.

Memory cue: What increased, who owns it, and can it be released?

## Plain meaning

The shop's bill can rise because it rented more rooms, kept them open longer, or paid a higher rate. Counting desks alone cannot explain the invoice.

## The Bookshop story

Maya inventories the catalog and namespace, then maps the results to a dated provider bill. The lab makes no currency savings claim from CPU samples.

## Diagnosis and production details

Compare billing period/region/SKU, node counts and types, provisioned volumes, load balancers, egress, logs, and observability retention. A runaway CronJob or overlarge request may increase capacity, but changed rates or data transfer can explain costs even with stable Pods.

Use workload labels and cost-allocation tooling when available. Current idle CPU does not establish historical overprovisioning. Reducing requests saves money only when the billing model or infrastructure allocation changes. Before removing an apparently unused PV or load balancer, verify recovery ownership, traffic, and retention requirements.

Read the [manifest walkthrough](manifest-guide.md) and [runbook](runbook.md).

Further reading: [OpenCost allocation model](https://opencost.io/docs/specification/), [Resource management](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/).
