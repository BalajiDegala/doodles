# 99. StatefulSet Pod stuck in Terminating: runbook

## Prerequisites

An existing permitted stateful test workload, or use the earlier storage lesson's setup. Cluster-scoped PV/VolumeAttachment reads may require an operator.

Use [chapter setup](../../runbook.md) first. Stay in the chapter directory; topic paths below are relative to it. The setup sets `$ctx` to the reviewed context and `$ns` to `k8s-learning-governance`.

~~~powershell
$p = 'PASTE_STATEFUL_POD'
kubectl --context $ctx -n $ns get pod $p -o yaml
kubectl --context $ctx -n $ns describe pod $p
kubectl --context $ctx -n $ns get statefulsets,pvc
~~~

After locating the node and PVC in that Pod:

~~~powershell
$node = 'PASTE_NODE_NAME'
$claim = 'PASTE_CLAIM_NAME'
kubectl --context $ctx describe node $node
kubectl --context $ctx -n $ns get pvc $claim -o yaml
kubectl --context $ctx get volumeattachments
~~~

Classify: application shutdown still within grace, unreachable node, runtime failure, storage detach, or controller finalizer. Record who can prove the old writer is stopped.

## Verification and troubleshooting

A safe resolution establishes single-writer identity, appropriate attachment state, a ready replacement, and application data consistency. A disappeared API object is insufficient. If no stateful target exists, the exercise is a decision worksheet only.

## Rollback and cleanup

Read-only commands require no cleanup. Do not remove storage protection or use grace-period=0 as a generic recovery. Follow the storage lesson's cleanup only for its disposable data.
