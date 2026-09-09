# Kubernetes Purpose

## Concise technical summary

1. Kubernetes manages containerized applications across a group of machines.
2. We declare the state we want, such as two web Pods.
3. Its controllers keep checking that state and replace missing managed Pods.
4. It also provides scheduling, scaling, networking, and controlled updates.

Memory cue: Declare, place, check, repair.

Read the [manifest walkthrough](manifest-guide.md) to connect these points to the YAML.

## Plain meaning

Kubernetes runs containerized applications and keeps checking that they match the result you requested.

Imagine telling a building manager, "Keep two lifts working." You do not tell the manager every minute which lift motor to start. The manager watches the building and acts when one lift stops. Kubernetes works in a similar way for application containers.

You send a desired state such as:

```text
Run two copies of my web application.
Restart failed copies.
Give the copies one stable network destination.
```

Kubernetes compares that desired state with the current state. When they differ, its controllers try to correct the difference. This repeating process is called **reconciliation**.

## Problems it helps solve

- Keeping the requested number of application copies running.
- Placing workloads on available machines.
- Replacing failed or deleted application instances.
- Giving changing instances a stable network destination.
- Rolling out a new container version in a controlled way.
- Supplying configuration without rebuilding the image.

Kubernetes does not create good application code, database backups, monitoring, or security decisions automatically. It provides building blocks for operating workloads.

## Connection to the shared project

The project declares two `hello-web` Pods in a Deployment. If you delete one Pod, Kubernetes notices that only one remains and creates a replacement.

The important idea is not the delete command. The important idea is that the requested count remains `2`, so the controller continuously works to restore it.

Use [runbook steps 5 and 8](../../runbook.md#5-create-the-application-workload) to see desired state and reconciliation.

Further reading: [Kubernetes concepts](https://kubernetes.io/docs/concepts/).
