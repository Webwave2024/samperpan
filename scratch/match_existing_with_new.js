const fs = require('fs');
const path = require('path');

const ts = fs.readFileSync(path.join(__dirname, '..', 'app', 'data', 'products.ts'), 'utf8');
const pMatch = ts.match(/export const PRODUCTS: Product\[\] = (\[[\s\S]*?\]);\s*export const PRODUCTS_MAP/);
const existingProducts = JSON.parse(pMatch[1]);

const files = fs.readdirSync(path.join(__dirname, '..', 'public', 'newdata'));

// Parse newdata files
const newMap = new Map(); // key: `${pricePrefix}-${code}` or `${code}`
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

console.log('Total existing products:', existingProducts.length);
console.log('Total newdata groups (pricePrefix-code):', newMap.size);

// Check matching for existing products:
let matchedCount = 0;
let unmatchedCount = 0;

for (const p of existingProducts) {
  // Can we match by pricePrefix and code?
  // In existing product, what was pricePrefix?
  // e.g. p.priceNum = 1395 => prefix 13; p.priceNum = 695 => prefix 6.
  const prefix = Math.floor(p.priceNum / 100).toString();
  const keyExact = `${prefix}-${p.code}`;
  
  if (newMap.has(keyExact)) {
    matchedCount++;
  } else {
    unmatchedCount++;
    // Let's see if the code exists in newMap under a different prefix
    const altKeys = Array.from(newMap.keys()).filter(k => k.endsWith(`-${p.code}`));
    console.log(`Unmatched existing product: id=${p.id}, code=${p.code}, price=${p.price}, altKeys in newdata: [${altKeys.join(', ')}]`);
  }
}

console.log(`Matched: ${matchedCount}, Unmatched: ${unmatchedCount}`);
