# 74. HPA, VPA, and KEDA: reading the manifests

Files: [target Deployment](manifests/10-event-counter.yaml) and [optional ScaledObject](optional/20-scaledobject.yaml).

The target uses the base page but a separate app label and omits authored replicas so an autoscaler can own scale. `scaleTargetRef.name: event-counter` links the ScaledObject to it. Bounds are 0-2 replicas, polling is 15 seconds, and cooldown is 30 seconds.

The cron trigger uses `Asia/Kolkata`, start `0 9 * * *`, end `0 17 * * *`, and string `desiredReplicas: "2"`. These are example business hours, not an immediate test window. Adjust start/end to a short future window before live practice. KEDA owns any generated HPA; this file does not author a second one.

Shared fields are explained in the [chapter manifest guide](../../manifest-guide.md). Continue with the [runbook](runbook.md).
