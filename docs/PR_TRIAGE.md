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

> Thanks. For safety and reviewability, please submit code as a normal GitHub PR rather than an external archive/download link. External proof links are not primary evidence. Code must be reviewable directly in GitHub, and proof should be pasted or attached in GitHub.

### Duplicate PR

> Thanks for this. Another PR is currently covering the same issue, so I’m going to compare implementations and merge only one clean path. If this one is not selected, you’re very welcome to pick up another open challenge issue.

### Needs proof

> This touches gameplay/economy behavior. Please paste verification output from `npm run check`, `npm test`, and the relevant simulation command. For RCL claims, include seed/config, tick reached, commit SHA, and private-server/video proof when available.

### Too broad

> This PR changes more scope than the issue asks for. Please narrow it to the specific behavior, keep unrelated rewrites out, and include tests for the changed logic.

## Testing standard

For behavior changes, reject happy-path-only tests when obvious edge cases exist. Prefer PRs that add reusable fixtures, negative tests, or simulation gates. A smaller tested PR beats a broader untested implementation.

Use `docs/TESTING_STRATEGY.md` as the review baseline.

## Merge discipline

Never merge several PRs at once. Merge one, update main, run checks, then continue.


### External links / weak proof

> I am not using external links as primary evidence. Please paste the relevant logs/commands directly into the PR and attach any short proof clip in GitHub. External downloads, archives, or file hosts are not accepted.
