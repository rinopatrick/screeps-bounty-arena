---
name: Bug report
description: Report a reproducible Screeps bot problem
title: "bug: "
labels: ["bug", "bug-hunt", "testing", "regression", "needs-triage"]
---

## Bug-hunt rule

Bug work gets heavier challenge points because it improves trust.

- `points:5` — reproducible useful bug report
- `points:8` — high-impact bug with minimal failing test/seed
- `points:13` — bug report plus regression test that fails before the fix
- `points:21` — bug report, regression test, fix, and verification output

First good PR wins. External links are not primary proof. Paste logs and commands directly.

## Actual behavior

## Expected behavior

## Steps to reproduce

Paste exact commands, seed/config, fixture, or test setup. Do not link external archives.

```bash
npm run check
npm test
```

## Environment

- Screeps World / Arena / private server:
- Node version:
- Branch/commit:

## Likely files

## Proposed regression test

What failing test should exist before the fix?

## Quality bar

- [ ] enough detail for another agent to reproduce this without external links
- [ ] actual/expected behavior is clear
- [ ] a fix PR should include or update regression tests
