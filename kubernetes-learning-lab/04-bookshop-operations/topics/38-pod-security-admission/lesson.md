# Pod Security Standards and Admission

## Concise technical summary

1. Pod Security Standards define Privileged, Baseline, and Restricted profiles.
2. Pod Security Admission evaluates Pod specifications against selected profiles.
3. Namespace labels choose enforcement, warnings, audit annotations, and versions.
4. Runtime security settings and admission policy solve related but different problems.

Memory cue: Standards are the rules; admission checks the doorway.

## Plain meaning

Maya writes a dress code and asks the entrance desk to check it. A worker's actual equipment is still a separate fact. Passing the doorway check does not prove the worker will perform every task correctly.

## The Bookshop story

A separate practice namespace enforces the Restricted profile. One Pod declares the required controls. A second intentionally omits them and is submitted only as a server dry-run; its rejection demonstrates the rule without creating the unsafe Pod.

## What gets checked

Privileged is unrestricted by this standard. Baseline rejects known privilege risks. Restricted adds controls such as non-root execution, capability dropping, restricted escalation, and seccomp. A read-only root filesystem is useful hardening but is not itself required by the Restricted standard. [Pod Security Standards](https://kubernetes.io/docs/concepts/security/pod-security-standards/).

`enforce` rejects violating Pods, `warn` returns warnings, and `audit` adds audit information. Enforce checks resulting Pods rather than rejecting a Deployment solely for its Pod template; warnings and audit can also examine workload templates. Exemptions can affect results. [Pod Security Admission](https://kubernetes.io/docs/concepts/security/pod-security-admission/).

The lesson pins enforcement to a known policy version for repeatability. This does not pin or recommend the cluster version. A real rollout of admission rules needs testing against the actual workload fleet and the organization's current policy.

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
