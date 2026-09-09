# Argo Rollouts and Flagger: reading the manifests

Reuse the [manual canary guide](../../../03-canary-deployment/manifest-guide.md) and [question 43](../../../05-bookshop-platform/topics/43-release-strategies/lesson.md). They explain the existing stable/canary Deployments and shared Service.

An automated implementation additionally needs a compatible Rollout or Canary schema, controller, traffic provider, and analysis definition. Those are not present merely because two Deployments exist. No CRD or rollout controller is installed by this question, and a fabricated analysis query would not prove healthy behaviour.

Shared fields are explained in the [chapter manifest guide](../../manifest-guide.md). Continue with the [runbook](runbook.md).
