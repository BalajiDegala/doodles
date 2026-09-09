# ResourceQuota and LimitRange: reading the manifests

Files: [namespace](manifests/00-namespace.yaml), [LimitRange](manifests/10-limitrange.yaml), [quota](manifests/20-quota.yaml), [first Pod](workloads/budget-one.yaml), [second Pod](workloads/budget-two.yaml), [too-large input](negative/too-large.yaml), and [extra-Pod input](negative/budget-extra.yaml).

LimitRange defaults each container to requests `25m/32Mi` and limits `100m/64Mi`. Its maximum is `200m/128Mi`. The quota allows only two Pods, alongside CPU/memory totals. The two ordinary inputs omit resources deliberately so admission can add defaults.

The too-large input asks for `250m` CPU and a `300m` limit, exceeding the per-container maximum. The extra Pod fits the per-container rules but becomes the third Pod after the two actual workloads exist. Keep both negative inputs out of apply commands.

Shared fields are explained in the [chapter manifest guide](../../manifest-guide.md). Continue with the [runbook](runbook.md).
