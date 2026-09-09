# Operations chapter runbook

## 1. Choose the workspace and context

From `F:\ops2book`:

~~~powershell
cd kubernetes-learning-lab/04-bookshop-operations
kubectl config current-context
kubectl cluster-info
kubectl get nodes -L kubernetes.io/os
kubectl auth can-i create namespaces
kubectl auth can-i create deployments -n k8s-learning-operations
kubectl get namespace k8s-learning-operations
~~~

Continue only on the intended non-production cluster. A `NotFound` response for the new namespace is expected. If it already exists, inspect it and confirm it belongs to this lab before applying anything. Do not take over somebody else's namespace.

The base needs Linux nodes and two small web replicas. It creates no storage, external IP, autoscaler, or cluster-wide RoleBinding.

## 2. Create the shared target

~~~powershell
kubectl apply -f manifests/00-namespace.yaml
kubectl apply --dry-run=server -f manifests/
kubectl apply -f manifests/
kubectl -n k8s-learning-operations rollout status deployment/bookshop-ops --timeout=120s
kubectl -n k8s-learning-operations get pods,svc
kubectl -n k8s-learning-operations port-forward service/bookshop-ops 8081:80
~~~

Open `http://localhost:8081`. Expect `Tiny Bookshop operations desk`. Keep that terminal running while browsing; Ctrl+C stops only the forward, not the application. A Service port-forward connects to one selected Pod, so it is not a load-balancing or NetworkPolicy proof.

If the rollout fails, inspect `kubectl -n k8s-learning-operations describe pods -l app=bookshop-ops`. Typical causes are image pull failures, insufficient requested resources, or cluster admission rules. Ask the administrator about policy failures; do not weaken existing cluster controls.

## 3. Work through topics 21-40

Open the [topic index](README.md#topic-path). All topic commands assume you are still in this chapter directory, not inside a topic folder.

Do one exercise at a time. Each topic lists additional dependencies, expected observations, and cleanup. In particular:

- Finish and remove the HPA exercise before proceeding to resource-sizing experiments.
- Remove the NetworkPolicy exercise after testing; otherwise later Helm traffic examples may be confusing.
- Never apply every topic folder recursively.
- Commands with `PASTE_...` are placeholders: replace them with the exact lab object you inspected.
- Bounded watches can be stopped with Ctrl+C. Do not interpret a timeout as proof that a feature is unsupported.

## 4. Final observations

You should be able to preview a diff, explain a Pod's real phase, observe a retry, read two containers' logs, inspect placement, and distinguish API permission from network access.

With the optional dependencies, you can also observe CPU scaling, a recommended resource size, enforced network isolation, dynamic storage binding, and admission rejection. Record skipped dependencies honestly instead of marking them successful.

## 5. Cleanup

First follow the storage topic's data warning and uninstall any Helm release from topic 32. Inspect the namespace before deleting it:

~~~powershell
kubectl -n k8s-learning-operations get deploy,pods,svc,cm,secret,pvc,job,hpa,pdb,networkpolicy,role,rolebinding,sa
kubectl get namespace k8s-learning-operations --show-labels
~~~

Only if it still contains your disposable chapter resources:

~~~powershell
kubectl delete namespace k8s-learning-operations
~~~

This removes the chapter's namespaced resources and PVCs. Depending on the reclaim policy, backing storage may also be deleted. It does not delete node groups or retained PVs; ask the administrator to review retained storage and possible costs. The separate admission namespace has its own cleanup in topic 38.
