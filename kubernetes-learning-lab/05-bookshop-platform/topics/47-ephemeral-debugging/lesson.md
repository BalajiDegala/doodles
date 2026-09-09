# Ephemeral containers and kubectl debug

## Concise technical summary

1. An ephemeral container adds debugging tools to an existing Pod.
2. It shares the Pod network but has its own image filesystem.
3. Target-process visibility depends on runtime support and permissions.
4. A completed ephemeral container is not individually removed or restarted.

Memory cue: Borrow tools; preserve the evidence; replace the lab Pod to reset.

## Plain meaning

An inspector brings a toolbox into Maya’s counter room. Sharing the room does not make the inspector’s toolbox identical to the worker’s cupboards.

## The Bookshop story

We create a disposable sleeping worker, attach a restricted inspector, and inspect its process/network view. The main catalog remains separate.

## Details and production use

Ephemeral containers are useful when an application image lacks a shell. They use a special Pod subresource and require appropriate authorization/admission. They are not ordinary extra Deployment containers and do not support the full ordinary-container configuration surface.

The target flag requests process-namespace targeting where supported; it is not a promise of filesystem access or elevated privileges. Exiting ends the inspector process but leaves its recorded specification/status on the Pod. Reset the disposable Pod for another clean exercise.

Further reading: [Debug running Pods](https://kubernetes.io/docs/tasks/debug/debug-application/debug-running-pod/), [ephemeral containers](https://kubernetes.io/docs/concepts/workloads/pods/ephemeral-containers/).

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
