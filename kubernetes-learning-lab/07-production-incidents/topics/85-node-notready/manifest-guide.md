# 85. Node NotReady: diagnose without losing workloads: manifest walkthrough

Node status and the kube-node-lease Lease provide health evidence. The base Deployment shows desired replicas and actual placement; two replicas on one node do not provide node redundancy. No Node mutation or host-service change is authored.

The [shared manifest guide](../../manifest-guide.md) explains the catalog's selectors, port, resources, and security controls. Continue with the [runbook](runbook.md).
