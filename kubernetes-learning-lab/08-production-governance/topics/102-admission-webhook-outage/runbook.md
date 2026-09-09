# 102. Admission webhook blocks deployments cluster-wide: runbook

## Prerequisites

Read access to admission registration and the named backend namespace. If access is denied, record the evidence and involve its owner. Do not change control-plane policy for this lesson.

Use [chapter setup](../../runbook.md) first. Stay in the chapter directory; topic paths below are relative to it. The setup sets `$ctx` to the reviewed context and `$ns` to `k8s-learning-governance`.

~~~powershell
kubectl --context $ctx get validatingwebhookconfigurations,mutatingwebhookconfigurations
kubectl --context $ctx -n $ns apply --dry-run=server -f manifests/20-deployment.yaml
~~~

For the webhook named in an actual error, inspect its real type/name:

~~~powershell
$webhook = 'PASTE_VALIDATING_CONFIGURATION'
kubectl --context $ctx get validatingwebhookconfiguration $webhook -o yaml
$backendNs = 'PASTE_BACKEND_NAMESPACE'
$service = 'PASTE_BACKEND_SERVICE'
kubectl --context $ctx -n $backendNs get service $service -o yaml
kubectl --context $ctx -n $backendNs get endpointslices -l "kubernetes.io/service-name=$service" -o yaml
~~~

For a mutating configuration, use the matching resource type. Correlate backend logs, TLS validity, and network reachability with the request time.

## Verification and troubleshooting

A real recovery requires the intended valid request to pass, an invalid request to remain rejected, and webhook availability/latency to stabilize. A successful unrelated dry-run does not prove the failing rule was exercised.

## Rollback and cleanup

Inspection and dry-run leave no workload changes. Any emergency exception must have a named owner, narrow scope, expiry, and explicit restoration check; no automatic fail-open command is included.
