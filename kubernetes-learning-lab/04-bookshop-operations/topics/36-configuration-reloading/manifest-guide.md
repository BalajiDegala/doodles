# Configuration reloading: reading the manifests

Files: [base page](../../manifests/10-page.yaml), [evening page](variants/10-page-evening.yaml), and [base Deployment](../../manifests/20-deployment.yaml).

Both page files name ConfigMap `bookshop-page` in `k8s-learning-operations`. Applying the evening variant changes `data.index.html` on that existing object. It does not patch the Deployment.

The Deployment defines `volumes[].configMap.name: bookshop-page`, then mounts that volume at `/www` with `readOnly: true`. There is no `subPath` and no init-container copy. BusyBox `httpd -h /www` opens the served file again on later requests, letting the changed projection become visible.

`readOnly: true` prevents the application from modifying its mount; it does not stop kubelet from refreshing the projected content. The HTML headline changes from the operations desk to the evening desk, making the effect recognizable in a response.

The Helm example uses a [page checksum annotation](../32-helm-packaging/manifest-guide.md) to trigger Pod replacement when chart values change. The base Deployment here has no such checksum. That difference lets this exercise prove application rereading separately from a rollout.

Continue with the [runbook](runbook.md).
