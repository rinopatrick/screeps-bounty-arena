# Testing Strategy

This repo rewards clean behavior that survives edge cases, not big claims.

## Test pyramid

1. **Unit tests** for role/planner decisions.
2. **Fixture tests** for Screeps-like room/spawn/creep objects.
3. **Offline smoke simulation** for cheap regression gates.
4. **Private/test-server proof** for real Screeps engine behavior.
5. **Real account deploy** only after reviewed manual approval outside the repo.

Offline simulation is intentionally limited. It catches obvious regressions and helps compare behavior, but it is not a replacement for private-server validation.

## Required gates by change type

### Docs-only

- `npm run check`
- no unrelated generated files

### Role/planner logic

- `npm run check`
- `npm test`
- focused unit tests for the changed branch
- edge-case tests for empty/invalid/missing Screeps objects

### Economy/pathing/spawn changes

- `npm run check`
- `npm test`
- `npm run simulate:1k`
- `npm run simulate:10k`
- pasted simulation output in the PR

### RCL milestone claims

- all economy/pathing/spawn gates
- seed/config and commit SHA
- private/test-server log when available
- GitHub-attached clip/GIF only as supporting evidence

## Edge cases agents should test

- no spawns
- no creeps
- no sources
- missing controller
- hostile controller / unowned room
- spawn already busy
- spawn has too little energy
- full construction-site limit
- invalid room memory from older versions
- dead or missing creep memory references
- pathfinding returns incomplete or empty paths
- sources with no accessible adjacent tiles
- controller downgrade pressure
- structures at max hits
- roads/walls/ramparts with different repair priorities
- tower has no energy
- towers must choose between attack, heal, and repair
- CPU-like budget/operation count pressure
- repeated ticks should be idempotent and not spam construction sites

## What reviewers should reject

- tests that only check the happy path
- broad rewrites without edge-case coverage
- PRs that claim RCL success from offline smoke only
- proof hidden behind external links
- generated screenshots/videos committed into the repo
- code that passes tests by weakening assertions
- changes that make simulation easier without improving bot behavior

## Good PR shape

A strong testing PR usually changes one module and one test file, or adds one reusable fixture with tests that demonstrate it.

A strong behavior PR includes:

- one focused behavior improvement
- one happy-path test
- at least one edge-case test
- simulation output if economy behavior changed
- no unrelated formatting churn
