# NetworkPolicies: reading the manifests

Files: [visitor Pods](manifests/10-visitors.yaml) and [catalog ingress policy](policy/20-catalog-ingress.yaml).

The policy's `podSelector.matchLabels.app: bookshop-ops` selects the protected server Pods. It does not select the visitors. `policyTypes: [Ingress]` deliberately leaves egress alone.

Under `ingress.from`, `podSelector.matchLabels.access: approved` selects permitted clients within this namespace. The port rule uses `protocol: TCP` and `port: 8080` because NetworkPolicy applies at the Pod's receiving port, even though the Service exposes port 80.

The two clients are ordinary sleeping BusyBox Pods. Only `visitor-approved` carries `access: approved`; `visitor-blocked` uses `access: unapproved`. A process does not automatically get this label from its name.

No namespace-wide default deny is installed. That keeps the exercise scoped to the exact shared app. Deleting this lab policy restores the previous policy set, which may still include administrator-defined restrictions.

Continue with the [runbook](runbook.md).
