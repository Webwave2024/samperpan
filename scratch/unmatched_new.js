const fs = require('fs');
const path = require('path');

const ts = fs.readFileSync(path.join(__dirname, '..', 'app', 'data', 'products.ts'), 'utf8');
const pMatch = ts.match(/export const PRODUCTS: Product\[\] = (\[[\s\S]*?\]);\s*export const PRODUCTS_MAP/);
const existingProducts = JSON.parse(pMatch[1]);

const files = fs.readdirSync(path.join(__dirname, '..', 'public', 'newdata'));

// Parse newdata files
const newMap = new Map();
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
  const key = `${pricePrefix}-${code}`;
  if (!newMap.has(key)) {
    newMap.set(key, []);
  }
  newMap.get(key).push({ file: f, pricePrefix, code, fabric, angle, ext });
}

const matchedKeys = new Set();
for (const p of existingProducts) {
  const prefix = Math.floor(p.priceNum / 100).toString();
  const keyExact = `${prefix}-${p.code}`;
  if (newMap.has(keyExact)) {
    matchedKeys.add(keyExact);
  }
}

const unmatchedNewKeys = [];
for (const [key, list] of newMap.entries()) {
  if (!matchedKeys.has(key)) {
    unmatchedNewKeys.push({ key, list });
  }
}

console.log('New groups not matched in existing:', unmatchedNewKeys.length);
unmatchedNewKeys.forEach(({ key, list }) => {
  console.log(`Key ${key}: ${list.map(x => x.file).join(', ')}`);
});
