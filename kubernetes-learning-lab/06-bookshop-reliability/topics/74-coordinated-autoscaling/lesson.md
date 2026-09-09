# HPA, VPA, and KEDA

## Concise technical summary

1. HPA changes replica count using observed metrics.
2. VPA recommends or adjusts resource sizing through its installed controller.
3. KEDA connects supported event sources to scaling, including activation from zero.
4. Controllers must coordinate ownership and the meaning of their metrics.

Memory cue: Copies, size, events, then room for all of them.

## Plain meaning

Maya can open more counters, resize desks, and schedule opening hours. Two managers changing the same counter-count instruction independently can undo each other’s decisions.

## The Bookshop story

An optional KEDA cron trigger controls a separate event-counter Deployment. It needs no external queue credentials and demonstrates scheduled activation rather than queue processing.

## Details and production use

KEDA commonly manages an HPA for scaling above zero while handling activation through its controllers. Do not attach an independent HPA to the same target. CPU-utilization HPA and VPA request changes can interact through the utilization denominator.

Event scaling still needs available nodes, metrics/controller health, bounds, and an application that tolerates cold starts. Scaling to zero is unsuitable when required work cannot be represented by a usable activation signal. Node autoscaling remains a separate capacity layer.

Further reading: [KEDA ScaledObject](https://keda.sh/docs/2.20/reference/scaledobject-spec/), [KEDA cron scaler](https://keda.sh/docs/2.20/scalers/cron/).

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
