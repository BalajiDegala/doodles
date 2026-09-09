# 93. Secret exposed in logs: incident response

Source: supplied Kubernetes PDF, question 93, pages 44-45. Practice: **Incident tabletop**.

## Concise technical summary

1. Revoke or rotate the exposed credential at its authoritative source.
2. Update consumers and verify the old credential no longer grants access.
3. Restrict log access and assess exposure while preserving required evidence.
4. Fix the logging path and prevent credentials from entering new records.

Memory cue: Revoke, replace, contain evidence, prevent recurrence.

## Plain meaning

A staff key was copied onto public receipts. Printing clean receipts now does not invalidate copies already taken.

## The Bookshop story

Maya rehearses a catalog credential leak using a worksheet. No real Secret or log payload is printed and no evidence is deleted by the exercise.

## Diagnosis and production details

Identify the credential owner, privileges, validity period, log destinations, downstream copies, access history, and any suspicious use. Changing only a Kubernetes Secret does not revoke the old credential at the database or external provider. Coordinate rotation with dependent applications; some read environment values only at startup while file consumers need reload support.

Restrict affected log access, preserve evidence under the incident/retention procedure, and arrange redaction or removal with the evidence owner. Blind deletion can destroy investigation records without removing exports or backups. Metadata-level Kubernetes auditing omits request/response bodies; it should not be blamed for logging Secret bodies. Neither environment variables nor volume mounts prevent an application from logging a value it can read.

Read the [manifest walkthrough](manifest-guide.md) and [runbook](runbook.md).

Further reading: [Good practices for Secrets](https://kubernetes.io/docs/concepts/security/secrets-good-practices/), [Kubernetes audit levels](https://kubernetes.io/docs/tasks/debug/debug-cluster/audit/).
