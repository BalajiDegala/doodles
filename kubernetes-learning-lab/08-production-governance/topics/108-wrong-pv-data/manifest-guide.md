# 108. Production accidentally mounts staging PV data: manifest walkthrough

PVC spec.volumeName locates the PV. PV spec.claimRef identifies the intended claim, and the CSI volumeHandle identifies provider storage. storageClassName, selector, accessModes, and volumeMode affect matching; they do not prove data identity. No PV/PVC mutation manifest is supplied.

The [shared manifest guide](../../manifest-guide.md) explains the catalog's selectors, port, resources, and security controls. Continue with the [runbook](runbook.md).
