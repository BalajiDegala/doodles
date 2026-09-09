# 83. Pod stuck in ImagePullBackOff: runbook

## Prerequisites

Nodes need public registry access. The fault produces a small number of failed pull attempts; stop after collecting evidence. If admission blocks the image, record that result instead.

Use [chapter setup](../../runbook.md) first. Stay in the chapter directory; topic paths below are relative to it. The setup sets `$ctx` to the reviewed context and `$ns` to `k8s-learning-incidents`.

~~~powershell
kubectl --context $ctx -n $ns apply -f topics/83-image-pull-backoff/faults/
kubectl --context $ctx -n $ns get pods -l app=q83-worker -w
~~~

Stop after ErrImagePull or ImagePullBackOff appears:

~~~powershell
kubectl --context $ctx -n $ns describe pods -l app=q83-worker
kubectl --context $ctx -n $ns apply -f topics/83-image-pull-backoff/fixed/
kubectl --context $ctx -n $ns rollout status deployment/q83-worker --timeout=180s
kubectl --context $ctx -n $ns get pods -l app=q83-worker -o json
~~~

## Verification and troubleshooting

Read waiting.message and events for the exact registry failure. After repair, check Ready and containerStatuses.imageID. ImagePullBackOff is a container reason, not a Pod phase.

## Rollback and cleanup

~~~powershell
kubectl --context $ctx -n $ns delete deployment q83-worker --ignore-not-found
~~~

No registry Secret or registry-side object was created.
