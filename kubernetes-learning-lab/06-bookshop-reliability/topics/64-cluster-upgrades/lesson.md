# 64. Cluster upgrade planning

## Concise technical summary

1. An upgrade changes several components with different compatibility constraints.
2. Supported version skew depends on the particular component pair.
3. Provider-supported sequencing and workload readiness determine a safe rollout.
4. Backups, rehearsal, and recovery decisions must precede production changes.

Memory cue: Inventory, check compatibility, rehearse, progress in stages.

## Plain meaning

Maya renovates the shop’s electrical panel and counters in a planned order. Knowing that two parts are “close in age” is not enough to prove they work together.

## The Bookshop story

We build an upgrade checklist from actual client/node versions and the Bookshop API inventory. No node is cordoned, drained, or upgraded.

## Details and production use

There is no universal plus-or-minus-one rule for every Kubernetes component. For example, supported kubelet skew differs from kubectl skew and depends on version rules; kubelets must not be newer than the API server. Consult the current upstream policy and the distribution/provider’s narrower requirements for the exact source and target.

Check removed APIs, webhooks, CNI/CSI, runtimes, Operators, storage, and available replacement capacity. Deployment rollback is not a control-plane downgrade procedure. A rehearsal should test service behaviour, not just version strings.

Further reading: [Version skew policy](https://kubernetes.io/releases/version-skew-policy/), [kubeadm upgrade guidance](https://kubernetes.io/docs/tasks/administer-cluster/kubeadm/kubeadm-upgrade/).

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
