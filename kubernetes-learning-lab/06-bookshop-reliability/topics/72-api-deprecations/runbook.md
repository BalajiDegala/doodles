# 72. API deprecations: runbook

Run from the chapter directory, as shown in [shared setup](../../runbook.md).

## Prerequisites

Local file access and API discovery permission. Target-version checks need a suitable test environment or approved schema/tooling.

~~~powershell
Get-ChildItem -LiteralPath manifests -Filter *.yaml | Select-String -Pattern '^apiVersion:'
kubectl api-versions
kubectl apply --dry-run=server -f manifests/
~~~

Expect the base API versions and a successful current-server preview once the namespace exists. This does not validate a future upgrade target.

## Migration record

For each flagged API, record where it appears, the replacement, field/behaviour changes, controller compatibility, target-version proof, and recovery plan. Include rendered templates and external controllers, not just top-level files.

## Cleanup

No resources are created by these checks. An unknown kind can mean a missing CRD rather than a removed core API; diagnose the exact group/version.
