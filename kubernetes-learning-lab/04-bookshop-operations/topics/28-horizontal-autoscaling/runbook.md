# Horizontal Pod Autoscaling: runbook

## Prerequisites

Use a non-production cluster with spare capacity. Run `kubectl top nodes` and confirm `kubectl get apiservice v1beta1.metrics.k8s.io` reports an available API. If resource metrics are missing, skip the live exercise; do not install an add-on as part of this lab.

## Start idle, then produce a bounded burst

~~~powershell
kubectl apply -f topics/28-horizontal-autoscaling/manifests/
kubectl -n k8s-learning-operations rollout status deployment/scale-demo --timeout=120s
kubectl -n k8s-learning-operations get hpa scale-demo
kubectl apply -f topics/28-horizontal-autoscaling/variants/10-load-on.yaml
kubectl -n k8s-learning-operations rollout restart deployment/scale-demo
kubectl -n k8s-learning-operations get hpa scale-demo -w
~~~

Watch for up to three minutes, then Ctrl+C. Expect a numeric CPU percentage and possibly growth toward three replicas. Timing depends on metric freshness and cluster configuration; an exact count at an exact second is not promised.

~~~powershell
kubectl -n k8s-learning-operations top pods -l app=scale-demo
kubectl -n k8s-learning-operations describe hpa scale-demo
~~~

Conditions such as `ScalingActive` and events explain missing requests or unavailable metrics. `<unknown>` is not a successful scaling result.

## Stop, recover, and clean up

~~~powershell
kubectl apply -f topics/28-horizontal-autoscaling/manifests/10-load-off.yaml
kubectl -n k8s-learning-operations rollout restart deployment/scale-demo
kubectl -n k8s-learning-operations rollout status deployment/scale-demo --timeout=120s
kubectl -n k8s-learning-operations get hpa scale-demo
~~~

Allow metric and stabilization delays for scale-down; do not keep restarting it. Do not reapply `spec.replicas` repeatedly while HPA owns the desired scale.

~~~powershell
kubectl delete -f topics/28-horizontal-autoscaling/manifests/30-hpa.yaml --ignore-not-found
kubectl delete -f topics/28-horizontal-autoscaling/manifests/20-scale-deployment.yaml --ignore-not-found
kubectl delete -f topics/28-horizontal-autoscaling/manifests/10-load-off.yaml --ignore-not-found
~~~

If capacity is tight or any workload is affected, stop and clean up immediately.
