# 105. API server overloaded: slow kubectl and timeouts

Source: supplied Kubernetes PDF, question 105, pages 51-52. Practice: **Read-only control-plane investigation**.

## Concise technical summary

1. Slow requests can arise in the API server, admission, datastore, or network.
2. Measure latency and errors by operation/resource before blaming object count alone.
3. Noisy clients should use efficient watches, bounded retries, and scoped lists.
4. API Priority and Fairness allocates request capacity but cannot fix slow storage.

Memory cue: Locate the queue, then identify its producer.

## Plain meaning

Head office has a long queue. The bottleneck might be the receptionist, a required reviewer, or the archive; hiring another receptionist alone may not help.

## The Bookshop story

Maya samples one small catalog read with a timeout and compares it with an administrator dashboard. The exercise does not stress the API or enumerate all Pods repeatedly.

## Diagnosis and production details

Distinguish connection/TLS delays, server 429 throttling, client-side rate limiting, webhook latency, and etcd commit/read latency. Correlate apiserver request duration/counts, APF queues, admission metrics, etcd disk latency, and controller workqueue backlog. Relevant metric availability depends on version and access.

A runaway reconciler's retry/list loop can create high churn even with modest steady object counts. Pagination bounds responses but does not make an endless repeated full scan cheap. APF is normally already present on modern clusters; verify effective flow schemas and priority levels rather than blindly enabling or retuning it.

Read the [manifest walkthrough](manifest-guide.md) and [runbook](runbook.md).

Further reading: [API Priority and Fairness](https://kubernetes.io/docs/concepts/cluster-administration/flow-control/), [System component metrics](https://kubernetes.io/docs/concepts/cluster-administration/system-metrics/).
