const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'app', 'components', 'ProductDetails.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// Replace imports and PRODUCTS database
const startIndex = content.indexOf('// ─── Product Database');
const endIndex = content.indexOf('// ─── Star rating renderer');

if (startIndex === -1 || endIndex === -1) {
  console.error('Could not find markers');
  process.exit(1);
}

const replacement = `// ─── Product Database imported from ../data/products ────────
`;

content = content.slice(0, startIndex) + replacement + content.slice(endIndex);

// Add import of PRODUCTS_MAP and getProductById
content = content.replace(
  'import { useCurrency } from "../context/CurrencyContext";',
  'import { useCurrency } from "../context/CurrencyContext";\nimport { PRODUCTS_MAP, getProductById } from "../data/products";'
);

// Update product lookup: const product = PRODUCTS[id]; -> const product = getProductById(id) || PRODUCTS_MAP[id];
content = content.replace(
  'const product = PRODUCTS[id];',
  'const product = getProductById(id) || PRODUCTS_MAP[id];'
);

// Update price display to also show stock
const priceTarget = `{/* Price */}
            <div className="flex flex-col gap-1 mb-8">
              <span className="text-3xl font-[family-name:var(--font-inter)] font-bold">
                {formatPrice(parseInt(product.price.replace(/\\D/g, "")))}
              </span>
              {currency !== "INR" && (
                <span className={\`text-xs \${isDark ? "text-white/40" : "text-black/40"}\`}>
                  {product.price} (original INR)
                </span>
              )}
            </div>`;

const priceReplacement = `{/* Price & Stock */}
            <div className="flex flex-col gap-2 mb-8">
              <div className="flex items-baseline justify-between flex-wrap gap-3">
                <span className="text-3xl font-[family-name:var(--font-inter)] font-bold">
                  {formatPrice(parseInt(product.price.replace(/\\D/g, "")))}
                </span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  {product.stock} units in stock
                </span>
              </div>
              {currency !== "INR" && (
                <span className={\`text-xs \${isDark ? "text-white/40" : "text-black/40"}\`}>
                  {product.price} (original INR)
                </span>
              )}
            </div>`;

if (content.includes('{/* Price */}')) {
  content = content.replace(priceTarget, priceReplacement);
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Successfully updated ProductDetails.tsx!');
