# 98. Cross-namespace traffic blocked by NetworkPolicy: runbook

## Prerequisites

An enforcing CNI, permission for a fresh secondary namespace and NetworkPolicies, and capacity for three small Pods. Inspect any preexisting policies and secondary-namespace ownership before applying.

Use [chapter setup](../../runbook.md) first. Stay in the chapter directory; topic paths below are relative to it. The setup sets `$ctx` to the reviewed context and `$ns` to `k8s-learning-governance`.

~~~powershell
kubectl --context $ctx get namespace k8s-learning-cross-source
kubectl --context $ctx apply -f topics/98-cross-namespace-policy/manifests/
kubectl --context $ctx -n $ns rollout status deployment/q98-server --timeout=120s
kubectl --context $ctx -n k8s-learning-cross-source wait --for=condition=Ready pod/q98-reader pod/q98-other --timeout=120s
$target = "http://q98-route.$ns.svc:80"
kubectl --context $ctx -n k8s-learning-cross-source exec q98-reader -- wget -T 3 -qO- $target
kubectl --context $ctx -n k8s-learning-cross-source exec q98-other -- wget -T 3 -qO- $target
kubectl --context $ctx -n $ns apply -f topics/98-cross-namespace-policy/faults/
kubectl --context $ctx -n k8s-learning-cross-source exec q98-reader -- wget -T 3 -qO- $target
kubectl --context $ctx -n $ns apply -f topics/98-cross-namespace-policy/fixed/
kubectl --context $ctx -n k8s-learning-cross-source exec q98-reader -- wget -T 3 -qO- $target
kubectl --context $ctx -n k8s-learning-cross-source exec q98-other -- wget -T 3 -qO- $target
~~~

Allow policy propagation between stages. Initial namespace NotFound is expected. After deny, the reader must fail. After allow, reader succeeds and other fails.

## Verification and troubleshooting

Use a new request for each sample. If both callers pass after deny, inspect CNI enforcement and other additive policies. If neither passes after repair, compare namespace and role labels, port, source egress, and ready endpoints. Port-forward is not a policy test.

## Rollback and cleanup

Restore before removing the resources:

~~~powershell
kubectl --context $ctx -n $ns delete networkpolicy q98-ingress --ignore-not-found
kubectl --context $ctx -n k8s-learning-cross-source exec q98-other -- wget -T 3 -qO- $target
kubectl --context $ctx -n $ns delete deployment q98-server --ignore-not-found
kubectl --context $ctx -n $ns delete service q98-route --ignore-not-found
kubectl --context $ctx get namespace k8s-learning-cross-source --show-labels
kubectl --context $ctx delete namespace k8s-learning-cross-source --timeout=120s
~~~

Delete the secondary namespace only if it still contains this exercise's visitors.
