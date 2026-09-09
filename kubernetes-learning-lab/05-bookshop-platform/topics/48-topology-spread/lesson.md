# Topology spread constraints

## Concise technical summary

1. Topology spread constraints compare matching Pods across labeled failure domains.
2. maxSkew expresses the allowed or preferred imbalance for the selected mode.
3. DoNotSchedule enforces a hard constraint; ScheduleAnyway gives a preference.
4. Scheduling-time spreading does not continuously rebalance existing Pods.

Memory cue: Count by domain, then place the next counter.

## Plain meaning

Maya counts counters in each room before placing another. She can require balance or prefer it when room availability makes perfect balance impractical.

## The Bookshop story

Three display replicas prefer spreading across node hostnames. A one-node cluster can still run them, but cannot demonstrate cross-node resilience.

## Details and production use

The selector determines which peers count, and eligible domains depend on labels and scheduling constraints. A hostname domain is a node, not an availability zone. Hard constraints can leave Pods Pending when no eligible placement fits.

Pod anti-affinity can also use different topology keys; it is not inherently limited to nodes. Select the rule by the intended relationship and the available failure domains. Use readiness, capacity headroom, and disruption controls alongside placement rules.

Further reading: [Pod topology spread constraints](https://kubernetes.io/docs/concepts/scheduling-eviction/topology-spread-constraints/).

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
