# 79. Argo Rollouts and Flagger

## Concise technical summary

1. Progressive delivery advances a release through controlled exposure stages.
2. Argo Rollouts and Flagger use controllers and policy to manage promotion or rollback.
3. Traffic providers and analysis configuration determine actual routing and decisions.
4. Automatic rollback is only as useful as its signals and application recovery behaviour.

Memory cue: Expose, observe, decide, then advance.

## Plain meaning

Maya tries a new counter with a limited audience, checks agreed results, and expands only when the evidence supports it.

## The Bookshop story

The earlier manual canary becomes the basis for an automated decision plan. We identify the missing controller, routing integration, analysis source, and rollback semantics.

## Details and production use

Argo Rollouts introduces a Rollout resource; Flagger reconciles its canary workflow around supported workload/traffic-provider integrations. Capabilities differ by controller version and provider. A basic replica-count canary is approximate; precise configured traffic weights need the appropriate routing integration.

Useful analysis needs a baseline, minimum sample, time window, failure handling, and treatment of missing data. “No errors returned by the metrics query” can mean no traffic rather than a good release. Schema/data migrations and external effects still require an application-level recovery strategy.

Further reading: [Argo Rollouts concepts](https://argo-rollouts.readthedocs.io/en/stable/concepts/), [Flagger canary analysis](https://docs.flagger.app/usage/how-it-works).

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
