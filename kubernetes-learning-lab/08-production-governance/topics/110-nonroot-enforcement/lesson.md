# 110. Container runs as root despite Pod Security enforcement

Source: supplied Kubernetes PDF, question 110, pages 54. Practice: **Controlled admission test**.

## Concise technical summary

1. Pod Security enforce, warn, and audit modes have different effects.
2. Existing Pods are not automatically restarted into compliance when namespace policy changes.
3. Restricted checks declared security fields while kubelet enforces runAsNonRoot at startup.
4. Verify live identity and investigate exemptions, admission history, and bypass paths.

Memory cue: Policy mode, admission time, runtime identity.

## Plain meaning

A new no-master-key rule at the hiring desk does not automatically replace keys already issued. Inspect both the admission rule and the worker actually on duty.

## The Bookshop story

A fresh namespace enforces Restricted v1.33. A compliant Pod runs as UID 1000, while a root-declaring input is rejected using server-side dry-run.

## Diagnosis and production details

Read the exact enforce label and pinned policy version. Warn and audit do not block creation. Check when the Pod was admitted, platform exemptions, all normal/init/ephemeral container contexts, and who may change namespace labels. Controllers can exist even when their generated Pods are rejected.

An image declaring USER root does not inherently bypass runAsNonRoot; kubelet should reject incompatible startup. Mutating admission runs before final validation, so simply stripping required fields is not a universal way around Restricted. A real UID 0 result requires investigation of effective settings, admission exemptions/history, privileged access, and runtime integrity. Restricted does not itself require readOnlyRootFilesystem.

Read the [manifest walkthrough](manifest-guide.md) and [runbook](runbook.md).

Further reading: [Pod Security Admission](https://kubernetes.io/docs/concepts/security/pod-security-admission/), [Pod Security Standards](https://kubernetes.io/docs/concepts/security/pod-security-standards/), [Security contexts](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/).
