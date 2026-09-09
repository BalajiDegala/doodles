# 41. Kubernetes monitoring

## Concise technical summary

1. Metrics Server supplies recent resource usage through the resource metrics API.
2. Prometheus collects time-series measurements from configured targets.
3. Grafana queries data sources to display dashboards and support alerting workflows.
4. Useful monitoring connects infrastructure signals with application outcomes.

Memory cue: Measure, retain, display, respond.

## Plain meaning

Maya checks today’s counter occupancy, keeps a history of busy hours, and draws a chart. A current reading, a notebook of readings, and a chart are different tools.

## The Bookshop story

The catalog exposes a small /metrics file. We fetch its teaching gauge, compare resource requests with optional live usage, and explain where an existing monitoring stack would collect it.

## Details and production use

A scrape target must be reachable and configured; adding an HTTP endpoint does not make Prometheus discover it. Metrics Server is not a long-term application metrics store. A dashboard can show missing or stale data while the application still runs, so inspect freshness and collection errors.

For a real shop, connect request rate, error rate, and latency to stock/search/checkout outcomes. Bound label cardinality: customer IDs and request IDs usually do not belong on every metric. The fixed catalog gauge in this example does not measure traffic or capacity.

Further reading: [Kubernetes observability](https://kubernetes.io/docs/concepts/cluster-administration/observability/), [Prometheus concepts](https://prometheus.io/docs/concepts/data_model/).

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
