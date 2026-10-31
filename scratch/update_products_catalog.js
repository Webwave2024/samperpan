const fs = require('fs');
const path = require('path');

const titlesMap = {
  "6001": "Artisan Zari Embroidered Silk Kurta",
  "6002": "Emerald Handcrafted Chanderi Suit",
  "6003": "Festive Zardozi Silk Ensemble",
  "6004": "Heritage Handblock Chanderi Suit",
  "6005": "Ruby Red Embroidered Kurta Set",
  "6006": "Royal Navy Zari Festive Ensemble",
  "6007": "Royal Zari Embroidered Kurta Set",
  "6008": "Antique Gold Threadwork Kurti Set",
  "6009": "Dual Tone Heritage Silk Ensemble",
  "6011": "Peacock Blue Silk Anarkali Set",
  "6012": "Blush Pink Resham Work Suit",
  "6013": "Saffron Marigold Festive Tunic Set",
  "6014": "Burgundy Velvet Embroidered Ensemble",
  "6015": "Ivory Floral Silk Straight Kurti",
  "6016": "Midnight Blue Festive Ensemble",
  "6017": "Mint Green Floral Organza Suit",
  "6018": "Deep Teal Brocade Kurti Set",
  "6020": "Ivory Pearl Embellished Suit",
  "6021": "Rosewood Zardozi Festive Set",
  "6023": "Sunset Ochre Silk Straight Kurti",
  "6024": "Silver Lavender Gota Patti Ensemble",
  "6025": "Wine Embroidered Silk Festive Suit",
  "6026": "Majestic Wine Printed Silk Ensemble",
  "6027": "Imperial Zari Shimmer Jacquard Suit",
  "6029": "Olive Green Pintuck Kurta Set",
  "6030": "Rust Orange Banarasi Brocade Suit",
  "6032": "Celestial Rose Silk Straight Kurti",
  "6033": "Mustard Banarasi Tunic Set",
  "6034": "Scarlet Resham Zari Ensemble",
  "6036": "Exotic Fauna Motif Silk Ensemble",
  "6037": "Blush Rose Chikankari Suit",
  "6042": "Coral Floral Handblock Kurti Set",
  "6045": "Charcoal Slate Zardozi Tunic Set",
  "6046": "Pistachio Green Chikankari Suit",
  "6047": "Golden Sand Georgette Kurta Suit",
  "6049": "Copper Russet Velvet Festive Kurti",
  "6051": "Sage Green Pintuck Kurti Set",
  "6052": "Cobalt Zari Embroidered Set",
  "6053": "Turquoise Handcrafted Ensemble",
  "6062": "Midnight Indigo Handcrafted Set",
  "6063": "Carnation Pink Mirror Work Ensemble",
  "6065": "Topaz Yellow Banarasi Kurti Set",
  "6067": "Amethyst Purple Organza Suit Set",
  "6069": "Dusty Mauve Floral Chanderi Set",
  "6070": "Champagne Silk Straight Kurta",
  "6072": "Crimson Brocade Festival Set",
  "6073": "Forest Green Zari Brocade Set",
  "6074": "Sapphire Georgette Kurta Suit",
  "6076": "Regal Noir Pure Crepe Couture Set",
  "6077": "Peach Floral Handblock Set",
  "6078": "Maroon Mirror Work Ensemble",
  "6084": "Lavender Organza Suit Set",
  "6086": "Amber Gold Festive Set",
  "6087": "Emerald Green Festive Kurti",
  "6088": "Plum Velvet Festive Kurti",
  "6089": "Crimson Silk Straight Kurta Set",
  "6099": "Moonlight Silver Resham Ensemble",
  "6103": "Aquamarine Floral Silk Suit",
  "6104": "Garnet Red Festive Embroidered Set",
  "6129": "Apricot Peach Chanderi Kurti Set",
  "6130": "Opal White Artisan Handblock Suit",
  "6141": "Imperial Sapphire Zari Festive Suit"
};

function formatFabric(rawFabric) {
  if (!rawFabric) return "Pure Silk Blend";
  const lower = rawFabric.toLowerCase().trim();
  if (lower.includes("jamdani") && lower.includes("jackard")) return "Jamdani Jacquard";
  if (lower.includes("mull") || lower.includes("chanderi")) return "Mulmul Chanderi";
  if (lower.includes("two tone")) return "Two-Tone Silk";
  if (lower.includes("shimmer") && lower.includes("lining")) return "Shimmer Lining Silk";
  if (lower.includes("shimmer") && lower.includes("jackard")) return "Shimmer Jacquard";
  if (lower.includes("jackard") && lower.includes("silk")) return "Jacquard Silk";
  if (lower.includes("jackard")) return "Artisan Jacquard";
  if (lower.includes("pura crepe") || lower.includes("pure crepe")) return "Pure Crepe";
  if (lower.includes("crape") || lower.includes("crepe print") || lower.includes("crepe")) {
    if (lower.includes("print")) return "Printed Crepe";
    return "Pure Crepe";
  }
  if (lower.includes("chinon")) return "Pure Chinon Silk";
  if (lower.includes("jamdani")) return "Jamdani Cotton Silk";
  if (lower.includes("crush")) return "Crush Tissue Silk";
  if (lower.includes("salsa")) return "Salsa Silk";
  if (lower.includes("shimmer")) return "Shimmer Tissue";
  if (lower.includes("shiffon")) return "Pure Chiffon";
  if (lower.includes("maslin") || lower.includes("muslin")) {
    if (lower.includes("print")) return "Pure Muslin Print";
    return "Pure Muslin";
  }
  if (lower.includes("girrafe")) return "Giraffe Motif Silk";
  if (lower.includes("silk")) return "Pure Silk";
  return rawFabric.charAt(0).toUpperCase() + rawFabric.slice(1);
}

// 1. Read files in public/newdata
const newdataDir = path.join(__dirname, '..', 'public', 'newdata');
const newFiles = fs.readdirSync(newdataDir);

const newGroups = new Map();
for (const f of newFiles) {
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
  if (!newGroups.has(key)) {
    newGroups.set(key, []);
  }
  newGroups.get(key).push({
    file: f,
    pricePrefix,
    code,
    fabric,
    angle,
    ext,
    priority: (angle ? 10 : 0) + (ext === 'png' ? 1 : 0)
  });
}

// Sort files in each group
for (const [key, list] of newGroups.entries()) {
  list.sort((a, b) => a.priority - b.priority);
}

// 2. Read existing products
const existingTs = fs.readFileSync(path.join(__dirname, '..', 'app', 'data', 'products.ts'), 'utf8');
const pMatch = existingTs.match(/export const PRODUCTS: Product\[\] = (\[[\s\S]*?\]);\s*export const PRODUCTS_MAP/);
const existingProducts = JSON.parse(pMatch[1]);

// Check which codes exist in newGroups
const codesInNew = new Set(Array.from(newGroups.values()).map(list => list[0].code));

// Retain legacy products that are NOT covered by newGroups
const retainedLegacy = existingProducts.filter(p => !codesInNew.has(p.code));

console.log('Legacy products kept:', retainedLegacy.length, retainedLegacy.map(p => `${p.code} (${p.price})`));

// Count variants per code in newGroups to know if we should add fabric descriptor to title
const codeVariantCounts = {};
for (const [key, files] of newGroups.entries()) {
  const code = files[0].code;
  codeVariantCounts[code] = (codeVariantCounts[code] || 0) + 1;
}

// Build products from newGroups
const builtNewProducts = [];
for (const [key, files] of newGroups.entries()) {
  const first = files[0];
  const code = first.code;
  const pricePrefix = first.pricePrefix;
  const priceNum = parseInt(pricePrefix + '95', 10);
  const price = `₹${priceNum.toLocaleString('en-IN')}`;
  const stock = parseInt(pricePrefix, 10);
  
  const fabric = formatFabric(first.fabric);
  let baseTitle = titlesMap[code] || `Artisan Festive Ensemble #${code}`;
  
  // If multiple variants exist for this design code (e.g. 6077 having 3 variants), include fabric in title
  let title = baseTitle;
  if (codeVariantCounts[code] > 1) {
    title = `${baseTitle} (${fabric})`;
  }

  const mainImage = `/newdata/${first.file}`;
  const images = files.map(x => `/newdata/${x.file}`);

  builtNewProducts.push({
    code,
    pricePrefix: parseInt(pricePrefix, 10),
    title,
    price,
    priceNum,
    stock,
    fabric,
    image: mainImage,
    images,
    category: "Ethnic Wear",
    description: `Exquisitely crafted ${baseTitle.toLowerCase()} (Design #${code}) featuring handcrafted artisan detailing, elegant tailored drape, and luxurious ${fabric.toLowerCase()}. Designed for timeless celebrations and luxury styling.`,
    details: [
      fabric,
      "Handcrafted embroidery & fine finishing",
      "Tailored comfortable festive silhouette",
      "Matching bottoms & dupatta included",
      "Dry clean recommended",
      "Made in India"
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"]
  });
}

// Sort new products by priceNum ascending, then by code
builtNewProducts.sort((a, b) => a.priceNum - b.priceNum || parseInt(a.code, 10) - parseInt(b.code, 10));

// Combine all products and assign sequential IDs
const allProducts = [];
let id = 1;

for (const np of builtNewProducts) {
  const rating = Number((4.3 + ((id * 3) % 7) * 0.1).toFixed(1));
  const reviews = 45 + (id * 19) % 180;
  allProducts.push({
    id: id++,
    code: np.code,
    title: np.title,
    price: np.price,
    priceNum: np.priceNum,
    stock: np.stock,
    rating,
    reviews,
    category: np.category,
    fabric: np.fabric,
    image: np.image,
    images: np.images,
    description: np.description,
    details: np.details,
    sizes: np.sizes
  });
}

for (const lp of retainedLegacy) {
  allProducts.push({
    ...lp,
    id: id++
  });
}

console.log('Total combined products:', allProducts.length);

const tsContent = `// Auto-generated catalogue products updated with newdata (Total: ${allProducts.length} items)
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

export const PRODUCTS: Product[] = ${JSON.stringify(allProducts, null, 2)};

export const PRODUCTS_MAP: Record<string, Product> = PRODUCTS.reduce((acc, p) => {
  acc[p.id.toString()] = p;
  acc[p.code] = p;
  return acc;
}, {} as Record<string, Product>);

export function getProductById(id: string | number): Product | undefined {
  return PRODUCTS_MAP[id.toString()];
}
`;

const outputPath = path.join(__dirname, '..', 'app', 'data', 'products.ts');
fs.writeFileSync(outputPath, tsContent, 'utf8');
console.log('Successfully wrote updated catalogue to', outputPath);
