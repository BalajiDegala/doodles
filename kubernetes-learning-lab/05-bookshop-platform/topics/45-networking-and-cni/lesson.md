# 45. Networking and CNI plugins

## Concise technical summary

1. Pods receive network identities and share a network namespace among their containers.
2. A CNI implementation configures container networking for the node runtime.
3. Service routing and network-policy enforcement depend on the installed networking stack.
4. Reachability also depends on routing, addresses, policy, and the application listener.

Memory cue: Pod address, network path, Service front door.

## Plain meaning

A counter has an address, corridors connect counters, and a reception desk directs visitors. Knowing the address does not prove the corridor is open or the counter is listening.

## The Bookshop story

Maya compares the catalog Service IP with its Pod IPs, resolves the Service name, and tests an actual request. The learner identifies the installed network provider without replacing it.

## Details and production use

The Kubernetes networking model expects Pod communication without requiring application-managed address translation, while policy can restrict permitted traffic. Overlay, routed, and cloud-integrated implementations make different tradeoffs. Some stacks replace kube-proxy’s Service handling; do not infer the CNI from the presence of one familiar Pod name.

Calico, Cilium, cloud CNIs, and Flannel-based arrangements have different capabilities and integrations. Verify the installed version/configuration for policy support, IP limits, and observability instead of treating a product name as a guarantee.

Further reading: [Kubernetes network model](https://kubernetes.io/docs/concepts/services-networking/), [network plugins](https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/network-plugins/).

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
