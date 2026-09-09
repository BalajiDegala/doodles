# Container restart policies: reading the manifests

Files: [Always](manifests/10-always.yaml), [OnFailure](manifests/20-onfailure.yaml), [Never](manifests/30-never.yaml).

The distinguishing field is `spec.restartPolicy`. Each Pod mounts its own `emptyDir` volume as `/state`. They do not share one common disk with each other.

The command checks `test -f /state/attempted`. If the file is absent, it creates the marker, prints `First attempt failed`, and exits 1. If present, it prints `Retry completed` and exits 0.

`emptyDir` survives a container restart in that Pod, so the marker demonstrates a real retry. Deleting and recreating the Pod loses the marker and starts the experiment again.

With Always, the first failure is followed by repeated successful executions and restarts. Backoff can appear even though later exit codes are 0: a short-lived process is not a good fit for a forever-running workload.

Continue with the [runbook](runbook.md).
