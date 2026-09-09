# Scheduler filtering and scoring

## Concise technical summary

1. The scheduler finds unscheduled Pods and evaluates eligible nodes.
2. Filtering removes nodes that cannot satisfy required constraints.
3. Scoring ranks feasible nodes before subsequent placement stages.
4. schedulerName selects a scheduler; naming one does not install it.

Memory cue: Can it fit, where is it preferred, who will place it?

## Plain meaning

Maya first removes rooms that cannot hold the counter, then compares the rooms that remain. Addressing the request to a nonexistent coordinator leaves it waiting.

## The Bookshop story

A tiny Pod references an intentionally absent scheduler name. It stays unassigned without consuming large resources or changing node labels.

## Details and production use

Requests, taints, affinity, volumes, and topology can affect feasibility. Scores depend on configured plugins and weights; “least busy node wins” is an unreliable shortcut. The scheduling framework includes stages beyond filtering/scoring, such as reserve, permit, and binding.

Multiple schedulers must be configured and operated deliberately. A custom name is not a feature flag for smarter scheduling. Pending can also include post-scheduling startup, so inspect spec.nodeName, conditions, and container state to locate the wait.

Further reading: [Scheduling framework](https://kubernetes.io/docs/concepts/scheduling-eviction/scheduling-framework/), [multiple schedulers](https://kubernetes.io/docs/tasks/extend-kubernetes/configure-multiple-schedulers/).

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
