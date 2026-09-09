# Container lifecycle hooks

## Concise technical summary

1. postStart runs near container creation without ordering the main entrypoint after it.
2. preStop runs before the termination signal during an eligible graceful stop.
3. The Pod's grace period includes hook time and application shutdown time.
4. Hooks must tolerate repeated delivery and cannot guarantee recovery from every failure.

Memory cue: Start can race; stop shares the clock.

## Plain meaning

Maya opens a counter while a helper puts up its opening sign. Either action might become visible first. At closing, the helper posts a closing sign before the worker leaves, but both actions must fit within the remaining closing time.

## The Bookshop story

The `closing-worker` watches an `emptyDir` for hook markers and prints what it sees. A preStop hook writes a marker and pauses briefly. The main shell then receives TERM and logs its own shutdown response.

## Ordering and limits

Use an init container when preparation must finish before the application starts. postStart is not that ordering guarantee. preStop consumes the same termination grace period as the application's shutdown, so a long hook can leave too little time for the process.

Hook commands should be short and safe to repeat. A failed hook can terminate the container; events can report failures. Hook output is not automatically the main container's log stream. [Container lifecycle hooks](https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/).

The practice worker logs marker files so the effect is observable. It does not handle customer requests. A fixed sleep cannot prove that traffic has drained, and a node failure can prevent graceful hooks altogether. Real applications need signal handling, connection draining, and timeouts appropriate to their work.

Read the [manifest walkthrough](manifest-guide.md), then follow the [runbook](runbook.md).
