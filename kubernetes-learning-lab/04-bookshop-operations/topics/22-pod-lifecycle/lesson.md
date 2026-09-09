# Pod lifecycle

## Concise technical summary

1. A Pod phase describes its broad lifecycle, not whether customers can use it.
2. Pending means startup is incomplete; Running does not mean Ready.
3. Succeeded means successful completion; Failed means terminal failure.
4. Unknown means the state cannot be obtained, and container waiting reasons are a separate detail.

Memory cue: Phase is the chapter; conditions and container states tell the detail.

## Plain meaning

A parcel can be waiting, travelling, delivered, or failed. 'Travelling' does not mean it arrived. Likewise, a Running Pod may still fail readiness checks.

## The Bookshop story

Maya runs three tiny stock checks: one is held at a scheduling gate, one finishes successfully, and one reports an error. We inspect their actual phase rather than guessing from a short status label.

## Separate three views

- `status.phase` is the Pod-level category: Pending, Running, Succeeded, Failed, or Unknown.
- `status.conditions` includes details such as whether the Pod was scheduled and whether it is Ready.
- `status.containerStatuses` describes each container as Waiting, Running, or Terminated, with reasons and exit codes.

`CrashLoopBackOff` and `ImagePullBackOff` are not Pod phases. The STATUS column printed by `kubectl get pods` is a convenient summary and may show these reasons instead of the phase.

Running means the Pod is bound to a node, its containers were created, and at least one is running or starting/restarting. Succeeded requires all containers to finish successfully without restarting. Failed includes terminal unsuccessful execution. Unknown is an observation failure, not a state to manufacture by disrupting your node.

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).

Further reading: [Pod lifecycle](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/), [scheduling readiness](https://kubernetes.io/docs/concepts/scheduling-eviction/pod-scheduling-readiness/).
