# How the init container prepares the page

Actual file: [20-deployment.yaml](../../manifests/20-deployment.yaml), section `spec.template.spec.initContainers`.

## Read the container declaration

`name: prepare-page` identifies the setup container. `image: busybox:1.36` supplies the shell, sed, and cp. `command: ["/bin/sh", "-c"]` runs the multiline script stored in `args`. The YAML `|` keeps the script's line breaks.

The init container receives `APP_RELEASE: "1.0"` and reads `STORE_NAME` from ConfigMap `hello-page`. It mounts the template read-only at `/template` and a writable shared volume at `/site`.

## Read each script action

| Line or part | Explanation |
| --- | --- |
| `set -eu` | Stop if an ordinary command fails or an unset variable is used |
| `sed -e ... -e ... /template/index.html` | Read the template and apply two text replacements |
| `s/{{RELEASE}}/${APP_RELEASE}/g` | Replace each release placeholder with the release environment value |
| `s/{{STORE_NAME}}/${STORE_NAME}/g` | Replace each shop-name placeholder with the name environment value |
| `> /site/index.html` | Write the generated output as the prepared homepage |
| `cp /template/healthz /site/healthz` | Copy the startup/liveness test file |
| `cp /template/ready.html /site/ready.html` | Copy the separate readiness test file |
| Final `echo` | Print which page and release were prepared |

In sed syntax, `s/old/new/g` means replace every occurrence of old with new on each line. The shell expands the environment values before sed processes the expression.

This small substitution works for our controlled sample values. Arbitrary user text can contain sed-special characters and needs proper escaping or a real template engine.

## Why the server waits

A standard init container must exit successfully before the normal web container starts. The server therefore sees the generated page when it opens its listening port.

No long-running server is started by this script. The normal container runs `httpd` afterward. The two containers share files through the volume, not through a shared container filesystem.

The same [resource and security blocks](../15-resource-management/manifest-guide.md) apply to this init container, with smaller requests and limits.

## How to see it

In [runbook step 15](../../runbook.md#15-inspect-the-init-container), `logs -c prepare-page` shows the preparation message and the init status shows `Completed`.

Changing only the ConfigMap does not rerun a completed init container. A replacement Pod gets a new emptyDir and repeats preparation. Restarting only the web container normally reuses the existing files.
