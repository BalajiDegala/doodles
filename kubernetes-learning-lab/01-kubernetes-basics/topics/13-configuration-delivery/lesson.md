# Environment Variables and Configuration Volumes

## Concise technical summary

1. Environment variables give a container values when it starts.
2. ConfigMap and Secret volumes deliver values as files.
3. Mounted files can refresh later, but the application must read them again.
4. Existing environment values and files mounted with subPath do not refresh automatically.

Memory cue: Environment at start; files can refresh; apps must reread.

Read the [manifest walkthrough](manifest-guide.md) to connect these points to the YAML.

## Plain meaning

The same instruction can be delivered in two ways:

- Tell the worker once when their shift starts. This is like an environment variable.
- Put the instruction on a shared notice board that can be refreshed. This is like a mounted configuration volume.

Neither method forces the worker to notice a later change. An application must restart to receive new environment values, or must reread a changed file.

## The Tiny Bookshop example

The [Deployment](../../manifests/20-deployment.yaml) demonstrates all three paths:

| Source | Delivery | Container location |
| --- | --- | --- |
| ConfigMap `APP_ENVIRONMENT` and `STORE_NAME` | Environment variables | Process environment |
| ConfigMap page, health files, and catalog | Read-only volume | `/template` |
| Secret `demo-user` | Environment variable | `DEMO_USER` |
| Secret keys | Read-only volume | `/var/run/bookshop-secrets` |

Only a practice identity is used. The runbook lists Secret filenames without printing the password.

## Choosing a method

Environment variables are convenient for small scalar values and applications built for twelve-factor configuration. Volumes are useful for configuration files, certificates, and programs that expect filesystem paths.

Keep these limits in mind:

- Environment variables cannot change inside an already running process.
- File projection updates are eventually consistent, not instant.
- A mounted file changing does not guarantee the application reloads it.
- A container receiving a Secret as an environment variable exposes it to anything able to inspect that process environment.
- Mount or inject only the keys a container actually needs.

## Controlled configuration releases

For predictable delivery, many teams treat a configuration change like an application release: update the saved configuration, trigger a controlled Pod rollout, verify readiness, and retain a rollback path. A checksum annotation or a versioned ConfigMap name is commonly used by deployment tooling to trigger that rollout.

Use [runbook step 14](../../runbook.md#14-inspect-configuration-delivery) to compare environment and volume delivery.

Further reading: [Configure a Pod with a ConfigMap](https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/) and [Secrets](https://kubernetes.io/docs/concepts/configuration/secret/).
