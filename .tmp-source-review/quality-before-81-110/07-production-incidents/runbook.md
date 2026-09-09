# Production Incident Clinic: common response loop

1. Record the alert, namespace, object name, and first observed time.
2. Read status, conditions, events, logs, and dependency health.
3. Check whether a recent rollout, policy, quota, node, or storage change explains the symptom.
4. Apply the smallest reversible fix, then verify readiness, traffic, and error rate.
5. Capture the root cause and prevention follow-up.

Never force-delete a stateful or policy-protected object until ownership, data safety, and replacement capacity are understood.
