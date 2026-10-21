import fs from 'node:fs';import assert from 'node:assert/strict';import {createRequire,stripTypeScriptTypes} from 'node:module';
const require=createRequire(import.meta.resolve('wrangler'));const {Miniflare,convertV4MiniflareOptions}=require('miniflare');
// Local workerd predates the unchanged production compatibility date.
const mf=new Miniflare(convertV4MiniflareOptions({name:'billabong-test',modules:true,script:stripTypeScriptTypes(fs.readFileSync('src/worker.ts','utf8')),compatibilityDate:'2026-08-11',assets:{directory:'dist',binding:'ASSETS',run_worker_first:true,routerConfig:{has_user_worker:true,invoke_user_worker_ahead_of_assets:true},assetConfig:{not_found_handling:'404-page'}}}));
try{
 for(const path of ['/404','/404/','/404.html','/unknown-review-path/'])for(const method of ['GET','HEAD']){
  const r=await mf.dispatchFetch('https://angelspoolbali.com'+path+'?q=a%2Fb&x=1&x=2',{method,redirect:'manual'});assert.equal(r.status,404,path);assert.match(r.headers.get('X-Robots-Tag'),/noindex/);assert.equal(r.headers.get('Location'),null);assert.equal(method==='HEAD'?(await r.text())==='':/noindex/.test(await r.text()),true);
 }
 let extraUrl='https://angelspoolbali.com/404.html/';let extra;
 for(let hop=0;hop<4;hop++){extra=await mf.dispatchFetch(extraUrl,{redirect:'manual'});if(extra.status<300||extra.status>=400)break;extraUrl=new URL(extra.headers.get('Location'),extraUrl).href;assert.equal(new URL(extraUrl).origin,'https://angelspoolbali.com');}
 assert.equal(extra.status,404);assert.match(extra.headers.get('X-Robots-Tag'),/noindex/);await extra.arrayBuffer();
 for(const path of ['/','/en/','/privacy/','/en/privacy/','/cookie/','/en/cookie/','/terms/','/en/terms/','/js/consent.js','/images/billabong.webp']){const r=await mf.dispatchFetch('https://angelspoolbali.com'+path,{redirect:'manual'});assert.equal(r.status,200,path);assert.equal(r.headers.get('X-Robots-Tag'),null);assert(r.headers.get('Content-Security-Policy'));await r.arrayBuffer();}
 for(const host of ['http://angelspoolbali.com','https://www.angelspoolbali.com']){const r=await mf.dispatchFetch(host+'/404.html?q=a%2Fb&x=1&x=2',{redirect:'manual'});assert.equal(r.status,301);assert.equal(r.headers.get('Location'),'https://angelspoolbali.com/404.html?q=a%2Fb&x=1&x=2');}
 console.log('PASS unchanged actual local Worker+Assets: audited error aliases and unknown GET/HEAD404/noindex; extra /404.html/ final404; eight localized pages/current script/photo200; existing canonical priority/path/query/security headers. Local compatibility2026-08-11 only, production config unchanged.');
}finally{await mf.dispose();}
