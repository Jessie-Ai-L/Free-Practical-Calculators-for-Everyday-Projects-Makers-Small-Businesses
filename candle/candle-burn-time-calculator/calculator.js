const $=id=>document.getElementById(id);
const tabs=document.querySelectorAll('.mode-tab');
tabs.forEach(t=>t.addEventListener('click',()=>{
  tabs.forEach(x=>x.classList.toggle('active',x===t));
  $('test-pane').hidden=t.dataset.mode!=='test';
  $('quick-pane').hidden=t.dataset.mode!=='quick';
  t.dataset.mode==='test'?calcTest():calcQuick();
}));

function fmt(n,p=2){return Number(n.toFixed(p)).toString()}
function show(hours,rate,unit,source){
  $('burn-time').textContent=`${fmt(hours,1)} hours`;
  $('burn-rate').textContent=`${fmt(rate,3)} ${unit}/hr`;
  $('sessions').textContent=`${Math.floor(hours/4)} sessions`;
  const low=Math.floor(hours*.88), high=Math.floor(hours*.94);
  $('label-estimate').textContent=`~${low}–${high} hours`;
  $('recommendation').innerHTML=`Based on ${source}, this candle is estimated to provide about <strong>${fmt(hours,1)} total burn hours</strong>.`;
}
function calcTest(){
  const s=+$('start-weight').value,e=+$('end-weight').value,h=+$('test-hours').value,w=+$('usable-weight').value,u=$('test-unit').value;
  if(!(s>e&&e>=0&&h>0&&w>0)){ $('test-error').textContent='Starting weight must be greater than ending weight, and all other values must be greater than zero.'; return; }
  $('test-error').textContent='';
  const rate=(s-e)/h, hours=w/rate;
  show(hours,rate,u,'your measured burn rate');
}
function calcQuick(){
  const w=+$('quick-wax').value,r=+$('quick-rate').value,u=$('quick-unit').value;
  if(!(w>0&&r>0)){ $('quick-error').textContent='Wax weight and burn rate must be greater than zero.'; return; }
  $('quick-error').textContent='';
  show(w/r,r,u,'the burn rate you entered');
}
$('test-form').addEventListener('submit',e=>{e.preventDefault();calcTest()});
$('quick-form').addEventListener('submit',e=>{e.preventDefault();calcQuick()});
document.querySelectorAll('#test-form input,#test-form select').forEach(x=>x.addEventListener('input',()=>{
  const u=$('test-unit').value; document.querySelectorAll('.unit-label').forEach(n=>n.textContent=u); calcTest();
}));
document.querySelectorAll('#quick-form input,#quick-form select').forEach(x=>x.addEventListener('input',()=>{
  const u=$('quick-unit').value; document.querySelectorAll('.quick-unit-label').forEach(n=>n.textContent=u); $('rate-unit').textContent=u+'/hr'; calcQuick();
}));
calcTest();