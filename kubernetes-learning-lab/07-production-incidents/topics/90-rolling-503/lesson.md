# 90. Intermittent 503 errors during rolling updates

Source: supplied Kubernetes PDF, question 90, pages 43. Practice: **Read-only investigation and reusable drill**.

## Concise technical summary

1. Termination and endpoint updates propagate through different components.
2. The application must handle TERM and finish accepted work within its grace period.
3. Readiness and routing health determine which replicas receive new traffic.
4. A preStop delay can help propagation but cannot guarantee zero failed requests.

Memory cue: Stop new work, drain accepted work, then exit.

## Plain meaning

A counter is closing while customers still follow an older direction sign. Staff need time to finish current orders and let the updated directions spread.

## The Bookshop story

Maya correlates catalog rollout times, ready endpoints, and request errors. The existing lifecycle lab supplies a contained hook/signal exercise; production traffic is not disrupted.

## Diagnosis and production details

The termination grace countdown includes preStop time. A long hook can leave too little time for application drain before forced termination. EndpointSlices expose ready/serving/terminating; routing implementations handle draining differently. Keep sufficient ready capacity during startup and shutdown.

A fixed five- or ten-second sleep is a heuristic, not a guarantee. Test keep-alive connections, load balancer deregistration, longest requests, timeout/retry policy, and application signal handling together. BusyBox httpd is a teaching server, not proof of production-grade request draining. Not every 503 is a shutdown race: unready backends and admission/capacity failures can produce gaps.

Read the [manifest walkthrough](manifest-guide.md) and [runbook](runbook.md).

Further reading: [Pod termination flow](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#pod-termination), [Container lifecycle hooks](https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/).
