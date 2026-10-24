const fs = require('fs');
const path = require('path');
const files = require(path.join(__dirname, 'all_drive_files.json'));

// Sort files by design code
files.sort((a, b) => {
  const codeA = parseInt(a.name.match(/\d+$/)[0], 10);
  const codeB = parseInt(b.name.match(/\d+$/)[0], 10);
  return codeA - codeB;
});

const titlesByCode = [
  "Royal Zari Chanderi Ensemble",
  "Heritage Handblock Kurta Set",
  "Festive Zardozi Silk Ensemble",
  "Embroidered Silk Kurti Set",
  "Blush Rose Chikankari Set",
  "Emerald Green Festive Kurti",
  "Midnight Velvet Anarkali Set",
  "Champagne Silk Straight Kurta",
  "Mustard Banarasi Tunic Set",
  "Ivory Handloom Cotton Suit",
  "Crimson Brocade Festival Set",
  "Sapphire Georgette Kurta Suit",
  "Peach Floral Handblock Set",
  "Maroon Mirror Work Ensemble",
  "Lavender Organza Suit Set",
  "Sage Green Pintuck Kurti",
  "Cobalt Zari Embroidered Set",
  "Turquoise Handcrafted Ensemble",
  "Amber Gold Festive Set",
  "Plum Velvet Festive Kurti"
];

const fabrics = [
  "Pure Chanderi Silk",
  "Premium Cotton Blend",
  "Handwoven Silk",
  "Georgette & Mulmul",
  "Lucknowi Cotton",
  "Organza & Silk",
  "Velvet & Brocade",
  "Banarasi Art Silk"
];

const products = files.map((f, index) => {
  const match = f.name.match(/^\((\d+)\)-(\d+)$/);
  const stock = parseInt(match[1], 10);
  const priceNum = parseInt(match[2], 10);
  const code = match[2];
  const id = index + 1;

  const baseTitle = titlesByCode[index % titlesByCode.length];
  const title = `${baseTitle} #${code}`;
  const price = `₹${priceNum.toLocaleString('en-IN')}`;
  const fabric = fabrics[index % fabrics.length];
  const rating = Number((4.2 + ((id * 7) % 8) * 0.1).toFixed(1));
  const reviews = 50 + (id * 17) % 250;

  return {
    id,
    code,
    title,
    price,
    priceNum,
    stock,
    rating,
    reviews,
    category: "Ethnic Wear",
    fabric,
    image: `/products/${f.name}.jpg`,
    description: `Exquisitely crafted ${baseTitle.toLowerCase()} featuring artisan detailing, tailored silhouette, and premium ${fabric.toLowerCase()}. Designed for modern elegance and celebrations.`,
    details: [
      fabric,
      "Artisan handcrafted embroidery",
      "Tailored comfortable silhouette",
      "Matching palazzo / trousers included",
      "Dry clean recommended",
      "Made in India"
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"]
  };
});

fs.writeFileSync(path.join(__dirname, 'products_data.json'), JSON.stringify(products, null, 2));
console.log('Generated', products.length, 'products in products_data.json');
console.log('First 3:', products.slice(0, 3));
console.log('Last 3:', products.slice(-3));
