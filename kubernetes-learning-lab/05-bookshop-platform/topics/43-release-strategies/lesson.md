# Blue-green and canary releases

## Concise technical summary

1. Blue-green keeps two releases available and changes which one receives new traffic.
2. Canary exposes a new release to a limited portion of traffic first.
3. Replica-based Service selection provides an approximate split, not precise request weighting.
4. Promotion requires application evidence and a tested recovery path.

Memory cue: Switch all, or sample first.

## Plain meaning

Maya can redirect the entrance to a second prepared counter area, or invite a small group to try the new counter while most visitors keep using the old one.

## The Bookshop story

This question reconnects to the existing blue-green and canary labs. The learner uses their pages and Service selectors, then adds explicit success and rollback criteria.

## Details and production use

Readiness and capacity must be sufficient before promotion. Existing connections can outlive a Service selector change. A weighted traffic router still produces a statistical distribution over requests; a small sample need not match its configured percentage exactly.

The deployment strategy does not solve incompatible database changes or irreversible external side effects. Compare error rate and latency against a useful baseline and sample window, and decide who can stop the release. Automated progressive delivery returns in question 79.

Further reading: [Kubernetes Services](https://kubernetes.io/docs/concepts/services-networking/service/), [Argo Rollouts canary concepts](https://argo-rollouts.readthedocs.io/en/stable/features/canary/).

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
