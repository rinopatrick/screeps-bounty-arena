# RCL 2 Milestone Proof - Bounty #23

## Proof Summary

This document provides reproducible proof that the Screeps bounty arena bot reaches **RCL 2** from a fresh room starting condition using the current main branch codebase.

**Status**: ✅ VERIFIED - Simulation gate passed successfully
**Milestone**: RCL 2 reached at tick 13
**Gate requirement**: RCL 2 by tick 1000 (exceeded by 987 ticks)

---

## Target

| Field | Value |
|-------|-------|
| Target RCL | 2 |
| Target tick limit | 1000 |
| Starting condition | Fresh room (no prior development) |
| Success criteria | Reach RCL 2 on or before tick 1000 |

---

## Reproduction

### Environment

| Field | Value |
|-------|-------|
| Base seed | `screeps-bounty-arena` |
| Room seed | `screeps-bounty-arena:room` |
| Spawn seed | `screeps-bounty-arena:spawn` |
| Spawn config | `balanced` |
| Model | `offline-smoke-v1` |
| Commit SHA | `43aaaa0f91c25c2c5305a7a082ed91bea02b0f83` |

### Verification Commands

```bash
# Build and test (pre-requisite checks)
npm run check
npm test

# Run RCL 2 gate simulation
npm run simulate:gate:rcl2

# Alternative: run with explicit parameters
node scripts/simulate.mjs --ticks 1000 --require-rcl 2 --require-rcl-by 1000 --markdown
```

**Expected result**: Command exits with code 0 and displays "PASS required-rcl: expected RCL 2 by tick 1000, actual tick 13."

---

## Result

| Metric | Value |
|--------|-------|
| Ticks simulated | 1000 |
| Gate passed | ✅ Yes (exit code 0) |
| Final RCL (tick 1000) | 7 |
| Tick RCL 2 reached | **13** |
| Energy capacity at RCL 2 | 400 |
| Controller progress at RCL 2 | Complete (RCL 2 achieved) |
| Creeps alive at RCL 2 | 2 |
| Failures during simulation | 0 |

### Full Milestone Timeline

| Tick | RCL | Energy Capacity | Creeps |
|------|-----|-----------------|--------|
| 13 | **2** ✅ | 400 | 2 |
| 41 | 3 | 500 | 2 |
| 97 | 4 | 600 | 2 |
| 197 | 5 | 700 | 2 |
| 372 | 6 | 850 | 2 |
| 685 | 7 | 950 | 2 |

---

## Simulation Output

```markdown
## Screeps Simulation Report

> Trust level: **smoke**. Deterministic approximation only; not a full Screeps engine or private-server proof.

| Metric | Value |
| --- | --- |
| Ticks | 1000 |
| Seed | `screeps-bounty-arena` |
| Room seed | `screeps-bounty-arena:room` |
| Spawn seed | `screeps-bounty-arena:spawn` |
| Spawn config | `balanced` |
| Model | `offline-smoke-v1` |
| OK | yes |
| Final RCL | 7 |
| Energy capacity | 1000 |
| Creep count | 2 |
| Failures | 0 |

### Gates
- PASS max-failures: expected 0, actual 0.
- PASS required-rcl: expected RCL 2 by tick 1000, actual tick 13.

### Milestones
- Tick 13: reached RCL 2 with 2 creeps and 400 energy capacity.
- Tick 41: reached RCL 3 with 2 creeps and 500 energy capacity.
- Tick 97: reached RCL 4 with 2 creeps and 600 energy capacity.
- Tick 197: reached RCL 5 with 2 creeps and 700 energy capacity.
- Tick 372: reached RCL 6 with 2 creeps and 850 energy capacity.
- Tick 685: reached RCL 7 with 2 creeps and 950 energy capacity.

### Failures
- None.
```

---

## Code Changes Required

**None.** The current main branch codebase already satisfies the RCL 2 milestone gate. No modifications are necessary; this is a documentation/verification PR only.

---

## Notes

- **Proof level**: This is Level 2 (offline smoke simulation) proof per [SIMULATION_LIMITS.md](docs/SIMULATION_LIMITS.md). For stronger proof (Level 3+), a private/test server run or video capture would be needed.
- **Reproducibility**: The simulation uses fixed seeds and deterministic modeling. Any reviewer can reproduce this exact run using the commands above.
- **Gate margin**: The bot reaches RCL 2 at tick 13, which is 987 ticks ahead of the gate requirement (tick 1000). This provides a significant safety margin.

---

## PR Template

### Description

This PR adds reproducible proof that the Screeps bounty arena bot reaches **RCL 2** from a fresh room using the current main branch codebase.

**Milestone**: RCL 2 achieved at tick 13 (gate requirement: by tick 1000)
**Commit**: `43aaaa0f91c25c2c5305a7a082ed91bea02b0f83`
**Proof level**: Offline simulation (Level 2 smoke test)
**Code changes**: None — this is a documentation/verification PR

### Verification Steps

```bash
# Clone and setup
git clone <FORK_URL>
cd screeps-bounty-arena
git checkout main
git pull origin main

# Install dependencies
npm ci

# Run pre-requisite checks
npm run check
npm test

# Run RCL 2 gate simulation
npm run simulate:gate:rcl2
```

✅ Expected: All checks pass, simulation exits with code 0, RCL 2 reached at tick 13.

### Linked Issue

Closes #23 (RCL 2 milestone proof requirement)

### Proof Artifact

- Full simulation report: `proof/rcl2-milestone/PROOF.md` (this file)
- Simulation output captured from: `npm run simulate:gate:rcl2`
- Reproducible with seeds: `screeps-bounty-arena` (base), `screeps-bounty-arena:room` (room), `screeps-bounty-arena:spawn` (spawn)

---

## References

- [PROOF_OF_WORK.md](docs/PROOF_OF_WORK.md) — Bounty proof requirements
- [SIMULATION_LIMITS.md](docs/SIMULATION_LIMITS.md) — Simulation trust levels
- [SIMULATION.md](docs/SIMULATION.md) — Simulation usage guide
