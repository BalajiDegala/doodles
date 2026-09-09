# Service mesh foundations: reading the existing manifests

This concept-and-observation topic adds no YAML. Start with the shared [Deployment](../../manifests/20-deployment.yaml), [Service](../../manifests/30-service.yaml), and [namespace](../../manifests/00-namespace.yaml).

The authored Deployment has one application container, `web`, and no mesh-specific annotations. The Service selects `app: bookshop-ops` and routes TCP port 80 to `http`, the container's port 8080. The namespace declares the chapter identity but no mesh enrollment label.

Those files describe the author's intent. The cluster may mutate a Pod at admission, or route its traffic through infrastructure outside the Pod. Compare authored fields with live Pod containers, init containers, annotations, and namespace labels before drawing conclusions.

In a mesh-enabled application, implementation-specific custom resources may express identity or traffic policy. Their API versions and semantics belong to the installed mesh, so a generic unverified manifest would not demonstrate a working feature here.

Trace one hypothetical request from an orders service to the catalog. Identify the source identity, destination Service, enforcement points, and telemetry needed to prove the intended policy. The [previous network policy exercise](../30-network-policies/manifest-guide.md) controls a different layer and remains useful background.

Continue with the [runbook](runbook.md).
