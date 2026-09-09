# DNS created by our Service manifests

Files: [30-service.yaml](../../manifests/30-service.yaml) and [60-headless-service.yaml](../../manifests/storage/60-headless-service.yaml).

## The normal Service

The combination of `metadata.name: hello-web` and `metadata.namespace: k8s-learning-basics` gives the DNS component the Service identity.

From the same namespace, `hello-web` resolves through the Pod's DNS search rules. From another namespace, use `hello-web.k8s-learning-basics`. The fully qualified form ends with `svc` and the configured cluster domain.

A normal ClusterIP Service returns its virtual IP through DNS. The application then connects to the Service, whose networking routes to a ready backend.

## The headless Service fields

~~~yaml
metadata:
  name: reading-list
  namespace: k8s-learning-basics
spec:
  clusterIP: None
  selector:
    app: reading-list
  ports:
    - name: http
      port: 8080
      targetPort: http
~~~

`clusterIP: None` explicitly requests no virtual IP. The Service remains a ClusterIP-type Service, but it is headless. `None` is a special string here, not a missing setting.

Its selector finds the StatefulSet Pods. The named port maps to the server's 8080 port. DNS returns individual backend addresses, and clients connect directly to the chosen Pod.

The StatefulSet's `serviceName: reading-list` connects stable Pod identities to this Service. It supports a name such as `reading-list-0.reading-list` within this namespace, with the usual cluster DNS suffix added by the resolver.

## Why there is no DNS server YAML

The lab uses the DNS service already installed in your cluster, commonly CoreDNS. The default Pod DNS policy is ClusterFirst when omitted. We are creating application Service records, not replacing the cluster DNS configuration.

Names resolving successfully do not prove the requested server port works. Test resolution and then make an HTTP request.

Use [runbook step 18](../../runbook.md#18-test-kubernetes-dns) for the normal Service and step 19 for the optional headless Service.
