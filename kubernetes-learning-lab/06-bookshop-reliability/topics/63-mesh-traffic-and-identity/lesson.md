# Mesh identity, traffic, and observability

## Concise technical summary

1. A mesh can authenticate and protect supported traffic between enrolled workloads.
2. Traffic policy can influence routing, retries, and timeouts.
3. Telemetry describes observed traffic but has coverage and sampling limits.
4. Encryption, authorization, and application identity must each be verified.

Memory cue: Identify the peer, protect the path, measure the result.

## Plain meaning

Maya’s courier checks branch badges, protects packages, and records deliveries. A courier receipt still does not prove the package contents were correct or every road used the courier.

## The Bookshop story

The learner traces a hypothetical orders-to-catalog request and identifies what a real mesh would need to prove. The simple base website remains unmeshed by its authored configuration.

## Details and production use

Istio’s sidecar and ambient modes place traffic handling differently. Linkerd uses its own proxy/control-plane design and supported policy APIs. Version and configuration determine coverage; do not assume every Pod connection is encrypted or every protocol produces full request metrics.

Weighted routing produces aggregate proportions, not an exact guarantee for every short sample. Retries can amplify failures and duplicate non-idempotent writes. Distributed tracing also depends on propagation and instrumentation choices; a proxy does not automatically reveal every internal application span.

Further reading: [Istio security](https://istio.io/latest/docs/concepts/security/), [Linkerd architecture](https://linkerd.io/2-edge/reference/architecture/).

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
