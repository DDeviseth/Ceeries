const {chromium}=require('C:/Users/Trav/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('node:fs/promises'),assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
 const base='http://127.0.0.1:4173/',errors=[],results=[];
 for(const width of [1440,800,390]){
  const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'}),page=await context.newPage();
  page.on('pageerror',e=>errors.push(e.message));
  for(const route of ['index','features','products','contact','campaigns','data']){
   await page.goto(base+route+'.html');await page.evaluate(()=>document.fonts.ready);
   if(route==='index'||route==='products')await page.waitForSelector('.product-card');
   await page.evaluate(async()=>{const imgs=[...document.images];imgs.forEach(i=>i.loading='eager');await Promise.all(imgs.map(i=>i.decode().catch(()=>{})));});
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,`${route} overflow at ${width}`);
   assert.equal(await page.locator('img').evaluateAll(imgs=>imgs.every(i=>i.naturalWidth>0)),true,`${route} broken image`);
   if(route==='index'){
    const sizes=await page.locator('#featured-products img').evaluateAll(imgs=>imgs.map(i=>({w:i.clientWidth,h:i.clientHeight})));
    assert.ok(Math.abs(sizes[0].w-sizes[1].w)<2&&Math.abs(sizes[0].h-sizes[1].h)<2,'Equal featured images');
    assert.equal(await page.locator('.model-gallery .gallery-track img').count(),7);await page.getByRole('button',{name:'Next model photos'}).click();
    assert.ok(await page.locator('.gallery-track').evaluate(el=>el.scrollLeft)>0);await page.getByRole('button',{name:'Previous model photos'}).click();
   }
   if(route==='features'){assert.equal(await page.locator('#faq details:visible').count(),5);await page.locator('#faq-toggle').click();assert.equal(await page.locator('#faq details:visible').count(),13);await page.locator('#faq-toggle').click();}
   await page.evaluate(()=>{document.activeElement?.blur();scrollTo(0,0)});
   await page.screenshot({path:`.impeccable/review/screenshots/storefront-${route}-${width}.png`,fullPage:true});
  }
  await page.goto(base+'products.html');await page.waitForSelector('[data-add-cart]');assert.equal(await page.locator('.shade-gallery-track img').count(),7);
  await page.locator('[data-add-cart="barbie"]').first().click();await page.locator('[data-add-cart="queen"]').first().click();
  assert.equal(await page.locator('[data-cart-count]').first().textContent(),'2');
  await page.getByRole('button',{name:'Increase Barbie quantity'}).click();assert.match(await page.locator('.cart-summary').textContent(),/₱597/);
  await page.reload();await page.waitForSelector('.cart-row');assert.equal(await page.locator('[data-cart-count]').first().textContent(),'3');
  await page.locator('#cart-inquiry').click();await page.waitForFunction(()=>document.querySelector('#contact-message').value.includes('Barbie × 2'));
  assert.match(await page.locator('#contact-message').inputValue(),/Queen × 1/);
  await page.goto(base+'products.html#cart');await page.waitForSelector('.cart-row');
  await page.screenshot({path:`.impeccable/review/screenshots/cart-filled-${width}.png`,fullPage:true});
  await page.getByRole('button',{name:'Remove Barbie from cart'}).click();await page.getByRole('button',{name:'Remove Queen from cart'}).click();assert.equal(await page.locator('.cart-empty').count(),1);
  await page.evaluate(()=>localStorage.setItem('ceeries-cart','[{"id":"unknown","quantity":2},{"id":"queen","quantity":-5}]'));await page.reload();await page.waitForSelector('.cart-empty');
  results.push(`${width}px: all six pages, equal images, gallery controls, condensed FAQ, cart totals/persistence/removal/inquiry and corrupt-cart recovery passed`);
  await context.close();
 }
 assert.deepEqual(errors,[]);await fs.writeFile('.impeccable/review/storefront-verification.json',JSON.stringify({results,errors},null,2));console.log(results.join('\n'));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
