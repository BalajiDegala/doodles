# 97. Ingress returns 502 after deployment: runbook

## Prerequisites

Healthy base, Service writes, and exec permission. Full ingress verification additionally requires an existing approved controller, ingress, and reachable address.

Use [chapter setup](../../runbook.md) first. Stay in the chapter directory; topic paths below are relative to it. The setup sets `$ctx` to the reviewed context and `$ns` to `k8s-learning-governance`.

~~~powershell
kubectl --context $ctx -n $ns apply -f topics/97-ingress-502/faults/
kubectl --context $ctx -n $ns get service q97-route -o yaml
kubectl --context $ctx -n $ns get endpointslices -l kubernetes.io/service-name=q97-route -o yaml
kubectl --context $ctx -n $ns exec deployment/governance-catalog -- wget -T 3 -qO- http://q97-route
~~~

Expect failure despite ready addresses. Repair:

~~~powershell
kubectl --context $ctx -n $ns apply -f topics/97-ingress-502/fixed/
kubectl --context $ctx -n $ns exec deployment/governance-catalog -- wget -T 3 -qO- http://q97-route
~~~

For a supplied ingress, inspect its backend and controller logs with its actual namespace/name. Test its configured host through the actual listener, recording HTTP status and response body.

## Verification and troubleshooting

The bounded drill should fail on 8081 and return catalog HTML on 8080. This proves a Service backend repair, not a deployed ingress or a specific HTTP 502 reproduction. A real incident must also pass the external host/path/TLS test.

## Rollback and cleanup

~~~powershell
kubectl --context $ctx -n $ns delete service q97-route --ignore-not-found
~~~

Restore any real ingress change through its managed manifest and recheck the same request.
