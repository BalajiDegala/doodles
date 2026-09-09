# CoreDNS customization

## Concise technical summary

1. CoreDNS answers cluster DNS queries using configured plugins.
2. Forwarding can send selected DNS zones to another resolver.
3. Custom host mappings and caching change how names are answered.
4. Editing the shared DNS configuration can affect many workloads.

Memory cue: Match the zone, choose the resolver, watch the cache.

## Plain meaning

Maya’s directory desk answers local counter names and forwards supplier questions to another directory. A wrong forwarding address can break every caller using that rule.

## The Bookshop story

We inspect the catalog’s resolver configuration and read a deliberately non-deployable Corefile example. The shared cluster DNS configuration is observed only.

## Details and production use

A domain-specific server block can forward corporate zones while other queries keep their normal path. Forwarding requires reachable upstream resolvers and a design that avoids loops. DNS caching and application caching can delay visible changes.

Provider-managed clusters may expose customization through a supported extension rather than direct ConfigMap edits. Read the platform’s instructions before proposing a change. Query logging has volume and data-exposure costs; it should be deliberately scoped and time-limited.

Further reading: [Customizing DNS](https://kubernetes.io/docs/tasks/administer-cluster/dns-custom-nameservers/), [CoreDNS forward plugin](https://coredns.io/plugins/forward/).

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
