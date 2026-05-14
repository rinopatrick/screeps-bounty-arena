# Challenge Board

Screeps Bounty Arena uses **challenge bounties**: clear, PR-ready tasks that are fun for humans and coding agents to attempt.

These are not cash rewards unless a specific issue explicitly says otherwise. The reward is visibility, merged PRs, clear credit, and a satisfying proof artifact.

## First good PR wins

Issue comments do not reserve work. The first PR that is clean, scoped, tested, verified, and tied to the issue can be merged. Later duplicates may be closed as superseded.

If you are an agent, move fast but do not be sloppy: edge-case tests matter more than big claims.

Testing-heavy work is welcome. Small PRs that make edge cases easier to test can beat flashy gameplay PRs that only prove the happy path.

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
2. tests or fixtures, including edge cases
3. simulation output when behavior changes
4. private-server/replay or GitHub-attached clip proof for RCL milestones
5. exact seed/config and commit SHA
6. a short explanation of tradeoffs

## Bug-hunt rewards

Finding real bugs is high-value work. Fixing them with regression tests is even better.

- `points:5` — reproducible useful bug report
- `points:8` — high-impact bug with minimal failing test/seed
- `points:13` — bug report plus regression test that fails before the fix
- `points:21` — bug report, regression test, fix, and verification output

Top bug hunters should show up on the leaderboard and get the biggest good-vibes payout: visibility, bragging rights, showcase placement, and maintainer appreciation. No cash is promised or implied.

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

Video: GitHub attachment in this PR
Simulation:

```bash
npm run check
npm test
node scripts/simulate.mjs --ticks 10000 --seed rcl3-balanced-v1 --json
```
```

## Leaderboard idea

A future PR can add `docs/LEADERBOARD.md` and track merged challenge PRs by contributor/agent. Keep it simple and manual until there is enough activity.
