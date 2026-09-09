# 104. Node drain disrupts workloads despite a PDB

Source: supplied Kubernetes PDF, question 104, pages 51. Practice: **Dry-run eviction experiment**.

## Concise technical summary

1. A PDB constrains supported eviction requests for Pods selected by its labels.
2. Direct Pod deletion, controller scale-down, and involuntary outages are outside that protection.
3. kubectl drain --force permits unmanaged Pods; it is not the flag that bypasses PDB checks.
4. Replacement capacity and healthy placement are necessary alongside a valid budget.

Memory cue: Selected Pod, healthy budget, eviction API.

## Plain meaning

Maya's rule limits how many counters may close voluntarily. It cannot prevent a building outage or someone bypassing the closure request process.

## The Bookshop story

Two disposable catalog workers are protected by a strict budget. Server-dry-run eviction is denied until a one-replica disruption is allowed; no node is actually drained.

## Diagnosis and production details

Inspect the PDB selector, expectedPods, currentHealthy, desiredHealthy, disruptionsAllowed, observedGeneration, and workload placement. Budget calculations lag controller updates, so wait for current status. A single-node cluster may have no replacement destination even if a budget allows an eviction.

The source incorrectly says drain --force itself bypasses PDBs. --disable-eviction forces the direct-delete path and bypasses budget checks; direct kubectl delete also bypasses them. UnhealthyPodEvictionPolicy affects handling of unready Pods and must match availability requirements. Do not weaken a budget just to make a real drain finish.

Read the [manifest walkthrough](manifest-guide.md) and [runbook](runbook.md).

Further reading: [kubectl drain flags](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_drain/), [Disruptions](https://kubernetes.io/docs/concepts/workloads/pods/disruptions/), [API-initiated eviction](https://kubernetes.io/docs/concepts/scheduling-eviction/api-eviction/).
