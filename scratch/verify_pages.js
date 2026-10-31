const http = require('http');

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  const retail = await fetchPage('http://localhost:3000/en/retail');
  console.log('Retail has "in stock":', retail.includes('in stock'));
  console.log('Retail has "Stock:":', retail.includes('Stock:'));

  const wholesale = await fetchPage('http://localhost:3000/en/wholesale');
  console.log('Wholesale has "Units Available":', wholesale.includes('Units Available'));
  console.log('Wholesale has "Stock:":', wholesale.includes('Stock:'));

  const product = await fetchPage('http://localhost:3000/en/product/16');
  console.log('Product detail has "units in stock":', product.includes('units in stock'));
  console.log('Product detail has "Select Size":', product.includes('Select Size'));
}

run().catch(console.error);
