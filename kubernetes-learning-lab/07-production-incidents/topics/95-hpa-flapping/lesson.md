# 95. HPA repeatedly scales up and down

Source: supplied Kubernetes PDF, question 95, pages 45-46. Practice: **Optional autoscaling inspection**.

## Concise technical summary

1. HPA reacts to sampled metrics and can oscillate around a target.
2. Scale-down stabilization uses recent recommendations to avoid premature shrinking.
3. Rate limits constrain how quickly replicas may change.
4. Inspect metric quality, requests, and competing writers before tuning behavior.

Memory cue: Check the signal, then slow the shrink.

## Plain meaning

Maya closes a counter after each quiet moment and immediately reopens it when the queue returns. A longer observation window avoids constant rearrangement.

## The Bookshop story

An optional HPA controls a separate small catalog worker with bounded replicas and conservative scale-down settings. The exercise inspects behavior without generating unbounded load.

## Diagnosis and production details

A CPU utilization target uses requests as its denominator. Changing requests through VPA can change utilization without changing CPU work. Multiple writers to replicas can resemble HPA flapping. Compare HPA recommendations, events, metric freshness, readiness delays, and application demand history.

The scale-down window chooses the highest relevant recent recommendation; it is not simply a timer requiring continuously low metrics. Its interaction with missing data, tolerance, policies, and multiple metrics matters. Increasing the target may reduce responsiveness or cause undercapacity. Do not choose a universal percentage from a single trace.

Read the [manifest walkthrough](manifest-guide.md) and [runbook](runbook.md).

Further reading: [Horizontal Pod Autoscaling](https://kubernetes.io/docs/concepts/workloads/autoscaling/horizontal-pod-autoscale/).
