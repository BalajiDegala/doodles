# Rolling Releases and Rollback

## Concise technical summary

1. A rolling update gradually replaces old Pods with Pods from the new template.
2. maxSurge controls extra Pods; maxUnavailable controls allowed unavailability.
3. Readiness helps decide when a new Pod can take traffic.
4. Rollback restores an earlier Pod template, but it does not reverse database changes.

Memory cue: Add, check, replace; keep a way back.

Read the [manifest walkthrough](manifest-guide.md) to connect these points to the YAML.

## Plain meaning

Maya replaces bookshop staff one person at a time. A new worker is prepared and proven ready before an experienced worker leaves. If the new process fails, the manager returns to the previous staffing plan.

## The Tiny Bookshop strategy

The base [release 1.0 Deployment](../../manifests/20-deployment.yaml) declares:

```yaml
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxUnavailable: 0
    maxSurge: 1
```

For two desired replicas:

- `maxUnavailable: 0` keeps two ready replicas available during a healthy rollout.
- `maxSurge: 1` permits one temporary extra Pod.
- Release 2.0 changes the Pod-template version and init-container value, so the Deployment creates a new ReplicaSet.
- The readiness probe must pass before a new Pod counts as available.

The [release 2.0 manifest](../../manifests/releases/20-deployment-v2.yaml) produces a visibly different page without changing the container image. That keeps the example small while still exercising a real Pod-template rollout.

## Rollout flow

```text
Old ReplicaSet: 2 ready      New ReplicaSet: 0
Old ReplicaSet: 2 ready      New ReplicaSet: 1 starting
Old ReplicaSet: 1 ready      New ReplicaSet: 2 ready
Old ReplicaSet: 0            New ReplicaSet: 2 ready
```

Exact intermediate counts depend on timing and strategy values.

## Production details

- Use immutable image tags or image digests so a release identifies exact content.
- Make readiness accurately represent safe traffic handling.
- Watch `rollout status`, events, error rate, latency, and business signals.
- Keep old and new versions compatible with shared APIs, queues, and database schemas.
- Use expand-and-contract database changes; a Deployment rollback cannot undo a destructive schema migration.
- Keep enough revision history for operations, but remember that a revision stores a Pod template, not application data.
- A successful Kubernetes rollout only means the controller reached its declared state; it does not prove business correctness.

Use [runbook step 17](../../runbook.md#17-perform-a-rolling-release-and-rollback) to observe both ReplicaSets and return safely to release 1.0.

Further reading: [Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) and [rolling updates](https://kubernetes.io/docs/tasks/run-application/update-deployment-rolling/).
