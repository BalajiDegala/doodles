# 107. Helm release stuck in pending-upgrade: manifest walkthrough

Reuse the [local chart](../../../04-bookshop-operations/topics/32-helm-packaging/chart/Chart.yaml), [base values](../../../04-bookshop-operations/topics/32-helm-packaging/chart/values.yaml), and [evening values](../../../04-bookshop-operations/topics/32-helm-packaging/values-evening.yaml). It contains only the teaching catalog and a test hook. Release `q107-desk` is separate from the chapter base; revision 1 is known-good because this runbook creates it.

The [shared manifest guide](../../manifest-guide.md) explains the catalog's selectors, port, resources, and security controls. Continue with the [runbook](runbook.md).
