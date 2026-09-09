# Native sidecar containers: reading the manifests

File: [native sidecar Job](manifests/10-sidecar-job.yaml).

The Pod has `restartPolicy: Never` for its report. The `helper` entry is under `initContainers` and overrides its own restart policy to Always. It writes `/signals/ready` to a shared emptyDir. A one-second startup probe checks that file with up to 30 failures before treating startup as failed.

The `report` container uses `set -eu`, verifies the marker, prints completion, and exits. It mounts the same volume read-only. `backoffLimit: 0` keeps failed evidence simple. Both containers declare resources and the shared non-root controls. A container-wide sleep loop here is not meant to do application work.

Shared fields are explained in the [chapter manifest guide](../../manifest-guide.md). Continue with the [runbook](runbook.md).
