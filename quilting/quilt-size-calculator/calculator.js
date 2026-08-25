const sizes={baby:[30,40],crib:[36,52],throw:[50,60],twin:[68,88],full:[80,90],queen:[90,90],king:[108,108]};
const $=id=>document.getElementById(id);
function calc(){
 let t=$('type').value;
 if(t!=='custom'){ $('width').value=sizes[t][0]; $('length').value=sizes[t][1];}
 let w=+$('width').value,l=+$('length').value,u=$('unit').value;
 if(u==='cm'){w/=2.54;l/=2.54;}
 $('result').textContent=(w*2.54).toFixed(1)+' × '+(l*2.54).toFixed(1)+' cm';
 if(u==='in') $('result').textContent=w+' × '+l+' in';
 $('area').textContent=((w*l)/144).toFixed(2)+' sq ft';
 $('perimeter').textContent=(2*(w+l))+' in';
 $('backing').textContent=(w+8)+' × '+(l+8)+' in';
}
$('type').onchange=calc;$('unit').onchange=calc;$('calc').onclick=calc;calc();