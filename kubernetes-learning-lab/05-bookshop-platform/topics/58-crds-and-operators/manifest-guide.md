# CRDs and Operators: reading the manifests

Optional concrete references are the [Certificate](../50-certificates-and-tls/optional/20-certificate.yaml) and its [walkthrough](../50-certificates-and-tls/manifest-guide.md).

`apiVersion: cert-manager.io/v1` and `kind: Certificate` name a custom API. Its `spec` states the request. Controller-maintained `status.conditions` describes progress, while the target Secret is a separate resource. The CRD’s scope is Namespaced, but the CRD definition itself is cluster-scoped.

No sample fake Operator is created. Reading an existing CRD and comparing an instance’s spec/status demonstrates the separation without claiming that schema installation automates a business process.

Shared fields are explained in the [chapter manifest guide](../../manifest-guide.md). Continue with the [runbook](runbook.md).
