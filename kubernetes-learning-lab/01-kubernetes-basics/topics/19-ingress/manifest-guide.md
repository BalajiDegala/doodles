# Reading the optional Ingress route

Actual file: [70-ingress.yaml](../../manifests/ingress/70-ingress.yaml).

## Every routing field

| Field | Value | Meaning |
| --- | --- | --- |
| `apiVersion` | `networking.k8s.io/v1` | Stable API version for Ingress |
| `kind` | `Ingress` | Define HTTP/HTTPS routing rules |
| `metadata.name` | `bookshop` | Name of this route object |
| `metadata.namespace` | `k8s-learning-basics` | Namespace containing the route and its backend Service |
| `rules` | A list with one entry | Hosts and their routing behaviour |
| `host` | `bookshop.example.com` | Match the HTTP request's host |
| `http.paths` | A list with one entry | Paths handled for that host |
| `path: /` | Root prefix | Match paths starting at the website root |
| `pathType: Prefix` | Prefix matching | Match by path elements instead of requiring one exact URL |
| `backend.service.name` | `hello-web` | Target this Service in the same namespace |
| `backend.service.port.name` | `http` | Use the Service's port named http, which is port 80 |

The Service then targets the Pod port named http, which is 8080. The Ingress refers to the Service port, not directly to the container's port number.

The purpose annotation is descriptive. No controller-specific annotations are required by the sample.

## The controller dependency

No `ingressClassName` is supplied. As written, this route expects a compatible default IngressClass. If your intended class is not the default, the runbook explains where to set its exact name before applying.

An Ingress object does not install the controller, create public DNS records by itself, or automatically enable authentication.

There is no `tls` section. The example therefore demonstrates HTTP routing only. A real HTTPS route needs appropriate TLS configuration and certificate management.

## How the Host header reaches the rule

The runbook connects to the controller address and sends `Host: bookshop.example.com`. This tests the rule without changing DNS on your computer. Connecting by address without the required host can hit the controller's default route instead.

The rule is a declaration; actual routing details depend on the installed controller. [Kubernetes Ingress model](https://kubernetes.io/docs/concepts/services-networking/ingress/)

Use [runbook step 20](../../runbook.md#20-add-the-optional-ingress-route).
