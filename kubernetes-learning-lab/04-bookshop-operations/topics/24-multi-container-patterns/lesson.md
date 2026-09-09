# Multi-container patterns

## Concise technical summary

1. Containers in one Pod share its network and can mount shared volumes.
2. A sidecar adds supporting behaviour to the main application.
3. An ambassador handles connections, while an adapter converts data formats.
4. Use one Pod for tightly coupled helpers, not for every service in an application.

Memory cue: Help, connect, translate.

## Plain meaning

The shop's display and the assistant updating it share one counter. A courier desk can handle deliveries for the shop; a translator can turn supplier notes into the shop's standard format.

## The Bookshop story

A writer container refreshes a noticeboard file while a web container serves it. The writer is a sidecar-style helper. We explain ambassador and adapter roles without pretending this file writer is a proxy.

## Patterns describe responsibility

| Pattern | Bookshop example | Actual technical responsibility |
| --- | --- | --- |
| Sidecar | Helper maintains the noticeboard | Adds a supporting capability such as syncing files |
| Ambassador | Courier desk handles outgoing deliveries | Proxies outgoing connections to another system |
| Adapter | Translator standardizes supplier records | Converts logs, metrics, or other outputs |

Containers share the Pod IP and localhost port space, but not their image filesystems. They see the same files only when a shared volume is mounted in both. They have separate resource requests, limits, and logs.

This demo lists both under `containers`. Native sidecars use an entry under `initContainers` with `restartPolicy: Always`; that feature is stable from 1.33 and has special startup/shutdown and Job-completion behaviour. Do not infer native ordering guarantees for two ordinary application containers.

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).

Further reading: [Pods and shared resources](https://kubernetes.io/docs/concepts/workloads/pods/), [native sidecars](https://kubernetes.io/docs/concepts/workloads/pods/sidecar-containers/).
