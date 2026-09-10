# 69. Kyverno, Gatekeeper, and supply-chain policy

## Concise technical summary

1. Admission policy can enforce selected rules on incoming workload changes.
2. Kyverno and Gatekeeper provide different policy languages and controller models.
3. Image digests, signatures, provenance, and vulnerability findings answer different questions.
4. Policy effectiveness needs positive, negative, and exemption-aware checks.

Memory cue: Identify content, verify trust, enforce a clear rule.

## Plain meaning

Maya checks the exact edition of a supplier manual, its signature, and its inspection history. Knowing the edition alone does not prove the supplier is trusted.

## The Bookshop story

We review the catalog’s labels, resources, image reference, and security fields against a proposed policy. Existing policy engines are inspected only when available.

## Details and production use

Gatekeeper integrates OPA/Rego and constraint templates; Kyverno offers Kubernetes-oriented policy resources with capabilities dependent on version and rule type. Enforcement, audit/background reporting, exceptions, and existing-object coverage differ. Check the installed policy rather than assuming that a healthy controller blocks everything intended.

A digest pins content but does not authenticate its publisher. Signature/provenance checks also need a trust policy. Vulnerability results change with scanner databases and do not prove exploitability or safety by themselves. Policy rollout needs observable failure handling and a review process.

Further reading: [Kyverno documentation](https://kyverno.io/docs/), [Gatekeeper documentation](https://open-policy-agent.github.io/gatekeeper/website/docs/).

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
