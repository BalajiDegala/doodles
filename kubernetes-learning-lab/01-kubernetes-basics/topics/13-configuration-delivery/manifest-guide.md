# How settings and files reach each container

Actual file: [20-deployment.yaml](../../manifests/20-deployment.yaml).

## Follow an environment reference

~~~yaml
- name: APP_ENVIRONMENT
  valueFrom:
    configMapKeyRef:
      name: hello-page
      key: APP_ENVIRONMENT
~~~

The first `name` is the environment variable inside the container. `valueFrom` says to look up its value. `configMapKeyRef.name` identifies a ConfigMap in this namespace, and `key` identifies one entry in its data.

`APP_RELEASE` uses `value: "1.0"` directly. `STORE_NAME` uses the ConfigMap. `DEMO_USER` uses `secretKeyRef` with Secret `hello-settings` and key `demo-user`. Each container has its own environment; giving STORE_NAME to the init container does not automatically give it to the web container.

These particular web-container values demonstrate injection. The static HTTP server does not automatically change its page or enable login because an environment variable exists.

## Volumes are sources; mounts are locations

| Volume name | Source | Init-container location | Web-container location |
| --- | --- | --- | --- |
| `page-template` | ConfigMap `hello-page` | `/template`, read-only | `/template`, read-only |
| `prepared-page` | `emptyDir: {}` | `/site`, writable | `/www`, writable |
| `credentials` | Secret `hello-settings` | Not mounted | `/var/run/bookshop-secrets`, read-only |

`spec.template.spec.volumes` declares the sources available to the Pod. Each container's `volumeMounts` chooses which source to use and where to see it.

The matching volume `name` connects declaration and mount. The directory names do not have to match between containers. The init container's `/site/index.html` and the web container's `/www/index.html` are the same shared file.

Each web Pod gets its own emptyDir. The two replicas do not share one writable website directory.

## Secret file permissions

~~~yaml
secret:
  secretName: hello-settings
  defaultMode: 0440
~~~

`secretName` is the object reference. `0440` is an octal Linux permission value: owner and group can read, others have no access, and no write bit is requested. The Pod's `fsGroup: 1000` supports group access to mounted files. Actual filesystem permissions also depend on kubelet volume ownership handling.

The credentials are mounted outside `/www`. The HTTP server therefore does not serve them as website files. See [security settings](../15-resource-management/manifest-guide.md#shutdown-and-security-fields).

## A configuration update is not always a page update

The mounted ConfigMap files can refresh after a delay; environment variables inside existing containers do not. Application code must reread refreshed files. [ConfigMap updates](https://kubernetes.io/docs/concepts/configuration/configmap/)

There is another step in this project: the init container copies the template to emptyDir only during initialization. A later template refresh does not regenerate `/www/index.html`. Replace Pods through a controlled rollout to rerun preparation.

`emptyDir` survives a container restart but is lost when its Pod is removed. Persistent storage is covered in [topic 20](../20-persistent-storage/manifest-guide.md).

Use [runbook step 14](../../runbook.md#14-inspect-configuration-delivery) to compare mounted filenames and environment values.
