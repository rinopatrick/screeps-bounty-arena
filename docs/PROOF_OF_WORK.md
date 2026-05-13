# Proof of Work for Bounty PRs

Bounty PRs should include evidence that the bot behavior works, not just a code diff.

## Preferred proof

For gameplay/economy changes, attach at least one of:

- a short video of a room reaching the requested RCL milestone
- a GIF or screen recording of the room behavior
- a simulation report showing the requested tick count and RCL milestone
- a replay/private-server log with the seed/config used

## RCL milestone proof

If a bounty asks for `RCL X`, the PR should include:

1. target RCL, e.g. `RCL 3`
2. starting condition, e.g. fresh room / existing spawn / private server fixture
3. tick count reached
4. final room summary
5. video/GIF/screenshot evidence when available
6. exact verification commands

Example PR evidence block:

```markdown
## Proof

Target: reach RCL 3
Environment: offline simulation + local private server
Ticks: 10,000
Result: reached RCL 4 at tick 2,944

Commands:

```bash
npm run check
npm test
npm run simulate:10k
```

Video: <attach mp4/gif or link>
Simulation report: <paste JSON/markdown summary>
```

## Do not fake proof

Do not upload unrelated gameplay footage, edited results, fake logs, or screenshots that do not match the submitted code. If video proof is not practical, explain why and provide reproducible logs instead.

## Future automation targets

Good future tasks:

- CI artifact containing simulation report
- markdown report generator for PR comments
- headless replay capture
- private-server smoke test
- automated GIF/video capture of milestone runs
