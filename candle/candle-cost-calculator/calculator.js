
const ids=['wax-cost','fragrance-cost','vessel-cost','wick-cost','label-cost','packaging-cost','other-cost','batch-size','labor-cost','overhead-cost','target-margin'];
const I=Object.fromEntries(ids.map(x=>[x,document.getElementById(x)])),E=document.getElementById('form-error');
const O={unit:document.getElementById('unit-cost-result'),mat:document.getElementById('material-result'),lo:document.getElementById('labor-overhead-result'),batch:document.getElementById('batch-cost-result'),price:document.getElementById('price-result'),profit:document.getElementById('profit-result'),rec:document.getElementById('recommendation')};
let latest=null;const m=x=>'$'+x.toFixed(2),v=x=>+I[x].value;
function calc(){const parts=['wax-cost','fragrance-cost','vessel-cost','wick-cost','label-cost','packaging-cost','other-cost'].map(v),batch=parseInt(I['batch-size'].value),labor=v('labor-cost'),over=v('overhead-cost'),mp=v('target-margin');
if(![...parts,batch,labor,over,mp].every(Number.isFinite)||parts.some(x=>x<0)||labor<0||over<0||batch<=0||mp<0||mp>=100){E.textContent='Please check your inputs.';return null}
E.textContent='';const mat=parts.reduce((a,b)=>a+b,0),lo=(labor+over)/batch,unit=mat+lo,total=unit*batch,price=unit/(1-mp/100),profit=price-unit;
O.unit.textContent=m(unit);O.mat.textContent=m(mat);O.lo.textContent=m(lo);O.batch.textContent=m(total);O.price.textContent=m(price);O.profit.textContent=m(profit);O.rec.innerHTML=`Your true cost is <strong>${m(unit)} per candle</strong>. At a <strong>${mp.toFixed(0)}% target margin</strong>, a suggested price is <strong>${m(price)}</strong>.`;return latest={mat,lo,unit,total,price,profit,batch,mp}}
document.getElementById('cost-form').addEventListener('submit',x=>{x.preventDefault();calc()});Object.values(I).forEach(x=>x.addEventListener('input',calc));
document.getElementById('reset-btn').onclick=()=>{const d={'wax-cost':1.2,'fragrance-cost':.85,'vessel-cost':1.5,'wick-cost':.18,'label-cost':.22,'packaging-cost':.55,'other-cost':.2,'batch-size':12,'labor-cost':18,'overhead-cost':6,'target-margin':50};Object.entries(d).forEach(([k,val])=>I[k].value=val);calc()};
document.getElementById('copy-btn').onclick=async()=>{const r=latest||calc();if(!r)return;await navigator.clipboard.writeText(`Candle Cost Calculation\nTrue cost: ${m(r.unit)}\nBatch cost: ${m(r.total)}\nSuggested price: ${m(r.price)}\n— DayKit`)};
calc();
