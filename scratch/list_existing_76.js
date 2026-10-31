const fs = require('fs');
const path = require('path');

const ts = fs.readFileSync(path.join(__dirname, '..', 'app', 'data', 'products.ts'), 'utf8');
const pMatch = ts.match(/export const PRODUCTS: Product\[\] = (\[[\s\S]*?\]);\s*export const PRODUCTS_MAP/);
const existingProducts = JSON.parse(pMatch[1]);

console.log('Existing count:', existingProducts.length);
existingProducts.forEach(p => {
  const m = p.image.match(/^\/products\/\((\d+)\)-(\d+)/);
  const prefix = m ? m[1] : '?';
  console.log(`id=${p.id} code=${p.code} prefix=${prefix} price=${p.price} image=${p.image}`);
});
