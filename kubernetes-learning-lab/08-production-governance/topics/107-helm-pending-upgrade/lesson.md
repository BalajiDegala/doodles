# 107. Helm release stuck in pending-upgrade

Source: supplied Kubernetes PDF, question 107, pages 52-53. Practice: **Optional Helm recovery rehearsal**.

## Concise technical summary

1. A pending release can reflect an active or interrupted Helm operation.
2. Check the deployment pipeline and release history before starting another writer.
3. A known-good revision may restore workload configuration through rollback.
4. Deleting Helm release Secrets can lose state and is not a routine unlock procedure.

Memory cue: One writer, known history, verified rollback.

## Plain meaning

A stock transfer is marked in progress after the clerk's connection disappears. First determine whether the clerk is still working before starting a second transfer.

## The Bookshop story

A new local-chart release in the lab namespace is installed, upgraded, and rolled back. The exercise rehearses recovery mechanics without manufacturing a stuck release Secret.

## Diagnosis and production details

Inspect helm status/history and the CI job that owns the operation. If it is still active, follow its cancellation/completion procedure. For an abandoned operation, choose a compatible successful revision and check hooks, values, CRDs, storage, and application migrations before rollback. Helm rollback does not reverse external side effects or database schema changes.

Manual deletion of release metadata or uninstall/reinstall can remove history or workloads; use a version-matched recovery procedure only after investigating why normal rollback failed. Helm major versions differ: Helm 3 commonly uses --atomic, while Helm 4 documents --rollback-on-failure. Check the installed help instead of copying flags across versions.

Read the [manifest walkthrough](manifest-guide.md) and [runbook](runbook.md).

Further reading: [Helm rollback](https://helm.sh/docs/helm/helm_rollback/), [Helm upgrade flags](https://helm.sh/docs/helm/helm_upgrade/).
