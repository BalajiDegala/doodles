# StorageClasses: reading the manifests

Files: [claim](manifests/10-pvc.yaml) and [consumer](manifests/20-consumer.yaml).

| Field | Why this value is used |
| --- | --- |
| `kind: PersistentVolumeClaim` | Request storage through the Kubernetes API |
| `metadata.name: bookshop-locker` | Stable claim name reused by replacement Pods |
| `accessModes: [ReadWriteOnce]` | Request a common single-node write mode |
| `resources.requests.storage: 1Gi` | Request a small, explicit capacity; the provider may allocate more |
| Omitted `storageClassName` | Use the existing default class; this differs from an explicit empty string |
| `persistentVolumeClaim.claimName: bookshop-locker` | Connect the Pod volume to this namespace's claim |
| `mountPath: /data` | Expose its filesystem to the reader |

If your administrator provides a named practice class instead, add its exact `storageClassName` to the claim before its first creation. Do not paste an invented provisioner into a new StorageClass. Claim class changes generally require a new claim, so choose first.

The consumer has the [non-root identity and fsGroup](../37-security-context/manifest-guide.md) used elsewhere. Filesystem access depends on driver support and volume ownership. Its command only sleeps; the runbook writes the note explicitly so recreating the Pod cannot silently regenerate the evidence.

No PV or StorageClass YAML is included. Inspect the actual bound PV to learn what the existing provisioner created. The [earlier persistence chapter](../../../01-kubernetes-basics/topics/20-persistent-storage/lesson.md) connects claims to StatefulSet storage.

Continue with the [runbook](runbook.md).
