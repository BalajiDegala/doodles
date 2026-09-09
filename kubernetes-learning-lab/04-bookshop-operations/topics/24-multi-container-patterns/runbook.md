# Multi-container patterns: runbook

## Prerequisites

Use the shared namespace. No native-sidecar feature or extra image is required.

## Observe both containers

~~~powershell
kubectl apply -f topics/24-multi-container-patterns/manifests/
kubectl -n k8s-learning-operations wait --for=condition=Ready pod/noticeboard --timeout=120s
kubectl -n k8s-learning-operations logs noticeboard -c writer --tail=5
kubectl -n k8s-learning-operations exec noticeboard -c web -- cat /www/index.html
kubectl -n k8s-learning-operations port-forward pod/noticeboard 8082:8080
~~~

Open `http://localhost:8082` and refresh after five seconds. The page timestamp changes while both containers remain in the same Pod. Stop the forward with Ctrl+C.

`-c writer` chooses which container's logs to read. `-c web` chooses where a command runs; it does not mean the containers have independent Pod IPs.

## Troubleshoot and clean up

If readiness stays false, inspect the writer logs and volume permissions. If port 8082 is busy, choose another local port.

~~~powershell
kubectl delete -f topics/24-multi-container-patterns/manifests/ --ignore-not-found
~~~

The generated noticeboard is disposable and is removed with the Pod.
