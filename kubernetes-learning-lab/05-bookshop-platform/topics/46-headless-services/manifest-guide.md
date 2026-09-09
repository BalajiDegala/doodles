# 46. Headless Services: reading the manifests

File: [catalog-peers Service](manifests/10-headless.yaml).

`clusterIP: None` is the literal string requesting no virtual cluster IP. `selector.app: platform-catalog` matches the existing Deployment. Port 80 still describes the Service port, with named target `http` resolving to 8080.

A client receiving Pod addresses connects to the actual Pod listener, port 8080; DNS A/AAAA records contain addresses, not port translation. Named SRV records can convey ports for clients that use them. The existing normal Service instead remains reachable on its virtual IP at port 80.

Shared fields are explained in the [chapter manifest guide](../../manifest-guide.md). Continue with the [runbook](runbook.md).
