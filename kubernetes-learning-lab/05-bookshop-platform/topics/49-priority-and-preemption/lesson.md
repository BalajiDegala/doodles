# Priority and preemption

## Concise technical summary

1. PriorityClass assigns scheduling importance through a numeric priority.
2. Higher priority can influence queue order and preemption decisions.
3. preemptionPolicy: Never prevents that Pod from preempting lower-priority Pods.
4. Priority does not bypass placement rules or guarantee immediate scheduling.

Memory cue: Urgency changes order; it does not create space.

## Plain meaning

Maya can put an urgent order near the front of a queue. That does not create a free counter, and she may forbid removing another customer to make room.

## The Bookshop story

We inspect the catalog’s assigned priority and any existing classes, then design a non-preempting policy for reports. No pressure or real eviction is generated.

## Details and production use

PriorityClass is cluster-scoped. A global default affects Pods without an explicit class, so a casual teaching class can have effects outside the namespace. System-critical classes belong to system infrastructure rather than ordinary catalog workloads.

Non-preempting Pods can still be preempted by other eligible higher-priority Pods. Preemption must leave a feasible placement, and handling of disruption budgets during preemption is best-effort rather than a universal block. Choose priorities with platform owners and test the workload’s own interruption behaviour.

Further reading: [Pod priority and preemption](https://kubernetes.io/docs/concepts/scheduling-eviction/pod-priority-preemption/).

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
