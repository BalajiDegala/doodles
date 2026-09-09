# Pod affinity and anti-affinity: reading the manifests

Files: [nearby helper](manifests/10-nearby-helper.yaml) and [spread displays](manifests/20-spread-deployment.yaml).

The helper uses `podAffinity.requiredDuringSchedulingIgnoredDuringExecution`. Its `labelSelector` matches `app: bookshop-ops`. Omitted namespace selectors mean the helper's own namespace. Its `topologyKey` is `kubernetes.io/hostname`. It therefore requires placement on a node with a matching shop Pod.

The display uses `podAntiAffinity.preferredDuringSchedulingIgnoredDuringExecution`. `weight: 100` gives this preference a high weight; it is a score contribution, not "100% guaranteed." Its `podAffinityTerm` matches `app: spread-display`, so the display avoids its own replicas rather than avoiding the shop.

The display Deployment's selector and template label both use `spread-display`. Its existing ConfigMap mount still points to `bookshop-page`. No Service is created because this exercise checks placement, not exposure.

Continue with the [runbook](runbook.md).
