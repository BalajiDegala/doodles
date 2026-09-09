# Node affinity, taints, and tolerations: reading the manifests

File: [placement worker](manifests/10-placement.yaml).

`affinity.nodeAffinity.requiredDuringSchedulingIgnoredDuringExecution.nodeSelectorTerms` contains a matching expression. `key: kubernetes.io/os` names a standard node label; `operator: In` means the value must be in `values: [linux]`. Expressions in one term are ANDed; alternative terms are ORed.

The example tolerates `dedicated=bookshop:NoSchedule` using `operator: Equal`. It neither creates that taint nor attracts the Pod to such a node. A normal eligible untainted Linux node is also acceptable.

The shell prints the node name supplied through `env.valueFrom.fieldRef.fieldPath: spec.nodeName`, then sleeps. This is the Downward API: Kubernetes supplies a field from the Pod's own metadata/spec without handing the process API credentials.

The remaining security/resource fields follow the [chapter conventions](../../manifest-guide.md). No cluster-scoped object is applied.

Continue with the [runbook](runbook.md).
