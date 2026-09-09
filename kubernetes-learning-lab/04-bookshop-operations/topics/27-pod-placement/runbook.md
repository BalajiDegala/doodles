# Pod affinity and anti-affinity: runbook

## Prerequisites

The shared app must be running for the helper's required affinity. Two eligible nodes make spreading easier to see; one node is valid but cannot demonstrate cross-node separation.

## Observe placement

~~~powershell
kubectl apply -f topics/27-pod-placement/manifests/
kubectl -n k8s-learning-operations rollout status deployment/spread-display --timeout=120s
kubectl -n k8s-learning-operations wait --for=condition=Ready pod/nearby-helper --timeout=120s
kubectl -n k8s-learning-operations get pods -o wide
~~~

Compare node names. The helper should share a hostname domain with at least one `bookshop-ops` Pod. On suitable multiple-node capacity, the display replicas may spread; the rule is still only a preference.

## Troubleshooting and cleanup

If the helper waits, check whether a matching ready-to-run shop Pod exists and whether its node has capacity. Use `describe pod nearby-helper` for scheduler events.

~~~powershell
kubectl delete -f topics/27-pod-placement/manifests/ --ignore-not-found
~~~

No nodes or their labels are changed. The original shop remains running.
