# Cluster upgrade planning: runbook

Run from the chapter directory, as shown in [shared setup](../../runbook.md).

## Prerequisites

Read permission for version and node information. Choose a proposed source/target version pair using the provider’s supported path.

~~~powershell
kubectl version -o yaml
kubectl get nodes -o custom-columns=NAME:.metadata.name,KUBELET:.status.nodeInfo.kubeletVersion,RUNTIME:.status.nodeInfo.containerRuntimeVersion
kubectl -n k8s-learning-reliability get deploy,pods,svc,pdb
~~~

## Prepare the reviewable plan

Record component compatibility, deprecated APIs, backup/restore evidence, upgrade order, workload checks, stop conditions, and recovery owner. Include capacity and disruption-budget checks before a planned node maintenance step. Determine which operations are provider-managed and which are yours.

## Expected result and cleanup

A complete plan distinguishes a validated compatibility rule from an assumption and names the staging evidence still needed. No upgrades are performed here. A failed version read is a visibility/connectivity problem; no cleanup is required.
