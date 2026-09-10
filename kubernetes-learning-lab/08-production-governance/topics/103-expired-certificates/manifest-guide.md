# 103. Expired certificate breaks kubelet/API communication: manifest walkthrough

Inspect Node Ready and CSR spec.username, signerName, usages, and status.conditions. A CSR name or Pending state is not proof it belongs to a trusted node. Certificate public metadata can be inspected by the operator without exposing private keys. No Secret containing private keys is exported.

The [shared manifest guide](../../manifest-guide.md) explains the catalog's selectors, port, resources, and security controls. Continue with the [runbook](runbook.md).
