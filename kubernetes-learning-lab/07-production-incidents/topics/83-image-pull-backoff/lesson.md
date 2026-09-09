# 83. Pod stuck in ImagePullBackOff

Source: supplied Kubernetes PDF, question 83, pages 39-40. Practice: **Fault and repair**.

## Concise technical summary

1. ImagePullBackOff delays another failed image pull.
2. Events distinguish a missing tag, denied credentials, rate limits, and connectivity failures.
3. Pull credentials must work for the scheduled node and correct registry.
4. Repair image identity or pull access, then verify imageID and readiness.

Memory cue: Read the registry error before changing credentials.

## Plain meaning

The courier cannot collect a package: perhaps the edition is wrong, the warehouse is locked, or the road is blocked. Each needs a different fix.

## The Bookshop story

The exercise requests a deliberately missing BusyBox tag in a separate Deployment, then restores the working tag. It creates no real registry credentials.

## Diagnosis and production details

Node-side DNS, proxies, TLS trust, and registry access affect pulls. A working application Pod's DNS does not prove node-side image retrieval works. Inspect `imagePullSecrets` names and Secret type without displaying credential data; the Secret must be in the Pod's namespace.

Tags can move: semantic version tags are not inherently immutable. A digest identifies content but does not authenticate its publisher. Always can reuse cached layers after resolution. IfNotPresent is a caching choice, not a universal production rule.

Read the [manifest walkthrough](manifest-guide.md) and [runbook](runbook.md).

Further reading: [Images and pull policies](https://kubernetes.io/docs/concepts/containers/images/), [Private registry pulls](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/).
