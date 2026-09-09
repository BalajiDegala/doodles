# The Tiny Bookshop Story

Maya owns a neighborhood bookshop. She has a small web page that shows the shop and its starter catalog. At first, one container on one computer seems enough. Then ordinary operating needs appear.

## Chapter 1 - A platform for the shop

Maya wants the site to stay available when a process fails. Kubernetes lets her declare the result she wants. The control plane records that result, chooses worker nodes, and keeps correcting differences.

The web container runs inside a Pod. A Deployment creates a ReplicaSet that maintains two Pod copies. A Service gives both replaceable Pods one stable destination.

This chapter connects topics 1-5.

## Chapter 2 - An organized workspace

The bookshop receives its own namespace and a generous quota. The page, catalog, and ordinary settings live in a ConfigMap. A practice Secret shows how a protected setting is referenced.

Maya uses a small set of `kubectl` commands to observe and operate the resources. Labels connect the Deployment and Service to the correct Pods, while annotations record human context. A DaemonSet places a tiny observer on each eligible worker node.

This chapter connects topics 6-10.

## Chapter 3 - Regular operating work

The catalog must be imported once during setup, so the project adds a Job. A catalog report must run every five minutes during the lab, so it adds a CronJob.

The public Pods now have three different health checks. Configuration enters as environment variables and volume files. An init container prepares the final website before the main server starts. Resource requests help the scheduler place Pods, and limits bound their runtime usage.

This chapter connects topics 11-15.

## Chapter 4 - Growth without losing control

Maya releases version 2.0 through a rolling update and practises returning to version 1.0. The public site remains a stateless Deployment.

A reading-list feature needs stable identity and disk data, so an optional StatefulSet receives a headless Service and one PersistentVolumeClaim per replica. Kubernetes DNS lets components find the public Service and, when storage is enabled, individual StatefulSet Pods.

An optional Ingress route demonstrates how outside HTTP traffic can reach the internal Service. It is optional because an Ingress object needs an ingress controller that is installed separately.

This chapter connects topics 16-20.

## The final picture

```text
Outside client
     |
     v
Optional Ingress and ingress controller
     |
     v
hello-web Service (stable DNS and virtual IP)
     |
     v
hello-web Deployment -> ReplicaSet -> two replaceable web Pods
                              |          |-- init container prepares the page
                              |          |-- probes report health
                              |          `-- requests and limits guide resources
                              |
ConfigMap + Secret -----------+

Catalog Job runs once
Catalog CronJob runs repeatedly
Node-observer DaemonSet covers eligible nodes

Optional headless Service
     |
     v
reading-list StatefulSet -> stable Pods -> one PVC per Pod -> persistent storage
```

The project stays small enough to understand, but every added resource solves a real problem in the same story.
