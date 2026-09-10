# 81. Pod stuck in Pending: runbook

## Prerequisites

Healthy base and permission for Deployments, Pod inspection, and events. Confirm the deliberately absent branch label matches no node.

Use [chapter setup](../../runbook.md) first. Stay in the chapter directory; topic paths below are relative to it. The setup sets `$ctx` to the reviewed context and `$ns` to `k8s-learning-incidents`.

## Locate the blocker

~~~powershell
kubectl --context $ctx get nodes -l learning.bookshop/branch=absent-q81
kubectl --context $ctx -n $ns apply -f topics/81-pod-pending/faults/
kubectl --context $ctx -n $ns get pods -l app=q81-worker -o wide
kubectl --context $ctx -n $ns describe pods -l app=q81-worker
~~~

The first command must find no nodes. Wait for a FailedScheduling event before diagnosing the just-created Pod.

## Repair the template

~~~powershell
kubectl --context $ctx -n $ns apply -f topics/81-pod-pending/fixed/
kubectl --context $ctx -n $ns rollout status deployment/q81-worker --timeout=120s
kubectl --context $ctx -n $ns exec deployment/q81-worker -- wget -T 3 -qO- http://localhost:8080
~~~

## Verification and troubleshooting

Before repair, nodeName is empty and events identify the selector mismatch. After repair, the Deployment is available and serves HTML. If it remains Pending, read the new event rather than assuming the original blocker remains.

## Rollback and cleanup

To repeat, reapply the fault only to this worker. Finish with:

~~~powershell
kubectl --context $ctx -n $ns delete deployment q81-worker --ignore-not-found
~~~
