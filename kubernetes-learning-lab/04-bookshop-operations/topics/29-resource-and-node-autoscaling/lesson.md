# Vertical and node autoscaling

## Concise technical summary

1. VPA recommends or adjusts the resources assigned to each Pod.
2. A node autoscaler changes cluster capacity when suitable infrastructure can be added or removed.
3. HPA changes copy count; VPA changes size; node autoscaling changes available machines.
4. These require compatible controllers and careful coordination, not just YAML.

Memory cue: Copies, size, machines.

## Plain meaning

More workers, larger desks, and more rooms solve different shortages. Giving one worker a bigger desk does not create a second worker.

## The Bookshop story

Maya asks for sizing advice for the operations website. We use VPA recommendation-only mode. We inspect node capacity without deliberately forcing cloud expansion.

## Coordinate the controllers

VPA is an add-on, not an always-present core controller. `Off` records recommendations without updating Pod resources. Other supported modes and whether updates recreate Pods or resize in place depend on the VPA release and cluster capabilities; do not assume every VPA update always restarts a Pod.

Node autoscalers can provision suitable capacity for unschedulable workloads and consolidate eligible capacity. A typo in node affinity, a missing volume, a maximum node-group size, or exhausted cloud quota may prevent scale-up. Adding arbitrary machines is not a universal repair for Pending Pods.

If VPA changes CPU requests while HPA scales on CPU percentage of those requests, the control loops interact. Recommendation-only VPA is a straightforward way to study sizing without changing HPA's denominator.

Cloud capacity can cost money. This chapter does not create node groups, alter cloud credentials, install autoscalers, or intentionally fill the cluster.

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).

Further reading: [VPA API and update modes](https://github.com/kubernetes/autoscaler/blob/master/vertical-pod-autoscaler/docs/api.md), [node autoscaling](https://kubernetes.io/docs/concepts/cluster-administration/node-autoscaling/).
