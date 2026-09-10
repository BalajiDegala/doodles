# Init Containers

## Concise technical summary

1. A standard init container completes setup before application containers start.
2. If there are several, Kubernetes runs them one after another.
3. Our init container prepares the bookshop page in a shared volume.
4. The setup must be safe to repeat when a replacement Pod starts.

Memory cue: Prepare, finish, then serve.

Read the [manifest walkthrough](manifest-guide.md) to connect these points to the YAML.

## Plain meaning

Before the bookshop opens, someone arranges the window display and places the health signs. Only after that setup finishes does the server open its door. The setup worker is the init container; the continuously serving worker is the application container.

## Pod startup order

```text
Pod is scheduled
      |
      v
Init container 1 runs to completion
      |
      v
Init container 2 runs to completion, if present
      |
      v
Application containers start
```

If an init container fails, Kubernetes retries it according to Pod restart behaviour. The application container does not start with half-finished initialization.

## The Tiny Bookshop example

The `prepare-page` init container in the [Deployment](../../manifests/20-deployment.yaml):

1. Reads an HTML template from the ConfigMap volume.
2. Replaces `{{STORE_NAME}}` and `{{RELEASE}}` placeholders.
3. Writes the prepared page and probe files into a shared `emptyDir` volume.
4. Exits successfully.
5. The main BusyBox HTTP server starts and serves the prepared files.

The init and application containers use different mount paths but share the same `prepared-page` volume.

## Production details

- Keep initialization repeatable because a replacement Pod runs it again.
- Do not put a permanent background process in a standard init container.
- Avoid endless "wait for dependency" loops; use a clear timeout and failure signal.
- An init container can have tools or credentials that the main container does not receive.
- Scheduling considers init-container resources. For each resource, the Pod's effective scheduling need is the larger of the highest init-container value and the sum for normal application containers.
- Changing the init-container definition changes the Pod template and normally causes a new rollout when managed by a Deployment.

Use [runbook step 15](../../runbook.md#15-inspect-the-init-container) to read the completed init-container log and prepared files.

Further reading: [Init containers](https://kubernetes.io/docs/concepts/workloads/pods/init-containers/).
