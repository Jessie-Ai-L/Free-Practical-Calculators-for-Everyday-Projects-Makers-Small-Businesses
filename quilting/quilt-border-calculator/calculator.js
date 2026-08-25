const $=id=>document.getElementById(id);
let borders=[2], latest=null;
const fmt=n=>Number(n.toFixed(2)).toString();
const ceilQuarter=n=>Math.ceil((n-1e-9)*4)/4;
const ceilTenth=n=>Math.ceil((n-1e-9)*10)/10;

function renderBorders(){
 const box=$("border-inputs");
 box.innerHTML=borders.map((v,i)=>`<div class="border-row">
 <div class="border-row-head"><h3>Border ${i+1}</h3>${i?`<button type="button" class="remove-border" data-remove="${i}">Remove</button>`:""}</div>
 <div class="field"><label for="border-${i}">Finished Border Width</label><input id="border-${i}" data-border="${i}" type="number" min=".1" step=".1" value="${fmt(v)}"><div class="microcopy">Visible width after sewing.</div></div>
 </div>`).join("");
 document.querySelectorAll("[data-border]").forEach(el=>el.addEventListener("input",e=>{borders[+e.target.dataset.border]=+e.target.value;calculate()}));
 document.querySelectorAll("[data-remove]").forEach(el=>el.addEventListener("click",e=>{borders.splice(+e.currentTarget.dataset.remove,1);renderBorders();calculate()}));
 $("add-border").disabled=borders.length>=4;
}
function calcBorder(curW,curL,finished,seam,fw,corner,unit){
 const cut=finished+2*seam;
 let sideLen=curL, topLen=curW+2*finished;
 if(corner==="mitered"){
   const extra=2*cut;
   sideLen+=extra; topLen+=extra;
 }
 const totalLinear=2*sideLen+2*topLen;
 const strips=Math.ceil(totalLinear/fw);
 const fabricLinear=strips*cut;
 const purchase=unit==="in"?ceilQuarter(fabricLinear/36):ceilTenth(fabricLinear/100);
 return {finished,cut,sideLen,topLen,totalLinear,strips,fabricLinear,purchase,newW:curW+2*finished,newL:curL+2*finished};
}
function calculate(){
 const w=+$("quilt-width").value,l=+$("quilt-length").value,fw=+$("fabric-width").value,seam=+$("seam").value;
 const unit=$("unit").value,corner=$("corner").value;
 if(!(w>0&&l>0&&fw>0&&seam>=0&&borders.length&&borders.every(x=>x>0))){
   $("form-error").textContent="Please enter valid positive measurements for the quilt, fabric width and every border."; return null;
 }
 $("form-error").textContent="";
 let cw=w,cl=l,total=0,totalStrips=0,results=[];
 borders.forEach(b=>{const r=calcBorder(cw,cl,b,seam,fw,corner,unit);results.push(r);total+=r.purchase;totalStrips+=r.strips;cw=r.newW;cl=r.newL});
 const pu=unit==="in"?"yd":"m";
 // Buying each border separately is conservative; total reflects sum of per-border rounded purchase amounts.
 $("total-yardage").textContent=`${fmt(total)} ${pu}`;
 $("corner-result").textContent=corner==="mitered"?"Mitered corners":"Butted / straight corners";
 $("start-size").textContent=`${fmt(w)} × ${fmt(l)} ${unit}`;
 $("finished-size").textContent=`${fmt(cw)} × ${fmt(cl)} ${unit}`;
 $("total-strips").textContent=totalStrips;
 $("border-results").innerHTML=results.map((r,i)=>`<div class="result-border"><h3>Border ${i+1} · ${fmt(r.finished)} ${unit} finished</h3><div class="result-border-grid">
 <div class="mini-result"><span>Cut Width</span><strong>${fmt(r.cut)} ${unit}</strong></div>
 <div class="mini-result"><span>WOF Strips</span><strong>${r.strips}</strong></div>
 <div class="mini-result"><span>Fabric</span><strong>${fmt(r.purchase)} ${pu}</strong></div>
 </div></div>`).join("");
 const lines=results.map((r,i)=>`Border ${i+1}: cut ${r.strips} WOF strips at ${fmt(r.cut)} ${unit} wide. ${corner==="mitered"?"Allow extra strip length for mitered corners.":"Join strips as needed, then fit two side borders and two top/bottom borders."}`);
 $("cut-plan").textContent="CUTTING PLAN\n"+lines.join("\n");
 latest={w,l,fw,seam,unit,corner,cw,cl,total,totalStrips,results,pu};
 return latest;
}
$("border-form").addEventListener("submit",e=>{e.preventDefault();calculate()});
["quilt-width","quilt-length","fabric-width","seam","corner"].forEach(id=>{$(id).addEventListener("input",calculate);$(id).addEventListener("change",calculate)});
$("add-border").addEventListener("click",()=>{if(borders.length<4){borders.push(2);renderBorders();calculate()}});
document.querySelectorAll(".preset-btn").forEach(btn=>btn.addEventListener("click",()=>{$("fabric-width").value=$("unit").value==="in"?btn.dataset.width:fmt(+btn.dataset.width*2.54);calculate()}));
$("unit").addEventListener("change",()=>{
 const to=$("unit").value,f=to==="cm"?2.54:1/2.54;
 ["quilt-width","quilt-length","fabric-width","seam"].forEach(id=>$(id).value=fmt(+$ (id).value*f));
 borders=borders.map(x=>x*f);renderBorders();calculate();
});
$("reset-btn").addEventListener("click",()=>{$("quilt-width").value=60;$("quilt-length").value=80;$("unit").value="in";$("fabric-width").value=42;$("seam").value=.25;$("corner").value="butted";borders=[2];renderBorders();calculate()});
$("copy-btn").addEventListener("click",async e=>{
 const r=latest||calculate(); if(!r)return;
 let text=`Quilt Border Calculation\nStarting quilt: ${fmt(r.w)} × ${fmt(r.l)} ${r.unit}\nFinished quilt: ${fmt(r.cw)} × ${fmt(r.cl)} ${r.unit}\nCorner style: ${r.corner}\nTotal border fabric: ${fmt(r.total)} ${r.pu}\nTotal WOF strips: ${r.totalStrips}\n`;
 r.results.forEach((x,i)=>text+=`Border ${i+1}: ${fmt(x.finished)} ${r.unit} finished, cut ${fmt(x.cut)} ${r.unit}, ${x.strips} strips, ${fmt(x.purchase)} ${r.pu}\n`);
 text+="— MakerEstimate";
 try{await navigator.clipboard.writeText(text);e.currentTarget.textContent="Copied";setTimeout(()=>e.currentTarget.textContent="Copy Results",1300)}
 catch{e.currentTarget.textContent="Copy failed";setTimeout(()=>e.currentTarget.textContent="Copy Results",1300)}
});
renderBorders();calculate();