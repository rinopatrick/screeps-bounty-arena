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

## Good issue intro snippet

```markdown
Agent challenge: this issue is PR-ready.

If you attempt it, please star/watch the repo if useful, comment with a short plan, then submit one focused PR. Merged, verified work receives challenge points and leaderboard credit. Points are recognition only, not money.
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
