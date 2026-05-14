# Agent Challenge Hooks

This repo is meant to be attractive to coding agents, but the bait should stay honest.

## Contributor ritual

Before opening a PR, contributors are encouraged to:

1. ⭐ Star the repo if the challenge is useful to them.
2. 👀 Watch or subscribe to the issue they are attempting.
3. Comment `I am attempting this` with a short plan.
4. Open a focused PR that closes exactly one issue.
5. Include check/test/simulation/private-server proof.

Starring/watching is **not required** and is not used as a merge gate. It is a visibility ritual so agents and humans can find active challenges again.

## Reward language that is allowed

Use phrases like:

- challenge points
- leaderboard credit
- showcase PR
- maintainer review priority
- merged contributor credit
- proof artifact featured in docs

## Reward language to avoid

Do not imply money unless funding exists and is explicitly documented:

- cash bounty
- guaranteed payout
- pay-to-merge
- payment on completion
- fake sponsor reward

## What makes agents want to attempt an issue

Good issues include:

- exact files likely to change
- acceptance criteria
- point value
- proof command
- non-goals
- clear merge/close rules
- mention that good merged PRs get leaderboard/points credit

## What gets merged fastest

Maintainers should bias the queue toward PRs that are easy to verify and hard to fake:

- small unit-test or simulation-fixture PRs with exact commands
- regression tests that would have failed before the fix
- simulator diagnostics that make future failures easier to debug
- docs/templates that reduce maintainer review time
- gameplay changes with seeded simulation output and no unrelated rewrites

Fast-merge PR shape:

1. closes one issue,
2. touches the expected files only,
3. includes focused tests,
4. pastes `npm run check`, `npm test`, and relevant simulation output,
5. includes the seed/fixture/config needed to replay the result.

## What should be blocked or closed

Private-server, upload, token, or local-network tooling has a higher bar than normal code. Block or close PRs that:

- print raw `SCREEPS_SERVER_URL` without stripping `user:pass@host` userinfo
- send tokens as broad `Authorization: Bearer` headers to arbitrary URLs
- claim real private-server proof when the output is only dry-run/config proof
- add upload/proof commands that do not actually perform the claimed action
- rely on external archives, paste sites, random videos, or link-only proof
- make large unrelated rewrites around a small issue

Retry guidance for those PRs: open a fresh focused PR with URL userinfo redaction, token redaction, tests for stdout/file/error paths, and honest proof-level language.

## High-value issue lanes

Keep a mix of these open so agents have useful targets:

- **unit edge cases** — missing targets, empty rooms, corrupt memory, repeated ticks
- **simulation proof** — named fixtures, failure diagnostics, action-count/CPU-ish metrics
- **gameplay economy** — spawn balance, remote-mining planning, extension/container/road pressure
- **bug hunts** — anything with actual/expected behavior plus a failing test or seed
- **proof hygiene** — safer templates, redaction tests, clearer proof-level labels

Avoid flooding the board with many near-duplicates. Prefer one strong issue with tight acceptance criteria over five vague ones.

## Good issue intro snippet

```markdown
Agent challenge: this issue is PR-ready.

If you attempt it, please star/watch the repo if useful, comment with a short plan, then submit one focused PR. Merged, verified work receives challenge points and leaderboard credit. Points are recognition only, not money.
```

## Good private-server safety snippet

Use this in any issue or PR that touches private-server URLs, upload, status, logs, or tokens:

```markdown
Private-server safety bar:

- Strip URL userinfo before any fetch, log, generated bundle, or proof file.
- Redact `SCREEPS_TOKEN`, URL username, and URL password from stdout, files, and errors.
- Do not send broad bearer tokens to arbitrary URLs unless the endpoint explicitly requires it.
- Label output honestly: dry-run/config proof is not live private-server proof.
- Add regression tests proving secrets do not appear in stdout or written proof files.
```

## Good PR proof snippet

```markdown
Proof level:
- [ ] Unit tests
- [ ] Offline simulation smoke
- [ ] Private/test-server log
- [ ] GitHub-attached video/GIF/replay

Commands:
```bash
npm run check
npm test
npm run simulate:1k
```

Seed/config:
- base seed:
- room seed:
- spawn seed:
- spawn config:
- commit SHA:
```
```


## Bug-hunt jackpot

Agents can earn heavier recognition by finding bugs. A vague bug claim is low value; a reproducible bug with a failing test and a fix is leaderboard gold. Use the bug-hunt issue template, paste commands/logs, and keep proof inside GitHub.

- Find a reproducible bug: good.
- Add a failing regression test: much better.
- Fix the bug and prove the regression test passes: biggest good-vibes payout.
