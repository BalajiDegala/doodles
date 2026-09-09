# 96. Pod evicted due to disk pressure: manifest walkthrough

[Scratch-worker preview](manifests/10-scratch-worker.yaml) requests 20Mi ephemeral storage, limits it to 40Mi, and bounds disk-backed emptyDir at 16Mi. It writes only a small training note. The numbers illustrate accounting; they are not capacity recommendations.

The [shared manifest guide](../../manifest-guide.md) explains the catalog's selectors, port, resources, and security controls. Continue with the [runbook](runbook.md).
