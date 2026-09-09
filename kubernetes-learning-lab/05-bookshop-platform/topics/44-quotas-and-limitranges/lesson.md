# 44. ResourceQuota and LimitRange

## Concise technical summary

1. ResourceQuota constrains aggregate namespaced resource usage or object counts.
2. LimitRange can default and constrain individual resource requests and limits.
3. Admission evaluates new objects against applicable limits and quota.
4. Namespace budgets complement capacity planning and do not create physical isolation.

Memory cue: LimitRange sizes each counter; quota budgets the branch.

## Plain meaning

Maya limits the size of each counter and the total number of counters in a small practice room. Both rules matter: small counters can still fill the room if there are too many.

## The Bookshop story

Two Pods receive default requests and limits in a separate budgets namespace. A too-large Pod and a third Pod are submitted only as server dry-runs to distinguish the two controls.

## Details and production use

Defaults affect admitted Pods; they do not retroactively resize every running Pod. Quota usage can take a moment to settle. CPU requests, limits, and object count are different accounting dimensions.

A namespace boundary and quota do not guarantee performance isolation, security isolation, or a fair share of every node. Leave headroom for rollouts, system work, and terminating resources. The teaching quota is intentionally tiny and belongs only to this disposable namespace.

Further reading: [ResourceQuota](https://kubernetes.io/docs/concepts/policy/resource-quotas/), [LimitRange](https://kubernetes.io/docs/concepts/policy/limit-range/).

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
