# Blue-green manifests explained

Read the [BusyBox command walkthrough](../01-kubernetes-basics/topics/03-pods/manifest-guide.md) for the shared web process and the [resource/security walkthrough](../01-kubernetes-basics/topics/15-resource-management/manifest-guide.md) for the repeated container settings.

## What each file contributes

| File | Role and important values |
| --- | --- |
| [00-namespace.yaml](manifests/00-namespace.yaml) | Creates k8s-learning-blue-green; its topic label describes the lab |
| [10-configmap-blue.yaml](manifests/10-configmap-blue.yaml) | storefront-page-blue stores index.html with the blue release 1.0 heading |
| [11-configmap-green.yaml](manifests/11-configmap-green.yaml) | storefront-page-green stores index.html with the green release 2.0 heading |
| [20-deployment-blue.yaml](manifests/20-deployment-blue.yaml) | storefront-blue creates two Pods labelled app=storefront and version=blue |
| [21-deployment-green.yaml](manifests/21-deployment-green.yaml) | storefront-green creates two Pods labelled app=storefront and version=green |
| [30-service.yaml](manifests/30-service.yaml) | storefront initially selects app=storefront and version=blue |

`apiVersion`, `kind`, `metadata.name`, and `metadata.namespace` describe the type and identity in each file. The Deployment selectors agree with their own Pod-template labels, so each controller owns its own release.

## How the page reaches each container

Each ConfigMap's `data.index.html: |` holds a complete page, including its background color and release heading. Each Deployment declares volume `page` from its matching ConfigMap and mounts it read-only at `/www`.

There is no init container or emptyDir in these two rollout Deployments. BusyBox's `httpd -f -p 8080 -h /www` serves the ConfigMap files directly.

Both use the same image. The different page configuration represents the release difference for this exercise.

## The readiness block

`httpGet.path: /` tests whether the homepage can be served. `port: http` refers to containerPort 8080. `initialDelaySeconds: 2` delays the first readiness check after startup, and `periodSeconds: 5` controls its interval.

The failure threshold is omitted and defaults to three. There are no explicit startup or liveness probes in these Deployments. A successful homepage check is a smoke check, not proof that every feature works.

## The traffic switch is one selector value

~~~yaml
selector:
  app: storefront
  version: blue
~~~

Both conditions must match. Changing `version` to `green` selects green Pods while keeping blue available for rollback. Endpoint and network updates take time; established connections can outlive the switch.

`type: ClusterIP` keeps the Service internal. Service `port: 80` targets the Pod port named `http`, which is 8080. The runbook's in-cluster HTTP request goes through this Service.

Both Deployments request `25m/32Mi` and limit `100m/64Mi` per web container. Their common security settings run as non-root and make the image filesystem read-only.

Follow [runbook.md](runbook.md) for switching and rollback. Reapplying the saved starting Service file returns its selector to blue.
