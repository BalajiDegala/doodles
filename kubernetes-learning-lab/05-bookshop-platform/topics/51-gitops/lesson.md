# GitOps with Argo CD and Flux

## Concise technical summary

1. GitOps records desired configuration in a versioned source.
2. A controller reconciles selected source content into a cluster.
3. Argo CD and Flux provide different resources and workflows for that reconciliation.
4. Drift correction and deletion depend on explicit controller policy.

Memory cue: Commit intent; reconcile deliberately.

## Plain meaning

Maya keeps an approved opening plan in a shared ledger. An operator compares the actual counter arrangement with that plan and follows agreed rules for making changes.

## The Bookshop story

The Bookshop’s authored manifests could become a GitOps source. We map the path, revision, destination, permissions, and recovery steps before connecting any repository.

## Details and production use

Argo CD Applications describe source and destination; automated synchronization, pruning, and self-healing are separate settings. Flux composes source and reconciliation controllers; its Kustomization custom resource is different from a local kustomization.yaml file.

A Git revert restores desired configuration, not database history or external side effects. Manual emergency changes may be reconciled away, so incident procedures must coordinate controller state and the source. Repository history alone is not a complete runtime audit trail.

Further reading: [Argo CD automated sync](https://argo-cd.readthedocs.io/en/stable/user-guide/auto_sync/), [Flux Kustomization](https://fluxcd.io/flux/components/kustomize/kustomizations/).

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
