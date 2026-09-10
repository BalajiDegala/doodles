# 75. Zero-trust networking: runbook

Run from the chapter directory, as shown in [shared setup](../../runbook.md).

## Prerequisites

Ready base and a NetworkPolicy-enforcing CNI. Inspect existing namespace policies first.

~~~powershell
kubectl -n k8s-learning-reliability get networkpolicy
kubectl apply -f topics/75-zero-trust/manifests/
kubectl -n k8s-learning-reliability wait --for=condition=Ready pod/trusted-visitor pod/unknown-visitor --timeout=120s
kubectl -n k8s-learning-reliability exec trusted-visitor -- wget -T 3 -qO- http://reliable-catalog
kubectl -n k8s-learning-reliability exec unknown-visitor -- wget -T 3 -qO- http://reliable-catalog
kubectl apply -f topics/75-zero-trust/policy/
kubectl -n k8s-learning-reliability exec trusted-visitor -- wget -T 3 -qO- http://reliable-catalog
kubectl -n k8s-learning-reliability exec unknown-visitor -- wget -T 3 -qO- http://reliable-catalog
~~~

Both must work before policy. After propagation, approved succeeds and unapproved fails with nonzero exit. If both still work, inspect CNI support and other additive allows.

## Restore and clean up

~~~powershell
kubectl delete -f topics/75-zero-trust/policy/ --ignore-not-found
kubectl -n k8s-learning-reliability exec unknown-visitor -- wget -T 3 -qO- http://reliable-catalog
kubectl delete -f topics/75-zero-trust/manifests/ --ignore-not-found
~~~

Allow propagation and confirm restoration. Do not use port-forwarding as the policy test.
