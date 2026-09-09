# 62. Security hardening and kube-bench: reading the manifests

Read the [Deployment](../../manifests/20-deployment.yaml). `automountServiceAccountToken: false` avoids an unnecessary API token. Pod UID/GID, seccomp, and container capability/escalation/filesystem settings reduce privileges. `team` and `purpose` labels support ownership but do not enforce authorization.

The image tag is explicit but mutable; no signature or vulnerability assertion is made. No NetworkPolicy exists in the base until a relevant exercise creates one. This walkthrough therefore produces a scoped review rather than a blanket “hardened” certification.

Shared fields are explained in the [chapter manifest guide](../../manifest-guide.md). Continue with the [runbook](runbook.md).
