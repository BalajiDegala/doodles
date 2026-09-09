# 106. Pod resolves internal DNS but not external DNS: runbook

## Prerequisites

Healthy base, DNS reader/exec permissions, and optional permitted external DNS resolution. CoreDNS configuration reads require kube-system access.

Use [chapter setup](../../runbook.md) first. Stay in the chapter directory; topic paths below are relative to it. The setup sets `$ctx` to the reviewed context and `$ns` to `k8s-learning-governance`.

~~~powershell
kubectl --context $ctx -n $ns apply -f topics/106-external-dns/manifests/
kubectl --context $ctx -n $ns wait --for=condition=Ready pod/q106-reader --timeout=120s
kubectl --context $ctx -n $ns exec q106-reader -- cat /etc/resolv.conf
$domain = 'cluster.local'
$internalName = "governance-catalog.$ns.svc.$domain."
kubectl --context $ctx -n $ns exec q106-reader -- nslookup $internalName
kubectl --context $ctx -n $ns exec q106-reader -- nslookup example.com.
kubectl --context $ctx -n kube-system get configmap coredns -o yaml
kubectl --context $ctx -n $ns get networkpolicy
~~~

Set domain from the actual resolver search list. coredns is a common ConfigMap name, not universal: use the provider's named DNS configuration if different. Compare the two queries and forwarder settings with node/upstream evidence from the platform owner.

## Verification and troubleshooting

The internal query should return the catalog Service address. An external answer demonstrates forwarding for this query; it does not prove HTTP egress works. If the cluster intentionally blocks external DNS, record the design constraint rather than weakening policy.

## Rollback and cleanup

~~~powershell
kubectl --context $ctx -n $ns delete pod q106-reader --ignore-not-found
~~~

No DNS server, policy, or host setting was changed.
