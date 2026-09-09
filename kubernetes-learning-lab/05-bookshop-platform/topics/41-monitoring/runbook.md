# Kubernetes monitoring: runbook

Run from the chapter directory, as shown in [shared setup](../../runbook.md).

## Prerequisites

Start the base. Resource usage checks need a working metrics API; historical queries need an already configured monitoring system.

~~~powershell
kubectl -n k8s-learning-platform exec deployment/platform-catalog -- wget -T 3 -qO- http://platform-catalog/metrics
kubectl -n k8s-learning-platform get deployment platform-catalog -o yaml
kubectl top pods -n k8s-learning-platform
~~~

Expect the gauge value 60 from HTTP. If top reports unavailable metrics, record that dependency as skipped; the HTTP check can still pass. Compare requests with usage only when real values are returned.

## Optional collection proof

In the existing Prometheus UI, inspect the configured target and query `bookshop_catalog_titles`. Check its job/instance labels and sample time. A successful manual fetch does not prove scraping or retention. Use Grafana only after verifying its data source returns that series.

## Troubleshooting and cleanup

An HTTP failure needs Service/endpoints/routing checks. A missing series needs target discovery, permissions, scrape logs, and time-range checks. No monitoring add-on is installed or edited here, so there is no topic resource to remove.
