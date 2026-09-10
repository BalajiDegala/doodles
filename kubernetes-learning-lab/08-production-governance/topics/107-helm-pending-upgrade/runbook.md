# 107. Helm release stuck in pending-upgrade: runbook

## Prerequisites

Installed Helm and compatible kubectl, permission for the chart resources/release storage, a fresh release name, and capacity for the chart's evening replica count. Missing Helm permits file review only.

Use [chapter setup](../../runbook.md) first. Stay in the chapter directory; topic paths below are relative to it. The setup sets `$ctx` to the reviewed context and `$ns` to `k8s-learning-governance`.

~~~powershell
helm version --short
helm upgrade --help
helm --kube-context $ctx -n $ns list --all --filter '^q107-desk$'
$chart = '../04-bookshop-operations/topics/32-helm-packaging/chart'
$evening = '../04-bookshop-operations/topics/32-helm-packaging/values-evening.yaml'
helm lint $chart --strict
~~~

The release list must be empty before creating this rehearsal:

~~~powershell
helm --kube-context $ctx -n $ns install q107-desk $chart --wait --timeout 120s
helm --kube-context $ctx -n $ns upgrade q107-desk $chart -f $evening --wait --timeout 120s
helm --kube-context $ctx -n $ns history q107-desk
helm --kube-context $ctx -n $ns rollback q107-desk 1 --wait --timeout 120s
helm --kube-context $ctx -n $ns test q107-desk --logs --timeout 120s
helm --kube-context $ctx -n $ns history q107-desk
~~~

For a real pending release, replace neither the name nor revision blindly: first identify its active writer and known-good history.

## Verification and troubleshooting

The final deployed revision should be a new rollback revision using revision 1's configuration, and the chart test must pass its response check. This proves normal rollback mechanics, not recovery of corrupted release metadata.

## Rollback and cleanup

~~~powershell
helm --kube-context $ctx -n $ns uninstall q107-desk --wait --timeout 120s
kubectl --context $ctx -n $ns delete pod q107-desk-page-test --ignore-not-found
~~~

Remove retained test-hook Pods only for this release. No real pending release is modified.
