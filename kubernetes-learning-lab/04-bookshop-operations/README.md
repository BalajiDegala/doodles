# Tiny Bookshop: daily operations

Maya's bookshop is open. Now she needs to preview changes, investigate stopped work, add capacity, control access, and close services cleanly. This chapter covers source topics 21-40 in their original order.

Start with [the story](story.md), then [the shared runbook](runbook.md). Each topic has four short technical points, a memory cue, its own manifest walkthrough, and a runbook with expected observations.

The chapter is independent of the earlier deployment. It uses `k8s-learning-operations`; the Helm and Kustomize exercises use separately named workloads inside that namespace. The admission exercise uses `k8s-learning-admission`.

## Topic path

| Number | Topic | Hands-on scope |
| --- | --- | --- |
| 21 | [Safe kubectl workflows](topics/21-safe-kubectl-workflows/lesson.md) | [Walkthrough](topics/21-safe-kubectl-workflows/manifest-guide.md) · [Runbook](topics/21-safe-kubectl-workflows/runbook.md) |
| 22 | [Pod lifecycle](topics/22-pod-lifecycle/lesson.md) | [Walkthrough](topics/22-pod-lifecycle/manifest-guide.md) · [Runbook](topics/22-pod-lifecycle/runbook.md) |
| 23 | [Container restart policies](topics/23-restart-policies/lesson.md) | [Walkthrough](topics/23-restart-policies/manifest-guide.md) · [Runbook](topics/23-restart-policies/runbook.md) |
| 24 | [Multi-container patterns](topics/24-multi-container-patterns/lesson.md) | [Walkthrough](topics/24-multi-container-patterns/manifest-guide.md) · [Runbook](topics/24-multi-container-patterns/runbook.md) |
| 25 | [Orchestration choices](topics/25-orchestration-choices/lesson.md) | [Walkthrough](topics/25-orchestration-choices/manifest-guide.md) · [Runbook](topics/25-orchestration-choices/runbook.md) |
| 26 | [Node affinity, taints, and tolerations](topics/26-node-placement/lesson.md) | [Walkthrough](topics/26-node-placement/manifest-guide.md) · [Runbook](topics/26-node-placement/runbook.md) |
| 27 | [Pod affinity and anti-affinity](topics/27-pod-placement/lesson.md) | [Walkthrough](topics/27-pod-placement/manifest-guide.md) · [Runbook](topics/27-pod-placement/runbook.md) |
| 28 | [Horizontal Pod Autoscaling](topics/28-horizontal-autoscaling/lesson.md) | [Walkthrough](topics/28-horizontal-autoscaling/manifest-guide.md) · [Runbook](topics/28-horizontal-autoscaling/runbook.md) |
| 29 | [Vertical and node autoscaling](topics/29-resource-and-node-autoscaling/lesson.md) | [Walkthrough](topics/29-resource-and-node-autoscaling/manifest-guide.md) · [Runbook](topics/29-resource-and-node-autoscaling/runbook.md) |
| 30 | [NetworkPolicies](topics/30-network-policies/lesson.md) | [Walkthrough](topics/30-network-policies/manifest-guide.md) · [Runbook](topics/30-network-policies/runbook.md) |
| 31 | [RBAC and ServiceAccounts](topics/31-rbac-and-service-accounts/lesson.md) | [Walkthrough](topics/31-rbac-and-service-accounts/manifest-guide.md) · [Runbook](topics/31-rbac-and-service-accounts/runbook.md) |
| 32 | [Helm packaging](topics/32-helm-packaging/lesson.md) | [Walkthrough](topics/32-helm-packaging/manifest-guide.md) · [Runbook](topics/32-helm-packaging/runbook.md) |
| 33 | [StorageClasses and provisioning](topics/33-storage-classes/lesson.md) | [Walkthrough](topics/33-storage-classes/manifest-guide.md) · [Runbook](topics/33-storage-classes/runbook.md) |
| 34 | [PodDisruptionBudgets](topics/34-disruption-budgets/lesson.md) | [Walkthrough](topics/34-disruption-budgets/manifest-guide.md) · [Runbook](topics/34-disruption-budgets/runbook.md) |
| 35 | [Kustomize and Helm](topics/35-kustomize-and-helm/lesson.md) | [Walkthrough](topics/35-kustomize-and-helm/manifest-guide.md) · [Runbook](topics/35-kustomize-and-helm/runbook.md) |
| 36 | [Configuration reloading](topics/36-configuration-reloading/lesson.md) | [Walkthrough](topics/36-configuration-reloading/manifest-guide.md) · [Runbook](topics/36-configuration-reloading/runbook.md) |
| 37 | [Pod and container security](topics/37-security-context/lesson.md) | [Walkthrough](topics/37-security-context/manifest-guide.md) · [Runbook](topics/37-security-context/runbook.md) |
| 38 | [Pod Security Standards and Admission](topics/38-pod-security-admission/lesson.md) | [Walkthrough](topics/38-pod-security-admission/manifest-guide.md) · [Runbook](topics/38-pod-security-admission/runbook.md) |
| 39 | [Container lifecycle hooks](topics/39-lifecycle-hooks/lesson.md) | [Walkthrough](topics/39-lifecycle-hooks/manifest-guide.md) · [Runbook](topics/39-lifecycle-hooks/runbook.md) |
| 40 | [Service mesh foundations](topics/40-service-mesh-foundations/lesson.md) | [Walkthrough](topics/40-service-mesh-foundations/manifest-guide.md) · [Runbook](topics/40-service-mesh-foundations/runbook.md) |

## Dependencies and boundaries

- Linux worker nodes, a compatible `kubectl`, permission for a dedicated practice namespace, and image access to `busybox:1.36`.
- Use a supported cluster version. The portable examples avoid alpha features; any version-specific behaviour is called out.
- Extra nodes improve the spreading demonstration but are not required for the base.
- HPA needs the resource metrics API, usually provided by Metrics Server. VPA needs its separately installed controller and CRD.
- NetworkPolicy needs a network plugin that enforces it. Storage needs an existing suitable StorageClass and provisioner.
- Helm practice needs Helm 3 or 4. Kustomize uses `kubectl kustomize`.
- Service mesh practice is observation-only unless your administrator already provides an enrolled test workload.

No exercise installs cluster add-ons, changes node taints, drains nodes, enables a mesh, or provisions a node group. Those operations can affect other applications and need a separate platform change plan.

Read [manifest conventions](manifest-guide.md) before applying files. Do not recursively apply the chapter: it contains alternative configurations and deliberate failure examples.
