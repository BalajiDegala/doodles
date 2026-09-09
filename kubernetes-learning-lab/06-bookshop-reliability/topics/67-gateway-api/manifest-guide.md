# Gateway API and Ingress: reading the manifests

File: [HTTPRoute](optional/10-route.yaml). `gateway.networking.k8s.io/v1` requires a served Gateway API. `parentRefs` names `bookshop-gateway` in the reliability namespace. The existing Gateway must allow this attachment and have a compatible HTTP listener.

`hostnames: [bookshop.example.com]` selects the request host. `PathPrefix /` matches paths, and `backendRefs` directs them to `reliable-catalog` Service port 80, not the Pod port 8080. No GatewayClass, load balancer, public DNS record, or Gateway is created here. If the provided parent name differs, update that reference before application.

Shared fields are explained in the [chapter manifest guide](../../manifest-guide.md). Continue with the [runbook](runbook.md).
