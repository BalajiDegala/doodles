# 104. Node drain disrupts workloads despite a PDB: runbook

## Prerequisites

Capacity for two extra small Pods; permission for PDBs and the pods/eviction subresource. No node maintenance permission is needed.

Use [chapter setup](../../runbook.md) first. Stay in the chapter directory; topic paths below are relative to it. The setup sets `$ctx` to the reviewed context and `$ns` to `k8s-learning-governance`.

~~~powershell
kubectl --context $ctx -n $ns apply -f topics/104-pdb-drain/manifests/
kubectl --context $ctx -n $ns rollout status deployment/q104-workers --timeout=120s
kubectl --context $ctx -n $ns apply -f topics/104-pdb-drain/faults/
kubectl --context $ctx -n $ns get pdb q104-budget -o yaml
~~~

Wait until status observes this generation and disruptionsAllowed=0, then prepare the dry-run request:

~~~powershell
$pod = (kubectl --context $ctx -n $ns get pods -l app=q104-workers -o json | ConvertFrom-Json).items[0]
$request = @{apiVersion='policy/v1'; kind='Eviction'; metadata=@{name=$pod.metadata.name; namespace=$ns}; deleteOptions=@{preconditions=@{uid=$pod.metadata.uid}}} | ConvertTo-Json -Depth 8
$url = "/api/v1/namespaces/$ns/pods/$($pod.metadata.name)/eviction?dryRun=All"
$request | kubectl --context $ctx create --raw $url -f -
~~~

Expect budget rejection. Update the PDB and wait for disruptionsAllowed=1:

~~~powershell
kubectl --context $ctx -n $ns apply -f topics/104-pdb-drain/fixed/
kubectl --context $ctx -n $ns get pdb q104-budget -o yaml
$request | kubectl --context $ctx create --raw $url -f -
kubectl --context $ctx -n $ns get pods -l app=q104-workers
~~~

## Verification and troubleshooting

The same proposed eviction is denied under minAvailable=2 and accepted as a dry-run under minAvailable=1. Both Pod UIDs remain because neither request persists deletion. This validates the budget behavior, not real node drain or replica spreading.

## Rollback and cleanup

~~~powershell
kubectl --context $ctx -n $ns delete pdb q104-budget --ignore-not-found
kubectl --context $ctx -n $ns delete deployment q104-workers --ignore-not-found
~~~

No cordon/uncordon is needed; no node was changed.
