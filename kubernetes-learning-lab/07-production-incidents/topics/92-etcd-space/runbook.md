# 92. etcd full: cluster writes blocked: runbook

## Prerequisites

Identify the datastore implementation first: some local distributions use a different backend, and managed control planes hide direct etcd access. etcdctl reads below are for the authorized datastore host with its existing secure endpoint/TLS configuration.

Use [chapter setup](../../runbook.md) first. Stay in the chapter directory; topic paths below are relative to it. The setup sets `$ctx` to the reviewed context and `$ns` to `k8s-learning-incidents`.

## Collect Kubernetes symptoms

~~~powershell
kubectl --context $ctx get --raw=/readyz --request-timeout=5s
kubectl --context $ctx -n $ns get events --sort-by=.metadata.creationTimestamp
~~~

A failed readyz is evidence, not proof of NOSPACE. Ask the datastore owner to correlate the error.

## Administrator read commands

With the correct version of etcdctl and preconfigured endpoint/TLS credentials, the owner can inspect:

~~~console
etcdctl endpoint status --cluster --write-out=table
etcdctl alarm list
~~~

Record the overloaded member, quota versus actual filesystem pressure, recent object churn, backup status, and approved maintenance sequence. Do not run maintenance against an unknown endpoint.

## Verification and troubleshooting

Recovery requires healthy quorum, sizes below the appropriate limits, cleared NOSPACE alarms, resumed controller progress, and a verified controlled write. The tabletop is complete when every step has an owner and version-matched procedure; it is not a live datastore recovery.

## Rollback and cleanup

Read-only investigation requires no cleanup. Compaction cannot be reversed by a manifest rollback; datastore recovery must follow the tested platform backup/restore plan.
