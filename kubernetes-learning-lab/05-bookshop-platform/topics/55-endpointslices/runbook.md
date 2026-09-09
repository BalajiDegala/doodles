# EndpointSlices and Endpoints: runbook

Run from the chapter directory, as shown in [shared setup](../../runbook.md).

## Prerequisites

Ready base replicas and read permission for EndpointSlices.

~~~powershell
kubectl -n k8s-learning-platform get pods -l app=platform-catalog -o wide
kubectl -n k8s-learning-platform get endpointslices -l kubernetes.io/service-name=platform-catalog
kubectl -n k8s-learning-platform get endpointslices -l kubernetes.io/service-name=platform-catalog -o yaml
~~~

Match endpoint addresses and targetRef names to the ready Pods. Inspect all returned slices. Expect port 8080, appropriate address families, and ready endpoints once the rollout settles.

## Troubleshooting and cleanup

An empty directory needs selector/readiness/controller checks. A transient terminating endpoint needs condition-aware interpretation. Do not hand-edit generated slices. Compare the API group/version with any old controller code that still reads Endpoints.

No resources are created by these reads, so nothing needs removal.
