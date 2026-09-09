# Blue-Green Deployment in Plain Language

## Concise technical summary

1. Blue-green keeps a current release and a candidate release running together.
2. We test the candidate before changing the Service selector.
3. Switching the selector moves new traffic after network updates propagate.
4. Keeping the old release ready gives us a quick traffic rollback.

Memory cue: Prepare, test, switch, return if needed.

Read the [manifest walkthrough](manifest-guide.md) to connect these points to the YAML.

## The main idea

A blue-green deployment keeps two complete application releases running:

- **Blue** is the release currently receiving user traffic.
- **Green** is the new release being checked.

Imagine a shop with two fully prepared counters. Customers are sent to the blue counter. The green counter is staffed and tested without customers. When it is ready, the entrance sign is changed so every new customer goes to green. If a serious problem appears, the sign can point back to blue.

In this lab, the Service is the entrance sign.

## Traffic flow

Before the switch:

```text
User -> Service selector: app=storefront, version=blue -> Blue Pods
                                                        Green Pods are ready but unused
```

After the switch:

```text
User -> Service selector: app=storefront, version=green -> Green Pods
         Blue Pods stay ready for a quick rollback
```

The switch changes a Service selector. It does not rebuild the Pods.

## The example in this folder

This lab creates:

- Namespace `k8s-learning-blue-green`.
- A blue ConfigMap and Deployment showing release `1.0`.
- A green ConfigMap and Deployment showing release `2.0`.
- Service `storefront`, initially selecting blue Pods.

Both Deployments use the label `app=storefront`. Their `version` labels are different:

| Release | Pod labels | Initially receives traffic |
| --- | --- | --- |
| Blue | `app=storefront`, `version=blue` | Yes |
| Green | `app=storefront`, `version=green` | No |

The Service starts with the selector `app=storefront, version=blue`.

## Why teams use it

- The new release can start and become ready before receiving user traffic.
- The traffic change is quick.
- Rollback is quick while the old release is still running.

## Costs and limits

- Two complete releases temporarily need roughly twice the application capacity.
- A Service selector gives an all-at-once switch; it does not gradually move traffic.
- Existing long-lived network connections may continue to their old destination until they reconnect.
- Database changes must work with both releases during the change. Removing or renaming a database column too early can break the old release and remove the safe rollback path.
- Kubernetes readiness only proves the configured check passed. It does not prove every business feature works, so test green before switching.

Continue with [runbook.md](runbook.md).
