# 99. StatefulSet Pod stuck in Terminating: manifest walkthrough

Follow Pod ownerReferences to the StatefulSet, volume claimName to the PVC, PVC volumeName to the PV, and any CSI VolumeAttachment to the node. Inspect finalizers on the object where they actually occur; PVC/PV protection is not automatically a Pod finalizer. No blind finalizer patch is provided.

The [shared manifest guide](../../manifest-guide.md) explains the catalog's selectors, port, resources, and security controls. Continue with the [runbook](runbook.md).
