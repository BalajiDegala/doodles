# The container inside our Pod, including BusyBox

Open [20-deployment.yaml](../../manifests/20-deployment.yaml) beside this guide. The Pod recipe is under `spec.template.spec`.

## Why we use BusyBox

BusyBox bundles small versions of common Linux commands into one executable. It is a compact toolbox, and its tools have fewer options than many full Linux equivalents. [BusyBox overview](https://www.busybox.net/about.html)

In this lab, that toolbox supplies the web server and the commands used by our examples:

| Tool | Job in the bookshop |
| --- | --- |
| `httpd` | Serve the prepared HTML files |
| `sh` | Run our small startup and batch scripts |
| `sed` and `cp` | Prepare the website in the init container |
| `wget` and `nslookup` | Test HTTP access and DNS |
| `wc`, `date`, and `echo` | Count catalog lines and print reports |

Using one small image keeps the exercises easy to follow without an application build or registry upload. Kubernetes does not require BusyBox. A real application could use its own Java, Python, Node.js, or other image. The BusyBox server here is a teaching tool, not a complete bookshop backend.

## Image and container fields

~~~yaml
- name: web
  image: busybox:1.36
  imagePullPolicy: IfNotPresent
  command: ["/bin/sh", "-c"]
  args: ["httpd -f -p 8080 -h /www"]
~~~

| Field | Meaning and reason |
| --- | --- |
| `name: web` | Name of this container inside its Pod; useful with `logs -c web` or `exec -c web` |
| `image: busybox:1.36` | The image repository and tag; `1.36` is an image version label, not a Kubernetes version |
| `imagePullPolicy: IfNotPresent` | Use the locally available image when present; otherwise download it |
| `command` | Overrides the image's normal starting command |
| `/bin/sh` | Start the Linux shell included in this image |
| `-c` | Tell that shell to execute the next string as a command |
| `args` | Supplies that command string |

An image is a packaged filesystem and program definition. A container is a running instance. A Pod is the Kubernetes unit that holds the container and its network and volume settings.

A tag can be republished, and cached tags can differ between nodes. This lab uses its existing tag for simplicity; a controlled release can use an image digest to identify exact bytes.

## Read the server command aloud

~~~text
httpd -f -p 8080 -h /www
~~~

| Part | Meaning |
| --- | --- |
| `httpd` | Start the small HTTP server |
| `-f` | Stay in the foreground while serving; a long-running container needs a foreground process |
| `-p 8080` | Listen for HTTP connections on port 8080 |
| `-h /www` | Treat /www as the folder containing the site |

The files come from the init container's prepared volume. Requesting `/` serves `/www/index.html`; requesting `/healthz` serves `/www/healthz`. BusyBox's [httpd source and usage](https://github.com/mirror/busybox/blob/1_36_stable/networking/httpd.c) documents these flags.

## The port declaration

~~~yaml
ports:
  - name: http
    containerPort: 8080
~~~

`http` is a port nickname. Probes and the Service refer to this nickname. `containerPort: 8080` describes the port; the actual server command makes the process listen. Merely adding `containerPort` cannot start a server.

## Follow the remaining Pod fields

Read the guides for [probes](../12-application-probes/manifest-guide.md), [environment and volumes](../13-configuration-delivery/manifest-guide.md), [initialization](../14-init-containers/manifest-guide.md), and [resources and security](../15-resource-management/manifest-guide.md).

Use [runbook step 6](../../runbook.md#6-inspect-pods-and-their-configuration) to inspect one running container. `exec deployment/hello-web` chooses one Pod; it does not execute in every replica.
