# 86. Service not routing traffic to Pods

Source: supplied Kubernetes PDF, question 86, pages 41. Practice: **Fault and repair**.

## Concise technical summary

1. A Service needs matching Pods and usable EndpointSlices.
2. Readiness, selectors, and targetPort describe separate routing requirements.
3. Test Pod and Service paths independently to locate the failing layer.
4. Restore the selector or port and verify an application response through the Service.

Memory cue: Selector, readiness, port, then packet path.

## Plain meaning

The directory sends customers to the wrong counter label. Even healthy staff cannot serve a customer whose directions never reach them.

## The Bookshop story

A second Service intentionally selects no catalog Pods. Its repair points at the existing healthy catalog, so no worker is restarted.

## Diagnosis and production details

An empty EndpointSlice or absent endpoints suggests no matching destinations. A slice may include unready or terminating destinations: read conditions.ready, serving, and terminating rather than counting addresses. DNS resolving a ClusterIP does not prove the Service has a usable backend.

If PodIP:8080 works but ServiceIP:80 fails, inspect service forwarding, policies, and port mapping. Some CNIs implement Service routing without kube-proxy. Use EndpointSlices; legacy Endpoints is deprecated from Kubernetes 1.33. Port-forwarding bypasses important portions of the Service data path.

Read the [manifest walkthrough](manifest-guide.md) and [runbook](runbook.md).

Further reading: [Debug Services](https://kubernetes.io/docs/tasks/debug/debug-application/debug-service/), [EndpointSlices](https://kubernetes.io/docs/concepts/services-networking/endpoint-slices/).
