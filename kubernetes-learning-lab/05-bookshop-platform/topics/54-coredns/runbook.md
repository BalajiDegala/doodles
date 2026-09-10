# 54. CoreDNS customization: runbook

Run from the chapter directory, as shown in [shared setup](../../runbook.md).

## Prerequisites

Base Pod access for DNS checks. Reading the system CoreDNS ConfigMap requires extra permission and the expected ConfigMap name for the distribution.

Replace `cluster.local` below if the resolver configuration shows a different cluster domain. The final dot marks an absolute DNS name.

~~~powershell
kubectl -n k8s-learning-platform exec deployment/platform-catalog -- cat /etc/resolv.conf
kubectl -n k8s-learning-platform exec deployment/platform-catalog -- nslookup platform-catalog.k8s-learning-platform.svc.cluster.local.
kubectl -n kube-system get configmap coredns -o yaml
~~~

Expect the catalog name to resolve through the Pod’s configured resolver. If the ConfigMap is absent or forbidden, obtain the provider’s DNS configuration evidence instead. Do not treat its absence as proof that DNS is broken.

## Design proof and cleanup

Annotate the reference with which block handles a local host entry, an unknown name, and an upstream timeout. Propose a real corporate-zone forwarding change with an owner, test names, and rollback plan; do not apply it. No DNS configuration changes occur, so no cleanup is needed.
