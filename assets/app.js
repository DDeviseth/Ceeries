'use strict';
const $ = (q, scope=document) => scope.querySelector(q);
const $$ = (q, scope=document) => [...scope.querySelectorAll(q)];
const escapeHtml = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let productRequest;
async function dataset(name, refresh=false) {
  if(name==='products' && productRequest && !refresh)return productRequest;
  const run = async()=>{
    for(const path of [`api/${name}`,`data/${name}.json`]) {
      try {const res=await fetch(path,{cache:'no-store'});if(!res.ok)continue;const value=await res.json();if(Array.isArray(value))return value;}catch{}
    }
    throw new Error(`Could not load ${name}. Please refresh, or open the site through its local preview server.`);
  };
  if(name==='products'){productRequest=run();productRequest.catch(()=>{productRequest=null;});return productRequest;}
  return run();
}
function notify(message) {
  const el=$('.toast');el.textContent=message;el.classList.add('show');clearTimeout(notify.timer);notify.timer=setTimeout(()=>el.classList.remove('show'),4500);
}
function errorState(el,message,retry) {
  el.innerHTML=`<div class="empty-state"><h3>Let’s try that again.</h3><p>${escapeHtml(message)}</p><button class="button" type="button">Retry</button></div>`;
  $('button',el).addEventListener('click',retry);
}
const navButton=$('.menu-button');
navButton?.addEventListener('click',()=>{const open=navButton.getAttribute('aria-expanded')!=='true';navButton.setAttribute('aria-expanded',String(open));navButton.textContent=open?'Close menu':'Menu';$('#main-nav').classList.toggle('open',open);});
document.addEventListener('keydown',e=>{if(e.key==='Escape' && navButton?.getAttribute('aria-expanded')==='true'){navButton.click();navButton.focus();}});

function card(p, featured=false) {
 return `<article class="product-card"><a class="image-link" href="products.html?product=${encodeURIComponent(p.id)}#collection" aria-label="Explore ${escapeHtml(p.name)}"><img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)} Hydra Slay Lip Oil product and shade" width="640" height="640" loading="lazy"></a><div class="product-card-heading"><h3>${escapeHtml(p.name)}</h3><span class="product-tone">${escapeHtml(p.tone)}</span></div><p>Hydra Slay Lip Oil · ₱${escapeHtml(p.price)} each</p><div class="product-card-actions"><button type="button" class="text-link" data-detail="${escapeHtml(p.id)}">View details</button><button type="button" class="text-link add-cart" data-add-cart="${escapeHtml(p.id)}">Add to cart</button></div></article>`;
}
async function setupShades() {
 const el=$('#shade-buttons');if(!el)return;
 try {
  const shades=(await dataset('products')).filter(p=>p.category==='Lip Oil');
  if(!shades.length){el.innerHTML='<p>Shade information is coming soon.</p>';return;}
  el.innerHTML=shades.map(p=>`<button type="button" class="swatch-button" style="--swatch:${escapeHtml(p.color)}" aria-label="Select ${escapeHtml(p.name)}, ${escapeHtml(p.tone)}" title="${escapeHtml(p.name)} · ${escapeHtml(p.tone)}" aria-pressed="${p.id==='barbie'}" data-shade="${escapeHtml(p.id)}"></button>`).join('');
  $$('button',el).forEach(button=>button.addEventListener('click',()=>{
    const shade=shades.find(p=>p.id===button.dataset.shade);$$('button',el).forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    const image=$('#active-shade-image');image.src=shade.image;image.alt=`${shade.name}, ${shade.tone} Hydra Slay Lip Oil`;image.classList.remove('shade-changing');void image.offsetWidth;image.classList.add('shade-changing');
    $('#active-shade-name').textContent=shade.name;$('#active-shade-tone').textContent=shade.tone;const inquiry=$('#active-shade-inquiry');inquiry.href=`products.html?product=${encodeURIComponent(shade.id)}#collection`;inquiry.innerHTML=`View ${escapeHtml(shade.name)} details <svg class="icon-arrow" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"/></svg>`;
    $('#shade-status').textContent=`${shade.name} selected.`;
  }));
 }catch(e){errorState(el,e.message,setupShades);}
}
async function setupFeatured() {
 const el=$('#featured-products');if(!el)return;
 try {const data=await dataset('products');const featured=['barbie','queen'].map(id=>data.find(p=>p.id===id)).filter(Boolean);el.innerHTML=featured.length?featured.map(p=>card(p,true)).join(''):'<p>The collection is coming soon.</p>';
  $$('[data-detail]',el).forEach(b=>b.addEventListener('click',()=>{location.href=`products.html?product=${encodeURIComponent(b.dataset.detail)}#collection`;}));
 }catch(e){errorState(el,e.message,setupFeatured);}
}
async function setupCatalog() {
 const grid=$('#product-grid');if(!grid)return;
 try {
  const products=await dataset('products');
  const render=()=>{
    const query=$('#product-search').value.trim().toLowerCase();const matches=products.filter(p=>`${p.name} ${p.tone} ${p.category}`.toLowerCase().includes(query));
    $('#product-count').textContent=`${matches.length} ${matches.length===1?'product':'products'}${query?' matching your search':''}`;
    grid.innerHTML=matches.length?matches.map(p=>card(p)).join(''):'<div class="empty-state"><h3>No shades found.</h3><p>Try a different shade name or reset your filters.</p><button class="button" id="reset-search">Show all products</button></div>';
    $('#reset-search')?.addEventListener('click',()=>{$('#product-search').value='';render();});
    $$('[data-detail]',grid).forEach(b=>b.addEventListener('click',()=>openDetail(b.dataset.detail,b)));
    $$('a.image-link',grid).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();openDetail(new URL(a.href).searchParams.get('product'),a);}));
  };
  let detailTrigger;
  function openDetail(id,trigger) {
    const p=products.find(p=>p.id===id);if(!p)return;detailTrigger=trigger;
    const detail=$('#product-detail');detail.hidden=false;
    detail.innerHTML=`<button class="close-detail" type="button">Close details</button><div class="detail-visuals"><img src="${escapeHtml(p.modelImage||p.image)}" alt="Model wearing ${escapeHtml(p.name)} lip oil" width="1000" height="1400"><img class="detail-product-thumb" src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)} product visual" width="160" height="160"></div><div><h2 id="detail-name">${escapeHtml(p.name)}</h2><p>${escapeHtml(p.category)} · ${escapeHtml(p.tone)}</p><p>${escapeHtml(p.description)}</p><p class="detail-price">₱${escapeHtml(p.price)} <span>each</span></p><p class="small">${escapeHtml(p.availability)}.</p><button class="button" type="button" data-add-cart="${escapeHtml(p.id)}">Add to cart</button></div>`;
    $('.close-detail',detail).addEventListener('click',()=>{detail.hidden=true;detailTrigger?.focus();});detail.focus({preventScroll:true});detail.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'center'});
  }
  $('#product-search').addEventListener('input',render);render();const initial=new URLSearchParams(location.search).get('product');if(initial)openDetail(initial);
 }catch(e){$('#product-count').textContent='Collection unavailable';errorState(grid,e.message,setupCatalog);}
}
function safeRead(key) {try{return JSON.parse(localStorage.getItem(key)||'[]');}catch{return [];}}
async function submitRecord(kind,record) {
 const response=await fetch(`api/${kind}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(record)}).catch(()=>null);
 if(response?.ok)return response.json();
 if(response && ![404,405,501].includes(response.status)){let value;try{value=await response.json();}catch{}throw new Error(value?.error||'Could not save your form. Please try again.');}
 const key=`ceeries-${kind}`,records=safeRead(key);const id=crypto.randomUUID?.()||`local-${Date.now()}`;records.push({...record,id,createdAt:new Date().toISOString()});
 try {localStorage.setItem(key,JSON.stringify(records));}catch{throw new Error('Browser storage is unavailable. Open the local preview server and try again.');}
 return {id,message:kind==='inquiries'?'Your inquiry was saved in this browser for the class demo. It has not been emailed to CEERIES.':'Your email was saved in this browser for the class demo. No email has been sent.'};
}
function connectForm(formId,statusId,kind) {
 const form=$(formId);if(!form)return;
 form.addEventListener('submit',async e=>{
  e.preventDefault();if(!form.reportValidity())return;const status=$(statusId),button=$('button[type=submit]',form),original=button.innerHTML;
  button.disabled=true;button.textContent='Saving…';status.textContent='Saving your information…';status.classList.remove('error','success');form.setAttribute('aria-busy','true');
  const record=Object.fromEntries(new FormData(form));if(kind==='subscribe')record.consent=$('input[name=consent]',form).checked;
  try {const result=await submitRecord(kind,record);status.textContent=result.message;status.classList.add('success');form.reset();}catch(e){status.textContent=e.message;status.classList.add('error');}
  finally{button.disabled=false;button.innerHTML=original;form.removeAttribute('aria-busy');}
 });
}
const requestedProduct=new URLSearchParams(location.search).get('product');
if(requestedProduct && $('#contact-subject')){$('#contact-subject').value=`Inquiry about ${requestedProduct}`.slice(0,150);$('#contact-message').value=`Hi CEERIES! I would like to know more about ${requestedProduct}. Please share the pricing and availability.`;}
connectForm('#contact-form','#contact-status','inquiries');connectForm('#newsletter-form','#newsletter-status','subscribe');
$('#copy-caption')?.addEventListener('click',async()=>{
 const caption='A little gloss goes a long way. Meet Hydra Slay Lip Oil: mirror-like shine, subtle tint, and non-sticky comfort. Find a shade for every version of you.\n\n#CEERIES #HydraSlay #LipOil #EverydayMakeup';
 try{await navigator.clipboard.writeText(caption);notify('Campaign caption copied.');}catch{notify('Copy is unavailable in this browser. Select and copy the caption above.');}
});
async function loadData() {
 if(!$('#products-table'))return;const status=$('#data-status'),button=$('#refresh-data');button.disabled=true;status.textContent='Retrieving both datasets…';
 try {
  const [products,customers]=await Promise.all([dataset('products',true),dataset('customers',true)]);
  $('#products-table').innerHTML=products.length?products.map(p=>`<tr><td>${escapeHtml(p.name)}</td><td>${escapeHtml(p.category)}</td><td>${escapeHtml(p.tone)}</td><td>₱${escapeHtml(p.price)}</td><td>${escapeHtml(p.availability)}</td></tr>`).join(''):'<tr><td colspan="5">No product records supplied.</td></tr>';
  $('#customers-table').innerHTML=customers.length?customers.map(c=>`<tr><td>${escapeHtml(c.id)}</td><td>${escapeHtml(c.name)}</td><td>${escapeHtml(c.email)}</td><td>${escapeHtml(c.interest)}</td></tr>`).join(''):'<tr><td colspan="4">No demonstration customers supplied.</td></tr>';
  status.textContent=`Retrieved ${products.length} products and ${customers.length} fictional demo customers.`;
 }catch(e){status.textContent=e.message;}finally{button.disabled=false;}
}
$('#refresh-data')?.addEventListener('click',loadData);
setupShades();setupFeatured();setupCatalog();loadData();
if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('reveal-once');observer.unobserve(entry.target);}});},{threshold:.12});$$('.formula-teaser,.shade-story,.campaign-teaser,.benefit-diagram').forEach(el=>observer.observe(el));}

const testimonialSlides=$$('.testimonial-slide');
if(testimonialSlides.length){
 let currentTestimonial=0;
 const showTestimonial=index=>{
  currentTestimonial=Math.max(0,Math.min(index,testimonialSlides.length-1));
  testimonialSlides.forEach((slide,i)=>{slide.hidden=i!==currentTestimonial;slide.classList.remove('reveal-once');if(!slide.hidden)slide.classList.add('reveal-once');});
  $('#testimonial-prev').disabled=currentTestimonial===0;$('#testimonial-next').disabled=currentTestimonial===testimonialSlides.length-1;
  $('#testimonial-position').textContent=`${currentTestimonial+1} of ${testimonialSlides.length}`;
 };
 $('#testimonial-prev').addEventListener('click',()=>showTestimonial(currentTestimonial-1));
 $('#testimonial-next').addEventListener('click',()=>showTestimonial(currentTestimonial+1));
}

// Cart stores shade identifiers and quantities; prices always come from the catalog.
let cartProducts=[];
let cart=[];
function persistCart(){
 try{localStorage.setItem('ceeries-cart',JSON.stringify(cart));return true;}
 catch{notify('Your cart is available for this visit, but browser storage is unavailable.');return false;}
}
function renderCart(){
 const count=cart.reduce((n,item)=>n+item.quantity,0);
 $$('[data-cart-count]').forEach(el=>el.textContent=count);
 const container=$('#cart-content');if(!container)return;
 if(!cart.length){container.innerHTML='<div class="cart-empty"><h3>Your next favorite is waiting.</h3><p>Add a shade from the collection to start your lineup.</p><a class="button" href="#collection">Explore the shades</a></div>';return;}
 const subtotal=cart.reduce((sum,item)=>sum+cartProducts.find(p=>p.id===item.id).price*item.quantity,0);
 container.innerHTML=`<div class="cart-layout"><div class="cart-items">${cart.map(item=>{const p=cartProducts.find(p=>p.id===item.id);return `<article class="cart-row"><img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)} lip oil" width="110" height="110"><div><h3>${escapeHtml(p.name)}</h3><p>${escapeHtml(p.tone)} · ₱${p.price} each</p><div class="quantity-control"><button type="button" data-cart-change="${p.id}" data-delta="-1" aria-label="Decrease ${p.name} quantity" ${item.quantity===1?'disabled':''}>−</button><span aria-label="Quantity">${item.quantity}</span><button type="button" data-cart-change="${p.id}" data-delta="1" aria-label="Increase ${p.name} quantity" ${item.quantity===99?'disabled':''}>+</button></div></div><div class="cart-row-end"><strong>₱${p.price*item.quantity}</strong><button class="text-link" type="button" data-cart-remove="${p.id}" aria-label="Remove ${p.name} from cart">Remove</button></div></article>`;}).join('')}</div><aside class="cart-summary"><h3>Your selection</h3><p><span>${count} ${count===1?'lip oil':'lip oils'}</span><strong>₱${subtotal.toLocaleString('en-PH')}</strong></p><p class="cart-note">Product subtotal. Availability, delivery, and ordering details are confirmed through your inquiry.</p><a class="button" id="cart-inquiry" href="contact.html?cart=1">Continue with my selection</a><p class="cart-note">No payment is taken and no order is placed in this preview.</p></aside></div>`;
}
async function setupCart(){
 try{
  cartProducts=await dataset('products');const saved=safeRead('ceeries-cart');
  const merged=new Map();
  if(Array.isArray(saved))saved.forEach(item=>{if(cartProducts.some(p=>p.id===item?.id)&&Number.isInteger(item.quantity)&&item.quantity>0){merged.set(item.id,Math.min(99,(merged.get(item.id)||0)+item.quantity));}});
  cart=[...merged].map(([id,quantity])=>({id,quantity}));renderCart();
  if(new URLSearchParams(location.search).get('cart')==='1' && $('#contact-subject')){
   $('#contact-subject').value='Inquiry about my CEERIES cart';
   $('#contact-message').value=cart.length?'Hello! I would like to ask about these shades:\n'+cart.map(item=>`${cartProducts.find(p=>p.id===item.id).name} × ${item.quantity} — ₱${199*item.quantity}`).join('\n')+`\nProduct subtotal: ₱${cart.reduce((s,i)=>s+199*i.quantity,0)}. Please confirm availability and delivery details.`:'Hello! I would like to ask about Hydra Slay Lip Oil.';
  }
 }catch(e){if($('#cart-content'))errorState($('#cart-content'),e.message,setupCart);}
}
document.addEventListener('click',async e=>{
 const add=e.target.closest('[data-add-cart]');
 if(add){
  if(!cartProducts.length){notify('The collection is still loading. Please try again.');return;}
  const p=cartProducts.find(p=>p.id===add.dataset.addCart);if(!p)return;
  const existing=cart.find(item=>item.id===p.id);
  if(existing?.quantity===99){notify('You can add up to 99 of each shade.');return;}
  if(existing)existing.quantity++;else cart.push({id:p.id,quantity:1});
  persistCart();renderCart();notify(`${p.name} added to your cart.`);return;
 }
 const change=e.target.closest('[data-cart-change]'),remove=e.target.closest('[data-cart-remove]');
 if(change){const item=cart.find(i=>i.id===change.dataset.cartChange);if(!item)return;item.quantity=Math.max(1,Math.min(99,item.quantity+Number(change.dataset.delta)));persistCart();renderCart();const replacement=$(`[data-cart-change="${item.id}"][data-delta="${change.dataset.delta}"]`);(replacement?.disabled?$(`[data-cart-change="${item.id}"]:not(:disabled)`):replacement)?.focus({preventScroll:true});$('#cart-status').textContent='Cart quantity updated.';}
 if(remove){cart=cart.filter(i=>i.id!==remove.dataset.cartRemove);persistCart();renderCart();($('#cart-content button')||$('#cart-content a'))?.focus({preventScroll:true});$('#cart-status').textContent='Shade removed from your cart.';}
});
window.addEventListener('storage',e=>{if(e.key==='ceeries-cart')setupCart();});
setupCart();
$('#faq-toggle')?.addEventListener('click',()=>{const button=$('#faq-toggle'),open=button.getAttribute('aria-expanded')!=='true';$('#faq-more').hidden=!open;button.setAttribute('aria-expanded',String(open));button.textContent=open?'Show fewer questions':'Show more questions';});
const gallery=$('.model-gallery .gallery-track');
if(gallery){
 const update=()=>{$('#gallery-prev').disabled=gallery.scrollLeft<=1;$('#gallery-next').disabled=gallery.scrollLeft+gallery.clientWidth>=gallery.scrollWidth-2;};
 ['prev','next'].forEach(direction=>$(`#gallery-${direction}`).addEventListener('click',()=>gallery.scrollBy({left:(direction==='next'?1:-1)*gallery.clientWidth*.8,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})));
 gallery.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);update();
}
