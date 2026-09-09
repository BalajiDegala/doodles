# 52. External Secrets Operator

## Concise technical summary

1. External Secrets Operator maps an external source into Kubernetes Secrets.
2. A SecretStore describes a provider and its access configuration.
3. An ExternalSecret selects keys, refresh behaviour, and a target Secret.
4. Source synchronization does not automatically reload every consuming process.

Memory cue: Store connects; mapping selects; target delivers.

## Plain meaning

Maya’s approved vault keeps the source record. A clerk copies only the required item into the counter’s locked drawer, and periodically checks whether it changed.

## The Bookshop story

An optional fake provider returns a public training value. The operator creates a target Secret, demonstrating reconciliation without accessing a real vault or credential.

## Details and production use

Real providers require narrowly scoped identity and network access. Once copied, values also exist in Kubernetes Secrets and are subject to that cluster’s RBAC, encryption, audit, and backup controls. A controller outage or provider failure may leave stale values; inspect conditions and refresh times.

The fake provider proves mapping and target creation only. It does not prove cloud authentication, vault availability, secret rotation, or application reload. Never put real credentials into the fake provider’s inline data.

Further reading: [ExternalSecret API](https://external-secrets.io/latest/api/externalsecret/), [fake provider](https://external-secrets.io/latest/provider/fake/).

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
