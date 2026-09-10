# 110. Container runs as root despite Pod Security enforcement: manifest walkthrough

[Namespace](manifests/00-namespace.yaml) is `k8s-learning-psa-review` with enforce=restricted/enforce-version=v1.33. [Good Pod](manifests/10-good.yaml) declares UID/GID 1000, runAsNonRoot, RuntimeDefault, no escalation, and dropped capabilities. [Negative Pod](negative/10-root.yaml) requests UID 0 and runAsNonRoot=false; it is for dry-run only.

The [shared manifest guide](../../manifest-guide.md) explains the catalog's selectors, port, resources, and security controls. Continue with the [runbook](runbook.md).
