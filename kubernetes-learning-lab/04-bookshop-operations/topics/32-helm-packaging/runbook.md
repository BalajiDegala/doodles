# Helm packaging: runbook

## Prerequisites and local preview

Use Helm 3 or 4 and the shared namespace. Remove topic 30's lab policy first. Namespace policy must allow the workloads and Helm release metadata, normally stored in Secrets. This example has no external chart dependencies.

~~~powershell
helm version --short
helm list -n k8s-learning-operations --all
helm lint topics/32-helm-packaging/chart --strict
helm template desk topics/32-helm-packaging/chart -n k8s-learning-operations
~~~

Use `desk` only if that release is absent or belongs to this exercise. Expect three ordinary resources plus the test-hook manifest. Local rendering does not prove cluster admission or runtime behaviour.

## Install and verify

~~~powershell
helm upgrade --install desk topics/32-helm-packaging/chart -n k8s-learning-operations --wait --timeout 2m
helm test desk -n k8s-learning-operations --logs --timeout 2m
helm history desk -n k8s-learning-operations
kubectl -n k8s-learning-operations port-forward service/desk-web 8082:80
~~~

Expect a successful test and the morning desk at `http://localhost:8082`. Stop the forward with Ctrl+C before the upgrade; a rollout can close the connection to its selected Pod.

## Upgrade, then roll back

~~~powershell
helm template desk topics/32-helm-packaging/chart -n k8s-learning-operations -f topics/32-helm-packaging/values-evening.yaml
helm upgrade desk topics/32-helm-packaging/chart -n k8s-learning-operations -f topics/32-helm-packaging/values-evening.yaml --wait --timeout 2m
helm test desk -n k8s-learning-operations --logs --timeout 2m
kubectl -n k8s-learning-operations get deployment desk-web
helm history desk -n k8s-learning-operations
~~~

Expect two ready replicas and a passing evening-page test. For a fresh exercise the morning revision is 1; if reusing a lab release, identify the intended successful revision from history before replacing `1` below.

~~~powershell
helm rollback desk 1 -n k8s-learning-operations --wait --timeout 2m
helm test desk -n k8s-learning-operations --logs --timeout 2m
kubectl -n k8s-learning-operations get deployment desk-web
~~~

Expect one ready replica and a passing morning-page test. Rollback itself creates another revision.

## Troubleshooting and cleanup

For a failed test, inspect `kubectl -n k8s-learning-operations logs desk-page-test` and `describe pod desk-page-test`. A page mismatch immediately after a configuration change can be projection delay; wait for the rollout and retry. Fetch failures can indicate DNS, endpoints, or policy issues.

~~~powershell
helm uninstall desk -n k8s-learning-operations --wait --timeout 2m
kubectl -n k8s-learning-operations delete pod desk-page-test --ignore-not-found
~~~

The explicit Pod cleanup removes the retained test hook, whether it succeeded or failed. The shared website remains available.
