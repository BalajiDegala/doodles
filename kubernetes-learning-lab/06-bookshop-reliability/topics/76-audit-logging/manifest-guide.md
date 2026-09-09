# 76. Kubernetes audit logging: reading the manifests

Reference: [audit policy](reference/audit-policy.yaml). `audit.k8s.io/v1` Policy is API-server configuration, not a namespaced resource for kubectl apply.

The first rule records core Secret operations at Metadata level across namespaces, so it records no bodies. The second records reliability-namespace activity at Metadata level. The final None rule omits everything else. Rule order therefore matters.

This deliberately narrow reference is not a complete organization audit policy. It neither activates a backend nor changes current cluster settings. Review actual sensitivity, coverage, volume, retention, and provider support before any future configuration change.

Shared fields are explained in the [chapter manifest guide](../../manifest-guide.md). Continue with the [runbook](runbook.md).
