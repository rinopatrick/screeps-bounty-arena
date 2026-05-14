import { execFileSync } from "node:child_process";
import { describe, expect, it } from "vitest";

describe("offline simulation", () => {
  it("runs a deterministic 1000 tick smoke simulation", () => {
    const output = execFileSync(
      "node",
      ["scripts/simulate.mjs", "--ticks", "1000", "--seed", "test", "--json"],
      {
        encoding: "utf8",
      },
    );
    const result = JSON.parse(output) as {
      ok: boolean;
      ticks: number;
      trustLevel: string;
      caveat: string;
      seeds: { roomSeed: string; spawnSeed: string; spawnConfig: string };
      gates: Array<{ name: string; ok: boolean }>;
      final: { rcl: number; creeps: number; energyCapacity: number };
      milestones: Array<{ tick: number; rcl: number }>;
    };

    expect(result.ok).toBe(true);
    expect(result.ticks).toBe(1000);
    expect(result.trustLevel).toBe('smoke');
    expect(result.caveat).toContain('not a full Screeps engine');
    expect(result.seeds).toEqual({
      baseSeed: "test",
      roomSeed: "test:room",
      spawnSeed: "test:spawn",
      spawnConfig: "balanced",
    });
    expect(result.final.rcl).toBeGreaterThanOrEqual(2);
    expect(result.final.creeps).toBeGreaterThan(1);
    expect(result.final.energyCapacity).toBeGreaterThanOrEqual(300);
    expect(result.milestones.length).toBeGreaterThan(0);
    expect(result.gates).toContainEqual({ name: 'max-failures', ok: true, expected: 0, actual: 0 });
  });

  it('fails with a non-zero exit code when an explicit RCL gate is missed', () => {
    expect(() =>
      execFileSync('node', ['scripts/simulate.mjs', '--ticks', '100', '--require-rcl', '8', '--json'], {
        encoding: 'utf8',
      }),
    ).toThrow();
  });

  it('fails with a non-zero exit code when an invalid spawn-config is provided', () => {
    expect(() =>
      execFileSync('node', ['scripts/simulate.mjs', '--spawn-config', 'invalid', '--json'], {
        encoding: 'utf8',
      }),
    ).toThrow();
  });

  it("prints a paste-ready markdown report", () => {
    const output = execFileSync(
      "node",
      [
        "scripts/simulate.mjs",
        "--ticks",
        "1000",
        "--seed",
        "test",
        "--markdown",
      ],
      {
        encoding: "utf8",
      },
    );

    expect(output).toContain("## Screeps Simulation Report");
    expect(output).toContain("| Room seed |");
    expect(output).toContain("| Spawn seed |");
    expect(output).toContain("| Spawn config |");
    expect(output).toContain("Trust level: **smoke**");
    expect(output).toContain("| Model |");
    expect(output).toContain("| Final RCL |");
    expect(output).toContain("| Energy capacity |");
    expect(output).toContain("| Creep count |");
    expect(output).toContain("| Failures |");
    expect(output).toContain("### Gates");
    expect(output).toContain("### Milestones");
  });

  it("runs a reproducible seeded simulation suite", () => {
    const output = execFileSync(
      "node",
      [
        "scripts/simulate-seeded.mjs",
        "--runs",
        "2",
        "--ticks",
        "1000",
        "--require-rcl",
        "2",
        "--require-rcl-by",
        "1000",
        "--seed-base",
        "unit-seed",
        "--json",
      ],
      { encoding: "utf8" },
    );
    const result = JSON.parse(output) as {
      ok: boolean;
      seedBase: string;
      cases: Array<{ seed: string; ok: boolean; spawnConfig: string }>;
    };

    expect(result.ok).toBe(true);
    expect(result.seedBase).toBe("unit-seed");
    expect(result.cases.map((entry) => entry.seed)).toEqual([
      "unit-seed:run-1:conservative",
      "unit-seed:run-2:balanced",
    ]);
    expect(result.cases.every((entry) => entry.ok)).toBe(true);
  });

  it('enables remote mining when safe and protects home energy', () => {
    const output = execFileSync(
      'node',
      ['scripts/simulate.mjs', '--ticks', '2000', '--spawn-config', 'aggressive', '--remote-mining', '--remote-min-harvesters', '1', '--remote-target', '1', '--remote-min-energy', '0', '--json'],
      { encoding: 'utf8' },
    );
    const result = JSON.parse(output) as {
      ok: boolean;
      ticks: number;
      remoteMining: {
        enabled: boolean;
        active: boolean;
        workersAssigned: number;
        homeEnergyMin: number;
        homeEnergyMax: number;
        homeEnergyAvg: number | null;
        selected: { distance: number } | null;
        failureReason: string | null;
      } | undefined;
      final: { rcl: number };
    };

    expect(result.ok).toBe(true);
    expect(result.remoteMining).toBeDefined();
    expect(result.remoteMining!.enabled).toBe(true);
    expect(result.remoteMining!.active).toBe(true);
    expect(result.remoteMining!.workersAssigned).toBeGreaterThan(0);
    expect(result.remoteMining!.homeEnergyMin).toBeGreaterThanOrEqual(0);
    expect(result.remoteMining!.selected).not.toBeNull();
    expect(result.remoteMining!.selected!.distance).toBe(5);
    // Colony should still reach at least RCL 2
    expect(result.final.rcl).toBeGreaterThanOrEqual(2);
  });

  it('does not activate remote mining when home harvesters threshold is too high', () => {
    const output = execFileSync(
      'node',
      [
        'scripts/simulate.mjs',
        '--ticks',
        '1000',
        '--remote-mining',
        '--remote-min-harvesters',
        '100',
        '--json',
      ],
      { encoding: 'utf8' },
    );
    const result = JSON.parse(output) as {
      ok: boolean;
      remoteMining: {
        enabled: boolean;
        active: boolean;
        failureReason: string | null;
      } | undefined;
    };

    expect(result.ok).toBe(true); // Overall simulation should still succeed
    expect(result.remoteMining).toBeDefined();
    expect(result.remoteMining!.enabled).toBe(true);
    expect(result.remoteMining!.active).toBe(false);
    expect(result.remoteMining!.failureReason).toContain('insufficient home harvesters');
  });
});
