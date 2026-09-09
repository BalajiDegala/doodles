# etcd and cluster state: runbook

Run from the chapter directory, as shown in [shared setup](../../runbook.md).

## Prerequisites

Read permission for the chapter objects. Platform/datastore details require administrator-provided evidence.

~~~powershell
kubectl -n k8s-learning-platform get configmap platform-catalog-page -o yaml
kubectl -n k8s-learning-platform get deployment platform-catalog -o yaml
kubectl get --raw=/readyz --request-timeout=5s
~~~

Expect stored configuration and an API readiness result where authorized. API readiness is not a full datastore health or backup test.

## Recovery inventory

List separately: authored manifests, live API objects, volume contents, external database records, certificates/keys, and recovery credentials. For each, name the owner and backup/restore method. Ask which datastore the actual distribution uses and where its restore procedure is tested.

## Troubleshooting and cleanup

An API failure can have several causes; do not diagnose quorum loss from one timeout. No datastore keys or cluster configuration are changed, so there is no cleanup.
