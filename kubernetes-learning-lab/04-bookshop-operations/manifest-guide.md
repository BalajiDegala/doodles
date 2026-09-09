# Reading the operations manifests

New to YAML? Read [the foundations reader](../01-kubernetes-basics/manifest-guide.md) first. This chapter uses the same basic object structure: `apiVersion` chooses the API, `kind` chooses the resource type, `metadata` identifies it, and `spec` describes desired behaviour.

## The four base files

| File | What it contributes | Why it exists |
| --- | --- | --- |
| [00-namespace.yaml](manifests/00-namespace.yaml) | Namespace k8s-learning-operations with a chapter label | Separate names and cleanup from the first chapter |
| [10-page.yaml](manifests/10-page.yaml) | ConfigMap with index.html | Store the practice page outside the image |
| [20-deployment.yaml](manifests/20-deployment.yaml) | Two bookshop-ops Pods | A shared target for inspection, access policy, and disruption rules |
| [30-service.yaml](manifests/30-service.yaml) | ClusterIP Service on port 80 | Route to selected ready Pods on port 8080 |

The Deployment's `app: bookshop-ops` selector equals its template label. The Service uses the same label. A label is not a unique object name; several Pods intentionally share it.

## Why BusyBox again

`busybox:1.36` supplies a shell, `httpd`, `wget`, `cat`, `sleep`, and small file utilities in one image. This makes demonstrations easy to inspect without building an application image. It is not a full web application or a recommendation to run a production storefront on this server. A version tag is not an immutable digest; production image selection also needs scanning and digest pinning.

`command: ["/bin/sh", "-c"]` starts a shell and interprets the next string as a command. In the base, `exec httpd -f -p 8080 -h /www` replaces that shell with the web server:

- `exec` lets the server become the container's main process.
- `-f` keeps it in the foreground instead of detaching.
- `-p 8080` sets its listening port.
- `-h /www` makes that directory the website root.

The [earlier BusyBox walkthrough](../01-kubernetes-basics/topics/03-pods/manifest-guide.md) adds more background.

## Paths, health, and resources

`page` is a volume name. It refers to ConfigMap `bookshop-page`. Mounting it read-only at `/www` exposes the `index.html` key as `/www/index.html`. This chapter serves the ConfigMap directly; there is no init-container copy in the base.

Readiness requests `/` through the named container port `http` every five seconds. It asks whether the page can be served. There are no liveness or startup probes here: the examples do not invent a separate business-health signal. Review [the three probe meanings](../01-kubernetes-basics/topics/12-application-probes/manifest-guide.md).

Each web container requests `25m` CPU (0.025 CPU) and `32Mi` memory, with limits of `100m` and `64Mi`. Requests influence scheduling; limits constrain runtime use. Two replicas do not require two nodes. `maxSurge: 1` permits one extra desired Pod during an update; `maxUnavailable: 0` keeps the rollout from deliberately reducing available replicas.

## Repeated security fields

All ordinary runnable examples use non-root UID/GID 1000, disabled privilege escalation, dropped Linux capabilities, and the runtime's default seccomp profile. API token mounting is disabled unless explicitly needed. Writable directories are separately mounted volumes. [Topic 37](topics/37-security-context/manifest-guide.md) explains the fields and their limits.

The admission-negative example is deliberately incomplete and is submitted only with server dry-run, never applied. Optional custom resources are kept out of the base folder.

Every topic links the exact files it uses. A command-only or design topic explains the relevant existing manifest instead of adding meaningless YAML.
