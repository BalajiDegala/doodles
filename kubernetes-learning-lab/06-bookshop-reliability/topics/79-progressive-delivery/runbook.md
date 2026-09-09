# Argo Rollouts and Flagger: runbook

Run from the chapter directory, as shown in [shared setup](../../runbook.md).

## Prerequisites

Authored release files are sufficient for the design exercise. Optional controller inspection requires an existing installation and permitted practice objects.

~~~powershell
kubectl api-resources --api-group=argoproj.io
kubectl api-resources --api-group=flagger.app
~~~

## Define the release decision

Write stages such as 10%, 25%, and full exposure, then attach a meaningful observation window, minimum request count, error/latency threshold, and missing-data decision to each. Identify the traffic provider that can implement the chosen weights. Explain abort, rollback, and incompatible-data handling.

With an existing test rollout, inspect its phase, analysis results, and routing status using its version-matched runbook. Without one, mark automated promotion untested. The earlier manual canary can still be exercised through its own runbook.

## Cleanup

No progressive-delivery resource is created here. Clean up any repeated manual canary using its existing procedure.
