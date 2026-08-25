const $=id=>document.getElementById(id);
const presets={
 newborn:{label:"Newborn / Small Baby",w:30,l:40,desc:"30 × 40 inches is a practical compact starting point for a newborn or small baby quilt."},
 everyday:{label:"Everyday Baby Quilt",w:36,l:45,desc:"36 × 45 inches is a versatile starting point for an everyday baby quilt."},
 play:{label:"Tummy Time / Play Quilt",w:40,l:40,desc:"40 × 40 inches is a practical square starting point for a play or tummy-time quilt."},
 crib:{label:"Crib-Size Quilt",w:36,l:52,desc:"36 × 52 inches gives a longer crib-style proportion for sewing and size planning."},
 toddler:{label:"Toddler / Grow-With-Baby",w:40,l:50,desc:"40 × 50 inches provides more room for a quilt intended to grow with the child."}
};
let latest=null, lastUnit="in";
const fmt=n=>Number(n.toFixed(2)).toString();

function applyPreset(key){
 if(!presets[key]) return;
 const p=presets[key],unit=$("unit").value,f=unit==="in"?1:2.54;
 $("width").value=fmt(p.w*f);$("length").value=fmt(p.l*f);$("use").value=key;
 document.querySelectorAll(".size-preset").forEach(b=>b.classList.toggle("active",b.dataset.use===key));
 calculate();
}
function calculate(){
 const w=+$("width").value,l=+$("length").value,be=+$("backing-extra").value,bt=+$("batting-extra").value,unit=$("unit").value,use=$("use").value;
 if(!(w>0&&l>0&&be>=0&&bt>=0)){ $("form-error").textContent="Please enter valid positive quilt dimensions and non-negative allowances."; return null; }
 $("form-error").textContent="";
 const win=w*(unit==="in"?1:1/2.54),lin=l*(unit==="in"?1:1/2.54);
 const cmw=win*2.54,cml=lin*2.54;
 const perimeter=2*(w+l);
 const areaSqFt=(win*lin)/144;
 const backingW=w+2*be,backingL=l+2*be,battingW=w+2*bt,battingL=l+2*bt;
 const label=presets[use]?.label || "Custom Size";
 $("size-result").textContent=`${fmt(w)} × ${fmt(l)} ${unit}`;
 $("metric-result").textContent=unit==="in"?`${fmt(cmw)} × ${fmt(cml)} cm`:`${fmt(win)} × ${fmt(lin)} in`;
 $("use-result").textContent=label;
 $("area-result").textContent=unit==="in"?`${fmt(areaSqFt)} sq ft`:`${fmt((w*l)/10000)} m²`;
 $("perimeter-result").textContent=`${fmt(perimeter)} ${unit}`;
 $("backing-result").textContent=`${fmt(backingW)} × ${fmt(backingL)} ${unit}`;
 $("batting-result").textContent=`${fmt(battingW)} × ${fmt(battingL)} ${unit}`;
 $("recommendation").textContent=presets[use]?.desc || "Custom quilt size selected. Use the backing, batting and related planning tools below to continue.";
 latest={w,l,be,bt,unit,use,label,win,lin,cmw,cml,areaSqFt,perimeter,backingW,backingL,battingW,battingL};
 return latest;
}
$("size-form").addEventListener("submit",e=>{e.preventDefault();calculate()});
["width","length","backing-extra","batting-extra"].forEach(id=>$(id).addEventListener("input",()=>{$("use").value="custom";document.querySelectorAll(".size-preset").forEach(b=>b.classList.remove("active"));calculate()}));
$("use").addEventListener("change",()=>{const v=$("use").value;if(v==="custom") calculate(); else applyPreset(v)});
$("unit").addEventListener("change",()=>{
 const newUnit=$("unit").value;
 if(newUnit===lastUnit){calculate();return;}
 const f=newUnit==="cm"?2.54:1/2.54;
 ["width","length","backing-extra","batting-extra"].forEach(id=>$(id).value=fmt(+$ (id).value*f));
 lastUnit=newUnit; calculate();
});
document.querySelectorAll(".size-preset").forEach(btn=>btn.addEventListener("click",()=>applyPreset(btn.dataset.use)));
$("reset-btn").addEventListener("click",()=>{$("unit").value="in";lastUnit="in";$("backing-extra").value=4;$("batting-extra").value=4;applyPreset("newborn")});
$("copy-btn").addEventListener("click",async e=>{
 const r=latest||calculate();if(!r)return;
 const text=`Baby Quilt Size Plan
Use: ${r.label}
Finished size: ${fmt(r.w)} × ${fmt(r.l)} ${r.unit}
Backing size: ${fmt(r.backingW)} × ${fmt(r.backingL)} ${r.unit}
Batting size: ${fmt(r.battingW)} × ${fmt(r.battingL)} ${r.unit}
Perimeter: ${fmt(r.perimeter)} ${r.unit}
— MakerEstimate`;
 try{await navigator.clipboard.writeText(text);e.currentTarget.textContent="Copied";setTimeout(()=>e.currentTarget.textContent="Copy Results",1300)}
 catch{e.currentTarget.textContent="Copy failed";setTimeout(()=>e.currentTarget.textContent="Copy Results",1300)}
});
applyPreset("newborn");