# 69. Kyverno, Gatekeeper, and supply-chain policy: runbook

Run from the chapter directory, as shown in [shared setup](../../runbook.md).

## Prerequisites

Base read access. Live policy observations require an existing engine, named test policy, and permission to inspect its decisions.

~~~powershell
kubectl api-resources --api-group=kyverno.io
kubectl api-resources --api-group=templates.gatekeeper.sh
kubectl -n k8s-learning-reliability get deployment reliable-catalog -o yaml
~~~

## Policy review

Define one rule, such as required team ownership or a trusted image identity. State scope, allow/deny examples, exception owner, and the evidence needed to show enforcement. Compare the authored workload with that rule.

With an approved existing test policy, use its supplied server-dry-run inputs and inspect the exact rejection reason. Without one, record enforcement untested rather than calling the manifest compliant with an unspecified standard.

No engine or policy is installed; no cleanup is needed.
