const fs = require('fs');
const path = require('path');

const products = require(path.join(__dirname, 'products_data.json'));

let tsContent = `// Auto-generated catalogue products from Google Drive
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
  description: string;
  details: string[];
  sizes: string[];
}

export const PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};

export const PRODUCTS_MAP: Record<string, Product> = PRODUCTS.reduce((acc, p) => {
  acc[p.id.toString()] = p;
  acc[p.code] = p;
  return acc;
}, {} as Record<string, Product>);

export function getProductById(id: string | number): Product | undefined {
  return PRODUCTS_MAP[id.toString()];
}
`;

const targetPath = path.join(__dirname, '..', 'app', 'data', 'products.ts');
fs.mkdirSync(path.dirname(targetPath), { recursive: true });
fs.writeFileSync(targetPath, tsContent, 'utf-8');
console.log('Successfully wrote', targetPath);
