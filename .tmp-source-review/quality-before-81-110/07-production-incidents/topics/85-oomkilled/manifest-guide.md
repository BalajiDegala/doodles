# 85. OOMKilled: account for the whole container memory footprint: walkthrough

Use a namespaced example and server-side validation:

```powershell
kubectl get all -n <namespace>
kubectl describe <kind> <name> -n <namespace>
kubectl apply --dry-run=server -f <manifest.yaml>
```

Save the current YAML before a policy or controller change and verify selectors, owner references, and rollback.
