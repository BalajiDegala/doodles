# Resource Requests and Limits

## Concise technical summary

1. Requests tell the scheduler how much CPU and memory to allow for.
2. Limits set runtime boundaries for the container.
3. CPU limits can slow a container through throttling; memory limits can cause an OOM termination.
4. We choose values from measurements and leave enough room for startup and normal traffic.

Memory cue: Request to place; limit to contain.

Read the [manifest walkthrough](manifest-guide.md) to connect these points to the YAML.

## Plain meaning

A request is the counter space the bookshop promises a worker so the manager can place them. A limit is the maximum space that worker may consume. Promising too much leaves useful space empty. Promising too little creates crowding when the shop becomes busy.

## CPU and memory behaviour

| Setting | Scheduler use | Runtime effect |
| --- | --- | --- |
| CPU request | Reserves scheduling capacity and influences CPU share during contention | The container may use more when capacity is available |
| CPU limit | Not the primary placement promise | CPU time is throttled near the ceiling |
| Memory request | Reserves scheduling capacity | Usage above the request is possible, but becomes vulnerable under node pressure |
| Memory limit | Not the primary placement promise | Exceeding it can terminate a process with an OOM event |

`1000m` CPU is one CPU. `25m` is 0.025 CPU. Memory values such as `32Mi` use binary units.

## The Tiny Bookshop example

The web container requests `25m` CPU and `32Mi` memory, with limits of `100m` and `64Mi`. The init container and the other example workloads also declare small values.

These are demonstration values, not recommendations for a real web application. Real values require load tests and production measurements.

## Production details

- The scheduler places a Pod based on requested capacity, not current low usage.
- All application-container requests in a Pod are added for scheduling; init containers use effective-resource rules described in the init lesson.
- Namespace LimitRanges can provide defaults or allowed ranges.
- ResourceQuota can cap the namespace total.
- QoS class depends on the relationship between requests and limits and can influence eviction behaviour.
- `kubectl top` requires the Metrics API, commonly provided by metrics-server.
- Watch throttling, working-set memory, OOM events, latency, and node pressure before tuning.

Use [runbook step 16](../../runbook.md#16-inspect-resource-requests-and-limits) to inspect declared values and, when available, live metrics.

Further reading: [Resource management for Pods and containers](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/).
