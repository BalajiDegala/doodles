# Image pulls and registry authentication

## Concise technical summary

1. IfNotPresent can use a locally available image.
2. Always resolves the requested image through the registry but can reuse cached content.
3. Never requires the image to be present on the chosen node.
4. Private image access needs appropriate registry credentials or a configured credential provider.

Memory cue: Resolve identity, reuse layers, authenticate separately.

## Plain meaning

Maya can use a stocked manual, check the supplier for the current edition, or insist on local stock. Having a manual on one shelf does not put it on every shelf.

## The Bookshop story

Two small workers explicitly use IfNotPresent and Always for the same BusyBox tag. We inspect the resulting image IDs and events without creating a bogus registry login.

## Details and production use

A tag can move; a digest identifies particular image content. Default pull policy is assigned when the object is created and does not automatically track later tag changes. Always does not mean redownloading every cached layer.

An imagePullSecret must be usable in the Pod’s namespace. Some platforms use kubelet credential providers or workload/node identities for registries. Do not put live tokens into commands, Git, or documentation; use the organization’s existing credential flow. Image cache alone is not authorization proof.

Further reading: [Kubernetes images](https://kubernetes.io/docs/concepts/containers/images/), [private registry image pulls](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/).

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
