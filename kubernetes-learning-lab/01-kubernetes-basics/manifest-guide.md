# Reading the Tiny Bookshop manifests

A manifest is a saved description of a Kubernetes object. Reading it should tell you what we want, which other objects it needs, and how to prove that it works.

Start with [BusyBox and containers](topics/03-pods/manifest-guide.md), then [the Deployment](topics/04-replicasets-and-deployments/manifest-guide.md), then [health checks](topics/12-application-probes/manifest-guide.md). These three explain most of the unfamiliar parts of the web application.

## How to read YAML

~~~yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hello-web
spec:
  replicas: 2
~~~

Read this as: "Use the apps/v1 API to manage a Deployment called hello-web with two copies."

| Notation | How to read it |
| --- | --- |
| `key: value` | A setting and its value |
| Indented lines | Settings belonging to the parent above them; indentation changes meaning |
| `- name: web` | One entry in a list; containers and ports are lists |
| `["/bin/sh", "-c"]` | A short way of writing a list |
| `\|` after a key | The following indented lines form one text value with line breaks |
| `{}` | An empty mapping; for `emptyDir: {}` it requests the default emptyDir settings |
| `# text` | A comment for the reader |
| `"1.0"` | A string; quotes keep a version label from becoming a number |

Use spaces for indentation. The filename prefix, such as `20-`, is our reading convention; it is not a Kubernetes setting or a dependency scheduler.

## Four common fields

| Field | Purpose | Example |
| --- | --- | --- |
| `apiVersion` | Selects the API group and version that understands the object | `v1` for a ConfigMap; `apps/v1` for a Deployment |
| `kind` | Selects the type of object | `Service` |
| `metadata` | Names, namespace, labels, and annotations | `name: hello-web` |
| `spec` | Describes the desired behaviour for kinds that use it | `replicas: 2` |

ConfigMaps use `data` for their contents. Our Secret uses `stringData`. Different kinds have different fields; do not add a `spec` just because another file has one.

Live objects also have a `status` written by Kubernetes. It describes what happened, such as how many replicas are ready. Our source manifests describe the desired state and do not supply that live status.

A Deployment, Service, ConfigMap, and Pod can have different names and still cooperate. Their references and selectors form the connections.

## Follow each actual file

| Manifest | Detailed explanation |
| --- | --- |
| [00-namespace.yaml](manifests/00-namespace.yaml) | [Namespace and quota fields](topics/06-namespaces-and-quotas/manifest-guide.md) |
| [05-resourcequota.yaml](manifests/05-resourcequota.yaml) | [Quota counts and storage totals](topics/06-namespaces-and-quotas/manifest-guide.md) |
| [10-configmap.yaml](manifests/10-configmap.yaml) | [Page, catalog, and health file contents](topics/07-configmaps-and-secrets/manifest-guide.md) |
| [11-secret.yaml](manifests/11-secret.yaml) | [Practice credentials](topics/07-configmaps-and-secrets/manifest-guide.md) |
| [20-deployment.yaml](manifests/20-deployment.yaml) | [Whole Deployment map](topics/04-replicasets-and-deployments/manifest-guide.md), [container command](topics/03-pods/manifest-guide.md), [probes](topics/12-application-probes/manifest-guide.md), [volumes](topics/13-configuration-delivery/manifest-guide.md), [init script](topics/14-init-containers/manifest-guide.md), [resources and security](topics/15-resource-management/manifest-guide.md) |
| [30-service.yaml](manifests/30-service.yaml) | [Selector and port mapping](topics/05-services/manifest-guide.md) |
| [40-daemonset.yaml](manifests/40-daemonset.yaml) | [Observer loop and node-name injection](topics/10-daemonsets/manifest-guide.md) |
| [50-job.yaml](manifests/50-job.yaml) | [Batch task script and retries](topics/11-jobs-and-cronjobs/manifest-guide.md) |
| [51-cronjob.yaml](manifests/51-cronjob.yaml) | [Schedule, template, and history](topics/11-jobs-and-cronjobs/manifest-guide.md) |
| [20-deployment-v2.yaml](manifests/releases/20-deployment-v2.yaml) | [Exactly what changes in release 2.0](topics/16-rollouts-and-rollback/manifest-guide.md) |
| [60-headless-service.yaml](manifests/storage/60-headless-service.yaml) | [Headless discovery](topics/18-service-dns/manifest-guide.md) |
| [61-statefulset.yaml](manifests/storage/61-statefulset.yaml) | [Stable identity and startup](topics/17-statefulsets-and-deployments/manifest-guide.md), [claim and disk mapping](topics/20-persistent-storage/manifest-guide.md) |
| [70-ingress.yaml](manifests/ingress/70-ingress.yaml) | [Host, path, controller, and backend](topics/19-ingress/manifest-guide.md) |

The snippets in the walkthroughs are excerpts for reading. Apply the complete files through the [runbook](runbook.md). Applying every directory recursively would include both release versions and the optional infrastructure examples.

## How to remember a topic

Read its four summary lines aloud. Cover them and use the memory cue to reconstruct the explanation in your own words. Finish with the bookshop example: "In this project, this field causes this behaviour." Use the walkthrough whenever a field interrupts your explanation.

For an illustration of this method: "Readiness decides whether traffic should arrive. In our bookshop, Kubernetes checks /ready.html. If that check fails, the server can keep running while its Pod stops receiving normal Service traffic."
