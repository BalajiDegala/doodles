# 78. RuntimeClass and sandboxing

## Concise technical summary

1. RuntimeClass selects a configured runtime handler for a Pod.
2. The handler must exist on eligible nodes and be supported by the runtime integration.
3. Sandboxed runtimes can strengthen isolation with compatibility and resource tradeoffs.
4. Declared overhead and scheduling constraints affect placement and accounting.

Memory cue: Choose an installed enclosure, then account for its cost.

## Plain meaning

Maya can place certain tasks in an ordinary room or a stronger enclosure. Naming an enclosure does not build it, and its walls take up space.

## The Bookshop story

We inspect the available RuntimeClasses and the catalog’s default runtime choice. No host runtime or virtualization component is installed.

## Details and production use

gVisor interposes a userspace kernel interface for supported workloads; Kata Containers commonly uses lightweight virtual machines. These designs reduce some shared-kernel risks, but neither is an unconditional guarantee against escape or every attack.

Evaluate syscall/device compatibility, startup time, observability, networking/storage support, resource overhead, and performance for the actual workload. RuntimeClass is a selection mechanism; its name alone does not prove which isolation properties are active on the node.

Further reading: [RuntimeClass](https://kubernetes.io/docs/concepts/containers/runtime-class/), [gVisor architecture](https://gvisor.dev/docs/architecture_guide/intro/), [Kata Containers](https://katacontainers.io/).

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
