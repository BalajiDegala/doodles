# Priority and preemption: runbook

Run from the chapter directory, as shown in [shared setup](../../runbook.md).

## Prerequisites

Read access to the base Pods; class inspection additionally needs cluster-scoped read permission.

~~~powershell
kubectl -n k8s-learning-platform get pods -l app=platform-catalog -o custom-columns=NAME:.metadata.name,CLASS:.spec.priorityClassName,PRIORITY:.spec.priority,PREEMPTION:.spec.preemptionPolicy
kubectl get priorityclasses
~~~

Expect the live assigned values. An absent authored class and an observed default are compatible. If class access is denied, use the Pod fields and request the policy definition from the owner.

## Design proof

Write a proposed class name, priority value, global-default choice, and preemption policy for a non-urgent catalog report. Explain which workloads could preempt it and why it may still wait for capacity. Have the platform owner assess the proposal before any future installation.

## Cleanup

No class, node, or workload is changed; nothing needs removal.
