# 68. Kubernetes at scale

## Concise technical summary

1. Large clusters increase API, datastore, scheduler, network, and add-on demands.
2. Object counts and change rates matter as well as node count.
3. Client watches, pagination, and scoped queries influence control-plane load.
4. Capacity limits are version- and provider-specific, not universal application guarantees.

Memory cue: Measure the management workload, not only the machines.

## Plain meaning

Maya’s directory office can become busy even when many counters are idle. Frequent address changes and repeated full-directory requests also consume staff time.

## The Bookshop story

We inspect a small namespace and reason about how its Pods, events, metrics, and endpoint changes would grow across many branches. No stress test is launched.

## Details and production use

Published Kubernetes scale envelopes assume multiple simultaneous limits and defined test conditions. A provider or workload can hit another bottleneck earlier. Add-ons such as DNS, metrics, logging, admission, and network controllers need their own capacity planning.

Prefer efficient list/watch patterns and avoid uncontrolled polling. API Priority and Fairness manages competing API requests; scheduler priority solves a different problem. Do not change cache sizes, scheduler parallelism, or etcd maintenance settings without measured evidence and an operating plan.

Further reading: [Large cluster considerations](https://kubernetes.io/docs/setup/best-practices/cluster-large/), [API Priority and Fairness](https://kubernetes.io/docs/concepts/cluster-administration/flow-control/).

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
