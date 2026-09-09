# 48. Topology spread constraints: runbook

Run from the chapter directory, as shown in [shared setup](../../runbook.md).

## Prerequisites

Base ConfigMap and spare capacity for three small replicas. Multiple eligible Linux nodes are needed to observe cross-node spreading.

~~~powershell
kubectl get nodes -L kubernetes.io/hostname,topology.kubernetes.io/zone
kubectl apply -f topics/48-topology-spread/manifests/
kubectl -n k8s-learning-platform rollout status deployment/topology-counters --timeout=120s
kubectl -n k8s-learning-platform get pods -l app=topology-counters -o wide
~~~

Count replicas by node. On one node all three share the same domain; record that limitation. On several nodes the preference competes with other scheduler scores and constraints.

## Troubleshooting and cleanup

Read Pod events for resource, taint, or node-label issues. Do not add fake zone labels or change node taints to produce a desired diagram.

~~~powershell
kubectl -n k8s-learning-platform describe pods -l app=topology-counters
kubectl delete -f topics/48-topology-spread/manifests/ --ignore-not-found
~~~
