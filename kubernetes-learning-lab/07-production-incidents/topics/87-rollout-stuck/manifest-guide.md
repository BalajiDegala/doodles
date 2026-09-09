# 87. Deployment rollout stuck: manifest walkthrough

[Healthy template](fixed/10-worker.yaml) probes `/`. [Fault template](faults/10-worker.yaml) probes `/q87-never-ready`. Both address `q87-worker` with maxSurge=1/maxUnavailable=0 and a 60-second progress deadline. The server still works; the bad probe keeps it out of readiness.

The [shared manifest guide](../../manifest-guide.md) explains the catalog's selectors, port, resources, and security controls. Continue with the [runbook](runbook.md).
