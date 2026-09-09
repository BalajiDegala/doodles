# 96. Pod evicted due to disk pressure: runbook

## Prerequisites

Pod/node reads and optional provider disk telemetry. The manifest is server-dry-run only in this runbook. Actual host disk inspection belongs to the node owner.

Use [chapter setup](../../runbook.md) first. Stay in the chapter directory; topic paths below are relative to it. The setup sets `$ctx` to the reviewed context and `$ns` to `k8s-learning-governance`.

~~~powershell
kubectl --context $ctx -n $ns get pods -o wide
kubectl --context $ctx get nodes
$node = 'PASTE_NODE_NAME'
kubectl --context $ctx describe node $node
kubectl --context $ctx -n $ns apply --dry-run=server -f topics/96-disk-pressure/manifests/
~~~

For an existing evicted Pod, set the observed name:

~~~powershell
$p = 'PASTE_EVICTED_POD'
kubectl --context $ctx -n $ns get pod $p -o json
kubectl --context $ctx -n $ns describe pod $p
~~~

Identify which filesystem is constrained, whether bytes or inodes are exhausted, which workloads contribute, and whether their data is durable. Record log rotation and image-GC ownership.

## Verification and troubleshooting

A real recovery needs sustained free space/inodes, cleared pressure, schedulable replacement Pods, and application/data checks. A new Running Pod does not recover lost emptyDir contents.

## Rollback and cleanup

No Pod is created by dry-run. If you separately applied the small preview, remove only `q96-scratch`. Restore a revised storage limit through workload configuration; do not restore deleted runtime files.
