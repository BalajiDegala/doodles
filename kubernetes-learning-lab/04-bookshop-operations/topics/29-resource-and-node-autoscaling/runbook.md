# Vertical and node autoscaling: runbook

## Prerequisites

Finish the HPA exercise. The base website must be running. VPA practice requires an existing VPA installation and permission to use its CRD.

~~~powershell
kubectl api-resources --api-group=autoscaling.k8s.io
kubectl get nodes
~~~

If VPA is absent, read the YAML and skip application. The absence is a dependency result, not an application failure.

## Optional recommendation observation

~~~powershell
kubectl apply --dry-run=server -f topics/29-resource-and-node-autoscaling/optional/10-vpa.yaml
kubectl apply -f topics/29-resource-and-node-autoscaling/optional/10-vpa.yaml
kubectl -n k8s-learning-operations describe vpa bookshop-sizing
kubectl -n k8s-learning-operations get vpa bookshop-sizing -o yaml
~~~

Recommendations can take time to appear, especially for new, nearly idle workloads. Look for CPU/memory targets and recommendation conditions. Verify the Deployment's authored requests remain unchanged.

For node autoscaling, ask the administrator which controller and node groups are in use; managed services may not expose a controller Pod. Inspect existing Pending Pod events only if you have permission. Do not create resource pressure to provoke new billable nodes.

## Cleanup and troubleshooting

~~~powershell
kubectl delete -f topics/29-resource-and-node-autoscaling/optional/10-vpa.yaml --ignore-not-found
~~~

Run cleanup only if VPA exists and you created this resource. Missing recommendations can indicate insufficient history, unavailable metrics, or a nonworking recommender; inspect controller health with the administrator.
