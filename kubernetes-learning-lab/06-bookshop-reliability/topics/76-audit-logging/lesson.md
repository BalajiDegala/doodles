# Kubernetes audit logging

## Concise technical summary

1. Audit records describe Kubernetes API activity and its caller context.
2. Audit policy selects event scope and detail using ordered rules.
3. Request and response bodies can expose sensitive values.
4. Ordinary Kubernetes Events and application logs are not substitutes for API audit records.

Memory cue: Who requested what, when, and with which result?

## Plain meaning

Maya’s office records who changed a counter plan. A worker’s error note or a customer receipt answers a different question.

## The Bookshop story

We make one harmless catalog read and define the evidence an administrator would correlate in an existing audit backend. A reference policy illustrates Metadata-level logging without enabling it.

## Details and production use

Audit levels include None, Metadata, Request, and RequestResponse. The first matching rule controls detail. Sensitive request bodies, including Secret writes and other credential-bearing objects, can be exposed by body-level logging.

Audit collection also needs a configured backend, retention, protected access, and a decision about failure handling. Managed services may expose audit logs through provider settings rather than editable API server files. A namespace’s Event list is useful operational evidence but is not the audit history of every API call.

Further reading: [Kubernetes auditing](https://kubernetes.io/docs/tasks/debug/debug-cluster/audit/).

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
