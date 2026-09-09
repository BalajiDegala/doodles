# 103. Expired certificate breaks kubelet/API communication: runbook

## Prerequisites

Node/CSR read access; host-side certificate checks require the relevant administrator and known distribution. Use a cluster with no incident as a baseline only.

Use [chapter setup](../../runbook.md) first. Stay in the chapter directory; topic paths below are relative to it. The setup sets `$ctx` to the reviewed context and `$ns` to `k8s-learning-governance`.

~~~powershell
kubectl --context $ctx get nodes
kubectl --context $ctx get csr
$csr = 'PASTE_CSR_NAME'
kubectl --context $ctx get csr $csr -o yaml
~~~

Only inspect an actual CSR. Record which connection failed, the requesting identity, signer, usages, validity dates, SANs, and trust chain.

On a kubeadm control-plane host, its administrator may inspect:

~~~console
kubeadm certs check-expiration
~~~

This is not a command to run on the Windows workstation or an arbitrary managed control plane. Use the provider's equivalent evidence when kubeadm does not own certificates.

## Verification and troubleshooting

Recovery needs successful authenticated communication, appropriate certificate identity/trust, fresh node status, and stable workloads. A new file on disk or an approved CSR alone does not establish the component reloaded it.

## Rollback and cleanup

All shown operations inspect state. Renewal/approval/restart requires the platform's established procedure and preservation of keys/configuration for recovery; do not restore an expired credential as the final fix.
