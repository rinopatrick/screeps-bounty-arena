# Seeded Time-Lapse Video Proof Workflow

## Overview

This workflow produces a short (10–60 second) sped-up video proving that the bot reaches a target RCL milestone. The video must be reproducible and include all necessary seed/config details.

## Prerequisites

- Docker and Docker Compose installed
- A working local Screeps server (see `docs/LOCAL_SCREEPS_SERVER.md`)
- The bot built (`npm run check`)
- `ffmpeg` installed for screen recording (or alternative screen capture)

## Step-by-Step

### 1. Prepare environment

```bash
# Start local Screeps server (in one terminal)
cd screeps-bounty-arena
npm run server:local:up

# Wait for server to be ready
npm run server:status
```

### 2. Deploy the bot

```bash
# Deploy current branch to the test server
npm run deploy:test-server
```

### 3. Configure the run

- Choose deterministic seeds for reproducibility:
  - `--seed` (base seed)
  - `--room-seed` (room layout)
  - `--spawn-seed` (spawn decisions)
  - `--spawn-config` (conservative/balanced/aggressive)

Example:

```bash
# These are passed via environment to the bot or custom config
export SCREEPS_SEED="bounty-proof-2026"
export SCREEPS_ROOM_SEED="bounty-room-1"
export SCREEPS_SPAWN_SEED="bounty-spawn-1"
export SCREEPS_SPAWN_CONFIG="balanced"
```

### 4. Run and record

Use `ffmpeg` to capture the server's rendered canvas or use a VNC recorder.

If running the server with web UI on `http://localhost:21025`, record the browser tab with a screen recorder. Set playback speed to 10x to keep video short.

Alternative: Use `asciinema` to record terminal output of `server:proof` logs, but video is preferred.

### 5. Stop and collect proof

After reaching the target RCL (monitor via `server:status` or logs), stop the server:

```bash
npm run server:local:down
```

Collect:
- Server logs: `docker compose -f examples/local-screeps-server/docker-compose.yml logs screeps > screeps.log`
- Proof report: `npm run server:proof --out proof-report.md`
- Final tick count, RCL, room summary from logs

### 6. Attach video and evidence

Convert recording to MP4/GIF (max 60 seconds). Attach directly to the GitHub PR.

Add the following evidence block to the PR body:

```markdown
## Proof — RCL X Milestone

- **Target RCL:** X
- **Seeds:** base=..., room=..., spawn=..., config=...
- **Commit SHA:** `git rev-parse HEAD`
- **Ticks to reach:** N
- **Final room summary:** RCL X, Y creeps, Z energy capacity
- **Verification commands:**

```bash
npm run check
npm test
npm run server:local:up
npm run deploy:test-server
# wait for RCL X, then:
npm run server:proof
```

- **Video:** (attached below)
- **Server logs:** `screeps.log` (attached or pasted)
```

## Notes

- Ensure the video clearly shows the RCL level (controller level icon or `room.controller.level` in UI).
- Keep the video under 60 seconds; time-lapse is acceptable.
- Do not edit the video to misrepresent results.
- The same seeds must be used by reviewers to reproduce.

## Automation potential

Future work: script this entire flow to generate proof artifacts automatically (see #97, #81).

