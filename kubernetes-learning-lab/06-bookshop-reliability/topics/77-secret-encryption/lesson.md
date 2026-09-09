# Secret encryption at rest

## Concise technical summary

1. Base64 encoding of Secret API data is not encryption.
2. Encryption at rest protects the stored representation when properly configured.
3. API-authorized readers still receive usable Secret values.
4. Key management, rotation, old-data rewriting, and recovery are separate operational requirements.

Memory cue: Encoding is packaging; encryption needs keys and a recovery plan.

## Plain meaning

Maya can disguise a note’s alphabet or lock it in a safe. The alphabet is reversible packaging; the safe depends on protected keys and authorized access.

## The Bookshop story

A Secret contains an explicitly public training value. We verify its API round trip and explain why that proves neither encryption nor lack of encryption in the datastore.

## Details and production use

Standard Kubernetes does not automatically make every underlying Secret record encrypted through an encryption provider; distributions and managed services can configure additional protection. Encryption is transparent to ordinary authorized API reads, so decoding a returned value cannot diagnose storage protection.

KMS v2 is the modern Kubernetes envelope-encryption integration; actual support and key ownership depend on the platform. Provider ordering, key availability, migration of previously stored records, and restoration all matter. Do not rewrite all cluster Secrets or edit control-plane encryption configuration as a namespace exercise.

Further reading: [Encrypting data at rest](https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/), [KMS provider](https://kubernetes.io/docs/tasks/administer-cluster/kms-provider/).

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
