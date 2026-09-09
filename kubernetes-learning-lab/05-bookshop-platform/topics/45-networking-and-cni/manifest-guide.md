# Networking and CNI plugins: reading the manifests

Read the [Deployment](../../manifests/20-deployment.yaml) and [Service](../../manifests/30-service.yaml).

`containerPort: 8080` documents the HTTP port; the process actually listens because its command starts httpd there. The Service’s `port: 80` and `targetPort: http` describe forwarding to those Pod listeners. The cluster assigns Service and Pod addresses; the manifests do not hardcode them.

No CNI manifest is supplied. Installing another network provider is a cluster-wide change, not a repair for one failed request. NetworkPolicy is revisited in question 75 with real allow/deny traffic checks.

Shared fields are explained in the [chapter manifest guide](../../manifest-guide.md). Continue with the [runbook](runbook.md).
