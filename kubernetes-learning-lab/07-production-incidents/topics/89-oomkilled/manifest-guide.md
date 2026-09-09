# 89. OOMKilled while application memory appears normal: manifest walkthrough

The base Deployment declares a 32Mi request and 64Mi limit per server. The request participates in scheduling; the limit constrains memory use. Inspect live containerStatuses and initContainerStatuses alongside the template. No memory-exhaustion manifest is supplied.

The [shared manifest guide](../../manifest-guide.md) explains the catalog's selectors, port, resources, and security controls. Continue with the [runbook](runbook.md).
