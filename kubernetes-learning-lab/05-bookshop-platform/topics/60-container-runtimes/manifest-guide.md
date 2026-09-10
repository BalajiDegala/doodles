# 60. CRI, containerd, and CRI-O: reading the manifests

Read the [base Deployment](../../manifests/20-deployment.yaml). `image: busybox:1.36` names content to resolve; it does not select containerd, CRI-O, or Docker Engine. The node’s configured runtime starts the Pod sandbox and containers through the platform’s CRI path.

Live node `status.nodeInfo.containerRuntimeVersion` reports runtime identity/version. Container `imageID` records resolved content, while `containerID` identifies a running runtime object. None of those is the Pod UID. This chapter installs no runtime and changes no node service.

Shared fields are explained in the [chapter manifest guide](../../manifest-guide.md). Continue with the [runbook](runbook.md).
