import { chromium } from 'k6/x/browser';

// option setting//
/*export const options = {
   vus: 2,
   duration: '30s',
   stages: [
      { duration: '1m', target: 0 },
      { duration: '1m', target: 0 },
      { duration: '1m', target: 0 },
    ],
 };*/

export default function() {
   const browser = chromium.launch({ headless: false });
   const context = browser.newContext();
   const page = context.newPage();

   // Goto front page, find login link and click it
   context.setDefaultNavigationTimeout(60000);
   page.goto('https://www.pomelofashion.com/th/en/', { waitUntil: 'networkidle' });
   page.waitForLoadState('domcontentloaded');
   
   
   /* search box for tops */
   //console.log("Element is visible ", elem.isVisible());
   const search = page.$('img[alt="search icon"]');
   search.click();
   page.waitForNavigation();
   search.type('tops');
   search.type('{enter}');
   console.log('after search enter');

   const first_product = page.$('.product-item-name__clickable');
   first_product.frst().isVisible();
 
   /* add filter sort by New IN */
   const filter_newin = page.$('.sort-options__items>.sort-item:nth-child(2)');
   filter_newin.click();
   page.waitForNavigation();

   /* add product to cart*/
   const add_to_cart_button = page.$('.pdp__add-to-bag-cta');
   add_to_cart_button.click();
   console.log('added product to cart');
   page.waitForNavigation();

   /*user checkout bag*/
   const view_bag_button = page.$('button[data-cy="cart__view_bag');
   const quantity = page.$('.cart-item-info__quantity>div>div>div>select');
   view_bag_button.click();
   console.log('check out the bag');
   page.waitForNavigation();
   // select quantity, 2
   quantity.first().select('2');

   /*checkout the cart*/
   const checkout_button = page.$('button[data-cy="cart__checkout');
   checkout_button.click();
   console.log('check out proceed');
   page.waitForNavigation();


   page.close();
   console.log('broswer close');
   browser.close();
}