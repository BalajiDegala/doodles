# The node-observer DaemonSet

Actual file: [40-daemonset.yaml](../../manifests/40-daemonset.yaml).

## Why the observer belongs in the story

Maya wants to see which workers host an observer. This helper prints its node name every thirty seconds. It demonstrates placement; it does not collect machine metrics, inspect host logs, or monitor the web application.

## Controller and container settings

| Field | Meaning |
| --- | --- |
| `apiVersion: apps/v1`, `kind: DaemonSet` | Use the controller for one Pod per eligible node |
| `metadata.name: node-observer` | Name of that controller |
| `metadata.namespace` | Keep its Pods in the project namespace |
| `selector.matchLabels.app` | `node-observer` identifies its Pods |
| `template.metadata.labels.app` | Places the same label on every observer Pod |
| No `replicas` field | Count follows eligible nodes instead of a requested total |
| `containers[0].name: observer` | Name used when reading this container's output |
| `image: busybox:1.36` | Supplies a shell, echo, and sleep |
| `command: ["/bin/sh", "-c"]` | Run the loop supplied in args |

## How the shell loop works

~~~sh
while true; do
  echo "node-observer is running on ${NODE_NAME}"
  sleep 30
done
~~~

`while true` repeats continuously. `echo` writes one message to the container's standard output, visible through `kubectl logs`. `sleep 30` waits thirty seconds between messages.

The environment entry uses `valueFrom.fieldRef.fieldPath: spec.nodeName`. This is the Downward API: Kubernetes provides information about the current Pod without the program calling the cluster API. Here it supplies the node chosen for that Pod.

## Resources and permissions

The observer requests `5m` CPU and `8Mi` memory and has limits of `20m` and `16Mi`. It uses the same non-root, no-escalation, read-only root filesystem settings explained in [resources and security](../15-resource-management/manifest-guide.md).

There are no host filesystem mounts, privileged settings, or explicit control-plane tolerations. Node eligibility depends on taints and scheduling rules; the number of observers can therefore be smaller than the total node count.

Use [runbook step 10](../../runbook.md#10-create-the-daemonset) to compare the NODE column and observer log.
