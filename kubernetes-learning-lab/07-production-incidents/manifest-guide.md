# Shared catalog fields

| File | Purpose |
| --- | --- |
| [Namespace](manifests/00-namespace.yaml) | Isolates the chapter in `k8s-learning-incidents` |
| [Page](manifests/10-page.yaml) | Supplies the static catalog HTML and teaching metric |
| [Deployment](manifests/20-deployment.yaml) | Maintains two healthy `incident-catalog` replicas |
| [Service](manifests/30-service.yaml) | Maps port 80 to named container port `http`, 8080 |

The Deployment selector, Pod label, and Service selector agree on `app: incident-catalog`. The server reads its ConfigMap at `/www`. Each replica requests 25m CPU and 32Mi memory, with limits of 100m and 64Mi. The health probe reads `/`; rollout settings permit one surge replica and zero deliberately unavailable replicas.

UID/GID 1000, RuntimeDefault seccomp, dropped capabilities, disabled escalation, a read-only image filesystem, and no automatic API token keep the exercises small and unprivileged. See the [security walkthrough](../04-bookshop-operations/topics/37-security-context/manifest-guide.md).

Topic `faults/` contains deliberate runtime failures, `fixed/` contains repairs, `negative/` is for admission rejection tests, and `optional/` needs stated dependencies. Never recursively apply this chapter.
