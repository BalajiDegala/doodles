# Kustomize and Helm: reading the files

| File | Purpose |
| --- | --- |
| [Base kustomization](base/kustomization.yaml) | Lists three local resources and sets the operations namespace |
| [Base page](base/10-page.yaml) | Names a separate `custom-page` ConfigMap |
| [Base Deployment](base/20-deployment.yaml) | Runs one `bookshop-custom` replica and mounts `custom-page` |
| [Base Service](base/30-service.yaml) | Selects only `app: bookshop-custom` |
| [Practice overlay](overlays/practice/kustomization.yaml) | References `../../base`, changes replicas, and loads a page patch |
| [Page patch](overlays/practice/page-patch.yaml) | Matches the ConfigMap by type/name/namespace and changes `data.index.html` |

`apiVersion: kustomize.config.k8s.io/v1beta1` belongs to the build configuration. It is not a custom resource to apply to the cluster. `resources` paths resolve relative to their kustomization file.

`replicas[].name: bookshop-custom` identifies the Deployment to transform; `count: 2` replaces the base's one replica. `patches[].path` merges the selected ConfigMap fields into the base object. The other Deployment fields stay as authored and follow the [shared conventions](../../manifest-guide.md).

The output contains the same three resource identities in either version. Applying the base after the overlay therefore restores the base fields on those objects. More complicated overlays can add objects; reapplying a base does not automatically delete such extras. This example deliberately adds none.

Continue with the [runbook](runbook.md).
