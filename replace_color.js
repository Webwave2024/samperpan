const fs = require('fs');
const path = require('path');

const walkSync = function(dir, filelist) {
  let files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
      filelist = walkSync(dir + '/' + file, filelist);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      filelist.push(dir + '/' + file);
    }
  });
  return filelist;
};

const files = walkSync('./app');

let count = 0;
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  // Replace text-[#...] with text-[#d4af37]
  content = content.replace(/text-\[#(2e8b57|0d6b3e|4ade80|1a5c38|145c38)\]/gi, 'text-[#d4af37]');
  
  // Replace style={{ color: '#...' }}
  content = content.replace(/color:\s*['"]#(2e8b57|0d6b3e|4ade80|1a5c38|145c38)['"]/gi, 'color: "#d4af37"');
  
  // Replace rgba for color
  content = content.replace(/color:\s*['"]rgba\(46,139,87,([^)]+)\)['"]/gi, 'color: "rgba(212,175,55,$1)"');
  
  // Also replace shadow-green-900/20 with shadow-yellow-900/20 just in case
  content = content.replace(/shadow-green-/gi, 'shadow-yellow-');

  if (content !== original) {
    fs.writeFileSync(file, content);
    count++;
    console.log('Updated', file);
  }
});
console.log('Total files updated:', count);
