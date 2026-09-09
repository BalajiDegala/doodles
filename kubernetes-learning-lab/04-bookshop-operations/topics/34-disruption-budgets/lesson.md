# PodDisruptionBudgets

## Concise technical summary

1. A PodDisruptionBudget limits voluntary eviction of selected Pods.
2. Its budget uses healthy replicas to decide whether eviction is allowed.
3. Clients must use the Eviction API for the budget to govern their request.
4. A budget does not prevent crashes, direct deletion, or Deployment scale-down.

Memory cue: The budget guards the eviction door.

## Plain meaning

Maya allows one counter to close for planned maintenance while another remains available. The maintenance desk checks this rule before approving a closure. It cannot prevent a power failure or someone bypassing that desk.

## The Bookshop story

Two ready `bookshop-ops` replicas have a budget requiring one available replica. A server dry-run of an eviction should pass. Temporarily requiring both replicas makes the same dry-run fail. No real Pod is evicted and no node is drained.

## Availability still needs design

`minAvailable` and `maxUnavailable` are alternative ways to express a budget; use one. A PDB cannot create replacement capacity. A node failure counts against availability but is not prevented by the PDB. Deployment rolling updates follow the Deployment's own update strategy. [Disruptions reference](https://kubernetes.io/docs/concepts/workloads/pods/disruptions/).

Keep readiness meaningful, provide room for replacement Pods, and spread replicas when resilience requires it. An overly strict budget can stall maintenance. An empty selector in `policy/v1` selects every Pod in the namespace, so the example uses an explicit application label.

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
