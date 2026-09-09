# Kubernetes monitoring: reading the manifests

Files: [page and metric](../../manifests/10-page.yaml), [Deployment](../../manifests/20-deployment.yaml), and [scrape reference](reference/prometheus-scrape.yaml).

The ConfigMap key `metrics` becomes `/www/metrics`. HELP describes the measurement; TYPE declares a gauge; `bookshop_catalog_titles 60` is one fixed sample. The Service exposes it at `/metrics` on port 80.

The reference sets `job_name: bookshop-platform`, a 30-second scrape interval, the metrics path, and one namespace-qualified Service target. It is Prometheus configuration, not Kubernetes resource YAML. A monitoring owner must integrate it with their existing setup; controllers using ServiceMonitor discovery have a different configuration path. The Deployment’s requests/limits remain scheduling/runtime declarations, not measurements.

Shared fields are explained in the [chapter manifest guide](../../manifest-guide.md). Continue with the [runbook](runbook.md).
