# 54. CoreDNS customization: reading the manifests

Reference: [Corefile](reference/Corefile). It is CoreDNS server configuration, not YAML.

`.:1053` listens for the root DNS zone on port 1053. `errors` reports failures. Health/readiness endpoints use separate ports. `hosts` maps the documentation name `supplier.bookshop.test` to documentation address `192.0.2.10`. `fallthrough` allows unanswered names to continue through the chain. `forward . 192.0.2.53` shows an upstream, and `cache 30` shows a cache setting.

The documentation addresses are intentionally not a working DNS service. Do not replace the cluster’s real Corefile with this example. It omits the normal Kubernetes plugin and production configuration.

Shared fields are explained in the [chapter manifest guide](../../manifest-guide.md). Continue with the [runbook](runbook.md).
