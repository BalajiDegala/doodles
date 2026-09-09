# 103. Expired certificate breaks kubelet/API communication

Source: supplied Kubernetes PDF, question 103, pages 50-51. Practice: **Administrator investigation**.

## Concise technical summary

1. Kubelet client, kubelet serving, and API-server serving certificates serve different connections.
2. Expiry, trust, name mismatch, and clock skew can produce distinct TLS errors.
3. CSR approval requires verifying requester identity, signer, usages, and request details.
4. Renewal and reload procedures depend on the distribution and certificate owner.

Memory cue: Which peer, which certificate, which owner?

## Plain meaning

A staff badge, a branch sign, and head office's seal certify different things. Replacing the wrong certificate will not restore the broken relationship.

## The Bookshop story

Maya identifies the failed connection and its certificate owner before planning a repair. No CSR is approved and no cluster certificate is replaced by the exercise.

## Diagnosis and production details

Kubelet client authentication concerns node-to-API requests; API-to-kubelet TLS uses the kubelet's serving certificate. API server serving TLS is a third path. Capture the exact x509 error and check validity dates, SANs, issuer trust, and system time.

For kubeadm-managed certificates, the operator can use kubeadm certs check-expiration; this does not inventory every kubelet certificate. Renewal may require static-Pod restart/component reload and kubeconfig updates according to the documented procedure. Managed services and other distributions own different parts. Never mass-approve pending CSRs or assume every expired node requires replacement.

Read the [manifest walkthrough](manifest-guide.md) and [runbook](runbook.md).

Further reading: [kubeadm certificate management](https://kubernetes.io/docs/tasks/administer-cluster/kubeadm/kubeadm-certs/), [Kubelet certificate rotation](https://kubernetes.io/docs/tasks/tls/certificate-rotation/), [Certificate signing requests](https://kubernetes.io/docs/reference/access-authn-authz/certificate-signing-requests/).
