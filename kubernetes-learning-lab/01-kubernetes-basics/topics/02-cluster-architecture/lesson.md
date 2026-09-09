# Cluster Architecture

## Concise technical summary

1. The control plane coordinates the cluster; worker nodes run the applications.
2. The API server accepts requests, and etcd stores cluster state.
3. Controllers maintain resources, and the scheduler chooses nodes for new Pods.
4. On each worker, the kubelet asks the container runtime to run the assigned containers.

Memory cue: API accepts, etcd stores, scheduler places, kubelet runs.

Read the [manifest walkthrough](manifest-guide.md) to connect these points to the YAML.

## Plain meaning

A Kubernetes cluster has a decision-making side and a work-running side.

Think of a delivery company:

- The office accepts orders, records them, chooses a driver, and notices unfinished work.
- The drivers carry out those orders using vehicles.

The Kubernetes **control plane** is like the office. **Worker nodes** are like the drivers and vehicles.

## Control-plane parts

| Part | Main job |
| --- | --- |
| API server | Front door for `kubectl` and other clients |
| `etcd` | Stores cluster state |
| Scheduler | Chooses a suitable node for a new Pod |
| Controller manager | Runs control loops that correct differences from desired state |

Cloud providers often manage these parts and hide their machines. You still communicate through the API server.

## Worker-node parts

| Part | Main job |
| --- | --- |
| Kubelet | Watches assigned Pods and asks the runtime to run their containers |
| Container runtime | Starts and stops containers, commonly through containerd or CRI-O |
| Network components | Connect Pods and implement Service networking according to the cluster setup |

## What happens to the shared project

```text
kubectl sends Deployment YAML
        |
        v
API server accepts and stores the desired state
        |
        v
Deployment controller creates a ReplicaSet
        |
        v
ReplicaSet controller creates the required Pod records
        |
        v
Scheduler assigns each Pod to a suitable worker node
        |
        v
Kubelet on that node starts the web-server container
```

The control plane normally coordinates the work; it does not serve the application's web page. The containers on worker nodes serve it.

Use [runbook step 2](../../runbook.md#2-confirm-the-cluster-and-view-its-shape) to view the API endpoint and nodes, then compare Pod placement in step 6.

Further reading: [Kubernetes cluster architecture](https://kubernetes.io/docs/concepts/architecture/).
