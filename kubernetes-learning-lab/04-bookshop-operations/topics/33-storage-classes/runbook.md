# StorageClasses: runbook

## Prerequisites

Use the shared namespace and an existing suitable dynamic provisioner/default StorageClass. Storage allocation can incur cost. Confirm that 1 GiB of disposable practice storage is allowed, and inspect reclaim policy before creating the claim. If no suitable class exists, skip application.

~~~powershell
kubectl get storageclass
kubectl get storageclass PASTE_CLASS_NAME -o yaml
kubectl -n k8s-learning-operations get pvc bookshop-locker
~~~

Replace `PASTE_CLASS_NAME` with the selected class. Expect `NotFound` for a fresh claim; inspect an existing claim before using it.

## Bind and write

~~~powershell
kubectl apply -f topics/33-storage-classes/manifests/
kubectl -n k8s-learning-operations wait --for=condition=Ready pod/locker-reader --timeout=180s
kubectl -n k8s-learning-operations get pvc bookshop-locker -o wide
kubectl -n k8s-learning-operations describe pvc bookshop-locker
kubectl -n k8s-learning-operations exec locker-reader -- sh -c 'echo bookshop-note-33 > /data/note.txt'
kubectl -n k8s-learning-operations exec locker-reader -- cat /data/note.txt
~~~

Expect a Bound claim and `bookshop-note-33`. With `WaitForFirstConsumer`, create the consumer before waiting for binding.

## Replace the consumer and prove persistence

~~~powershell
kubectl delete -f topics/33-storage-classes/manifests/20-consumer.yaml --wait=true
kubectl apply -f topics/33-storage-classes/manifests/20-consumer.yaml
kubectl -n k8s-learning-operations wait --for=condition=Ready pod/locker-reader --timeout=180s
kubectl -n k8s-learning-operations exec locker-reader -- cat /data/note.txt
~~~

Expect the existing note without another write command. This proves Pod replacement persistence, not backup, replication, or disaster recovery.

## Troubleshooting and cleanup

Pending claims: read PVC events for missing class, provisioner failure, topology, or quota. Pending Pods: read scheduling/mount events. `Permission denied` at `/data` needs a driver/ownership review; do not run privileged containers to hide it.

Before deleting, record the bound PV name from the claim and inspect `kubectl get pv PASTE_PV_NAME -o yaml` if permitted. Deleting the claim below deliberately discards this lab's note and may delete backing storage.

~~~powershell
kubectl delete -f topics/33-storage-classes/manifests/20-consumer.yaml --ignore-not-found --wait=true
kubectl delete -f topics/33-storage-classes/manifests/10-pvc.yaml --ignore-not-found
~~~

Ask the storage owner to review any retained PV and remaining costs. Do not delete unrelated PVs or StorageClasses.
