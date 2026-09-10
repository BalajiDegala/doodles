# Project Roadmap

## Purpose

Build a topic-based Kubernetes learning library that is easy to read and safe to practise on an existing cluster.

## Content rules

Every topic should:

- Keep the concise technical summary to three or four short numbered sentences, with one main idea per sentence.
- Add a short memory cue and a concrete project example so the reader can recall and explain the idea aloud.
- Use short sentences and define new technical words.
- Start with an everyday comparison, then show the real Kubernetes meaning.
- Connect its example to the continuing project story.
- Explain why the feature exists before showing YAML.
- Link a manifest walkthrough from each lesson; explain actual field values, their purpose, dependencies, and observable effect. Share explanations of repeated settings through direct links.
- Include a small working example when the topic has something practical to demonstrate.
- State every dependency before the first command.
- Include checks that prove the example worked.
- Include common failure messages and likely fixes.
- Include rollback and cleanup when those actions make sense.
- Use a dedicated `k8s-learning-*` namespace for namespaced resources.
- Clearly mark simplified behaviour and production limitations.

## Standard topic layout

```text
topic-name/
|-- lesson.md
|-- manifest-guide.md
|-- runbook.md
`-- manifests/
    |-- 00-namespace.yaml
    |-- 10-supporting-resource.yaml
    |-- 20-workload.yaml
    `-- 30-networking-resource.yaml
```

Only include files that the topic needs. A concept-only topic may not need manifests or a runbook.

## Delivery stages

Current checkpoint: commit 6dd6a67 supplied the existing lessons through question 80, despite its stale roadmap text. Questions 40-80 have now been reviewed and questions 81-110 rewritten in the PDF order. The previous commit remains intact. See [quality review](QUALITY-REVIEW-40-110.md) and [validation evidence](VALIDATION.md).

### Stage 1 - MVP

- One shared Tiny Bookshop application covering the first twenty source topics, from cluster foundations through batch work, probes, configuration delivery, rollouts, stateful workloads, DNS, ingress, and persistent storage.
- Blue-green deployment.
- Canary deployment.
- Reusable writing and runbook structure.
- Local manifest checks.

### Stage 2 - Core platform path

- Cluster architecture.
- Pods, ReplicaSets, Deployments, and StatefulSets.
- Services, DNS, Ingress, and NetworkPolicy.
- ConfigMaps and Secrets.
- Volumes, PersistentVolumes, and StorageClasses.
- Requests, limits, probes, and autoscaling.
- Jobs and CronJobs.
- Namespaces, service accounts, and RBAC.

### Stage 3 - Day-to-day operations

- Application rollout and rollback.
- Pod, networking, DNS, image-pull, and storage troubleshooting.
- Logs, events, metrics, and useful `kubectl` commands.
- Node maintenance and workload disruption.
- Backup and recovery concepts.

### Stage 4 - Source coverage

- Build a topic index from the source material.
- Map each source topic to an existing lesson or a new folder.
- Add missing demonstrations.
- Review repeated or outdated material.

## Completion checklist for each topic

- The lesson can be understood without reading the YAML first.
- All Kubernetes terms used in commands are explained.
- Manifest names and selectors match.
- Commands use an explicit namespace.
- Expected output is described without depending on generated Pod names.
- The verification step tests actual behaviour, not only resource creation.
- Cleanup affects only resources created by the topic.
