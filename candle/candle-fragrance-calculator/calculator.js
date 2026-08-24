const $=id=>document.getElementById(id);
let latest=null;
function fmt(n,p=2){return Number(n.toFixed(p)).toString()}
function calculate(){
  const wax=+$('wax-weight').value;
  const unit=$('weight-unit').value;
  const load=+$('fragrance-load').value;
  const batches=+$('batches').value;

  if(!(wax>0 && load>=0 && load<100 && batches>=1)){
    $('form-error').textContent='Please check your inputs.';
    return null;
  }
  $('form-error').textContent='';

  const fragrancePerBatch = wax*(load/100);
  const finished = wax + fragrancePerBatch;
  const totalFragrance = fragrancePerBatch*batches;

  $('fragrance-result').textContent=`${fmt(fragrancePerBatch)} ${unit}`;
  $('wax-result').textContent=`${fmt(wax)} ${unit}`;
  $('finished-result').textContent=`${fmt(finished)} ${unit}`;
  $('per-batch-result').textContent=`${fmt(fragrancePerBatch)} ${unit}`;
  $('all-batches-result').textContent=`${fmt(totalFragrance)} ${unit}`;
  $('recommendation').innerHTML=`Add about <strong>${fmt(fragrancePerBatch)} ${unit} of fragrance oil</strong> to ${fmt(wax)} ${unit} of wax at a ${fmt(load,1)}% fragrance load.`;

  latest={wax,unit,load,batches,fragrancePerBatch,finished,totalFragrance};
  return latest;
}
$('fragrance-form').addEventListener('submit',e=>{e.preventDefault();calculate()});
document.querySelectorAll('#fragrance-form input,#fragrance-form select').forEach(x=>x.addEventListener('input',calculate));
$('reset-btn').addEventListener('click',()=>{
  $('wax-weight').value=16;$('weight-unit').value='oz';$('fragrance-load').value=8;$('batches').value=1;calculate();
});
$('copy-btn').addEventListener('click',async e=>{
  const r=latest||calculate(); if(!r)return;
  const text=`Candle Fragrance Calculation
Wax weight: ${fmt(r.wax)} ${r.unit}
Fragrance load: ${fmt(r.load,1)}%
Fragrance per batch: ${fmt(r.fragrancePerBatch)} ${r.unit}
Finished weight per batch: ${fmt(r.finished)} ${r.unit}
Number of batches: ${Math.round(r.batches)}
Total fragrance: ${fmt(r.totalFragrance)} ${r.unit}
— MakerEstimate`;
  try{await navigator.clipboard.writeText(text);e.currentTarget.textContent='Copied';setTimeout(()=>e.currentTarget.textContent='Copy Results',1300)}
  catch{e.currentTarget.textContent='Copy failed';setTimeout(()=>e.currentTarget.textContent='Copy Results',1300)}
});
calculate();