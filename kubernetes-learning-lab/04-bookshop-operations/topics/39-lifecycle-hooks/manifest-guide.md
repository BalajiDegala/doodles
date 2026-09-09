# Lifecycle hooks: reading the manifest

File: [closing worker](manifests/10-closing-worker.yaml).

`lifecycle.postStart.exec.command` writes `/state/started`. `lifecycle.preStop.exec.command` writes `/state/stopping` and runs `sleep 3`. The hook overwrites its marker instead of appending a new business action, making repeated execution harmless for this demonstration.

`terminationGracePeriodSeconds: 20` budgets the hook and subsequent shutdown together. The three-second pause leaves room for the shell to notice the marker and later respond to TERM. It is an observation aid, not a production drain duration.

The main `sh` process prints its startup message, checks the two files once per second, and prints each observed marker once. `seen_start` and `seen_stop` are shell variables that suppress repeated log lines. `trap` handles TERM/INT by printing the final message and exiting successfully. Here the shell intentionally remains the main process because it demonstrates signal handling; the website instead uses `exec httpd`.

The `state` volume is writable `emptyDir`, mounted at `/state`; the rest of the filesystem remains read-only. It persists during a container restart in this Pod and disappears with Pod deletion. Logs/markers are teaching evidence, not durable audit records.

Continue with the [runbook](runbook.md).
