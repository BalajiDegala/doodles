# Pod Security Admission: runbook

## Prerequisites

Use a supported Kubernetes cluster with Pod Security Admission available and policy rules at least as recent as v1.30. You need permission to create this separate namespace, set its labels, and create Pods. Cluster policy must permit the exercise and not exempt the testing identity/namespace from these checks.

~~~powershell
kubectl get namespace k8s-learning-admission --show-labels
~~~

Expect `NotFound` on a fresh run. If present, verify that it belongs to this lab; do not relabel someone else's namespace. If cluster rules disallow this namespace or its labels, skip the live part.

## Create the policy boundary and preview both Pods

~~~powershell
kubectl apply -f topics/38-pod-security-admission/manifests/00-namespace.yaml
kubectl get namespace k8s-learning-admission --show-labels
kubectl apply --dry-run=server -f topics/38-pod-security-admission/manifests/10-good-pod.yaml
kubectl apply --dry-run=server -f topics/38-pod-security-admission/negative/20-missing-controls.yaml
~~~

The good Pod should pass. The negative input should fail with a nonzero exit and a message identifying Restricted violations, such as missing `runAsNonRoot`, seccomp, capability dropping, or disabled privilege escalation. A generic permission denial is not evidence of Pod Security enforcement.

If the negative input passes, stop there. Review labels, server policy support, admission configuration, and exemptions with the administrator. Do not actually create the negative Pod.

## Run only the compliant Pod

~~~powershell
kubectl apply -f topics/38-pod-security-admission/manifests/10-good-pod.yaml
kubectl -n k8s-learning-admission wait --for=condition=Ready pod/admission-good --timeout=120s
kubectl -n k8s-learning-admission get pods
~~~

Expect only `admission-good` from this exercise. Admission success alone does not prove image pulling or scheduling; the readiness wait checks startup separately. Use `describe pod admission-good` for those failures.

## Cleanup

Inspect the namespace before removal. If it still contains only this disposable exercise:

~~~powershell
kubectl -n k8s-learning-admission get pods,cm,secret,pvc
kubectl delete namespace k8s-learning-admission
~~~

No policy labels on another namespace are changed.
