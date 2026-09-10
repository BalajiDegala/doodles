# 89. OOMKilled while application memory appears normal: runbook

## Prerequisites

Read access to Pods and Deployments. Metrics-server and historical memory monitoring are optional; missing history leaves the peak-demand conclusion unresolved.

Use [chapter setup](../../runbook.md) first. Stay in the chapter directory; topic paths below are relative to it. The setup sets `$ctx` to the reviewed context and `$ns` to `k8s-learning-incidents`.

~~~powershell
kubectl --context $ctx -n $ns get pods -l app=incident-catalog -o json
kubectl --context $ctx -n $ns get deployment incident-catalog -o yaml
kubectl --context $ctx -n $ns top pods -l app=incident-catalog --containers
~~~

## Inspect an affected container when one exists

~~~powershell
$p = 'PASTE_AFFECTED_POD'
$c = 'PASTE_CONTAINER_NAME'
kubectl --context $ctx -n $ns describe pod $p
kubectl --context $ctx -n $ns logs $p -c $c --previous --tail=100
~~~

Use observed names only. Record failure timestamp, last reason, exit code, restart count, memory limit, and historical usage. Ask the platform owner for cgroup/kernel evidence if reason is ambiguous.

## Verification and troubleshooting

Healthy catalog status proves only a baseline. A real OOM finding requires matching failure evidence and memory history; after repair, monitor a representative peak period for stable restarts and service latency. Do not label every 137 exit OOMKilled.

## Rollback and cleanup

All commands are read-only. A future sizing change belongs in the workload's managed configuration with a measured rollback trigger and capacity check.
