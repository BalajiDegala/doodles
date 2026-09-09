# Validation checkpoint

Date: 2026-09-09. Content checkpoint: source topics 1-40, plus blue-green and canary examples.

## Local validation

Result: passed. The final audit covered 118 Markdown files, 440 local links/anchors, 70 non-template YAML files containing 66 resource documents, and 14 rendered Helm/Kustomize documents. All 66 PowerShell command blocks in the operations chapter also parsed without syntax errors. Shell parsing does not execute the commands or verify their runtime outcomes.

The workspace audit checks Markdown file links and heading anchors, parses ordinary YAML, checks Deployment selectors and Service target ports, resolves authored configuration/storage/account references, and verifies the operations workloads' declared security controls. StatefulSet claim templates are included when resolving mounted volumes. The deliberately incomplete admission input is excluded only from the ordinary security-control check.

The audit also checks that all twenty operations topics contain a lesson, manifest guide, runbook, four concise technical points, and a memory cue. These checks establish local consistency; they are not full Kubernetes API schema or admission validation.

Helm 4.0.5 and kubectl 1.34.1 with Kustomize 5.7.1 were available locally. From `04-bookshop-operations`, the rendering checks are:

~~~powershell
helm lint topics/32-helm-packaging/chart --strict
helm lint topics/32-helm-packaging/chart --strict -f topics/32-helm-packaging/values-evening.yaml
helm template desk topics/32-helm-packaging/chart -n k8s-learning-operations
helm template desk topics/32-helm-packaging/chart -n k8s-learning-operations -f topics/32-helm-packaging/values-evening.yaml
kubectl kustomize topics/35-kustomize-and-helm/base
kubectl kustomize topics/35-kustomize-and-helm/overlays/practice
~~~

Both Helm values sets pass strict lint and render four documents each, including the test hook. Both Kustomize configurations render three resources. The audit verifies morning/base replica count 1, evening/practice count 2, the changed Helm page checksum, the patched Kustomize page, and identical Kustomize resource identities for restoration.

Helm 3 compatibility uses common chart/CLI features but has not been executed with a Helm 3 binary. Test Pods are retained until the next test or explicit cleanup so their logs remain inspectable.

## Live validation still required

The selected `rancher-desktop` context points to `https://127.0.0.1:6443`. The API connection was refused during this checkpoint. No lab resources were applied and no successful server dry-run or runtime result is claimed.

Once the practice cluster is available, follow the [operations runbook](04-bookshop-operations/runbook.md) and each topic's prerequisite checks. The main remaining evidence is:

| Area | Runtime evidence to collect |
| --- | --- |
| Base and ordinary Pods | Admission, image pulls, readiness, page responses, lifecycle/restart observations |
| Placement and capacity | Node placement, available metrics, bounded HPA changes, optional VPA recommendations |
| Access | Allowed/blocked/restored network traffic and allowed/denied RBAC checks |
| Packaging | Helm installation/test/upgrade/rollback and Kustomize apply/base restoration |
| Storage and disruption | Bound claim, retained note after Pod replacement, allowed/blocked dry-run evictions |
| Reload and security | Changed page on unchanged Pod, filesystem restrictions, positive/negative admission results |
| Shutdown and mesh | Hook/signal observations; mesh-specific checks only where an existing test mesh is provided |

Record missing add-ons as skipped dependencies. The concept-only orchestration and mesh exercises can be completed from authored files; they do not establish a deployed Swarm, ECS, or mesh environment.

The full current content map is in [COVERAGE.md](COVERAGE.md).
