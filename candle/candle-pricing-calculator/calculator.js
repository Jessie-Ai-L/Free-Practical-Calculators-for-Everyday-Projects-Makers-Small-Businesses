const $=id=>document.getElementById(id);
const fields=['unit-cost','margin','fee-rate','fixed-fee','shipping','wholesale-share'].map($);
let latest=null;

function money(n){return '$'+n.toFixed(2)}
function pct(n){return Number(n.toFixed(1)).toString()+'%'}

function calculate(){
  const cost=+$('unit-cost').value;
  const marginPct=+$('margin').value;
  const feePct=+$('fee-rate').value;
  const fixed=+$('fixed-fee').value;
  const shipping=+$('shipping').value;
  const wholesaleShare=+$('wholesale-share').value;

  if (![cost,marginPct,feePct,fixed,shipping,wholesaleShare].every(Number.isFinite) ||
      cost<0 || fixed<0 || shipping<0 || marginPct<0 || feePct<0 ||
      wholesaleShare<=0 || wholesaleShare>100) {
    $('form-error').textContent='Please check your inputs.';
    return null;
  }

  const margin=marginPct/100, fee=feePct/100;
  const remaining=1-margin-fee;
  if (remaining<=0){
    $('form-error').textContent='Target margin plus percentage selling fees must be less than 100%.';
    return null;
  }

  $('form-error').textContent='';
  const recover=cost+shipping+fixed;
  const price=recover/remaining;
  const percentFee=price*fee;
  const profit=price-cost-shipping-fixed-percentFee;
  const effectiveMargin=price ? profit/price*100 : 0;
  const markup=cost>0 ? profit/cost*100 : 0;
  const wholesale=price*(wholesaleShare/100);
  const wholesaleProfit=wholesale-cost;

  $('retail-price').textContent=money(price);
  $('profit').textContent=money(profit);
  $('effective-margin').textContent=pct(effectiveMargin);
  $('markup').textContent=cost>0?pct(markup):'—';
  $('fees').textContent=money(percentFee+fixed);
  $('wholesale').textContent=money(wholesale);
  $('wholesale-profit').textContent=money(wholesaleProfit);

  $('b-cost').textContent=money(cost);
  $('b-shipping').textContent=money(shipping);
  $('b-fixed').textContent=money(fixed);
  $('b-percent').textContent=money(percentFee);
  $('b-profit').textContent=money(profit);

  $('recommendation').innerHTML=`At a <strong>${pct(marginPct)} target margin</strong> with ${pct(feePct)} percentage selling fees, a ${money(cost)} candle needs a retail price of about <strong>${money(price)}</strong>.`;

  latest={cost,marginPct,feePct,fixed,shipping,wholesaleShare,price,percentFee,profit,effectiveMargin,markup,wholesale,wholesaleProfit};
  return latest;
}

$('pricing-form').addEventListener('submit',e=>{e.preventDefault();calculate()});
fields.forEach(x=>x.addEventListener('input',calculate));

document.querySelectorAll('.preset').forEach(b=>b.addEventListener('click',()=>{
  if(b.dataset.margin!==undefined) $('margin').value=b.dataset.margin;
  if(b.dataset.fee!==undefined) $('fee-rate').value=b.dataset.fee;
  calculate();
}));

$('reset-btn').addEventListener('click',()=>{
  $('unit-cost').value='6.50'; $('margin').value='55'; $('fee-rate').value='0';
  $('fixed-fee').value='0'; $('shipping').value='0'; $('wholesale-share').value='50';
  calculate();
});

$('copy-btn').addEventListener('click',async e=>{
  const r=latest||calculate(); if(!r)return;
  const text=`Candle Pricing Calculation
True cost: ${money(r.cost)}
Target margin: ${pct(r.marginPct)}
Selling fee: ${pct(r.feePct)}
Fixed fee: ${money(r.fixed)}
Absorbed shipping: ${money(r.shipping)}
Recommended retail price: ${money(r.price)}
Profit per candle: ${money(r.profit)}
Effective margin: ${pct(r.effectiveMargin)}
Equivalent markup: ${r.cost>0?pct(r.markup):'N/A'}
Wholesale planning price: ${money(r.wholesale)}
— MakerEstimate`;
  try{await navigator.clipboard.writeText(text);e.currentTarget.textContent='Copied';setTimeout(()=>e.currentTarget.textContent='Copy Results',1300)}
  catch{e.currentTarget.textContent='Copy failed';setTimeout(()=>e.currentTarget.textContent='Copy Results',1300)}
});

calculate();