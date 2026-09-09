# Labels, Selectors, and Annotations

## Concise technical summary

1. Labels are key-value tags attached to Kubernetes objects.
2. Selectors use those labels to find the right objects.
3. Our Deployment and Service both select Pods labelled app=hello-web.
4. Annotations hold descriptions or tool settings without defining label membership.

Memory cue: Labels tag, selectors match, annotations explain.

Read the [manifest walkthrough](manifest-guide.md) to connect these points to the YAML.

## Plain meaning

Kubernetes objects have metadata that helps people and controllers identify and connect them.

- A **name** identifies one resource of a kind within its scope.
- A **label** is a short key-value tag used for grouping and selection.
- A **selector** finds objects whose labels match.
- An **annotation** stores descriptive or tool-specific information that is not used as an identity selector.

Imagine luggage at an airport. A label such as `flight=AB123` helps machinery select where the bag goes. An annotation can hold a longer handling note for people or tools.

## Connection to the shared project

Application Pods have the label:

```yaml
app: hello-web
```

The Deployment uses that label to recognize the Pods it manages. The Service uses the same label to find network destinations.

```text
Deployment selector --+
                      +--> Pods labelled app=hello-web
Service selector ----+
```

If the Service label value is misspelled, the Service exists but has no application endpoints.

The project also uses recommended-style labels such as `app.kubernetes.io/part-of`. That makes it possible to list all participating Pods with one selector.

Annotations such as `learning.ops2book/purpose` explain why a resource exists. They are useful for descriptions, tool settings, checksums, and ownership references, but they are not used to route Service traffic.

## Practical rules

- Keep Deployment selectors and Pod-template labels consistent.
- Plan Deployment selectors carefully because they cannot be freely changed after creation.
- Use stable labels for automation.
- Use annotations for information that should not determine membership.
- Check selector results before a bulk action.

Use [runbook step 9](../../runbook.md#9-inspect-labels-selectors-and-annotations) to see the live metadata connections.

Further reading: [Labels and selectors](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/) and [annotations](https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/).
