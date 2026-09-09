# Content Coverage

## Foundations: topics 1-20

| Number | Topic | Practical proof |
| --- | --- | --- |
| 1 | Kubernetes purpose | Delete one managed Pod and observe reconciliation |
| 2 | Cluster architecture | Inspect the API endpoint, nodes, and Pod placement |
| 3 | Pods | Inspect the web Pod specification and runtime state |
| 4 | ReplicaSets and Deployments | Follow Deployment -> ReplicaSet -> Pod ownership |
| 5 | Service types | Reach changing Pods through one ClusterIP Service; compare other exposure types |
| 6 | Namespaces, quotas, and tenancy | Isolate the project and inspect object/storage quota |
| 7 | ConfigMaps and Secrets | Inject ordinary and sensitive practice settings |
| 8 | `kubectl` essentials | Use apply, get, describe, logs, exec, and scoped delete |
| 9 | Labels, selectors, and annotations | Inspect workload ownership and Service endpoint selection |
| 10 | DaemonSets | Run one observer on each eligible node |
| 11 | Jobs and CronJobs | Import the catalog once and produce scheduled reports |
| 12 | Startup, readiness, and liveness probes | Remove readiness without causing a liveness restart, then restore it |
| 13 | Environment and configuration volumes | Compare process environment with projected files |
| 14 | Init containers | Generate the final web page before the server starts |
| 15 | Requests and limits | Inspect scheduling declarations, quota, and optional live metrics |
| 16 | Rolling release and rollback | Move from release 1.0 to 2.0 and return to 1.0 |
| 17 | StatefulSet and Deployment roles | Compare interchangeable web Pods with stable reading-list replicas |
| 18 | Cluster DNS | Resolve normal Service and optional per-Pod names |
| 19 | Ingress and ingress controllers | Optionally route `bookshop.example.com` through an existing controller |
| 20 | PersistentVolumes and claims | Write data, replace a stateful Pod, and verify persistence |

## Operations: topics 21-40

Start with the [operations chapter](04-bookshop-operations/README.md). The source numbering is preserved; practical examples use a separate `k8s-learning-operations` namespace.

| Number | Topic | Practical proof or exercise |
| --- | --- | --- |
| 21 | Safe kubectl workflows | Preview, diff, apply, and restore a page change |
| 22 | Pod lifecycle | Inspect gated Pending, successful, and failed Pods |
| 23 | Container restart policies | Compare one failed attempt under Always, OnFailure, and Never |
| 24 | Multi-container patterns | Read separate writer/server logs and observe a shared noticeboard |
| 25 | Orchestration choices | Map workload intentions to Kubernetes, Swarm, and ECS responsibilities |
| 26 | Node affinity, taints, and tolerations | Observe Linux placement without modifying nodes |
| 27 | Pod affinity and anti-affinity | Compare required colocation with preferred replica spreading |
| 28 | Horizontal Pod Autoscaling | Observe metrics and replica changes during a bounded CPU burst, if metrics exist |
| 29 | Vertical and node autoscaling | Inspect optional VPA recommendations without changing resources or node groups |
| 30 | NetworkPolicies | Compare approved and blocked Pod traffic, then restore access |
| 31 | RBAC and ServiceAccounts | Check allowed and denied actions for an observer identity |
| 32 | Helm packaging | Render, install, test response content, upgrade, roll back, and uninstall a local chart |
| 33 | StorageClasses and provisioning | Bind an existing storage offering and preserve a note across Pod replacement |
| 34 | PodDisruptionBudgets | Compare allowed and blocked server-dry-run evictions |
| 35 | Kustomize and Helm | Render/apply a practice overlay and restore the plain base |
| 36 | Configuration reloading | Observe a changed response on the same Pod without restarting it |
| 37 | Security contexts | Check non-root identity and writable-volume versus read-only-image behaviour |
| 38 | Pod Security Standards and Admission | Compare good and rejected Pod submissions in an isolated namespace |
| 39 | Container lifecycle hooks | Follow startup, preStop, and TERM observations on a disposable worker |
| 40 | Service mesh foundations | Inspect current objects and write an adoption/evidence plan; optional existing-mesh observation |

## Artifact status

- Forty numbered topic folders contain completed first-draft lessons across the foundations and operations chapters.
- Each lesson starts with four short technical points and a memory cue, followed by the plain-language explanation.
- Every topic has a linked manifest walkthrough; the shared manifest index maps all thirteen core YAML files to their explanations.
- BusyBox commands, health checks, configuration paths, resource values, security settings, and storage references are explained against the actual files.
- All forty topics connect to the continuing Tiny Bookshop story.
- The shared runbook contains verification, rollback, troubleshooting, and cleanup steps.
- Base manifests avoid cluster-wide add-on installation.
- Storage and ingress remain optional and declare their cluster dependencies before use.
- Blue-green and canary rollout extensions are available as separate follow-on labs.
- Every operations topic has a lesson, manifest guide, and runbook; concept-only topics explain existing resources instead of inventing cluster objects.
- Operations manifests include the missing placement, autoscaling, networking, RBAC, storage, PDB, security, admission, and lifecycle examples, plus a local Helm chart and Kustomize base/overlay.
- [Validation status](VALIDATION.md) distinguishes local checks from runtime results. A written verification procedure is not a claim that its live exercise has passed.

## Source review notes

The numbered order follows the supplied Kubernetes PDF. Explanations use current primary documentation linked in each lesson where source shortcuts need correction. In particular, PDBs do not govern direct Pod deletion or Deployment scale-down, Restricted Pod Security does not require a read-only root filesystem, and a service mesh need not place a sidecar in every application Pod. Storage and resource overhead choices are described as platform decisions rather than universal production rules.

## Remaining source range

Topics 41-110 remain planned and have not been written. The completed content range is 1-40, plus the separate blue-green and canary labs. Review the operations chapter before expanding the next batch.
