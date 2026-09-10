# 84. Pod stuck in ContainerCreating: runbook

## Prerequisites

Permission for Pod, ConfigMap, and event operations. q84-settings must be absent initially.

Use [chapter setup](../../runbook.md) first. Stay in the chapter directory; topic paths below are relative to it. The setup sets `$ctx` to the reviewed context and `$ns` to `k8s-learning-incidents`.

~~~powershell
kubectl --context $ctx -n $ns get configmap q84-settings
kubectl --context $ctx -n $ns apply -f topics/84-container-creating/faults/
kubectl --context $ctx -n $ns get pod q84-worker -o wide
kubectl --context $ctx -n $ns describe pod q84-worker
~~~

Expect NotFound first, then a node assignment and FailedMount after kubelet retries. Record the Pod UID and supply the map:

~~~powershell
$before = (kubectl --context $ctx -n $ns get pod q84-worker -o json | ConvertFrom-Json).metadata.uid
kubectl --context $ctx -n $ns apply -f topics/84-container-creating/fixed/
kubectl --context $ctx -n $ns wait --for=condition=Ready pod/q84-worker --timeout=120s
$after = (kubectl --context $ctx -n $ns get pod q84-worker -o json | ConvertFrom-Json).metadata.uid
$before -eq $after
kubectl --context $ctx -n $ns exec q84-worker -- cat /settings/catalog
~~~

## Verification and troubleshooting

Expect the same UID, Ready=True, and ready from the file. If a node is never assigned, diagnose scheduling first. If mounting still fails, inspect the latest event and ConfigMap namespace/name.

## Rollback and cleanup

~~~powershell
kubectl --context $ctx -n $ns delete pod q84-worker --ignore-not-found
kubectl --context $ctx -n $ns delete configmap q84-settings --ignore-not-found
~~~
