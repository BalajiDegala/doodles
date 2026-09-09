# PodDisruptionBudgets: reading the manifests

Files: [one must remain](manifests/10-pdb.yaml), [hold both](variants/10-hold-all.yaml), and the shared [Deployment](../../manifests/20-deployment.yaml).

`policy/v1` is the stable PDB API. The object `bookshop-availability` selects `app: bookshop-ops`, matching the base Deployment's Pod labels. `minAvailable: 1` is an integer count, not a percentage.

With two healthy desired replicas and no disruption already in progress, expect `currentHealthy: 2`, `desiredHealthy: 1`, and `disruptionsAllowed: 1`. These are controller-computed status fields; the manifest does not author them.

The variant names the same PDB and raises `minAvailable` to two. It updates the existing object instead of adding an overlapping budget. `disruptionsAllowed` should settle at zero. Reapplying the first file restores normal practice behaviour.

The runbook generates an Eviction request for one inspected Pod. `deleteOptions.preconditions.uid` ties it to that particular Pod incarnation. The URL's `dryRun=All` asks the API server to evaluate the request without persisting the deletion. Unlike client dry-run, this exercises the server's admission path.

Continue with the [runbook](runbook.md).
