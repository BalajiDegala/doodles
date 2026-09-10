# 108. Production accidentally mounts staging PV data: runbook

## Prerequisites

A permitted existing test PVC and PV reads, plus storage-owner records. If no PVC exists in this chapter, inspect the earlier storage exercise using its own namespace and declared setup.

Use [chapter setup](../../runbook.md) first. Stay in the chapter directory; topic paths below are relative to it. The setup sets `$ctx` to the reviewed context and `$ns` to `k8s-learning-governance`.

~~~powershell
kubectl --context $ctx -n $ns get pvc
$claim = 'PASTE_TEST_CLAIM'
$pvc = kubectl --context $ctx -n $ns get pvc $claim -o json | ConvertFrom-Json
$volume = $pvc.spec.volumeName
kubectl --context $ctx -n $ns describe pvc $claim
kubectl --context $ctx get pv $volume -o yaml
~~~

Do not proceed with an empty volume name or a failed read. Record claim UID, backend volume ID, environment owner, reclaim history, backup identity, and application dataset marker.

For a real mix-up, the workload owner first prevents further writes and isolates access according to its incident procedure. The storage owner then chooses a clean target and verified restore.

## Verification and troubleshooting

Recovery requires the correct dataset identity and consistency, restored application function, and an accounted-for wrong volume. Bound=True or successful mount alone cannot establish provenance.

## Rollback and cleanup

All commands are read-only. Keep the wrong volume preserved for investigation/retention until its owner approves disposition. Do not delete it as ordinary lab cleanup.
