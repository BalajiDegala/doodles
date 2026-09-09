# Ingress and Ingress Controllers

## Concise technical summary

1. An Ingress describes HTTP or HTTPS routes from hosts and paths to Services.
2. An ingress controller reads those routes and implements the traffic handling.
3. Our route sends bookshop.example.com requests to the hello-web Service.
4. The Ingress object needs a compatible running controller to have an effect.

Memory cue: Rule, controller, Service, Pod.

Read the [manifest walkthrough](manifest-guide.md) to connect these points to the YAML.

## Plain meaning

The Ingress object is Maya's routing instruction: "Requests for `bookshop.example.com` go to the bookshop Service." The ingress controller is the actual receptionist who reads that instruction and directs visitors. A written instruction without a receptionist changes nothing.

## Traffic path

```text
External client
      |
      v
Load balancer or node entry point
      |
      v
Ingress controller reads host and path rules
      |
      v
hello-web ClusterIP Service
      |
      v
Ready web Pod
```

## The Tiny Bookshop example

The optional [Ingress manifest](../../manifests/ingress/70-ingress.yaml) maps host `bookshop.example.com` and path `/` to Service `hello-web` port `http`. The `example.com` domain is reserved for documentation; the runbook sends the Host header directly and does not require public DNS.

It deliberately omits `ingressClassName`. It works unchanged only when the cluster has a compatible default IngressClass. If the cluster has a non-default class, set `spec.ingressClassName` to that installed class before applying.

The project does not install a controller because controller choice depends on the cluster platform and affects shared infrastructure.

## Ingress compared with a Service

- A Service gives Pods a stable network endpoint and supports TCP or UDP according to its ports.
- An Ingress normally routes HTTP or HTTPS using application-layer hosts and paths.
- The Ingress backend is a Service, not a Pod chosen directly.
- TLS commonly terminates at the ingress controller using a referenced TLS Secret.

## Production details

- Confirm the controller, IngressClass, supported annotations, and implementation-specific behaviour.
- Configure DNS to point the public hostname to the controller entry point.
- Configure TLS, certificate renewal, redirects, timeouts, body limits, and trusted proxy headers.
- Add authentication or a web application firewall where the risk requires it.
- Monitor the controller as shared production infrastructure.
- Prefer Gateway API when its installed implementation and organizational standards support the needed route model.

Use [runbook step 20](../../runbook.md#20-add-the-optional-ingress-route) only when an ingress controller is already available.

Further reading: [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) and [ingress controllers](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/).
