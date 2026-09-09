# 82. Pod stuck in CrashLoopBackOff: runbook

## Prerequisites

Healthy base; permission to create the disposable Deployment and read status/logs.

Use [chapter setup](../../runbook.md) first. Stay in the chapter directory; topic paths below are relative to it. The setup sets `$ctx` to the reviewed context and `$ns` to `k8s-learning-incidents`.

## Capture the last attempt

~~~powershell
kubectl --context $ctx -n $ns apply -f topics/82-crashloopbackoff/faults/
kubectl --context $ctx -n $ns get pods -l app=q82-worker -w
~~~

Stop with Ctrl+C after restarts appear, then select the failing Pod:

~~~powershell
$p = (kubectl --context $ctx -n $ns get pods -l app=q82-worker -o json | ConvertFrom-Json).items[0].metadata.name
kubectl --context $ctx -n $ns describe pod $p
kubectl --context $ctx -n $ns logs $p -c web --previous --tail=30
~~~

Previous logs require a restart. If unavailable, read the current log and wait for one completed attempt.

## Restore the worker

~~~powershell
kubectl --context $ctx -n $ns apply -f topics/82-crashloopbackoff/fixed/
kubectl --context $ctx -n $ns rollout status deployment/q82-worker --timeout=120s
kubectl --context $ctx -n $ns get pods -l app=q82-worker
kubectl --context $ctx -n $ns exec deployment/q82-worker -- wget -T 3 -qO- http://localhost:8080
~~~

## Verification and troubleshooting

The fault emits the training message and exit 1. After repair, the replacement serves HTML and its restart count stays stable across repeated observations.

## Rollback and cleanup

Save relevant logs first, then:

~~~powershell
kubectl --context $ctx -n $ns delete deployment q82-worker --ignore-not-found
~~~
