# Pod lifecycle: reading the manifests

Files: [gated Pod](manifests/10-pending.yaml), [successful Pod](manifests/20-succeeded.yaml), [failed Pod](manifests/30-failed.yaml).

All are standalone `kind: Pod` objects rather than Deployments. That lets a completed Pod remain completed; no controller creates a replacement. They use `restartPolicy: Never` to preserve the first result.

The pending Pod has `schedulingGates` containing `learning.ops2book/approval`. The scheduler waits until that gate is removed. No node is broken and no deliberately excessive CPU request is needed. Scheduling gates are stable from Kubernetes 1.30.

The successful command prints `Stock check complete` and exits 0. The failed command prints `Catalog validation failed` and exits 1. Exit codes are the process's report to the operating system: zero means success by convention.

Each shell uses tiny requests/limits and the [shared security settings](../../manifest-guide.md#repeated-security-fields). The gate changes placement eligibility, not the shell command. These Pods have no Service or readiness probe because they are one-shot observations, not customer-facing servers.

Continue with the [runbook](runbook.md).
