# CEERIES — Hydra Slay Lip Oil

Web Publishing and Digital Advertising final project built with HTML, CSS, and JavaScript. Hydra Slay Lip Oil comes in seven shades at ₱199 each.

## Project links

- Website: https://sites-ceeries.vercel.app/
- Public repository: https://github.com/DDeviseth/Ceeries
- Final documentation: [CEERIES project documentation](documentation/CEERIES-project-documentation.pdf)

## Run locally

1. Install Node.js 18 or newer.
2. Open this folder in VS Code and open its terminal.
3. Run `npm start`.
4. Open http://127.0.0.1:4173 in your browser.

No external packages are required. Use the local server or the hosted website so the product and customer data can load correctly.

## Website pages

| File | Contents |
| --- | --- |
| `index.html` | Brand introduction, shade selector, featured products, model gallery, testimonials, and promotional video |
| `features.html` | Hydration, non-sticky formula, mirror-like shine, subtle tint, and expandable FAQs |
| `products.html` | Seven shades, product search, details, model gallery, and Add to cart |
| `contact.html` | Contact information, social links, and a validated inquiry form |
| `campaigns.html` | Social media and email campaign mockups |
| `data.html` | Product and fictional customer datasets |

## Main features

- Responsive layouts and mobile navigation.
- Product details and named shade/model photographs.
- Cart quantities, item removal, and subtotals at ₱199 per item.
- Cart persistence in the visitor’s browser and selection transfer to the contact form.
- Gallery and testimonial navigation, expandable FAQs, and product search.
- Page transitions and interaction animations with reduced-motion support.
- Contact and newsletter form validation.

The cart is a classroom demonstration; it does not process payments or place orders. Campaign offers are promotional mockups rather than live discounts.

## API and data integration

When running `npm start`, the Node.js server provides:

| Endpoint | Purpose |
| --- | --- |
| `GET /api/products` | Retrieves `data/products.json` |
| `GET /api/customers` | Retrieves `data/customers.json`, containing fictional demonstration records |
| `POST /api/inquiries` | Validates and saves inquiries locally to `storage/inquiries.jsonl` |
| `POST /api/subscribe` | Validates and saves newsletter interest locally to `storage/subscriptions.jsonl` |

On static Vercel hosting, the website loads the JSON datasets directly when API requests are unavailable. Forms save in the visitor’s browser instead of the local server. They do not email CEERIES or create shared online submissions. The customer dataset is separate from saved inquiries.

## Source files and documentation

- Six HTML files contain the website pages.
- `assets/` contains website CSS, JavaScript, images, video, fonts, and license notices.
- `data/` contains the website datasets.
- `server.cjs` and `package.json` support the local server and API demonstration.
- `documentation/CEERIES-project-documentation.pdf` is the group’s final reviewed and formatted paper.
- `documentation/original-email-marketing.pdf` contains the supplied email campaign mockup.

Development configuration, generators, and testing tools are optional and are not required to run the submitted website.

## Group members

Kenaz Brian Yanez, Almer Lalic, Sean Yambao, and Benedict Ong. Member contributions are documented in the final paper.

## Social profiles

- Instagram: https://www.instagram.com/ceeries.ph/
- Facebook: https://www.facebook.com/people/Ceeries/61576059574877/
- TikTok: https://www.tiktok.com/@riona.di

## Basic validation

Run `npm run check` to check the syntax of the server and website JavaScript.
