# Liveness, Readiness, and Startup Probes

## Concise technical summary

1. Startup checks whether a container has finished starting before the other probes run.
2. Readiness checks whether the Pod should receive Service traffic.
3. Liveness checks whether the container needs a restart.
4. A readiness failure stops normal Service routing to that Pod; repeated startup or liveness failure triggers a restart.

Memory cue: Start, serve, recover.

Read the [manifest walkthrough](manifest-guide.md) to connect these points to the YAML.

## Plain meaning

Think about opening the bookshop each morning:

- **Startup:** Has the employee arrived and finished opening the shop?
- **Readiness:** Can the employee serve a customer right now?
- **Liveness:** Is the employee still functioning, or are they permanently stuck and in need of replacement?

Being alive and being ready are different. A database dependency might be temporarily unavailable, making an application unready for traffic, while the process itself is still healthy and should not be restarted.

## Behaviour comparison

| Probe | Main purpose | Result after repeated failure |
| --- | --- | --- |
| Startup | Give initialization enough time | Container is restarted; liveness and readiness wait until startup succeeds |
| Readiness | Decide whether traffic should reach the Pod | Pod becomes unready and is normally excluded from Service routing; container keeps running |
| Liveness | Detect a permanently stuck container | Container is restarted |

HTTP, TCP, exec, and gRPC checks are available, with some differences between probe types. A successful HTTP probe normally receives a status from 200 through 399.

## The Tiny Bookshop example

The [Deployment](../../manifests/20-deployment.yaml) uses separate files:

- Startup checks `/healthz` every two seconds with thirty consecutive failures allowed, giving an approximate sixty-second startup budget.
- Readiness checks `/ready.html`; removing it makes that Pod stop receiving Service traffic.
- Liveness checks `/healthz`; repeated failure causes a container restart.

The distinct paths make each intent visible even though the demonstration server is simple.

## Production details

- Keep liveness checks local and conservative. A failing remote dependency should not restart every application replica and create a restart storm.
- Make readiness represent the ability to serve normal traffic.
- Give startup enough time for the slowest expected valid initialization.
- Set `timeoutSeconds`, `periodSeconds`, `failureThreshold`, and `successThreshold` from measured behaviour.
- A passing probe is only one signal. It does not replace monitoring or end-to-end tests.
- Incorrect probes can make a healthy application unavailable, so failure behaviour must be tested.

Use [runbook step 13](../../runbook.md#13-observe-the-three-probes) to make one Pod unready and safely restore it.

Further reading: [Liveness, readiness, and startup probes](https://kubernetes.io/docs/concepts/workloads/pods/probes/).
