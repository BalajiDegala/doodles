const fs=require('node:fs'),path=require('node:path');
for(const name of ['quality-101-105.json','quality-106-110.json']){
 const p=path.join(__dirname,name);
 let s=fs.readFileSync(p,'utf8');
 s=s.replaceAll('57-api-server-and-admission','57-api-admission').replaceAll('K delete pod -l app.kubernetes.io/instance=q107-desk --ignore-not-found','K delete pod q107-desk-page-test --ignore-not-found');
 JSON.parse(s); fs.writeFileSync(p,s,'utf8');
}
