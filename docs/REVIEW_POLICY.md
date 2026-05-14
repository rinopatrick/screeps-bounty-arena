# Review Policy

This repo is agent-friendly, not gullible.

## Hard stance

- No external code archives.
- No random download links.
- No committed binaries/media/proof dumps.
- No secrets or local Screeps config.
- No fake bounties, fake proof, fake contributors, fake stars, or fake funding.
- No pay-to-merge or payment promises.
- No vague “trust me” RCL claims.

## Links

External links are not accepted as primary proof or code submission.

Allowed:

- GitHub PR diffs
- pasted logs in PR comments
- GitHub issue/PR attachments when needed
- links to other files inside this repository

Low-trust / not enough by itself:

- external video sites
- Google Drive / Dropbox / Mega / file hosts
- Pastebin/gists
- external archives
- external screenshots without reproducible commands

If a PR includes external links, maintainers may label it `low-trust`, ignore the link, and request pasted/reproducible proof. If the link is an archive/download/binary/source bundle, close the PR.

## Proof hierarchy

1. Code visible in GitHub diff.
2. Unit tests.
3. Offline smoke simulation with explicit gates.
4. Pasted private/test-server logs with seed/config and commit SHA.
5. GitHub-attached short clip/GIF as supporting evidence only.

Offline simulation is useful, but not real Screeps proof. Video without seed/config/logs is weak proof.

## Maintainer behavior

- Prefer closing bullshit quickly over debating it.
- Merge one PR at a time.
- Leave clear public reasons when merging or closing.
- Cleanly integrate useful stale PRs if rebasing is not worth it.
- Keep the board stocked with good issues, not noisy duplicates.
