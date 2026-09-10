# 91. DNS resolution fails intermittently inside Pods

Source: supplied Kubernetes PDF, question 91, pages 43-44. Practice: **Bounded DNS observation**.

## Concise technical summary

1. Compare exact query names, resolver configuration, and failure times.
2. Search paths and ndots can generate extra lookups before an absolute name is tried.
3. CoreDNS, upstream resolvers, network loss, and conntrack can fail independently.
4. Repeat a small controlled sample and correlate it with DNS and node telemetry.

Memory cue: Name, resolver, path, timestamp.

## Plain meaning

A clerk searches local shelves before consulting the central directory. Extra searches can delay the result; an overloaded directory or lost phone call can also cause failure.

## The Bookshop story

The Bookshop compares its short Service name with an absolute cluster DNS name from a disposable reader. The sample is intentionally small.

## Diagnosis and production details

Read /etc/resolv.conf in the affected Pod. A trailing dot marks an absolute name and avoids search-suffix expansion for that query. The cluster domain is configurable; cluster.local is only the common lab assumption. Applications and resolver libraries may have different retry/cache behavior.

Compare NXDOMAIN, SERVFAIL, and timeouts rather than treating every nonzero lookup as the same error. Investigate CoreDNS load, latency/error metrics, node packet loss, and conntrack evidence. NodeLocal DNSCache is a platform option with compatibility and operation costs, not an automatic fix for every DNS failure.

Read the [manifest walkthrough](manifest-guide.md) and [runbook](runbook.md).

Further reading: [Debug DNS resolution](https://kubernetes.io/docs/tasks/administer-cluster/dns-debugging-resolution/), [NodeLocal DNSCache](https://kubernetes.io/docs/tasks/administer-cluster/nodelocaldns/).
