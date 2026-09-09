const fs=require('node:fs'),path=require('node:path');
for(const [from,to] of [['quality-live-results.json','runtime-81-110.json'],['quality-baseline-live-results.json','runtime-47-58.json']]){
 const data=JSON.parse(fs.readFileSync(path.join(__dirname,from),'utf8').replace(/^\uFEFF/,''));
 fs.writeFileSync(path.join(__dirname,'../kubernetes-learning-lab/quality',to),JSON.stringify(data,null,2)+'\n','utf8');
}
