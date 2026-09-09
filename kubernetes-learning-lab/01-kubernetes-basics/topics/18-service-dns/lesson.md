# Kubernetes DNS

## Concise technical summary

1. Cluster DNS lets Pods find Services by name instead of saving IP addresses.
2. In the same namespace we use hello-web; across namespaces we use hello-web.k8s-learning-basics.
3. A normal Service name resolves to its virtual IP.
4. A headless Service exposes Pod addresses and supports stable StatefulSet Pod names.

Memory cue: Name finds Service; headless finds Pods.

Read the [manifest walkthrough](manifest-guide.md) to connect these points to the YAML.

## Plain meaning

DNS is the bookshop's contact list. Staff remember `hello-web`, not a changing Pod IP address. The contact list is updated when Kubernetes changes the resources behind that name.

## Service name forms

For Service `hello-web` in namespace `k8s-learning-basics`:

| Client location | Useful name |
| --- | --- |
| Same namespace | `hello-web` |
| Another namespace | `hello-web.k8s-learning-basics` |
| Explicit cluster name | `hello-web.k8s-learning-basics.svc.cluster.local` on clusters using the common `cluster.local` domain |

The final cluster domain is configurable, so application configuration should not assume it when the shorter namespace-qualified form is sufficient.

## Normal and headless Services

```text
hello-web DNS
   `-> one Service virtual IP -> ready web Pod endpoints

reading-list headless DNS
   `-> individual reading-list Pod addresses
```

The optional StatefulSet can receive stable names shaped like:

```text
reading-list-0.reading-list.k8s-learning-basics.svc.cluster.local
reading-list-1.reading-list.k8s-learning-basics.svc.cluster.local
```

## Production details

- A DNS name resolving proves discovery, not application health or network-policy permission.
- Pods receive a resolver configuration and search domains from the kubelet.
- Excessive short-name lookups can generate several search queries because of resolver `ndots` and search-list behaviour.
- Negative DNS responses can be cached briefly, so a newly created record may not appear instantly to every client.
- Named Service ports can also receive SRV records.
- Use Services and DNS rather than saving Pod IP addresses in configuration.

Use [runbook step 18](../../runbook.md#18-test-kubernetes-dns) for normal Service DNS. The optional StatefulSet step adds per-Pod discovery.

Further reading: [DNS for Services and Pods](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/).
