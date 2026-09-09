# Headless Services: runbook

Run from the chapter directory, as shown in [shared setup](../../runbook.md).

## Prerequisites

Base replicas must be ready, with working cluster DNS.

The lookup commands assume `cluster.local`; use the domain in the Pod's resolver search configuration if it differs. Absolute names with a trailing dot avoid BusyBox reporting search-suffix NXDOMAIN errors alongside a valid answer.

~~~powershell
kubectl apply -f topics/46-headless-services/manifests/
kubectl -n k8s-learning-platform get svc platform-catalog catalog-peers
kubectl -n k8s-learning-platform get pods -l app=platform-catalog -o wide
kubectl -n k8s-learning-platform exec deployment/platform-catalog -- nslookup platform-catalog.k8s-learning-platform.svc.cluster.local.
kubectl -n k8s-learning-platform exec deployment/platform-catalog -- nslookup catalog-peers.k8s-learning-platform.svc.cluster.local.
kubectl -n k8s-learning-platform exec deployment/platform-catalog -- wget -T 3 -qO- http://catalog-peers:8080
~~~

Expect the normal Service IP in the first answer and backing Pod addresses in the second. The HTTP request should return the page using a selected Pod address. DNS tools may print multiple sections or IPv4/IPv6 results.

## Troubleshooting and cleanup

If no peers appear, inspect ready EndpointSlices and selectors; allow DNS propagation. One successful request is not balancing proof.

~~~powershell
kubectl -n k8s-learning-platform get endpointslices -l kubernetes.io/service-name=catalog-peers
kubectl delete -f topics/46-headless-services/manifests/ --ignore-not-found
~~~
