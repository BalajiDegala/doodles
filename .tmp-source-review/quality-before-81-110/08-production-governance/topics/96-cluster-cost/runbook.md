# 96. Cluster costs spike unexpectedly: runbook

1. Announce the incident and record namespace, object, symptom, and timestamp.
2. Inspect description, sorted events, owner, and dependencies.
3. Protect availability or data first; pause an unsafe rollout or cordon a bad node when appropriate.
4. Make the smallest reversible repair and watch the condition until stable.
5. Re-test the user path, remove temporary mitigation, and document prevention.

Rollback: restore the last known-good manifest or revision, then verify no orphaned Pods, volumes, finalizers, or policies remain.
