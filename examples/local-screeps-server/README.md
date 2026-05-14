# Local Screeps private server example

This folder is a Docker Compose starter for local/private Screeps testing.

It uses the community `screepers/screeps-launcher` image with Mongo and Redis. Keep it local and disposable.

## Quick start

```bash
cd examples/local-screeps-server
cp .env.example .env
cp config.example.yml config.yml
# edit .env and set STEAM_KEY

docker compose up -d
```

Initialize the database once:

```bash
docker compose exec screeps screeps-launcher cli
```

Inside the Screeps CLI:

```js
system.resetAllData()
```

Exit with `Ctrl-D`, then restart the server:

```bash
docker compose restart screeps
```

Connect with the Screeps client:

- Private Server tab
- Host: `localhost`
- Port: `21025`
- Password: blank unless you set one

If using `screepsmod-auth`, set a local password in the browser after startup:

```text
http://localhost:21025/authmod/password
```

## Proof for PRs

Do not commit videos or local server state. Put proof in the PR body/comment:

```bash
docker compose ps
docker compose logs --tail=120 screeps
npm run server:proof -- --compose-dir examples/local-screeps-server --markdown
```

For videos/GIFs, attach a short clip directly to the GitHub PR. External video links are supporting evidence only, not primary proof.

## Reset local state

This destroys local test-server state only:

```bash
docker compose down -v
```

Then start over from the quick-start steps.

## Notes

- Do not use your real Screeps account token here.
- Do not expose the port to the internet.
- Do not commit `.env`, `config.yml`, Mongo dumps, Redis dumps, screenshots, or videos.
- Keep seeds/config/logs pasted in PRs so reviewers can reproduce the run.

## Repo-root helpers

From the repo root, the same workflow is available as:

```bash
npm run server:local:up
npm run server:local:ps
npm run server:local:logs
npm run server:local:cli
npm run server:local:reset
```
