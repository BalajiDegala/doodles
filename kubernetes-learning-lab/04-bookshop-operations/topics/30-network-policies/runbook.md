# NetworkPolicies: runbook

## Prerequisites

Ask which CNI/network plugin enforces NetworkPolicy. Complete base setup. Check existing policies in this fresh namespace; do not modify unrelated rules.

~~~powershell
kubectl -n k8s-learning-operations get networkpolicy
kubectl apply -f topics/30-network-policies/manifests/
kubectl -n k8s-learning-operations wait --for=condition=Ready pod/visitor-approved pod/visitor-blocked --timeout=120s
kubectl -n k8s-learning-operations exec visitor-approved -- wget -T 3 -qO- http://bookshop-ops
kubectl -n k8s-learning-operations exec visitor-blocked -- wget -T 3 -qO- http://bookshop-ops
~~~

Both should fetch the page before this policy. If either fails, fix DNS/Service/routing first; otherwise the later failure proves nothing.

## Apply and verify isolation

~~~powershell
kubectl apply -f topics/30-network-policies/policy/
kubectl -n k8s-learning-operations exec visitor-approved -- wget -T 3 -qO- http://bookshop-ops
kubectl -n k8s-learning-operations exec visitor-blocked -- wget -T 3 -qO- http://bookshop-ops
~~~

After policy propagation, approved succeeds and blocked fails, commonly with a timeout and nonzero exit code. Retry with fresh connections if necessary. If both succeed, inspect CNI support and other additive allow policies. Do not report enforcement success merely because `kubectl apply` succeeded.

## Roll back and prove restoration

~~~powershell
kubectl delete -f topics/30-network-policies/policy/ --ignore-not-found
kubectl -n k8s-learning-operations exec visitor-blocked -- wget -T 3 -qO- http://bookshop-ops
kubectl delete -f topics/30-network-policies/manifests/ --ignore-not-found
~~~

The blocked client should work again after propagation, assuming no other policy blocks it. Leave the shared server running.
