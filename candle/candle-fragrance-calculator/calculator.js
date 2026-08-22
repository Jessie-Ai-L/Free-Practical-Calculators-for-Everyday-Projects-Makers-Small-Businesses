
const f=document.getElementById('fragrance-form'),e=document.getElementById('form-error');
const i={wax:document.getElementById('wax-weight'),unit:document.getElementById('unit'),load:document.getElementById('fragrance-load'),batches:document.getElementById('batch-count')};
const o={fr:document.getElementById('fragrance-result'),sub:document.getElementById('fragrance-sub'),wax:document.getElementById('wax-total-result'),fin:document.getElementById('finished-result'),per:document.getElementById('per-batch-result'),rec:document.getElementById('recommendation')};
let latest=null;const n=(x,p=2)=>Number(x.toFixed(p)).toString();
function calc(){const wax=+i.wax.value,load=+i.load.value,b=parseInt(i.batches.value),u=i.unit.value;if(![wax,load,b].every(Number.isFinite)||wax<=0||b<=0||load<0||load>30){e.textContent='Please check your inputs.';return null}
e.textContent='';const tw=wax*b,fr=tw*load/100,per=wax*load/100,fin=tw+fr;o.fr.textContent=n(fr)+' '+u;o.sub.textContent=`For ${n(tw)} ${u} of wax at a ${n(load,1)}% load`;o.wax.textContent=n(tw)+' '+u;o.fin.textContent=n(fin)+' '+u;o.per.textContent=n(per)+' '+u;o.rec.innerHTML=`Weigh <strong>${n(fr)} ${u} of fragrance oil</strong>.`;return latest={tw,fr,fin,per,u,load}}
f.addEventListener('submit',x=>{x.preventDefault();calc()});Object.values(i).forEach(x=>{x.addEventListener('input',calc);x.addEventListener('change',calc)});
document.getElementById('reset-btn').onclick=()=>{i.wax.value=16;i.unit.value='oz';i.load.value=8;i.batches.value=1;calc()};
document.getElementById('copy-btn').onclick=async()=>{const r=latest||calc();if(!r)return;await navigator.clipboard.writeText(`Candle Fragrance Calculation\nWax: ${n(r.tw)} ${r.u}\nFragrance: ${n(r.fr)} ${r.u}\n— DayKit`)};
calc();
