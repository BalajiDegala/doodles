# 106. Pod Security Admission rejects a workload

## Concise technical summary

1. Namespace labels, securityContext, exemptions, and dry-run rollout.
2. Start with read-only evidence: status, conditions, events, logs, and related resources.
3. Separate the immediate mitigation from the durable prevention.
4. Verify recovery and record what changed.

Memory cue: observe, classify, repair, verify.

## Plain meaning

Treat the alert like a bookshop shift handoff: identify which part of the store is failing, protect customer traffic, and only then repair the underlying shelf, door, or delivery route.

## Step-by-step response

1. Capture the object and dependencies with `kubectl describe`, `kubectl get events --sort-by=.lastTimestamp`, and controller logs.
2. Compare desired and observed state. Check selectors, readiness, requests, policies, node conditions, and recent changes.
3. Make one bounded, reversible change.
4. Confirm recovery from the user path: readiness, endpoints, response, and stable events.

## Prevention

- Alert on the leading indicator, not only the final outage.
- Keep ownership and rollback instructions beside the manifest.
- Test recovery in a disposable namespace or staging cluster.
- Add a guardrail such as policy, quota, probe, backup, or admission validation.

Further reading: [Pod Security Admission rejects a workload](https://kubernetes.io/docs/concepts/security/pod-security-admission/).
