
const f=document.getElementById('fr-form'),E=document.getElementById('form-error');
function n(x,p=2){return Number(x.toFixed(p)).toString()}
function calc(){const wax=+document.getElementById('wax-weight').value,load=+document.getElementById('fragrance-load').value,b=+document.getElementById('batch-count').value,u=document.getElementById('unit').value;if(wax<=0||b<=0||load<0){E.textContent='Please check your inputs.';return}
E.textContent='';const tw=wax*b,fr=tw*load/100,fin=tw+fr;document.getElementById('fr-result').textContent=n(fr)+' '+u;document.getElementById('wax-total').textContent=n(tw)+' '+u;document.getElementById('finished').textContent=n(fin)+' '+u;document.getElementById('recommendation').innerHTML=`Weigh <strong>${n(fr)} ${u} of fragrance oil</strong>.`;}
f.addEventListener('submit',e=>{e.preventDefault();calc()});[...f.querySelectorAll('input,select')].forEach(x=>x.addEventListener('input',calc));calc();
