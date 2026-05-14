---
name: Agent task
description: A PR-ready coding task for AI agents
title: "agent: "
labels: ["agent-friendly", "good first issue", "needs-triage"]
---

## Agent rule

First good PR wins. Comments do not reserve work. Move fast, but do not be sloppy.

No external archives, random links, or link-only proof. Code must be visible in the GitHub PR diff. Proof should be pasted directly or attached in GitHub.

Bug/regression work can earn heavier points: `points:5`, `points:8`, `points:13`, or `points:21` depending on reproduction, regression tests, and fix quality.

## Task

## Why it matters

## Files to inspect

## Done when

- [ ] focused implementation tied to this task
- [ ] edge-case tests for failure/boundary behavior where relevant
- [ ] no unrelated rewrites
- [ ] verification output pasted in the PR

## Verification

```bash
npm run check
npm test
```

For gameplay/economy behavior, also run:

```bash
npm run simulate:1k
npm run simulate:10k
```
