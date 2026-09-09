# NetworkPolicies

## Concise technical summary

1. NetworkPolicy controls selected Pods' allowed network connections.
2. Ingress and egress isolation are separate, and allow rules add together.
3. Selectors identify the protected Pods and permitted peers.
4. A network plugin must enforce the policy; creating the object alone proves nothing.

Memory cue: Select, isolate a direction, allow the needed peers, test.

## Plain meaning

Maya adds a badge reader to the catalog room. That reader controls entry to this room, not every room in the building and not who may change the employee database.

## The Bookshop story

Two visitor Pods can initially read the shop page. After the policy, only the visitor labelled approved should connect. API access and website access remain different concerns.

## Important boundaries

A Pod is isolated in a direction when a selecting policy applies to that direction. Allowed traffic is the union of matching allow rules; one policy cannot subtract an allow granted by another.

Both source egress and destination ingress must permit a connection where each side is isolated. This exercise restricts only destination ingress, so it does not accidentally block clients' DNS queries.

An ingress rule with a `podSelector` alone matches peers in the policy's namespace. Combining `namespaceSelector` and `podSelector` in the same peer means both must match. Putting them in separate peer entries means either can match.

NetworkPolicy is principally network-layer filtering, not HTTP-path authorization, user login, or automatic encryption. Node traffic and host-network cases have special semantics. Use real Pod-to-Pod connections for the proof; port-forwarding is not the test.

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).

Further reading: [NetworkPolicy concepts](https://kubernetes.io/docs/concepts/services-networking/network-policies/), [NetworkPolicy API](https://kubernetes.io/docs/reference/kubernetes-api/networking/network-policy-v1/).
