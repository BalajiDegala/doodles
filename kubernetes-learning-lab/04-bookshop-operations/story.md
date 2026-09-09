# The Bookshop gets an operations desk

Maya has two counters serving the same catalog. A working page was only the beginning.

## Morning: make changes understandable

A colleague proposes a new welcome message. Maya previews the change before publishing it (21). A stock check ends normally, another fails, and another waits for permission to start (22). She decides which processes should retry (23). A helper prepares a noticeboard while a server displays it (24). The team compares running the shop on Kubernetes, Docker Swarm, and ECS without declaring one tool universally best (25).

## Lunch: keep enough counters open

Some tasks need Linux shelves or access to a reserved work area (26). Related workers should sit near each other, but duplicate counters should spread when space allows (27). Busy counters need more copies (28); oversized desks need better sizing, and an overcrowded building may need more rooms (29).

## Afternoon: access, packaging, and storage

Only approved visitors should reach the catalog service (30). The stock observer may read Pod records but must not delete them or read Secrets (31). A Helm chart packages the same small website as a repeatable release (32). A storage request asks the existing storage team for a locker (33). Planned maintenance must respect how many counters remain ready (34). A Kustomize overlay changes a plain YAML base for a practice environment (35).

## Closing: update safely and leave cleanly

The noticeboard updates without replacing its server because the server rereads the mounted file (36). Workers run without root privileges and may write only to approved volumes (37). An admission rule checks new Pods before allowing them in (38). A closing hook records that shutdown has begun; the application still needs its own shutdown logic (39). Finally, Maya considers a service mesh only if service-to-service identity, encryption, and traffic policy justify the added moving parts (40).

These are learning models. A CPU loop is not a checkout application, a static health file is not a business transaction, and a PVC is not a backup. Each runbook states exactly what its demonstration proves.
