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
  
  // Replace #2e8b57 (Sea Green) -> #d4af37 (Gold)
  content = content.replace(/#2e8b57/gi, '#d4af37');
  content = content.replace(/rgba\(46,\s*139,\s*87/gi, 'rgba(212, 175, 55'); // #2e8b57
  
  // Replace #0d6b3e (Royal Green) -> #b59536 (Darker Gold)
  content = content.replace(/#0d6b3e/gi, '#b59536');
  content = content.replace(/rgba\(13,\s*107,\s*62/gi, 'rgba(181, 149, 54'); // #0d6b3e
  
  // Replace #1a5c38 (Dark Green) -> #8b7322 (Deep Gold)
  content = content.replace(/#1a5c38/gi, '#8b7322');
  content = content.replace(/rgba\(26,\s*92,\s*56/gi, 'rgba(139, 115, 34'); // #1a5c38
  
  // Replace #145c38 (Dark Green) -> #8b7322 (Deep Gold)
  content = content.replace(/#145c38/gi, '#8b7322');
  content = content.replace(/rgba\(20,\s*92,\s*56/gi, 'rgba(139, 115, 34'); // #145c38

  // Replace #4ade80 (Light Green) -> #fde047 (Light Gold/Yellow)
  content = content.replace(/#4ade80/gi, '#fde047');
  content = content.replace(/rgba\(74,\s*222,\s*128/gi, 'rgba(253, 224, 71'); // #4ade80

  // Just to be safe, replace any literal "green" tailwind classes if they exist in relevant files
  // Only targeting borders, bg, text, shadow
  content = content.replace(/border-green-/gi, 'border-yellow-');
  content = content.replace(/bg-green-/gi, 'bg-yellow-');
  content = content.replace(/text-green-/gi, 'text-yellow-');
  content = content.replace(/shadow-green-/gi, 'shadow-yellow-');
  content = content.replace(/from-green-/gi, 'from-yellow-');
  content = content.replace(/to-green-/gi, 'to-yellow-');
  content = content.replace(/via-green-/gi, 'via-yellow-');

  if (content !== original) {
    fs.writeFileSync(file, content);
    count++;
    console.log('Updated', file);
  }
});
console.log('Total files updated:', count);
