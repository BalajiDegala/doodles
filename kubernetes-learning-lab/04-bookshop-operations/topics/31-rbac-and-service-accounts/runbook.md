# RBAC and ServiceAccounts: runbook

## Prerequisites

Complete chapter setup. You need permission to create these namespaced RBAC objects and grant the listed rules. The impersonation checks additionally require permission to impersonate this ServiceAccount and its normal groups. If unavailable, have the administrator run the checks; do not grant yourself broader access.

## Create and inspect

~~~powershell
kubectl apply --dry-run=server -f topics/31-rbac-and-service-accounts/manifests/
kubectl apply -f topics/31-rbac-and-service-accounts/manifests/
kubectl -n k8s-learning-operations wait --for=condition=Ready pod/stock-observer --timeout=120s
kubectl -n k8s-learning-operations get role pod-observer -o yaml
kubectl -n k8s-learning-operations get rolebinding stock-observer -o yaml
kubectl -n k8s-learning-operations get pod stock-observer -o jsonpath='{.spec.serviceAccountName}'
~~~

Expect `stock-observer`. For accurate checks include the groups a ServiceAccount normally authenticates with:

~~~powershell
$observerIdentity = @('--as=system:serviceaccount:k8s-learning-operations:stock-observer', '--as-group=system:serviceaccounts', '--as-group=system:serviceaccounts:k8s-learning-operations', '--as-group=system:authenticated')
kubectl auth can-i list pods -n k8s-learning-operations @observerIdentity
kubectl auth can-i delete pods -n k8s-learning-operations @observerIdentity
kubectl auth can-i get secrets -n k8s-learning-operations @observerIdentity
kubectl auth can-i get nodes @observerIdentity
kubectl -n k8s-learning-operations exec stock-observer -- sh -c 'test ! -e /var/run/secrets/kubernetes.io/serviceaccount/token && echo No-mounted-token'
~~~

Expect `yes`, `no`, `no`, `no`, and `No-mounted-token`. A denied authorization answer normally exits nonzero. An impersonation `Forbidden` error means the test could not run. Unexpected `yes` answers can come from other Roles or group grants; review them with the administrator.

## Cleanup

~~~powershell
kubectl delete -f topics/31-rbac-and-service-accounts/manifests/ --ignore-not-found
~~~

This removes only the observer and its authored identity/grants. It does not alter other accounts or bindings.
