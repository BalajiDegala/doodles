# Topology spread constraints: reading the manifests

File: [topology display Deployment](manifests/10-spread.yaml).

`replicas: 3` creates three displays. `topologyKey: kubernetes.io/hostname` groups nodes by hostname. `labelSelector.matchLabels.app: topology-counters` counts only this exercise’s replicas. `maxSkew: 1` and `whenUnsatisfiable: ScheduleAnyway` express a preference to reduce imbalance, not an availability guarantee.

The Deployment has its own selector but mounts the existing `platform-catalog-page`. It needs no new Service because this exercise observes placement. The general web/security fields are unchanged from the chapter base.

Shared fields are explained in the [chapter manifest guide](../../manifest-guide.md). Continue with the [runbook](runbook.md).
