# 102. Admission webhook blocks deployments cluster-wide

Source: supplied Kubernetes PDF, question 102, pages 49-50. Practice: **Read-only incident investigation**.

## Concise technical summary

1. A failing matching webhook can reject requests when failurePolicy is Fail.
2. Match scope, service endpoints, certificates, and timeout identify different blockers.
3. Ignore affects call failures; it does not override an explicit policy denial.
4. Repair the dependency or use a tightly scoped incident-approved exception.

Memory cue: Which webhook matches this request, and can it answer?

## Plain meaning

Every order needs a signature from a clerk whose office is unreachable. Removing every signature rule may reopen orders but also remove essential checks.

## The Bookshop story

Maya traces a failing catalog admission request to one named webhook. The lab does not install a broken cluster-wide webhook or weaken enforcement.

## Diagnosis and production details

Read the API error for the webhook name, operation, resource, and reason. Inspect rules, namespaceSelector/objectSelector, match conditions, failurePolicy, timeoutSeconds, sideEffects, service reference, caBundle, endpoint readiness, and certificate names/expiry. The backend may depend on resources its own webhook prevents from being recreated.

Admission and CRD conversion webhooks are different paths. FailurePolicy=Ignore fails open for call errors/timeouts; a reachable webhook's denied response remains a denial. Security-critical policies may need Fail. Do not automatically set every webhook to Ignore or delete configurations. Reduce scope or repair backend dependencies through the established incident process.

Read the [manifest walkthrough](manifest-guide.md) and [runbook](runbook.md).

Further reading: [Admission webhook good practices](https://kubernetes.io/docs/concepts/cluster-administration/admission-webhooks-good-practices/), [Dynamic admission control](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/).
