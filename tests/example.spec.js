// @ts-check
// @ts-ignore
const { test, expect, chromium } = require('@playwright/test');
const exp = require('constants');


test('scenario1', async ({ page }) => {

  await page.goto('https://www.amazon.eg/');
  //login button
  await page.click('#nav-link-accountList');

  // Enter a valid but unregistered email
  await page.fill('input[name="email"]', 'your-email@example.com');
  await page.locator('#a-page').click();

  const newacc = page.locator('xpath=/html[1]/body[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/h1[1]');
  //to check the screenshot in the report
  await expect(newacc).toBeVisible();

});



test('scenario2', async ({ page }) => {

  await page.goto('https://www.amazon.eg/');
  // all tab menu
  await page.getByLabel('Open Menu').click();
  // today sale
  await page.click('text= عروض اليوم');
  await page.waitForSelector('ol.a-carousel');

  // Select the second category
  const secondCategory = await page.locator('ol.a-carousel li').nth(3);
  await secondCategory.click();
  await page.waitForSelector('.GridRow-module__container_q6XsDi4clqdE6jhYFSBW');

  // Select the first product
  const firstProduct = await page.$('.GridRow-module__container_q6XsDi4clqdE6jhYFSBW .ProductCard-module__card_uyr_Jh7WpSkPx4iEpn4w a');
  firstProduct?.click();
  const productTitle = await page.textContent('#productTitle');
  console.log(productTitle);

  
  const productPrice = await page.textContent('xpath=/html[1]/body[1]/div[2]/div[1]/div[6]/div[3]/div[4]/div[12]/div[1]/div[1]/div[3]/div[1]/span[3]/span[2]/span[2]');
  // get the price value 
  const productPriceValue = parseFloat(productPrice.replace(/[^0-9.]/g, ''));


  console.log(productPrice);

  await page.locator('#a-autoid-0-announce').click();
  await page.getByLabel('2', { exact: true }).getByText('2').click();
  const productQuantity = await page.textContent('#a-autoid-0-announce');
  // get quantity value 
  const productQuantityValue = parseFloat(productQuantity.replace(/[^0-9.]/g, ''));
  await page.locator('#add-to-cart-button').click();
    // some products has a warranty option

  const optionalElement = await page.locator('xpath=//body/div[8]/div[3]/div[1]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[3]/div[1]/span[2]/span[1]/input[1]');
  // Check if the element is visible
  if (await optionalElement.isVisible()) {
    // If the element is visible, click it
    await optionalElement.click();
  } else {
    console.log("The element is not present or visible. Skipping the click action.");


  }
  // cart button
  await page.locator('#nav-cart').click();
  const cartprice = await page.textContent('#sc-subtotal-amount-activecart');
  // get the price value on the cart
  const cartPriceValue = parseFloat(cartprice.replace(/[^0-9.]/g, ''));
  const cartQuantity = await page.textContent('#a-autoid-0-announce');
    // get the quantity value on the cart

  const cartQuantityValue = parseFloat(cartQuantity.replace(/[^0-9.]/g, ''));
  console.log('product quantity is : ', productQuantityValue);
  console.log('cart quantity is :', cartQuantityValue);
  console.log('product price is', productPriceValue);
  console.log('cart price is :', cartPriceValue);

  expect(productQuantityValue).toEqual(cartQuantityValue);
  expect(productPriceValue).toEqual(cartPriceValue / 2);



});



test('scenario3', async ({ page }) => {

  await page.goto('https://www.amazon.eg/');


  await page.hover('xpath=/html[1]/body[1]/div[1]/header[1]/div[1]/div[1]/div[3]/div[1]/a[2]/span[1]/span[1]');
  // your order 
  await page.locator('#nav_prefetch_yourorders').click();
  let currentURL=page.url();
  expect(currentURL).toContain('signin')
  await page.goBack();

  await page.hover('xpath=/html[1]/body[1]/div[1]/header[1]/div[1]/div[1]/div[3]/div[1]/a[2]/span[1]/span[1]');
  // your addresses
  await page.locator('#nav_prefetch_youraddresses').click();
   currentURL=page.url();
  expect(currentURL).toContain('signin')
  page.goBack();
  await page.hover('xpath=/html[1]/body[1]/div[1]/header[1]/div[1]/div[1]/div[3]/div[1]/a[2]/span[1]/span[1]');
  //yourlists
  await page.locator('xpath=/html[1]/body[1]/div[1]/header[1]/div[1]/div[3]/div[2]/div[2]/div[1]/div[3]/a[4]/span[1]').click();
  currentURL=page.url();

  expect(currentURL).toContain('wishlist');



  






})