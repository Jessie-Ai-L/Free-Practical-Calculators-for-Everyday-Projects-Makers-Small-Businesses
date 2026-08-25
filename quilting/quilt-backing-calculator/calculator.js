const $=id=>document.getElementById(id);
let latest=null;
const ceilQuarter=n=>Math.ceil((n-1e-9)*4)/4;
const ceilTenth=n=>Math.ceil((n-1e-9)*10)/10;
const fmt=n=>Number(n.toFixed(2)).toString();

function plan(span, cut, fw, unit){
  const panels=Math.max(1,Math.ceil(span/fw));
  const linear=panels*cut;
  const purchase=unit==="in" ? ceilQuarter(linear/36) : ceilTenth(linear/100);
  return {panels,seams:Math.max(0,panels-1),linear,purchase,cut};
}
function calculate(){
  const w=+$("quilt-width").value,l=+$("quilt-length").value,o=+$("overage").value,fw=+$("fabric-width").value;
  const unit=$("unit").value,pref=$("layout").value;
  if(!(w>0&&l>0&&o>=0&&fw>0)){ $("form-error").textContent="Please enter valid positive measurements."; return null; }
  $("form-error").textContent="";
  const bw=w+2*o, bl=l+2*o;
  const vertical=plan(bw,bl,fw,unit);
  const horizontal=plan(bl,bw,fw,unit);
  let chosen,orientation;
  if(pref==="vertical"){chosen=vertical;orientation="Vertical";}
  else if(pref==="horizontal"){chosen=horizontal;orientation="Horizontal";}
  else if(vertical.purchase<=horizontal.purchase){chosen=vertical;orientation="Vertical";}
  else {chosen=horizontal;orientation="Horizontal";}

  const purchaseUnit=unit==="in"?"yd":"m";
  $("buy-result").textContent=`${fmt(chosen.purchase)} ${purchaseUnit}`;
  $("layout-result").textContent=chosen.panels===1?"Single panel":`${orientation} seams`;
  $("size-result").textContent=`${fmt(bw)} × ${fmt(bl)} ${unit}`;
  $("panels-result").textContent=chosen.panels;
  $("seams-result").textContent=chosen.seams;
  $("cut-result").textContent=`${fmt(chosen.cut)} ${unit} long`;

  let wording;
  if(chosen.panels===1) wording=`Cut 1 panel ${fmt(chosen.cut)} ${unit} long. No backing seam is required.`;
  else if(orientation==="Vertical") wording=`Cut ${chosen.panels} panels, each ${fmt(chosen.cut)} ${unit} long, then join them side by side.`;
  else wording=`Cut ${chosen.panels} panels, each ${fmt(chosen.cut)} ${unit} long, then stack and join them across the quilt.`;
  $("cut-plan").textContent=wording;

  $("vertical-detail").textContent=`${vertical.panels} panel${vertical.panels!==1?"s":""} · ${fmt(vertical.purchase)} ${purchaseUnit} · cut ${fmt(vertical.cut)} ${unit} each`;
  $("horizontal-detail").textContent=`${horizontal.panels} panel${horizontal.panels!==1?"s":""} · ${fmt(horizontal.purchase)} ${purchaseUnit} · cut ${fmt(horizontal.cut)} ${unit} each`;
  $("vertical-card").classList.toggle("best",orientation==="Vertical");
  $("horizontal-card").classList.toggle("best",orientation==="Horizontal");

  latest={w,l,o,fw,unit,bw,bl,vertical,horizontal,chosen,orientation,purchaseUnit,wording};
  return latest;
}
$("backing-form").addEventListener("submit",e=>{e.preventDefault();calculate()});
document.querySelectorAll("#backing-form input,#backing-form select").forEach(el=>{el.addEventListener("input",calculate);el.addEventListener("change",calculate)});
document.querySelectorAll(".preset-btn").forEach(btn=>btn.addEventListener("click",()=>{
  if($("unit").value==="in") $("fabric-width").value=btn.dataset.width;
  else $("fabric-width").value=fmt(+btn.dataset.width*2.54);
  calculate();
}));
$("unit").addEventListener("change",()=>{
  const to=$("unit").value;
  const factor=to==="cm"?2.54:1/2.54;
  ["quilt-width","quilt-length","overage","fabric-width"].forEach(id=>$(id).value=fmt(+$ (id).value*factor));
  calculate();
});
$("reset-btn").addEventListener("click",()=>{
  $("quilt-width").value=60;$("quilt-length").value=80;$("unit").value="in";$("overage").value=4;$("fabric-width").value=42;$("layout").value="auto";calculate();
});
$("copy-btn").addEventListener("click",async e=>{
  const r=latest||calculate(); if(!r)return;
  const text=`Quilt Backing Calculation
Quilt top: ${fmt(r.w)} × ${fmt(r.l)} ${r.unit}
Backing size: ${fmt(r.bw)} × ${fmt(r.bl)} ${r.unit}
Recommended: ${fmt(r.chosen.purchase)} ${r.purchaseUnit}
Layout: ${r.chosen.panels===1?"Single panel":r.orientation+" seams"}
Panels: ${r.chosen.panels}
Seams: ${r.chosen.seams}
Cut: ${r.wording}
— MakerEstimate`;
  try{await navigator.clipboard.writeText(text);e.currentTarget.textContent="Copied";setTimeout(()=>e.currentTarget.textContent="Copy Results",1300)}
  catch{e.currentTarget.textContent="Copy failed";setTimeout(()=>e.currentTarget.textContent="Copy Results",1300)}
});
calculate();