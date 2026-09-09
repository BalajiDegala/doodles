# 86. Service not routing traffic to Pods: manifest walkthrough

[Fault Service](faults/10-service.yaml) selects `app: q86-missing`. [Fixed Service](fixed/10-service.yaml) selects `app: incident-catalog`. Both use frontend 80 and backend 8080. Applying the fixed manifest updates only `q86-route`.

The [shared manifest guide](../../manifest-guide.md) explains the catalog's selectors, port, resources, and security controls. Continue with the [runbook](runbook.md).
