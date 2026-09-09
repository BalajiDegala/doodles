# Service mesh foundations: runbook

## Prerequisites

Base setup is sufficient for the local observation. Extra mesh evidence requires an administrator-provided, already enrolled practice workload and permission to inspect its configuration/telemetry. If no mesh is available, complete the design exercise and record runtime mesh checks as skipped.

## Inspect authored and live objects

~~~powershell
kubectl get namespace k8s-learning-operations --show-labels
kubectl -n k8s-learning-operations get deployment bookshop-ops -o yaml
kubectl -n k8s-learning-operations get pods -l app=bookshop-ops -o yaml
kubectl -n k8s-learning-operations get service bookshop-ops -o yaml
kubectl -n k8s-learning-operations get endpointslices -l kubernetes.io/service-name=bookshop-ops
~~~

The authored example expects one web container per Pod and ready Service endpoints. Extra injected containers or annotations need an explanation from the platform owner. One container does not rule out an ambient mesh or other traffic infrastructure.

## Record a decision and an evidence plan

Write one sentence for each item:

| Item | Bookshop example |
| --- | --- |
| Requirement | Orders must authenticate catalog service connections |
| Intended path | Orders workload -> catalog Service -> catalog workload |
| Proof | Observed workload identity, negotiated protection, and permitted/denied requests |
| Cost | Measured CPU, memory, latency, and operations effort |
| Ownership | Team responsible for policy, certificates, upgrades, and incidents |

If an existing test mesh is provided, use its version-matched runbook with the administrator to inspect enrollment and traffic telemetry. A successful request alone does not establish mutual TLS or authorization enforcement. Do not label this chapter's namespace for injection or install mesh components here.

## Expected result, troubleshooting, and cleanup

You can distinguish authored Kubernetes networking from mesh infrastructure and name the evidence still missing. With no mesh installed, the correct result is a documented design decision plus skipped mesh runtime checks.

Read permission failures limit what can be observed; use the authored files and request the relevant evidence from the owner. These commands change nothing, so no rollback or cleanup is needed.
