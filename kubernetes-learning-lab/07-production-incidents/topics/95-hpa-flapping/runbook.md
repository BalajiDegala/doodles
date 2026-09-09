# 95. HPA repeatedly scales up and down: runbook

## Prerequisites

Metrics-server/resource metrics, permission for HPA/Deployment, and capacity for up to three small workers. If metrics are absent, inspect and server-dry-run only.

Use [chapter setup](../../runbook.md) first. Stay in the chapter directory; topic paths below are relative to it. The setup sets `$ctx` to the reviewed context and `$ns` to `k8s-learning-incidents`.

~~~powershell
kubectl --context $ctx get --raw=/apis/metrics.k8s.io/v1beta1/nodes --request-timeout=5s
kubectl --context $ctx -n $ns apply -f topics/95-hpa-flapping/manifests/
kubectl --context $ctx -n $ns rollout status deployment/q95-worker --timeout=120s
kubectl --context $ctx -n $ns apply --dry-run=server -f topics/95-hpa-flapping/optional/
~~~

Only with functioning metrics:

~~~powershell
kubectl --context $ctx -n $ns apply -f topics/95-hpa-flapping/optional/
kubectl --context $ctx -n $ns describe hpa q95-worker
kubectl --context $ctx -n $ns get hpa q95-worker -w
~~~

Stop with Ctrl+C after collecting conditions and metrics. Relate a provided oscillation trace to the 300-second window and 60-second rate limit; no spontaneous scale-up is expected from this idle server.

## Verification and troubleshooting

AbleToScale/ScalingActive and valid metrics demonstrate a usable HPA, not elimination of production flapping. Proving tuning requires a representative demand trace and enough time to observe both scale directions.

## Rollback and cleanup

~~~powershell
kubectl --context $ctx -n $ns delete hpa q95-worker --ignore-not-found
kubectl --context $ctx -n $ns delete deployment q95-worker --ignore-not-found
~~~

For a real HPA, restore the reviewed behavior configuration if latency or capacity worsens.
