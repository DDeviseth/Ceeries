from pathlib import Path
from PIL import Image as PILImage
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.utils import ImageReader
from reportlab.lib.pagesizes import A4
import textwrap,json

pdfmetrics.registerFont(TTFont('DM','assets/fonts/font-0.woff2'))
pdfmetrics.registerFont(TTFont('DM-Bold','assets/fonts/font-3.woff2'))
pdfmetrics.registerFont(TTFont('DM-Serif','assets/fonts/font-5.woff2'))
output=Path('documentation/CEERIES-project-documentation.pdf')
doc=canvas.Canvas(str(output),pagesize=A4)
doc.setTitle('CEERIES - Final Project Documentation')
doc.setAuthor('CEERIES project group')
W,H=A4; ink=HexColor('#36242e'); muted=HexColor('#6d4e5d'); rose=HexColor('#843553'); line=HexColor('#d6bfc9'); paper=HexColor('#fbf4f5')
page_number=0
def start(title,subtitle=''):
    global page_number
    page_number+=1
    doc.setFillColor(paper);doc.rect(0,0,W,H,fill=1,stroke=0)
    doc.setFillColor(rose);doc.setFont('DM-Serif',23);doc.drawString(42,H-48,'CEERIES')
    doc.setFont('DM',9);doc.drawRightString(W-42,H-43,'WEB PUBLISHING & DIGITAL ADVERTISING')
    doc.setStrokeColor(line);doc.line(42,H-66,W-42,H-66)
    doc.setFillColor(ink);doc.setFont('DM-Bold',27);doc.drawString(42,H-110,title)
    if subtitle:doc.setFillColor(muted);doc.setFont('DM',11);doc.drawString(42,H-135,subtitle)
    return H-170
def paragraph(text,y,size=11,width=79):
    doc.setFillColor(muted);doc.setFont('DM',size)
    for row in textwrap.wrap(text,width=width,break_long_words=False,break_on_hyphens=False):doc.drawString(42,y,row);y-=size*1.55
    return y-12
def heading(text,y):
    doc.setFillColor(rose);doc.setFont('DM-Bold',14);doc.drawString(42,y,text);return y-25
def end():
    doc.setStrokeColor(line);doc.line(42,44,W-42,44);doc.setFillColor(muted);doc.setFont('DM',8);doc.drawString(42,29,'CEERIES - Hydra Slay Lip Oil | Student project');doc.drawRightString(W-42,29,str(page_number));doc.showPage()
def image(path,x,y,w,h):
    img=PILImage.open(path);ratio=min(w/img.width,h/img.height);iw,ih=img.width*ratio,img.height*ratio
    doc.drawImage(ImageReader(img),x,y+h-ih,width=iw,height=ih)

y=start('A little gloss. A complete website.','Final project documentation | 08 October 2026')
image('assets/images/brand-banner.webp',42,y-200,W-84,180);y-=230
y=heading('Project overview',y)
y=paragraph('CEERIES Hydra Slay Lip Oil is presented through a complete marketing website with product discovery, the founder story, supplied testimonials, formula storytelling, contact inquiries, social media promotion, an email mockup, and data integration.',y)
y=heading('Audience and confirmed benefits',y)
y=paragraph('Audience: teenagers, college students, young professionals, and beauty enthusiasts interested in trendy lip products, everyday makeup, and stylish beauty essentials.',y)
y=paragraph('Confirmed benefits: ultra-hydrating, non-sticky formula; mirror-like shine; subtle tint; soft, nourished lips. The lip oil catalog includes seven individual shades at PHP 199 each. Sets have been removed.',y)
y=heading('Website approach',y)
y=paragraph('Plain HTML, CSS, and JavaScript, with a small Node.js local API. The selected beauty moodboard direction uses real supplied product/model photography, a blush and rose palette, interactive shade selection, and responsive page layouts.',y)
end()
y=start('Requirement coverage','Website and integrated digital marketing components')
requirements=[('Home / landing page','Company identity, main photograph, tagline, CTA, about section, featured products, campaign promotion, and the original 41.6-second promotional film.'),('Feature Page','Hydration, non-sticky comfort, mirror-like shine, subtle tint, product visuals, a benefit infographic, and all 13 supplied frequently asked questions.'),('Products / services','Seven supplied lip oil shades at PHP 199 each, with names, images, descriptions, categories, inquiry-based availability, details, and search.'),('Contact Us','Name, email, subject, and message fields with validation and save confirmation. Known location and Instagram are shown. Unconfirmed operating details are explicitly marked.'),('Social marketing','A named product-discovery campaign, target audience, goal, Instagram-style post mockup, supplied promotional art, hashtags, copyable caption, and product CTA.'),('Email marketing','Viewable promotional email mockup including brand, subject, banner, short message, offer preview, CTA, website/contact/social links, and the supplied original PDF.'),('API / data','GET operations retrieve products and fictional customer information. Both datasets are displayed on the Project Data page. Forms use validated POST operations locally.')]
for title,body in requirements:y=heading(title,y);y=paragraph(body,y,size=10,width=90)
end()
y=start('Functionality and verification','What works in the local preview')
items=['Shade selection updates the image, product name, active state, and inquiry target. Galleries show the supplied models and named on-lips looks.','Product search shows matching results and a resettable empty state. All seven shades cost PHP 199 each.','Inline details open and close; inquiry links prefill the contact form.','Contact and newsletter forms validate input and save demonstration records. Newsletter saving requires consent.','Mobile navigation responds to Escape. Page transitions, button presses, focus feedback, FAQ reveals, and saved-form checkmarks provide motion cues. Reduced-motion preferences are respected.','The original promotional video loads with controls. Optimized images and self-hosted fonts avoid external asset requests.','Product and fictional-customer GET endpoints return data. Invalid forms are rejected. Private submissions and development files are not served.']
for item in items:y=paragraph('- '+item,y,size=11,width=79)
y=heading('Browser checks',y)
y=paragraph('All six pages passed at 1440 x 1000 desktop and 390 x 844 phone viewports, with no horizontal overflow, broken images, browser script errors, or missing public assets. Core interactions and video metadata were verified automatically.',y)
y=heading('Demonstration boundaries',y)
y=paragraph('Forms do not send email or place orders. Local-server submissions save into private storage files; static-hosted forms save in the visitor browser. The customer dataset is explicitly fictional and does not expose form submissions.',y)
y=paragraph('Supplied campaign materials contain a 20% discount. The website presents this as a marketing preview; live dates, pricing, and offer terms have not been configured.',y)
end()
y=start('Brand story and customer voices','Supplied FAQs and testimonial content')
y=heading('CEERIES lifestyle brand',y)
y=paragraph('CEERIES is a Filipino lifestyle brand founded by Riona Karl Cee, offering stylish, practical, and affordable everyday pieces especially for girls. The brand collection includes bags, Hydra Slay Lip Oil, and scrunchies. Website listings currently focus on the seven supplied lip oil shades.',y)
y=heading('Frequently asked questions',y)
y=paragraph('The Formula page presents five concise key FAQs first, with Show more questions revealing all 13 supplied topics, covering the founder, product categories, audience, Philippines-based brand, ordering guidance, affordability, everyday use, seven shades, shade selection, contact, brand differences, values, and quality promise.',y)
y=heading('Customer testimonials',y)
y=paragraph('The homepage includes five supplied testimonials with manual Previous and Next controls. Attributions are Sofia M., 20; Alyssa R., 21; Mika D., 19; Camille T., 22; and Nicole P., 20. User-provided wording is preserved without emojis or invented verification badges.',y)
y=heading('Pricing and scope update',y)
y=paragraph('Hydra Slay Lip Oil is PHP 199 each. The lip oil set, set filter, set inquiry promotion, and set data record were removed. Featured products show Barbie and Queen in equally sized image frames. The homepage has a seven-photo named shade gallery; the product page shows seven supplied named shade looks. A browser-saved cart supports adding shades, quantities, removal, PHP 199 unit-price totals, and an inquiry handoff. No payments or orders are processed. Prices appear in the homepage selector, product cards, inline details, and product data table.',y)
end()
y=start('Complete before submission','Group contributions and outstanding business details')
y=heading('Group contribution worksheet',y)
y=paragraph('The supplied email-marketing document lists the following members. Their actual assignments must be confirmed by the group; no contribution roles have been invented.',y)
for name in ['Almer Lalic','Benedict Ong','Sean Yambao','Kenaz Yanez']:
    doc.setFillColor(rose);doc.setFont('DM-Bold',12);doc.drawString(42,y,name)
    doc.setFillColor(muted);doc.setFont('DM',10);doc.drawString(190,y,'Contribution: ______________________________')
    y-=42
y=heading('Business facts still needed',y)
y=paragraph('Official email, phone, street address, business hours, current availability, and final promotional dates/terms. Lip oil prices are confirmed at PHP 199 each. San Fernando, Pampanga and @ceeries.ph are supported by the supplied assets.',y)
y=heading('Submission links',y)
y=paragraph('Hosted website URL: ______________________________________________',y)
y=paragraph('Public GitHub repository URL: _____________________________________',y)
y=paragraph('The source website is ready for local review. Public hosting and repository publication have not been performed. Update this documentation after adding the missing details and contribution assignments.',y)
end()
labels={'index':'Home','features':'The Formula / Feature Page','products':'Products','contact':'Contact Us','campaigns':'Social and Email Campaigns','data':'API / Data Integration'}
for name,label in labels.items():
    y=start(label,'Verified desktop and phone screenshots')
    image(f'.impeccable/review/screenshots/{name}-desktop-viewport.png',42,390,W-84,280)
    image(f'.impeccable/review/screenshots/{name}-mobile-viewport.png',42,80,145,290)
    doc.setFillColor(rose);doc.setFont('DM-Bold',13);doc.drawString(218,350,'Responsive page capture')
    doc.setFont('DM',10);doc.setFillColor(muted)
    for i,row in enumerate(textwrap.wrap('Desktop: 1440 x 1000 pixels. Phone: 390 x 844 pixels. Full-page screenshots are included separately for detailed inspection.',width=43)):doc.drawString(218,322-i*17,row)
    end()
doc.save()
print(output)
