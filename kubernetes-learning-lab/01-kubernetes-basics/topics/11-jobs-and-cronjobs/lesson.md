# Jobs and CronJobs

## Concise technical summary

1. A Job runs a task to completion, such as processing a catalog.
2. A CronJob creates Jobs on a schedule, such as a daily report.
3. Retry limits control failed attempts, and concurrency rules control overlapping scheduled runs.
4. Tasks must handle repeats safely because retries and duplicate scheduling can happen.

Memory cue: Job finishes; CronJob schedules; retries need care.

Read the [manifest walkthrough](manifest-guide.md) to connect these points to the YAML.

## Plain meaning

A Deployment is like a shop assistant whose desk should remain open. A Job is a worker who completes one stock count and goes home. A CronJob is the calendar reminder that asks a worker to repeat the stock count at planned times.

## Controller relationship

```text
One-time work:
Job -> Pod -> command finishes -> Job becomes Complete

Scheduled work:
CronJob -> Job -> Pod -> command finishes
             `-> another Job at the next scheduled time
```

A successful Job Pod normally ends in phase `Succeeded`. That is expected and is different from a long-running application Pod stopping unexpectedly.

## The Tiny Bookshop example

The [catalog import Job](../../manifests/50-job.yaml) reads `books.txt` from the shared ConfigMap, validates that it is not empty, prints the imported books, and finishes. It uses:

- `restartPolicy: Never` so the kubelet does not repeatedly restart the same finished container.
- `backoffLimit: 2` so the Job controller limits failed Pod retries.
- `ttlSecondsAfterFinished: 600` so the completed Job is eligible for automatic cleanup after ten minutes.

The [catalog report CronJob](../../manifests/51-cronjob.yaml) counts the books every five minutes. `concurrencyPolicy: Forbid` prevents a new scheduled run from overlapping a still-running earlier run. Small history limits stop old Job objects from building up.

## Choosing the controller

| Need | Suitable controller |
| --- | --- |
| Keep a web API continuously available | Deployment |
| Import one data file and stop | Job |
| Produce a report every night | CronJob |
| Run an agent on every eligible node | DaemonSet |

## Production details

- Make retryable tasks idempotent: repeating them should not corrupt data or create duplicate business actions.
- A Job can use `completions` and `parallelism` for multiple work items.
- A CronJob schedule is interpreted by the controller. Use `.spec.timeZone` when a specific supported time zone is required; do not hide a time zone inside the cron expression.
- Define deadlines and history cleanup based on the business need.
- Monitor the Job result, not only whether a Pod was created.
- Long or critical workflows may need a workflow engine rather than one large shell command.

Use [runbook step 12](../../runbook.md#12-run-the-catalog-job-and-cronjob) for the working example.

Further reading: [Jobs](https://kubernetes.io/docs/concepts/workloads/controllers/job/) and [CronJobs](https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/).
