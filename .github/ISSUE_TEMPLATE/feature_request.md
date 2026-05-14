---
name: Feature request
description: Suggest a focused Screeps AI improvement
title: "feat: "
labels: ["enhancement", "screeps", "needs-triage"]
---

## Maintainer rule

First good PR wins. Comments do not reserve work. Keep proof inside GitHub: pasted logs, commands, test output, or GitHub attachments only. External links are not primary evidence.

## Problem

## Proposed behavior

## Why it matters

## Acceptance criteria

- [ ] focused implementation tied to this request
- [ ] edge-case tests for failure/boundary behavior where relevant
- [ ] no unrelated rewrites

## Verification

```bash
npm run check
npm test
```

For gameplay/economy behavior, also run the relevant simulation gate:

```bash
npm run simulate:1k
npm run simulate:10k
```
