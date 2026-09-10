# 87. Deployment rollout stuck

Source: supplied Kubernetes PDF, question 87, pages 41-42. Practice: **Fault and repair**.

## Concise technical summary

1. A rollout can stall because new replicas are unready or cannot be placed.
2. maxSurge needs spare capacity and maxUnavailable limits rollout availability loss.
3. A PDB does not control the Deployment controller's rolling replacement.
4. Inspect the new ReplicaSet, repair its template, and verify rollout completion.

Memory cue: Which new replica cannot become available, and why?

## Plain meaning

Maya keeps the old counter open until the replacement passes inspection. The renovation stalls because the replacement's inspection instruction is wrong.

## The Bookshop story

A separate Deployment first serves normally, then receives an impossible readiness path. The old replica stays available until the fixed template is reapplied.

## Diagnosis and production details

With one replica, maxUnavailable=0 and maxSurge=1, the controller can keep one old Pod while the new Pod remains unready. Capacity must fit the surge. A progress deadline reports failed progress; it does not automatically roll back.

The PDF incorrectly attributes Deployment rollout blocking to a PDB. PDBs constrain supported eviction requests, not a Deployment controller deleting Pods during its rollout. Read ReplicaSet events for admission/quota failures that may prevent new Pods from appearing. A rollback also cannot reverse database side effects.

Read the [manifest walkthrough](manifest-guide.md) and [runbook](runbook.md).

Further reading: [Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/), [Disruption budgets](https://kubernetes.io/docs/concepts/workloads/pods/disruptions/).
