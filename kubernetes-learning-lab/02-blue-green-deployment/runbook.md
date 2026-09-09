# Blue-Green Deployment Runbook

## Goal

Run blue and green releases together, move the Service from blue to green, verify the change, and practise an immediate rollback.

## Dependencies

- The requirements and safety checks in the project [README](../README.md) are complete.
- No ingress controller or service mesh is required.

## 1. Enter this topic folder

From the project root:

```console
cd kubernetes-learning-lab/02-blue-green-deployment
```

## 2. Confirm the target cluster

```console
kubectl config current-context
kubectl cluster-info
```

Stop if the context is not the cluster you intend to use.

## 3. Create both releases

```console
kubectl apply -f manifests/00-namespace.yaml
kubectl apply -f manifests/10-configmap-blue.yaml
kubectl apply -f manifests/11-configmap-green.yaml
kubectl apply -f manifests/20-deployment-blue.yaml
kubectl apply -f manifests/21-deployment-green.yaml
kubectl apply -f manifests/30-service.yaml
```

Wait for both releases:

```console
kubectl -n k8s-learning-blue-green rollout status deployment/storefront-blue --timeout=120s
kubectl -n k8s-learning-blue-green rollout status deployment/storefront-green --timeout=120s
kubectl -n k8s-learning-blue-green get pods -l app=storefront --show-labels
```

Expected result: two blue Pods and two green Pods are ready.

## 4. Verify that users receive blue

Check the active selector:

```console
kubectl -n k8s-learning-blue-green get service storefront -o jsonpath='{.spec.selector}'
```

The output contains `version:blue`.

```console
kubectl -n k8s-learning-blue-green exec deployment/storefront-blue -- wget -qO- http://storefront
```

Expected page: `Blue release 1.0`.

## 5. Check green before the switch

```console
kubectl -n k8s-learning-blue-green exec deployment/storefront-green -- wget -qO- http://localhost:8080
```

Expected page: `Green release 2.0`.

This direct check is only for the lab. In a real delivery process, automated smoke tests normally check the candidate release.

## 6. Switch all new traffic to green

```console
kubectl -n k8s-learning-blue-green patch service storefront -p '{"spec":{"selector":{"app":"storefront","version":"green"}}}'
kubectl -n k8s-learning-blue-green get service storefront -o jsonpath='{.spec.selector}'
```

```console
kubectl -n k8s-learning-blue-green exec deployment/storefront-blue -- wget -qO- http://storefront
```

Expected page: `Green release 2.0`.

## 7. Practise rollback

Point the same Service back to blue:

```console
kubectl -n k8s-learning-blue-green patch service storefront -p '{"spec":{"selector":{"app":"storefront","version":"blue"}}}'
kubectl -n k8s-learning-blue-green get service storefront -o jsonpath='{.spec.selector}'
kubectl -n k8s-learning-blue-green exec deployment/storefront-green -- wget -qO- http://storefront
```

Expected page: `Blue release 1.0`.

The rollback is quick because the blue Pods were never removed.

## 8. Switch to green again

Use this only after the green checks pass:

```console
kubectl -n k8s-learning-blue-green patch service storefront -p '{"spec":{"selector":{"app":"storefront","version":"green"}}}'
```

Do not delete blue immediately in a real rollout. Keep it for an agreed observation period so rollback remains available.

## Troubleshooting

### Green is not ready

Do not switch traffic. Inspect the Pods and events:

```console
kubectl -n k8s-learning-blue-green get pods -l app=storefront,version=green
kubectl -n k8s-learning-blue-green describe deployment storefront-green
kubectl -n k8s-learning-blue-green get events --sort-by=.metadata.creationTimestamp
```

### The page does not match the Service selector

Check the selector and matching Pods:

```console
kubectl -n k8s-learning-blue-green get service storefront -o yaml
kubectl -n k8s-learning-blue-green get pods -l app=storefront,version=green --show-labels
kubectl -n k8s-learning-blue-green get endpointslice -l kubernetes.io/service-name=storefront
```

The runbook's `wget` command creates a new connection. A long-lived application connection can continue using its earlier destination until it reconnects.

### Applying the Service manifest changes traffic back to blue

This is expected. `manifests/30-service.yaml` declares blue as the starting state. Applying it again reconciles the Service selector back to blue.

## Cleanup

Remove only this lab namespace:

```console
kubectl delete namespace k8s-learning-blue-green
```
