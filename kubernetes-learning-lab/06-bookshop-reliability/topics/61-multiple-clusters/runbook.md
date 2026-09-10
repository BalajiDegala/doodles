# 61. Multi-cluster strategies: runbook

Run from the chapter directory, as shown in [shared setup](../../runbook.md).

## Prerequisites

Local kubeconfig context names can be inspected without contacting every cluster. Do not dump raw kubeconfig credentials.

~~~powershell
kubectl config get-contexts -o name
kubectl config current-context
kubectl -n k8s-learning-reliability get deployment reliable-catalog
~~~

## Design exercise

Create a two-row branch inventory with context, region, namespace, data owner, routing owner, and recovery target. Mark whether identity, registry, DNS, and backup storage are shared dependencies. Define how a customer reaches the surviving branch and what write conflicts must be prevented.

If a second approved test cluster is already supplied, use explicit `--context` on read commands instead of changing the global current context. A list of contexts is not a failover test.

## Troubleshooting and cleanup

Distinguish unreachable API, missing credentials, and missing resources in the selected cluster. No remote cluster or routing configuration is changed; no cleanup is needed.
