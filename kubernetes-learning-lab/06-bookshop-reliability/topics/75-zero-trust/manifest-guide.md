# 75. Zero-trust networking: reading the manifests

Files: [visitors](manifests/10-visitors.yaml) and [catalog policy](policy/20-catalog-ingress.yaml).

`podSelector.app: reliable-catalog` chooses the protected receivers. The same-namespace ingress peer selects `access: approved`. TCP 8080 is the destination Pod port, even though clients request the Service on port 80. `policyTypes: [Ingress]` does not isolate client egress.

`trusted-visitor` has the approved label and `unknown-visitor` does not. The names themselves confer no trust. No namespace-wide default deny, credentials, certificates, or mesh configuration is created.

Shared fields are explained in the [chapter manifest guide](../../manifest-guide.md). Continue with the [runbook](runbook.md).
