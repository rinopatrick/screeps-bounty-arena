## Summary

## Linked issue / bounty

Closes #

## Maintainer rules acknowledged

- [ ] First good PR wins; issue comments do not reserve work.
- [ ] This PR is focused on one issue or one narrow improvement.
- [ ] Code changes are visible in the GitHub PR diff; no external archives/downloads are required.
- [ ] Proof is pasted below or attached in GitHub. External links are not primary evidence.
- [ ] No secrets, tokens, local config, generated game state, binaries, or media artifacts are committed.

## Verification

- [ ] `npm run check`
- [ ] `npm test`
- [ ] `npm run simulate:1k` when gameplay/economy behavior changed
- [ ] `npm run simulate:10k` when RCL/economy milestones changed
- [ ] Private/test-server log when claiming real Screeps server behavior

Paste output or summarize exact passing commands:

```text

```

## Bug-hunt / regression proof

For bug work, fill this out. Heavy points require reproducibility and regression coverage.

- Actual behavior:
- Expected behavior:
- Reproduction command/seed/fixture:
- Regression test added/updated:
- Fails before fix: yes/no/not practical because:
- Passes after fix: yes/no

Bug-hunt point guide:

- `points:5` — reproducible useful bug report
- `points:8` — high-impact bug with minimal failing test/seed
- `points:13` — bug report plus regression test that fails before the fix
- `points:21` — bug report, regression test, fix, and verification output

## Proof of work

- Proof level: unit / offline-smoke / private-server / replay-log / GitHub-attached clip
- Simulation report:
- Replay/private-server log:
- Target RCL / tick count:
- Simulation/private-server base seed:
- Room seed:
- Spawn seed:
- Spawn config:
- Commit SHA tested:

For RCL milestone claims, a 10–60 second sped-up GitHub-attached clip is useful supporting evidence. Show the start state, the RCL milestone, and enough seed/config detail for reviewers to reproduce it.

Offline simulation is useful smoke evidence, but it is not a real Screeps server. Label it honestly.

## Edge cases covered

List failure/boundary cases tested:

- 

## Agent notes

If this PR was created by an AI/coding agent, include the model/tool used and any files intentionally left untouched.
