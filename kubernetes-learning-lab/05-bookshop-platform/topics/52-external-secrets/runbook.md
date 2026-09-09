# External Secrets Operator: runbook

Run from the chapter directory, as shown in [shared setup](../../runbook.md).

## Prerequisites

Existing ESO installation serving v1, fake-provider support, and permission to create namespaced Store/ExternalSecret objects. If absent, read the YAML and skip application.

~~~powershell
kubectl api-resources --api-group=external-secrets.io
kubectl apply --dry-run=server -f topics/52-external-secrets/optional/
kubectl apply -f topics/52-external-secrets/optional/
kubectl -n k8s-learning-platform wait --for=condition=Ready externalsecret/bookshop-import --timeout=120s
kubectl -n k8s-learning-platform describe externalsecret bookshop-import
$imported = kubectl -n k8s-learning-platform get secret bookshop-imported -o json | ConvertFrom-Json
[Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($imported.data.practice)) -eq 'not-a-real-password'
~~~

Expect Ready and True. The comparison checks only the public dummy value and prints a boolean. Inspect status/conditions if the Store, version, or key cannot be resolved.

## Cleanup

Run only when you created these resources:

~~~powershell
kubectl delete -f topics/52-external-secrets/optional/ --ignore-not-found
kubectl -n k8s-learning-platform delete secret bookshop-imported --ignore-not-found
~~~

This does not modify an external secret manager.
