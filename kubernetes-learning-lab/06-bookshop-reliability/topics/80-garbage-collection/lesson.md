# 80. Garbage collection and ownership

## Concise technical summary

1. Owner references connect dependent API objects to their owners by identity.
2. Background and foreground deletion differ in how owner/dependent cleanup is observed.
3. Orphan deletion preserves dependents instead of cascading removal.
4. Finalizers coordinate cleanup and are not arbitrary shell hooks to remove blindly.

Memory cue: Follow the owner chain before closing the counter.

## Plain meaning

Maya owns a temporary counter plan, which manages workers. Removing the plan can dismiss the workers, or deliberately leave their manager operating until a separate handover is finished.

## The Bookshop story

We create one disposable Deployment, orphan its ReplicaSet, and verify that the manager/Pod remain. Foreground deletion of that ReplicaSet then removes its managed Pod.

## Details and production use

A Deployment typically owns ReplicaSets, which own Pods. Names alone are insufficient: ownerReferences include the owner UID. Ownership is not the same as matching labels, and namespaced ownership cannot arbitrarily cross namespaces.

Foreground deletion waits for relevant blocking dependents; background deletion lets garbage collection proceed asynchronously. Finalizers can keep deletion pending until their responsible controller completes cleanup. Removing an unknown finalizer can leak external resources or violate recovery assumptions. This exercise adds no custom finalizer.

Further reading: [Garbage collection](https://kubernetes.io/docs/concepts/architecture/garbage-collection/), [finalizers](https://kubernetes.io/docs/concepts/overview/working-with-objects/finalizers/).

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
