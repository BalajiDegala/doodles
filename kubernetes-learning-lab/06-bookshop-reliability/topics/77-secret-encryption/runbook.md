# Secret encryption at rest: runbook

Run from the chapter directory, as shown in [shared setup](../../runbook.md).

## Prerequisites

Permission to create/read/delete this disposable Secret. Read only the known public training object, not unrelated Secrets.

~~~powershell
kubectl apply -f topics/77-secret-encryption/manifests/
$trainingSecret = kubectl -n k8s-learning-reliability get secret encryption-practice -o json | ConvertFrom-Json
[Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($trainingSecret.data.note)) -eq 'public-training-value'
~~~

Expect True. This verifies the API’s encoding round trip, not the at-rest representation.

## Platform evidence

Record the responsible owner, actual encryption configuration/provider, key-access controls, rotation/migration procedure, and restore evidence. Obtain datastore verification only through the authorized platform procedure. A readable API value or a base64 string is not proof either way.

## Cleanup

~~~powershell
kubectl delete -f topics/77-secret-encryption/manifests/ --ignore-not-found
~~~
