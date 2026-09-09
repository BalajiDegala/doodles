# DaemonSets

## Concise technical summary

1. A DaemonSet runs one Pod on each eligible node.
2. It adds a Pod when another eligible node joins.
3. Common uses include node monitoring, log collection, and networking agents.
4. A Deployment controls a total replica count; a DaemonSet controls node coverage.

Memory cue: One agent per eligible node.

Read the [manifest walkthrough](manifest-guide.md) to connect these points to the YAML.

## Plain meaning

A DaemonSet asks Kubernetes to run one copy of a Pod on each eligible node. When an eligible node joins the cluster, the DaemonSet creates a Pod there. When that node leaves, its Pod disappears with it.

Imagine placing one smoke detector in every usable room. You do not ask for a total of three detectors without caring where they land. You want one in each room.

## Common uses

- Node log collection agents.
- Node monitoring agents.
- Networking components.
- Storage helpers.
- Security or policy agents that must observe each node.

Use a Deployment when the goal is a total application replica count. Use a DaemonSet when the goal is node coverage.

## Eligible nodes

"One per node" is a useful shorthand, but the precise meaning is one per **eligible** node. Node selectors, affinity rules, taints, and tolerations can affect eligibility. Control-plane nodes are commonly tainted so ordinary workloads do not run there.

## Connection to the shared project

The [DaemonSet manifest](../../manifests/40-daemonset.yaml) runs a lightweight `node-observer` Pod. Each Pod prints the name of its node every 30 seconds.

It is a learning helper, not a real monitoring agent. It intentionally has no control-plane toleration, so the scheduler respects the cluster's normal node restrictions.

The application Deployment and observer DaemonSet demonstrate the key difference:

```text
hello-web Deployment: 2 Pods total, placed on suitable nodes
node-observer DaemonSet: 1 Pod on every eligible node
```

Use [runbook step 10](../../runbook.md#10-create-the-daemonset) to compare observer Pods with nodes and read a node-name message.

Further reading: [DaemonSets](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/).
