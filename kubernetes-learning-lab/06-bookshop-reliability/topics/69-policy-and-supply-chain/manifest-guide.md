# 69. Kyverno, Gatekeeper, and supply-chain policy: reading the manifests

Read the [Deployment](../../manifests/20-deployment.yaml). It includes requests/limits, non-root controls, and ownership labels, but uses a mutable image tag. That is a visible gap if the proposed policy requires digests.

No policy resource is installed. A namespaced workload rule and cluster-wide webhook/constraint infrastructure have different blast radii. Match the actual policy API/schema and scope before creating rules; a generic untested ClusterPolicy would not be a meaningful demonstration here. Existing Secret/certificate contents should not be printed while reviewing policy.

Shared fields are explained in the [chapter manifest guide](../../manifest-guide.md). Continue with the [runbook](runbook.md).
