
const ids=['wax-cost','fragrance-cost','vessel-cost','wick-cost','label-cost','packaging-cost','other-cost'];
function money(x){return '$'+x.toFixed(2)}
function calc(){const parts=ids.map(id=>+document.getElementById(id).value),batch=+document.getElementById('batch-size').value,labor=+document.getElementById('labor-cost').value,over=+document.getElementById('overhead-cost').value,mp=+document.getElementById('target-margin').value;const mat=parts.reduce((a,b)=>a+b,0),lo=(labor+over)/batch,unit=mat+lo,total=unit*batch,price=unit/(1-mp/100),profit=price-unit;
document.getElementById('unit-cost').textContent=money(unit);document.getElementById('material').textContent=money(mat);document.getElementById('lo').textContent=money(lo);document.getElementById('batch-cost').textContent=money(total);document.getElementById('price').textContent=money(price);document.getElementById('profit').textContent=money(profit);}
document.getElementById('cost-form').addEventListener('submit',e=>{e.preventDefault();calc()});[...document.querySelectorAll('#cost-form input')].forEach(x=>x.addEventListener('input',calc));calc();
