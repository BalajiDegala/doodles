# 40. Service mesh foundations

## Concise technical summary

1. A service mesh adds infrastructure for service-to-service communication.
2. Its data plane handles traffic while its control plane distributes configuration and identity material.
3. Supported features can include mutual TLS, traffic policy, and request telemetry.
4. Mesh participation and policy must be verified for the chosen implementation and traffic path.

Memory cue: Services do the work; the mesh manages their conversations.

## Plain meaning

Maya considers a managed courier service between branches. Couriers can identify each branch, protect deliveries, and record routes. That helps only if the deliveries actually use the courier system and the team can operate it.

## The Bookshop story

The current lab is a small static website. We inspect its declared containers and connections, then decide what evidence would justify adding a mesh to a future catalog-and-orders application. This topic installs nothing.

## Examples of different designs

Istio supports sidecar and ambient data-plane modes. Ambient changes where traffic handling runs, so absence of a sidecar does not by itself prove absence of mesh participation. [Istio data-plane modes](https://istio.io/latest/docs/overview/dataplane-modes/).

Linkerd's architecture uses a control plane with lightweight proxies alongside application workloads. Evaluate its current feature set and operating requirements against the traffic you need to manage. [Linkerd architecture](https://linkerd.io/2-edge/reference/architecture/).

Mutual TLS authenticates both sides of a protected connection; authorization still needs policy. Retries can multiply traffic or duplicate non-idempotent operations, so budgets and application behaviour matter. Do not infer encryption from a Pod label, a proxy name, or an HTTP success alone.

Adoption needs a concrete requirement, resource measurements, certificate operations, upgrade ownership, and a recovery plan. A mesh does not replace Kubernetes RBAC, all NetworkPolicies, application authentication, or application correctness. Avoid fixed overhead numbers without measuring your chosen version and workload.

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
