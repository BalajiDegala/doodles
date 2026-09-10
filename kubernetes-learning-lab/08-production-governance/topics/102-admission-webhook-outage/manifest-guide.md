# 102. Admission webhook blocks deployments cluster-wide: manifest walkthrough

Compare one named ValidatingWebhookConfiguration or MutatingWebhookConfiguration with its referenced namespaced Service and endpoints. The [admission lesson](../../../05-bookshop-platform/topics/57-api-admission/lesson.md) explains request ordering. A normal catalog server-dry-run can exercise matching admission without persisting a deployment change.

The [shared manifest guide](../../manifest-guide.md) explains the catalog's selectors, port, resources, and security controls. Continue with the [runbook](runbook.md).
