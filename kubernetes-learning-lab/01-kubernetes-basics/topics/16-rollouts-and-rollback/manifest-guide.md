# Comparing the release 1.0 and 2.0 manifests

Open [20-deployment.yaml](../../manifests/20-deployment.yaml) and [20-deployment-v2.yaml](../../manifests/releases/20-deployment-v2.yaml).

## What stays connected

Both files target Deployment `hello-web` in namespace `k8s-learning-basics`. Applying the second file updates that resource; it does not create a second Deployment.

Both Pod recipes keep `app: hello-web`. The Service therefore finds ready Pods from both recipes while the rollout progresses.

## Exactly what changes

| Location | Release 1.0 | Release 2.0 | Effect |
| --- | --- | --- | --- |
| Top-level purpose annotation | Initial teaching purpose | Rolling release purpose | Human description only |
| Top-level change-cause annotation | Initial release 1.0 | Release 2.0 | Describe the release in history |
| Pod-template version label | `"1.0"` | `"2.0"` | Identify Pods from the new recipe |
| Pod-template change-cause annotation | Release 1.0 | Release 2.0 | Part of the changed Pod template |
| Init-container `APP_RELEASE` | `"1.0"` | `"2.0"` | Generates a page saying Release 2.0 |
| Web-container `APP_RELEASE` | `"1.0"` | `"2.0"` | Makes the running environment agree with the release |

The image stays `busybox:1.36`. A Pod-template change is enough to trigger a rollout; it does not have to be an image change.

The visible page change comes from the init container. Merely setting an environment variable in the static server would not rewrite a file that had already been generated.

## How the controller uses these settings

`maxSurge: 1` allows a temporary extra replica. `maxUnavailable: 0` tells the controller to maintain the desired available count while replacing old replicas. The new Pods must pass readiness.

`revisionHistoryLimit: 5` retains old ReplicaSets for rollback. `progressDeadlineSeconds: 120` reports stalled progress; it does not automatically select and apply a working revision.

When a release is healthy, old ReplicaSets normally remain with zero replicas. This preserves the old recipe without keeping all its containers running.

## What rollback restores

`kubectl rollout undo` restores a previous Pod template. It does not restore unrelated ConfigMaps, Secrets, or database data. This sample keeps the same ConfigMap, so restoring the template's release value produces the old page.

Use [runbook step 17](../../runbook.md#17-perform-a-rolling-release-and-rollback). Apply one release file at a time. Recursively applying both files is not a meaningful release sequence.
