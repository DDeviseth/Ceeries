const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const root = __dirname;
const port = Number(process.env.PORT || 4173);
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.woff2':'font/woff2','.ttf':'font/ttf','.mov':'video/quicktime','.mp4':'video/mp4','.pdf':'application/pdf'};
const pages = new Set(['index.html','features.html','products.html','contact.html','campaigns.html','data.html']);
const json = (res, code, data) => {res.writeHead(code, {'Content-Type':types['.json'],'Cache-Control':'no-store'}); res.end(JSON.stringify(data));};
let writeQueue = Promise.resolve();
async function saveRecord(kind, value) {
  const record = {id:crypto.randomUUID(),createdAt:new Date().toISOString(),...value};
  const write = writeQueue.then(async()=>{await fs.mkdir(path.join(root,'storage'),{recursive:true}); await fs.appendFile(path.join(root,'storage',kind+'.jsonl'),JSON.stringify(record)+'\n');});
  writeQueue = write.catch(()=>{}); await write; return record.id;
}
async function readBody(req) {
  let body='';
  for await (const chunk of req) {body += chunk; if(Buffer.byteLength(body)>12000) throw Object.assign(new Error('Message is too large.'),{status:413});}
  try {return JSON.parse(body);} catch {throw Object.assign(new Error('Please send valid form data.'),{status:400});}
}
const clean = (v,max=200) => typeof v==='string' ? v.trim().slice(0,max) : '';
const emailValid = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && v.length<=254;
const server=http.createServer(async(req,res)=>{
 try {
  const url=new URL(req.url,'http://localhost');
  res.setHeader('X-Content-Type-Options','nosniff');
  res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');
  if(req.method==='GET' && ['/api/products','/api/customers'].includes(url.pathname)) {
    const file=url.pathname.split('/').pop(); return json(res,200,JSON.parse(await fs.readFile(path.join(root,'data',file+'.json'),'utf8')));
  }
  if(req.method==='POST' && ['/api/inquiries','/api/subscribe'].includes(url.pathname)) {
    const origin=req.headers.origin;
    if(origin && origin!==`http://${req.headers.host}`) return json(res,403,{error:'Please submit this form from the website.'});
    const body=await readBody(req); const email=clean(body.email,254);
    if(!emailValid(email))return json(res,422,{error:'Enter a valid email address.'});
    if(url.pathname==='/api/subscribe') {
      if(body.consent!==true)return json(res,422,{error:'Please agree to save your email for this project.'});
      const id=await saveRecord('subscriptions',{email,consent:true}); return json(res,201,{id,message:'Your email was saved for this project. No email has been sent.'});
    }
    const name=clean(body.name,100),subject=clean(body.subject,150),message=clean(body.message,3000);
    if(name.length<2 || subject.length<3 || message.length<10)return json(res,422,{error:'Enter your name, a subject, and a message of at least 10 characters.'});
    const id=await saveRecord('inquiries',{name,email,subject,message});return json(res,201,{id,message:'Your inquiry was saved to this project. It has not been emailed to CEERIES.'});
  }
  if(req.method!=='GET' && req.method!=='HEAD')return json(res,405,{error:'Method not supported.'});
  let relative;
  try {relative=decodeURIComponent(url.pathname).replace(/^\/+/, '') || 'index.html';} catch {return json(res,400,{error:'Invalid path.'});}
  const file=path.resolve(root,relative);
  const allowed=(pages.has(relative) && path.dirname(file)===root) || file.startsWith(path.join(root,'assets')+path.sep) || ['data/products.json','data/customers.json'].includes(relative) || file.startsWith(path.join(root,'documentation')+path.sep);
  if(!allowed || !file.startsWith(root+path.sep))return json(res,404,{error:'Page not found.'});
  const stat=await fs.stat(file); if(!stat.isFile())return json(res,404,{error:'File not found.'});
  const contentType=types[path.extname(file)] || 'application/octet-stream';
  const headers={'Content-Type':contentType,'Cache-Control':relative.startsWith('assets/')?'public, max-age=3600':'no-cache','Accept-Ranges':'bytes'};
  if(req.headers.range) {
    const m=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
    let start=m && m[1]?Number(m[1]):0, end=m && m[2]?Number(m[2]):stat.size-1;
    if(m && !m[1] && m[2]) {start=Math.max(0,stat.size-Number(m[2]));end=stat.size-1;}
    if(!m || start>end || start>=stat.size){res.writeHead(416,{'Content-Range':`bytes */${stat.size}`});return res.end();}
    end=Math.min(end,stat.size-1);res.writeHead(206,{...headers,'Content-Length':end-start+1,'Content-Range':`bytes ${start}-${end}/${stat.size}`});
    if(req.method==='HEAD')return res.end(); require('node:fs').createReadStream(file,{start,end}).pipe(res);return;
  }
  res.writeHead(200,{...headers,'Content-Length':stat.size});if(req.method==='HEAD')return res.end();require('node:fs').createReadStream(file).pipe(res);
 } catch(error){if(!res.headersSent)json(res,error.status || (error.code==='ENOENT'?404:500),{error:error.status?error.message:'Could not complete the request. Please try again.'});else res.end();}
});
server.listen(port,'127.0.0.1',()=>console.log(`CEERIES preview: http://127.0.0.1:${port}`));
