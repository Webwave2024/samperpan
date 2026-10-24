const fs = require('fs');
const path = require('path');

// 1. Read existing products
const existingTs = fs.readFileSync(path.join(__dirname, '..', 'app', 'data', 'products.ts'), 'utf-8');
const pMatch = existingTs.match(/export const PRODUCTS: Product\[\] = (\[[\s\S]*?\]);\s*export const PRODUCTS_MAP/);
if (!pMatch) {
  console.error('Could not find existing PRODUCTS array');
  process.exit(1);
}
const existingProducts = JSON.parse(pMatch[1]);
console.log('Existing products count:', existingProducts.length);

// 2. Read new files
const newFiles = require('./folder_15Y_files.json');

// Group new files by code
const newFilesByCode = new Map();
for (const f of newFiles) {
  const m = f.name.match(/^\((\d+)\)-(\d+)(?:\s+\((\d+)\))?\.png$/i);
  if (!m) continue;
  const stock = parseInt(m[1], 10);
  const code = m[2];
  const isAngle = !!m[3];

  if (!newFilesByCode.has(code)) {
    newFilesByCode.set(code, []);
  }
  newFilesByCode.get(code).push({
    filename: f.name,
    stock,
    isAngle,
    imagePath: `/products/${f.name}`
  });
}

// 3. Update existing products with new images & updated stock if available
const existingCodes = new Set(existingProducts.map(p => p.code));

for (const p of existingProducts) {
  if (newFilesByCode.has(p.code)) {
    const files = newFilesByCode.get(p.code);
    for (const f of files) {
      if (!p.images.includes(f.imagePath)) {
        p.images.push(f.imagePath);
      }
    }
    // Update stock to the latest stock from drive if available
    const maxStock = Math.max(...files.map(f => f.stock));
    if (maxStock > p.stock) {
      p.stock = maxStock;
    }
  }
}

// 4. Create new products for codes not in existingProducts
const newTitlesMap = {
  "6002": { title: "Emerald Handcrafted Chanderi Suit", fabric: "Pure Chanderi Silk" },
  "6005": { title: "Ruby Red Embroidered Kurta Set", fabric: "Pure Silk" },
  "6006": { title: "Royal Navy Zari Festive Ensemble", fabric: "Banarasi Art Silk" },
  "6008": { title: "Antique Gold Threadwork Kurti Set", fabric: "Handwoven Silk" },
  "6011": { title: "Peacock Blue Silk Anarkali Set", fabric: "Chanderi & Organza" },
  "6012": { title: "Blush Pink Resham Work Suit", fabric: "Pure Silk Blend" },
  "6013": { title: "Saffron Marigold Festive Tunic Set", fabric: "Handblock Cotton Silk" },
  "6014": { title: "Burgundy Velvet Embroidered Ensemble", fabric: "Micro Velvet" },
  "6017": { title: "Mint Green Floral Organza Suit", fabric: "Organza & Silk" },
  "6018": { title: "Deep Teal Brocade Kurti Set", fabric: "Velvet & Brocade" },
  "6020": { title: "Ivory Pearl Embellished Suit", fabric: "Lucknowi Cotton" },
  "6021": { title: "Rosewood Zardozi Festive Set", fabric: "Pure Chanderi Silk" },
  "6023": { title: "Sunset Ochre Silk Straight Kurti", fabric: "Handwoven Silk" },
  "6024": { title: "Silver Lavender Gota Patti Ensemble", fabric: "Georgette & Mulmul" },
  "6025": { title: "Wine Embroidered Silk Festive Suit", fabric: "Pure Silk" },
  "6029": { title: "Olive Green Pintuck Kurta Set", fabric: "Premium Cotton Blend" },
  "6030": { title: "Rust Orange Banarasi Brocade Suit", fabric: "Banarasi Art Silk" },
  "6034": { title: "Scarlet Resham Zari Ensemble", fabric: "Chanderi & Organza" },
  "6042": { title: "Coral Floral Handblock Kurti Set", fabric: "Handblock Cotton Silk" },
  "6045": { title: "Charcoal Slate Zardozi Tunic Set", fabric: "Pure Silk Blend" },
  "6046": { title: "Pistachio Green Chikankari Suit", fabric: "Lucknowi Cotton" },
  "6047": { title: "Golden Sand Georgette Kurta Suit", fabric: "Georgette & Mulmul" },
  "6049": { title: "Copper Russet Velvet Festive Kurti", fabric: "Premium Velvet Blend" },
  "6062": { title: "Midnight Indigo Handcrafted Set", fabric: "Pure Chanderi Silk" },
  "6063": { title: "Carnation Pink Mirror Work Ensemble", fabric: "Micro Velvet" },
  "6065": { title: "Topaz Yellow Banarasi Kurti Set", fabric: "Banarasi Art Silk" },
  "6067": { title: "Amethyst Purple Organza Suit Set", fabric: "Organza & Silk" },
  "6073": { title: "Forest Green Zari Brocade Set", fabric: "Velvet & Brocade" },
  "6089": { title: "Crimson Silk Straight Kurta Set", fabric: "Handwoven Silk" },
  "6099": { title: "Moonlight Silver Resham Ensemble", fabric: "Pure Silk Blend" },
  "6103": { title: "Aquamarine Floral Silk Suit", fabric: "Chanderi & Organza" },
  "6104": { title: "Garnet Red Festive Embroidered Set", fabric: "Pure Silk" },
  "6129": { title: "Apricot Peach Chanderi Kurti Set", fabric: "Pure Chanderi Silk" },
  "6130": { title: "Opal White Artisan Handblock Suit", fabric: "Handblock Cotton Silk" },
  "6141": { title: "Imperial Sapphire Zari Festive Suit", fabric: "Banarasi Art Silk" }
};

// Sort new codes numerically
const newCodes = Array.from(newFilesByCode.keys())
  .filter(code => !existingCodes.has(code))
  .sort((a, b) => parseInt(a, 10) - parseInt(b, 10));

console.log('New codes to add:', newCodes.length, newCodes);

let nextId = existingProducts.length + 1;
const newProductsList = [];

for (const code of newCodes) {
  const fileList = newFilesByCode.get(code);
  // Sort files: prefer non-angle image as mainImage
  fileList.sort((a, b) => (a.isAngle === b.isAngle ? 0 : a.isAngle ? 1 : -1));
  const mainImage = fileList[0].imagePath;
  const allImages = fileList.map(f => f.imagePath);
  const stock = fileList[0].stock;
  const priceNum = parseInt(code, 10);
  const price = `₹${priceNum.toLocaleString('en-IN')}`;

  const info = newTitlesMap[code] || {
    title: `Artisan Festive Ensemble`,
    fabric: "Pure Silk Blend"
  };

  const fullTitle = `${info.title} #${code}`;
  const id = nextId++;
  const rating = Number((4.3 + ((id * 3) % 7) * 0.1).toFixed(1));
  const reviews = 40 + (id * 17) % 190;

  newProductsList.push({
    id,
    code,
    title: fullTitle,
    price,
    priceNum,
    stock,
    rating,
    reviews,
    category: "Ethnic Wear",
    fabric: info.fabric,
    image: mainImage,
    images: allImages,
    description: `Exquisitely crafted ${info.title.toLowerCase()} (Design #${code}) featuring handcrafted artisan detailing, elegant tailored drape, and luxurious ${info.fabric.toLowerCase()}. Designed for timeless celebrations and luxury styling.`,
    details: [
      info.fabric,
      "Handcrafted embroidery & fine finishing",
      "Tailored comfortable festive silhouette",
      "Matching bottoms & dupatta included",
      "Dry clean recommended",
      "Made in India"
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"]
  });
}

const finalProducts = [...existingProducts, ...newProductsList];
console.log('Total final products:', finalProducts.length);

const tsContent = `// Auto-generated catalogue products from Google Drive: 1w2cq7tjOMj-r9J0vjGcgyjt-GL1s_nY0 & 15Y14VjXLlEy4jb6pEEGXGntyLDWT8rRv
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

export const PRODUCTS: Product[] = ${JSON.stringify(finalProducts, null, 2)};

export const PRODUCTS_MAP: Record<string, Product> = PRODUCTS.reduce((acc, p) => {
  acc[p.id.toString()] = p;
  acc[p.code] = p;
  return acc;
}, {} as Record<string, Product>);

export function getProductById(id: string | number): Product | undefined {
  return PRODUCTS_MAP[id.toString()];
}
`;

fs.writeFileSync(path.join(__dirname, '..', 'app', 'data', 'products.ts'), tsContent, 'utf-8');
console.log('Successfully updated app/data/products.ts with', finalProducts.length, 'products!');
