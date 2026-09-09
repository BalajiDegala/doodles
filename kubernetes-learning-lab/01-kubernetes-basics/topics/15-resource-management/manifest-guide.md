# Resource values and security settings

Actual file: [20-deployment.yaml](../../manifests/20-deployment.yaml). The helpers use the same field structure with smaller values.

## Requests and limits in this exact file

~~~yaml
resources:
  requests:
    cpu: 25m
    memory: 32Mi
  limits:
    cpu: 100m
    memory: 64Mi
~~~

| Field | Read it aloud | Why it is here |
| --- | --- | --- |
| `requests.cpu: 25m` | Allow for 0.025 CPU when placing this container | Helps the scheduler account for work |
| `requests.memory: 32Mi` | Allow for 32 mebibytes of memory | Helps choose a node with sufficient requested capacity |
| `limits.cpu: 100m` | Limit CPU time to 0.1 CPU | Bound how much CPU time this small server can consume |
| `limits.memory: 64Mi` | Set a 64 mebibyte memory limit | Bound memory use; excess can cause OOM termination |

The request is not a preallocated chunk of currently used RAM. A process can use less, or more within available resources and enforced limits. CPU throttling means slowing access to CPU time; OOM means an out-of-memory condition.

The init container requests `5m/8Mi` and has limits of `20m/16Mi`. For this Pod with one ordinary init container and one application container, scheduling uses the larger request per resource: `25m` and `32Mi`, before any Pod overhead. The two containers do not normally run simultaneously.

These are sample values. They are not workload sizing results. [Kubernetes resource management](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/)

## Shutdown and security fields

| Field | Where it appears | Meaning and reason |
| --- | --- | --- |
| `terminationGracePeriodSeconds: 15` | Pod spec | Gives containers a shutdown window before forced termination; the application must handle shutdown correctly |
| `runAsNonRoot: true` | Pod securityContext | Require a non-root process |
| `runAsUser: 1000` | Pod securityContext | Run with numeric user ID 1000 |
| `runAsGroup: 1000` | Pod securityContext | Set the primary group ID to 1000 |
| `fsGroup: 1000` | Web Pod and StatefulSet Pod securityContext | Supply a shared group for supported volume access; ownership handling depends on the volume and driver |
| `seccompProfile.type: RuntimeDefault` | Pod securityContext | Use the container runtime's default system-call filtering profile |
| `allowPrivilegeEscalation: false` | Container securityContext | Prevent the process gaining extra privileges through execution |
| `readOnlyRootFilesystem: true` | Container securityContext | Make the image's root filesystem read-only |
| `capabilities.drop: ["ALL"]` | Container securityContext | Drop additional Linux capability privileges |

A user ID is the operating system's numeric identity for a process. Linux capabilities are individual privileged powers. Seccomp limits which system calls a process can make. These settings reduce privileges needed by the simple server. [Security context fields](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/)

## Read-only root does not mean no writable files

The root filesystem belongs to the image. Mounted volumes are separate. Our `prepared-page` emptyDir is mounted writable, so the init container can prepare files and the readiness exercise can restore its test file.

The ConfigMap and Secret mounts are read-only. The optional StatefulSet mounts its PVC writable. Each mount has its own purpose and access settings.

Port 8080 lets our non-root server listen without needing a privilege to bind a low-numbered port. The Service can still offer port 80 because Service networking is separate from the process's listening port.

Use [runbook step 16](../../runbook.md#16-inspect-resource-requests-and-limits) for declarations and optional live metrics.
