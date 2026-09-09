# Which component handles each part of the manifest

Open [20-deployment.yaml](../../manifests/20-deployment.yaml). This file describes the application, so it does not contain installation instructions for the control plane.

## Follow the file through the cluster

| File or event | Component involved | Its job |
| --- | --- | --- |
| `kubectl apply -f ...` | API server | Authenticates, authorizes, and validates the request before accepting it |
| Accepted object | etcd, through the API server | Stores the cluster's durable resource state |
| `kind: Deployment` and `spec.template` | Deployment controller | Creates or updates the ReplicaSet for the Pod recipe |
| `replicas: 2` | ReplicaSet controller | Creates the required Pod objects |
| New Pod without a node | Scheduler | Selects a suitable node, taking requests and placement rules into account |
| Pod assigned to a node | Kubelet and runtime | Prepare volumes, pull the image if needed, and start the containers |
| `readinessProbe` | Kubelet | Checks whether the container is ready |
| `Service.spec.selector` | EndpointSlice controller and cluster networking | Track matching Pod destinations and implement routing |

Controllers communicate through API objects. This is why `kubectl apply` can return before all containers are running.

## What the example deliberately leaves automatic

The file does not set `nodeName`. The scheduler chooses placement. Two replicas do not automatically mean two separate nodes; both can land on one node. Explicit spreading rules belong to a later placement topic.

The `image` field names a container image. It does not instruct etcd or the API server to serve the web page. The container on the worker serves that page.

## Observe it

[Runbook step 2](../../runbook.md#2-confirm-the-cluster-and-view-its-shape) shows nodes and the API endpoint. Step 6 shows each Pod's node. Managed clusters can hide control-plane machines while still exposing the application API.

For field-level details, continue to the [Deployment walkthrough](../04-replicasets-and-deployments/manifest-guide.md).
