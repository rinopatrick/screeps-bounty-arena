# Challenge Points

Challenge points are a lightweight recognition system for Screeps Bounty Arena.

They are **not money**, not a payout promise, and not a guarantee of merge. They are used to estimate scope, track contributor activity, and highlight showcase-worthy work.

## Where points live

Points are tracked in three places:

1. Issue labels such as `points:1`, `points:2`, `points:3`, `points:5`, `points:8`, `points:13`, and `points:21`.
2. This ledger, once a PR is merged and verified.
3. `docs/LEADERBOARD.md`, which can summarize merged challenge work.

## Point values

- `points:1` — small docs, checklist, label, or issue hygiene task
- `points:2` — focused test/docs/proof/template task
- `points:3` — medium implementation with tests or simulation proof
- `points:5` — larger gameplay, RCL milestone, private-server, or proof workflow work

## Bug-hunt rewards

Bug work is worth more because it improves trust in the bot. The best submissions do not just report a bug; they trap it with a regression test and fix it.

- `points:5` — confirmed bug report with clear reproduction, expected behavior, actual behavior, and likely files
- `points:8` — confirmed high-impact bug report with minimal failing test or simulation seed
- `points:13` — bug report plus a focused regression test that fails before the fix
- `points:21` — bug report, regression test, fix, and verification output proving the bug stays fixed

Legendary bug fixes can also receive showcase placement and the biggest **good-vibes payout**: top README leaderboard position, bragging rights, maintainer praise, and visible credit. No cash payout is promised or implied.


## Award rules

Points are awarded only after:

1. the PR is merged or the maintainer lands a cleaned implementation based on the PR,
2. checks/tests pass,
3. the work is tied to an issue or maintainer decision,
4. the contribution is recorded in the ledger.

For bug reports, points are awarded only when the bug is reproducible and useful. For bug fixes, regression tests are expected unless the maintainer records why they are impractical.

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
| 2026-05-14 | 2 | nicovaleops | #20 | #52 | Room memory cleanup and migration helpers | Merged clean duplicate; superseded #48. |
| 2026-05-14 | 3 | kingzzoov-ctrl | #21 | #49 | Tower defense skeleton | Merged after current-main dry merge and simulation verification. |
| 2026-05-14 | 3 | kingzzoov-ctrl | #22 | #50, commit `632f1ae` | Repairer role with road/wall priorities | Landed via cleaned maintainer integration due stale conflicts. |
| 2026-05-14 | 3 | kingzzoov-ctrl | #51 | #54, commit `616de81` | Source container mining and hauler handoff | Landed via cleaned maintainer integration due stale conflicts. |
| 2026-05-14 | 5 | kingzzoov-ctrl | #37 | #53, commit `5db54e7` | Private/test-server deploy workflow | Landed safe credential-free manual handoff path. |
| 2026-05-14 | 2 | Lukefen | #34 | #58, commit `1f842f5` | README challenge overview | Landed via cleaned maintainer README integration due stale conflicts. |
| 2026-05-14 | 3 | messiawrq-spec | #57 | #59 | Emergency spawn recovery | Merged clean PR after current-main dry merge and simulation verification. |
| 2026-05-14 | 3 | Ric-TengYi | #56 | #60 | Early road planner and simulation proof | Merged with admin after dry-merge verification because branch was behind. |
| 2026-05-14 | 3 | kingzzoov-ctrl | #43 | #55, commit `03a60f8` | RCL 2 extension construction planner | Landed via cleaned maintainer integration due stale conflicts. |
| 2026-05-14 | 13 | ya-nsh | #71 | #84, commit `e5a40a6` | Harden corrupted creep Memory cleanup | Bug/regression fix with tests; check/test/seeded sim passed. |
| 2026-05-14 | 13 | ya-nsh | #70 | #85, commit `d56155c` | Skip empty tower actions | Bug/regression fix with tests; check/test/seeded sim passed. |
| 2026-05-14 | 2 | eggy-e4e | #73 | #86, commit `6725422` | No-controller room edge-case fixtures/tests | First good PR for no-controller tests; check/test/seeded sim passed. |
| 2026-05-14 | 13 | AdrianIp0204 | #67 | #87, commit `3b05066` | Spawn planner impossible-spawn regression guards | Bug/regression fix with busy/low-energy/no-source/retry tests; check/test/1k/10k/seeded sim passed. |

## Maintainer notes

- Use `docs/MAINTAINER_DECISIONS.md` for reasoning.
- Use this file for points/credit tracking.
- Use `docs/LEADERBOARD.md` for a higher-level showcase summary.
- Keep points conservative and transparent.
- After editing this ledger, run `npm run leaderboard:update` to refresh `docs/LEADERBOARD.md` and the README leaderboard block.
