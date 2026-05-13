# PR Triage Notes

Use this to manage the current wave of bot/agent PRs.

## Current queue shape

There are several categories:

### Infrastructure / safer first

- CI simulation jobs
- markdown simulation reports
- proof templates
- docs/checklists

These are good early merge candidates if clean.

### Small gameplay helpers

- energy-aware body generation
- source assignment

Review for correctness and tests. Merge one clean implementation at a time.

### Role implementations

- upgrader role
- builder role

There may be duplicate PRs. Choose one implementation per role and close/reject duplicates politely.

### Larger economy/RCL changes

Do not merge these casually until the test-server path exists.

## Suggested immediate order

1. Review CI simulation PR.
2. Review markdown simulation report PR.
3. Review energy-aware body generation PRs; pick one if duplicated.
4. Review source assignment PR.
5. Compare upgrader PRs; pick one.
6. Review builder PR after smaller pieces merge.
7. Defer RCL milestone PRs until private/test server plan exists.

## Review comments to use

### Needs normal PR, not archive

> Thanks. For safety and reviewability, please submit code as a normal GitHub PR rather than an external archive/download link. Video/proof links are fine as supporting evidence, but code must be reviewable directly in GitHub.

### Duplicate PR

> Thanks for this. Another PR is currently covering the same issue, so I’m going to compare implementations and merge only one clean path. If this one is not selected, you’re very welcome to pick up another open challenge issue.

### Needs proof

> This touches gameplay/economy behavior. Please add verification output from `npm run check`, `npm test`, and the relevant simulation command. For RCL claims, include seed/config and tick reached.

### Too broad

> This PR changes more scope than the issue asks for. Please narrow it to the specific behavior, keep unrelated rewrites out, and include tests for the changed logic.

## Merge discipline

Never merge several PRs at once. Merge one, update main, run checks, then continue.
