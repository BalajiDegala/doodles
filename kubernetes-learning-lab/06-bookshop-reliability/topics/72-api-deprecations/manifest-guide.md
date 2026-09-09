# API deprecations: reading the manifests

The base uses `apps/v1` Deployment and core `v1` Namespace, ConfigMap, and Service. Optional files introduce controller-defined APIs such as `gateway.networking.k8s.io/v1` and `keda.sh/v1alpha1`. A custom API’s version label does not follow the same lifecycle as every core API.

Inspect the [Deployment](../../manifests/20-deployment.yaml), [HTTPRoute](../67-gateway-api/optional/10-route.yaml), and [ScaledObject](../74-coordinated-autoscaling/optional/20-scaledobject.yaml). Schema availability and controller availability are separate dependencies. No deliberately removed API is applied to create a failure.

Shared fields are explained in the [chapter manifest guide](../../manifest-guide.md). Continue with the [runbook](runbook.md).
