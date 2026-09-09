# Horizontal Pod Autoscaling: reading the manifests

Files: [idle flag](manifests/10-load-off.yaml), [worker Deployment](manifests/20-scale-deployment.yaml), [HPA](manifests/30-hpa.yaml), and [burst flag](variants/10-load-on.yaml).

The ConfigMap `scale-load` stores `enabled` as a string. The worker reads that mounted file once at startup. When true, `timeout 120` bounds a CPU loop to two minutes; `|| true` handles timeout's nonzero exit without crashing the container. Then it sleeps. It is deliberately synthetic.

`autoscaling/v2` enables structured metric and behaviour settings. `scaleTargetRef` points to Deployment `scale-demo`, not the base website. `minReplicas: 1` and `maxReplicas: 3` bound the desired replica count.

`metrics[].resource.name: cpu` and `target.type: Utilization` use CPU requests as the denominator. `averageUtilization: 50` sets the target. `behavior.scaleDown.stabilizationWindowSeconds: 60` keeps recent higher recommendations for a minute to reduce rapid downscaling.

Every worker requests `100m` CPU and `16Mi` memory, limited to `200m` and `32Mi`. Desired steady replicas therefore cap at 0.6 CPU of limits. Terminating/replacement Pods can temporarily overlap. This is why the runbook stops the load and cleans up even though each burst is bounded.

Continue with the [runbook](runbook.md).
