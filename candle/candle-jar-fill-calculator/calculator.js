const $=id=>document.getElementById(id);
let latest=null;
function oz(n){return n/28.349523125}
function fmt(n,p=2){return Number(n.toFixed(p)).toString()}
function calculate(){
  const capacity=+$('capacity').value;
  const unit=$('capacity-unit').value;
  const fill=+$('fill-percent').value/100;
  const density=+$('wax-density').value;
  const fragrance=+$('fragrance-load').value/100;
  const count=+$('jar-count').value;

  if(!(capacity>0&&fill>0&&fill<=1&&density>0&&fragrance>=0&&count>=1)){
    $('form-error').textContent='Please check your inputs.';
    return null;
  }
  $('form-error').textContent='';

  const volumeMl=(unit==='floz'?capacity*29.5735295625:capacity)*fill;
  const waxG=volumeMl*density;
  const fragranceG=waxG*fragrance;
  const finishedG=waxG+fragranceG;

  const waxOz=oz(waxG), fragranceOz=oz(fragranceG), finishedOz=oz(finishedG);
  const totalWaxOz=waxOz*count, totalFragranceOz=fragranceOz*count, totalBatchOz=finishedOz*count;

  $('wax-per-jar').textContent=`${fmt(waxOz)} oz`;
  $('fragrance-per-jar').textContent=`${fmt(fragranceOz)} oz`;
  $('finished-per-jar').textContent=`${fmt(finishedOz)} oz`;
  $('total-wax').textContent=`${fmt(totalWaxOz)} oz`;
  $('total-fragrance').textContent=`${fmt(totalFragranceOz)} oz`;
  $('total-batch').textContent=`${fmt(totalBatchOz)} oz`;
  $('recommendation').innerHTML=`For ${Math.round(count)} jars, prepare about <strong>${fmt(totalWaxOz)} oz of wax</strong> and <strong>${fmt(totalFragranceOz)} oz of fragrance oil</strong>.`;

  latest={capacity,unit,fill,density,fragrance,count,waxG,fragranceG,finishedG,waxOz,fragranceOz,finishedOz,totalWaxOz,totalFragranceOz,totalBatchOz};
  return latest;
}
$('jar-form').addEventListener('submit',e=>{e.preventDefault();calculate()});
document.querySelectorAll('#jar-form input,#jar-form select').forEach(x=>x.addEventListener('input',calculate));
$('reset-btn').addEventListener('click',()=>{
  $('capacity').value=8;$('capacity-unit').value='floz';$('fill-percent').value=90;$('wax-density').value=.90;$('fragrance-load').value=8;$('jar-count').value=12;calculate();
});
$('copy-btn').addEventListener('click',async e=>{
  const r=latest||calculate(); if(!r)return;
  const text=`Candle Jar Fill Calculation
Jar capacity: ${r.capacity} ${r.unit==='floz'?'fl oz':'ml'}
Fill level: ${fmt(r.fill*100,0)}%
Wax density: ${fmt(r.density,2)} g/ml
Fragrance load: ${fmt(r.fragrance*100,1)}%
Jar count: ${Math.round(r.count)}
Wax per jar: ${fmt(r.waxOz)} oz
Fragrance per jar: ${fmt(r.fragranceOz)} oz
Total wax: ${fmt(r.totalWaxOz)} oz
Total fragrance: ${fmt(r.totalFragranceOz)} oz
— MakerEstimate`;
  try{await navigator.clipboard.writeText(text);e.currentTarget.textContent='Copied';setTimeout(()=>e.currentTarget.textContent='Copy Results',1300)}
  catch{e.currentTarget.textContent='Copy failed';setTimeout(()=>e.currentTarget.textContent='Copy Results',1300)}
});
calculate();