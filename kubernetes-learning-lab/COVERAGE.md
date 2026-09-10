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

## Platform: topics 41-60

Start with the [chapter index](05-bookshop-platform/README.md).

| Question | Lesson |
| --- | --- |
| 41 | [Kubernetes monitoring](05-bookshop-platform/topics/41-monitoring/lesson.md) |
| 42 | [Centralized logging](05-bookshop-platform/topics/42-centralized-logging/lesson.md) |
| 43 | [Blue-green and canary releases](05-bookshop-platform/topics/43-release-strategies/lesson.md) |
| 44 | [ResourceQuota and LimitRange](05-bookshop-platform/topics/44-quotas-and-limitranges/lesson.md) |
| 45 | [Networking and CNI plugins](05-bookshop-platform/topics/45-networking-and-cni/lesson.md) |
| 46 | [Headless Services](05-bookshop-platform/topics/46-headless-services/lesson.md) |
| 47 | [Ephemeral containers and kubectl debug](05-bookshop-platform/topics/47-ephemeral-debugging/lesson.md) |
| 48 | [Topology spread constraints](05-bookshop-platform/topics/48-topology-spread/lesson.md) |
| 49 | [Priority and preemption](05-bookshop-platform/topics/49-priority-and-preemption/lesson.md) |
| 50 | [cert-manager and TLS certificates](05-bookshop-platform/topics/50-certificates-and-tls/lesson.md) |
| 51 | [GitOps with Argo CD and Flux](05-bookshop-platform/topics/51-gitops/lesson.md) |
| 52 | [External Secrets Operator](05-bookshop-platform/topics/52-external-secrets/lesson.md) |
| 53 | [Image pulls and registry authentication](05-bookshop-platform/topics/53-image-pulls/lesson.md) |
| 54 | [CoreDNS customization](05-bookshop-platform/topics/54-coredns/lesson.md) |
| 55 | [EndpointSlices and Endpoints](05-bookshop-platform/topics/55-endpointslices/lesson.md) |
| 56 | [etcd and cluster state](05-bookshop-platform/topics/56-etcd/lesson.md) |
| 57 | [API request flow and admission](05-bookshop-platform/topics/57-api-admission/lesson.md) |
| 58 | [CRDs and Operators](05-bookshop-platform/topics/58-crds-and-operators/lesson.md) |
| 59 | [Scheduler filtering and scoring](05-bookshop-platform/topics/59-scheduler-internals/lesson.md) |
| 60 | [CRI, containerd, and CRI-O](05-bookshop-platform/topics/60-container-runtimes/lesson.md) |

## Reliability: topics 61-80

Start with the [chapter index](06-bookshop-reliability/README.md).

| Question | Lesson |
| --- | --- |
| 61 | [Multi-cluster strategies](06-bookshop-reliability/topics/61-multiple-clusters/lesson.md) |
| 62 | [Security hardening and kube-bench](06-bookshop-reliability/topics/62-security-hardening/lesson.md) |
| 63 | [Mesh identity, traffic, and observability](06-bookshop-reliability/topics/63-mesh-traffic-and-identity/lesson.md) |
| 64 | [Cluster upgrade planning](06-bookshop-reliability/topics/64-cluster-upgrades/lesson.md) |
| 65 | [Disaster recovery](06-bookshop-reliability/topics/65-disaster-recovery/lesson.md) |
| 66 | [Cost allocation and right-sizing](06-bookshop-reliability/topics/66-cost-and-rightsizing/lesson.md) |
| 67 | [Gateway API and Ingress](06-bookshop-reliability/topics/67-gateway-api/lesson.md) |
| 68 | [Kubernetes at scale](06-bookshop-reliability/topics/68-large-clusters/lesson.md) |
| 69 | [Kyverno, Gatekeeper, and supply-chain policy](06-bookshop-reliability/topics/69-policy-and-supply-chain/lesson.md) |
| 70 | [Karpenter and Cluster Autoscaler](06-bookshop-reliability/topics/70-node-autoscalers/lesson.md) |
| 71 | [EKS, GKE, and AKS](06-bookshop-reliability/topics/71-managed-kubernetes/lesson.md) |
| 72 | [API deprecations](06-bookshop-reliability/topics/72-api-deprecations/lesson.md) |
| 73 | [Native sidecar containers](06-bookshop-reliability/topics/73-native-sidecars/lesson.md) |
| 74 | [HPA, VPA, and KEDA](06-bookshop-reliability/topics/74-coordinated-autoscaling/lesson.md) |
| 75 | [Zero-trust networking](06-bookshop-reliability/topics/75-zero-trust/lesson.md) |
| 76 | [Kubernetes audit logging](06-bookshop-reliability/topics/76-audit-logging/lesson.md) |
| 77 | [Secret encryption at rest](06-bookshop-reliability/topics/77-secret-encryption/lesson.md) |
| 78 | [RuntimeClass and sandboxing](06-bookshop-reliability/topics/78-runtime-classes/lesson.md) |
| 79 | [Argo Rollouts and Flagger](06-bookshop-reliability/topics/79-progressive-delivery/lesson.md) |
| 80 | [Garbage collection and ownership](06-bookshop-reliability/topics/80-garbage-collection/lesson.md) |

## Incidents and recovery: topics 81-110

The question order below was checked against the supplied PDF, pages 38-54. Each lesson links its walkthrough and runbook.

| Question | Source topic | PDF pages | Practice |
| --- | --- | --- | --- |
| 81 | [Pod stuck in Pending](07-production-incidents/topics/81-pod-pending/lesson.md) | 38 | Fault and repair |
| 82 | [Pod stuck in CrashLoopBackOff](07-production-incidents/topics/82-crashloopbackoff/lesson.md) | 38-39 | Fault and repair |
| 83 | [Pod stuck in ImagePullBackOff](07-production-incidents/topics/83-image-pull-backoff/lesson.md) | 39-40 | Fault and repair |
| 84 | [Pod stuck in ContainerCreating](07-production-incidents/topics/84-container-creating/lesson.md) | 40 | Fault and repair |
| 85 | [Node NotReady: diagnose without losing workloads](07-production-incidents/topics/85-node-notready/lesson.md) | 40-41 | Read-only investigation |
| 86 | [Service not routing traffic to Pods](07-production-incidents/topics/86-service-routing/lesson.md) | 41 | Fault and repair |
| 87 | [Deployment rollout stuck](07-production-incidents/topics/87-rollout-stuck/lesson.md) | 41-42 | Fault and repair |
| 88 | [PVC stuck in Pending](07-production-incidents/topics/88-pvc-pending/lesson.md) | 42 | Bounded storage investigation |
| 89 | [OOMKilled while application memory appears normal](07-production-incidents/topics/89-oomkilled/lesson.md) | 42-43 | Read-only investigation |
| 90 | [Intermittent 503 errors during rolling updates](07-production-incidents/topics/90-rolling-503/lesson.md) | 43 | Read-only investigation and reusable drill |
| 91 | [DNS resolution fails intermittently inside Pods](07-production-incidents/topics/91-intermittent-dns/lesson.md) | 43-44 | Bounded DNS observation |
| 92 | [etcd full: cluster writes blocked](07-production-incidents/topics/92-etcd-space/lesson.md) | 44 | Administrator investigation |
| 93 | [Secret exposed in logs: incident response](07-production-incidents/topics/93-secret-log-leak/lesson.md) | 44-45 | Incident tabletop |
| 94 | [Cluster upgrade breaks CRDs and operators](07-production-incidents/topics/94-operator-upgrade/lesson.md) | 45 | Read-only investigation |
| 95 | [HPA repeatedly scales up and down](07-production-incidents/topics/95-hpa-flapping/lesson.md) | 45-46 | Optional autoscaling inspection |
| 96 | [Pod evicted due to disk pressure](08-production-governance/topics/96-disk-pressure/lesson.md) | 46 | Read-only investigation and manifest preview |
| 97 | [Ingress returns 502 after deployment](08-production-governance/topics/97-ingress-502/lesson.md) | 46-47 | Backend fault and repair |
| 98 | [Cross-namespace traffic blocked by NetworkPolicy](08-production-governance/topics/98-cross-namespace-policy/lesson.md) | 47 | Policy fault and repair |
| 99 | [StatefulSet Pod stuck in Terminating](08-production-governance/topics/99-statefulset-terminating/lesson.md) | 48 | Read-only investigation |
| 100 | [Cluster costs doubled overnight](08-production-governance/topics/100-cost-spike/lesson.md) | 48-49 | Read-only cost investigation |
| 101 | [Namespace deletion blocked by finalizers](08-production-governance/topics/101-namespace-finalizers/lesson.md) | 49 | Controlled finalizer drill |
| 102 | [Admission webhook blocks deployments cluster-wide](08-production-governance/topics/102-admission-webhook-outage/lesson.md) | 49-50 | Read-only incident investigation |
| 103 | [Expired certificate breaks kubelet/API communication](08-production-governance/topics/103-expired-certificates/lesson.md) | 50-51 | Administrator investigation |
| 104 | [Node drain disrupts workloads despite a PDB](08-production-governance/topics/104-pdb-drain/lesson.md) | 51 | Dry-run eviction experiment |
| 105 | [API server overloaded: slow kubectl and timeouts](08-production-governance/topics/105-api-overload/lesson.md) | 51-52 | Read-only control-plane investigation |
| 106 | [Pod resolves internal DNS but not external DNS](08-production-governance/topics/106-external-dns/lesson.md) | 52 | Bounded DNS observation |
| 107 | [Helm release stuck in pending-upgrade](08-production-governance/topics/107-helm-pending-upgrade/lesson.md) | 52-53 | Optional Helm recovery rehearsal |
| 108 | [Production accidentally mounts staging PV data](08-production-governance/topics/108-wrong-pv-data/lesson.md) | 53 | Read-only data-provenance investigation |
| 109 | [CronJob accumulates thousands of completed Pods](08-production-governance/topics/109-cronjob-accumulation/lesson.md) | 53-54 | Bounded Job cleanup drill |
| 110 | [Container runs as root despite Pod Security enforcement](08-production-governance/topics/110-nonroot-enforcement/lesson.md) | 54 | Controlled admission test |

## Artifact and review status

- The library contains 110 numbered topics and two additional blue-green/canary labs.
- Topics 1-20 use the shared foundations runbook. Topics 21-110 have individual runbooks.
- The committed 40-80 lessons were reviewed against their manifests, runbooks, and relevant primary documentation. Their useful explanations were retained, encoding was repaired, and heading/debug/discovery corrections were made.
- All thirty 81-110 lessons, walkthroughs, and runbooks were rewritten. Their folders now match the source question numbers, and applicable exercises include bounded faults, explicit recovery, and cleanup.
- Administrator investigations and unavailable optional integrations remain separate from successful runtime demonstrations.
- See [QUALITY-REVIEW-40-110.md](QUALITY-REVIEW-40-110.md) for findings and [VALIDATION.md](VALIDATION.md) for checks and actual runtime evidence.

## Source corrections

The PDF establishes the question sequence, not an infallible technical specification. The revised incident lessons correct Pending versus container waiting states, exit-137 interpretation, PDB scope and drain flags, retained-volume reuse, etcd alarm recovery, Secret incident evidence handling, Helm-version differences, Job cleanup selection, and Pod Security Admission behavior. Unsupported failure percentages and universal tuning prescriptions were removed.
