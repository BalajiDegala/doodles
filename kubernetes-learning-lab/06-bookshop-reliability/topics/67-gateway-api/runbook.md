# Gateway API and Ingress: runbook

Run from the chapter directory, as shown in [shared setup](../../runbook.md).

## Prerequisites

Existing Gateway API/controller, ready base, and an approved compatible Gateway in this namespace. The route must fit its listener/allowedRoutes policy. If no parent is provided, render/read and optionally server-dry-run only.

~~~powershell
kubectl api-resources --api-group=gateway.networking.k8s.io
kubectl -n k8s-learning-reliability get gateway bookshop-gateway -o yaml
kubectl apply --dry-run=server -f topics/67-gateway-api/optional/
~~~

Only with the intended parent available:

~~~powershell
kubectl apply -f topics/67-gateway-api/optional/
kubectl -n k8s-learning-reliability get httproute bookshop-route -o yaml
curl.exe --fail --max-time 10 -H 'Host: bookshop.example.com' http://PASTE_GATEWAY_ADDRESS
~~~

Replace the address with the parent’s reachable listener address. Expect Accepted/ResolvedRefs for the intended parent and the catalog response through that listener. Missing-parent dry-run success proves schema acceptance only.

## Troubleshooting and cleanup

Check listener host/protocol, parent conditions, backend references, and actual address routing. Remove only this route if created:

~~~powershell
kubectl delete -f topics/67-gateway-api/optional/ --ignore-not-found
~~~
