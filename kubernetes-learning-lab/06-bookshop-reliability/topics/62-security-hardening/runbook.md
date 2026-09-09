# Security hardening and kube-bench: runbook

Run from the chapter directory, as shown in [shared setup](../../runbook.md).

## Prerequisites

Read permission for this namespace. A benchmark report must come from an approved scan appropriate to the platform.

~~~powershell
kubectl -n k8s-learning-reliability get deployment reliable-catalog -o yaml
kubectl -n k8s-learning-reliability get serviceaccounts,roles,rolebindings,networkpolicies
kubectl -n k8s-learning-reliability get pods -l app=reliable-catalog -o yaml
~~~

## Review result

Record each control, its evidence, and any gap. Separate authored settings from injected/live settings. For a provided kube-bench report, identify benchmark version and distinguish pass, fail, manual, and inaccessible checks. Map one actionable finding to a specific owner and verification step.

## Troubleshooting and cleanup

A denied read is a visibility limit, not automatic evidence of insecure configuration. No scanner is installed and no permissions are broadened, so there is nothing to remove.
