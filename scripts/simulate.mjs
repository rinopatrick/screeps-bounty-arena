#!/usr/bin/env node

import { pathToFileURL } from "node:url";
import { parseArgs } from "node:util";

const REMOTE_YIELD_PER_WORKER = 5;
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}

// Remote mining constant: net energy per remote worker per tick after travel costs

function main() {
  const { values } = parseArgs({
    options: {
      ticks: { type: "string", short: "t", default: "1000" },
      json: { type: "boolean", default: false },
      markdown: { type: "boolean", default: false },
      seed: { type: "string", default: "screeps-bounty-arena" },
      "room-seed": { type: "string" },
      "spawn-seed": { type: "string" },
      "spawn-config": { type: "string", default: "balanced" },
      "require-rcl": { type: "string" },
      "require-rcl-by": { type: "string" },
      "max-failures": { type: "string", default: "0" },
      "remote-mining": { type: "boolean", default: false },
      "remote-distance": { type: "string", default: "5" },
      "remote-target": { type: "string", default: "2" },
      "remote-min-harvesters": { type: "string", default: "3" },
      "remote-min-energy": { type: "string", default: "300" },
    },
  });

  const ticks = Number.parseInt(values.ticks, 10);
  if (!Number.isFinite(ticks) || ticks <= 0) {
    throw new Error(`--ticks must be a positive integer, got ${values.ticks}`);
  }

  const gates = parseGateOptions({
    requireRcl: values["require-rcl"],
    requireRclBy: values["require-rcl-by"],
    maxFailures: values["max-failures"],
  });

  const remoteOptions = {
    enabled: values["remote-mining"],
    distance: Number.parseInt(values["remote-distance"], 10),
    target: Number.parseInt(values["remote-target"], 10),
    minHarvesters: Number.parseInt(values["remote-min-harvesters"], 10),
    minEnergy: Number.parseInt(values["remote-min-energy"], 10),
  };

  const result = runOfflineSimulation({
    ticks,
    seed: values.seed,
    roomSeed: values["room-seed"],
    spawnSeed: values["spawn-seed"],
    spawnConfig: values["spawn-config"],
    gates,
    remoteOptions,
  });

  if (values.json && values.markdown) {
    throw new Error("Use only one output mode: --json or --markdown");
  }

  if (values.json) {
    console.log(JSON.stringify(result, null, 2));
  } else if (values.markdown) {
    console.log(formatMarkdownReport(result));
  } else {
    console.log(formatSummary(result));
  }

  if (!result.ok) {
    process.exitCode = 1;
  }
}

export function runOfflineSimulation({
  ticks,
  seed = "screeps-bounty-arena",
  roomSeed,
  spawnSeed,
  spawnConfig = "balanced",
  gates = {},
  remoteOptions = {},
}) {
  const validSpawnConfigs = ["conservative", "balanced", "aggressive"];
  if (!validSpawnConfigs.includes(spawnConfig)) {
    throw new Error(
      `Invalid spawn-config: ${spawnConfig}. Must be one of ${validSpawnConfigs.join(", ")}`,
    );
  }

  const remoteEnabled = remoteOptions.enabled || false;
  const remoteDistance = remoteOptions.distance ?? 5;
  const remoteTarget = remoteOptions.target ?? 2;
  const remoteMinHarvesters = remoteOptions.minHarvesters ?? 3;
  const remoteMinEnergy = remoteOptions.minEnergy ?? 300;

  const seeds = normalizeSimulationSeeds({
    seed,
    roomSeed,
    spawnSeed,
    spawnConfig,
  });
  const roomRng = mulberry32(hashSeed(seeds.roomSeed));
  const spawnRng = mulberry32(
    hashSeed(`${seeds.spawnSeed}:${seeds.spawnConfig}`),
  );

  const room = {
    tick: 0,
    rcl: 1,
    controllerProgress: 0,
    energy: 300,
    energyCapacity: 300,
    creeps: 1,
    remoteCreeps: 0,
    remoteActive: false,
    remoteTarget,
    remoteMetrics: {
      selected: null,
      homeEnergyMin: Infinity,
      homeEnergyMax: -Infinity,
      homeEnergySum: 0,
      homeEnergyTicks: 0,
      controllerProgressAtStart: 0,
      failureReason: null,
      started: false,
      startTick: null,
    },
    constructionProgress: 0,
    failures: [],
  };

  const milestones = [];
  for (let tick = 1; tick <= ticks; tick += 1) {
    room.tick = tick;

    // Effective home creeps = total - remote
    const effectiveHomeCreeps = room.creeps - room.remoteCreeps;
    const harvestRate = effectiveHomeCreeps * (8 + Math.floor(roomRng() * 3));
    const upkeep = Math.max(0, room.creeps - 2) * 2;
    room.energy = Math.min(
      room.energyCapacity,
      room.energy + harvestRate - upkeep,
    );

    // Remote mining energy contribution if active
    if (room.remoteActive) {
      const remoteYield = room.remoteCreeps * REMOTE_YIELD_PER_WORKER;
      room.energy = Math.min(room.energyCapacity, room.energy + remoteYield);
    }

    const spawnCost = nextSpawnCost(spawnRng, seeds.spawnConfig);
    const baseTarget = desiredCreepsForRcl(room.rcl);
    const totalTarget = baseTarget + (room.remoteActive ? room.remoteTarget : 0);
    if (!room.remoteActive && remoteEnabled) {
      const homeCreepsNow = room.creeps - room.remoteCreeps;
      const canActivate =
        homeCreepsNow >= remoteMinHarvesters &&
        room.energy >= remoteMinEnergy &&
        room.failures.length === 0;
      if (canActivate) {
        room.remoteActive = true;
        room.remoteMetrics.started = true;
        room.remoteMetrics.startTick = tick;
        room.remoteMetrics.selected = {
          distance: remoteDistance,
          sourceId: `source-${remoteDistance}`,
          roomName: `W${remoteDistance}N${remoteDistance}`,
        };
        room.remoteMetrics.controllerProgressAtStart = room.controllerProgress;
      }
    }
if (room.energy >= spawnCost && room.creeps < totalTarget) {
      // Decide whether to spawn a remote worker or a home worker
      let spawnRemote = false;
      if (room.remoteActive && room.remoteCreeps < room.remoteTarget) {
        // Only spawn remote if home creeps already meet base target
        if (effectiveHomeCreeps >= remoteMinHarvesters) {
          spawnRemote = true;
        }
      }
      if (spawnRemote) {
        room.remoteCreeps += 1;
      }
      room.creeps += 1;
      room.energy -= spawnCost;
    }

    const upgradeSpend = Math.min(room.energy, 12 + effectiveHomeCreeps * 2);
    room.energy -= upgradeSpend;
    room.controllerProgress += upgradeSpend;

    const buildSpend = Math.min(room.energy, room.rcl >= 2 ? 8 : 3);
    room.energy -= buildSpend;
    room.constructionProgress += buildSpend;

    if (room.constructionProgress >= room.energyCapacity) {
      room.energyCapacity += 50;
      room.constructionProgress = 0;
    }

    const nextRclProgress = progressForNextRcl(room.rcl);
    if (room.controllerProgress >= nextRclProgress && room.rcl < 8) {
      room.controllerProgress -= nextRclProgress;
      room.rcl += 1;
      room.energyCapacity += 100;
      milestones.push({
        tick,
        rcl: room.rcl,
        energyCapacity: room.energyCapacity,
        creeps: room.creeps,
      });
    }

    // Evaluate remote mining activation (after spawns and economy steps)
    

    // Record home energy metrics for successful ticks only
    if (room.energy >= 0 && room.creeps > 0) {
      const m = room.remoteMetrics;
      m.homeEnergyMin = Math.min(m.homeEnergyMin, room.energy);
      m.homeEnergyMax = Math.max(m.homeEnergyMax, room.energy);
      m.homeEnergySum += room.energy;
      m.homeEnergyTicks += 1;
    }

    if (room.energy < 0 || room.creeps <= 0) {
      room.failures.push({
        tick,
        reason: "invalid colony state",
        energy: room.energy,
        creeps: room.creeps,
      });
      break;
    }
  }

  // Determine remote mining outcome/failure reason if never started
  if (remoteEnabled && !room.remoteActive) {
    const homeCreepsFinal = room.creeps - room.remoteCreeps;
    if (homeCreepsFinal < remoteMinHarvesters) {
      room.remoteMetrics.failureReason = `insufficient home harvesters (${homeCreepsFinal} < ${remoteMinHarvesters})`;
    } else if (room.energy < remoteMinEnergy) {
      room.remoteMetrics.failureReason = `insufficient home energy (${room.energy} < ${remoteMinEnergy})`;
    } else if (room.failures.length > 0) {
      room.remoteMetrics.failureReason = `failures occurred before activation`;
    } else {
      room.remoteMetrics.failureReason = `conditions not met within ${ticks} ticks`;
    }
  }

  const gateResults = evaluateGates({
    gates,
    ticks,
    finalRcl: room.rcl,
    failures: room.failures,
    milestones,
  });

  const remoteMiningResult =
    remoteEnabled
      ? {
          enabled: true,
          active: room.remoteActive,
          target: room.remoteTarget,
          workersAssigned: room.remoteCreeps,
          selected: room.remoteMetrics.selected,
          homeEnergyMin: room.remoteMetrics.homeEnergyMin,
          homeEnergyMax: room.remoteMetrics.homeEnergyMax,
          homeEnergyAvg:
            room.remoteMetrics.homeEnergyTicks > 0
              ? room.remoteMetrics.homeEnergySum / room.remoteMetrics.homeEnergyTicks
              : null,
          controllerProgress: room.controllerProgress,
          controllerProgressAtStart: room.remoteMetrics.controllerProgressAtStart,
          failureReason: room.remoteMetrics.failureReason,
        }
      : undefined;

  return {
    ok: room.failures.length === 0 && gateResults.every((gate) => gate.ok),
    ticks,
    seed,
    seeds,
    simulationModel: "offline-smoke-v1",
    trustLevel: "smoke",
    caveat:
      "Deterministic approximation only; not a full Screeps engine or private-server proof.",
    gates: gateResults,
    final: {
      rcl: room.rcl,
      controllerProgress: room.controllerProgress,
      energy: room.energy,
      energyCapacity: room.energyCapacity,
      creeps: room.creeps,
    },
    milestones,
    failures: room.failures,
    remoteMining: remoteMiningResult,
  };
}

function parseGateOptions({ requireRcl, requireRclBy, maxFailures }) {
  const gates = {};

  if (requireRcl !== undefined) {
    gates.requireRcl = parsePositiveInteger(requireRcl, "--require-rcl");
  }

  if (requireRclBy !== undefined) {
    gates.requireRclBy = parsePositiveInteger(requireRclBy, "--require-rcl-by");
  }

  gates.maxFailures = parseNonNegativeInteger(maxFailures, "--max-failures");

  if (gates.requireRclBy !== undefined && gates.requireRcl === undefined) {
    throw new Error("--require-rcl-by requires --require-rcl");
  }

  return gates;
}

function parsePositiveInteger(value, label) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`${label} must be a positive integer, got ${value}`);
  }
  return parsed;
}

function parseNonNegativeInteger(value, label) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed < 0) {
    throw new Error(`${label} must be a non-negative integer, got ${value}`);
  }
  return parsed;
}

function evaluateGates({ gates, ticks, finalRcl, failures, milestones }) {
  const results = [];
  const maxFailures = gates.maxFailures ?? 0;

  results.push({
    name: "max-failures",
    ok: failures.length <= maxFailures,
    expected: maxFailures,
    actual: failures.length,
  });

  if (gates.requireRcl !== undefined) {
    const milestone = milestones.find((entry) => entry.rcl >= gates.requireRcl);
    const reachedByTick =
      milestone?.tick ?? (finalRcl >= gates.requireRcl ? ticks : undefined);
    const byLimit = gates.requireRclBy ?? ticks;

    results.push({
      name: "required-rcl",
      ok: reachedByTick !== undefined && reachedByTick <= byLimit,
      expected: `RCL ${gates.requireRcl} by tick ${byLimit}`,
      actual:
        reachedByTick === undefined ? `final RCL ${finalRcl}` : `tick ${reachedByTick}`,
      targetRcl: gates.requireRcl,
      byTick: byLimit,
      reachedTick: reachedByTick,
    });
  }

  return results;
}

function normalizeSimulationSeeds({
  seed = "screeps-bounty-arena",
  roomSeed,
  spawnSeed,
  spawnConfig = "balanced",
}) {
  return {
    baseSeed: seed,
    roomSeed: roomSeed || `${seed}:room`,
    spawnSeed: spawnSeed || `${seed}:spawn`,
    spawnConfig,
  };
}

function nextSpawnCost(rng, spawnConfig) {
  const profiles = {
    conservative: [200, 200, 250],
    balanced: [200, 250, 300],
    aggressive: [250, 300, 350],
  };
  const costs = profiles[spawnConfig] ?? profiles.balanced;
  return costs[Math.floor(rng() * costs.length)];
}

function desiredCreepsForRcl(rcl) {
  return Math.min(3 + rcl, 12);
}

function progressForNextRcl(rcl) {
  return (
    [0, 200, 450, 900, 1600, 2800, 5000, 9000][rcl] ?? Number.POSITIVE_INFINITY
  );
}

export function formatMarkdownReport(result) {
  const lines = [
    `## Screeps Simulation Report`,
    ``,
    `> Trust level: **${result.trustLevel ?? "smoke"}**. ${result.caveat ?? "Offline smoke model only."}`,
    ``,
    `| Metric | Value |`,
    `| --- | --- |`,
    `| Ticks | ${result.ticks} |`,
    `| Seed | \`${result.seed}\` |`,
    `| Room seed | \`${result.seeds.roomSeed}\` |`,
    `| Spawn seed | \`${result.seeds.spawnSeed}\` |`,
    `| Spawn config | \`${result.seeds.spawnConfig}\` |`,
    `| Model | \`${result.simulationModel ?? "offline-smoke-v1"}\` |`,
    `| OK | ${result.ok ? "yes" : "no"} |`,
    `| Final RCL | ${result.final.rcl} |`,
    `| Energy capacity | ${result.final.energyCapacity} |`,
    `| Creep count | ${result.final.creeps} |`,
    `| Failures | ${result.failures.length} |`,
    ``,
    `### Gates`,
  ];

  if (result.gates?.length) {
    for (const gate of result.gates) {
      lines.push(
        `- ${gate.ok ? "PASS" : "FAIL"} ${gate.name}: expected ${gate.expected}, actual ${gate.actual}.`,
      );
    }
  } else {
    lines.push("- No explicit gates configured.");
  }

  lines.push(``, `### Milestones`);

  if (result.milestones.length) {
    for (const milestone of result.milestones) {
      lines.push(
        `- Tick ${milestone.tick}: reached RCL ${milestone.rcl} with ${milestone.creeps} creeps and ${milestone.energyCapacity} energy capacity.`,
      );
    }
  } else {
    lines.push("- No RCL milestones reached.");
  }

  lines.push(``, `### Failures`);
  if (result.failures.length) {
    for (const failure of result.failures) {
      lines.push(`- Tick ${failure.tick}: ${failure.reason}`);
    }
  } else {
    lines.push("- None.");
  }

  if (result.remoteMining) {
    lines.push(``, `### Remote Mining`);
    const rm = result.remoteMining;
    lines.push(`- Enabled: ${rm.enabled}`);
    lines.push(`- Active: ${rm.active}`);
    if (rm.active) {
      const sel = rm.selected;
      lines.push(
        `- Selected remote: distance ${sel?.distance}, source ${sel?.sourceId}, room ${sel?.roomName}`,
      );
      lines.push(`- Workers assigned: ${rm.workersAssigned}`);
      lines.push(
        `- Home energy min: ${typeof rm.homeEnergyMin === "number" ? rm.homeEnergyMin.toFixed(1) : "N/A"}`,
      );
      lines.push(
        `- Home energy max: ${typeof rm.homeEnergyMax === "number" ? rm.homeEnergyMax.toFixed(1) : "N/A"}`,
      );
      lines.push(
        `- Home energy avg: ${typeof rm.homeEnergyAvg === "number" ? rm.homeEnergyAvg.toFixed(1) : "N/A"}`,
      );
      lines.push(
        `- Controller progress: ${rm.controllerProgress} (at start: ${rm.controllerProgressAtStart})`,
      );
    } else {
      lines.push(`- Not started: ${rm.failureReason}`);
    }
  }

  return lines.join("\n");
}

function formatSummary(result) {
  const lines = [
    `Screeps Bounty Arena offline simulation`,
    `trust level: ${result.trustLevel}`,
    `caveat: ${result.caveat}`,
    `ticks: ${result.ticks}`,
    `seed: ${result.seed}`,
    `room seed: ${result.seeds.roomSeed}`,
    `spawn seed: ${result.seeds.spawnSeed}`,
    `spawn config: ${result.seeds.spawnConfig}`,
    `ok: ${result.ok}`,
    `final RCL: ${result.final.rcl}`,
    `creeps: ${result.final.creeps}`,
    `energy capacity: ${result.final.energyCapacity}`,
  ];

  if (result.gates?.length) {
    lines.push("gates:");
    for (const gate of result.gates) {
      lines.push(
        `- ${gate.ok ? "PASS" : "FAIL"} ${gate.name}: expected ${gate.expected}, actual ${gate.actual}`,
      );
    }
  }

  if (result.milestones.length) {
    lines.push("milestones:");
    for (const milestone of result.milestones) {
      lines.push(`- tick ${milestone.tick}: reached RCL ${milestone.rcl}`);
    }
  }

  if (result.failures.length) {
    lines.push("failures:");
    for (const failure of result.failures) {
      lines.push(`- tick ${failure.tick}: ${failure.reason}`);
    }
  }

  if (result.remoteMining) {
    lines.push("remote mining:");
    const rm = result.remoteMining;
    lines.push(`- enabled: ${rm.enabled}`);
    lines.push(`- active: ${rm.active}`);
    if (rm.active) {
      lines.push(`- workers: ${rm.workersAssigned}`);
      lines.push(`- home energy min: ${rm.homeEnergyMin}`);
      lines.push(`- home energy max: ${rm.homeEnergyMax}`);
      lines.push(`- home energy avg: ${rm.homeEnergyAvg}`);
    } else {
      lines.push(`- reason: ${rm.failureReason}`);
    }
  }

  return lines.join("\n");
}

function hashSeed(seed) {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i += 1) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return h >>> 0;
  };
}

function mulberry32(seedFn) {
  let a = seedFn();
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}