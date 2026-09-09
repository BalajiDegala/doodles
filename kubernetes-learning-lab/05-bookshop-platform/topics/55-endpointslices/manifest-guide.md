# EndpointSlices and Endpoints: reading the manifests

Read the [Service](../../manifests/30-service.yaml); no manually authored EndpointSlice is needed.

Its selector identifies `app: platform-catalog`. Generated slices carry `kubernetes.io/service-name: platform-catalog`. `addressType` identifies IPv4/IPv6 or another supported family, `ports` reports receiving ports, and each endpoint includes addresses and conditions. `targetRef` can identify the backing Pod.

The slice’s actual port is the Pod listener, 8080, while the Service exposes 80. Read `conditions.ready` along with termination/serving information where present; the absence of one optional field is not itself an error.

Shared fields are explained in the [chapter manifest guide](../../manifest-guide.md). Continue with the [runbook](runbook.md).
