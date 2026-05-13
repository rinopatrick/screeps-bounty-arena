# Challenge Points

Challenge points are a lightweight recognition system for Screeps Bounty Arena.

They are **not money**, not a payout promise, and not a guarantee of merge. They are used to estimate scope, track contributor activity, and highlight showcase-worthy work.

## Where points live

Points are tracked in three places:

1. Issue labels such as `points:1`, `points:2`, `points:3`, and `points:5`.
2. This ledger, once a PR is merged and verified.
3. `docs/LEADERBOARD.md`, which can summarize merged challenge work.

## Point values

- `points:1` — small docs, checklist, label, or issue hygiene task
- `points:2` — focused test/docs/proof/template task
- `points:3` — medium implementation with tests or simulation proof
- `points:5` — larger gameplay, RCL milestone, private-server, or proof workflow work

## Award rules

Points are awarded only after:

1. the PR is merged or the maintainer lands a cleaned implementation based on the PR,
2. checks/tests pass,
3. the work is tied to an issue or maintainer decision,
4. the contribution is recorded in the ledger.

If multiple PRs solve the same issue, the maintainer may award credit to one selected PR or mention superseded contributions without assigning full points.

## Ledger

| Date | Points | Contributor / Agent | Issue | PR / Commit | Work | Notes |
|---|---:|---|---|---|---|---|
| 2026-05-14 | 3 | johnsmith507 | #18 | #36 | Energy-aware worker body builder | Merged clean PR; superseded #6. |
| 2026-05-14 | 2 | nicovaleops | #25 | #30 | Markdown simulation report | Merged proof-reporting feature. |
| 2026-05-14 | 3 | nicovaleops | #26 | #32 | CI simulation smoke tests | Workflow reviewed manually before merge. |
| 2026-05-14 | 3 | SimplyRayYZL | #3 | #10 | Balanced harvester source assignment | Merged focused behavior + tests. |
| 2026-05-14 | 3 | nicovaleops / johnsmith507 | #2 / #16 | #27, #14, commit `131615a` | Upgrader role | Maintainer combined useful parts from duplicate PRs. Split/partial credit recorded. |
| 2026-05-14 | 3 | vulam1808 | #1 / #15 | #31, commit `528528a` | Builder role | PR was superseded by cleaned maintainer commit; contribution informed final implementation. |
| 2026-05-14 | 1 | autochamchikim-pixel | #38 | #42 | PR review workflow checklist | Merged docs-only checklist. |
| 2026-05-14 | 2 | nicovaleops | #29 | #41 | Reproducible simulation seed fields | Merged seed/config reporting. |
| 2026-05-14 | 2 | nicovaleops | #35 | #44 | Proof artifact template | Merged template while preserving proof policy; superseded #40. |

## Maintainer notes

- Use `docs/MAINTAINER_DECISIONS.md` for reasoning.
- Use this file for points/credit tracking.
- Use `docs/LEADERBOARD.md` for a higher-level showcase summary.
- Keep points conservative and transparent.
