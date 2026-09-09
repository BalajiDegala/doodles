# From a saved file to a running bookshop

Read [lesson.md](lesson.md) first. The relevant file is [20-deployment.yaml](../../manifests/20-deployment.yaml).

## The statement we give Kubernetes

~~~yaml
kind: Deployment
metadata:
  name: hello-web
spec:
  replicas: 2
~~~

This says: "Keep two copies of the web Pod described by this Deployment." The full file also includes the Pod recipe under `spec.template`.

`replicas: 2` is a desired count, not a command to run once. If a managed Pod disappears, the controller still sees the desired count of two and creates a replacement.

Changing the file on your laptop does not change the cluster. `kubectl apply -f manifests/20-deployment.yaml` sends the declaration to the API server. The client reads YAML; Kubernetes controllers act on the accepted object.

## What this means for Maya

Maya can describe the staffing level once and let the platform keep checking it. She still needs enough cluster capacity and a working image. If nodes cannot run the Pods, Kubernetes reports the problem; it cannot create extra physical capacity just because the YAML asks for it.

## Read the evidence

In [runbook step 5](../../runbook.md#5-create-the-application-workload), compare `replicas: 2` with the live Deployment's desired and ready counts. In step 8, delete one practice Pod and watch a new name appear.

The full [Deployment walkthrough](../04-replicasets-and-deployments/manifest-guide.md) connects the desired count to its Pod recipe and update rules.
