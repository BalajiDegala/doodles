# 97. Ingress returns 502 after deployment

Source: supplied Kubernetes PDF, question 97, pages 46-47. Practice: **Backend fault and repair**.

## Concise technical summary

1. A gateway error must be traced through the controller, Service, and backend.
2. Ingress backend service.port differs from the Service targetPort.
3. Ready Pods can still be unreachable if the target port is wrong.
4. Verify through the real entry point after repairing the failing layer.

Memory cue: Listener to Service port to Pod port.

## Plain meaning

The receptionist sends customers to a valid room number but the wrong door inside it. The shop exists and staff are healthy; the directions are still wrong.

## The Bookshop story

A second Service points at the catalog's unused port 8081. Repairing targetPort to 8080 demonstrates one cause behind upstream failures without installing an ingress controller.

## Diagnosis and production details

Compare host/path, IngressClass, controller routing status, backend Service name/port, EndpointSlice port, Pod readiness, and listener. Controller logs distinguish refused connections, timeouts, TLS mismatch, and reset connections. 502 versus 503 behavior varies by controller and failure type; no-ready-endpoint incidents do not always return 502.

If failures happen only during a rollout, correlate timestamps with termination/readiness and use question 90. An ingress controller can be healthy while the backend is not. A backend port-forward cannot validate host routing, ingress TLS, or policy on the actual path.

Read the [manifest walkthrough](manifest-guide.md) and [runbook](runbook.md).

Further reading: [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/), [Debug Services](https://kubernetes.io/docs/tasks/debug/debug-application/debug-service/).
