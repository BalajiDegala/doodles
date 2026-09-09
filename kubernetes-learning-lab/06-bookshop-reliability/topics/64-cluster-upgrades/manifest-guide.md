# Cluster upgrade planning: reading the manifests

The [base Deployment](../../manifests/20-deployment.yaml) uses apps/v1; its readiness and rollingUpdate settings describe application behaviour, not cluster upgrade order. The [Service](../../manifests/30-service.yaml) and ConfigMap use core v1 APIs.

Inventory node kubelet/runtime versions, API server version, client version, and add-on/CRD versions separately. A PDB constrains supported eviction requests but does not prevent all upgrade-related outages. No upgrade command or fake universal version matrix is embedded in these manifests.

Shared fields are explained in the [chapter manifest guide](../../manifest-guide.md). Continue with the [runbook](runbook.md).
