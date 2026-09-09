# Tiny Bookshop: platform engineering

This chapter covers source questions 41-60 in their original order. Maya's Bookshop now needs monitoring, predictable networking, configuration delivery, and an understanding of cluster internals.

Start with [the story](story.md), [manifest conventions](manifest-guide.md), and [shared setup](runbook.md). Each topic has four short technical points, a memory cue, a concrete Bookshop connection, field explanations, and a runbook.

## Topic path

| Question | Topic | Practice |
| --- | --- | --- |
| 41 | [Kubernetes monitoring](topics/41-monitoring/lesson.md) | [Walkthrough](topics/41-monitoring/manifest-guide.md) / [Runbook](topics/41-monitoring/runbook.md) |
| 42 | [Centralized logging](topics/42-centralized-logging/lesson.md) | [Walkthrough](topics/42-centralized-logging/manifest-guide.md) / [Runbook](topics/42-centralized-logging/runbook.md) |
| 43 | [Blue-green and canary releases](topics/43-release-strategies/lesson.md) | [Walkthrough](topics/43-release-strategies/manifest-guide.md) / [Runbook](topics/43-release-strategies/runbook.md) |
| 44 | [ResourceQuota and LimitRange](topics/44-quotas-and-limitranges/lesson.md) | [Walkthrough](topics/44-quotas-and-limitranges/manifest-guide.md) / [Runbook](topics/44-quotas-and-limitranges/runbook.md) |
| 45 | [Networking and CNI plugins](topics/45-networking-and-cni/lesson.md) | [Walkthrough](topics/45-networking-and-cni/manifest-guide.md) / [Runbook](topics/45-networking-and-cni/runbook.md) |
| 46 | [Headless Services](topics/46-headless-services/lesson.md) | [Walkthrough](topics/46-headless-services/manifest-guide.md) / [Runbook](topics/46-headless-services/runbook.md) |
| 47 | [Ephemeral containers and kubectl debug](topics/47-ephemeral-debugging/lesson.md) | [Walkthrough](topics/47-ephemeral-debugging/manifest-guide.md) / [Runbook](topics/47-ephemeral-debugging/runbook.md) |
| 48 | [Topology spread constraints](topics/48-topology-spread/lesson.md) | [Walkthrough](topics/48-topology-spread/manifest-guide.md) / [Runbook](topics/48-topology-spread/runbook.md) |
| 49 | [Priority and preemption](topics/49-priority-and-preemption/lesson.md) | [Walkthrough](topics/49-priority-and-preemption/manifest-guide.md) / [Runbook](topics/49-priority-and-preemption/runbook.md) |
| 50 | [cert-manager and TLS certificates](topics/50-certificates-and-tls/lesson.md) | [Walkthrough](topics/50-certificates-and-tls/manifest-guide.md) / [Runbook](topics/50-certificates-and-tls/runbook.md) |
| 51 | [GitOps with Argo CD and Flux](topics/51-gitops/lesson.md) | [Walkthrough](topics/51-gitops/manifest-guide.md) / [Runbook](topics/51-gitops/runbook.md) |
| 52 | [External Secrets Operator](topics/52-external-secrets/lesson.md) | [Walkthrough](topics/52-external-secrets/manifest-guide.md) / [Runbook](topics/52-external-secrets/runbook.md) |
| 53 | [Image pulls and registry authentication](topics/53-image-pulls/lesson.md) | [Walkthrough](topics/53-image-pulls/manifest-guide.md) / [Runbook](topics/53-image-pulls/runbook.md) |
| 54 | [CoreDNS customization](topics/54-coredns/lesson.md) | [Walkthrough](topics/54-coredns/manifest-guide.md) / [Runbook](topics/54-coredns/runbook.md) |
| 55 | [EndpointSlices and Endpoints](topics/55-endpointslices/lesson.md) | [Walkthrough](topics/55-endpointslices/manifest-guide.md) / [Runbook](topics/55-endpointslices/runbook.md) |
| 56 | [etcd and cluster state](topics/56-etcd/lesson.md) | [Walkthrough](topics/56-etcd/manifest-guide.md) / [Runbook](topics/56-etcd/runbook.md) |
| 57 | [API request flow and admission](topics/57-api-admission/lesson.md) | [Walkthrough](topics/57-api-admission/manifest-guide.md) / [Runbook](topics/57-api-admission/runbook.md) |
| 58 | [CRDs and Operators](topics/58-crds-and-operators/lesson.md) | [Walkthrough](topics/58-crds-and-operators/manifest-guide.md) / [Runbook](topics/58-crds-and-operators/runbook.md) |
| 59 | [Scheduler filtering and scoring](topics/59-scheduler-internals/lesson.md) | [Walkthrough](topics/59-scheduler-internals/manifest-guide.md) / [Runbook](topics/59-scheduler-internals/runbook.md) |
| 60 | [CRI, containerd, and CRI-O](topics/60-container-runtimes/lesson.md) | [Walkthrough](topics/60-container-runtimes/manifest-guide.md) / [Runbook](topics/60-container-runtimes/runbook.md) |

## Scope and dependencies

The base uses namespace `k8s-learning-platform` and two small BusyBox web Pods on Linux nodes. Every topic lists its extra requirements. Missing metrics, controllers, CRDs, policies, or permissions mean the relevant live exercise is skipped; they do not prevent reading or local design work.

Question 44 uses its own quota namespace. cert-manager and External Secrets exercises use existing controllers; the secret-store demonstration contains only a public dummy value. Priority, CoreDNS customization, GitOps, etcd, and operator topics include observation/design work without taking over cluster infrastructure.

Do not apply the chapter recursively. `optional/` needs declared dependencies; `negative/` contains inputs for server dry-run only; `reference/` contains configuration to read, not objects to install.

See [validation status](../VALIDATION.md) for evidence and remaining checks.
