# Container restart policies: runbook

## Prerequisites

Use the chapter namespace; no add-on is required. These are standalone Pods, separate from the website.

## Observe the policies

~~~powershell
kubectl apply -f topics/23-restart-policies/manifests/
kubectl -n k8s-learning-operations get pods -l exercise=restart -w
~~~

Allow a minute or two for retries, then Ctrl+C. Expect `retry-never` to remain failed with zero restarts, `retry-onfailure` to succeed after one restart, and `retry-always` to continue restarting.

~~~powershell
kubectl -n k8s-learning-operations logs retry-onfailure
kubectl -n k8s-learning-operations logs retry-onfailure --previous
kubectl -n k8s-learning-operations get pod retry-onfailure -o yaml
~~~

Current logs show successful completion; previous logs show the first failure. Previous logs may not be retained forever. Check `restartCount` and the terminated exit code.

## Restore and cleanup

~~~powershell
kubectl delete -f topics/23-restart-policies/manifests/ --ignore-not-found
~~~

A changed restart policy or many other Pod fields cannot be edited in place. Delete only these disposable experiment Pods and recreate them for another run. If no container started, diagnose image or admission errors before discussing retries.
