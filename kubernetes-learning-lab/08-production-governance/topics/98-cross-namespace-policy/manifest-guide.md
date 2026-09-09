# 98. Cross-namespace traffic blocked by NetworkPolicy: manifest walkthrough

[Server](manifests/10-server.yaml) and [Service](manifests/20-service.yaml) use `q98-server`. [Client namespace](manifests/00-client-namespace.yaml) is `k8s-learning-cross-source`. The [two visitors](manifests/30-clients.yaml) differ by role label. [Deny](faults/10-policy.yaml) selects only that server. [Allow](fixed/10-policy.yaml) requires the source namespace's standard name label and `role: reader` in one peer, TCP 8080.

The [shared manifest guide](../../manifest-guide.md) explains the catalog's selectors, port, resources, and security controls. Continue with the [runbook](runbook.md).
