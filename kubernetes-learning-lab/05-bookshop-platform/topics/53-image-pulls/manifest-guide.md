# Image pulls and registry authentication: reading the manifests

Files: [cached worker](manifests/pull-cached.yaml) and [registry-resolving worker](manifests/pull-resolve.yaml).

Both use `busybox:1.36`, identical commands, and common restrictions. Their explicit `imagePullPolicy` differs. Kubernetes reports runtime-resolved content under `status.containerStatuses[].imageID`; the authored tag and actual image ID answer different questions.

No imagePullSecrets entry is needed for this public image. For a real private image, `spec.imagePullSecrets[].name` refers to an existing appropriate Secret in this namespace; it does not contain the password itself. This exercise makes no changes to the default ServiceAccount.

Shared fields are explained in the [chapter manifest guide](../../manifest-guide.md). Continue with the [runbook](runbook.md).
