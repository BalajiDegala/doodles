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
| 5 | [Bookshop platform](05-bookshop-platform/README.md) | Practise topics 41-60: observability, networking, scheduling, APIs, and platform extensions | 3-4 hours, plus optional dependency checks |
| 6 | [Production reliability](06-bookshop-reliability/README.md) | Practise topics 61-80: multi-cluster, security, upgrades, autoscaling, zero-trust, and recovery | 3-4 hours, plus optional dependency checks |
| 7 | [Production incident clinic](07-production-incidents/README.md) | Diagnose topics 81-95: startup, nodes, routing, storage, DNS, datastore, secrets, operators, and HPA | 2-3 hours |
| 8 | [Production governance and recovery](08-production-governance/README.md) | Diagnose topics 96-110: disk, ingress, policy, cleanup, costs, admission, certificates, Helm, data, and security | 2-3 hours |

The library has 110 numbered topics across six topic chapters, plus two release-strategy extensions. The Bookshop story connects foundations, platform operation, and production incident response.

The operations, platform, and reliability chapters add sixty topics with individual runbooks and shared applications. The incident and governance chapters add thirty source-matched troubleshooting topics with their own isolated catalogs. Optional exercises declare their metrics, policy, storage, and controller dependencies. Start each chapter with its own setup instructions.

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

Commands use the working directory specified by each runbook. Each topic uses its own chapter directory, including commands in nested topic folders. Do not recursively apply the library: variants, optional resources, and deliberate failure examples require their own runbook steps.

## Important limit of the examples

These manifests teach one idea at a time. They are suitable for a practice cluster, but they are not a complete production platform. Production workloads also need decisions about security, secrets, storage, monitoring, backups, policy, cost, and availability.

See [ROADMAP.md](ROADMAP.md) for the content conventions and delivery checkpoint.

See [COVERAGE.md](COVERAGE.md) for the completed source-topic range and its practical artifacts.

See [VALIDATION.md](VALIDATION.md) for local checks, live results, and untested integration limits. The [quality review](QUALITY-REVIEW-40-110.md) records the review of questions 40-110.
