# Catalog Job and CronJob walkthrough

Actual files: [50-job.yaml](../../manifests/50-job.yaml) and [51-cronjob.yaml](../../manifests/51-cronjob.yaml).

## The one-time Job

| Field | Meaning and reason |
| --- | --- |
| `apiVersion: batch/v1` | API group/version for batch workloads |
| `kind: Job` | Track a finite task until completion or failure |
| `metadata.name: catalog-import` | Name of the one-time practice task |
| `backoffLimit: 2` | Limit failed retries; the controller stops retrying when its limit is reached |
| `ttlSecondsAfterFinished: 600` | Make the Job eligible for cleanup ten minutes after finishing, whether successful or failed |
| `template` | Pod recipe used by the Job |
| `restartPolicy: Never` | Do not restart the failed container in the same Pod; the Job controller can create another Pod |

There is no `completions` or `parallelism` field, so this ordinary Job uses the defaults of one successful completion and one active task at a time.

## Understand the import script

| Command | What it does |
| --- | --- |
| `set -eu` | Stop on an ordinary command error or an unset variable |
| `echo "Starting..."` | Print a progress message |
| `test -s /catalog/books.txt` | Fail if the file is missing or empty |
| `wc -l < /catalog/books.txt` | Count newline-terminated lines; the supplied catalog has three |
| `$(...)` | Replace this shell expression with the command's output |
| `sed 's/^/- /' ...` | Print each line with a dash prefix |
| Final `echo` | Print the success message before the script exits |

The "import" is a simulation: it validates and prints the sample catalog. It does not write into a database. A successful script exit lets the Job become Complete.

The `catalog` volume references ConfigMap `hello-page`. Its `items` list selects only key `books.txt` and writes that key as file `books.txt`. The container mounts the volume at `/catalog` read-only.

## The scheduled CronJob

~~~yaml
schedule: "*/5 * * * *"
concurrencyPolicy: Forbid
successfulJobsHistoryLimit: 1
failedJobsHistoryLimit: 1
~~~

The five schedule positions are minute, hour, day of month, month, and day of week. `*/5` in the minute field means minutes divisible by five, such as 10:00 and 10:05. It does not mean "five minutes after applying the file."

`Forbid` prevents overlapping scheduled Jobs created by this same CronJob. It does not coordinate other CronJobs or manual Jobs. The two history limits retain only a small number of completed Job records.

The nested structure is `jobTemplate.spec.template.spec`: a CronJob makes Jobs, and each Job makes Pods. The nested Job uses `backoffLimit: 1` and `restartPolicy: Never`. The reporter's `date -u` prints UTC and `wc -l` counts the same mounted catalog file.

No `timeZone` is specified in this manifest, so scheduling follows the controller's local time zone. Printing UTC in the command does not change scheduling. [CronJob scheduling and concurrency](https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/)

Both containers use [BusyBox](../03-pods/manifest-guide.md) and the small [resource and security settings](../15-resource-management/manifest-guide.md). The reporter is intentionally a simple logging example; real reports should validate inputs and fail clearly on errors.

Use [runbook step 12](../../runbook.md#12-run-the-catalog-job-and-cronjob). Reapplying a completed Job does not rerun it while the same Job object remains; a new run needs a new Job object.
