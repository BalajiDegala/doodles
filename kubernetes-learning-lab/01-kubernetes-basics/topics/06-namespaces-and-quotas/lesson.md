# Namespaces and Quotas

## Concise technical summary

1. A namespace groups related Kubernetes resources, such as the bookshop's Pods and Services.
2. A ResourceQuota limits resource totals or object counts within that namespace.
3. Names can repeat across namespaces, and permissions can be assigned per namespace.
4. Namespace names alone do not block traffic; access and network policies provide that control.

Memory cue: Group, limit, control access.

Read the [manifest walkthrough](manifest-guide.md) to connect these points to the YAML.

## Plain meaning

A namespace groups namespaced Kubernetes resources under one name. It is similar to a labelled room inside a large building.

The project uses namespace `k8s-learning-basics`. This keeps its Deployment, Pods, Service, ConfigMap, Secret, ResourceQuota, and DaemonSet together. Cleanup is also simple because the whole practice namespace can be removed.

## Useful namespace behaviour

- Two namespaces can contain resources with the same short name.
- Most `kubectl` commands can target one namespace with `-n`.
- RBAC can give a team permission in selected namespaces.
- ResourceQuota can limit resource usage or object counts in a namespace.
- NetworkPolicy can restrict allowed network paths when the cluster network supports it.

Nodes, PersistentVolumes, StorageClasses, and namespaces themselves are cluster-wide objects, so they do not live inside a namespace.

## Quotas in the shared project

The [ResourceQuota manifest](../../manifests/05-resourcequota.yaml) sets generous object-count limits. Its purpose is to make quota use visible without making the small example difficult to schedule.

When a namespace reaches a quota limit, the API rejects creation of additional matching resources. A quota does not automatically resize or choose resources for the application.

## Isolation has several layers

A namespace is an organization and policy boundary, but its name alone is not complete security. Stronger multi-team separation normally combines:

- Namespaces.
- RBAC permissions.
- ResourceQuota and LimitRange.
- NetworkPolicy.
- Pod security controls.
- Separate clusters when the risk or trust boundary requires it.

Use [runbook step 3](../../runbook.md#3-create-the-namespace-and-quota) to create the boundary and inspect quota usage.

Further reading: [Namespaces](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/) and [ResourceQuota](https://kubernetes.io/docs/concepts/policy/resource-quotas/).
