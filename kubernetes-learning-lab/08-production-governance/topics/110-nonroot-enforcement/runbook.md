# 110. Container runs as root despite Pod Security enforcement: runbook

## Prerequisites

Kubernetes supporting Restricted v1.33 rules and an enabled PodSecurity admission controller without an exemption for this test. Permission for the fresh namespace and Pod operations; Linux nodes and the teaching image.

Use [chapter setup](../../runbook.md) first. Stay in the chapter directory; topic paths below are relative to it. The setup sets `$ctx` to the reviewed context and `$ns` to `k8s-learning-governance`.

~~~powershell
kubectl --context $ctx get namespace k8s-learning-psa-review
kubectl --context $ctx apply -f topics/110-nonroot-enforcement/manifests/00-namespace.yaml
kubectl --context $ctx apply --dry-run=server -f topics/110-nonroot-enforcement/manifests/10-good.yaml
kubectl --context $ctx apply --dry-run=server -f topics/110-nonroot-enforcement/negative/10-root.yaml
~~~

The negative dry-run must fail specifically for Restricted policy. Do not continue and claim enforcement if it succeeds.

~~~powershell
kubectl --context $ctx apply -f topics/110-nonroot-enforcement/manifests/10-good.yaml
kubectl --context $ctx -n k8s-learning-psa-review wait --for=condition=Ready pod/q110-good --timeout=120s
kubectl --context $ctx -n k8s-learning-psa-review exec q110-good -- id
kubectl --context $ctx -n k8s-learning-psa-review get pod q110-good -o yaml
kubectl --context $ctx -n k8s-learning-psa-review get pod q110-root
~~~

## Verification and troubleshooting

Expect UID 1000, non-root live fields, a specific admission rejection for the negative input, and NotFound for q110-root. This checks one path; it does not prove absence of privileged/exempt workloads elsewhere.

## Rollback and cleanup

After verifying this namespace contains only the training Pod:

~~~powershell
kubectl --context $ctx delete namespace k8s-learning-psa-review --timeout=120s
~~~

The source namespace's policy was never changed; no rollback to permissive production labels is needed.
