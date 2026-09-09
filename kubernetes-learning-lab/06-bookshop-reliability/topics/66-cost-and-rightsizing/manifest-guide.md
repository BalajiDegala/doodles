# 66. Cost allocation and right-sizing: reading the manifests

Read the [Deployment](../../manifests/20-deployment.yaml). Two web replicas each request `25m` CPU and `32Mi` memory, so steady requests total `50m` and `64Mi`. Their limits total `200m` and `128Mi`. Rollout surge and runtime/system overhead can add temporary or shared demand.

`team: bookshop` supports allocation only if the cost system ingests and uses it. The manifest does not express an hourly price. No request change or VPA is applied by this question; historical evidence must justify a real sizing change.

Shared fields are explained in the [chapter manifest guide](../../manifest-guide.md). Continue with the [runbook](runbook.md).
