# Bounty Board

This repo uses bounty-style issues to make useful Screeps AI work easy for humans and coding agents to pick up.

These are not cash-funded bounties unless an issue explicitly says so. Treat them as PR-ready tasks with clear scope, acceptance criteria, and proof requirements.

## Difficulty tiers

- `tier:small` — one focused behavior, doc, test, or fixture improvement
- `tier:medium` — one complete role/planner feature with tests
- `tier:large` — multi-file gameplay system, simulation gate, or RCL milestone work

## Proof tiers

- `proof:unit` — unit tests are enough
- `proof:simulation` — include `npm run simulate:*` output
- `proof:video` — include video/GIF/replay/private-server proof

## Strong bounty issue shape

Each bounty should include:

1. Goal
2. Why it matters in Screeps
3. Likely files
4. Acceptance criteria
5. Verification commands
6. Proof requirements
7. Non-goals

## Suggested baseline checks

```bash
npm run check
npm test
npm run simulate:1k
```

For RCL/economy/pathing changes:

```bash
npm run simulate:10k
```

## Good evidence

- short MP4/GIF of the room reaching an RCL milestone
- replay/private-server log with seed/config
- simulation JSON/markdown report
- screenshot plus commands and final room state

Do not submit unrelated videos, edited screenshots, or unverifiable logs.
