# 98. Cross-namespace traffic blocked by NetworkPolicy

Source: supplied Kubernetes PDF, question 98, pages 47. Practice: **Policy fault and repair**.

## Concise technical summary

1. Ingress isolation begins when a policy selects the receiving Pod.
2. A podSelector peer alone refers to Pods in the policy's own namespace.
3. namespaceSelector and podSelector in one peer combine as AND.
4. Both source egress and destination ingress must allow a permitted connection.

Memory cue: Which namespace AND which caller?

## Plain meaning

The stockroom accepts a staff badge only from a particular branch. Matching the badge shape alone should not admit every branch.

## The Bookshop story

Two visitors in a separate namespace first reach a disposable server. A deny rule blocks both; a repaired rule allows only the approved reader from that namespace.

## Diagnosis and production details

NetworkPolicies are additive: another allow policy can make a supposedly denied flow succeed. Two separate peer entries combine as OR, unlike namespaceSelector and podSelector inside one entry. Labels are mutable API metadata, so RBAC and identity controls still matter.

Test from the real source Pod to the Service, including DNS resolution and destination port. This drill isolates receiver ingress only, leaving DNS and visitor egress unchanged. A non-enforcing CNI may accept the API object without restricting packets. Existing connections can behave differently from new ones.

Read the [manifest walkthrough](manifest-guide.md) and [runbook](runbook.md).

Further reading: [NetworkPolicy selectors and isolation](https://kubernetes.io/docs/concepts/services-networking/network-policies/).
