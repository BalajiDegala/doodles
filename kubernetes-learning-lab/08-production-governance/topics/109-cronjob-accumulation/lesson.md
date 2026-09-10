# 109. CronJob accumulates thousands of completed Pods

Source: supplied Kubernetes PDF, question 109, pages 53-54. Practice: **Bounded Job cleanup drill**.

## Concise technical summary

1. CronJob history limits control retained owned Jobs, not every Pod in the namespace.
2. TTL-after-finished can remove a completed or failed Job and its dependents.
3. ConcurrencyPolicy affects overlap but does not cap historical object growth.
4. Inspect terminal conditions and ownership before deleting old work.

Memory cue: Schedule limits, history limits, expiry, ownership.

## Plain meaning

Each stock report leaves a completed work ticket. Preventing overlapping shifts does not clear the growing pile of old tickets.

## The Bookshop story

A suspended CronJob defines a tiny report. One manually created Job completes and expires through TTL, avoiding a repeating schedule or cluster object flood.

## Diagnosis and production details

successfulJobsHistoryLimit and failedJobsHistoryLimit apply to Jobs owned by that CronJob. ttlSecondsAfterFinished starts when a Job reaches a terminal condition. Manual jobs created with --from=cronjob copy its template but are not a proof of CronJob history-limit behavior.

The PDF's suggested status.successful=0 deletion would include active/uncompleted Jobs; it is not a reliable failed-job selector. Inspect Complete/Failed conditions and owner references. Retain useful logs outside deleted Pods when required, and suspend a runaway schedule while investigating. Suspending a CronJob does not stop Jobs already started.

Read the [manifest walkthrough](manifest-guide.md) and [runbook](runbook.md).

Further reading: [CronJob](https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/), [TTL-after-finished](https://kubernetes.io/docs/concepts/workloads/controllers/ttlafterfinished/), [Job conditions](https://kubernetes.io/docs/concepts/workloads/controllers/job/).
