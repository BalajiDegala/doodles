# Node affinity, taints, and tolerations: runbook

## Prerequisites

Shared namespace, an eligible Linux node, and read permission for node information. No node mutation is needed.

## Inspect and run

~~~powershell
kubectl get nodes -L kubernetes.io/os
kubectl get nodes -o custom-columns=NAME:.metadata.name,TAINTS:.spec.taints
kubectl apply -f topics/26-node-placement/manifests/
kubectl -n k8s-learning-operations wait --for=condition=Ready pod/placement-worker --timeout=120s
kubectl -n k8s-learning-operations get pod placement-worker -o wide
kubectl -n k8s-learning-operations logs placement-worker
~~~

Expect placement on a Linux node and the same node name in logs. If no matching taint exists, the toleration has no observable effect; that is expected. It is not proof of a reservation.

## Troubleshooting and cleanup

A Pending Pod's events explain which constraints failed:

~~~powershell
kubectl -n k8s-learning-operations describe pod placement-worker
kubectl delete -f topics/26-node-placement/manifests/ --ignore-not-found
~~~

Do not remove existing taints or add broad tolerations to force placement. Request an appropriate practice node if cluster policy does not allow this workload.
