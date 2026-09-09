# Chapter setup and cleanup

## 1. Choose the practice context

From `F:\ops2book`:

~~~powershell
cd kubernetes-learning-lab/05-bookshop-platform
kubectl config current-context
kubectl get --raw=/readyz --request-timeout=5s
kubectl get nodes -L kubernetes.io/os
kubectl get namespace k8s-learning-platform
~~~

Use the intended non-production cluster and compatible kubectl. A fresh namespace should return NotFound. If it exists, inspect its ownership and contents before using it. Linux nodes must be able to pull `busybox:1.36`, and you need permission to create the four base resource types.

## 2. Start the catalog

~~~powershell
kubectl apply -f manifests/00-namespace.yaml
kubectl apply --dry-run=server -f manifests/
kubectl apply -f manifests/
kubectl -n k8s-learning-platform rollout status deployment/platform-catalog --timeout=120s
kubectl -n k8s-learning-platform get pods,svc
kubectl -n k8s-learning-platform port-forward service/platform-catalog 8084:80
~~~

Open `http://localhost:8084` and expect the Bookshop platform desk. Ctrl+C stops the forward. Port-forward connects to one Pod and is not a network-policy or load-balancing test.

## 3. Complete the topics

Stay in this chapter directory for all its topic commands. Follow the [topic index](README.md#topic-path), one exercise at a time. Replace `PASTE_...` placeholders only with objects you inspected. Keep failed/skipped dependency checks distinct from successful runtime observations.

If startup fails, use `kubectl -n k8s-learning-platform describe pods -l app=platform-catalog`. Image pull errors, scheduling shortages, and policy rejection require different fixes. Do not change unrelated cluster controls to force the lab to run.

## 4. Cleanup

First complete topic-specific cleanup, including the separate quota namespace and any certificate/ExternalSecret resources. Inspect this namespace:

~~~powershell
kubectl -n k8s-learning-platform get deploy,pods,svc,cm,secret,job,pvc,networkpolicy
kubectl get namespace k8s-learning-platform --show-labels
~~~

Only if it still contains your disposable chapter resources:

~~~powershell
kubectl delete namespace k8s-learning-platform
~~~

This removes its namespaced resources. No exercise installs a cluster-wide add-on or changes a node, cloud account, or control-plane configuration.
