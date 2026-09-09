# Pod and container security contexts

## Concise technical summary

1. A security context sets process identity and runtime restrictions.
2. Pod settings provide defaults; applicable container settings can override them.
3. Dropped capabilities, seccomp, and disabled escalation limit different privileges.
4. A read-only root filesystem still permits writes to separately writable mounts.

Memory cue: Choose the worker, limit the tools, name the writable desk.

## Plain meaning

Maya gives a worker an ordinary staff identity, removes unnecessary master keys, and provides one writable notebook. The worker can use that notebook without being allowed to rewrite the building's instruction manuals.

## The Bookshop story

`secure-worker` runs as UID/GID 1000. It can write a note in `/work`, an `emptyDir` volume, but cannot write to the image's read-only filesystem. The exercise also checks the identity seen inside the container.

## Each control has a purpose

`runAsNonRoot` requires a non-root runtime identity; an incompatible image/user configuration can prevent startup. `fsGroup` supplies a supplementary group and can affect ownership of supported volumes. Its effect depends on the volume type and driver, rather than universally changing every mount.

`allowPrivilegeEscalation: false` prevents gaining additional privileges through execution. Linux capabilities divide privileged operations into smaller units; dropping all removes those grants. `RuntimeDefault` seccomp applies the runtime's default system-call filter. These controls complement each other. [Security context guide](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/).

This does not prove the application is secure. Image contents, credentials, API access, network access, node isolation, and writable data still matter. Adapt directories and permissions to the real application instead of weakening the whole container when it needs a cache or temporary file.

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
