# 90. Intermittent 503 errors during rolling updates: manifest walkthrough

Read the base Deployment's readiness probe, rollout surge/unavailability settings, and Pod grace period. Compare them with the [lifecycle-hook manifest guide](../../../04-bookshop-operations/topics/39-lifecycle-hooks/manifest-guide.md). That exercise shows preStop/TERM observations, while end-to-end traffic draining requires the actual server and routing stack.

The [shared manifest guide](../../manifest-guide.md) explains the catalog's selectors, port, resources, and security controls. Continue with the [runbook](runbook.md).
