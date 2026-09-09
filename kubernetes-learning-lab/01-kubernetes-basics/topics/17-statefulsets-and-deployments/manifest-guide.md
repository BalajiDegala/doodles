# The reading-list StatefulSet

Actual file: [61-statefulset.yaml](../../manifests/storage/61-statefulset.yaml). It works with [60-headless-service.yaml](../../manifests/storage/60-headless-service.yaml).

## Workload identity

| Field | Meaning |
| --- | --- |
| `apiVersion: apps/v1`, `kind: StatefulSet` | Manage Pods that have stable identities |
| `metadata.name: reading-list` | Base name used for replica names |
| `serviceName: reading-list` | Governing headless Service for their network identities |
| `replicas: 2` | Create reading-list-0 and reading-list-1 |
| `selector.matchLabels.app` | Select Pods labelled reading-list |
| `template.metadata.labels` | Apply that matching label and the project labels |
| Omitted `podManagementPolicy` | Uses default OrderedReady behaviour |

OrderedReady normally creates ordinal 0 and waits for it to be ready before ordinal 1. The identities survive replacement, but IP addresses can change.

## The startup script

~~~sh
set -eu
if [ ! -f /data/identity.txt ]; then
  echo "Volume first initialized by ${POD_NAME}" > /data/identity.txt
fi
exec httpd -f -p 8080 -h /data
~~~

`[ ! -f ... ]` means "if this regular file does not already exist." It prevents overwriting the first-initialization message every time the container starts.

`POD_NAME` comes from `env.valueFrom.fieldRef.fieldPath: metadata.name`. The Downward API injects this Pod's name, such as reading-list-0.

`exec` replaces the shell process with the HTTP server. `-f` keeps it in the foreground, `-p 8080` chooses its port, and `-h /data` chooses its document directory. The server can return `/identity.txt` from the mounted volume.

## Health, resources, and storage

The readiness probe requests `/identity.txt` using named port `http` every five seconds. It checks that the initialized file can be served. There is no explicit startup or liveness probe in this example.

The container requests `5m` CPU and `16Mi` memory, with limits of `25m` and `32Mi`. It uses the [same security settings](../15-resource-management/manifest-guide.md#shutdown-and-security-fields), including fsGroup for supported storage access, and a ten-second termination window.

`volumeMounts.name: data` corresponds to the claim template named `data`. Read the [PVC walkthrough](../20-persistent-storage/manifest-guide.md) for that connection.

## What this example proves

Each replica owns a different file store. Writing to reading-list-0 does not copy that file into reading-list-1. There is no replication, shared database, login, or public website integration in this small helper.

It demonstrates identity and persistence within Maya's project. Use [runbook step 19](../../runbook.md#19-add-the-optional-stateful-reading-list) to replace ordinal 0 and read its saved data.
