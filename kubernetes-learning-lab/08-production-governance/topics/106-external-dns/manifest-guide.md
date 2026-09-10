# 106. Pod resolves internal DNS but not external DNS: manifest walkthrough

[Reader](manifests/10-reader.yaml) uses the cluster's default Pod DNS setup. The runbook inspects configuration, queries names, and identifies the forwarding boundary. It does not patch CoreDNS or node resolv.conf.

The [shared manifest guide](../../manifest-guide.md) explains the catalog's selectors, port, resources, and security controls. Continue with the [runbook](runbook.md).
