# 95. HPA repeatedly scales up and down: manifest walkthrough

[Target](manifests/10-worker.yaml) is `q95-worker` with no authored replicas. [Optional HPA](optional/20-hpa.yaml) uses autoscaling/v2, min=1, max=3, CPU target 70%, scaleDown.stabilizationWindowSeconds=300, and a limit of one removed Pod per 60 seconds. These are teaching values, not universal production settings.

The [shared manifest guide](../../manifest-guide.md) explains the catalog's selectors, port, resources, and security controls. Continue with the [runbook](runbook.md).
