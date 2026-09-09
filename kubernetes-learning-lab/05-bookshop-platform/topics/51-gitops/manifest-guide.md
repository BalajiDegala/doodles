# GitOps with Argo CD and Flux: reading the manifests

Read the [chapter manifests](../../manifest-guide.md) and the earlier [Kustomize example](../../../04-bookshop-operations/topics/35-kustomize-and-helm/manifest-guide.md). No Application or Flux resource is installed here.

An actual source definition needs a real repository URL, revision, and path. A destination needs an explicitly permitted cluster and namespace. Argo CD’s `syncPolicy` or Flux’s `prune`/`suspend` settings affect changes and deletion. A controller’s ServiceAccount and platform configuration determine what it can apply.

Our local four-file base is configuration content, not a connected GitOps deployment. Do not create a resource with a fabricated repository URL or assume that a namespace automatically grants controller access.

Shared fields are explained in the [chapter manifest guide](../../manifest-guide.md). Continue with the [runbook](runbook.md).
