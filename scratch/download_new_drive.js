const fs = require('fs');
const path = require('path');

const files = require(path.join(__dirname, 'all_drive_files_new.json'));
const destDir = path.join(__dirname, '..', 'public', 'products');

async function downloadNewFiles() {
  console.log(`Starting download of ${files.length} images from new folder...`);
  let success = 0;
  let failed = 0;

  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    // Use f.name as filename (e.g. (13)-6015.png)
    const filename = f.name;
    const destPath = path.join(destDir, filename);

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

downloadNewFiles();
