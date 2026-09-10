# 97. Ingress returns 502 after deployment: manifest walkthrough

[Fault Service](faults/10-service.yaml) selects healthy `governance-catalog` Pods but sets targetPort=8081. [Repair](fixed/10-service.yaml) sets 8080. No Ingress resource is installed. In an actual ingress manifest, `backend.service.port.number` would be the Service port 80, not container port 8080.

The [shared manifest guide](../../manifest-guide.md) explains the catalog's selectors, port, resources, and security controls. Continue with the [runbook](runbook.md).
