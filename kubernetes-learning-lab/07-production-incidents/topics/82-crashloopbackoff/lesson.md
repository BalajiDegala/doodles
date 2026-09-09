# 82. Pod stuck in CrashLoopBackOff

Source: supplied Kubernetes PDF, question 82, pages 38-39. Practice: **Fault and repair**.

## Concise technical summary

1. CrashLoopBackOff is a container waiting reason during repeated restart backoff.
2. Read previous-container logs and lastState before deleting the evidence.
3. Exit codes, probes, and events must agree before assigning a cause.
4. Repair the command or dependency and verify restart counts stop increasing.

Memory cue: Previous logs explain the last attempt.

## Plain meaning

A worker clocks in, encounters the same broken instruction, and leaves. Asking them to return more often will not fix the instruction.

## The Bookshop story

A disposable worker prints a harmless configuration error and exits with code 1. The repaired template runs the usual catalog server.

## Diagnosis and production details

Read logs for the specific container, including init containers when needed. A clean exit under `restartPolicy: Always` can also cause repeated restarts. Inspect startup/liveness probe failures, missing commands, configuration references, and dependencies.

Exit 137 conventionally means SIGKILL: OOM or forced termination are possible causes. Shell exits 126/127 can suggest execution permission or command lookup failures; verify the runtime error and logs. Backoff timing varies with feature settings and version. Deleting Pods loses useful history without repairing the template.

Read the [manifest walkthrough](manifest-guide.md) and [runbook](runbook.md).

Further reading: [Debug running Pods](https://kubernetes.io/docs/tasks/debug/debug-application/debug-running-pod/), [Container states](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#container-states).
