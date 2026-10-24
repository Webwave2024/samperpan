const fs = require('fs');
const path = require('path');

const files = require(path.join(__dirname, 'all_drive_files.json'));
const destDir = path.join(__dirname, '..', 'public', 'products');

async function downloadAll() {
  console.log(`Starting download of ${files.length} images...`);
  let success = 0;
  let failed = 0;

  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const filename = `${f.name}.jpg`;
    const destPath = path.join(destDir, filename);

    // If file already exists and size > 1000, skip
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 1000) {
      console.log(`[${i+1}/${files.length}] Already exists: ${filename}`);
      success++;
      continue;
    }

    const url = `https://lh3.googleusercontent.com/d/${f.id}`;
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const buffer = await res.arrayBuffer();
      fs.writeFileSync(destPath, Buffer.from(buffer));
      console.log(`[${i+1}/${files.length}] Downloaded: ${filename} (${buffer.byteLength} bytes)`);
      success++;
    } catch (e) {
      console.error(`[${i+1}/${files.length}] FAILED ${filename}: ${e.message}`);
      failed++;
    }
  }

  console.log(`\nFinished: ${success} downloaded/existing, ${failed} failed.`);
}

downloadAll();
