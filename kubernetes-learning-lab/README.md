# Kubernetes Learning Lab

This project explains Kubernetes in plain language and then lets you see each idea on a real cluster.

The examples are intentionally small. Each one uses its own namespace, so it stays separate from your existing applications.

## Learning path

| Order | Topic | Main idea | Practice time |
| --- | --- | --- | --- |
| 1 | [Tiny Bookshop project](01-kubernetes-basics/README.md) | Learn the first twenty topics through one continuing application story | 2-3 hours |
| 2 | [Blue-green deployment](02-blue-green-deployment/lesson.md) | Keep two releases ready and move all traffic in one switch | 15-20 minutes |
| 3 | [Canary deployment](03-canary-deployment/lesson.md) | Send a small part of the traffic to a new release first | 15-20 minutes |
| 4 | [Bookshop daily operations](04-bookshop-operations/README.md) | Practise topics 21-40: placement, scaling, access, packaging, storage, security, and shutdown | 3-4 hours, plus optional dependency checks |

The core project has twenty small topic folders. They all refer to the same story, manifests, and running application, so you can see how the components connect instead of learning them as isolated definitions.

The operations chapter adds twenty more topic folders with individual runbooks and a separate shared application. Its optional exercises declare metrics, VPA, network-plugin, storage, and admission dependencies. Helm and Kustomize include local rendering exercises. Start that chapter with its own setup instructions.

Content uses this pattern:

- `lesson.md` - four short technical points, a memory cue, plain-language explanation, everyday comparison, story connection, and production details.
- `manifest-guide.md` - field-by-field explanations, why each setting is used, and links to the actual YAML.
- `manifests/` - Kubernetes YAML files that can be applied to a cluster. Related topics can share one project manifest set.
- `runbook.md` - pre-checks, exact commands, expected results, troubleshooting, rollback, and cleanup.

## Requirements

You need:

- An existing non-production Kubernetes cluster.
- `kubectl` installed on your computer.
- A kubeconfig context that points to the intended cluster.
- Permission to create a namespace, ResourceQuota, ConfigMaps, Secrets, Deployments, Services, DaemonSets, Jobs, CronJobs, and Pods.
- Cluster nodes that can pull `busybox:1.36`, or already have that image cached.
- Free local port `8080` for viewing the core-project page from your computer.

The base project and rollout examples do not need an ingress controller, a load balancer, Helm, or a service mesh.

The optional ingress chapter needs an existing ingress controller. The optional persistence chapter needs a default StorageClass and permission to create StatefulSets and PersistentVolumeClaims. The runbook checks these dependencies before use.

## Cluster safety check

Run these commands before starting any lab:

```console
kubectl version --client
kubectl config current-context
kubectl cluster-info
kubectl auth can-i create namespaces
kubectl auth can-i create deployments --all-namespaces
kubectl auth can-i create services --all-namespaces
kubectl auth can-i create configmaps --all-namespaces
kubectl auth can-i create jobs --all-namespaces
kubectl auth can-i create cronjobs --all-namespaces
```

Read the context name carefully. Continue only when it is the cluster you intend to use.

If a permission check returns `no`, ask the cluster administrator for a safe practice namespace or the missing permission. Do not work around the cluster policy.

## How to use the lab

1. Start with the lesson's four technical points and memory cue.
2. Read its manifest walkthrough alongside the actual YAML; start with the [manifest reading guide](01-kubernetes-basics/manifest-guide.md) if YAML is new to you.
3. Follow the project's `runbook.md` from top to bottom.
4. Perform the rollback or self-healing exercise.
5. Run the cleanup command when finished.

Commands use the working directory specified by each runbook. All operations topic commands run from `04-bookshop-operations`, including commands in its nested topic folders. Do not recursively apply the library: variants, optional resources, and deliberate failure examples require their own runbook steps.

## Important limit of the examples

These manifests teach one idea at a time. They are suitable for a practice cluster, but they are not a complete production platform. Production workloads also need decisions about security, secrets, storage, monitoring, backups, policy, cost, and availability.

See [ROADMAP.md](ROADMAP.md) for the plan to grow this MVP into a full learning library.

See [COVERAGE.md](COVERAGE.md) for the completed source-topic range and its practical artifacts.

See [VALIDATION.md](VALIDATION.md) for local checks and the live-cluster verification still to perform.
