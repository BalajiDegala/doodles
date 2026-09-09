# Reading the complete Deployment

Actual file: [20-deployment.yaml](../../manifests/20-deployment.yaml). Maya uses this file to describe two web Pods and how future releases should replace them.

## Three levels to keep separate

~~~text
metadata                  identity of the Deployment
spec                      decisions made by the Deployment
  template
    metadata              labels and annotations copied onto new Pods
    spec                  containers and volumes inside each new Pod
~~~

A Deployment label is not automatically a Pod label. The Pod's label must appear under `spec.template.metadata.labels`.

## Field-by-field map

| Field | Value here | Meaning |
| --- | --- | --- |
| `apiVersion` | `apps/v1` | Stable API group/version for this workload |
| `kind` | `Deployment` | Request a controller that manages releases through ReplicaSets |
| `metadata.name` | `hello-web` | The Deployment's name |
| `metadata.namespace` | `k8s-learning-basics` | Where this Deployment and its Pods belong |
| `metadata.labels` | `app` and `app.kubernetes.io/*` | Tags for locating the Deployment |
| `metadata.annotations` | Purpose and change cause | Notes describing the resource and revision |
| `spec.replicas` | `2` | Desired number of web Pods |
| `revisionHistoryLimit` | `5` | Retain up to five old ReplicaSets for history after rollout cleanup |
| `progressDeadlineSeconds` | `120` | Report failure if rollout progress stalls for this interval; it does not automatically undo the release |
| `strategy.type` | `RollingUpdate` | Replace Pods gradually |
| `maxUnavailable` | `0` | Do not intentionally reduce available replicas below the desired count during the rollout |
| `maxSurge` | `1` | Allow one extra replica while updating; terminating Pods can temporarily add to resource usage |
| `selector.matchLabels` | `app: hello-web` | Label rule used to identify this workload's Pods |
| `template` | Pod metadata and spec | The recipe used for each new Pod |

With two desired replicas, a healthy update can start an extra Pod and wait for readiness before reducing the old replica count. This requires room for the extra Pod and cannot prevent unrelated node failures.

## Every block inside the Pod recipe

| Block | Explanation |
| --- | --- |
| `template.metadata` | [Labels, selectors, annotations](../09-resource-metadata/manifest-guide.md) |
| `terminationGracePeriodSeconds` and `securityContext` | [Shutdown and security settings](../15-resource-management/manifest-guide.md#shutdown-and-security-fields) |
| `initContainers` | [Preparing the website](../14-init-containers/manifest-guide.md) |
| `containers`, `image`, `command`, `args`, and `ports` | [BusyBox and the web process](../03-pods/manifest-guide.md) |
| `env` | [Configuration delivery](../13-configuration-delivery/manifest-guide.md) |
| `startupProbe`, `readinessProbe`, `livenessProbe` | [Health checks and timings](../12-application-probes/manifest-guide.md) |
| `resources` | [Requests and limits](../15-resource-management/manifest-guide.md) |
| `volumeMounts` and `volumes` | [Files shared between containers](../13-configuration-delivery/manifest-guide.md) |

## Fields people often confuse

Changing `replicas` changes the number of copies. Changing `spec.template` changes the recipe and triggers a rollout. Changing only a top-level descriptive annotation does not change the Pod recipe.

There is no standalone ReplicaSet YAML because the Deployment creates that object. The ReplicaSet then creates Pods. There is also no readiness guarantee merely because `kubectl apply` succeeded.

Use [runbook step 5](../../runbook.md#5-create-the-application-workload) for creation and [the release walkthrough](../16-rollouts-and-rollback/manifest-guide.md) for the version change.
