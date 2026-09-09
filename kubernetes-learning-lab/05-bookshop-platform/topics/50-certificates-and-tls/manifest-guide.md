# 50. cert-manager and TLS certificates: reading the manifests

Files: [self-signed Issuer](optional/10-issuer.yaml) and [Certificate](optional/20-certificate.yaml).

Both use `cert-manager.io/v1` and the platform namespace. `issuerRef` names `bookshop-selfsigned` as an Issuer. `secretName: catalog-lab-tls` names the generated Secret. The DNS SAN is `platform-catalog.k8s-learning-platform.svc`; the subject includes a training organization.

`duration: 24h` and `renewBefore: 8h` request a short practice lifetime and renewal window. ECDSA size 256 selects the key type; explicit `rotationPolicy: Always` requests a fresh private key on reissuance. Controller status supplies the actual dates and readiness. The files contain no private key.

Shared fields are explained in the [chapter manifest guide](../../manifest-guide.md). Continue with the [runbook](runbook.md).
