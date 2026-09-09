# Centralized logging: runbook

Run from the chapter directory, as shown in [shared setup](../../runbook.md).

## Prerequisites

Use the shared namespace and permission for Jobs and logs. Central search additionally needs an existing collector/backend.

~~~powershell
kubectl apply -f topics/42-centralized-logging/manifests/
kubectl -n k8s-learning-platform wait --for=condition=Complete job/catalog-log-demo --timeout=120s
kubectl -n k8s-learning-platform logs job/catalog-log-demo --timestamps=true
kubectl -n k8s-learning-platform get pods -l exercise=logs-42
~~~

Expect catalog_started, supplier_delayed, and catalog_complete events with the same request ID. The warning does not make the Job fail; its process exits successfully.

## Optional central proof

Search the existing backend for this namespace and request ID. Compare message fields, Pod identity, timestamp, and any collector-added metadata. If absent, the local log proof still stands but central collection is unverified.

## Troubleshooting and cleanup

A failed startup needs Pod events before log analysis. Missing central events need collector routing and retention checks. Capture only the harmless lab evidence before cleanup.

~~~powershell
kubectl delete -f topics/42-centralized-logging/manifests/ --ignore-not-found
~~~

Delete/recreate this Job for another run; editing a completed Job does not rerun it.
