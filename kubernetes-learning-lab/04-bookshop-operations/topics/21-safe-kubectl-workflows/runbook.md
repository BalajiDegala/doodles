# Safe kubectl workflows: runbook

## Prerequisites

Complete [base setup](../../runbook.md#2-create-the-shared-target). Stay in the chapter directory. No extra add-on is needed.

## Preview, then optionally publish

~~~powershell
kubectl explain configmap.data
kubectl apply --dry-run=client -f topics/21-safe-kubectl-workflows/manifests/10-page-preview.yaml -o yaml
kubectl apply --dry-run=server -f topics/21-safe-kubectl-workflows/manifests/10-page-preview.yaml
kubectl diff -f topics/21-safe-kubectl-workflows/manifests/10-page-preview.yaml
~~~

Expect only the page content change (and possibly apply-management metadata), not a new namespace or Deployment. On Windows, if diff reports a missing external diff program, install an approved diff utility or compare the live ConfigMap and the preview manually; do not treat that error as an empty diff.

To publish the reviewed practice change:

~~~powershell
kubectl apply -f topics/21-safe-kubectl-workflows/manifests/10-page-preview.yaml
kubectl -n k8s-learning-operations get configmap bookshop-page -o yaml
~~~

Expect the extended opening message in `data.index.html`. Refresh the forwarded page after the mounted file updates; this is not instantaneous.

## Restore and troubleshoot

~~~powershell
kubectl apply -f manifests/10-page.yaml
~~~

`Forbidden` means missing permission; schema errors indicate wrong fields or types. Neither should be solved by blindly disabling validation. Restore the base message and leave the shared app running.
