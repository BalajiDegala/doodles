# 49. Priority and preemption: reading the manifests

Read the [base Deployment](../../manifests/20-deployment.yaml). Its Pod template omits `priorityClassName`. Admission may supply the current global default; otherwise a normal default priority applies. Inspect the live Pod’s `spec.priority` and `spec.preemptionPolicy` instead of assuming the cluster’s policy.

A design for a practice PriorityClass would explicitly choose a non-system name, a reviewed `value`, `globalDefault: false`, and `preemptionPolicy: Never`. No PriorityClass YAML is applied here because its scope is cluster-wide. Referencing a nonexistent class is an admission problem, not proof of scheduling priority.

Shared fields are explained in the [chapter manifest guide](../../manifest-guide.md). Continue with the [runbook](runbook.md).
