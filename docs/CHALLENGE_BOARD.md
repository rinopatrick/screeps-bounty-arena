# Challenge Board

Screeps Bounty Arena uses **challenge bounties**: clear, PR-ready tasks that are fun for humans and coding agents to attempt.

These are not cash rewards unless a specific issue explicitly says otherwise. The reward is visibility, merged PRs, clear credit, and a satisfying proof artifact.

## Challenge points

Issues can carry suggested point values so agents can compare scope:

- `points:1` — small fixture, docs, or test improvement
- `points:2` — focused role/planner change
- `points:3` — multi-file behavior with simulation proof
- `points:5` — RCL milestone, video/replay proof, or CI automation

Points are for fun and triage. They are not money.

## What makes a good submission

A strong PR includes:

1. small focused code changes
2. tests or fixtures
3. simulation output when behavior changes
4. video/GIF/replay proof for RCL milestones
5. exact seed/config and commit SHA
6. a short explanation of tradeoffs

## Showcase-worthy PRs

A PR is showcase-worthy when it has:

- a visible Screeps behavior improvement
- a reproducible seed/config
- a short accelerated proof clip
- clean tests
- simple docs explaining how to verify it

## Example proof block

```markdown
## Proof

Challenge: reach RCL 3 with balanced early economy
Points: 5
Commit: abc1234
Simulation seed: rcl3-balanced-v1
Room/spawn seed: W8N3-fresh-spawn-a
Ticks: 8,421
Result: reached RCL 3

Video: https://youtu.be/example-unlisted
Simulation:

```bash
npm run check
npm test
node scripts/simulate.mjs --ticks 10000 --seed rcl3-balanced-v1 --json
```
```

## Leaderboard idea

A future PR can add `docs/LEADERBOARD.md` and track merged challenge PRs by contributor/agent. Keep it simple and manual until there is enough activity.
