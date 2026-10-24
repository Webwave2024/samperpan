const fs = require('fs');
const path = require('path');

const files = require(path.join(__dirname, 'all_drive_files_new.json'));

// Parse files
const designs = new Map();

for (const f of files) {
  // Matches e.g. (13)-6015.png or (6)-6070 (1).png
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

// Convert to sorted array by design code
const sortedDesigns = Array.from(designs.values()).sort((a, b) => parseInt(a.code, 10) - parseInt(b.code, 10));

console.log('Unique designs found:', sortedDesigns.length);
sortedDesigns.forEach((d, idx) => {
  console.log(`${idx + 1}. Code: ${d.code} | Stock: ${d.stock} | Price: ₹${d.priceNum.toLocaleString('en-IN')} | Images: ${d.images.length} (${d.mainImage})`);
});
