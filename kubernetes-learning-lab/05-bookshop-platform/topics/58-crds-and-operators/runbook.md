# 58. CRDs and Operators: runbook

Run from the chapter directory, as shown in [shared setup](../../runbook.md).

## Prerequisites

Discovery access. Optional inspection requires an existing cert-manager installation and permission to read its CRD.

~~~powershell
kubectl api-resources --api-group=cert-manager.io
$certificateCrd = kubectl get crd certificates.cert-manager.io -o json | ConvertFrom-Json
$certificateCrd.spec.scope
$certificateCrd.spec.versions | Select-Object name,served,storage
~~~

If installed, expect the custom type and Namespaced scope. Check each version's served and storage flags; a version name alone does not prove it is served. If absent, use the authored Certificate example and mark live custom-API inspection skipped.

If you completed question 50 and kept its disposable objects, inspect `kubectl -n k8s-learning-platform get certificate catalog-lab -o yaml`. Identify desired fields, controller conditions, and the generated Secret. Use that question’s runbook if you want to repeat issuance.

## Troubleshooting and cleanup

Accepted-but-unready instances need controller/condition checks, not another CRD installation. Remove any question-50 resources using its cleanup. Never delete a shared CRD to clean up one instance.
