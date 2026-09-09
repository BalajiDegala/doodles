# EndpointSlices and Endpoints

## Concise technical summary

1. EndpointSlices group Service endpoint information into smaller objects.
2. Their addresses, ports, and conditions describe available backends.
3. Controllers maintain slices for ordinary selector-based Services.
4. Consumers should use supported discovery APIs instead of relying on legacy Endpoints behaviour.

Memory cue: A destination directory divided into manageable pages.

## Plain meaning

Maya splits a long counter directory into pages. Changing one counter updates the relevant page instead of replacing the entire directory for every reader.

## The Bookshop story

We compare the catalog’s ready Pods with the EndpointSlices generated for its Service. No thousands-of-Pods load test is needed to understand the structure.

## Details and production use

EndpointSlice reached stable discovery.k8s.io/v1 in Kubernetes 1.21. The legacy Endpoints API is deprecated from 1.33; deprecation does not mean immediate removal. At large endpoint counts it also has truncation limitations.

Consumers must account for readiness, termination, address family, multiple slices, and transient updates. A Service may have more than one slice; assuming that the first returned object is the complete backend list creates bugs. Avoid editing controller-managed slices as a way to repair selectors.

Further reading: [EndpointSlices](https://kubernetes.io/docs/concepts/services-networking/endpoint-slices/), [Endpoints deprecation](https://kubernetes.io/blog/2025/04/24/endpoints-deprecation/).

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
