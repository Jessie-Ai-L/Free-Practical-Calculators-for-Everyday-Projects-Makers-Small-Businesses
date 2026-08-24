const $=id=>document.getElementById(id);
const charts={
 CD:[4,6,7,8,10,12,14,16,18,20,22],
 ECO:[1,2,4,6,8,10,12,14,16],
 HTP:[31,41,52,62,73,83,93,104,105,1212],
 LX:[8,10,12,14,16,18,20,22,24,26]
};
let latest=null;
function clamp(n,a,b){return Math.max(a,Math.min(b,n))}
function waxAdj(w){return {soy:.25,'coconut-soy':0,'coconut-apricot':0,paraffin:-.2,beeswax:.35,palm:.15}[w]||0}
function familyLabel(v){return $('wax-type').options[$('wax-type').selectedIndex].text}
function pickSeries(){return $('series').value==='auto'?'CD':$('series').value}
function calcIndex(d,series){
 const arr=charts[series];
 let t=(d-1.5)/.3;
 if(series==='HTP')t=(d-1.5)/.28;
 return clamp(Math.round(t),0,arr.length-1);
}
function calculate(){
 let d=+$('diameter').value; const unit=$('diameter-unit').value; const wax=$('wax-type').value; const load=+$('fragrance-load').value; const dye=$('dye').value; const series=pickSeries();
 if(!(d>0&&load>=0&&load<=15)){ $('form-error').textContent='Please enter a valid diameter and fragrance load.'; return null }
 if(unit==='mm')d/=25.4;
 if(d<1||d>8){$('form-error').textContent='Please enter an inside diameter between 1 and 8 inches (25.4–203.2 mm).';return null}
 $('form-error').textContent='';
 let idx=calcIndex(d,series); let adjustment=waxAdj(wax)+(load>=10?.45:load>=8?.15:load<=4?-.15:0)+(dye==='light'?.2:dye==='heavy'?.45:0);
 idx=clamp(Math.round(idx+adjustment),0,charts[series].length-1);
 let count=d>=5.25?3:d>=4.15?2:1;
 let effective=d/Math.sqrt(count); idx=calcIndex(effective,series); idx=clamp(Math.round(idx+adjustment),0,charts[series].length-1);
 const arr=charts[series], start=arr[idx], smaller=arr[Math.max(0,idx-1)], larger=arr[Math.min(arr.length-1,idx+1)];
 const label=n=>`${series} ${n}`;
 $('primary-wick').textContent=count>1?`${count} × ${label(start)}`:label(start); $('start-wick').textContent=label(start); $('smaller-wick').textContent=label(smaller); $('larger-wick').textContent=label(larger); $('wick-count').textContent=`${count} wick${count>1?'s':''}`; $('diameter-result').textContent=`${d.toFixed(2)} in`; $('wax-result').textContent=`${familyLabel(wax)} · ${load}%`;
 $('primary-sub').textContent=count>1?`Multi-wick starting layout; test spacing and heat carefully`:`Start here, then compare nearby sizes`;
 $('recommendation').innerHTML=count>1?`For this wider vessel, start testing <strong>${count} × ${label(start)}</strong>. Also compare ${label(smaller)} and ${label(larger)} in the same ${count}-wick layout.`:`Start with <strong>${label(start)}</strong>, while also testing <strong>${label(smaller)}</strong> and <strong>${label(larger)}</strong> in otherwise identical candles.`;
 latest={d,unit,wax,load,dye,series,count,start,smaller,larger}; return latest;
}
$('wick-form').addEventListener('submit',e=>{e.preventDefault();calculate()}); document.querySelectorAll('#wick-form input,#wick-form select').forEach(x=>x.addEventListener('input',calculate));
$('reset-btn').addEventListener('click',()=>{$('diameter').value=3;$('diameter-unit').value='in';$('wax-type').value='soy';$('fragrance-load').value=8;$('dye').value='none';$('series').value='auto';calculate()});
$('copy-btn').addEventListener('click',async e=>{const r=latest||calculate();if(!r)return;const text=`Candle Wick Size Estimate\nInside diameter: ${r.d.toFixed(2)} in\nWax: ${familyLabel(r.wax)}\nFragrance load: ${r.load}%\nSeries: ${r.series}\nSuggested wick count: ${r.count}\nTest range: ${r.series} ${r.smaller} / ${r.series} ${r.start} / ${r.series} ${r.larger}\nStart here: ${r.count>1?r.count+' × ':''}${r.series} ${r.start}\nAlways burn-test the finished candle.\n— MakerEstimate`;try{await navigator.clipboard.writeText(text);e.currentTarget.textContent='Copied';setTimeout(()=>e.currentTarget.textContent='Copy Results',1300)}catch{e.currentTarget.textContent='Copy failed';setTimeout(()=>e.currentTarget.textContent='Copy Results',1300)}});calculate();
