# Connecting a manifest to a kubectl command

Actual file: [20-deployment.yaml](../../manifests/20-deployment.yaml). The commands below are explained in the order you use them in the [runbook](../../runbook.md).

## Read the command parts

~~~console
kubectl -n k8s-learning-basics get deployment hello-web
~~~

| Part | Meaning |
| --- | --- |
| `kubectl` | Client program on your computer |
| `-n k8s-learning-basics` | Namespace to inspect |
| `get` | Read a resource |
| `deployment` | Resource kind |
| `hello-web` | Resource name from the YAML |

`kubectl apply -f manifests/20-deployment.yaml` uses `-f` to read a file. The file already contains the namespace. A file named `20-deployment.yaml` is not itself the resource name; `metadata.name` supplies that.

## Desired state and current state

`kubectl get deployment hello-web -o yaml` prints the live object. It includes server-generated metadata and status that the saved manifest does not contain. Use the saved file to understand what you requested and the live state to check the result.

`kubectl describe` groups configuration, conditions, and events into a readable report. `kubectl logs` shows container output; it does not read every file in the container.

## Running a command inside a Pod

~~~console
kubectl -n k8s-learning-basics exec deployment/hello-web -c web -- printenv APP_ENVIRONMENT
~~~

`deployment/hello-web` asks kubectl to choose one of that Deployment's Pods. `-c web` chooses its application container. `--` ends kubectl's own options. `printenv APP_ENVIRONMENT` executes inside the container, where BusyBox supplies the command.

After initialization has finished, `logs -c prepare-page` can still read the completed init-container log. You cannot exec into that completed container.

## Remember what an edit changes

Saving YAML locally does not submit it. Applying a manifest reconciles declared fields, so applying the release 1.0 file after a release 2.0 exercise returns the desired recipe to 1.0.

Follow [runbook step 8](../../runbook.md#8-practise-the-essential-kubectl-actions) for the operational exercise. Kubernetes context selects the cluster and identity; a namespace selects the scope within it.
