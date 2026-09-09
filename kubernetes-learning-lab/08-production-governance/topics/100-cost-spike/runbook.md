# 100. Cluster costs doubled overnight: runbook

## Prerequisites

Read access to namespace resources; billing/cost-system access is optional and must use actual dated provider evidence. No billing setting or cloud resource is changed.

Use [chapter setup](../../runbook.md) first. Stay in the chapter directory; topic paths below are relative to it. The setup sets `$ctx` to the reviewed context and `$ns` to `k8s-learning-governance`.

~~~powershell
kubectl --context $ctx get nodes -o wide
kubectl --context $ctx -n $ns get deploy,sts,job,cronjob,pvc,svc --show-labels
kubectl --context $ctx -n $ns get pods --field-selector=status.phase=Pending
kubectl --context $ctx -n $ns top pods --containers
kubectl --context $ctx -n $ns get deployment governance-catalog -o yaml
~~~

Compare with the previous known-good inventory or bill. Build rows for node hours, storage, load balancers, egress, and logs; record changed quantity, unit rate, owner, and candidate action. Missing metrics or billing access should remain an explicit evidence gap.

## Verification and troubleshooting

A real cost repair is verified on normalized billing data and workload latency/error/capacity after the change. A lower resource request or a smaller Pod count alone does not prove reduced cost.

## Rollback and cleanup

All commands are read-only. Any later deletion requires resource-owner and data-retention checks; a cost incident does not authorize deleting retained data.
