# API request flow and admission

## Concise technical summary

1. API authentication identifies a caller and authorization checks its allowed action.
2. Applicable mutating admission can change a write request before final validation.
3. Validating admission accepts or rejects the proposed object.
4. Server dry-run evaluates supported write processing without persisting the object.

Memory cue: Who, allowed action, proposed shape, admission, persistence.

## Plain meaning

Maya checks a worker’s identity, verifies their permission to submit a plan, fills required details, and reviews the final plan before filing it.

## The Bookshop story

A disposable Pod specification is sent through server dry-run. We read the returned defaults and then verify that no Pod was created.

## Details and production use

Not every API request is an object creation; reads do not follow the same mutating admission path as writes. Defaulting, schema checks, and admission have implementation details beyond a single simple diagram. Use the model to explain responsibilities, not to claim every request has identical stages.

Webhook failure policy and timeout trade availability against enforcement. Fail-open is not universally appropriate for security controls. Dry-run requires participating webhooks to declare compatible side-effect behaviour; an unsupported webhook can cause the request to fail.

Further reading: [Admission controllers](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/), [API dry-run](https://kubernetes.io/docs/reference/using-api/api-concepts/#dry-run).

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
