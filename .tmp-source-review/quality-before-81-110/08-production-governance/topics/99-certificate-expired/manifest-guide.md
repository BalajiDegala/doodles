# 99. Certificate expired: kubelet cannot talk to the API server: walkthrough

Use a namespaced example and server-side validation:

```powershell
kubectl get all -n <namespace>
kubectl describe <kind> <name> -n <namespace>
kubectl apply --dry-run=server -f <manifest.yaml>
```

Save the current YAML before a policy or controller change and verify selectors, owner references, and rollback.
