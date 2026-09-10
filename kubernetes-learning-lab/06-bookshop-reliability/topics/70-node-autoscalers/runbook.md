# 70. Karpenter and Cluster Autoscaler: runbook

Run from the chapter directory, as shown in [shared setup](../../runbook.md).

## Prerequisites

Node read permission and platform documentation. No node autoscaler is required for this design exercise.

~~~powershell
kubectl get nodes -o wide
kubectl -n k8s-learning-reliability get pods -o wide
kubectl -n k8s-learning-reliability get deployment reliable-catalog -o yaml
kubectl api-resources --api-group=karpenter.sh
~~~

## Comparison exercise

Record the actual provider, existing node-group/pool model, limits, eligible instance types, disruption settings, and infrastructure owner. Explain how a CPU shortage, wrong node label, and unavailable storage zone would lead to different responses.

If no controller is installed, compare designs using those requirements and mark runtime provisioning untested. Do not deliberately fill the cluster to provoke scaling. No infrastructure changes occur, so no cleanup is needed.
