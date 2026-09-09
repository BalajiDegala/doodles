# Orchestration choices: reading the manifests

Reference files: [Deployment](../../manifests/20-deployment.yaml) and [Service](../../manifests/30-service.yaml).

The portable part is the container image and its HTTP behaviour. The Kubernetes-specific part is the surrounding contract: `kind: Deployment`, `spec.template`, label selectors, probes, and a separate Service resource.

`replicas: 2` means Kubernetes should maintain two Pod replicas. Another orchestrator can express a similar intention but will use its own resource model; it cannot directly consume this Deployment YAML.

The ConfigMap volume is also Kubernetes-specific. Moving the application requires selecting a configuration-delivery mechanism in the target platform. "Same image" does not mean "same deployment file."

No Swarm or ECS manifest is included because this topic compares choices on an existing Kubernetes project. Creating an AWS account, a second orchestrator, or cloud resources is outside this lab's scope.

Continue with the [runbook](runbook.md).
