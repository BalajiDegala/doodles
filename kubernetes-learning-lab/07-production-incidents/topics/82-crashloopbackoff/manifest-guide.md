# 82. Pod stuck in CrashLoopBackOff: manifest walkthrough

The [fault](faults/10-worker.yaml) replaces the web command with `echo 'training: catalog configuration missing'; exit 1`. The Deployment uses Always restart behavior. The [repair](fixed/10-worker.yaml) restores the server command and probe.

The [shared manifest guide](../../manifest-guide.md) explains the catalog's selectors, port, resources, and security controls. Continue with the [runbook](runbook.md).
