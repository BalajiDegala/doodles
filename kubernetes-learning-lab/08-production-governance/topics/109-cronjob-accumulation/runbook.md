# 109. CronJob accumulates thousands of completed Pods: runbook

## Prerequisites

Permission for CronJob/Job creation, logs, and deletion; healthy Job and TTL controllers. Observe logs promptly because the demo TTL is deliberately short.

Use [chapter setup](../../runbook.md) first. Stay in the chapter directory; topic paths below are relative to it. The setup sets `$ctx` to the reviewed context and `$ns` to `k8s-learning-governance`.

~~~powershell
kubectl --context $ctx -n $ns apply -f topics/109-cronjob-accumulation/manifests/
kubectl --context $ctx -n $ns create job q109-once --from=cronjob/q109-report
kubectl --context $ctx -n $ns wait --for=condition=Complete job/q109-once --timeout=120s
kubectl --context $ctx -n $ns logs job/q109-once
kubectl --context $ctx -n $ns get job q109-once -o yaml
kubectl --context $ctx -n $ns wait --for=delete job/q109-once --timeout=120s
kubectl --context $ctx -n $ns get pods -l job-name=q109-once
~~~

Confirm the Job's terminal condition and TTL before it expires. If the last Pod query briefly returns a terminating Pod, wait for cascading deletion before recording success.

## Verification and troubleshooting

Expect the harmless report message, a Complete condition, then Job and Pod disappearance. The CronJob remains suspended. This verifies TTL cleanup; it does not exercise automatic schedule history pruning.

## Rollback and cleanup

~~~powershell
kubectl --context $ctx -n $ns delete job q109-once --ignore-not-found
kubectl --context $ctx -n $ns delete cronjob q109-report --ignore-not-found
~~~

No broad field-selector cleanup or event deletion is needed.
