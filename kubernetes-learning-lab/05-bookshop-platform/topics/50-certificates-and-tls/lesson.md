# 50. cert-manager and TLS certificates

## Concise technical summary

1. cert-manager reconciles Certificate resources using configured issuers.
2. An Issuer is namespaced; a ClusterIssuer can serve requests across namespaces.
3. A Certificate requests identities and stores resulting material in a Secret.
4. Successful issuance does not by itself establish client trust or configure a TLS listener.

Memory cue: Request, issue, store, trust, serve.

## Plain meaning

Maya can print a badge, store it safely, and present it at the door. Visitors still need a reason to trust the badge issuer, and the doorway must actually check it.

## The Bookshop story

An existing cert-manager installation issues a short-lived self-signed certificate for a practice catalog name. We inspect readiness, expiry, and Secret type without printing private keys.

## Details and production use

A self-signed issuer is useful for demonstrating issuance but does not create public browser trust. Production issuance also involves issuer authentication, DNS or HTTP validation where relevant, renewal, trust distribution, and application reload.

The certificate’s DNS names must match client expectations. Rotating Secret data does not guarantee an application has loaded the new certificate. This exercise never installs an ingress controller, requests a public certificate, or claims that the HTTP-only BusyBox website now serves TLS.

Further reading: [cert-manager Certificate resource](https://cert-manager.io/docs/usage/certificate/), [SelfSigned issuer](https://cert-manager.io/docs/configuration/selfsigned/).

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
