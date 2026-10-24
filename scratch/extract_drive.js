const fs = require('fs');
const html = fs.readFileSync('drive_test.html', 'utf-8');

const idx = html.indexOf('(6)-6069');
console.log('Surrounding snippet:');
console.log(html.slice(Math.max(0, idx - 400), idx + 200));
