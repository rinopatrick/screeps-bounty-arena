# Maintainer Decisions

This log records notable maintainer decisions so contributors and agents can understand why PRs were merged, closed, or superseded.

The goal is transparency, not bureaucracy.

## Principles

- Explain merge/close decisions in the PR thread.
- Prefer one clean implementation over duplicate overlapping PRs.
- Keep challenge points separate from money.
- Do not accept external archives as code submissions.
- Do not run or deploy unreviewed PR code to a real Screeps account.
- Merge small, verifiable changes before larger gameplay systems.

## Decision log

### 2026-05-14 — Added maintainer comments to prior PR decisions

Backfilled public comments on merged/closed PRs explaining why each action was taken and what verification was run.

Affected PRs:

- #36 merged: energy-aware worker body builder
- #6 closed: duplicate/superseded adaptive body generation
- #30 merged: markdown simulation report
- #32 merged: CI simulation smoke tests
- #10 merged: source assignment
- #27 closed: superseded by combined upgrader implementation
- #14 closed: superseded by combined upgrader implementation
- #31 closed: superseded by cleaned maintainer builder implementation

### 2026-05-14 — Selected #36 over #6 for worker body generation

Both PRs addressed adaptive worker bodies. #36 was selected because it was focused, passed checks, and integrated cleanly with the spawn planner.

#6 was closed as superseded to avoid duplicate implementations.

Verification used:

```bash
npm run check
npm test
node scripts/simulate.mjs --ticks 1000 --json
```

### 2026-05-14 — Merged #30 markdown simulation reports

Merged because it improves proof artifacts for future PRs without changing gameplay logic.

Verification used:

```bash
npm run check
npm test
node scripts/simulate.mjs --ticks 1000 --markdown
```

### 2026-05-14 — Merged #32 CI simulation smoke tests

Merged after manual review because it changed GitHub Actions workflow files.

Reasoning:

- adds typecheck, unit tests, 1k simulation, and 10k simulation to CI
- uses normal GitHub Actions and npm commands
- `package-lock.json` exists, so `npm ci` is appropriate

Verification used:

```bash
npm ci --dry-run
npm run check
npm test
npm run --silent simulate:1k
npm run --silent simulate:10k
```

### 2026-05-14 — Merged #10 source assignment

Merged because it was a focused improvement with deterministic tests for source assignment behavior.

Verification used:

```bash
npm run check
npm test
node scripts/simulate.mjs --ticks 1000 --json
```

### 2026-05-14 — Combined #27 and #14 into a maintainer upgrader commit

Both PRs implemented upgrader behavior and both had useful pieces, but they conflicted with newer `main` after other merges.

Maintainer action:

- created a clean combined upgrader implementation directly on `main`
- added upgrader dispatch
- added upgrader spawn planning
- added Screeps controller/store typings
- added tests
- closed both PRs as superseded with comments

Verification used:

```bash
npm run check
npm test
node scripts/simulate.mjs --ticks 1000 --json
```

### 2026-05-14 — Replaced #31 with a cleaned maintainer builder commit

#31 was not merged as-is because it included generated `analysis.json` metadata and builder behavior needed correction.

Maintainer action:

- added a clean builder role
- added builder dispatch
- added construction-site spawn planning
- added Screeps construction-site typings
- added tests
- closed #31 as superseded with an explanatory comment

Verification used:

```bash
npm run check
npm test
node scripts/simulate.mjs --ticks 1000 --json
```

### 2026-05-14 — Merged #42 PR review workflow checklist

Merged because it was a docs-only README update that links the maintainer workflow and PR triage guidance.

Verification used:

```bash
npm run check
npm test
```

### 2026-05-14 — Merged #41 reproducible simulation seed fields

Merged because reproducible room/spawn seeds are important for RCL proof and video/replay validation.

Verification used:

```bash
npm run check
npm test
node scripts/simulate.mjs --ticks 1000 --json
node scripts/simulate.mjs --ticks 1000 --seed builder-role --room-seed W8N3-alpha --spawn-seed spawn-a --spawn-config conservative --json
node scripts/simulate.mjs --ticks 1000 --markdown
```

### 2026-05-14 — Merged #44 proof artifact template and closed #40

#44 was merged because it added a reusable proof artifact template while preserving the existing proof policy.

#40 was closed as superseded because it removed too much of `docs/PROOF_OF_WORK.md` and weakened proof requirements.

Verification used:

```bash
npm run check
npm test
node scripts/simulate.mjs --ticks 100 --room-seed template-room --spawn-seed template-spawn --json
```

### 2026-05-14 — Merged #52 memory cleanup and closed #48

#52 was merged because it was the smaller, cleaner duplicate for #20 and had direct verification on the current runtime.

#48 was closed as superseded because it solved the same issue but reported local `npm test` was blocked by an older Node runtime.

Verification used:

```bash
npm run check
npm test
node scripts/simulate.mjs --ticks 1000 --json
```

### 2026-05-14 — Merged #49 tower defense skeleton

Merged because it was focused, isolated tower behavior and passed as a current-main dry merge after the memory changes landed.

Verification used:

```bash
npm run check
npm test
node scripts/simulate.mjs --ticks 1000 --json
```

### 2026-05-14 — Landed #50 repairer role via cleaned maintainer integration

#50 was valid on its branch but stale against current `main`, conflicting with memory and tower changes. The useful repairer implementation was landed in cleaned commit `632f1ae`; the PR was then closed with credit retained.

Verification used:

```bash
npm run check
npm test
node scripts/simulate.mjs --ticks 1000 --json
```

### 2026-05-14 — Landed #54 container mining and hauler handoff via cleaned maintainer integration

#54 was useful but stale against current `main`, conflicting with already-merged role/type changes. The miner/hauler behavior was landed in cleaned commit `616de81`; the PR was then closed with credit retained.

Verification used:

```bash
npm run check
npm test
node scripts/simulate.mjs --ticks 1000 --json
```

### 2026-05-14 — Landed #53 private/test-server workflow via cleaned maintainer integration

Landed because it adds a safe manual handoff path without real account deployment: `.screeps.example.json`, `deploy:test-server`, `server:status`, docs, and tests. Real `.screeps.json` remains ignored, no token is embedded, and upload is intentionally future work.

Verification used:

```bash
npm run check
npm test
node scripts/simulate.mjs --ticks 1000 --json
node scripts/deploy-test-server.mjs
node scripts/test-server-status.mjs
```

### 2026-05-14 — Landed #58 README overview via cleaned maintainer integration

#58 had useful docs, but conflicted with newer README sections. Landed a cleaned README update that preserves the current private/test-server and maintainer workflow sections while adding clearer challenge format, points/tier explanations, documentation links, and non-cash honesty language.

Verification used:

```bash
npm run check
npm test
```

### 2026-05-14 — Merged #59 emergency spawn recovery

Merged because it was a focused recovery safeguard for rooms with no harvesters and no miners. It blocks other economy spawns while trying to restore a recovery harvester.

Verification used:

```bash
npm run check
npm test
node scripts/simulate.mjs --ticks 1000 --json
```

### 2026-05-14 — Merged #60 early road planner

Merged because it adds deterministic early road construction planning from spawn to sources/controller, avoids occupied/reserved spots, caps construction sites per pass, and includes tests. The PR branch was behind, so it was merged with maintainer admin after a current-main dry merge passed.

Verification used:

```bash
npm run check
npm test
node scripts/simulate.mjs --ticks 1000 --json
node scripts/simulate.mjs --ticks 10000 --json
```

### 2026-05-14 — Landed #55 RCL 2 extension planner via cleaned maintainer integration

#55 passed on its own branch but conflicted with emergency recovery and road planner changes. Landed a cleaned integration with RCL 2 extension planning, loop wiring, typings, and tests.

Verification used:

```bash
npm run check
npm test
node scripts/simulate.mjs --ticks 1000 --json
node scripts/simulate.mjs --ticks 10000 --json
```

## Future decisions to record

Record decisions for:

- choosing between duplicate PRs
- closing PRs as unsafe or out of scope
- accepting workflow changes
- connecting any private/test Screeps deployment path
- enabling community spaces such as GitHub Discussions or Discord
