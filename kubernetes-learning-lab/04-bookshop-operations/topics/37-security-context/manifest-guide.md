# Security contexts: reading the manifest

File: [secure worker](manifests/10-secure-worker.yaml). These settings also explain the chapter's repeated fields.

| Location and field | Value and reason |
| --- | --- |
| Pod `securityContext.runAsNonRoot` | `true`: require non-root execution |
| Pod `runAsUser`, `runAsGroup` | `1000`: explicit process UID and primary group |
| Pod `fsGroup` | `1000`: supplementary group and supported-volume access |
| Pod `seccompProfile.type` | `RuntimeDefault`: use the runtime's syscall filter |
| Container `allowPrivilegeEscalation` | `false`: prevent gaining privileges through execution |
| Container `capabilities.drop` | `[ALL]`: drop optional Linux capabilities |
| Container `readOnlyRootFilesystem` | `true`: mount the image filesystem read-only |
| Pod `automountServiceAccountToken` | `false`: avoid an unnecessary API credential |

The `work` volume uses `emptyDir: {}` and mounts at `/work`. It starts empty for each new Pod and lasts for that Pod's lifetime, including container restarts. It is not durable storage. The mount is writable because `readOnly` is not enabled there. The volume lets this non-root container do useful work while its image files remain read-only.

`nodeSelector` chooses Linux because these examples use Linux commands and controls. The worker requests `5m` CPU and `8Mi` memory, with limits of `50m` and `32Mi`. `exec sleep 3600` keeps it available for an hour of inspection. These resource settings bound a practice process; they are not security policy enforcement.

Continue with the [runbook](runbook.md).
