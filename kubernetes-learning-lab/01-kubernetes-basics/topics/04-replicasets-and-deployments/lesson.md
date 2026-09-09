# ReplicaSets and Deployments

## Concise technical summary

1. A ReplicaSet keeps the requested number of matching Pods running.
2. A Deployment manages ReplicaSets and application releases.
3. Changing its Pod template starts a rollout using another ReplicaSet.
4. We normally create a Deployment and let it manage the ReplicaSets and Pods.

Memory cue: Deployment manages releases; ReplicaSet maintains copies.

Read the [manifest walkthrough](manifest-guide.md) to connect these points to the YAML.

## Plain meaning

A ReplicaSet maintains a requested number of matching Pods. A Deployment manages ReplicaSets and adds application rollout and rollback behaviour.

Their ownership normally looks like this:

```text
Deployment
`-- ReplicaSet for the current application template
    |-- Pod
    `-- Pod
```

## The difference

| Resource | Main responsibility |
| --- | --- |
| ReplicaSet | Keep a specific number of Pods matching one template |
| Deployment | Manage releases by creating and controlling ReplicaSets |

When a Deployment template changes, the Deployment creates a new ReplicaSet for the new template and gradually changes the old and new Pod counts. An older ReplicaSet can also support a rollback.

For ordinary stateless applications, create a Deployment rather than a standalone ReplicaSet. The Deployment creates the ReplicaSet for you. Avoid editing or deleting a Deployment-owned ReplicaSet as a normal release method.

## Connection to the shared project

The [Deployment manifest](../../manifests/20-deployment.yaml) requests `replicas: 2`.

You create only the Deployment. Kubernetes then creates:

- One ReplicaSet owned by `hello-web`.
- Two Pods owned by that ReplicaSet.

Deleting one Pod makes the ReplicaSet temporarily short of its requested count. It creates another from the template.

Use [runbook step 5](../../runbook.md#5-create-the-application-workload) to see the ownership chain and [step 8](../../runbook.md#8-practise-the-essential-kubectl-actions) to watch replacement happen.

Further reading: [Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) and [ReplicaSets](https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/).
