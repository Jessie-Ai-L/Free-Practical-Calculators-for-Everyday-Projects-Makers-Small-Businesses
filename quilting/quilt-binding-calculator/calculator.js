
const f=document.getElementById('binding-form'),E=document.getElementById('form-error');
const I={w:document.getElementById('quilt-width'),l:document.getElementById('quilt-length'),sw:document.getElementById('strip-width'),fw:document.getElementById('fabric-width'),x:document.getElementById('extra-binding')};
const O={p:document.getElementById('perimeter-result'),b:document.getElementById('binding-result'),s:document.getElementById('strips-result'),y:document.getElementById('yardage-result'),r:document.getElementById('purchase-result'),rec:document.getElementById('recommendation')};
let latest=null;const n=(x,p=2)=>Number(x.toFixed(p)).toString();
const gcd=(a,b)=>b?gcd(b,a%b):a;function frac(v){const e=Math.round(v*8),w=Math.floor(e/8),r=e%8;if(!r)return `${w} yd`;const d=gcd(r,8),a=r/d,b=8/d;return w?`${w} ${a}/${b} yd`:`${a}/${b} yd`}
function calc(){const w=+I.w.value,l=+I.l.value,sw=+I.sw.value,fw=+I.fw.value,x=+I.x.value;if(![w,l,sw,fw,x].every(Number.isFinite)||w<=0||l<=0||sw<=0||fw<=0||x<0){E.textContent='Please check your inputs.';return null}
E.textContent='';const p=2*(w+l),b=p+x,s=Math.ceil(b/fw),y=s*sw/36,r=Math.ceil((y-1e-12)*8)/8;O.p.textContent=n(p)+' in';O.b.textContent=n(b)+' in';O.s.textContent=s+' strips';O.y.textContent=y.toFixed(2)+' yd';O.r.textContent=frac(r);O.rec.innerHTML=`Cut <strong>${s} strips</strong>, each <strong>${n(sw)}" wide</strong>, across your ${n(fw)}" fabric. Buy at least <strong>${frac(r)}</strong>.`;return latest={w,l,sw,fw,x,p,b,s,y,r}}
f.addEventListener('submit',e=>{e.preventDefault();calc()});Object.values(I).forEach(x=>x.addEventListener('input',calc));
document.getElementById('reset-btn').onclick=()=>{I.w.value=70;I.l.value=84;I.sw.value=2.5;I.fw.value=43;I.x.value=10;calc()};
document.getElementById('copy-btn').onclick=async()=>{const r=latest||calc();if(!r)return;await navigator.clipboard.writeText(`Quilt Binding Calculation\n${n(r.w)}" × ${n(r.l)}"\n${r.s} strips\n${n(r.b)}" binding\n${frac(r.r)} fabric\n— DayKit`)};
calc();
