# 42. Centralized logging

## Concise technical summary

1. Applications should emit useful events to stdout and stderr.
2. Kubelet and runtime logging provide local, limited log access.
3. Collectors forward logs to searchable storage with retention rules.
4. Correlation fields connect individual events across components.

Memory cue: Write locally, ship centrally, correlate deliberately.

## Plain meaning

Each counter keeps a receipt roll. A central filing service collects those rolls so Maya can find a transaction after the counter has been replaced.

## The Bookshop story

A one-shot catalog Job writes three structured events, including a warning to stderr. We inspect them with kubectl and identify the fields a collector would preserve.

## Details and production use

Fluent Bit can run as a node-level collector, while systems such as Elasticsearch/Kibana or Loki/Grafana provide different storage/query approaches. Select a stack by query needs, retention, access, and measured cost; one backend is not universally cheaper or faster.

Centralization needs working collection, storage, and access controls. Logs from an already deleted Pod are not guaranteed through kubectl. Avoid credentials and unnecessary personal data in events, and remember that stdout/stderr interleaving is not a reliable distributed ordering mechanism.

Further reading: [Kubernetes logging architecture](https://kubernetes.io/docs/concepts/cluster-administration/logging/), [Fluent Bit Kubernetes guide](https://docs.fluentbit.io/manual/installation/kubernetes).

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
