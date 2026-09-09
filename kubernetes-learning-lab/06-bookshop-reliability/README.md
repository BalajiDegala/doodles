# Tiny Bookshop: reliability and scale

This chapter covers source questions 61-80 in their original order. Maya's Bookshop now needs repeatable recovery, controlled change, and evidence of security and capacity.

Start with [the story](story.md), [manifest conventions](manifest-guide.md), and [shared setup](runbook.md). Each topic has four short technical points, a memory cue, a concrete Bookshop connection, field explanations, and a runbook.

## Topic path

| Question | Topic | Practice |
| --- | --- | --- |
| 61 | [Multi-cluster strategies](topics/61-multiple-clusters/lesson.md) | [Walkthrough](topics/61-multiple-clusters/manifest-guide.md) / [Runbook](topics/61-multiple-clusters/runbook.md) |
| 62 | [Security hardening and kube-bench](topics/62-security-hardening/lesson.md) | [Walkthrough](topics/62-security-hardening/manifest-guide.md) / [Runbook](topics/62-security-hardening/runbook.md) |
| 63 | [Mesh identity, traffic, and observability](topics/63-mesh-traffic-and-identity/lesson.md) | [Walkthrough](topics/63-mesh-traffic-and-identity/manifest-guide.md) / [Runbook](topics/63-mesh-traffic-and-identity/runbook.md) |
| 64 | [Cluster upgrade planning](topics/64-cluster-upgrades/lesson.md) | [Walkthrough](topics/64-cluster-upgrades/manifest-guide.md) / [Runbook](topics/64-cluster-upgrades/runbook.md) |
| 65 | [Disaster recovery](topics/65-disaster-recovery/lesson.md) | [Walkthrough](topics/65-disaster-recovery/manifest-guide.md) / [Runbook](topics/65-disaster-recovery/runbook.md) |
| 66 | [Cost allocation and right-sizing](topics/66-cost-and-rightsizing/lesson.md) | [Walkthrough](topics/66-cost-and-rightsizing/manifest-guide.md) / [Runbook](topics/66-cost-and-rightsizing/runbook.md) |
| 67 | [Gateway API and Ingress](topics/67-gateway-api/lesson.md) | [Walkthrough](topics/67-gateway-api/manifest-guide.md) / [Runbook](topics/67-gateway-api/runbook.md) |
| 68 | [Kubernetes at scale](topics/68-large-clusters/lesson.md) | [Walkthrough](topics/68-large-clusters/manifest-guide.md) / [Runbook](topics/68-large-clusters/runbook.md) |
| 69 | [Kyverno, Gatekeeper, and supply-chain policy](topics/69-policy-and-supply-chain/lesson.md) | [Walkthrough](topics/69-policy-and-supply-chain/manifest-guide.md) / [Runbook](topics/69-policy-and-supply-chain/runbook.md) |
| 70 | [Karpenter and Cluster Autoscaler](topics/70-node-autoscalers/lesson.md) | [Walkthrough](topics/70-node-autoscalers/manifest-guide.md) / [Runbook](topics/70-node-autoscalers/runbook.md) |
| 71 | [EKS, GKE, and AKS](topics/71-managed-kubernetes/lesson.md) | [Walkthrough](topics/71-managed-kubernetes/manifest-guide.md) / [Runbook](topics/71-managed-kubernetes/runbook.md) |
| 72 | [API deprecations](topics/72-api-deprecations/lesson.md) | [Walkthrough](topics/72-api-deprecations/manifest-guide.md) / [Runbook](topics/72-api-deprecations/runbook.md) |
| 73 | [Native sidecar containers](topics/73-native-sidecars/lesson.md) | [Walkthrough](topics/73-native-sidecars/manifest-guide.md) / [Runbook](topics/73-native-sidecars/runbook.md) |
| 74 | [HPA, VPA, and KEDA](topics/74-coordinated-autoscaling/lesson.md) | [Walkthrough](topics/74-coordinated-autoscaling/manifest-guide.md) / [Runbook](topics/74-coordinated-autoscaling/runbook.md) |
| 75 | [Zero-trust networking](topics/75-zero-trust/lesson.md) | [Walkthrough](topics/75-zero-trust/manifest-guide.md) / [Runbook](topics/75-zero-trust/runbook.md) |
| 76 | [Kubernetes audit logging](topics/76-audit-logging/lesson.md) | [Walkthrough](topics/76-audit-logging/manifest-guide.md) / [Runbook](topics/76-audit-logging/runbook.md) |
| 77 | [Secret encryption at rest](topics/77-secret-encryption/lesson.md) | [Walkthrough](topics/77-secret-encryption/manifest-guide.md) / [Runbook](topics/77-secret-encryption/runbook.md) |
| 78 | [RuntimeClass and sandboxing](topics/78-runtime-classes/lesson.md) | [Walkthrough](topics/78-runtime-classes/manifest-guide.md) / [Runbook](topics/78-runtime-classes/runbook.md) |
| 79 | [Argo Rollouts and Flagger](topics/79-progressive-delivery/lesson.md) | [Walkthrough](topics/79-progressive-delivery/manifest-guide.md) / [Runbook](topics/79-progressive-delivery/runbook.md) |
| 80 | [Garbage collection and ownership](topics/80-garbage-collection/lesson.md) | [Walkthrough](topics/80-garbage-collection/manifest-guide.md) / [Runbook](topics/80-garbage-collection/runbook.md) |

## Scope and dependencies

The base uses namespace `k8s-learning-reliability` and two small BusyBox web Pods on Linux nodes. Every topic lists its extra requirements. Missing metrics, controllers, CRDs, policies, or permissions mean the relevant live exercise is skipped; they do not prevent reading or local design work.

Native sidecars require Kubernetes 1.33+ for the stable feature. The Gateway and KEDA exercises require existing installations. The recovery exercise uses its own disposable namespace. Upgrade, etcd restore, node provisioning, audit configuration, and encryption configuration are administrator procedures explained through inspection and planning.

Do not apply the chapter recursively. `optional/` needs declared dependencies; `negative/` contains inputs for server dry-run only; `reference/` contains configuration to read, not objects to install.

See [validation status](../VALIDATION.md) for evidence and remaining checks.
