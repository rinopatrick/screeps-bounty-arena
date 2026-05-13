# Agent Instructions

This repo is intentionally friendly to coding agents and bounty bots.

## Mission

Improve a Screeps AI bot through small, reviewable pull requests.

## Rules for agent PRs

1. Pick one issue or one narrow improvement.
2. Keep changes small and readable.
3. Run `npm run check` and `npm test` before claiming success.
4. Add or update tests for behavior changes where practical.
5. For economy/gameplay changes, include proof: video/GIF, simulation report, replay log, or private-server output.
6. Do not commit secrets, private server credentials, `.env`, or generated game state.
7. Do not rewrite the whole architecture unless the issue explicitly asks for it.
8. Include a clear PR summary and verification notes.

## High-value bounty areas

- spawn planning
- harvester/upgrader/builder roles
- repair and wall maintenance
- creep body generation
- source assignment
- pathing and caching
- tower defense
- remote mining
- scout and expansion logic
- market/economy planning
- tests and simulation harnesses
- proof-of-work capture for RCL milestone runs

## Proof expectations

For RCL bounties, agents should upload a short room video/GIF or provide a reproducible simulation/private-server report showing the room reaching the requested RCL.

See [docs/PROOF_OF_WORK.md](docs/PROOF_OF_WORK.md).

## Discovery keywords

Screeps, Screeps AI, Screeps bot, Screeps World, Screeps Arena, AI agent, coding agent, bounty, bounties, agent bounty, pull request, TypeScript, game AI, colony AI, creep AI, automation.
