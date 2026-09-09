# Configuration reloading: runbook

## Prerequisites

Use the running base website with no simultaneous rollout. Restore topic 21's preview first if necessary. No reloader add-on is required. Commands assume PowerShell in the chapter directory.

## Capture one Pod and its response

~~~powershell
kubectl apply -f manifests/10-page.yaml
$reloadPods = kubectl -n k8s-learning-operations get pods -l app=bookshop-ops -o json | ConvertFrom-Json
$reloadPod = $reloadPods.items | Where-Object { -not $_.metadata.deletionTimestamp -and ($_.status.conditions | Where-Object { $_.type -eq 'Ready' -and $_.status -eq 'True' }) } | Select-Object -First 1
if (-not $reloadPod) { throw 'No ready Bookshop Pod found' }
$reloadPodName = $reloadPod.metadata.name
$reloadPod.metadata.uid
$reloadPod.status.containerStatuses | Select-Object name,restartCount
kubectl -n k8s-learning-operations exec $reloadPodName -- wget -T 3 -qO- http://127.0.0.1:8080
~~~

Wait until this returns the base operations page before continuing. Fetching within one Pod avoids accidentally comparing responses from different replicas.

## Change the notice and observe

~~~powershell
kubectl apply -f topics/36-configuration-reloading/variants/10-page-evening.yaml
kubectl -n k8s-learning-operations exec $reloadPodName -- cat /www/index.html
kubectl -n k8s-learning-operations exec $reloadPodName -- wget -T 3 -qO- http://127.0.0.1:8080
~~~

Repeat the two read commands periodically for a few minutes. Expect the mounted file and then the HTTP response to show `Tiny Bookshop evening desk`. Do not restart the Pod to manufacture this result.

~~~powershell
$reloadAfter = kubectl -n k8s-learning-operations get pod $reloadPodName -o json | ConvertFrom-Json
$reloadAfter.metadata.uid -eq $reloadPod.metadata.uid
$reloadAfter.status.containerStatuses | Select-Object name,restartCount
~~~

Expect `True` and unchanged restart counts. If the Pod was replaced or restarted for another reason, repeat after it stabilizes; that run did not prove reloading without restart.

## Restore and troubleshoot

~~~powershell
kubectl apply -f manifests/10-page.yaml
kubectl -n k8s-learning-operations exec $reloadPodName -- wget -T 3 -qO- http://127.0.0.1:8080
~~~

Wait for the base response to return. If the file never changes, inspect the ConfigMap name, volume mount, and kubelet projection health. If the file changes but an application response does not, investigate how that application reads or caches configuration. Leave the base resources running.
