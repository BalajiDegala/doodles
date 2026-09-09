# 71. EKS, GKE, and AKS: reading the manifests

The [Deployment](../../manifests/20-deployment.yaml) and [Service](../../manifests/30-service.yaml) use portable API shapes, but portability also depends on supported versions, Linux image execution, admission rules, and network access.

The base has no cloud load balancer, provider IAM mapping, storage class, or public ingress configuration. Those omissions make it a useful initial compatibility probe but not a complete cloud architecture. A real deployment must add platform-specific identity, storage, routing, and recovery decisions.

Shared fields are explained in the [chapter manifest guide](../../manifest-guide.md). Continue with the [runbook](runbook.md).
