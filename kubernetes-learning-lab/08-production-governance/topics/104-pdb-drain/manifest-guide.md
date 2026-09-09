# 104. Node drain disrupts workloads despite a PDB: manifest walkthrough

[Workers](manifests/10-workers.yaml) have two replicas and selector `app: q104-workers`. [Strict PDB](faults/20-pdb.yaml) sets minAvailable=2. [Permissive PDB](fixed/20-pdb.yaml) sets minAvailable=1. Both use policy/v1. The runbook sends a policy/v1 Eviction to the Pod subresource with `dryRun=All`, including a UID precondition.

The [shared manifest guide](../../manifest-guide.md) explains the catalog's selectors, port, resources, and security controls. Continue with the [runbook](runbook.md).
