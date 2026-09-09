# ConfigMaps and Secrets

## Concise technical summary

1. A ConfigMap stores ordinary settings; a Secret stores sensitive settings.
2. Containers can receive their values as environment variables or mounted files.
3. Base64 encoding does not encrypt a Secret.
4. We protect real values with limited access, encryption at rest, and a safe delivery process.

Memory cue: Settings, secrets, delivery, protection.

Read the [manifest walkthrough](manifest-guide.md) to connect these points to the YAML.

## Plain meaning

Application code and application settings change for different reasons. Kubernetes can keep settings outside the container image:

- A ConfigMap holds ordinary, non-sensitive configuration.
- A Secret holds sensitive configuration such as a password, token, or certificate.

Imagine a rented room. The container image is the furnished room. A ConfigMap is a note showing local opening hours. A Secret is a key kept under stricter access rules. You can change the note or key without rebuilding the room.

## Connection to the shared project

The [ConfigMap](../../manifests/10-configmap.yaml) contains:

- The HTML file served by the small web server.
- The ordinary setting `APP_ENVIRONMENT=learning`.

The [Secret](../../manifests/11-secret.yaml) contains a practice-only username and password. The [Deployment](../../manifests/20-deployment.yaml) references the ConfigMap and Secret instead of placing those settings directly in the Pod template.

The ConfigMap is mounted at `/template`. The init container uses it to prepare the files served from `/www`. Selected settings and the Secret username are also injected as environment variables. The [walkthrough](manifest-guide.md) follows each key to its consumer.

## Important Secret limits

- Base64 encoding is not encryption.
- Anyone who can read a Secret through the Kubernetes API can obtain its decoded value.
- Real secrets should not be committed to source control in plain YAML.
- Production clusters should use carefully limited RBAC and encryption at rest. Many teams also use an external secret store and a controlled delivery process.

## Updates are not all immediate

Environment variables are read when a container starts, so changing a referenced ConfigMap or Secret does not change that environment variable inside an already running container. The Pod must be replaced through a controlled rollout.

Mounted ConfigMap and Secret volumes can update after a delay, depending on how they are mounted. The application must also reread the file. Plan and test configuration reload behaviour rather than assuming it.

Use [runbook steps 4 and 6](../../runbook.md#4-create-external-configuration) to create and inspect these settings safely.

Further reading: [ConfigMaps](https://kubernetes.io/docs/concepts/configuration/configmap/), [Secrets](https://kubernetes.io/docs/concepts/configuration/secret/), and [Secret good practices](https://kubernetes.io/docs/concepts/security/secrets-good-practices/).
