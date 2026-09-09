# Native sidecar containers

## Concise technical summary

1. Native sidecars are restartable init containers with restartPolicy: Always.
2. Their startup sequencing can let a helper become available before main work.
3. Native sidecars do not keep a completed Job running indefinitely.
4. They have different lifecycle semantics from two ordinary application containers.

Memory cue: Start the helper first; let the report finish.

## Plain meaning

Maya opens a helper desk before a report worker starts. Once the report is complete, the helper should close instead of keeping the whole task marked unfinished.

## The Bookshop story

A helper creates a ready marker and emits heartbeats. A report checks that marker and exits successfully; the Job can complete while Kubernetes shuts the sidecar down.

## Details and production use

Native sidecars are stable from Kubernetes 1.33. A startup probe can determine when the restartable init container is considered started for sequencing. Main-container completion drives the Job outcome rather than waiting forever for the helper’s loop.

A helper running under ordinary containers lacks these native ordering/completion rules. Resource requests, probe health, and shutdown budgets still matter. The file marker is a teaching signal, not a full dependency-health protocol.

Further reading: [Native sidecar containers](https://kubernetes.io/docs/concepts/workloads/pods/sidecar-containers/).

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
