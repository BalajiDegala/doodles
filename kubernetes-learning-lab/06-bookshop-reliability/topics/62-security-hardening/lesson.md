# Security hardening and kube-bench

## Concise technical summary

1. Hardening reduces unnecessary privileges and exposed attack surfaces.
2. Benchmarks describe checks whose applicability depends on the platform and version.
3. kube-bench evaluates accessible configuration against supported CIS benchmark checks.
4. Passing configuration checks does not prove complete runtime or application security.

Memory cue: Choose the right benchmark; collect evidence; fix the actual gap.

## Plain meaning

Maya checks doors, staff keys, and the building’s inspection report. A passed building inspection does not prove every worker or transaction is safe.

## The Bookshop story

We review the catalog’s non-root settings, token exposure, network boundaries, and image identity. Node-level benchmark execution stays with the platform owner.

## Details and production use

A benchmark report must identify its version, target distribution, permissions, skipped tests, and manual checks. Managed control planes can hide settings that a tenant-side scanner cannot inspect. “Not checked” and “passed” are different results.

Runtime detection, image vulnerability review, RBAC, admission, and network policy address other layers. Prioritize changes by exposure and evidence, then verify the workload still functions. Do not deploy a privileged host-scanning Job merely to make a report available for this chapter.

Further reading: [kube-bench project](https://github.com/aquasecurity/kube-bench), [Kubernetes security checklist](https://kubernetes.io/docs/concepts/security/security-checklist/).

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
