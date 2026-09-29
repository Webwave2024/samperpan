const fs = require('fs');
const file = 'app/components/Header.tsx';
let content = fs.readFileSync(file, 'utf8');

const replacements = {
  '>Home<': '>{t(\'home\')}<',
  '>About Us<': '>{t(\'aboutUs\')}<',
  '>Collections<': '>{t(\'collections\')}<',
  '>Contact<': '>{t(\'contact\')}<',
  'Virtual Experience<': '{t(\'virtualExperience\')}<',
  '>The Atelier Experience<': '>{t(\'theAtelierExperience\')}<',
  '360° Virtual Tour ↗<': '{t(\'virtualTour\')}<',
  '>Search Products<': '>{t(\'searchProducts\')}<',
  'placeholder="Search kurtis, suits, anarkalis..."': 'placeholder={t(\'searchPlaceholder\')}',
  '>Go<': '>{t(\'go\')}<',
  '>Popular:<': '>{t(\'popular\')}<',
  '>Your Bag<': '>{t(\'yourBag\')}<',
  '>Your bag is empty<': '>{t(\'yourBagEmpty\')}<',
  '>Continue Shopping<': '>{t(\'continueShopping\')}<',
  '>Size: ': '>{t(\'size\')} ',
  '>Subtotal<': '>{t(\'subtotal\')}<',
  '>Shipping & taxes calculated at checkout<': '>{t(\'shippingCalculated\')}<',
  '>Checkout<': '>{t(\'checkout\')}<'
};

for (const [key, value] of Object.entries(replacements)) {
  content = content.replace(new RegExp(key, 'g'), value);
}

fs.writeFileSync(file, content);
console.log('Replaced strings in Header.tsx');
