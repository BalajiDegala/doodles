# Gateway API and Ingress

## Concise technical summary

1. Gateway API separates infrastructure, listener, and route responsibilities.
2. GatewayClass identifies an implementation, while Gateway defines listeners.
3. HTTPRoute attaches routing rules to a permitted parent and backend.
4. CRDs, a compatible controller, accepted attachment, and reachable listeners are all required.

Memory cue: Class chooses the operator; Gateway opens the door; Route directs visitors.

## Plain meaning

The building team chooses reception equipment, operations opens a doorway, and Maya publishes which corridor leads to the catalog.

## The Bookshop story

An optional HTTPRoute sends a practice host to the catalog through an administrator-provided Gateway. Creating the route object alone is not treated as a working entry point.

## Details and production use

Ingress remains a supported API with a narrower standardized model; Gateway API offers richer role separation and routing capabilities whose support must be checked per implementation. Cross-namespace references can require explicit permissions such as ReferenceGrant; do not assume every reference is accepted.

Inspect per-parent route status, reference resolution, listener compatibility, and Gateway programming. A successful port-forward to the backend bypasses the Gateway and cannot prove this routing path.

Further reading: [Gateway API HTTP routing](https://gateway-api.sigs.k8s.io/guides/user-guides/http-routing/), [Gateway API overview](https://gateway-api.sigs.k8s.io/concepts/api-overview/).

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
