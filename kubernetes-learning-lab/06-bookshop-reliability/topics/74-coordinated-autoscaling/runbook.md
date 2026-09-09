# HPA, VPA, and KEDA: runbook

Run from the chapter directory, as shown in [shared setup](../../runbook.md).

## Prerequisites

Existing healthy KEDA CRDs/controllers/metrics integration, the base ConfigMap, and spare capacity. If KEDA is absent, skip application. Choose a short future cron window in the declared timezone before applying the optional file.

~~~powershell
kubectl api-resources --api-group=keda.sh
kubectl apply -f topics/74-coordinated-autoscaling/manifests/
kubectl apply --dry-run=server -f topics/74-coordinated-autoscaling/optional/
kubectl apply -f topics/74-coordinated-autoscaling/optional/
kubectl -n k8s-learning-reliability get scaledobject bookshop-hours -o yaml
kubectl -n k8s-learning-reliability get hpa
kubectl -n k8s-learning-reliability get deployment event-counter -w
~~~

Stop the watch with Ctrl+C after the chosen window. Expect activity toward two replicas during the window and eventual zero after it, allowing polling/cooldown/controller delays. Inspect Ready/Active conditions; exact second-by-second scaling is not promised.

## Troubleshooting and cleanup

Check timezone/window, target name, controller conditions, and generated HPA ownership. Remove both resources even if the observation was skipped after setup:

~~~powershell
kubectl delete -f topics/74-coordinated-autoscaling/optional/ --ignore-not-found
kubectl delete -f topics/74-coordinated-autoscaling/manifests/ --ignore-not-found
~~~
