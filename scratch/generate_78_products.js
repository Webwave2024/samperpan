const fs = require('fs');
const path = require('path');

const f1 = require('./all_drive_files_new.json');
const f2 = require('./folder_15Y_files.json');
const allFiles = [...f1, ...f2];

console.log('Total files:', allFiles.length); // 78

const titlesMap = {
  "6001": { title: "Kundan Heritage Silk Kurta Set", fabric: "Pure Silk Blend" },
  "6002": { title: "Emerald Handcrafted Chanderi Suit", fabric: "Pure Chanderi Silk" },
  "6003": { title: "Festive Zardozi Silk Ensemble", fabric: "Handwoven Silk" },
  "6004": { title: "Heritage Handblock Chanderi Suit", fabric: "Pure Chanderi Silk" },
  "6005": { title: "Ruby Red Embroidered Kurta Set", fabric: "Pure Silk" },
  "6006": { title: "Royal Navy Zari Festive Ensemble", fabric: "Banarasi Art Silk" },
  "6007": { title: "Royal Zari Embroidered Kurta Set", fabric: "Chanderi & Organza" },
  "6008": { title: "Antique Gold Threadwork Kurti Set", fabric: "Handwoven Silk" },
  "6009": { title: "Regal Brocade Silk Ensemble", fabric: "Banarasi Art Silk" },
  "6011": { title: "Peacock Blue Silk Anarkali Set", fabric: "Chanderi & Organza" },
  "6012": { title: "Blush Pink Resham Work Suit", fabric: "Pure Silk Blend" },
  "6013": { title: "Saffron Marigold Festive Tunic Set", fabric: "Handblock Cotton Silk" },
  "6014": { title: "Burgundy Velvet Embroidered Ensemble", fabric: "Micro Velvet" },
  "6015": { title: "Ivory Floral Silk Straight Kurti", fabric: "Pure Silk Blend" },
  "6016": { title: "Midnight Blue Festive Ensemble", fabric: "Pure Silk" },
  "6017": { title: "Mint Green Floral Organza Suit", fabric: "Organza & Silk" },
  "6018": { title: "Deep Teal Brocade Kurti Set", fabric: "Velvet & Brocade" },
  "6020": { title: "Ivory Pearl Embellished Suit", fabric: "Lucknowi Cotton" },
  "6021": { title: "Rosewood Zardozi Festive Set", fabric: "Pure Chanderi Silk" },
  "6023": { title: "Sunset Ochre Silk Straight Kurti", fabric: "Handwoven Silk" },
  "6024": { title: "Silver Lavender Gota Patti Ensemble", fabric: "Georgette & Mulmul" },
  "6025": { title: "Wine Embroidered Silk Festive Suit", fabric: "Pure Silk" },
  "6026": { title: "Lilac Floral Organza Tunic Set", fabric: "Organza & Silk" },
  "6027": { title: "Amber Brocade Silk Anarkali", fabric: "Banarasi Art Silk" },
  "6029": { title: "Olive Green Pintuck Kurta Set", fabric: "Premium Cotton Blend" },
  "6030": { title: "Rust Orange Banarasi Brocade Suit", fabric: "Banarasi Art Silk" },
  "6032": { title: "Golden Ochre Handloom Kurta Set", fabric: "Handwoven Silk" },
  "6033": { title: "Mustard Banarasi Tunic Set", fabric: "Banarasi Art Silk" },
  "6034": { title: "Scarlet Resham Zari Ensemble", fabric: "Chanderi & Organza" },
  "6036": { title: "Sapphire Floral Handblock Suit", fabric: "Handblock Cotton Silk" },
  "6037": { title: "Blush Rose Chikankari Suit", fabric: "Lucknowi Cotton" },
  "6042": { title: "Coral Floral Handblock Kurti Set", fabric: "Handblock Cotton Silk" },
  "6043": { title: "Turquoise Zari Handcrafted Suit", fabric: "Pure Silk Blend" },
  "6045": { title: "Charcoal Slate Zardozi Tunic Set", fabric: "Pure Silk Blend" },
  "6046": { title: "Pistachio Green Chikankari Suit", fabric: "Lucknowi Cotton" },
  "6047": { title: "Golden Sand Georgette Kurta Suit", fabric: "Georgette & Mulmul" },
  "6049": { title: "Copper Russet Velvet Festive Kurti", fabric: "Premium Velvet Blend" },
  "6051": { title: "Sage Green Pintuck Kurti Set", fabric: "Georgette & Mulmul" },
  "6052": { title: "Cobalt Zari Embroidered Set", fabric: "Premium Cotton Blend" },
  "6053": { title: "Turquoise Handcrafted Ensemble", fabric: "Organza & Silk" },
  "6062": { title: "Midnight Indigo Handcrafted Set", fabric: "Pure Chanderi Silk" },
  "6063": { title: "Carnation Pink Mirror Work Ensemble", fabric: "Micro Velvet" },
  "6065": { title: "Topaz Yellow Banarasi Kurti Set", fabric: "Banarasi Art Silk" },
  "6067": { title: "Amethyst Purple Organza Suit Set", fabric: "Organza & Silk" },
  "6069": { title: "Dusty Mauve Floral Chanderi Set", fabric: "Pure Chanderi Silk" },
  "6070": { title: "Champagne Silk Straight Kurta", fabric: "Pure Silk" },
  "6072": { title: "Crimson Brocade Festival Set", fabric: "Velvet & Brocade" },
  "6073": { title: "Forest Green Zari Brocade Set", fabric: "Velvet & Brocade" },
  "6074": { title: "Sapphire Georgette Kurta Suit", fabric: "Georgette & Mulmul" },
  "6076": { title: "Royal Crimson Zari Ensemble", fabric: "Pure Silk Blend" },
  "6077": { title: "Peach Floral Handblock Set", fabric: "Handblock Cotton Silk" },
  "6078": { title: "Maroon Mirror Work Ensemble", fabric: "Micro Velvet" },
  "6084": { title: "Lavender Organza Suit Set", fabric: "Organza & Silk" },
  "6086": { title: "Amber Gold Festive Set", fabric: "Pure Chanderi Silk" },
  "6087": { title: "Emerald Green Festive Kurti", fabric: "Handwoven Silk" },
  "6088": { title: "Plum Velvet Festive Kurti", fabric: "Premium Velvet Blend" },
  "6089": { title: "Crimson Silk Straight Kurta Set", fabric: "Handwoven Silk" },
  "6099": { title: "Moonlight Silver Resham Ensemble", fabric: "Pure Silk Blend" },
  "6103": { title: "Aquamarine Floral Silk Suit", fabric: "Chanderi & Organza" },
  "6104": { title: "Garnet Red Festive Embroidered Set", fabric: "Pure Silk" },
  "6129": { title: "Apricot Peach Chanderi Kurti Set", fabric: "Pure Chanderi Silk" },
  "6130": { title: "Opal White Artisan Handblock Suit", fabric: "Handblock Cotton Silk" },
  "6141": { title: "Imperial Sapphire Zari Festive Suit", fabric: "Banarasi Art Silk" }
};

// Track occurrences of each code so duplicate codes get clean, distinct titles
const codeCount = new Map();

const products = allFiles.map((f, index) => {
  const m = f.name.match(/^\((\d+)\)-(\d+)(?:\s+\((\d+)\))?\.png$/i);
  const stock = m ? parseInt(m[1], 10) : 12;
  const code = m ? m[2] : `60${(index + 1).toString().padStart(2, '0')}`;
  const isAngle = m ? !!m[3] : false;

  const currentCount = (codeCount.get(code) || 0) + 1;
  codeCount.set(code, currentCount);

  const info = titlesMap[code] || {
    title: "Handcrafted Luxury Festive Suit",
    fabric: "Pure Silk Blend"
  };

  // Luxury clean title without ANY #price or #code
  let title = info.title;
  if (currentCount === 2) {
    title = `${info.title} (Detail View)`;
  } else if (currentCount === 3) {
    title = `${info.title} (Angle View)`;
  } else if (currentCount > 3) {
    title = `${info.title} (Variation ${currentCount})`;
  }

  const id = index + 1;
  const priceNum = parseInt(code, 10) || 5999;
  const price = `₹${priceNum.toLocaleString('en-IN')}`;
  const rating = Number((4.3 + ((id * 3) % 7) * 0.1).toFixed(1));
  const reviews = 35 + (id * 17) % 180;
  const imagePath = `/products/${f.name}`;

  return {
    id,
    code,
    title, // Clean title without any '#' or price!
    price,
    priceNum,
    stock,
    rating,
    reviews,
    category: "Ethnic Wear",
    fabric: info.fabric,
    image: imagePath,
    images: [imagePath],
    description: `Exquisitely crafted ${info.title.toLowerCase()} featuring handcrafted artisan detailing, elegant tailored drape, and luxurious ${info.fabric.toLowerCase()}. Designed for timeless celebrations and luxury styling.`,
    details: [
      info.fabric,
      "Handcrafted embroidery & fine finishing",
      "Tailored comfortable festive silhouette",
      "Matching bottoms & dupatta included",
      "Dry clean recommended",
      "Made in India"
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"]
  };
});

console.log('Generated products count:', products.length);

const tsContent = `// Auto-generated catalogue products (Total: 78 items)
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

fs.writeFileSync(path.join(__dirname, '..', 'app', 'data', 'products.ts'), tsContent, 'utf-8');
console.log('Successfully wrote', products.length, 'products to app/data/products.ts');
