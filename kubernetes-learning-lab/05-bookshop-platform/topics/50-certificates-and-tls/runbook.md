# cert-manager and TLS certificates: runbook

Run from the chapter directory, as shown in [shared setup](../../runbook.md).

## Prerequisites

Existing healthy cert-manager CRDs/controllers and permission to use a namespaced SelfSigned Issuer. If absent or disallowed, read the files and skip application.

~~~powershell
kubectl api-resources --api-group=cert-manager.io
kubectl apply --dry-run=server -f topics/50-certificates-and-tls/optional/
kubectl apply -f topics/50-certificates-and-tls/optional/
kubectl -n k8s-learning-platform wait --for=condition=Ready certificate/catalog-lab --timeout=120s
kubectl -n k8s-learning-platform describe certificate catalog-lab
kubectl -n k8s-learning-platform get secret catalog-lab-tls -o custom-columns=NAME:.metadata.name,TYPE:.type
~~~

Expect Ready, validity/renewal information, and Secret type `kubernetes.io/tls`. This proves issuance/storage, not external trust or a live HTTPS connection.

## Troubleshooting and cleanup

Inspect Issuer/CertificateRequest conditions for signing failures. Do not print Secret YAML or bypass TLS validation to claim success. Run cleanup only for resources created here:

~~~powershell
kubectl delete -f topics/50-certificates-and-tls/optional/ --ignore-not-found
kubectl -n k8s-learning-platform delete secret catalog-lab-tls --ignore-not-found
~~~

Explicit Secret cleanup covers installations that do not garbage-collect the target Secret with the Certificate.
