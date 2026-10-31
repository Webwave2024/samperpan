const fs = require('fs');
const path = require('path');

const ts = fs.readFileSync(path.join(__dirname, '..', 'app', 'data', 'products.ts'), 'utf-8');
const pMatch = ts.match(/export const PRODUCTS: Product\[\] = (\[[\s\S]*?\]);\s*export const PRODUCTS_MAP/);
if (!pMatch) {
  console.error('Regex failed');
  process.exit(1);
}
const products = JSON.parse(pMatch[1]);

console.log('Total products:', products.length);

const summary = [];
for (const p of products) {
  // extract number in () from image
  const m = p.image.match(/\((\d+)\)/);
  const numInParen = m ? m[1] : null;
  const newPriceNum = numInParen ? parseInt(`${numInParen}95`, 10) : null;
  summary.push({
    id: p.id,
    code: p.code,
    title: p.title,
    oldPrice: p.price,
    oldPriceNum: p.priceNum,
    oldStock: p.stock,
    numInParen,
    newPriceNum,
    newPrice: newPriceNum ? `₹${newPriceNum.toLocaleString('en-IN')}` : null,
    image: p.image
  });
}

fs.writeFileSync(path.join(__dirname, 'price_check_results.json'), JSON.stringify(summary, null, 2));
console.log('Done writing summary. Sample:');
console.log(summary.slice(0, 5));
