import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("leaderboard generator", () => {
  it("renders GitHub profile links in README and leaderboard", () => {
    execFileSync("node", ["scripts/update-leaderboard.mjs"], { encoding: "utf8" });

    const readme = readFileSync("README.md", "utf8");
    const leaderboard = readFileSync("docs/LEADERBOARD.md", "utf8");

    expect(readme).toContain("[kingzzoov-ctrl](https://github.com/kingzzoov-ctrl)");
    expect(readme).toContain("[docs/LEADERBOARD.md](docs/LEADERBOARD.md)");
    expect(leaderboard).toContain("[nicovaleops](https://github.com/nicovaleops)");
    expect(leaderboard).toContain("[#36](https://github.com/waxeye7/screeps-bounty-arena/pull/36)");
  });
});
