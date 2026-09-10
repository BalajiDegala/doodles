# 84. Pod stuck in ContainerCreating

Source: supplied Kubernetes PDF, question 84, pages 40. Practice: **Fault and repair**.

## Concise technical summary

1. ContainerCreating describes preparation of a container, usually after node assignment.
2. Inspect volumes, init containers, sandbox networking, and runtime events.
3. A scheduled Pod can still have the Pending phase during startup.
4. Restore the missing dependency and verify the same Pod becomes Ready.

Memory cue: The desk is assigned; which startup tool is missing?

## Plain meaning

The worker has a desk but cannot begin because the catalog file has not arrived. Hiring another worker produces the same wait.

## The Bookshop story

A disposable Pod mounts a required ConfigMap that is absent. Supplying it lets kubelet finish startup without replacing the Pod.

## Diagnosis and production details

FailedMount suggests volume or configuration setup; FailedCreatePodSandBox suggests runtime/CNI setup. An init-container failure can also block the application. Capture the node name and exact reason before escalating to storage or networking.

A missing namespaced ConfigMap does not require changing the cluster CNI or CSI. Displayed waiting reasons vary across failure paths. The PDF's claim that Pending always means unscheduled is incorrect; inspect conditions and nodeName.

Read the [manifest walkthrough](manifest-guide.md) and [runbook](runbook.md).

Further reading: [Debug Pods](https://kubernetes.io/docs/tasks/debug/debug-application/debug-pods/), [ConfigMap consumption](https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/).
