# 72. API deprecations

## Concise technical summary

1. API group and version select the schema a client requests.
2. Deprecation signals migration work before a future compatibility problem.
3. Removal and support rules differ by API stability level and resource.
4. Migration requires checking field semantics and controllers as well as changing apiVersion.

Memory cue: Inventory the forms before the old counter closes.

## Plain meaning

Maya’s office announces a replacement order form. Renaming the form’s heading does not fix changed fields or a workflow that still expects the old format.

## The Bookshop story

We inventory the base APIs and optional custom APIs, then identify what evidence is needed before the upgrade planned in question 64.

## Details and production use

There is no blanket “two releases of notice” rule for all Kubernetes APIs. Consult the deprecation policy and migration guide for the exact type/version. Served API discovery proves current availability, not compatibility with a proposed future cluster.

Tools can flag known deprecated APIs, but coverage may differ for files, rendered charts, live objects, and custom resources. A resource can be deprecated while its apiVersion string remains v1, as with legacy Endpoints. Test the rendered configuration and controller behaviour against the target environment.

Further reading: [API deprecation policy](https://kubernetes.io/docs/reference/using-api/deprecation-policy/), [deprecated API migration guide](https://kubernetes.io/docs/reference/using-api/deprecation-guide/).

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
