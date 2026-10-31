const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(path.join(__dirname, '..', 'public', 'newdata'));
const parsed = [];

for (const f of files) {
  // Regex: (prefix)-code ... (variant)?.ext
  // e.g. (11)-6033 jamdani jackard.jpg
  // (13)-6103 chinon (1).jpg
  // (18)-6003 pure crepe.jpg
  // (18)-6003 pure crepe.png
  // (8)-6087 Maslin print  (1).jpg
  // (17)-6078 salsa (1).jpg
  // (24)-6076 pure crepe (1).jpg
  // (22)-6032 pura crepe.png
  // (18)-6030 shimmer jackard .jpg
  const m = f.match(/^\((\d+)\)-(\d+)(.*?)\.(jpg|png|webp|jpeg)$/i);
  if (!m) {
    console.log('UNMATCHED:', f);
    continue;
  }
  const pricePrefix = m[1];
  const code = m[2];
  let rest = m[3].trim();
  let variant = null;
  const vMatch = rest.match(/\((\d+)\)$/);
  if (vMatch) {
    variant = vMatch[1];
    rest = rest.replace(/\((\d+)\)$/, '').trim();
  }
  const fabric = rest;
  const ext = m[4].toLowerCase();
  
  parsed.push({
    file: f,
    pricePrefix,
    code,
    fabric,
    variant,
    ext,
    priceNum: parseInt(pricePrefix + '95', 10)
  });
}

console.log('Total parsed files:', parsed.length);

const byCode = {};
parsed.forEach(p => {
  if (!byCode[p.code]) byCode[p.code] = [];
  byCode[p.code].push(p);
});

console.log('Unique codes count:', Object.keys(byCode).length);
for (const [code, items] of Object.entries(byCode)) {
  const prefixes = [...new Set(items.map(x => x.pricePrefix))];
  const fabrics = [...new Set(items.map(x => x.fabric))];
  const fileList = items.map(x => x.file).join(' ; ');
  console.log(`Code ${code} | Price: ₹${items[0].priceNum} (prefix ${prefixes.join(',')}) | Fabric: ${fabrics.join(', ')} | Files: ${fileList}`);
}
