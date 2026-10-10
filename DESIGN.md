---
name: CEERIES
description: A photographic beauty moodboard for Hydra Slay Lip Oil.
colors:
  paper: "#fbf4f5"
  blush: "#f1e1e7"
  ink: "#36242e"
  muted: "#6d4e5d"
  rose: "#843553"
  deep: "#522539"
  line: "#d6bfc9"
  white: "#fff9fb"
  focus: "#ad456e"
  error: "#9c2738"
typography:
  display:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "clamp(48px, 6.5vw, 94px)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "clamp(34px, 4vw, 58px)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  title:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "24px"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "13px"
    fontWeight: 600
  emphasis:
    fontFamily: "DM Serif Display, serif"
    fontWeight: 400
rounded:
  field: "8px"
  toast: "12px"
  gallery: "14px"
  menu: "24px"
  control: "30px"
  swatch: "50%"
spacing:
  compact: "12px"
  panel-gap: "18px"
  control-gap: "24px"
  content-gap: "30px"
  section-heading: "40px"
  story-gap: "60px"
  section: "100px"
components:
  button-primary:
    backgroundColor: "{colors.rose}"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    padding: "14px 26px"
  button-primary-hover:
    backgroundColor: "{colors.deep}"
    textColor: "{colors.white}"
  button-light:
    backgroundColor: "{colors.white}"
    textColor: "{colors.deep}"
    rounded: "{rounded.control}"
    padding: "14px 26px"
  button-light-hover:
    backgroundColor: "{colors.blush}"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "12px 14px"
  swatch:
    rounded: "{rounded.swatch}"
    width: "44px"
    height: "44px"
  nav:
    textColor: "{colors.ink}"
    padding: "8px 0"
  faq:
    textColor: "{colors.ink}"
  testimonial:
    backgroundColor: "{colors.blush}"
    textColor: "{colors.ink}"
  cart:
    backgroundColor: "{colors.blush}"
    textColor: "{colors.ink}"
    rounded: "{rounded.gallery}"
    padding: "32px"
  gallery:
    rounded: "{rounded.gallery}"
  card:
    backgroundColor: "{colors.blush}"
    textColor: "{colors.ink}"
---

# Design System: CEERIES

## Overview

**Creative North Star: "The Beauty Editor's Moodboard"**

CEERIES presents supplied model photography and lip-oil imagery as an editorial beauty collection. Blush paper, plum lettering, rose actions, large sans headings, and selective serif emphasis create a warm, expressive world. Photography carries the atmosphere; controls remain clear and compact.

Continuous surfaces and square photographic panels give the pages their structure. Rounded controls soften the interactions without turning the whole interface into cards. This documents the built six-page website, grounded in `assets/styles.css`, `assets/app.js`, and the desktop/mobile review screenshots.

**Key Characteristics:**
- Photographic beauty moodboard.
- Blush surfaces, plum text, rose controls.
- Editorial sans hierarchy with serif emphasis.
- Square image panels and rounded interactive controls.
- Restrained motion with explicit control states.

## Colors

The normative palette above mirrors the CSS custom properties in `assets/styles.css`; `focus` and `error` capture recurring literal state colors.

### Primary
- **Rose**: filled calls to action, prices, text links, form carets, and checkbox accents.
- **Deep Plum**: announcement strip, campaign and shade stories, toast surface, and primary hover state.

### Secondary
- **Blush**: shade-selection panel, newsletter, contact form, product-image backgrounds, and email offers.

### Neutral
- **Blush Paper**: continuous page ground and input surfaces.
- **Plum Ink**: headings, primary text, selected-swatch outline.
- **Muted Plum**: descriptions, metadata, captions, and secondary text.
- **Soft Rose Line**: dividers, input borders, and outlined controls.
- **Warm White**: light controls, text over deep surfaces, social and email previews.

Focus Rose and Error Red distinguish keyboard location and form failure. Product swatch colors come from the product dataset and represent shades, rather than replacing the interface palette.

**The Pigment Rule.** Keep interface rose separate from product shade pigment; selecting a shade updates its visual, name, tone, product-details destination, and announced status together.

## Typography

DM Sans supplies body text, headings, navigation, and labels. DM Serif Display supplies the wordmark and serif emphasis; italic emphasis appears within major headings. Both are locally self-hosted in `assets/fonts/`: DM Sans weights 400, 500, 600, 700 use `font-0.woff2` through `font-3.woff2`; DM Serif Display italic and normal weight 400 use `font-4.woff2` and `font-5.woff2`. The stylesheet uses `font-display: swap` and sans-serif/serif fallbacks.

The frontmatter records the base hierarchy. The home photo headline uses `clamp(52px, 6vw, 88px)`, a 9ch measure, and −0.04em tracking. General paragraphs stop at 65ch; page-intro descriptions stop at 52ch. Wordmark text is 36px with −0.045em tracking and a small 8px sublabel with 0.3em tracking. Buttons and text links are 14px/600; navigation and header actions are 13px. Product-card actions are 13px desktop and 11px mobile. Body text is 16px; mobile about and page-intro descriptions are 14px. Supporting copy retains its original contextual 11–15px scale. Gallery hints and new cart metadata keep their scoped 14–15px sizing.

**The Emphasis Rule.** Preserve the sans heading/serif emphasis relationship; serif fragments provide contrast rather than replacing the reading face.

## Layout

The site uses plain HTML/CSS/JS. Main sections cap at 1600px and use 100px vertical padding with 7% horizontal gutters. The moodboard uses 3% gutters, an 18px gap, and `minmax(0,1.6fr) minmax(300px,1fr)` columns. Its photo is at least 680px tall; the image covers the panel at 50% 35%, with a lower plum gradient supporting white overlay copy. The shade image contains the entire supplied artwork. Product photography uses square aspect ratios and containment, while editorial hero/story photographs use cover and named shade/model gallery artwork uses contain.

Desktop story sections use asymmetric or equal two-column layouts with generous percentage gaps. Barbie and Queen share equal square featured-image frames: two columns with a 40px gap desktop and 24px gap mobile, stacking to one equal-width column at 390px. The about story preserves its original 1.1fr/1fr columns and 10% gap, with the ordinary section padding. A thin two-sided rose-line divider follows it, at 86% width capped to 1376px with 20px vertical padding and 14px text; mobile uses 88% width, 13px text, and stacked text. The product catalog uses four columns; its gap is 50px vertically and 24px horizontally. The header is sticky with a minimum 86px height. Data tables retain a 600px minimum width inside a horizontal scroll wrapper.

Breakpoints are observed media queries, not an invented scale:
- At minimum 1500px: hero height becomes 760px, selection padding grows, shade artwork becomes wider.
- At maximum 1100px: catalog becomes three columns, section padding becomes 75px/6%, header inquiry action hides, hero height becomes 620px.
- At maximum 760px: navigation becomes a menu-controlled vertical list; stories, contact, newsletter, and campaign layouts stack; catalog becomes two columns. Section padding is 65px/6%. The moodboard has one column with 12px gutters/gaps; its photo is at least 580px tall and crops at 50% 25%. The selector internally keeps two columns until the narrow breakpoint. Hero text uses `clamp(48px,12vw,70px)`.
- At maximum 390px: selector, featured collection, and feature facts stack; hero minimum becomes 530px; newsletter input/action stack. Catalog retains two columns with tighter gaps.

## Elevation & Depth

Tonal surfaces and thin dividers establish most hierarchy. The exact shared shadow is `0 14px 36px rgba(85,36,56,.13)` and appears on button hover, toasts, and the email preview. Model-photo gradients support readable copy; they are distinct from control elevation.

**The Quiet Depth Rule.** Preserve the mostly flat paper surface; use the existing shadow for interactive lift and the email specimen rather than adding it to every panel.

## Shapes

Product panels, major stories, and cards retain square corners. Gallery photographs and cart summary/empty panels use 14px corners; cart thumbnails use 12px. Inputs use the field radius; buttons and testimonial controls use the pill-like control radius. Toasts use the toast radius. Swatches are circular 44px controls, with a four-pixel inset blush ring, a pigment dot, and a one-pixel ink outline offset by two pixels when selected. They remain 44px at all breakpoints. Menu and detail-close controls also maintain a 44px minimum height; primary buttons and contact inputs maintain 48px.

## Components

- **Primary and light buttons:** centered text and arrow with a 28px gap; hover lifts 2px over 300ms and changes the surface color. Disabled submission controls become 60% opaque with a waiting cursor and Saving text.
- **Text links:** rose text over a thin rose bottom border, 44px minimum height, and a small diagonal arrow that moves 3px right/up on hover.
- **Navigation:** a rose underline animates for hover and the current page. Mobile Menu/Close menu updates expanded state; Escape closes the menu and returns focus to its control.
- **Swatches:** pressed state is exposed with `aria-pressed`; the selected outline preserves the shade pigment. View [shade] details routes to products.html?product=[id]#collection; active-shade-inquiry remains the legacy element ID.
- **Product cards:** flat square image surfaces, separate title/tone metadata, ₱199 each pricing, View details and Add to cart throughout homepage and catalog cards; cards and inline details omit direct Inquire actions. Homepage featured cards arrange View details/Add to cart in a spaced row with a line border, 18px top margin, 16px top padding, and 16px gap; the cart action uses 12px 22px padding. Hover scales the image to 1.025 over 600ms. Details open in an inline blush panel and return focus to their trigger when closed. The lower catalog action explores the shades in the collection.
- **Social links:** footer, contact information, and campaign email mockup use vertical lists with a scoped 10px gap and 1.6 link line height. Supplied destinations: [Instagram · @ceeries.ph](https://www.instagram.com/ceeries.ph/), [Facebook · Ceeries](https://www.facebook.com/people/Ceeries/61576059574877/), and [TikTok · @riona.di](https://www.tiktok.com/@riona.di). Links open in a new tab with noopener noreferrer. Global typography and spacing remain unchanged.
- **Inputs and forms:** visible labels, muted placeholders, rose carets, native validation, adjacent progress/success/error status. Contact fields use a paper fill and line border; newsletter/search fields use underline treatment. Focus shifts field borders to rose and fills to warm white over 250ms; the search label rises 2px and turns rose. Saved-form status appears with a 22px rose checkmark, a 300ms confirmation entry, and a 380ms checkmark entry.
- **Loading and empty states:** blush-toned skeletons pulse while content loads. Empty results offer Show all products; retrieval errors provide a Retry action. Data tables expose retrieval progress and empty records.
- **Pricing:** the catalog contains seven individual Hydra Slay lip oils at ₱199 each. Rose price emphasis is 18px/600 in the selector and catalog, and 26px/600 in inline details; the unit label is 13px regular muted plum. Search remains available without category filters or a set offering.
- **FAQs:** five concise native details/summary accordions show initially; Show more questions reveals the remaining eight and changes to Show fewer questions. All thirteen retain their accessible expansion behavior, thin dividers, 44px summary targets, and rose markers. Open summaries and hovered summaries turn rose; answer text enters over 280ms with a four-pixel upward offset.
- **Testimonials:** five supplied quotes and attributions appear in a finite manual Previous/Next carousel on blush. One slide is visible; inactive slides are hidden. Position is announced, boundary controls disable at 45% opacity, and changes reuse the 800ms reveal. No autoplay is used. Desktop uses .85fr/1.15fr columns, 8% gap, 19px quote text at 1.7 line height, and a 320px slide minimum; at 760px the layout stacks, quote text becomes 17px, and slide minimum becomes 350px. Controls are outlined 30px-radius pills with 44px minimum height.
- **Pressed and navigation feedback:** primary, header, menu, and enabled testimonial controls move down 1px and scale to .98 on press. Primary/header arrows move 2px right/up on hover. The expanded mobile menu button fills rose; menu links enter over 280ms with 40ms stagger increments.
- **Model galleries:** home and products both show the same seven supplied named shade/model images, using 3:4 containment to preserve their artwork. Home frames use 29% track width and product frames 25%; mobile uses 76% for both. Horizontal snap-scrolling retains 20px desktop gaps, 14px mobile gaps, 14px image corners, and a scroll hint. Home Previous/Next controls are outlined 24px-radius pills, with 16px separation desktop and 12px mobile; edge controls disable. Both galleries stack captions with an 8px gap, 20px top margin, 4px horizontal/8px bottom padding, and 1.5 line height. Shade names are 21px/500; tone and unit price are 14px. Product details show the selected model image with a 100px product thumbnail anchored at bottom right. Gallery scrolling respects reduced motion.
- **Cart:** browser-local selections persist under `ceeries-cart` and synchronize across pages. Quantity controls are 44px square targets bounded to 1–99; disabled limits, tabular numerals, line subtotals, Remove, and a total-count badge make state explicit. The cart uses a 1.5fr/1fr layout with a 40px gap, a blush summary, and dividers between item rows; it stacks on mobile. Empty cart shows a blush panel with Explore the shades. Loading/error states, corrupt-storage recovery, announced updates, and keyboard focus recovery remain available. Continue with my selection routes to Contact and prefills selected shades, quantities, and subtotal; no payment or order is placed. Two Barbie and one Queen produce ₱597.
- **Feedback:** a deep-plum toast appears near the bottom center for copy results, with an accessible message and a 4.5-second lifetime.

All keyboard-focusable controls use a three-pixel Focus Rose outline with five-pixel offset. The skip link becomes visible on focus. The shared easing is `cubic-bezier(.16,1,.3,1)`. Navigation and controls use 300ms transitions, shade imagery uses 250–500ms, product images use 600ms, and one-time section reveals use 800ms. Reduced-motion preference disables all animations and transitions, changes smooth page scrolling to automatic, and prevents reveal observation; product-detail scrolling also respects the preference.

Page continuity uses native cross-document view transitions: `navigation:auto`, a named page-content main surface, and stable site-navigation header. Outgoing content fades and moves up 7px over 180ms; incoming content fades from 15% opacity and moves up 14px over 380ms. The root and navigation group do not animate. Browsers without view-transition-name support receive the CSS main-entry animation and ordinary links; links are never intercepted or delayed. Reduced motion disables native page transitions and all spatial feedback while retaining saved text, selected state, and ordinary navigation. There is no motion library, autoplay, audio, or background animation.

## Do's and Don'ts

### Do:
- Do preserve the local font pairing and selective serif emphasis.
- Do use cover for editorial hero/story photography and contain for product and named shade/model artwork.
- Do keep shade selection and its product-details destination synchronized.
- Do preserve visible focus, 44px swatches, and reduced-motion behavior.
- Do keep mobile story layouts stacked and catalog imagery readable.

### Don't:
- Don't round hero, featured-product, or story panels; retain the gallery's established softened corners.
- Don't add shadows to every product card or paper section.
- Don't replace interface rose with the currently selected shade color.
- Don't hide full product artwork behind a cover crop.
- Don't introduce new product claims through decorative UI copy.






