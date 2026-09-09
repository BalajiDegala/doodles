# Multi-container patterns: reading the manifests

File: [noticeboard Pod](manifests/10-noticeboard.yaml).

`containers` has two entries: `writer` and `web`. Both mount volume `notice` at `/www`, but the server mount is read-only. Pod-level `fsGroup: 1000` enables the non-root writer to use the supported volume.

The writer loops every five seconds. It writes a timestamped page to `index.next`, then `mv` renames it to `index.html` within the same volume. Publishing a completed file this way avoids exposing a partly written page.

The server runs `exec httpd -f -p 8080 -h /www`. The readiness check requests `/`; before the first page exists it may fail temporarily. Ordinary containers do not have a guaranteed start order, so readiness accounts for that race.

The `emptyDir` is shared scratch space for this Pod only. Pod deletion loses the noticeboard; that is acceptable because it can be regenerated. A Service is unnecessary here because local port-forwarding is enough to observe the example.

Continue with the [runbook](runbook.md).
