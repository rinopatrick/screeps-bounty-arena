#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs';

const pointsPath = 'docs/POINTS.md';
const leaderboardPath = 'docs/LEADERBOARD.md';
const readmePath = 'README.md';

const points = readFileSync(pointsPath, 'utf8');
const rows = points
  .split('\n')
  .filter((line) => /^\| \d{4}-\d{2}-\d{2} \|/.test(line))
  .map((line) => line.split('|').map((cell) => cell.trim()))
  .map((cells) => ({
    date: cells[1],
    points: Number(cells[2]),
    contributors: cells[3],
    issue: cells[4],
    pr: cells[5],
    work: cells[6],
    notes: cells[7],
  }));

const totals = new Map();
const entries = [];
for (const row of rows) {
  const contributors = row.contributors.split(/\s+\/\s+/).map((name) => name.trim()).filter(Boolean);
  for (const contributor of contributors) {
    const current = totals.get(contributor) ?? { points: 0, merged: 0 };
    current.points += row.points;
    current.merged += 1;
    totals.set(contributor, current);
  }
  entries.push(row);
}

const ranked = [...totals.entries()]
  .map(([name, value]) => ({ name, ...value }))
  .sort((a, b) => b.points - a.points || b.merged - a.merged || a.name.localeCompare(b.name));

function rankEmoji(index) {
  return ['🥇', '🥈', '🥉'][index] ?? `${index + 1}.`;
}

const topRows = ranked.slice(0, 10).map((entry, index) =>
  `| ${rankEmoji(index)} | ${entry.name} | ${entry.points} | ${entry.merged} |`,
).join('\n');

const leaderboard = `# Leaderboard\n\nManual showcase board for merged challenge PRs.\n\nChallenge points are not money. They are scope/recognition points for merged, verified work. The top contributors earn the biggest **good-vibes payout**: repo visibility, bragging rights, showcase placement, and maintainer appreciation.\n\nDetailed ledger: [POINTS.md](POINTS.md)\n\n## Top contributors\n\n| Rank | Contributor / Agent | Points | Credited merges |\n|---:|---|---:|---:|\n${topRows}\n\n## Merged work ledger\n\n| Points | Contributor / Agent | PR / Commit | Challenge | Proof / Notes |\n|---:|---|---|---|---|\n${entries.map((row) => `| ${row.points} | ${row.contributors} | ${row.pr} | ${row.work} | ${row.notes} |`).join('\n')}\n\n## Rules\n\n- Do not add fake contributors.\n- Do not add unmerged PRs as completed work.\n- Do not claim cash prizes.\n- First good PR wins.\n- Bug reports earn points only when they are reproducible and useful.\n- Bug fixes earn bigger points when they include regression tests.\n- Prefer proof that is stable and reproducible.\n- Record detailed reasoning in \`docs/MAINTAINER_DECISIONS.md\`.\n`;

writeFileSync(leaderboardPath, leaderboard);

const readme = readFileSync(readmePath, 'utf8');
const block = `## Leaderboard\n\nTop merged contributors earn the biggest **good-vibes payout**: visibility, bragging rights, showcase placement, and maintainer appreciation. No cash is promised or implied.\n\n| Rank | Contributor / Agent | Points | Credited merges |\n|---:|---|---:|---:|\n${topRows}\n\nFull board: [docs/LEADERBOARD.md](docs/LEADERBOARD.md)\n`;
const start = '<!-- LEADERBOARD:START -->';
const end = '<!-- LEADERBOARD:END -->';
const pattern = new RegExp(`${start}[\\s\\S]*?${end}`);
const nextReadme = pattern.test(readme)
  ? readme.replace(pattern, `${start}\n${block}${end}`)
  : readme.replace('### Difficulty tiers', `${start}\n${block}${end}\n\n### Difficulty tiers`);
writeFileSync(readmePath, nextReadme);
