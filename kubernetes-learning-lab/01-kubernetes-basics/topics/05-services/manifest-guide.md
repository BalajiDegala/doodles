# How the Service reaches our web containers

Actual file: [30-service.yaml](../../manifests/30-service.yaml). This is Maya's stable contact address for the replaceable web Pods.

~~~yaml
spec:
  type: ClusterIP
  selector:
    app: hello-web
  ports:
    - name: http
      port: 80
      targetPort: http
~~~

## Every Service-specific field

| Field | Meaning here |
| --- | --- |
| `type: ClusterIP` | Kubernetes gives the Service an internal virtual IP |
| `selector.app: hello-web` | Find Pods in this namespace carrying that exact label |
| `ports` | A list of ports offered by the Service |
| `name: http` | Name of this Service port; the Ingress refers to it |
| `port: 80` | Clients connect to port 80 on the Service |
| `targetPort: http` | Find the selected Pod's container port named http, which is 8080 |
| Omitted `protocol` | Defaults to TCP for this port |

`metadata.name` supplies the Service name used in DNS. `metadata.namespace` defines its scope. The labels and purpose annotation describe this Service object; `spec.selector` determines which Pods it reaches.

## Three different port concepts

~~~text
In-cluster request: http://hello-web:80
         |
         v
Service port 80
         |
         v
targetPort named http -> Pod port 8080 -> BusyBox HTTP server
~~~

The runbook's `8080:80` port-forward means "local computer port 8080 to Service port 80." The local and container values happen to both be 8080, but they are separate choices.

A Service port-forward chooses a backing Pod and tunnels to it. It is useful for viewing a page; it does not test the Service's normal traffic distribution. The in-cluster `wget http://hello-web` command exercises the actual Service address.

## Readiness and selectors

The controller tracks matching Pod IPs in EndpointSlices. A Pod that fails readiness can still appear there with `conditions.ready: false`. It is normally excluded from Service routing rather than necessarily erased from the object. [EndpointSlice conditions](https://kubernetes.io/docs/concepts/services-networking/endpoint-slices/#conditions)

If the selector is misspelled, there are no matching web destinations. If `targetPort` names a port that Pods do not declare, the networking configuration cannot find the intended server port.

Use [runbook step 7](../../runbook.md#7-create-and-use-the-service). The [lesson](lesson.md) compares the other Service types; this file intentionally implements the ClusterIP case.
