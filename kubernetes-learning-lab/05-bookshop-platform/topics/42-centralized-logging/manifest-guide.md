# 42. Centralized logging: reading the manifests

File: [catalog log Job](manifests/10-log-job.yaml).

`batch/v1` Job `catalog-log-demo` uses `backoffLimit: 0` and `restartPolicy: Never` so the example runs once without automatic retries obscuring the event sequence. Each echo writes JSON with `level`, `event`, and the harmless shared `request_id: lesson-42`. `>&2` sends the warning to stderr.

The template label `exercise: logs-42` supports scoped discovery. Kubernetes stores the Pod’s container log; it does not automatically ship these lines to a central backend. No collector DaemonSet is installed, and the Job creates no external log destination.

Shared fields are explained in the [chapter manifest guide](../../manifest-guide.md). Continue with the [runbook](runbook.md).
