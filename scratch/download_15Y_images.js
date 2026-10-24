const fs = require('fs');
const path = require('path');

const files = require('./folder_15Y_files.json');
const destDir = path.join(__dirname, '..', 'public', 'products');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

async function downloadFile(f, index, total) {
  const filename = f.name;
  const destPath = path.join(destDir, filename);

  if (fs.existsSync(destPath) && fs.statSync(destPath).size > 1000) {
    console.log(`[${index + 1}/${total}] Exists: ${filename}`);
    return true;
  }

  const url = `https://lh3.googleusercontent.com/d/${f.id}`;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buffer = await res.arrayBuffer();
      fs.writeFileSync(destPath, Buffer.from(buffer));
      console.log(`[${index + 1}/${total}] Downloaded: ${filename} (${buffer.byteLength} bytes)`);
      return true;
    } catch (e) {
      console.error(`[${index + 1}/${total}] Attempt ${attempt} failed for ${filename}: ${e.message}`);
      if (attempt === 3) return false;
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  return false;
}

async function downloadAll() {
  console.log(`Starting download of ${files.length} images...`);
  const concurrency = 6;
  let queueIdx = 0;
  let successCount = 0;
  let failCount = 0;

  async function worker() {
    while (queueIdx < files.length) {
      const currentIdx = queueIdx++;
      const ok = await downloadFile(files[currentIdx], currentIdx, files.length);
      if (ok) successCount++;
      else failCount++;
    }
  }

  const workers = Array.from({ length: concurrency }, () => worker());
  await Promise.all(workers);

  console.log(`\nFinished: ${successCount} succeeded, ${failCount} failed.`);
}

downloadAll();
