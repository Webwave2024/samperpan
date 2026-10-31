const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(path.join(__dirname, '..', 'public', 'newdata'));

// Parse all files
const items = [];
for (const f of files) {
  const m = f.match(/^\((\d+)\)-(\d+)(.*?)\.(jpg|png|webp|jpeg)$/i);
  if (!m) continue;
  const pricePrefix = m[1];
  const code = m[2];
  let rest = m[3].trim();
  let angle = null;
  const vMatch = rest.match(/\((\d+)\)$/);
  if (vMatch) {
    angle = vMatch[1];
    rest = rest.replace(/\((\d+)\)$/, '').trim();
  }
  const fabric = rest;
  const ext = m[4].toLowerCase();
  items.push({
    file: f,
    pricePrefix,
    code,
    fabric,
    angle,
    ext,
    key: `${pricePrefix}-${code}`
  });
}

const groups = new Map();
for (const it of items) {
  if (!groups.has(it.key)) {
    groups.set(it.key, []);
  }
  groups.get(it.key).push(it);
}

console.log('Unique (pricePrefix-code) products:', groups.size);
for (const [key, list] of groups.entries()) {
  const fabrics = [...new Set(list.map(x => x.fabric))];
  console.log(`Key ${key} (${list.length} images): Fabric: ${fabrics.join(' / ')} | Files: ${list.map(x => x.file).join(', ')}`);
}
