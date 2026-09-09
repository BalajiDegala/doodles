# 91. DNS resolution fails intermittently inside Pods: manifest walkthrough

[Reader](manifests/10-reader.yaml) is a non-root BusyBox Pod using the default ClusterFirst DNS policy. It performs DNS queries from the same namespace as the base. No CoreDNS ConfigMap, node sysctl, or DNSCache DaemonSet is modified.

The [shared manifest guide](../../manifest-guide.md) explains the catalog's selectors, port, resources, and security controls. Continue with the [runbook](runbook.md).
