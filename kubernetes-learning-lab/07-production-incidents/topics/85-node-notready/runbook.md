# 85. Node NotReady: diagnose without losing workloads: runbook

## Prerequisites

Node/Pod read access and optional Lease read permission. Node-side checks require the platform owner and distribution-specific access.

Use [chapter setup](../../runbook.md) first. Stay in the chapter directory; topic paths below are relative to it. The setup sets `$ctx` to the reviewed context and `$ns` to `k8s-learning-incidents`.

## Inspect an observed node

~~~powershell
kubectl --context $ctx get nodes
$node = 'PASTE_NODE_NAME'
kubectl --context $ctx describe node $node
kubectl --context $ctx -n kube-node-lease get lease $node -o yaml
kubectl --context $ctx get pods -A --field-selector "spec.nodeName=$node" -o wide
kubectl --context $ctx -n $ns get pods -l app=incident-catalog -o wide
~~~

Replace the node name before inspection. Record condition timestamps, Lease renewTime, taints, affected workers, and alternative capacity.

## Decide the recovery path

For a lost heartbeat, determine whether the node still runs workloads. For pressure, identify the consuming filesystem/process. For certificate/runtime failure, follow the node owner's repair procedure. State whether drain can preserve availability and which local data would be lost.

## Verification and troubleshooting

On a healthy cluster this records a baseline, not an outage reproduction. A real repair needs fresh heartbeats, Ready=True, resolved pressure, working catalog traffic, and a reviewed decision to restore schedulability.

## Rollback and cleanup

All commands are read-only. In an actual maintenance window, the operator who cordoned/drained the node owns uncordon and recovery verification.
