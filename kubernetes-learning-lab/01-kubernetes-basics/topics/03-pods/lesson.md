# Pods

## Concise technical summary

1. A Pod is the smallest unit Kubernetes schedules onto a node.
2. It contains one or more containers that need to run together.
3. Those containers share a Pod IP and can share mounted volumes.
4. In our project, a Deployment replaces failed Pods and a Service gives them a stable address.

Memory cue: One unit, shared network, replaceable life.

Read the [manifest walkthrough](manifest-guide.md) to connect these points to the YAML.

## Plain meaning

A Pod is the smallest unit Kubernetes schedules onto a node. A Pod contains one or more containers that must live closely together.

For a simple application, one Pod usually holds one main container. The shared project follows that common pattern: each `hello-web` Pod contains one small web-server container.

## Why Kubernetes uses a Pod wrapper

Kubernetes needs an object around the container so it can attach scheduling and operating information, including:

- Which node should run it.
- Labels used to find it.
- Configuration and storage volumes.
- Health checks.
- Resource requests and limits.
- A shared network identity for containers in the Pod.

Containers inside the same Pod share the Pod's IP address and can communicate through `localhost`. They can also share declared volumes. This is useful when a helper container must stay beside the main application container.

## Replaceable, not permanent

A Pod receives a generated name and an IP address. If it is replaced, the new Pod normally has a new name and IP.

For that reason:

- Use a Deployment to manage ordinary application Pods.
- Use a Service as their stable network destination.
- Do not build a system that depends on one generated Pod name or IP.

## Connection to the shared project

The [Deployment manifest](../../manifests/20-deployment.yaml) contains a `template`. That template is the recipe used to create each Pod. It defines the image, web-server command, port, health checks, resources, settings, and ConfigMap volume.

Use [runbook step 6](../../runbook.md#6-inspect-pods-and-their-configuration) to inspect the two Pods and the configuration visible inside one container.

Further reading: [Pods](https://kubernetes.io/docs/concepts/workloads/pods/).
