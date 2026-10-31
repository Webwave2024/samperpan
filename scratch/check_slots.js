const fs = require('fs');
const path = require('path');

const ts = fs.readFileSync(path.join(__dirname, '..', 'app', 'data', 'products.ts'), 'utf8');
const pMatch = ts.match(/export const PRODUCTS: Product\[\] = (\[[\s\S]*?\]);\s*export const PRODUCTS_MAP/);
const existingProducts = JSON.parse(pMatch[1]);

const newdataDir = path.join(__dirname, '..', 'public', 'newdata');
const newFiles = fs.readdirSync(newdataDir);

const newGroups = new Map();
for (const f of newFiles) {
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
  const key = `${pricePrefix}-${code}`;
  if (!newGroups.has(key)) {
    newGroups.set(key, []);
  }
  newGroups.get(key).push({
    file: f,
    pricePrefix,
    code,
    fabric,
    angle,
    ext,
    priority: (angle ? 10 : 0) + (ext === 'png' ? 1 : 0)
  });
}

for (const [key, list] of newGroups.entries()) {
  list.sort((a, b) => a.priority - b.priority);
}

// Map each existing product to its exact newGroup if available
const usedKeys = new Set();
const updatedProducts = [];
const unassignedSlots = [];

for (const p of existingProducts) {
  const prefix = Math.floor(p.priceNum / 100).toString();
  const key = `${prefix}-${p.code}`;
  if (newGroups.has(key) && !usedKeys.has(key)) {
    usedKeys.add(key);
    updatedProducts.push({
      slotId: p.id,
      key,
      existing: p,
      isExactMatch: true
    });
  } else {
    unassignedSlots.push(p);
  }
}

console.log('Exact matches on existing slot IDs:', updatedProducts.length);
console.log('Unassigned existing slots:', unassignedSlots.map(p => `id=${p.id} (${p.code})`));

const unusedNewKeys = [];
for (const key of newGroups.keys()) {
  if (!usedKeys.has(key)) {
    unusedNewKeys.push(key);
  }
}
console.log('Unused new keys to place:', unusedNewKeys.length, unusedNewKeys);
