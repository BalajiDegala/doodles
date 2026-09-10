# 93. Secret exposed in logs: incident response: runbook

## Prerequisites

A hypothetical credential and identified application, security, and log-system owners. Optional API inspection needs only permission to read the catalog Deployment.

Use [chapter setup](../../runbook.md) first. Stay in the chapter directory; topic paths below are relative to it. The setup sets `$ctx` to the reviewed context and `$ns` to `k8s-learning-incidents`.

~~~powershell
kubectl --context $ctx -n $ns get deployment incident-catalog -o yaml
~~~

The catalog has no real provider credential. Complete a tabletop timeline:

1. Name the authoritative issuer and the operation that revokes the exposed credential.
2. State how a replacement reaches each consumer and whether it requires reload or rollout.
3. Define an old-credential rejection check and a new-credential service check that do not log either value.
4. List log replicas, exports, backups, access restrictions, and evidence-retention owner.
5. Specify the logger/redaction fix and a synthetic-value regression check.

## Verification and troubleshooting

Successful containment means the old credential is invalid, replacement consumers work, exposure scope is assessed, and new logs omit secret material. A restarted Pod or deleted log entry alone proves none of that.

## Rollback and cleanup

No live secrets or logs change. In a real incident, preserve the incident record and roll back faulty application/logging changes without restoring the compromised credential.
