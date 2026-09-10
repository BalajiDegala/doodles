# 45. Networking and CNI plugins: runbook

Run from the chapter directory, as shown in [shared setup](../../runbook.md).

## Prerequisites

Run the base. Node/system-component inspection is optional and requires read permission.

The DNS example assumes the default cluster domain `cluster.local`; replace it if `/etc/resolv.conf` shows another domain. The trailing dot makes the name absolute and avoids misleading search-suffix failures from BusyBox nslookup.

~~~powershell
kubectl -n k8s-learning-platform get pods -l app=platform-catalog -o wide
kubectl -n k8s-learning-platform get service platform-catalog -o wide
kubectl -n k8s-learning-platform exec deployment/platform-catalog -- cat /etc/resolv.conf
kubectl -n k8s-learning-platform exec deployment/platform-catalog -- nslookup platform-catalog.k8s-learning-platform.svc.cluster.local.
kubectl -n k8s-learning-platform exec deployment/platform-catalog -- wget -T 3 -qO- http://platform-catalog
~~~

Expect Pod addresses distinct from the Service address, name resolution, and the platform page. These observations demonstrate this path, not every cross-node route.

## Provider evidence

Use the platform’s network documentation and, if permitted, inspect `kubectl -n kube-system get daemonsets`. Record the actual provider and whether Service routing and policy enforcement use the same component.

## Troubleshooting and cleanup

Separate DNS failure, empty endpoints, blocked traffic, and an absent listener. A working localhost response alone does not prove Pod-to-Pod networking. All commands are reads, so there is no topic cleanup.
