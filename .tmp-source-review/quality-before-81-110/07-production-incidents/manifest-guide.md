# Production Incident Clinic: manifest and command guide

Use live object state and server-side validation:

```powershell
kubectl apply --dry-run=server -f example.yaml
kubectl describe pod <pod>
kubectl get events --sort-by=.lastTimestamp
```

Keep production changes in version control. Save the before-state, make one bounded change, and compare the after-state.
