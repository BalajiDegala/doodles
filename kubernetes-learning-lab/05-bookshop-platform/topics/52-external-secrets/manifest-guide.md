# 52. External Secrets Operator: reading the manifests

Files: [fake SecretStore](optional/10-fake-store.yaml) and [ExternalSecret](optional/20-external-secret.yaml). Both require served `external-secrets.io/v1` APIs.

The namespaced Store `bookshop-fake` maps key `/bookshop/practice`, version `v1`, to `not-a-real-password`. The ExternalSecret’s `remoteRef` matches both key and version, and `secretKey: practice` names the destination key. `refreshInterval: 1m` requests periodic checks.

`target.name: bookshop-imported` names the generated Secret; `creationPolicy: Owner` asks the operator to own it. No application Pod consumes this value, keeping source synchronization separate from application configuration delivery.

Shared fields are explained in the [chapter manifest guide](../../manifest-guide.md). Continue with the [runbook](runbook.md).
