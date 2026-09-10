# 91. DNS resolution fails intermittently inside Pods: runbook

## Prerequisites

Healthy catalog, reader Pod/exec permission, and known cluster DNS domain. If external monitoring is unavailable, record only the sample results.

Use [chapter setup](../../runbook.md) first. Stay in the chapter directory; topic paths below are relative to it. The setup sets `$ctx` to the reviewed context and `$ns` to `k8s-learning-incidents`.

~~~powershell
kubectl --context $ctx -n $ns apply -f topics/91-intermittent-dns/manifests/
kubectl --context $ctx -n $ns wait --for=condition=Ready pod/q91-reader --timeout=120s
kubectl --context $ctx -n $ns exec q91-reader -- cat /etc/resolv.conf
$domain = 'cluster.local'
$fqdn = "incident-catalog.$ns.svc.$domain."
kubectl --context $ctx -n $ns exec q91-reader -- nslookup incident-catalog
1..5 | ForEach-Object {
 Get-Date -Format o
 kubectl --context $ctx -n $ns exec q91-reader -- nslookup $fqdn
}
~~~

Set domain from the observed search list before using the absolute query. For cluster DNS inspection, if permitted:

~~~powershell
kubectl --context $ctx -n kube-system get pods -l k8s-app=kube-dns -o wide
kubectl --context $ctx -n kube-system get service kube-dns
~~~

## Verification and troubleshooting

Expect the absolute query to return the catalog Service address. Preserve the full lookup output: BusyBox may show search-name failures beside a successful answer. Five successful queries prove only this sample, not absence of intermittent failures under load.

## Rollback and cleanup

~~~powershell
kubectl --context $ctx -n $ns delete pod q91-reader --ignore-not-found
~~~

Any future resolver/cache change needs platform-specific rollout and rollback.
