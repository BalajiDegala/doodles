# Helm packaging: reading the chart

| File | Meaning |
| --- | --- |
| [Chart.yaml](chart/Chart.yaml) | `apiVersion: v2` is the chart format; `version: 0.1.0` versions the package; `appVersion: "1.0"` describes the application |
| [Default values](chart/values.yaml) | One replica, BusyBox image, and morning HTML |
| [Values schema](chart/values.schema.json) | Restricts replicas to integers 1-3 and requires nonempty image/page strings |
| [Evening values](values-evening.yaml) | Changes replicas to two and replaces the page; inherits the default image |
| [Page template](chart/templates/page.yaml) | Renders `desk-page` in the release namespace |
| [Deployment template](chart/templates/deployment.yaml) | Renders `desk-web` and mounts its own page |
| [Service template](chart/templates/service.yaml) | Sends port 80 to the selected containers' named `http` port, 8080 |
| [Test hook](chart/templates/test-page.yaml) | Fetches the release Service and compares its body with `EXPECTED_PAGE` |

`{{ .Values.replicaCount }}` inserts a number. `quote` renders text as a safe YAML string. `.Release.Name` is `desk`; `.Release.Namespace` comes from `-n k8s-learning-operations`. These are Helm expressions, so render the chart before treating the templates as YAML. [Chart format reference](https://helm.sh/docs/topics/charts/).

Both Deployment and Service selectors include the chart name and release instance. `checksum/page` hashes the selected page into the Pod template; changing the page therefore triggers a rollout. The ordinary container settings follow the [shared walkthrough](../../manifest-guide.md).

The test Pod has `restartPolicy: Never`. `helm.sh/hook: test` runs it when you request `helm test`. Its shell fails if fetching fails or the response differs. `before-hook-creation` replaces an older test before rerunning. Completed and failed test Pods remain available for log inspection across Helm 3/4; the runbook explicitly removes the final test Pod. This is an HTTP/content check, not proof of production readiness.

Continue with the [runbook](runbook.md).
