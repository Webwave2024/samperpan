const fs = require('fs');
const path = require('path');

const files = require(path.join(__dirname, 'all_drive_files_new.json'));

const titlesMap = {
  "6003": "Festive Zardozi Silk Ensemble",
  "6004": "Heritage Handblock Chanderi Suit",
  "6007": "Royal Zari Embroidered Kurta Set",
  "6015": "Ivory Floral Silk Straight Kurti",
  "6016": "Midnight Blue Festive Ensemble",
  "6033": "Mustard Banarasi Tunic Set",
  "6037": "Blush Rose Chikankari Suit",
  "6051": "Sage Green Pintuck Kurti Set",
  "6052": "Cobalt Zari Embroidered Set",
  "6053": "Turquoise Handcrafted Ensemble",
  "6069": "Dusty Mauve Floral Chanderi Set",
  "6070": "Champagne Silk Straight Kurta",
  "6072": "Crimson Brocade Festival Set",
  "6074": "Sapphire Georgette Kurta Suit",
  "6077": "Peach Floral Handblock Set",
  "6078": "Maroon Mirror Work Ensemble",
  "6084": "Lavender Organza Suit Set",
  "6086": "Amber Gold Festive Set",
  "6087": "Emerald Green Festive Kurti",
  "6088": "Plum Velvet Festive Kurti"
};

const fabricMap = {
  "6003": "Handwoven Silk",
  "6004": "Pure Chanderi Silk",
  "6007": "Chanderi & Organza",
  "6015": "Pure Silk Blend",
  "6016": "Pure Silk",
  "6033": "Banarasi Art Silk",
  "6037": "Lucknowi Cotton",
  "6051": "Georgette & Mulmul",
  "6052": "Premium Cotton Blend",
  "6053": "Organza & Silk",
  "6069": "Pure Chanderi Silk",
  "6070": "Pure Silk",
  "6072": "Velvet & Brocade",
  "6074": "Georgette & Mulmul",
  "6077": "Handblock Cotton Silk",
  "6078": "Micro Velvet",
  "6084": "Organza & Silk",
  "6086": "Pure Chanderi Silk",
  "6087": "Handwoven Silk",
  "6088": "Premium Velvet Blend"
};

const designs = new Map();

for (const f of files) {
  const m = f.name.match(/^\((\d+)\)-(\d+)(?:\s+\((\d+)\))?\.png$/);
  if (!m) continue;
  const stock = parseInt(m[1], 10);
  const code = m[2];
  const isAngle = !!m[3];

  if (!designs.has(code)) {
    designs.set(code, {
      code,
      stock,
      priceNum: parseInt(code, 10),
      mainImage: `/products/${f.name}`,
      images: [`/products/${f.name}`]
    });
  } else {
    const d = designs.get(code);
    d.images.push(`/products/${f.name}`);
    if (!isAngle) {
      d.mainImage = `/products/${f.name}`;
    }
  }
}

const sortedDesigns = Array.from(designs.values()).sort((a, b) => parseInt(a.code, 10) - parseInt(b.code, 10));

const products = sortedDesigns.map((d, index) => {
  const id = index + 1;
  const baseTitle = titlesMap[d.code] || `Artisan Ethnic Ensemble`;
  const title = `${baseTitle} #${d.code}`;
  const fabric = fabricMap[d.code] || "Pure Silk Blend";
  const rating = Number((4.3 + ((id * 3) % 7) * 0.1).toFixed(1));
  const reviews = 45 + (id * 19) % 180;

  return {
    id,
    code: d.code,
    title,
    price: `₹${d.priceNum.toLocaleString('en-IN')}`,
    priceNum: d.priceNum,
    stock: d.stock,
    rating,
    reviews,
    category: "Ethnic Wear",
    fabric,
    image: d.mainImage,
    images: d.images,
    description: `Exquisitely crafted ${baseTitle.toLowerCase()} (Design #${d.code}) featuring handcrafted artisan detailing, elegant tailored drape, and luxurious ${fabric.toLowerCase()}. Designed for timeless celebrations and luxury styling.`,
    details: [
      fabric,
      "Handcrafted embroidery & fine finishing",
      "Tailored comfortable festive silhouette",
      "Matching bottoms & dupatta included",
      "Dry clean recommended",
      "Made in India"
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"]
  };
});

let tsContent = `// Auto-generated catalogue products from Google Drive: 1w2cq7tjOMj-r9J0vjGcgyjt-GL1s_nY0
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
  acc[p.code] = p;
  return acc;
}, {} as Record<string, Product>);

export function getProductById(id: string | number): Product | undefined {
  return PRODUCTS_MAP[id.toString()];
}
`;

const targetPath = path.join(__dirname, '..', 'app', 'data', 'products.ts');
fs.writeFileSync(targetPath, tsContent, 'utf-8');
console.log('Successfully wrote', products.length, 'products to', targetPath);
