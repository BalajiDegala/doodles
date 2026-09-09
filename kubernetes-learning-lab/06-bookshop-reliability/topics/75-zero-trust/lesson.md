# 75. Zero-trust networking

## Concise technical summary

1. Zero-trust design avoids granting access merely because traffic is inside a network.
2. Identity, authentication, authorization, and encryption require explicit decisions.
3. NetworkPolicy can restrict selected traffic but is not cryptographic workload identity.
4. A useful verification checks allowed, denied, and recovery paths.

Memory cue: Location is not permission.

## Plain meaning

Maya does not let every person inside the building enter the stockroom. A door rule, a verified staff badge, and a protected conversation each solve a different problem.

## The Bookshop story

Two visitors initially fetch the catalog. A scoped ingress rule permits only the approved label; deleting the rule restores access. The lesson then identifies the identity and encryption controls this test does not provide.

## Details and production use

Labels are mutable metadata subject to API permissions. A user able to create arbitrarily labeled Pods can potentially satisfy this rule, so label filtering alone is not strong identity verification. RBAC, workload identity, application authorization, and transport protection need their own design.

NetworkPolicy allow rules add together and require an enforcing network implementation. This example restricts ingress to the catalog only and leaves DNS/client egress alone. It demonstrates segmentation on one path, not complete zero-trust architecture.

Further reading: [NetworkPolicy](https://kubernetes.io/docs/concepts/services-networking/network-policies/), [Kubernetes multi-tenancy](https://kubernetes.io/docs/concepts/security/multi-tenancy/).

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
