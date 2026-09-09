# 77. Secret encryption at rest: reading the manifests

File: [public dummy Secret](manifests/10-practice-secret.yaml). `type: Opaque` is a general Secret type. `stringData.note: public-training-value` is authoring convenience; the API returns the value under base64-encoded `data.note`.

No real password, encryption key, KMS endpoint, or EncryptionConfiguration appears in this file. The name `encryption-practice` labels the lesson rather than enabling encryption. An encryption provider is configured at the platform/control-plane layer and cannot be inferred from this Secret manifest.

Shared fields are explained in the [chapter manifest guide](../../manifest-guide.md). Continue with the [runbook](runbook.md).
