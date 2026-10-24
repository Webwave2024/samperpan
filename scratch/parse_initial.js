const fs = require('fs');
const html = fs.readFileSync('drive_test.html', 'utf-8');

// Match aria-label="(stock)-price ..." and ssk='5:auSv138:<FILE_ID>-...'
const regex = /aria-label="(\(\d+\)-[^\"]+?)\s+Image\s+Shared"[^>]*?ssk=['"]5:[^:]+:([a-zA-Z0-9_-]{25,45})/g;
let m;
const files = [];
const seen = new Set();
while ((m = regex.exec(html)) !== null) {
  const name = m[1];
  const fileId = m[2];
  if (!seen.has(name)) {
    seen.add(name);
    files.push({ name, fileId });
  }
}

console.log('Total extracted files from drive_test.html:', files.length);
console.log('Sample:', files.slice(0, 10));
fs.writeFileSync('scratch/initial_files.json', JSON.stringify(files, null, 2));
