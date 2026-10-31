const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'app', 'data', 'products.ts');
const ts = fs.readFileSync(filePath, 'utf-8');

const pMatch = ts.match(/export const PRODUCTS: Product\[\] = (\[[\s\S]*?\]);\s*export const PRODUCTS_MAP/);
if (!pMatch) {
  console.error('Regex failed to match PRODUCTS array');
  process.exit(1);
}

const products = JSON.parse(pMatch[1]);
console.log('Original products count:', products.length);

let updatedCount = 0;
for (const p of products) {
  const m = p.image.match(/\((\d+)\)/);
  if (!m) {
    console.warn(`No parenthesis found for product id ${p.id}, image: ${p.image}`);
    continue;
  }
  const prefix = m[1];
  const newPriceNum = parseInt(`${prefix}95`, 10);
  const newPrice = `₹${newPriceNum.toLocaleString('en-IN')}`;

  p.price = newPrice;
  p.priceNum = newPriceNum;
  updatedCount++;
}

console.log(`Updated ${updatedCount} products.`);

const newTsContent = `// Auto-generated catalogue products (Total: ${products.length} items)
export interface Product {
  id: number;
  code: string;
  title: string;
  price: string;
  priceNum: number;
  stock: number;
  rating: number;
  reviews: number;
  category: string;
  fabric: string;
  image: string;
  images: string[];
  description: string;
  details: string[];
  sizes: string[];
}

export const PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};

export const PRODUCTS_MAP: Record<string, Product> = PRODUCTS.reduce((acc, p) => {
  acc[p.id.toString()] = p;
  return acc;
}, {} as Record<string, Product>);

export function getProductById(id: string | number): Product | undefined {
  return PRODUCTS_MAP[id.toString()];
}
`;

fs.writeFileSync(filePath, newTsContent, 'utf-8');
console.log('Successfully wrote updated products.ts!');
