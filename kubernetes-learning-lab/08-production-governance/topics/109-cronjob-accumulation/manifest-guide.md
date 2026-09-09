# 109. CronJob accumulates thousands of completed Pods: manifest walkthrough

[CronJob](manifests/10-cronjob.yaml) is suspended, runs a harmless echo, uses Forbid, keeps one successful/failed owned Job, sets activeDeadlineSeconds=30 and TTL=45 seconds, and uses Never/backoffLimit=0. The runbook manually creates `q109-once` to test TTL and dependent Pod cleanup.

The [shared manifest guide](../../manifest-guide.md) explains the catalog's selectors, port, resources, and security controls. Continue with the [runbook](runbook.md).
