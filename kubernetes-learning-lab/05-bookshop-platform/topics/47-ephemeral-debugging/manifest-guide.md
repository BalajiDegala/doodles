# Ephemeral containers and kubectl debug: reading the manifests

File: [debug target](manifests/10-debug-target.yaml). It creates Pod `debug-counter` with container `counter`, a non-root BusyBox process, and no API token.

The runbook’s `kubectl debug` command creates ephemeral container `inspector` rather than applying another Pod manifest. `--target=counter` requests visibility into that target’s processes; `--profile=restricted` requests restrictive debug settings. `--image=busybox:1.36` chooses tools independently of the target image. The finite inspection command exits after printing process and resolver information.

No node-debug, privileged profile, or host filesystem mount is used.

Shared fields are explained in the [chapter manifest guide](../../manifest-guide.md). Continue with the [runbook](runbook.md).
