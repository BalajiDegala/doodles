# kubectl Essentials

## Concise technical summary

1. kubectl sends requests to the cluster selected in kubeconfig.
2. We use apply to create or update resources from YAML.
3. We use get, describe, logs, and exec to inspect what is happening.
4. Before a change or delete, we check the context, namespace, and exact target.

Memory cue: Choose, apply, inspect, act.

Read the [manifest walkthrough](manifest-guide.md) to connect these points to the YAML.

## Plain meaning

`kubectl` is a client that sends requests to the Kubernetes API. It reads the current kubeconfig context to decide which cluster and identity to use.

It is powerful because it can change the cluster. Always read the current context and include the namespace in commands.

## Small working command set

| Action | Purpose | Shared-project example |
| --- | --- | --- |
| `apply` | Create or update the declared state from a file | `kubectl apply -f manifests/20-deployment.yaml` |
| `get` | Show a short current-state view | `kubectl -n k8s-learning-basics get pods` |
| `describe` | Show details and recent related events | `kubectl -n k8s-learning-basics describe deployment hello-web` |
| `logs` | Read container standard output and error | `kubectl -n k8s-learning-basics logs deployment/hello-web` |
| `exec` | Run a command inside a selected container | `kubectl -n k8s-learning-basics exec deployment/hello-web -- printenv` |
| `delete` | Remove an object | `kubectl -n k8s-learning-basics delete pod POD_NAME` |

The `--` in an `exec` command separates `kubectl` options from the command that runs in the container.

## Declarative habit

The manifests are the saved desired state. `kubectl apply -f ...` is preferable for repeatable project resources because the files can be reviewed and applied again.

Commands such as `scale`, `patch`, or `edit` are useful operational tools, but a later apply can return the resource to the value stored in its manifest. Keep the saved desired state and live state aligned.

## Safe habits

- Run `kubectl config current-context` before changes.
- Use `-n NAMESPACE` instead of relying on a default namespace.
- Start investigation with `get`, `describe`, `logs`, and events.
- Read a generated command or manifest before applying it.
- Delete the narrowest intended resource; never use a broad selector without checking its matches first.

[Runbook step 8](../../runbook.md#8-practise-the-essential-kubectl-actions) uses each core action on the shared project.

Further reading: [`kubectl` reference](https://kubernetes.io/docs/reference/kubectl/).
