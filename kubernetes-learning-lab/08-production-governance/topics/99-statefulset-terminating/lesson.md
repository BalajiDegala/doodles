# 99. StatefulSet Pod stuck in Terminating

Source: supplied Kubernetes PDF, question 99, pages 48. Practice: **Read-only investigation**.

## Concise technical summary

1. DeletionTimestamp means termination has been requested, not that the process is gone.
2. Check grace time, kubelet reachability, finalizers, and storage attachment separately.
3. Force deletion removes the API object without proving the old writer stopped.
4. Fence the old instance before creating a potentially conflicting replacement.

Memory cue: API object gone does not mean writer gone.

## Plain meaning

A branch is removed from the directory while its cashier may still be working. Starting a second cashier on the same ledger can corrupt the accounts.

## The Bookshop story

Maya inspects a supplied stateful Pod and its claim/attachment chain. The catalog base is stateless; no production-like force deletion is needed to learn this incident.

## Diagnosis and production details

Record deletionTimestamp, terminationGracePeriodSeconds, finalizers, node health, owner UID, and volume events. Graceful shutdown, container runtime failure, kubelet/API disconnection, and controller cleanup require different owners. A finalizer need not be present for a Pod to remain Terminating.

StatefulSet identity and storage make duplicate execution consequential. Force deletion can permit a replacement before the original process is known stopped. ReadWriteOnce limits node access semantics; it is not a general distributed-writer fencing guarantee. Restore the responsible controller or fence/confirm shutdown using the provider's procedure before releasing identity or attachments.

Read the [manifest walkthrough](manifest-guide.md) and [runbook](runbook.md).

Further reading: [Force-delete StatefulSet Pods](https://kubernetes.io/docs/tasks/run-application/force-delete-stateful-set-pod/), [Persistent volume access modes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes).
