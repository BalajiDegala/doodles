# Helm packaging

## Concise technical summary

1. A chart packages templates, metadata, and default values.
2. Helm combines a chart with values to render Kubernetes objects.
3. A release records one installation and its revisions.
4. Hooks run extra work at selected release lifecycle events.

Memory cue: Chart is the recipe; values are choices; release is the serving.

## Plain meaning

Maya writes one opening checklist that another branch can reuse. Each branch chooses its notice and number of counters. The checklist stays recognizable, while each branch has its own operating record.

## The Bookshop story

The `desk` release starts with one morning counter. An evening values file requests two counters and a new page. A test hook fetches the Service and compares the actual response with the selected page. A rollback restores the previous release configuration.

## What Helm owns

The chart contains a ConfigMap, Deployment, Service, and test Pod. It uses only BusyBox, so it has no chart dependencies. Larger charts can declare versioned dependencies in `Chart.yaml`; dependency management should preserve a lock file for reproducibility.

Helm renders Kubernetes resources; controllers still reconcile them. A rollback restores release configuration, but does not reverse database writes or external side effects. Hooks require explicit cleanup planning and are not ordinary release resources. A pre-install hook also cannot depend on resources that the main installation has not yet created. [Using Helm](https://helm.sh/docs/intro/using_helm/), [chart hooks](https://helm.sh/docs/topics/charts_hooks/).

Use the fixed release name `desk` for this exercise. Keep the names and selectors distinct from the shared `bookshop-ops` website. Production charts also need image provenance, secret delivery, application migrations, and a policy for failed upgrades.

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
