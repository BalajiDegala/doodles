# RBAC and ServiceAccounts: reading the manifests

| File | Fields to follow | Observable effect |
| --- | --- | --- |
| [ServiceAccount](manifests/10-serviceaccount.yaml) | `name: stock-observer`, `automountServiceAccountToken: false` | Creates the identity with token mounting disabled by default |
| [Role](manifests/20-role.yaml) | `apiGroups: [""]`, `resources: [pods]`, `verbs: [get, list, watch]` | Allows only these Pod API operations through this Role |
| [RoleBinding](manifests/30-rolebinding.yaml) | `subjects`, `roleRef` | Connects the exact ServiceAccount to `pod-observer` |
| [Observer Pod](manifests/40-observer.yaml) | `serviceAccountName: stock-observer` | Assigns the identity to a sleeping Pod |

The empty API group means the core API containing Pods. The RBAC objects themselves use `rbac.authorization.k8s.io/v1`. The plural resource name `pods` is an API collection, not a Pod label. Logs use the distinct `pods/log` subresource, which this Role does not grant.

The subject's namespace identifies the ServiceAccount. The binding's namespace scopes the grant. `roleRef.apiGroup` identifies the RBAC API and `kind: Role` selects this namespace's `pod-observer`. Changing `roleRef` later requires recreating the binding.

`serviceAccountName` assigns an identity; it does not override `automountServiceAccountToken: false`. The observer sleeps for an hour with the [shared resource and security settings](../../manifest-guide.md). The exercise checks permissions without giving the process a credential.

Continue with the [runbook](runbook.md).
