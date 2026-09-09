# Chapter setup and cleanup

## Select the practice cluster

From `F:\ops2book`, open PowerShell and run:

~~~powershell
cd kubernetes-learning-lab/07-production-incidents
$ctx = kubectl config current-context
$ns = 'k8s-learning-incidents'
kubectl --context $ctx get --raw=/readyz --request-timeout=5s
kubectl --context $ctx get nodes -L kubernetes.io/os
kubectl --context $ctx get namespace $ns
~~~

Use a non-production Linux cluster and a compatible kubectl. The namespace should be absent; if it exists, verify it belongs to your prior exercise. You need permission for the base Namespace, ConfigMap, Deployment, and Service. Topic prerequisites list additional permissions. Nodes need access to `busybox:1.36`.

## Start and verify the known-good catalog

~~~powershell
kubectl --context $ctx apply -f manifests/00-namespace.yaml
kubectl --context $ctx apply --dry-run=server -f manifests/
kubectl --context $ctx apply -f manifests/
kubectl --context $ctx -n $ns rollout status deployment/incident-catalog --timeout=120s
kubectl --context $ctx -n $ns exec deployment/incident-catalog -- wget -T 3 -qO- http://incident-catalog
~~~

Expect Bookshop HTML. Do not start a fault exercise until the base is healthy. Additional quotas or admission rules may reject a lab; investigate the exact error.

## Run one incident at a time

Follow the [topic index](README.md). Keep this PowerShell session so `$ctx` and `$ns` remain defined. Stop on unexpected nonzero exits. Deliberate failures are described beside the relevant step.

Real-incident inspection needs the affected namespace/object in a separately reviewed context. Apply commands and cleanup here are exclusively for disposable lab resources.

## Cleanup

Complete topic-specific cleanup first, especially finalizers, policies, and secondary namespaces. Inspect ownership before deleting the shared namespace:

~~~powershell
kubectl --context $ctx -n $ns get deploy,rs,pods,svc,cm,secret,job,cronjob,pvc,networkpolicy
kubectl --context $ctx get namespace $ns --show-labels
kubectl --context $ctx delete namespace $ns --timeout=120s
~~~

If deletion remains pending, use question 101's investigation. Do not remove an unknown finalizer to make cleanup look successful.
