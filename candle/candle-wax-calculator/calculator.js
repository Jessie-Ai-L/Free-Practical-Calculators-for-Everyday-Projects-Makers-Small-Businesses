
const f=document.getElementById('wax-form'),e=document.getElementById('form-error');
const i={fill:document.getElementById('fill-weight'),count:document.getElementById('candle-count'),load:document.getElementById('fragrance-load'),extra:document.getElementById('extra-wax')};
const o={purchase:document.getElementById('wax-purchase-result'),pounds:document.getElementById('wax-pounds-result'),wax:document.getElementById('wax-result'),fragrance:document.getElementById('fragrance-result'),batch:document.getElementById('batch-result'),per:document.getElementById('per-candle-result'),rec:document.getElementById('recommendation')};
let latest=null; const n=(x,p=2)=>Number(x.toFixed(p)).toString();
function calc(){const fill=+i.fill.value,count=parseInt(i.count.value),load=+i.load.value,extra=+i.extra.value;
if(![fill,count,load,extra].every(Number.isFinite)||fill<=0||count<=0||load<0||load>30||extra<0||extra>25){e.textContent='Please check your inputs.';return null}
e.textContent='';const base=fill*count,wax=base*(1+extra/100),fr= wax*(load/100),batch=wax+fr,per=fill*(1+load/100);
o.purchase.textContent=n(wax)+' oz';o.pounds.textContent=n(wax/16)+' lb including '+n(extra,1)+'% extra allowance';o.wax.textContent=n(base)+' oz';o.fragrance.textContent=n(fr)+' oz';o.batch.textContent=n(batch)+' oz';o.per.textContent=n(per)+' oz';
o.rec.innerHTML=`Prepare about <strong>${n(wax)} oz (${n(wax/16)} lb) of wax</strong> and <strong>${n(fr)} oz of fragrance oil</strong>.`;return latest={fill,count,load,extra,base,wax,fr,batch,per}}
f.addEventListener('submit',x=>{x.preventDefault();calc()});Object.values(i).forEach(x=>x.addEventListener('input',calc));
document.getElementById('reset-btn').onclick=()=>{i.fill.value=5;i.count.value=12;i.load.value=6;i.extra.value=3;calc()};
document.getElementById('copy-btn').onclick=async()=>{const r=latest||calc();if(!r)return;await navigator.clipboard.writeText(`Candle Wax Calculation\nWax: ${n(r.wax)} oz\nFragrance: ${n(r.fr)} oz\nTotal batch: ${n(r.batch)} oz\n— DayKit`)};
calc();
