# 60. CRI, containerd, and CRI-O: runbook

Run from the chapter directory, as shown in [shared setup](../../runbook.md).

## Prerequisites

Base Pod read permission; node information requires cluster-scoped read permission.

~~~powershell
kubectl get nodes -o custom-columns=NAME:.metadata.name,KUBELET:.status.nodeInfo.kubeletVersion,RUNTIME:.status.nodeInfo.containerRuntimeVersion
kubectl -n k8s-learning-platform get pods -l app=platform-catalog -o yaml
~~~

Record the actual runtime rather than predicting it. On the validation machine the node can report a Docker runtime through a CRI integration; that is compatible with dockershim having been removed from Kubernetes.

## Explain the layers

Identify the image tag, resolved image ID, container ID, Pod UID, node name, and kubelet version. Explain why changing an image tag does not replace the node runtime.

## Troubleshooting and cleanup

An image startup problem may involve architecture, pull access, permissions, or runtime configuration. Request node-side evidence from the platform owner when needed. No runtime or workload configuration is changed, so nothing needs cleanup.
