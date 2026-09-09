# Blue-green and canary releases: runbook

Run from the chapter directory, as shown in [shared setup](../../runbook.md).

## Prerequisites

Use the intended practice context and the dependencies in the existing release labs. Run one at a time.

~~~powershell
cd ../02-blue-green-deployment
~~~

Follow its [runbook](../../../02-blue-green-deployment/runbook.md), including the traffic switch, version proof, rollback, and cleanup. Then:

~~~powershell
cd ../03-canary-deployment
~~~

Follow its [runbook](../../../03-canary-deployment/runbook.md), including repeated requests and cleanup. Return afterwards:

~~~powershell
cd ../05-bookshop-platform
~~~

## Expected result

Explain which selector/replica change caused each result. Record a promotion threshold, observation window, and rollback trigger for a hypothetical real catalog. A few successful requests are not enough to establish an error-rate target.

## Troubleshooting and cleanup

Use each lab’s endpoint, readiness, and selector checks if the wrong page appears. Complete both existing cleanup procedures; this question creates no additional objects.
