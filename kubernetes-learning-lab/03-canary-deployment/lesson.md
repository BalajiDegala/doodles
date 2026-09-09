# Canary Deployment in Plain Language

## Concise technical summary

1. A canary exposes a small amount of traffic to a new release first.
2. We watch its behaviour before increasing that exposure.
3. This lab mixes stable and canary Pods behind one Service using replica counts.
4. That gives an approximate connection share; precise weights need a suitable traffic controller.

Memory cue: Small start, observe, grow or withdraw.

Read the [manifest walkthrough](manifest-guide.md) to connect these points to the YAML.

## The main idea

A canary deployment sends a small part of user traffic to a new release while most traffic stays on the stable release.

The name comes from an old safety practice in mines: a canary gave an early warning of danger. In software, the small release group can reveal errors before every user receives the change.

Imagine ten checkout counters. Nine use the proven process and one tries a new process. The team watches the new counter. If it works, more counters adopt it. If it fails, that one counter is removed from use.

## Traffic flow in this lab

```text
                         +-> 4 stable Pods
User -> one Service -----|
                         +-> 1 canary Pod
```

All five Pods have the label `app=canary-web`, and the Service selects that label. A new network connection can therefore reach any of the five ready Pods.

One canary Pod out of five total Pods gives an **approximate** 20% share of connections:

```text
canary share = canary Pods / all selected Pods
             = 1 / (4 + 1)
             = 20%
```

This is a learning shortcut, not precise weighted routing.

## The example in this folder

This lab creates:

- Namespace `k8s-learning-canary`.
- Four stable web-server Pods showing `Stable release 1.0`.
- One canary web-server Pod showing `Canary release 2.0`.
- One Service that selects both groups.

The Deployments use a second label named `track` so they can be managed separately:

| Group | Pod labels | Starting replicas |
| --- | --- | --- |
| Stable | `app=canary-web`, `track=stable` | 4 |
| Canary | `app=canary-web`, `track=canary` | 1 |

The Service selects only `app=canary-web`, so it includes both groups.

## Why the percentage is not exact

A normal Kubernetes Service balances network connections, not business requests. Results can differ from 20% because:

- A small number of tests is naturally uneven.
- HTTP keep-alive can send several requests through one existing connection.
- Unready Pods are normally excluded from Service routing.
- The networking implementation can vary between clusters.

For precise traffic percentages, gradual steps, header-based routing, or user-group routing, teams normally use an ingress controller, Gateway API implementation, service mesh, or delivery controller that supports weighted traffic.

## A safe canary needs observation

Real promotion decisions should use useful signals, such as:

- HTTP error rate.
- Response time.
- Pod restarts and resource usage.
- Business failures, such as unsuccessful payments.
- Logs and traces for the canary release.

This lab demonstrates the traffic shape. It does not install monitoring, and it should not be used as an automated production rollout strategy.

Continue with [runbook.md](runbook.md).
