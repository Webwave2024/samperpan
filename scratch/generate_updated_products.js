const fs = require('fs');
const path = require('path');

// Title definitions for design codes
const titlesMap = {
  "6001": { title: "Artisan Zari Embroidered Silk Kurta", baseFabric: "Pure Crepe" },
  "6002": { title: "Emerald Handcrafted Chanderi Suit", baseFabric: "Jamdani Cotton Silk" },
  "6003": { title: "Festive Zardozi Silk Ensemble", baseFabric: "Pure Crepe" },
  "6004": { title: "Heritage Handblock Chanderi Suit", baseFabric: "Mulmul Chanderi" },
  "6005": { title: "Ruby Red Embroidered Kurta Set", baseFabric: "Jamdani Cotton Silk" },
  "6006": { title: "Royal Navy Zari Festive Ensemble", baseFabric: "Artisan Jacquard" },
  "6007": { title: "Royal Zari Embroidered Kurta Set", baseFabric: "Chanderi & Organza" },
  "6008": { title: "Antique Gold Threadwork Kurti Set", baseFabric: "Pure Silk" },
  "6009": { title: "Dual Tone Heritage Silk Ensemble", baseFabric: "Two Tone Silk" },
  "6011": { title: "Peacock Blue Silk Anarkali Set", baseFabric: "Pure Chiffon" },
  "6012": { title: "Blush Pink Resham Work Suit", baseFabric: "Artisan Jacquard" },
  "6013": { title: "Saffron Marigold Festive Tunic Set", baseFabric: "Pure Crepe" },
  "6014": { title: "Burgundy Velvet Embroidered Ensemble", baseFabric: "Micro Velvet" },
  "6015": { title: "Ivory Floral Silk Straight Kurti", baseFabric: "Shimmer Lining Silk" },
  "6016": { title: "Midnight Blue Festive Ensemble", baseFabric: "Pure Silk" },
  "6017": { title: "Mint Green Floral Organza Suit", baseFabric: "Pure Crepe" },
  "6018": { title: "Deep Teal Brocade Kurti Set", baseFabric: "Shimmer Tissue" },
  "6020": { title: "Ivory Pearl Embellished Suit", baseFabric: "Artisan Jacquard" },
  "6021": { title: "Rosewood Zardozi Festive Set", baseFabric: "Artisan Jacquard" },
  "6023": { title: "Sunset Ochre Silk Straight Kurti", baseFabric: "Pure Crepe" },
  "6024": { title: "Silver Lavender Gota Patti Ensemble", baseFabric: "Printed Crepe" },
  "6025": { title: "Wine Embroidered Silk Festive Suit", baseFabric: "Printed Crepe" },
  "6026": { title: "Majestic Wine Printed Silk Ensemble", baseFabric: "Printed Crepe" },
  "6027": { title: "Imperial Zari Shimmer Jacquard Suit", baseFabric: "Shimmer Jacquard" },
  "6029": { title: "Olive Green Pintuck Kurta Set", baseFabric: "Mulmul Chanderi" },
  "6030": { title: "Rust Orange Banarasi Brocade Suit", baseFabric: "Shimmer Jacquard" },
  "6032": { title: "Celestial Rose Silk Straight Kurti", baseFabric: "Pure Crepe" },
  "6033": { title: "Mustard Banarasi Tunic Set", baseFabric: "Jamdani Jacquard" },
  "6034": { title: "Scarlet Resham Zari Ensemble", baseFabric: "Chanderi & Organza" },
  "6036": { title: "Exotic Fauna Motif Silk Ensemble", baseFabric: "Giraffe Print Silk" },
  "6037": { title: "Blush Rose Chikankari Suit", baseFabric: "Two Tone Silk" },
  "6042": { title: "Coral Floral Handblock Kurti Set", baseFabric: "Crush Tissue Silk" },
  "6045": { title: "Charcoal Slate Zardozi Tunic Set", baseFabric: "Salsa Silk" },
  "6046": { title: "Pistachio Green Chikankari Suit", baseFabric: "Salsa Silk" },
  "6047": { title: "Golden Sand Georgette Kurta Suit", baseFabric: "Salsa Silk" },
  "6049": { title: "Copper Russet Velvet Festive Kurti", baseFabric: "Shimmer Tissue" },
  "6051": { title: "Sage Green Pintuck Kurti Set", baseFabric: "Pure Muslin" },
  "6052": { title: "Cobalt Zari Embroidered Set", baseFabric: "Mulmul Chanderi" },
  "6053": { title: "Turquoise Handcrafted Ensemble", baseFabric: "Mulmul Chanderi" },
  "6062": { title: "Midnight Indigo Handcrafted Set", baseFabric: "Pure Silk" },
  "6063": { title: "Carnation Pink Mirror Work Ensemble", baseFabric: "Pure Silk" },
  "6065": { title: "Topaz Yellow Banarasi Kurti Set", baseFabric: "Pure Crepe" },
  "6067": { title: "Amethyst Purple Organza Suit Set", baseFabric: "Jacquard Silk" },
  "6069": { title: "Dusty Mauve Floral Chanderi Set", baseFabric: "Pure Crepe" },
  "6070": { title: "Champagne Silk Straight Kurta", baseFabric: "Pure Silk" },
  "6072": { title: "Crimson Brocade Festival Set", baseFabric: "Mulmul Chanderi" },
  "6073": { title: "Forest Green Zari Brocade Set", baseFabric: "Salsa Silk" },
  "6074": { title: "Sapphire Georgette Kurta Suit", baseFabric: "Mulmul Chanderi" },
  "6076": { title: "Regal Noir Pure Crepe Couture Set", baseFabric: "Pure Crepe" },
  "6077": { title: "Peach Floral Handblock Set", baseFabric: "Silk & Salsa" },
  "6078": { title: "Maroon Mirror Work Ensemble", baseFabric: "Salsa Silk" },
  "6084": { title: "Lavender Organza Suit Set", baseFabric: "Pure Muslin" },
  "6086": { title: "Amber Gold Festive Set", baseFabric: "Pure Silk" },
  "6087": { title: "Emerald Green Festive Kurti", baseFabric: "Pure Crepe" },
  "6088": { title: "Plum Velvet Festive Kurti", baseFabric: "Pure Muslin" },
  "6089": { title: "Crimson Silk Straight Kurta Set", baseFabric: "Handwoven Silk" },
  "6099": { title: "Moonlight Silver Resham Ensemble", baseFabric: "Pure Silk" },
  "6103": { title: "Aquamarine Floral Silk Suit", baseFabric: "Pure Chinon" },
  "6104": { title: "Garnet Red Festive Embroidered Set", baseFabric: "Pure Chinon" },
  "6129": { title: "Apricot Peach Chanderi Kurti Set", baseFabric: "Crush Tissue Silk" },
  "6130": { title: "Opal White Artisan Handblock Suit", baseFabric: "Crush Tissue Silk" },
  "6141": { title: "Imperial Sapphire Zari Festive Suit", baseFabric: "Crush Tissue Silk" }
};

function formatFabric(rawFabric) {
  if (!rawFabric) return "Pure Silk Blend";
  const lower = rawFabric.toLowerCase().trim();
  if (lower.includes("jamdani") && lower.includes("jackard")) return "Jamdani Jacquard";
  if (lower.includes("mull") || lower.includes("chanderi")) return "Mulmul Chanderi";
  if (lower.includes("two tone")) return "Two Tone Silk";
  if (lower.includes("shimmer") && lower.includes("lining")) return "Shimmer Lining Silk";
  if (lower.includes("shimmer") && lower.includes("jackard")) return "Shimmer Jacquard";
  if (lower.includes("jackard") && lower.includes("silk")) return "Jacquard Silk";
  if (lower.includes("jackard")) return "Artisan Jacquard";
  if (lower.includes("pura crepe") || lower.includes("pure crepe")) return "Pure Crepe";
  if (lower.includes("crape") || lower.includes("crepe print") || lower.includes("crepe")) {
    if (lower.includes("print")) return "Printed Crepe";
    return "Pure Crepe";
  }
  if (lower.includes("chinon")) return "Pure Chinon";
  if (lower.includes("jamdani")) return "Jamdani Cotton Silk";
  if (lower.includes("crush")) return "Crush Tissue Silk";
  if (lower.includes("salsa")) return "Salsa Silk";
  if (lower.includes("shimmer")) return "Shimmer Tissue";
  if (lower.includes("shiffon")) return "Pure Chiffon";
  if (lower.includes("maslin") || lower.includes("muslin")) return "Pure Muslin";
  if (lower.includes("girrafe")) return "Giraffe Print Silk";
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
    // Sort priority: prefer non-angle (angle === null), prefer jpg
    priority: (angle ? 10 : 0) + (ext === 'png' ? 1 : 0)
  });
}

// Sort files in each group so mainImage is first
for (const [key, list] of newGroups.entries()) {
  list.sort((a, b) => a.priority - b.priority);
}

// 2. Read existing products
const existingTs = fs.readFileSync(path.join(__dirname, '..', 'app', 'data', 'products.ts'), 'utf8');
const pMatch = existingTs.match(/export const PRODUCTS: Product\[\] = (\[[\s\S]*?\]);\s*export const PRODUCTS_MAP/);
const existingProducts = JSON.parse(pMatch[1]);

// Retain products from existing that have no counterpart in newdata (e.g. 6007, 6014, 6016, 6034, 6070, 6089)
const retainedFromExisting = [];
for (const p of existingProducts) {
  const prefix = Math.floor(p.priceNum / 100).toString();
  const key = `${prefix}-${p.code}`;
  // If neither key nor code is in newGroups, retain
  const codeInNew = Array.from(newGroups.keys()).some(k => k.endsWith(`-${p.code}`));
  if (!newGroups.has(key) && !codeInNew) {
    retainedFromExisting.push(p);
  }
}

console.log('Retained legacy products (not in newdata):', retainedFromExisting.map(p => `${p.code} (${p.price})`));

// 3. Build product list from newGroups
const newProducts = [];
for (const [key, files] of newGroups.entries()) {
  const first = files[0];
  const code = first.code;
  const pricePrefix = first.pricePrefix;
  const priceNum = parseInt(pricePrefix + '95', 10);
  const price = `₹${priceNum.toLocaleString('en-IN')}`;
  const stock = parseInt(pricePrefix, 10);
  
  // Fabric determination
  const fabric = formatFabric(first.fabric || (titlesMap[code] ? titlesMap[code].baseFabric : 'Pure Silk'));
  
  // Title determination
  const titleInfo = titlesMap[code];
  const baseTitle = titleInfo ? titleInfo.title : `Artisan Festive Ensemble #${code}`;
  
  // Main image & gallery images
  const mainImage = `/newdata/${first.file}`;
  const images = files.map(x => `/newdata/${x.file}`);
  
  newProducts.push({
    code,
    key,
    pricePrefix: parseInt(pricePrefix, 10),
    title: baseTitle,
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

// Sort new products: first by priceNum, then by code
newProducts.sort((a, b) => a.priceNum - b.priceNum || parseInt(a.code, 10) - parseInt(b.code, 10));

// Merge with retained products
const finalProducts = [];
let idCounter = 1;

for (const np of newProducts) {
  const rating = Number((4.4 + ((idCounter * 3) % 6) * 0.1).toFixed(1));
  const reviews = 42 + (idCounter * 17) % 190;
  finalProducts.push({
    id: idCounter++,
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

for (const ep of retainedFromExisting) {
  finalProducts.push({
    ...ep,
    id: idCounter++
  });
}

console.log('Total final products:', finalProducts.length);
console.log('First 5 final products:');
finalProducts.slice(0, 5).forEach(p => {
  console.log(`id=${p.id} code=${p.code} price=${p.price} stock=${p.stock} fabric='${p.fabric}' img='${p.image}'`);
});
console.log('Last 5 final products:');
finalProducts.slice(-5).forEach(p => {
  console.log(`id=${p.id} code=${p.code} price=${p.price} stock=${p.stock} fabric='${p.fabric}' img='${p.image}'`);
});
