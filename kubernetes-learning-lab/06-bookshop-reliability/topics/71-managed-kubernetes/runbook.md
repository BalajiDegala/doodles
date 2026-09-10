# 71. EKS, GKE, and AKS: runbook

Run from the chapter directory, as shown in [shared setup](../../runbook.md).

## Prerequisites

The local files and provider documentation are enough. Do not provision resources to complete this comparison.

~~~powershell
kubectl -n k8s-learning-reliability get deployment reliable-catalog -o yaml
kubectl -n k8s-learning-reliability get service reliable-catalog -o yaml
~~~

## Comparison worksheet

For each provider, record the candidate region and compute mode, customer/provider responsibilities, identity approach, network/IP model, storage options, upgrade process, availability needs, and dated cost inputs. Include taxes/support/egress assumptions where relevant to an actual estimate.

Give a conditional recommendation for Maya’s stated requirements and list missing evidence. A local manifest validation is not proof of deployment on all three services. No account, billing setting, or infrastructure changes occur; no cleanup is needed.
