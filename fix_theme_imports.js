const fs = require('fs');
const files = [
  'app/components/ProductDetails.tsx',
  'app/components/Header.tsx',
  'app/components/DigitalShowroom.tsx',
  'app/components/CheckoutClient.tsx',
  'app/components/AboutUs.tsx',
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(
    `import { useTheme } from "next-themes";`,
    `import { useTheme } from "./ThemeProvider";`
  );
  fs.writeFileSync(file, content);
  console.log('Updated: ' + file);
});
console.log('Done!');
