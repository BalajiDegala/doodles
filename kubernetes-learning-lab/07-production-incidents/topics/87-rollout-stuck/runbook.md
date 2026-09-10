# 87. Deployment rollout stuck: runbook

## Prerequisites

Enough space for two small exercise Pods during surge, plus the base. Deployments, ReplicaSets, events, and exec permissions.

Use [chapter setup](../../runbook.md) first. Stay in the chapter directory; topic paths below are relative to it. The setup sets `$ctx` to the reviewed context and `$ns` to `k8s-learning-incidents`.

~~~powershell
kubectl --context $ctx -n $ns apply -f topics/87-rollout-stuck/fixed/
kubectl --context $ctx -n $ns rollout status deployment/q87-worker --timeout=120s
kubectl --context $ctx -n $ns apply -f topics/87-rollout-stuck/faults/
kubectl --context $ctx -n $ns rollout status deployment/q87-worker --timeout=20s
~~~

The short rollout wait is expected to fail. Investigate without deleting Pods:

~~~powershell
kubectl --context $ctx -n $ns get deployment q87-worker -o yaml
kubectl --context $ctx -n $ns get rs,pods -l app=q87-worker
kubectl --context $ctx -n $ns describe pods -l app=q87-worker
kubectl --context $ctx -n $ns apply -f topics/87-rollout-stuck/fixed/
kubectl --context $ctx -n $ns rollout status deployment/q87-worker --timeout=120s
kubectl --context $ctx -n $ns exec deployment/q87-worker -- wget -T 3 -qO- http://localhost:8080
~~~

## Verification and troubleshooting

Observe a ready old replica and an unready new one, plus HTTP probe failure evidence. After repair, all desired replicas use the healthy template and serve HTML. If admission or capacity prevents surge, record that different blocker.

## Rollback and cleanup

Reapplying the known-good file is the explicit recovery here. For real releases, inspect rollout history and choose a reviewed revision. Finish:

~~~powershell
kubectl --context $ctx -n $ns delete deployment q87-worker --ignore-not-found
~~~
