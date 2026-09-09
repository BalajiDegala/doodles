# Canary Deployment Runbook

## Goal

Run four stable Pods and one canary Pod behind the same Service, observe mixed responses, increase canary exposure, and practise rollback.

## Dependencies

- The requirements and safety checks in the project [README](../README.md) are complete.
- No ingress controller or service mesh is required for this simplified lab.

## 1. Enter this topic folder

From the project root:

```console
cd kubernetes-learning-lab/03-canary-deployment
```

## 2. Confirm the target cluster

```console
kubectl config current-context
kubectl cluster-info
```

Stop if the context is not the cluster you intend to use.

## 3. Create the stable and canary releases

```console
kubectl apply -f manifests/00-namespace.yaml
kubectl apply -f manifests/10-configmap-stable.yaml
kubectl apply -f manifests/11-configmap-canary.yaml
kubectl apply -f manifests/20-deployment-stable.yaml
kubectl apply -f manifests/21-deployment-canary.yaml
kubectl apply -f manifests/30-service.yaml
```

Wait for both Deployments:

```console
kubectl -n k8s-learning-canary rollout status deployment/canary-web-stable --timeout=120s
kubectl -n k8s-learning-canary rollout status deployment/canary-web-canary --timeout=120s
kubectl -n k8s-learning-canary get pods -l app=canary-web --show-labels
```

Expected result: four stable Pods and one canary Pod are ready.

## 4. Inspect the shared Service

```console
kubectl -n k8s-learning-canary get service canary-web
kubectl -n k8s-learning-canary get endpointslice -l kubernetes.io/service-name=canary-web
```

The EndpointSlice should contain addresses from both groups of ready Pods.

## 5. Make repeated test connections

Run this from Windows PowerShell, Linux, or macOS. The loop executes inside one stable Pod, and every `wget` call opens a new connection to the Service:

```console
kubectl -n k8s-learning-canary exec deployment/canary-web-stable -- /bin/sh -c 'for i in $(seq 1 20); do wget -qO- http://canary-web | grep "<h1>"; done'
```

Expected result: most responses contain `Stable release 1.0`, and some contain `Canary release 2.0`.

Do not expect exactly four canary results in twenty tests. The Service does not promise an exact request percentage.

## 6. Increase canary exposure

Change the Pod counts to three stable and two canary. This gives the canary roughly two of five new connections:

```console
kubectl -n k8s-learning-canary scale deployment canary-web-stable --replicas=3
kubectl -n k8s-learning-canary scale deployment canary-web-canary --replicas=2
kubectl -n k8s-learning-canary get pods -l app=canary-web
```

Wait until all five Pods are ready, then repeat the requests. Canary responses should appear more often over a large sample, although the exact result will vary.

## 7. Practise rollback

Remove the canary from traffic by scaling it to zero, and restore four stable Pods:

```console
kubectl -n k8s-learning-canary scale deployment canary-web-canary --replicas=0
kubectl -n k8s-learning-canary scale deployment canary-web-stable --replicas=4
kubectl -n k8s-learning-canary rollout status deployment/canary-web-stable --timeout=120s
kubectl -n k8s-learning-canary get pods -l app=canary-web --show-labels
```

Repeat the HTTP test. Every response should now be stable.

## 8. Optional full promotion demonstration

For this lab, full promotion means sending all traffic to the canary Pods:

```console
kubectl -n k8s-learning-canary scale deployment canary-web-canary --replicas=4
kubectl -n k8s-learning-canary rollout status deployment/canary-web-canary --timeout=120s
kubectl -n k8s-learning-canary scale deployment canary-web-stable --replicas=0
kubectl -n k8s-learning-canary exec deployment/canary-web-canary -- /bin/sh -c 'for i in $(seq 1 10); do wget -qO- http://canary-web | grep "<h1>"; done'
```

Every new response should now show the canary release.

In a real delivery pipeline, promotion normally updates the stable Deployment to the tested image and configuration. Simply renaming or keeping a permanent "canary" Deployment is not a complete release process.

## Troubleshooting

### Only one release appears

Confirm both groups have ready Pods and the Service selects both:

```console
kubectl -n k8s-learning-canary get pods -l app=canary-web --show-labels
kubectl -n k8s-learning-canary get service canary-web -o yaml
kubectl -n k8s-learning-canary get endpointslice -l kubernetes.io/service-name=canary-web
```

The Service selector should contain `app: canary-web` and should not contain `track`.

The runbook uses a separate `wget` process for every check. Browsers and other HTTP clients can reuse a connection and stay on one Pod.

### The ratio looks wrong

Try more requests, confirm the ready Pod counts, and remember that this example balances connections rather than guaranteeing request weights.

### A release is not ready

```console
kubectl -n k8s-learning-canary get pods -l app=canary-web
kubectl -n k8s-learning-canary get events --sort-by=.metadata.creationTimestamp
kubectl -n k8s-learning-canary describe deployment canary-web-canary
```

Do not increase canary exposure until its Pods are ready and its checks pass.

## Cleanup

Remove only this lab namespace:

```console
kubectl delete namespace k8s-learning-canary
```
