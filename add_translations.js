const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, 'messages');
const files = fs.readdirSync(messagesDir).filter(f => f.endsWith('.json'));

const editorialTranslations = {
  "heroMeta": "SS 2025 — Suits & Ethnic Luxury",
  "heroTitle1": "SIDHANT",
  "heroTitle2": "Heritage & Modernity",
  "heroSubtitle": "A legacy of craftsmanship meets contemporary tailoring. Redefining men's luxury occasion wear with impeccable precision and regal elegance.",
  "signature": "Signature",
  "collection": "Collection",
  "festive": "Festive 2025",
  "viewCollection": "View Complete Collection",
  "atelierSync": "Atelier Sync: Active",
  "craftsmanshipStatus": "Craftsmanship Status: Seamless",
  "curatedRetail": "Curated Retail",
  "heritagePartners": "Heritage Partners",
  "coutureAccess": "Couture Access",
  "coutureAccessDesc": "Exclusive access to our handcrafted collections. Designed for boutique retailers who appreciate meticulous attention to detail and traditional artistry.",
  "explorePartnership": "Explore Partnership",
  "enterprisePartners": "Enterprise Partners",
  "artisanalWholesale": "Artisanal Wholesale",
  "globalAccess": "Global Access",
  "globalAccessDesc": "Scale your offerings with our high-volume production capabilities. Maintaining uncompromising quality and heritage craftsmanship for global distribution.",
  "joinNetwork": "Join Global Network",
  "products": {
    "royalSherwani": "Heritage Royal Sherwani",
    "royalSherwaniLabel": "The Nawab",
    "goldenBridal": "Golden Bridal Lehenga",
    "goldenBridalLabel": "Bridal Heirloom",
    "artisanLehenga": "Artisan Embroidered Lehenga",
    "artisanLehengaLabel": "The Rosette",
    "classicKurta": "Classic Kurta",
    "classicKurtaLabel": "Everyday Elegance",
    "emeraldSuit": "Emerald Suit",
    "emeraldSuitLabel": "Modern Classic"
  }
};

files.forEach(file => {
  const filePath = path.join(messagesDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (!data.editorial) {
    data.editorial = editorialTranslations;
  } else {
    data.editorial = { ...data.editorial, ...editorialTranslations };
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log('Updated', file);
});
