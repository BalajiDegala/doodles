# Kustomize and Helm: runbook

## Prerequisites and preview

Local rendering needs `kubectl` with Kustomize. Live practice needs the shared namespace, image access, and room for two small replicas. Run from the chapter directory.

~~~powershell
kubectl kustomize topics/35-kustomize-and-helm/base
kubectl kustomize topics/35-kustomize-and-helm/overlays/practice
~~~

Expect three resources in each output. Compare replica count 1 versus 2, base versus practice page, and identical names/selectors. There should be no changes to `bookshop-ops` or `desk-web`.

## Apply and verify

~~~powershell
kubectl apply --dry-run=server -k topics/35-kustomize-and-helm/overlays/practice
kubectl apply -k topics/35-kustomize-and-helm/overlays/practice
kubectl -n k8s-learning-operations rollout status deployment/bookshop-custom --timeout=120s
kubectl -n k8s-learning-operations get deployment bookshop-custom
kubectl -n k8s-learning-operations port-forward service/bookshop-custom 8083:80
~~~

Expect two ready replicas and `Bookshop Kustomize practice` at `http://localhost:8083`. Stop the forward with Ctrl+C.

## Restore the base

~~~powershell
kubectl apply -k topics/35-kustomize-and-helm/base
kubectl -n k8s-learning-operations rollout status deployment/bookshop-custom --timeout=120s
kubectl -n k8s-learning-operations get deployment bookshop-custom
kubectl -n k8s-learning-operations port-forward service/bookshop-custom 8083:80
~~~

Expect one ready replica and, after ConfigMap projection, the base page. Stop the forward. This restoration uses authored base files; Kustomize does not save a release revision for you.

## Troubleshooting and cleanup

A render error usually points to a relative path or a patch target that does not match. Inspect rendered output first. A stale page can be projection delay; a Service failure needs endpoint and selector checks.

~~~powershell
kubectl delete -k topics/35-kustomize-and-helm/overlays/practice --ignore-not-found
~~~

Both versions use the same identities, so this removes the three exercise objects even after restoring the base.
