# 94. Cluster upgrade breaks CRDs and operators

Source: supplied Kubernetes PDF, question 94, pages 45. Practice: **Read-only investigation**.

## Concise technical summary

1. Operator code, served APIs, CRD schemas, and conversion webhooks must stay compatible.
2. CRD storedVersions records storage-version history, not a complete compatibility result.
3. A failed conversion or admission webhook can prevent normal API work.
4. Recover the owning controller before migrating or deleting custom resources.

Memory cue: Controller, served version, stored data, webhook.

## Plain meaning

The order form changed, but the clerk and translator still expect the older form. Destroying the order archive does not repair the translation.

## The Bookshop story

Maya inventories a supplied operator and CRD after a hypothetical upgrade. The exercise does not install or remove an operator.

## Diagnosis and production details

Distinguish an operator using a removed Kubernetes API from a rejected custom-resource schema or unreachable conversion service. CRD spec.versions lists served/storage flags; status.storedVersions helps identify stored encodings still requiring migration. Setting those fields alone is not a data migration.

Follow the operator's supported source/target upgrade path. Repair its Deployment, Service endpoints, certificates, or conversion implementation as the evidence requires. Do not delete CRDs to reinstall them: deletion also removes their custom resources. Temporarily weakening a webhook's failure policy can remove a security control and is an incident-owner decision, not the default fix.

Read the [manifest walkthrough](manifest-guide.md) and [runbook](runbook.md).

Further reading: [CRD versioning](https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definition-versioning/), [API migration guide](https://kubernetes.io/docs/reference/using-api/deprecation-guide/).
