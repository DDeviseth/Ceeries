# CEERIES - Hydra Slay Lip Oil

A complete Web Publishing and Digital Advertising student website built with plain HTML, CSS, and JavaScript. A small Node.js server supplies the local API and saves demonstration forms. No dependency installation is required to run the website.

## Open the website

1. Install Node.js 18 or newer if it is not already installed.
2. Open a terminal in this folder.
3. Run `npm start`.
4. Visit `http://127.0.0.1:4173`

The current workspace preview is running at that address. Each HTML file can be edited directly. `tools/build_pages.py` is an optional source-page generator; if used, it overwrites the six HTML files from its templates.

## Included pages

| Page | Contents |
| --- | --- |
| `index.html` | Hero, shade selector, founder/brand story, featured products, five supplied testimonials, formula preview, original promotional video, campaign promotion |
| `features.html` | Hydration, non-sticky comfort, mirror-like shine, subtle tint, visuals, benefit infographic, all 13 supplied FAQs |
| `products.html` | Seven supplied shades at PHP 199 each, search, inline details, product inquiry links |
| `contact.html` | Name, email, subject, message, validation, saved inquiry confirmation, known location and Instagram |
| `campaigns.html` | Social post mockup, copyable caption, campaign strategy, email mockup, original marketing PDF |
| `data.html` | Products and explicitly fictional customer information retrieved and displayed |

## Working interactions

- Shade selection updates image, name, selected state, and inquiry link.
- Catalog search shows matching products and a useful empty state.
- Testimonials have manual Previous/Next controls, and all FAQ answers can be expanded.
- Product details open inline; inquiry links prefill the contact form.
- Contact and newsletter forms validate and save data without sending emails.
- Mobile navigation supports opening, closing, and Escape.
- Original video plays with standard browser controls.
- Motion uses native page-content transitions where supported, a CSS entry fallback, button press/arrow feedback, search and form focus feedback, FAQ answer transitions, a saved-form checkmark, manual testimonial transitions, shade changes, and selective scroll reveals. Links retain ordinary navigation behavior, and reduced-motion settings are honored.
- Local fonts and optimized WebP images minimize external requests.

## Data integration

`GET /api/products` reads `data/products.json`.

`GET /api/customers` reads `data/customers.json`, containing fictional demonstration records only.

`POST /api/inquiries` validates and saves inquiries to `storage/inquiries.jsonl`.

`POST /api/subscribe` validates consent and saves newsletter interest to `storage/subscriptions.jsonl`.

The preview server does not expose stored forms, source tools, or development context. On static hosting, GET requests fall back to the JSON datasets; forms save in the visitor's browser and clearly say so. Static hosting does not create shared submissions or deliver email. A production contact service is a separate deployment decision.

## Facts your group must finish

- Official business email, telephone number, street address, and business hours.
- Current stock and final discount terms/dates. Hydra Slay Lip Oil is confirmed at PHP 199 each.
- Confirm member contributions in `documentation/group-contributions.md`.
- Publish the final website, create the required public GitHub repository, and add their URLs to the documentation.

The original email PDF confirms San Fernando, Pampanga. Supplied campaign artwork includes a 20% promotional offer; the site labels it as a campaign preview rather than configuring a live discount. The site does not claim checkout, payment processing, or message delivery.

## Documentation and assets

`documentation/CEERIES-project-documentation.pdf` contains the requirement mapping, implementation details, verification summary, contribution worksheet, remaining submission tasks, and desktop/mobile screenshots. The contribution worksheet requires your group's actual assignments before final submission.

`documentation/original-email-marketing.pdf` is your supplied email mockup.

`assets/image-provenance.json` records the supplied source of each optimized image. Original assets are preserved in `LippieImages`, `ModelsForCeeries`, `GmailMarketing`, and `Pubmat IG Ad.png`.

The downloadable source archive contains the optimized website assets and documentation, rather than duplicate large original photographs and video files. The original materials stay in this workspace and are excluded from Git by the supplied ignore file.

The source video was converted to browser-friendly H.264/AAC MP4 without changing its content. Fonts are DM Sans and DM Serif Display from Google Fonts, self-hosted under `assets/fonts`; license notices are included there.

## Validation

Six pages were checked at desktop and phone widths for horizontal overflow and missing images. Shade selection, search, product details, contact prefill/saving, newsletter consent/saving, mobile menu, both GET endpoints, invalid-form rejection, private-file boundaries, and video metadata were verified in a browser. See `.impeccable/review/verification.json` for the results.

Run `npm run check` for JavaScript syntax checks. The optional browser verification script in `tools/verify_site.cjs` uses this machine's bundled Playwright runtime.

## Storefront update

Featured product visuals now use equal columns. The original typography, navigation sizing, and section spacing have been restored. The brand story retains its new divider. The homepage includes seven supplied named shade/model photographs; the product gallery shows all seven named shades on lips. Product details pair the model look with the product image. Five concise FAQs show first, with the remaining topics behind Show more questions.

Use Add to cart to save shades, change quantities, remove items, and see the product subtotal at ₱199 each. Inquire about my cart carries the selection into the contact form. This preview does not process payments or place orders. Cart saving is local to the visitor’s browser. Browser checks cover desktop, tablet, and phone widths, cart persistence and totals, gallery navigation, FAQ expansion, and invalid saved-cart recovery.

Social profiles supplied by the user: Instagram https://www.instagram.com/ceeries.ph/, Facebook https://www.facebook.com/people/Ceeries/61576059574877/, and TikTok https://www.tiktok.com/@riona.di. Public product actions focus on details and Add to cart; the saved cart continues to the contact form.
