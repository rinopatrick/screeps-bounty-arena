# Maintaining Screeps Bounty Arena

This repo is now attracting bot/agent PRs. Treat it like a small public project with a queue, not like a private scratchpad.

## Current maintainer stance

- Challenge points are not cash.
- External archives are not accepted for code review.
- Code must be submitted as normal GitHub PR diffs.
- Proof videos/links are supporting evidence only.
- Do not run untrusted PR code outside the review workflow.
- Do not deploy unreviewed PR code to a real Screeps account.
- The low-trust triage workflow may label or close obvious unsafe submissions. See `docs/AUTO_TRIAGE.md`.

## Daily / session workflow

0. Record notable decisions in `docs/MAINTAINER_DECISIONS.md`.
1. Check open PRs.
2. Sort PRs into: small infra, tests, gameplay, duplicate, risky.
3. Review the smallest safest PR first.
4. Require CI/tests before merge.
5. Prefer one merge at a time.
6. After each merge, update local `main` and rerun checks.
7. Close duplicate PRs politely once one implementation wins.

## PR review order

Use this order unless something urgent appears:

1. Docs/templates/checklist PRs
2. CI/test infrastructure PRs
3. Simulation/reporting PRs
4. Small isolated gameplay helpers
5. One role implementation at a time
6. Larger planner/economy changes
7. RCL milestone changes only after test-server workflow exists

## Safe review checklist

For every PR:

- [ ] Read the GitHub diff before checking out code.
- [ ] Check for external links, archives, binaries, or generated junk.
- [ ] Check for secrets, tokens, `.env`, `.screepsrc`, memory dumps, or credentials.
- [ ] Check changed files are relevant to the issue.
- [ ] Run `npm run check`.
- [ ] Run `npm test`.
- [ ] Run simulation if gameplay/economy behavior changed.
- [ ] Decide: merge, request changes, close duplicate, or defer.

## External link policy

Do not click random links from PRs/issues by default.

Allowed with care:

- GitHub PR diffs
- GitHub-hosted text logs
- GitHub Actions output
- video proof links only after inspecting the URL and only when needed

Not accepted for code review:

- external zip/tar archives
- pastebin patch dumps
- binary attachments
- unknown download hosts

If someone posts an external archive, reply asking for a normal PR.

## Duplicate PR policy

If two PRs solve the same issue:

1. Pick the smaller, cleaner, better-tested implementation.
2. Comment on the other PR explaining it overlaps.
3. Invite the author to rebase or tackle another issue.
4. Close the duplicate after the chosen PR merges.

## Merge policy

Before merging:

- CI should pass, or local checks must pass with a clear reason CI is absent.
- No external archive dependency.
- No secrets or generated local state.
- No giant unrelated rewrites.
- PR description should include verification output.

After merging:

```bash
git checkout main
git pull
npm run check
npm test
npm run simulate:1k
```

For economy/RCL changes also run:

```bash
npm run simulate:10k
```

## When to use a real Screeps account

Not yet.

Use real-account deploy only after:

1. CI is reliable.
2. Private/test server path exists.
3. Deployment script is explicit and manual.
4. Secrets are stored in GitHub Actions or local env, not in the repo.
5. Only reviewed `main` code is deployed.

See `docs/DEPLOYMENT_PLAN.md`.
