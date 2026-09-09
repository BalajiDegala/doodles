# Services

## Concise technical summary

1. A Service gives clients a stable way to reach changing Pods.
2. In our example, its selector finds web Pods and traffic goes to ready destinations.
3. ClusterIP is internal; NodePort uses node ports; LoadBalancer requests external access.
4. ExternalName returns a DNS alias, while a headless Service can return Pod addresses.

Memory cue: Stable name, selected Pods, ready traffic.

Read the [manifest walkthrough](manifest-guide.md) to connect these points to the YAML.

## Plain meaning

Pods are replaceable, so their names and IP addresses can change. A Service gives a selected group of Pods one stable DNS name and virtual IP address.

Imagine a company phone number. Employees behind it may change, but callers keep using the same number.

The shared Service is named `hello-web`. Inside the same namespace, another Pod can use `http://hello-web`. The Service sends each new connection to one ready Pod with the matching label.

## Service types

| Type | Reachability | Common use |
| --- | --- | --- |
| `ClusterIP` | Inside the cluster | Internal application-to-application traffic; this is the default |
| `NodePort` | A port on each node, plus a ClusterIP | Direct or lab access; often a building block for other networking |
| `LoadBalancer` | An external load balancer when the platform supports it | Exposing a Service outside a cloud or integrated environment |
| `ExternalName` | DNS alias to an external name | Referring to an outside service through a cluster-local name |

Creating a `LoadBalancer` Service can create a billable cloud resource. It can remain `Pending` on clusters that have no load-balancer integration. The shared project therefore uses only `ClusterIP` and reaches it locally with `kubectl port-forward`.

## Type mechanics

- `ClusterIP` allocates the stable in-cluster virtual IP used by the shared project.
- `NodePort` also opens one allocated port on every node. The default allocation range is commonly `30000-32767`; firewalls and node reachability still decide whether a client can use it.
- `LoadBalancer` asks the installed platform integration to provision or configure an external load balancer. Many implementations also allocate NodePorts unless configured otherwise.
- `ExternalName` has no selector or proxy. Cluster DNS returns a CNAME pointing to `spec.externalName`. HTTP Host headers and TLS certificate names can make it unsuitable for transparent web aliasing.

The basic shape stays small:

```yaml
# Change only after understanding the cluster exposure and cost.
spec:
  type: NodePort        # or LoadBalancer
  selector:
    app: hello-web
```

An ExternalName is different:

```yaml
spec:
  type: ExternalName
  externalName: service.example.com
```

## Selector and ports

The [Service manifest](../../manifests/30-service.yaml) says:

```yaml
selector:
  app: hello-web
ports:
  - port: 80
    targetPort: http
```

`port` is the Service port. `targetPort` is the named container port on a selected Pod. The selector must match Pod labels exactly. Readiness checks keep an unready Pod out of the Service endpoints.

A normal Service balances network connections. It does not promise that every Pod receives an exactly equal number of HTTP requests.

Use [runbook step 7](../../runbook.md#7-create-and-use-the-service) to inspect endpoints and reach the application.

Further reading: [Services](https://kubernetes.io/docs/concepts/services-networking/service/).
