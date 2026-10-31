const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(path.join(__dirname, '..', 'public', 'newdata'));
const fabrics = new Set();

for (const f of files) {
  const m = f.match(/^\((\d+)\)-(\d+)(.*?)\.(jpg|png|webp|jpeg)$/i);
  if (!m) continue;
  let rest = m[3].trim().replace(/\(\d+\)$/, '').trim();
  fabrics.add(rest);
}

console.log('All raw fabrics found in newdata filenames:');
console.log(Array.from(fabrics).sort());
