# Canary manifests explained

This example uses replica counts to illustrate a gradual rollout. It has no routing weight field.

## What each file contributes

| File | Role and important values |
| --- | --- |
| [00-namespace.yaml](manifests/00-namespace.yaml) | Creates k8s-learning-canary with a topic label |
| [10-configmap-stable.yaml](manifests/10-configmap-stable.yaml) | canary-page-stable holds the stable release 1.0 page |
| [11-configmap-canary.yaml](manifests/11-configmap-canary.yaml) | canary-page-canary holds the canary release 2.0 page |
| [20-deployment-stable.yaml](manifests/20-deployment-stable.yaml) | canary-web-stable creates four Pods labelled app=canary-web and track=stable |
| [21-deployment-canary.yaml](manifests/21-deployment-canary.yaml) | canary-web-canary creates one Pod labelled app=canary-web and track=canary |
| [30-service.yaml](manifests/30-service.yaml) | canary-web selects only app=canary-web, which includes both groups |

The Deployment's `selector.matchLabels` includes both app and track, and its `template.metadata.labels` supplies the same pair. The Service selector intentionally omits track.

## Follow the server settings

Both Deployments use `busybox:1.36` and `IfNotPresent`. The [BusyBox walkthrough](../01-kubernetes-basics/topics/03-pods/manifest-guide.md) explains the image choice and each argument of `httpd -f -p 8080 -h /www`.

Their `page` volume comes from the corresponding ConfigMap, whose `data.index.html` is a complete page. `volumeMounts` exposes it read-only at `/www`. No init container or separate generated page is used.

The containers have named port `http` at 8080. Readiness requests `/` using that name, after a two-second initial delay, then roughly every five seconds. The omitted failure threshold defaults to three. There is no explicit startup or liveness probe here.

Resources request `25m` CPU and `32Mi` memory and limit `100m` CPU and `64Mi` memory. The [resource/security guide](../01-kubernetes-basics/topics/15-resource-management/manifest-guide.md) explains these and the non-root security fields.

## Why both pages can appear

The ClusterIP Service accepts port 80 and forwards to the named http port on selected ready Pods. With four stable and one canary Pod, one of the five destinations serves the new page.

`1 / (4 + 1)` gives an illustrative 20% share if endpoint choice is roughly even. A short sample is not guaranteed to show that ratio. Connection reuse, readiness, and the cluster's traffic implementation affect results.

Changing `spec.replicas` changes available destinations, not a guaranteed per-request traffic weight. Adding `track: stable` to the Service would select only stable Pods and end the mixed routing.

Follow [runbook.md](runbook.md) to make fresh connections through the Service and compare responses. A Service port-forward selects a backing Pod, so it cannot measure this distribution.
