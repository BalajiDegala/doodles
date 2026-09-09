# Vertical and node autoscaling: reading the manifests

Optional file: [recommendation-only VPA](optional/10-vpa.yaml). Target: [base Deployment](../../manifests/20-deployment.yaml).

`apiVersion: autoscaling.k8s.io/v1` is provided by the VPA CRD, unlike core `autoscaling/v2` HPA. If discovery does not expose `verticalpodautoscalers`, the YAML cannot create a working VPA.

`targetRef` identifies `apps/v1` Deployment `bookshop-ops`. `updatePolicy.updateMode: "Off"` means observe and recommend, not change running Pods. Recommendations appear under `status.recommendation`; they are not fields you author as desired values.

There is no node-autoscaler manifest. Node provider APIs, node groups, permissions, and budget constraints are platform-specific. The runbook reads current evidence and explicitly stops at the administrator boundary.

Continue with the [runbook](runbook.md).
