const fs=require('node:fs'),path=require('node:path'),{spawnSync}=require('node:child_process');
const root=path.resolve(__dirname,'../kubernetes-learning-lab');
const high=[0x20ac,0x81,0x201a,0x192,0x201e,0x2026,0x2020,0x2021,0x2c6,0x2030,0x160,0x2039,0x152,0x8d,0x17d,0x8f,0x90,0x2018,0x2019,0x201c,0x201d,0x2022,0x2013,0x2014,0x2dc,0x2122,0x161,0x203a,0x153,0x9d,0x17e,0x178];
const decoder={decode:b=>Array.from(b,v=>String.fromCodePoint(v>=128&&v<=159?high[v-128]:v)).join('')};
let repaired=0;
for(const chapter of ['05-bookshop-platform','06-bookshop-reliability']){
 for(const folder of fs.readdirSync(path.join(root,chapter,'topics'))){
  const n=Number(folder.split('-')[0]);
  const rel='kubernetes-learning-lab/'+chapter+'/topics/'+folder+'/lesson.md';
  const r=spawnSync('git',['-c','safe.directory=F:/ops2book','show','6dd6a67:'+rel],{encoding:'utf8',windowsHide:true});
  if(r.status!==0)throw Error(r.stderr);
  const committed=r.stdout.replaceAll('\r\n','\n');
  const current=fs.readFileSync(path.resolve(__dirname,'..',rel),'utf8').replace(/^\uFEFF/,'').replaceAll('\r\n','\n').replace(/^# \d+\. /,'# ').trimEnd();
  const mojibake=decoder.decode(Buffer.from(committed,'utf8')).trimEnd();
  if(current!==committed.trimEnd()&&current!==mojibake){const i=[...current].findIndex((c,j)=>c!==mojibake[j]);console.log({current:current.slice(i-30,i+60),expected:mojibake.slice(i-30,i+60),codeCurrent:[...current.slice(i,i+6)].map(c=>c.codePointAt(0)),codeExpected:[...mojibake.slice(i,i+6)].map(c=>c.codePointAt(0))});throw Error('Additional edit requires review: '+rel);}
  const next=committed.replace(/^# /,'# '+n+'. ').trimEnd()+'\n';
  fs.writeFileSync(path.resolve(__dirname,'..',rel),next,'utf8');repaired++;
  if(n>=41){
   for(const file of ['manifest-guide.md','runbook.md']){
    const p=path.join(root,chapter,'topics',folder,file);
    let s=fs.readFileSync(p,'utf8').replace(/^\uFEFF/,'');
    if(!/^# \d+\. /.test(s))s=s.replace(/^# /,'# '+n+'. ');
    fs.writeFileSync(p,s,'utf8');
   }
  }
 }
}
console.log('Restored committed UTF-8 prose and retained numbering in',repaired,'lessons.');
