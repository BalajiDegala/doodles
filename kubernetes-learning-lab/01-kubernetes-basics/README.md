# Tiny Bookshop Kubernetes Project

This module uses one small bookshop application to explain the first twenty Kubernetes topics. You deploy the application once and extend it as the story progresses.

Read [the project story](story.md) first. It explains why each Kubernetes feature is added instead of presenting twenty disconnected definitions.

Then open [Reading the manifests](manifest-guide.md). It introduces YAML and maps every project file to its detailed walkthrough. Each topic folder now has a `manifest-guide.md` explaining its fields, choices, and expected behaviour.

Every lesson starts with four short technical points and a memory cue. Read the points aloud, use the cue to recall them, and connect them to the bookshop example.

## The shared project

Maya owns a tiny bookshop. The public application is named `hello-web`. Its page and catalog are stored in a ConfigMap and served by two small web-server Pods. As the shop grows, the same project gains health checks, batch reports, safe releases, internal DNS, optional external routing, and a stateful reading-list service.

```text
Namespace: k8s-learning-basics
|
|-- ResourceQuota limits namespaced objects
|-- ConfigMap supplies the web page, catalog, and ordinary settings
|-- Secret supplies a practice-only sensitive setting
|-- Deployment uses an init container and asks for two application Pods
|   `-- ReplicaSet keeps those two Pods present
|-- Service sends connections to ready application Pods
|-- DaemonSet runs one observer Pod on each eligible node
|-- Job imports the catalog once
|-- CronJob produces a scheduled catalog report
|-- Optional Ingress routes outside HTTP traffic
`-- Optional StatefulSet and PVCs preserve reading-list data
```

## Twenty-topic path

| Step | Lesson | What to notice in the shared project |
| --- | --- | --- |
| 1 | [Kubernetes purpose](topics/01-kubernetes-purpose/lesson.md) | Requested state and automatic correction |
| 2 | [Cluster architecture](topics/02-cluster-architecture/lesson.md) | Control plane decisions and worker-node execution |
| 3 | [Pods](topics/03-pods/lesson.md) | The replaceable unit that holds the container |
| 4 | [ReplicaSets and Deployments](topics/04-replicasets-and-deployments/lesson.md) | How two Pod copies are maintained |
| 5 | [Services](topics/05-services/lesson.md) | One stable network destination for changing Pods |
| 6 | [Namespaces and quotas](topics/06-namespaces-and-quotas/lesson.md) | Grouping and limiting the practice resources |
| 7 | [ConfigMaps and Secrets](topics/07-configmaps-and-secrets/lesson.md) | Configuration kept outside the image |
| 8 | [`kubectl` essentials](topics/08-kubectl-essentials/lesson.md) | The small command set used to operate the project |
| 9 | [Labels, selectors, and annotations](topics/09-resource-metadata/lesson.md) | How resources are connected and described |
| 10 | [DaemonSets](topics/10-daemonsets/lesson.md) | One observer Pod on each eligible node |
| 11 | [Jobs and CronJobs](topics/11-jobs-and-cronjobs/lesson.md) | One-time catalog import and scheduled reports |
| 12 | [Application probes](topics/12-application-probes/lesson.md) | Startup, traffic readiness, and dead-container recovery |
| 13 | [Environment variables and configuration volumes](topics/13-configuration-delivery/lesson.md) | Different ways settings enter a container |
| 14 | [Init containers](topics/14-init-containers/lesson.md) | Prepare the website before the server starts |
| 15 | [Resource requests and limits](topics/15-resource-management/lesson.md) | Scheduling promises and runtime boundaries |
| 16 | [Rolling releases and rollback](topics/16-rollouts-and-rollback/lesson.md) | Move from release 1.0 to 2.0 and safely return |
| 17 | [StatefulSets and Deployments](topics/17-statefulsets-and-deployments/lesson.md) | Stable identity and storage for stateful replicas |
| 18 | [Kubernetes DNS](topics/18-service-dns/lesson.md) | Find Services and stateful Pods by name |
| 19 | [Ingress and ingress controllers](topics/19-ingress/lesson.md) | Route external HTTP traffic to the bookshop |
| 20 | [PersistentVolumes and claims](topics/20-persistent-storage/lesson.md) | Keep reading-list data when a Pod is replaced |

## Project files

| File | Purpose |
| --- | --- |
| `manifests/00-namespace.yaml` | Safe boundary for the project |
| `manifests/05-resourcequota.yaml` | Generous limits for the practice namespace |
| `manifests/10-configmap.yaml` | Web page, catalog, and ordinary application setting |
| `manifests/11-secret.yaml` | Practice-only sensitive setting |
| `manifests/20-deployment.yaml` | Release 1.0 with init container, probes, and two application Pods |
| `manifests/30-service.yaml` | Stable in-cluster destination for the application |
| `manifests/40-daemonset.yaml` | One lightweight observer per eligible node |
| `manifests/50-job.yaml` | One-time catalog import |
| `manifests/51-cronjob.yaml` | Scheduled catalog report |
| `manifests/releases/20-deployment-v2.yaml` | Release 2.0 used for rollout practice |
| `manifests/ingress/70-ingress.yaml` | Optional ingress route; requires an ingress controller |
| `manifests/storage/60-headless-service.yaml` | Optional DNS identity for the StatefulSet |
| `manifests/storage/61-statefulset.yaml` | Optional stateful reading-list replicas and PVC templates |

Read the lessons in order, then use the checkpoints in [runbook.md](runbook.md). The base project works on a normal practice cluster. Ingress and persistent storage are optional because they depend on cluster add-ons.
