const fs = require('fs');
const path = require('path');

const ts = fs.readFileSync(path.join(__dirname, '..', 'app', 'data', 'products.ts'), 'utf8');
const pMatch = ts.match(/export const PRODUCTS: Product\[\] = (\[[\s\S]*?\]);\s*export const PRODUCTS_MAP/);
const existingProducts = JSON.parse(pMatch[1]);

const byCode = {};
existingProducts.forEach(p => {
  if (!byCode[p.code]) byCode[p.code] = [];
  byCode[p.code].push(p);
});

for (const [code, list] of Object.entries(byCode)) {
  if (list.length > 1) {
    console.log('Code ' + code + ':');
    list.forEach(p => console.log('  id=' + p.id + ', title=' + p.title + ', price=' + p.price + ', stock=' + p.stock + ', fabric=' + p.fabric + ', image=' + p.image));
  }
}
