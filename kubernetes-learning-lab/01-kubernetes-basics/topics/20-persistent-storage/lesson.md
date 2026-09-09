# PersistentVolumes and PersistentVolumeClaims

## Concise technical summary

1. A PersistentVolume, or PV, represents storage available to the cluster.
2. A PersistentVolumeClaim, or PVC, requests storage for a workload.
3. A StorageClass can arrange a volume automatically, and the Pod mounts its claim.
4. Data survives Pod replacement while the volume remains; claim deletion follows the volume's reclaim policy.

Memory cue: Request a claim, bind a volume, mount it, retain data.

Read the [manifest walkthrough](manifest-guide.md) to connect these points to the YAML.

## Plain meaning

A Pod's writable container layer is like notes left on a disposable paper bag: replacing the Pod loses them. A PersistentVolume is a storage locker. A PersistentVolumeClaim is Maya's request for a locker of a particular size and type. Kubernetes matches the request with a suitable locker.

## Storage relationship

```text
StatefulSet Pod
      |
      v
PersistentVolumeClaim (namespaced request)
      |
      v
PersistentVolume (cluster storage record)
      |
      v
Actual disk, file share, or other storage system
```

## The Tiny Bookshop example

The [StatefulSet](../../manifests/storage/61-statefulset.yaml) contains a `volumeClaimTemplates` entry named `data`. Two replicas therefore create two claims:

```text
data-reading-list-0
data-reading-list-1
```

Each requests `64Mi` with access mode `ReadWriteOnce`. The StorageClass is omitted, so the lab requires a default StorageClass. A replacement `reading-list-0` Pod reuses `data-reading-list-0` and can read the same file.

The small capacity is only for learning. Some storage providers round it up or enforce a larger minimum.

The project does not include a hand-written PersistentVolume manifest. Disk, NFS, cloud, and CSI volume sources require platform-specific fields. Instead, the default StorageClass dynamically creates a suitable PersistentVolume, which is the portable workflow for this lab.

## Important distinctions

- `emptyDir` survives a container restart inside the same Pod but is deleted with the Pod.
- A PVC has a lifecycle separate from an ordinary Pod.
- Access mode describes intended attachment capability; supported behaviour depends on the storage driver and backend.
- `ReadWriteOnce` means read-write attachment by a single node, not necessarily a single Pod.
- A StatefulSet normally gives each replica its own claim rather than one shared writable disk.

## Production details

- Choose StorageClass performance, topology, encryption, expansion, backup, and reclaim policy deliberately.
- `Delete` reclaim policy can remove the backing storage after its claim is deleted; `Retain` leaves recovery and cleanup work to an administrator.
- A PersistentVolume is not a backup. Corruption or accidental deletion can persist perfectly.
- Use application-consistent backups and test restoration.
- Watch volume capacity, latency, attachment failures, and filesystem errors.
- Understand zone constraints and `volumeBindingMode`, especially for zonal disks.

Use [runbook step 19](../../runbook.md#19-add-the-optional-stateful-reading-list) to write a file, replace a Pod, and prove that the file remains.

Further reading: [Persistent Volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/), [StorageClasses](https://kubernetes.io/docs/concepts/storage/storage-classes/), and [dynamic provisioning](https://kubernetes.io/docs/concepts/storage/dynamic-provisioning/).
