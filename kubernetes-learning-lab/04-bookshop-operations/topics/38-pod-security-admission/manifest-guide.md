# Pod Security Admission: reading the manifests

Files: [namespace](manifests/00-namespace.yaml), [compliant Pod](manifests/10-good-pod.yaml), and [negative dry-run input](negative/20-missing-controls.yaml).

`k8s-learning-admission` is separate from the operations namespace. Its labels set:

| Label suffix after `pod-security.kubernetes.io/` | Value | Effect |
| --- | --- | --- |
| `enforce` | `restricted` | Reject Pods that fail this profile |
| `enforce-version` | `v1.30` | Use the rules from that policy revision |
| `warn`, `audit` | `restricted` | Request warnings and audit information |
| `warn-version`, `audit-version` | `latest` | Compare with the API server's latest available rules |

The fixed enforcement version is a teaching baseline, not a cluster support recommendation. Keeping warning/audit versions at `latest` can reveal newer requirements while leaving the exercise's blocking rules reproducible. Audit evidence additionally depends on cluster audit configuration and access.

`admission-good` uses the [chapter security controls](../37-security-context/manifest-guide.md). The negative Pod is a separate name with the same harmless sleep command but omitted Pod/container security contexts. Its missing declarations are sufficient to fail Restricted policy; it does not need a privileged command.

Keep the negative input outside `manifests/`. Never apply it. Client dry-run cannot demonstrate admission, so the runbook explicitly uses server dry-run against an existing labeled namespace.

Continue with the [runbook](runbook.md).
