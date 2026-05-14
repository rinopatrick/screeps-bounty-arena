# Local Screeps Private Server

Use this when offline simulation is not enough. The goal is to give contributors a resettable local Screeps server so they can prove behavior against something much closer to the real game.

This is still not a real-account deploy path. Keep it local, disposable, and credential-safe.

## Recommended path: Docker Compose + screeps-launcher

The repo includes a starter setup in [`examples/local-screeps-server`](../examples/local-screeps-server).

It uses:

- `screepers/screeps-launcher`
- MongoDB
- Redis
- `screepsmod-auth`
- `screepsmod-admin-utils`
- `screepsmod-map-tool`
- `screepsmod-history`

The launcher image is multi-architecture, so it should work on normal desktop Linux, Apple Silicon, and Raspberry Pi 4/5 class ARM64 machines.

## Requirements

- Docker with Compose v2
- a Steam Web API key for the private server launcher
- Screeps client access for visual/manual testing

Get a Steam API key from Steam's developer page, then keep it in `.env`. Do not commit it.

## Start the server

```bash
cp examples/local-screeps-server/.env.example examples/local-screeps-server/.env
cp examples/local-screeps-server/config.example.yml examples/local-screeps-server/config.yml
# edit examples/local-screeps-server/.env and set STEAM_KEY

npm run server:local:up
```

Check status:

```bash
npm run server:local:ps
npm run server:local:logs
```

Initialize the database once:

```bash
npm run server:local:cli
```

Inside the Screeps CLI:

```js
system.resetAllData()
```

Exit with `Ctrl-D`, then restart:

```bash
docker compose restart screeps
```

Connect from the Screeps client:

- Private Server tab
- Host: `localhost`
- Port: `21025`
- Password: blank unless configured

If using auth, open this locally after startup:

```text
http://localhost:21025/authmod/password
```

## Deploy this bot for local proof

Current repo deploy support is intentionally conservative:

```bash
npm run check
npm test
npm run simulate:1k
npm run deploy:test-server
```

`npm run deploy:test-server` prepares `dist/main.js` without embedding credentials. It does **not** automatically upload code yet. That is deliberate until the private-server API/CLI upload path is hardened.

Use these environment variables for future/manual upload work:

```bash
export SCREEPS_SERVER_URL=http://127.0.0.1:21025
export SCREEPS_USERNAME=local-test-user
export SCREEPS_BRANCH=sandbox
# export SCREEPS_TOKEN=... only if your local auth path requires it
```

## Capture proof for a PR

Generate a PR-ready proof block:

```bash
npm run server:proof
```

Or write it to a file you can copy from:

```bash
node scripts/local-server-proof.mjs --out examples/local-screeps-server/proof/latest.md
```

Include in the PR:

- commit SHA tested
- server reset/setup commands
- seed/config used
- tick count observed
- final RCL or behavior observed
- relevant server log tail
- exact verification commands
- regression test name if it was a bug fix

## Video/GIF proof

Videos are useful for RCL milestones and visible behavior bugs, but they are supporting evidence only.

Good video proof:

- 10–60 seconds
- accelerated/time-lapse is fine
- starts from the room/spawn state
- shows the behavior or milestone clearly
- matches the commit SHA and seed/config in the PR
- is attached directly to the GitHub PR

Do not commit video files into the repo. Do not use external video links as primary proof.

Easy capture options:

- use your OS screen recorder
- use OBS Studio
- record the Screeps client window only if possible
- convert to GIF/WebM if the clip is short enough for GitHub attachment limits

## Reset local state

This destroys the local private-server world state only:

```bash
npm run server:local:reset
```

Then run the start/init steps again.

## Troubleshooting

### Docker is not installed

Install Docker Desktop or Docker Engine with Compose v2. This repo does not require Docker for unit tests or offline simulation, only for local private-server proof.

### Server starts but client cannot connect

Check:

```bash
npm run server:local:ps
npm run server:local:logs
```

Confirm the server is bound to localhost:

```bash
SCREEPS_LAUNCHER_HOST=127.0.0.1
```

Use host `localhost`, port `21025` in the Screeps client.

### Database is weird or stale

Reset the local server world:

```bash
npm run server:local:reset
npm run server:local:up
npm run server:local:cli
```

Inside CLI:

```js
system.resetAllData()
```

### Do not expose this server

Keep the bind address on `127.0.0.1` unless you intentionally need LAN access. Never expose this test server to the internet.

## Maintainer stance

For PR review, proof levels are:

1. unit tests
2. offline smoke simulation
3. local/private Screeps server logs
4. local/private Screeps server video/GIF as support
5. staging/real account only after separate manual approval

Private-server proof can make a PR much stronger, but tests and reproducible logs still matter more than a shiny clip.
