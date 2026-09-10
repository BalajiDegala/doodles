# 46. Headless Services

## Concise technical summary

1. A headless Service uses clusterIP: None instead of a virtual Service IP.
2. With selectors, its DNS answers expose backing endpoint addresses.
3. Clients are responsible for choosing and reconnecting to those endpoints.
4. Stable per-Pod names need the relevant hostname/subdomain or StatefulSet configuration.

Memory cue: One name, individual destinations.

## Plain meaning

Maya gives a caller the counter directory instead of connecting the call through reception. The caller now chooses a counter and handles a disconnected number.

## The Bookshop story

The same catalog Pods back a normal Service and a new headless Service. Comparing DNS answers reveals the difference without creating a database.

## Details and production use

Headless discovery can support peer membership and client-side balancing. DNS results can be cached and readiness affects published endpoints unless configuration requests otherwise. Returning several addresses does not guarantee fair traffic distribution.

Our Deployment replicas have no stable ordinal identities. A headless Service alone does not turn them into StatefulSet replicas or create application replication. The earlier stateful storage lab shows that separate pattern.

Further reading: [Headless Services](https://kubernetes.io/docs/concepts/services-networking/service/#headless-services), [Service and Pod DNS](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/).

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
