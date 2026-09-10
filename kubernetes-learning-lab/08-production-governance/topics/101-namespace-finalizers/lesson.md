# 101. Namespace deletion blocked by finalizers

Source: supplied Kubernetes PDF, question 101, pages 49. Practice: **Controlled finalizer drill**.

## Concise technical summary

1. Namespace deletion waits for discovery, object deletion, and required finalizers.
2. kubectl get all does not enumerate every namespaced resource type.
3. Restore the cleanup controller before considering removal of its finalizer.
4. A deliberate dummy finalizer can teach the lifecycle without bypassing real cleanup.

Memory cue: Find the object, find its cleanup owner.

## Plain meaning

Maya cannot close a branch while an equipment return is unsigned. Removing the signature requirement is safe only if the return has actually been handled.

## The Bookshop story

A separate namespace contains one ConfigMap with a deliberately controllerless training finalizer. The runbook removes only that known marker after showing why deletion waits.

## Diagnosis and production details

Read namespace status.conditions for discovery errors, remaining content, and finalizers. An unavailable aggregated API can obstruct discovery; not every stuck namespace is caused by a user object's finalizer. Enumerate discoverable namespaced kinds and record failed list permissions or API errors instead of hiding them.

A real finalizer can represent cloud resource cleanup or data protection. Restore its operator and verify external cleanup before any exceptional removal. Forcing the namespace /finalize endpoint can orphan objects and does not guarantee their processes or infrastructure disappear. It is not this lab's repair.

Read the [manifest walkthrough](manifest-guide.md) and [runbook](runbook.md).

Further reading: [Finalizers](https://kubernetes.io/docs/concepts/overview/working-with-objects/finalizers/), [Kubernetes API resource discovery](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_api-resources/).
