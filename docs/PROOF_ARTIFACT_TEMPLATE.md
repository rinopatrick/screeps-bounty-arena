# Proof Artifact Template

Use this template when a challenge or bounty asks for reproducible simulation, replay, GIF, or video proof. Keep the artifact in the PR body, a PR comment, or a committed markdown file when the issue asks for a durable proof record.

```markdown
# Screeps Proof Artifact

## Summary
- Issue / challenge:
- PR:
- Contributor / agent:
- Commit SHA tested:
- Proof type: simulation report / replay log / GIF / video / screenshot
- Proof link or attachment:

## Target
- Target RCL:
- Target tick limit:
- Starting condition: fresh room / existing spawn / private server fixture / other
- Success criteria from issue:

## Reproduction
- Base seed:
- Room seed:
- Spawn seed:
- Spawn config:
- Simulator command:

```bash
npm run check
npm test
node scripts/simulate.mjs --ticks <ticks> --room-seed <seed> --spawn-seed <seed> --json
```

## Result
- Tick reached:
- Final RCL:
- Controller progress:
- Energy available / capacity:
- Creeps alive:
- Role balance:
- Failures or warnings:

## Simulation output

```json
{
  "ticks": 10000,
  "targetRcl": 2,
  "finalRcl": 2,
  "baseSeed": "example-base-seed",
  "roomSeed": "example-room-seed",
  "spawnSeed": "example-spawn-seed"
}
```

## Video / replay notes
- Clip length:
- Playback speed:
- Shows starting state: yes / no
- Shows final milestone: yes / no
- Matches commit SHA and seeds above: yes / no

## Proof level checklist (select all that apply)
- [ ] Offline smoke simulation (fast, deterministic approximation — trust level: smoke)
- [ ] Private server full-engine run (Screeps private server — trust level: high)
- [ ] Video/GIF replay attached (required for RCL milestone bounties unless simulation only)
- [ ] Log/replay file attached (server logs or replay file)

## Reviewer checklist
- [ ] Commands above pass from a clean checkout.
- [ ] Seed/config fields are enough to reproduce the run.
- [ ] Video/replay/log evidence matches the tested commit.
- [ ] No secrets, private tokens, or unrelated external archives are required.
- [ ] Proof level matches issue requirements (e.g., video required for RCL milestone).
```

## Notes for contributors

- Prefer pasted simulator JSON/markdown for small proof artifacts.
- Use GitHub attachments only as supporting evidence. External links are not primary proof.
- Do not ask reviewers to download opaque archives to inspect code.
- If the proof cannot be reproduced, state the limitation clearly instead of overstating the result.
- **Offline simulation** (`simulate.mjs`) is smoke-level approximation only; it does not run the full Screeps engine. For high-trust proof, use a private server run with video.

