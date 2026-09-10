# 57. API request flow and admission: reading the manifests

File: [admission preview Pod](manifests/10-admission-preview.yaml). It uses the same harmless worker/security settings as other exercises.

The runbook applies it with `--dry-run=server -o yaml`. The returned object can contain defaulted fields, assigned admission values, or webhook mutations; those are observations to compare with the authored input. `metadata.name: admission-preview` gives the later nonexistence check an exact target.

This topic installs no webhook or admission policy. A successful preview says the request passed that server’s applicable checks at that time; it does not prove the image will run or that the caller can mutate every object.

Shared fields are explained in the [chapter manifest guide](../../manifest-guide.md). Continue with the [runbook](runbook.md).
