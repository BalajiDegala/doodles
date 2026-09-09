# CRI, containerd, and CRI-O

## Concise technical summary

1. CRI defines communication between kubelet and a container runtime service.
2. containerd and CRI-O are common CRI-capable runtime choices.
3. Removing built-in dockershim did not invalidate ordinary Docker-built images.
4. Runtime identity, image identity, and Kubernetes API version describe different layers.

Memory cue: Build the image; ask through CRI; run the process.

## Plain meaning

Maya’s supplier packages a book, the ordering interface describes how to request delivery, and a courier carries it. Changing the courier does not automatically change the package format.

## The Bookshop story

We inspect the actual node’s reported runtime and the catalog container’s image ID. A Docker-labelled runtime is explained through CRI integration rather than declared impossible.

## Details and production use

Kubernetes removed its built-in dockershim integration in 1.24. Docker Engine can still be integrated through a maintained CRI adapter such as cri-dockerd. Compatibility depends on the runtime, adapter, Kubernetes version, and configuration.

OCI image compatibility does not guarantee an image supports the node architecture, security settings, or every runtime feature. Node-level tools such as crictl need appropriate runtime endpoint access and are outside an ordinary application namespace workflow.

Further reading: [Container runtimes](https://kubernetes.io/docs/setup/production-environment/container-runtimes/), [dockershim removal FAQ](https://kubernetes.io/blog/2022/02/17/dockershim-faq/).

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
