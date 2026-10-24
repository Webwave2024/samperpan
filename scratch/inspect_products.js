const fs = require('fs');
const path = require('path');

const ts = fs.readFileSync(path.join(__dirname, '..', 'app', 'data', 'products.ts'), 'utf-8');
const pMatch = ts.match(/export const PRODUCTS: Product\[\] = (\[[\s\S]*?\]);\s*export const PRODUCTS_MAP/);
if (!pMatch) {
  console.error('Regex failed to match PRODUCTS');
  process.exit(1);
}
const products = JSON.parse(pMatch[1]);
console.log('Total products:', products.length);

let missing = 0;
let totalImages = 0;
for (const p of products) {
  for (const img of p.images) {
    totalImages++;
    const fullPath = path.join(__dirname, '..', 'public', img.replace(/^\//, ''));
    if (!fs.existsSync(fullPath)) {
      console.log(`[Missing] Product #${p.id} (${p.code}): ${img}`);
      missing++;
    }
  }
}

console.log(`Verified ${totalImages} image references across ${products.length} products. Missing: ${missing}`);
