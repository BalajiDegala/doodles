# 84. Pod stuck in ContainerCreating: manifest walkthrough

[Waiting Pod](faults/10-worker.yaml) mounts required map `q84-settings` at `/settings`. [Dependency](fixed/10-settings.yaml) supplies `catalog: ready`. `optional: false` blocks startup while the map is missing. The mount is read-only and uses no external storage.

The [shared manifest guide](../../manifest-guide.md) explains the catalog's selectors, port, resources, and security controls. Continue with the [runbook](runbook.md).
