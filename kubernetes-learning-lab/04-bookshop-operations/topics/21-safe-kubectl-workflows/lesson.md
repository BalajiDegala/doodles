# Safe kubectl workflows

## Concise technical summary

1. Use kubectl explain to understand a field before writing it.
2. Client dry-run prepares an object; server dry-run checks it without saving it.
3. Use kubectl diff to inspect the proposed change against the cluster.
4. Apply only after checking the context, namespace, and intended difference.

Memory cue: Explain, preview, compare, apply.

## Plain meaning

Maya pencils a new sign on paper before printing it. A local preview catches obvious mistakes; the shop manager's review checks building rules. Comparing the old and new signs prevents replacing the wrong message.

## The Bookshop story

We change only the operations welcome page. The Deployment, Service, and earlier Bookshop namespace stay untouched.

## What each check proves

| Tool | Useful result | What it does not prove |
| --- | --- | --- |
| `explain` | Field documentation from the cluster's API schema | That your values suit the application |
| `--dry-run=client` | Construct and print a proposed object | Admission success, scheduling, image availability, or application health |
| `--dry-run=server` | Run server validation/defaulting/admission without persistence | That the workload can start or serve real requests |
| `diff` | Compare would-be applied state with live state | That an operator agrees with the change |

Client dry-run may still contact the server for discovery or schema information. It is not a guarantee of fully offline operation. Server dry-run requires a reachable server and appropriate permission; webhooks must support dry-run.

`kubectl diff` uses exit code 0 for no differences, 1 for differences, and greater than 1 for an error. A CI pipeline should not label every nonzero diff result a broken manifest.

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).

Further reading: [kubectl diff](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_diff/), [kubectl apply](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_apply/).
