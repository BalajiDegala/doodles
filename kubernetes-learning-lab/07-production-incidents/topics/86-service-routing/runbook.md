# 86. Service not routing traffic to Pods: runbook

## Prerequisites

Healthy base and permission for Service creation/update, EndpointSlice reads, and exec into the catalog.

Use [chapter setup](../../runbook.md) first. Stay in the chapter directory; topic paths below are relative to it. The setup sets `$ctx` to the reviewed context and `$ns` to `k8s-learning-incidents`.

~~~powershell
kubectl --context $ctx -n $ns apply -f topics/86-service-routing/faults/
kubectl --context $ctx -n $ns get service q86-route -o yaml
kubectl --context $ctx -n $ns get pods -l app=q86-missing
kubectl --context $ctx -n $ns get endpointslices -l kubernetes.io/service-name=q86-route -o yaml
kubectl --context $ctx -n $ns exec deployment/incident-catalog -- wget -T 3 -qO- http://q86-route
~~~

The request should fail with a nonzero exit. Repair and retry after endpoints propagate:

~~~powershell
kubectl --context $ctx -n $ns apply -f topics/86-service-routing/fixed/
kubectl --context $ctx -n $ns get endpointslices -l kubernetes.io/service-name=q86-route -o yaml
kubectl --context $ctx -n $ns exec deployment/incident-catalog -- wget -T 3 -qO- http://q86-route
~~~

## Verification and troubleshooting

Before repair, no ready endpoint matches the selector. Afterward, ready catalog addresses appear and the request returns HTML. If addresses are present but requests still fail, compare targetPort, readiness and NetworkPolicy.

## Rollback and cleanup

~~~powershell
kubectl --context $ctx -n $ns delete service q86-route --ignore-not-found
~~~

The original catalog Service is separate and remains usable.
