# 65. Disaster recovery: reading the manifests

Files: [restore base](restore/base/kustomization.yaml), [page](restore/base/10-page.yaml), [Deployment](restore/base/20-deployment.yaml), [Service](restore/base/30-service.yaml), [practice overlay](restore/practice/kustomization.yaml), and [recovery namespace](restore/practice/namespace.yaml).

The base copies only authored, non-secret catalog configuration. The overlay sets `namespace: k8s-learning-recovery` and includes its Namespace resource. Kustomize rewrites namespaced identities while preserving matching selectors and ConfigMap references.

No PVC, external database, live Secret, or control-plane snapshot is included. Successful rendering proves configuration structure; the runbook’s request verifies the rebuilt static service.

Shared fields are explained in the [chapter manifest guide](../../manifest-guide.md). Continue with the [runbook](runbook.md).
