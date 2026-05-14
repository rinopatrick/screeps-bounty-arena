
const { mulberry32, hashSeed } = require('./scripts/simulate.mjs');
function nextSpawnCost(rng, config) {
  const profiles = {
    conservative: [200, 200, 250],
    balanced: [200, 250, 300],
    aggressive: [250, 300, 350],
  };
  const costs = profiles[config] ?? profiles.balanced;
  return costs[Math.floor(rng() * costs.length)];
}
const seed = process.argv[2] || 'test';
const config = process.argv[3] || 'balanced';
const rng = mulberry32(hashSeed(`${seed}:${config}`));
for (let i=0; i<10; i++) {
  console.log(nextSpawnCost(rng, config));
}
