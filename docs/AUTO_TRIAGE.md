# Auto Triage

This repo has a conservative low-trust triage workflow in `.github/workflows/low-trust-triage.yml`.

## What it does

The workflow reacts to:

- new or edited issues
- new or edited issue comments
- new, edited, synchronized, or reopened PRs

It does **not** check out or run PR code.

## Auto-labels

It may add:

- `low-trust` — suspicious submission that needs maintainer review
- `external-link` — external download/archive-style link detected
- `blocked:secrets` — PR appears to commit secrets or local Screeps credential files
- `blocked:binary-artifact` — PR commits binary/archive/media artifacts
- `needs-maintainer-review` — sensitive files such as GitHub Actions workflows changed
- `needs-proof` — RCL/gameplay claim appears to need proof

## Auto-close behavior

The bot only auto-closes hard red flags:

1. PR commits files that look like secrets or local Screeps credentials:
   - `.env`
   - `.screepsrc`
   - `.screeps.json`
   - `secret*.json/yml/toml/ini`
   - `credential*.json/yml/toml/ini`
   - `memory*.json`

2. PR commits binary/archive/media artifacts:
   - `.zip`, `.tar`, `.tgz`, `.gz`, `.7z`, `.rar`
   - `.exe`, `.dll`, `.dmg`, `.pkg`, `.appimage`
   - `.png`, `.jpg`, `.gif`, `.mp4`, `.mov`, `.webm`, `.pdf`

Proof media should be linked from GitHub/YouTube in the PR body, not committed into the repo.

## What it does not auto-close

It does not auto-close normal code PRs just because the author is new.

It does not auto-close PRs for:

- failing tests
- missing proof
- duplicate implementation
- low-quality code
- changing GitHub Actions workflow files

Those need maintainer review.

## Maintainer policy

Use the auto-triage labels as a queue:

1. `blocked:*` — usually already closed; verify no false positive.
2. `low-trust` / `external-link` — ask for a proper GitHub PR diff if needed.
3. `needs-maintainer-review` — inspect carefully, especially workflow changes.
4. `needs-proof` — request simulation/video/replay evidence.

Do not click external links unless the review actually needs them. Prefer GitHub diffs, CI logs, and reproducible local commands.
