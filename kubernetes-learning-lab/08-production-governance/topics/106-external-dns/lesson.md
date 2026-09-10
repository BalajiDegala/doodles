# 106. Pod resolves internal DNS but not external DNS

Source: supplied Kubernetes PDF, question 106, pages 52. Practice: **Bounded DNS observation**.

## Concise technical summary

1. Internal and external names can take different CoreDNS paths.
2. A working cluster name does not prove upstream forwarding or internet egress works.
3. Inspect the Pod resolver, CoreDNS forwarders, policies, and node resolver in order.
4. Compare an absolute external query with an internal control query.

Memory cue: Cluster answer works; where does forwarding stop?

## Plain meaning

The branch directory knows its own counters, but outside suppliers require another directory. A broken forwarding link affects only outside names.

## The Bookshop story

A disposable reader compares the catalog's absolute name with example.com. External access is a declared dependency; an offline cluster should record it as unavailable.

## Diagnosis and production details

Read the Pod's resolver and cluster DNS configuration before testing. Cluster DNS may resolve internal Service records locally while forwarding external queries. Verify source egress to DNS over UDP/TCP 53, DNS-server access to its upstreams, and node-level resolver/firewall health. DNS-over-TLS/HTTPS requires its configured transports instead.

An external query returning NXDOMAIN differs from a timeout; neither necessarily means CoreDNS is overloaded. Do not replace corporate upstreams with a public resolver without understanding network/privacy requirements. A host-network or custom-dnsPolicy Pod can follow a different path than the ordinary catalog.

Read the [manifest walkthrough](manifest-guide.md) and [runbook](runbook.md).

Further reading: [Customize DNS service](https://kubernetes.io/docs/tasks/administer-cluster/dns-custom-nameservers/), [Debug DNS](https://kubernetes.io/docs/tasks/administer-cluster/dns-debugging-resolution/).
