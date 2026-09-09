# Container restart policies

## Concise technical summary

1. Always restarts a container after either success or failure.
2. OnFailure restarts it only after an unsuccessful exit.
3. Never leaves the terminated container stopped.
4. Container restart and controller-created Pod replacement are different actions.

Memory cue: Always: both. OnFailure: errors. Never: stop.

## Plain meaning

Maya gives three assistants the same task but different retry instructions. One repeats even after success, one retries only mistakes, and one stops after the first attempt.

## The Bookshop story

Our script fails once, recording a marker in a shared scratch volume. A restarted container finds the marker and succeeds. The three retry policies make the difference visible.

## Know who performs the retry

The kubelet restarts containers within an existing Pod according to policy, with backoff for repeated restarts. A Deployment controller works through a ReplicaSet to maintain Pods. A Job may create another Pod after a failed Pod even when `restartPolicy: Never` prevented an in-Pod restart.

Ordinary Deployment Pod templates use `Always`. Job templates allow `Never` or `OnFailure`. Do not choose `Always` for a task that should stop when completed.

The policies here are the portable Pod-level choices. Specialized sidecars and newer per-container restart features have their own semantics; they are not needed to understand this demonstration.

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).

Further reading: [Restart policy and backoff](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#container-restarts), [Jobs](https://kubernetes.io/docs/concepts/workloads/controllers/job/).
