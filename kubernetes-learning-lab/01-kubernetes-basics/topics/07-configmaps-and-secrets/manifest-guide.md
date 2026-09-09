# Reading the ConfigMap and Secret

Files: [10-configmap.yaml](../../manifests/10-configmap.yaml) and [11-secret.yaml](../../manifests/11-secret.yaml).

## ConfigMap contents

`apiVersion: v1` and `kind: ConfigMap` tell Kubernetes to store ordinary configuration. `metadata.name: hello-page` is the name the Deployment references. `data` holds string values.

| Key | Value or content | Consumer and purpose |
| --- | --- | --- |
| `APP_ENVIRONMENT` | `learning` | Web container environment; demonstrates an ordinary setting |
| `STORE_NAME` | `Tiny Bookshop` | Init-container environment; supplies the page title |
| `index.html` | Multiline HTML template | Init container generates the served homepage |
| `healthz` | Text `healthy` | Copied to the web directory for startup and liveness checks |
| `ready.html` | Text `ready` | Copied to the web directory for the readiness check |
| `books.txt` | Three book titles on separate lines | Job and CronJob read the sample catalog |

`index.html: |` means the following indented lines are one string with line breaks. The `{{STORE_NAME}}` and `{{RELEASE}}` placeholders are our own text convention. Kubernetes does not replace them; the init container's `sed` command does.

The catalog list in the HTML and `books.txt` are separate sample text values. Changing books.txt does not rebuild the list embedded in the HTML. There is no catalog database behind this page.

The health files are ordinary files whose paths our probes request. See the [health walkthrough](../12-application-probes/manifest-guide.md) for what their successful response actually proves.

## Secret contents

~~~yaml
type: Opaque
stringData:
  demo-user: learner
  demo-password: practice-only-not-a-real-password
~~~

`kind: Secret` selects the resource type. `metadata.name: hello-settings` is its reference name. `type: Opaque` means generic application data rather than a special type such as a TLS certificate.

`stringData` accepts readable strings when we submit the manifest. Kubernetes stores the corresponding data and shows it base64-encoded in the API representation. That encoding is not encryption.

These are deliberately fake credentials. The web server does not implement login, and mounting a password file does not enable authentication. The example teaches how a container receives settings.

## Why values are stored separately

Maya can supply configuration to more than one Pod without embedding it into the image. A missing required resource or key prevents the dependent container from starting correctly.

To see how each name and key connects, follow the [configuration delivery walkthrough](../13-configuration-delivery/manifest-guide.md). Use [runbook step 4](../../runbook.md#4-create-external-configuration) to create the objects.
