# Native sidecar containers: runbook

Run from the chapter directory, as shown in [shared setup](../../runbook.md).

## Prerequisites

Kubernetes 1.33+ for stable native sidecars, compatible kubectl, and the shared namespace. Verify cluster support before applying.

~~~powershell
kubectl version -o yaml
kubectl apply --dry-run=server -f topics/73-native-sidecars/manifests/
kubectl apply -f topics/73-native-sidecars/manifests/
kubectl -n k8s-learning-reliability wait --for=condition=Complete job/native-report --timeout=120s
kubectl -n k8s-learning-reliability logs job/native-report -c report
kubectl -n k8s-learning-reliability logs job/native-report -c helper
kubectl -n k8s-learning-reliability get pods -l exercise=native-sidecar -o yaml
~~~

Expect Bookshop report finished and a completed Job even though the helper’s command is an endless loop. Inspect initContainerStatuses and containerStatuses separately; helper shutdown status need not match the report’s successful exit.

## Troubleshooting and cleanup

Check startup probe, marker permissions, feature support, and admission if completion fails. Do not move the helper under ordinary containers and claim equivalent behaviour.

~~~powershell
kubectl delete -f topics/73-native-sidecars/manifests/ --ignore-not-found
~~~
