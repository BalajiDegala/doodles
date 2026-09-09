# Labels and references in our manifests

Files: [20-deployment.yaml](../../manifests/20-deployment.yaml) and [30-service.yaml](../../manifests/30-service.yaml).

## The repeated app label is intentional

~~~yaml
# On the Deployment:
spec:
  selector:
    matchLabels:
      app: hello-web
  template:
    metadata:
      labels:
        app: hello-web
~~~

The selector must agree with the Pod template's labels. The template section places the tag on every generated Pod.

The Service separately uses `spec.selector.app: hello-web` to find those Pods in the same namespace. It matches Pod labels, not the Deployment's name or its top-level labels.

## Explain each project label

| Label | Reason for using it |
| --- | --- |
| `app: hello-web` | Stable membership rule for the web workload and Service |
| `app.kubernetes.io/name: hello-web` | A standard-style application identity for tools and people |
| `app.kubernetes.io/part-of: core-components-project` | Group web and helper objects as parts of the learning project |
| `app.kubernetes.io/version: "1.0"` | Identify the release running in a Pod |
| `learning.ops2book/topic` | Describe the namespace's learning topic |

The version label changes in release 2.0. The Service does not select version, so both old and new ready Pods can serve during that rolling update.

## Annotations describe or instruct tools

`learning.ops2book/purpose` is our description. `learning.ops2book/managed-by` is a human note; writing it does not create a real controller. `kubernetes.io/change-cause` records a release description for rollout history. An annotation by itself does not launch a deployment process.

These values are not Secret storage. Anyone with access to read the object can normally read its metadata.

## Match names and labels differently

A `configMapKeyRef.name` is an exact object-name reference. A Service `selector` is a label condition. Matching only the first does not fix a typo in the second.

Use [runbook step 9](../../runbook.md#9-inspect-labels-selectors-and-annotations) to inspect tags and selector results.
