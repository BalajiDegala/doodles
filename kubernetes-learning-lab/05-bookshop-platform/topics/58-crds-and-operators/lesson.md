# CRDs and Operators

## Concise technical summary

1. A CRD adds a custom resource type and its API schema.
2. A custom resource is one instance stored through that API.
3. A controller reconciles desired state; the CRD alone does not implement behaviour.
4. An Operator combines domain knowledge with reconciliation for application lifecycle tasks.

Memory cue: Type, instance, controller, domain knowledge.

## Plain meaning

Maya invents a new order form. Filing a form does not pack an order; someone must read it and perform the appropriate work.

## The Bookshop story

The Certificate used in question 50 is a custom resource. Its CRD defines the form, while cert-manager’s controllers issue and maintain the certificate.

## Details and production use

Custom API design needs schema validation, status, versioning/conversion, authorization, and lifecycle decisions. Operators also need retry-safe reconciliation, ownership, finalizer handling, and upgrade/recovery procedures. Installing a CRD without its controller can leave accepted objects that never progress.

An Operator’s advertised maturity is not proof of safe database upgrades or backups. Evaluate the specific release, supported operations, failure modes, and restore evidence. Building one is an engineering commitment whose duration depends on scope.

Further reading: [Custom resources](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/), [Operator pattern](https://kubernetes.io/docs/concepts/extend-kubernetes/operator/).

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
