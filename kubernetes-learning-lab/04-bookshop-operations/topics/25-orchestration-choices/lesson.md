# Orchestration choices

## Concise technical summary

1. Kubernetes provides an extensible API for operating container workloads.
2. Docker Swarm provides orchestration built into Docker Engine.
3. Amazon ECS is an AWS-managed orchestration service with AWS integrations.
4. Choose using your team's needs and operating model, not a claim that one tool always wins.

Memory cue: Same containers; different operating responsibilities.

## Plain meaning

Maya can rent a customizable workshop, use a simpler shared workshop, or choose a managed shop service. The right option depends on what she needs and who will operate it.

## The Bookshop story

The team already has Kubernetes, so the Bookshop labs use it. That fact does not prove every small website needs a Kubernetes cluster.

## Compare actual responsibilities

| Dimension | Kubernetes | Docker Swarm | Amazon ECS |
| --- | --- | --- | --- |
| Workload model | Pods and controllers such as Deployments | Services and tasks | Task definitions, tasks, and services |
| Main configuration | Kubernetes API objects | Docker service/stack configuration | ECS API/task definitions |
| Platform scope | Many distributions and hosting options | Docker Engine clusters | AWS-managed control plane |
| Extensions | CRDs, controllers, and ecosystem add-ons | Docker-oriented orchestration features | AWS integrations and service capabilities |

Swarm supports desired replica counts and service updates; it is not merely a way to run a single container. ECS can run on different capacity options, including external machines through ECS Anywhere, so "AWS-only machines" is an inaccurate shortcut. Its management model remains tied to ECS.

Portability is not automatic: cloud storage, load balancers, IAM, and add-ons can couple a Kubernetes workload to a platform too. Compare staffing, compliance, reliability needs, existing skills, ecosystem requirements, and total operating cost. Avoid unsupported community-size or performance rankings.

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).

Further reading: [Swarm concepts](https://docs.docker.com/engine/swarm/key-concepts/), [ECS overview](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html), [ECS Anywhere](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/launch-type-external.html).
