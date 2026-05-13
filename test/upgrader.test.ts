import { describe, expect, it } from 'vitest';

import { runUpgrader } from '../src/roles/upgrader';

function source(id: string): Source {
  return { id, pos: { isNearTo: () => true } } as Source;
}

describe('runUpgrader', () => {
  it('upgrades the room controller when carrying energy', () => {
    const controller = { id: 'controller1', pos: { isNearTo: () => true } } as StructureController;
    const calls: string[] = [];
    const creep = {
      id: 'creep1',
      name: 'Upgrader1',
      memory: { role: 'upgrader' },
      room: { controller, find: () => [] },
      pos: { isNearTo: () => true },
      store: {
        getFreeCapacity: () => 0,
        getUsedCapacity: (resource: ResourceConstant) => (resource === RESOURCE_ENERGY ? 50 : 0),
      },
      harvest: () => 0,
      transfer: () => 0,
      upgradeController: (target: StructureController) => {
        expect(target).toBe(controller);
        calls.push('upgrade');
        return 0;
      },
      moveTo: () => {
        calls.push('move');
        return 0;
      },
      say: () => 0,
    } as unknown as Creep;

    runUpgrader(creep);

    expect(calls).toEqual(['upgrade']);
  });

  it('harvests energy before upgrading when empty', () => {
    const firstSource = source('source1');
    const calls: string[] = [];
    const creep = {
      id: 'creep1',
      name: 'Upgrader1',
      memory: { role: 'upgrader' },
      room: { controller: { id: 'controller1', pos: { isNearTo: () => true } }, find: () => [firstSource] },
      pos: { isNearTo: () => true },
      store: {
        getFreeCapacity: () => 50,
        getUsedCapacity: (resource: ResourceConstant) => (resource === RESOURCE_ENERGY ? 0 : 0),
      },
      harvest: (target: Source) => {
        expect(target).toBe(firstSource);
        calls.push('harvest');
        return 0;
      },
      transfer: () => 0,
      upgradeController: () => 0,
      moveTo: () => {
        calls.push('move');
        return 0;
      },
      say: () => 0,
    } as unknown as Creep;

    runUpgrader(creep);

    expect(calls).toEqual(['harvest']);
    expect(creep.memory.sourceId).toBe('source1');
  });
});
