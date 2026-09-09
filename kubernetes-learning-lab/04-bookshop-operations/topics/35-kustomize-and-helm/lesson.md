# Kustomize and Helm

## Concise technical summary

1. Kustomize transforms ordinary resource YAML through a kustomization file.
2. A base holds shared objects; an overlay describes a variation.
3. Helm renders templates and tracks installed release revisions.
4. Both approaches need review of the final Kubernetes objects.

Memory cue: Kustomize adjusts the pattern; Helm fills the recipe.

## Plain meaning

Maya can copy a standard counter plan and attach a short list of changes for a practice branch. That is different from filling choices into a reusable opening kit, but either approach can describe the branch she wants.

## The Bookshop story

The Kustomize base uses one counter and a base page. The practice overlay requests two counters and a different page. Rendering shows the final objects before anything changes on the cluster.

| Need | Kustomize example | Helm example |
| --- | --- | --- |
| Shared starting point | Plain base YAML | Chart templates and defaults |
| Variation | Replica transform and ConfigMap patch | Evening values file |
| Preview | `kubectl kustomize` | `helm template` |
| Recovery here | Reapply the base | Roll back a release revision |

Kustomize is available through `kubectl`; it does not create Helm-style release history. Its transformations can update names, resources, and generated configuration references. [Kustomize guide](https://kubernetes.io/docs/tasks/manage-kubernetes-objects/kustomization/).

Choose based on how the team maintains and distributes configuration. They can coexist, but two tools should not independently own the same live resources. This exercise uses `bookshop-custom`, so it can be inspected alongside the Helm and base applications.

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
