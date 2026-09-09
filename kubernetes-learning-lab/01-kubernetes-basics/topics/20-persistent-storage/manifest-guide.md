# How each StatefulSet Pod gets its disk

Actual file: [61-statefulset.yaml](../../manifests/storage/61-statefulset.yaml), sections `volumeClaimTemplates` and `volumeMounts`.

## Read the claim template

~~~yaml
volumeClaimTemplates:
  - metadata:
      name: data
    spec:
      accessModes:
        - ReadWriteOnce
      resources:
        requests:
          storage: 64Mi
~~~

| Field | Meaning |
| --- | --- |
| `volumeClaimTemplates` | Templates from which the StatefulSet creates a separate PVC for each replica |
| `metadata.name: data` | Claim-template name used in generated PVC names |
| Template project label | Tag for locating related claims |
| `accessModes: [ReadWriteOnce]` | Request read-write attachment on one node; it does not mean one Pod in all circumstances |
| `resources.requests.storage: 64Mi` | Ask for at least 64 mebibytes for each claim |
| Omitted `storageClassName` | Let the cluster assign its default StorageClass |
| Omitted `volumeMode` | Use the default Filesystem mode, so the container mounts a directory |

Some providers allocate a larger minimum disk than 64Mi. The small request is a learning value, not a guarantee about allocated capacity or price.

## Connect the names

~~~text
StatefulSet reading-list, claim template data
    |
    +-- Pod reading-list-0 -> PVC data-reading-list-0 -> its PV
    |
    +-- Pod reading-list-1 -> PVC data-reading-list-1 -> a different PV
~~~

In the container:

~~~yaml
volumeMounts:
  - name: data
    mountPath: /data
~~~

`name: data` matches the claim template. Kubernetes attaches and mounts the corresponding replica's volume at `/data`. The container writes ordinary files there.

There is no separate PVC YAML because the StatefulSet creates claims from its template. There is no platform-specific PV YAML because a default StorageClass and its provisioner create or supply compatible storage.

## Follow a Pod replacement

Deleting reading-list-0 removes its running container. The StatefulSet makes a replacement with the same ordinal identity. That replacement uses data-reading-list-0 again, so the file can remain on the volume.

The object binding can persist even when attaching the disk to a new node takes time or encounters topology restrictions. A persistent claim is not a promise of instant recovery.

## Follow deletion separately

This manifest does not set a PVC retention policy; StatefulSet scale-down or deletion retains its claims by default. Deleting the namespace still deletes its namespaced PVCs.

After a PVC is deleted, the PV's reclaim policy controls what happens to storage: Delete can remove the backing volume; Retain leaves it for administrator handling. A surviving file is not a backup.

Use [runbook step 19](../../runbook.md#19-add-the-optional-stateful-reading-list) to inspect the claims, write a sample entry, replace one Pod, and read it again.
