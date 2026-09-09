# Namespace and ResourceQuota walkthrough

Files: [00-namespace.yaml](../../manifests/00-namespace.yaml) and [05-resourcequota.yaml](../../manifests/05-resourcequota.yaml).

## Naming Maya's workspace

The Namespace uses `apiVersion: v1` and `kind: Namespace`. Its `metadata.name` is `k8s-learning-basics`. The topic label and purpose annotation describe the practice area.

There is no `metadata.namespace` on a Namespace: a namespace is itself a cluster-scoped resource. Other files join it by setting `metadata.namespace: k8s-learning-basics`.

The manifest does not define RBAC or NetworkPolicy. Grouping objects into this namespace does not itself stop another namespace from accessing the web Service.

## Reading the quota

The ResourceQuota is called `learning-object-limits` and belongs to the practice namespace. `spec.hard` contains ceilings, not targets to fill.

| Quota key | Limit | Meaning |
| --- | --- | --- |
| `pods` | `200` | Ceiling for non-terminal Pods, including web and node-observer Pods |
| `count/configmaps` | `20` | Maximum ConfigMap objects |
| `count/secrets` | `20` | Maximum Secret objects |
| `count/services` | `10` | Maximum Service objects |
| `count/deployments.apps` | `10` | Maximum Deployments in the apps API group |
| `count/daemonsets.apps` | `5` | Maximum DaemonSets |
| `count/statefulsets.apps` | `5` | Maximum StatefulSets |
| `count/jobs.batch` | `20` | Maximum Job objects, including finished Jobs until deleted |
| `count/cronjobs.batch` | `10` | Maximum CronJob objects |
| `persistentvolumeclaims` | `10` | Maximum PVC objects |
| `requests.storage` | `5Gi` | Combined requested storage across the namespace's claims |

The count values are quoted resource quantities. `5Gi` means five gibibytes. It describes claimed capacity, not current filesystem usage.

## Why these settings exist

The generous counts let you inspect quota usage without constantly hitting a small ceiling. They are lab choices, not recommended allocations for every cluster.

A rejected new resource can have a quota error even when nodes look idle. Conversely, quota allowance does not guarantee nodes or disks have enough real capacity. The quota also does not impose per-container CPU or memory limits; [those are separate fields](../15-resource-management/manifest-guide.md).

Use [runbook step 3](../../runbook.md#3-create-the-namespace-and-quota) to compare `Used` and `Hard`. On a large cluster the DaemonSet can create many Pods, so review node count before running it.
