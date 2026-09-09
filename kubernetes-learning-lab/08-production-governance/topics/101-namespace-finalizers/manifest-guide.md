# 101. Namespace deletion blocked by finalizers: manifest walkthrough

[Namespace](manifests/00-namespace.yaml) is `k8s-learning-finalizer`. [ConfigMap](manifests/10-held-map.yaml) has only `learning.bookshop/hold-q101` as a finalizer and no external effect. [JSON patch](reference/release-finalizer.json) first tests that exact value before removing it. This patch must never be reused for another object's finalizers.

The [shared manifest guide](../../manifest-guide.md) explains the catalog's selectors, port, resources, and security controls. Continue with the [runbook](runbook.md).
