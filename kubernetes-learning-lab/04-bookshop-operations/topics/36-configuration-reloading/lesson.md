# Configuration reloading

## Concise technical summary

1. Mounted ConfigMap and Secret files can receive eventual updates.
2. The application must reread changed files to use the new values.
3. Existing environment variables and subPath mounts do not refresh this way.
4. Restarting Pods is a separate update strategy, not hot reloading.

Memory cue: Updated file plus a fresh read makes an updated response.

## Plain meaning

Maya replaces the notice on a shared board. A worker who looks again sees the new hours. A worker who memorized the morning notice keeps using the old hours until told to refresh.

## The Bookshop story

The base server reads `/www/index.html` for each request. We change the mounted page and fetch it from one identified Pod. Its response changes while its UID and restart count stay the same.

## Three different update paths

An application can reread or watch its files, accept a supported reload signal/API call, or restart with new configuration. A helper must use a mechanism the application understands. A controller that triggers a rollout implements replacement, even if its name includes "reloader."

ConfigMap volume projection is eventually updated. Delay depends on kubelet configuration and caching; do not promise a universal number of seconds. Environment values are set for a container at startup. A ConfigMap mounted using `subPath` does not receive these projected updates. [ConfigMaps reference](https://kubernetes.io/docs/concepts/configuration/configmap/).

The same distinction matters for mounted Secrets, but this exercise changes no secret material. Immutable configuration requires a different object/update strategy. Production applications must validate new configuration and decide what happens if reload fails; a static HTML file cannot demonstrate that logic.

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
