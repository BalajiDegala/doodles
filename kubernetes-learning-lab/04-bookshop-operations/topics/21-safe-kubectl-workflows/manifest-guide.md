# Safe kubectl workflows: reading the manifests

Actual files: [base page](../../manifests/10-page.yaml) and [proposed page](manifests/10-page-preview.yaml).

Both have `apiVersion: v1` and `kind: ConfigMap`. Both identify `bookshop-page` in `k8s-learning-operations`. Keeping the identity unchanged means apply updates that ConfigMap instead of creating a second one.

Under `data`, `index.html: |` stores multiple lines as one string. The preview changes the second HTML line to an extended opening message. The `|` belongs to YAML; the `<p>` belongs to HTML.

There is no `spec` because a ConfigMap stores data directly. There is no status copied from `kubectl get -o yaml`. Review authored fields instead of committing server-generated identifiers.

Updating this directly mounted ConfigMap can eventually change the served page. That differs from the first chapter, where an init container rendered a separate copy. The walkthrough in [topic 36](../36-configuration-reloading/manifest-guide.md) explains the distinction.

Continue with the [runbook](runbook.md).
