# RBAC and ServiceAccounts

## Concise technical summary

1. A ServiceAccount gives a workload a Kubernetes identity.
2. A Role lists allowed API actions within a namespace.
3. A RoleBinding grants a Role's permissions to named identities.
4. RBAC grants add together; a narrow Role cannot cancel another grant.

Memory cue: Identity says who; Role says what; binding connects them.

## Plain meaning

Maya gives the stock observer a staff badge and permission to read the counter register. That permission does not let the observer erase the register or open the money drawer.

## The Bookshop story

The observer can get, list, and watch Pod records in the operations namespace. It has no grant here to delete Pods, read Secrets, or inspect nodes. We create a dedicated identity and check its authorization from the terminal.

## Scope matters

| Object | Purpose |
| --- | --- |
| Role | Namespaced permission rules |
| ClusterRole | Reusable rules, including rules for cluster resources |
| RoleBinding | Grants a Role or ClusterRole within its namespace |
| ClusterRoleBinding | Grants a ClusterRole across the cluster |

A ClusterRole can describe namespaced resources too. Binding it through a RoleBinding does not grant those permissions in every namespace. RBAC controls API operations; [NetworkPolicy](../30-network-policies/lesson.md) controls supported network traffic.

The practice Pod does not call the API, so it mounts no token. A real observer needs credentials as well as permissions; use the platform's short-lived projected token flow when needed. Do not put tokens in this lesson's files. Avoid wildcard permissions and inspect all grants before deciding an identity is limited. [Kubernetes RBAC reference](https://kubernetes.io/docs/reference/access-authn-authz/rbac/).

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
