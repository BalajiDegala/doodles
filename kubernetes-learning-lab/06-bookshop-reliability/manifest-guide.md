# Reading the chapter manifests

| File | Purpose |
| --- | --- |
| [Namespace](manifests/00-namespace.yaml) | Creates `k8s-learning-reliability` with a library ownership label |
| [Page and metrics](manifests/10-page.yaml) | Holds the visible HTML and a fixed teaching metric |
| [Deployment](manifests/20-deployment.yaml) | Maintains two `reliable-catalog` web replicas |
| [Service](manifests/30-service.yaml) | Selects those replicas through one ClusterIP |

`apiVersion` and `kind` choose the API and resource. `metadata.name` identifies the object; `metadata.namespace` isolates names and cleanup. Deployment `matchLabels.app` equals its Pod label and the Service selector. The Pod also carries `team: bookshop` and `purpose: learning` for inspection and cost attribution.

The page ConfigMap is mounted read-only at `/www`. `exec httpd -f -p 8080 -h /www` makes BusyBox's foreground HTTP server the main process. Service port 80 targets named port `http`, which resolves to container port 8080. Readiness requests `/` every five seconds. Each replica requests `25m` CPU and `32Mi` memory, limited to `100m` and `64Mi`. Rolling updates allow one extra replica and zero intentionally unavailable replicas.

UID/GID/fsGroup 1000, non-root execution, dropped capabilities, disabled privilege escalation, a read-only image filesystem, and RuntimeDefault seccomp follow the [earlier security walkthrough](../04-bookshop-operations/topics/37-security-context/manifest-guide.md). API token mounting is disabled. Topic-owned writable data uses named volumes.

`/metrics` contains a fixed Prometheus-format gauge, `bookshop_catalog_titles 60`. It demonstrates a scrapeable endpoint, not a request counter, live business metrics, or realistic load. BusyBox is a teaching tool; image tags are mutable and production selection should also consider verification and digests.

Namespace-scoped optional custom resources still need their controllers. Reference configuration such as an audit policy or Corefile is not installed with `kubectl apply`. Read each topic's exact fields and prerequisites before use.
