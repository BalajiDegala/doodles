# Health checks, one field at a time

Actual files: [20-deployment.yaml](../../manifests/20-deployment.yaml) defines the checks; [10-configmap.yaml](../../manifests/10-configmap.yaml) supplies the sample files.

## What healthy means here

A running process can still be unable to help customers. A health check gives Kubernetes a small, specific way to assess the application. The program checking is the kubelet on the Pod's node.

In this project the test is "Can the web server return this file over HTTP?" It does not verify payments, catalog accuracy, or a database. A real application's health handler should check the condition its probe is meant to represent.

## What healthz actually is

`healthz` is an ordinary ConfigMap key containing `healthy`. The init container copies it into the shared site volume. The web container sees that file at `/www/healthz`.

~~~text
ConfigMap key healthz
      |
      v
init container copies it to the shared site volume
      |
      v
web container serves /www/healthz at http://POD_IP:8080/healthz
      |
      v
kubelet checks the HTTP response
~~~

The name `healthz` has no special Kubernetes power. We could choose another path if the server and probe both used it. Our HTTP probe checks the response status, not whether the response body spells "healthy."

## Read the actual readiness block

~~~yaml
readinessProbe:
  httpGet:
    path: /ready.html
    port: http
  periodSeconds: 5
  failureThreshold: 2
~~~

| Field | Meaning in ordinary language |
| --- | --- |
| `readinessProbe` | Decide whether this container is ready for normal Service traffic |
| `httpGet` | Make an HTTP GET request to the container through the Pod IP |
| `path: /ready.html` | Request the file served from /www/ready.html |
| `port: http` | Resolve the container's named port http to 8080 |
| `periodSeconds: 5` | Run the check roughly every five seconds |
| `failureThreshold: 2` | Mark it unready after two consecutive failed checks |

`http` in `port: http` is a nickname, not the protocol setting. HTTP is the default scheme for `httpGet`; an HTTPS scheme would be a separate field.

Unspecified `timeoutSeconds` defaults to one second. Unspecified `successThreshold` defaults to one successful check for recovery. HTTP status codes 200 through 399 count as success. [Probe configuration](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/)

## Compare the three actual checks

| Probe | Path | Timing in this manifest | Response to repeated failure |
| --- | --- | --- | --- |
| Startup | `/healthz` | Every 2 seconds, 30 failures allowed | Restart the container if startup never succeeds |
| Readiness | `/ready.html` | Every 5 seconds, 2 failures | Mark the Pod unready; normally exclude it from Service traffic |
| Liveness | `/healthz` | Every 10 seconds, 3 failures | Restart the unhealthy container |

The startup allowance is approximately `2 x 30 = 60` seconds. This is a useful planning estimate, not an exact stopwatch guarantee. Liveness and readiness wait for startup to succeed; that startup probe then stops running for this container instance.

Readiness does not depend on liveness passing after startup. Each check tests its own condition.

## Follow one failure in the bookshop

The runbook removes `/www/ready.html` in one selected Pod. The server then returns 404 for that path. Its readiness checks fail, but `/healthz` still returns a successful response, so a readiness failure alone does not restart the container.

The endpoint can remain listed in the Service's EndpointSlice with `ready: false`. Inspect conditions using `-o yaml`; do not expect its IP to disappear from the short listing. [EndpointSlice conditions](https://kubernetes.io/docs/concepts/services-networking/endpoint-slices/#conditions)

Restoring the file makes readiness succeed and allows normal routing again after updates propagate.

## Restart is different from repair

If you removed `/www/healthz`, liveness would eventually restart the web container. That file is in `emptyDir`, which survives a container restart in the same Pod. The completed init container normally does not run again merely because the web container restarts. The file would still be missing, and startup could fail repeatedly.

This is why the exercise uses the separate readiness file and explicitly restores it. A health probe detects a condition; it cannot fix arbitrary lost files or broken business data.

Use [runbook step 13](../../runbook.md#13-observe-the-three-probes) for the controlled exercise.

Memory cue: Start checks startup. Serve checks readiness. Recover uses liveness.
