
const f=document.getElementById('wax-form'),E=document.getElementById('form-error');
function n(x,p=2){return Number(x.toFixed(p)).toString()}
function calc(){const fill=+document.getElementById('fill-weight').value,count=+document.getElementById('candle-count').value,load=+document.getElementById('fragrance-load').value,extra=+document.getElementById('extra-wax').value;
if(fill<=0||count<=0||load<0||extra<0){E.textContent='Please check your inputs.';return}
E.textContent='';const base=fill*count,wax=base*(1+extra/100),fr=wax*(load/100),batch=wax+fr;
document.getElementById('wax-purchase-result').textContent=n(wax)+' oz';document.getElementById('wax-result').textContent=n(base)+' oz';document.getElementById('fragrance-result').textContent=n(fr)+' oz';document.getElementById('batch-result').textContent=n(batch)+' oz';document.getElementById('recommendation').innerHTML=`Prepare about <strong>${n(wax)} oz of wax</strong> and <strong>${n(fr)} oz of fragrance oil</strong>.`;}
f.addEventListener('submit',e=>{e.preventDefault();calc()});[...f.querySelectorAll('input')].forEach(x=>x.addEventListener('input',calc));calc();
