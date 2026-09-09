# 94. Cluster upgrade breaks CRDs and operators: runbook

## Prerequisites

An existing named operator/CRD and read permission. With none installed, complete the compatibility worksheet from official operator documentation and mark runtime inspection skipped.

Use [chapter setup](../../runbook.md) first. Stay in the chapter directory; topic paths below are relative to it. The setup sets `$ctx` to the reviewed context and `$ns` to `k8s-learning-incidents`.

~~~powershell
kubectl --context $ctx get crds
$crd = 'PASTE_CRD_NAME'
$operatorNs = 'PASTE_OPERATOR_NAMESPACE'
$operator = 'PASTE_OPERATOR_DEPLOYMENT'
kubectl --context $ctx get crd $crd -o yaml
kubectl --context $ctx -n $operatorNs get deployment $operator -o yaml
kubectl --context $ctx -n $operatorNs logs deployment/$operator --tail=100
kubectl --context $ctx -n $operatorNs get pods,svc,endpointslices
~~~

Use inspected names. Classify the error as removed API, schema validation, conversion, admission, or controller startup. Record source/target versions and a supported repair sequence.

## Verification and troubleshooting

A real recovery needs operator readiness, successful existing-object reads/conversion, and a permitted create/update/reconcile check for the affected CR type. Merely listing CRDs or seeing all storedVersions marked served does not prove compatibility.

## Rollback and cleanup

All listed commands are read-only. Follow the operator's documented rollback/migration procedure; schema changes and persistent external effects may prevent a simple image rollback.
