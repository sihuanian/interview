import puppeteer from 'puppeteer';
// Or import puppeteer from 'puppeteer-core';

// Launch the browser and open a new blank page
const browser = await puppeteer.launch({
  headless: false,
  devtools: true,
  slowMo: 10,
  timeout: 15000,
  defaultViewport: {width: 1080, height: 1024},
});
const page = await browser.newPage();

// Navigate the page to a URL.
await page.goto('https://developer.chrome.com/', { waitUntil: 'networkidle2' });

await page.screenshot({ path: 'page.png', });
await page.pdf({ path: 'page.pdf', format: 'A4', landscape: true, })

// Set screen size.
// await page.setViewport({width: 1080, height: 1024});

// Type into search box.
await page.locator('.devsite-search-field').fill('automate beyond recorder');
const field = await page.$('.devsite-search-field');
field.screenshot({ path:'search-box.png' });

// Wait and click on first result.
await page.locator('.devsite-result-item-link').click();

// Locate the full title with a unique string.
// .locator('::-p-text(Customize and automate)')
const textSelector = await page
  .locator('text/Customize and automate')
  .waitHandle();
const fullTitle = await textSelector?.evaluate(el => el.textContent);

// // Print the full title.
console.log('The title of this blog post is "%s".', fullTitle);

await browser.close();
