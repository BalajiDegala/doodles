# StatefulSets and Deployments

## Concise technical summary

1. A Deployment suits application replicas that can replace one another.
2. A StatefulSet gives replicas stable names, such as reading-list-0.
3. It can attach a separate persistent claim to each replica.
4. It manages identity and lifecycle; the application still needs replication and backups.

Memory cue: Deployment copies; StatefulSet identities.

Read the [manifest walkthrough](manifest-guide.md) to connect these points to the YAML.

## Plain meaning

Web-shop assistants can swap desks without changing the service, so they resemble Deployment Pods. Safe-deposit boxes have fixed numbers and contents that must return to the same owner, so they resemble StatefulSet Pods and volumes.

## Behaviour comparison

| Behaviour | Deployment | StatefulSet |
| --- | --- | --- |
| Pod identity | Generated and replaceable | Stable ordinal such as `reading-list-0` |
| Replicas | Expected to be interchangeable | Each replica can have a distinct identity |
| Network name | Usually accessed through one normal Service | Often one name per Pod through a headless Service |
| Storage | Often shared or ephemeral | Commonly one PVC per Pod from `volumeClaimTemplates` |
| Start and stop order | No stable ordinal order guarantee | Ordered behaviour by default |

## The Tiny Bookshop example

The public website remains a Deployment because any ready web Pod can serve any request.

The optional [reading-list StatefulSet](../../manifests/storage/61-statefulset.yaml) has two replicas:

```text
reading-list-0 -> data-reading-list-0 PVC
reading-list-1 -> data-reading-list-1 PVC
```

The [headless Service](../../manifests/storage/60-headless-service.yaml) supplies stable discovery names. Each Pod writes an identity file only when its own volume is empty, then serves the files from that volume.

## Production details

- StatefulSet storage requires a suitable provisioner or pre-created PersistentVolumes.
- A headless Service provides discovery; it does not load-balance through one virtual IP.
- Scaling down does not erase retained application data by default.
- Stable identity does not make a single replica highly available.
- Databases need software-specific clustering, quorum, backup, restore, upgrade, and disruption procedures.
- Operators are often used for complex stateful systems because they encode those application-specific procedures.

Use [runbook step 19](../../runbook.md#19-add-the-optional-stateful-reading-list) only when the cluster has a suitable default StorageClass.

Further reading: [StatefulSets](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/).
