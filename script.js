const GAS_WEB_APP_URL = "https://script.google.com/macros/s/REPLACE_WITH_YOUR_ID/exec";
const form = document.getElementById('pledge-form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name=document.getElementById('name').value;
  const email=document.getElementById('email').value;
  const mobile=document.getElementById('mobile').value;
  const state=document.getElementById('state').value;
  const profile=document.getElementById('profile').value;
  const commits=Array.from(document.querySelectorAll('input[name="commit"]:checked')).map(x=>x.value);
  const data={action:'create',name,email,mobile,state,profile,commitments:commits};
  const res=await fetch(GAS_WEB_APP_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
  const json=await res.json();
  if(json.success){alert('Pledge submitted!');loadPledges();}
});
async function loadPledges(){
  const res=await fetch(GAS_WEB_APP_URL+'?action=list');
  const json=await res.json();
  const tbody=document.querySelector('#pledge-table tbody');
  tbody.innerHTML='';
  json.data.reverse().forEach(r=>{
    const tr=document.createElement('tr');
    tr.innerHTML=`<td>${r.id}</td><td>${r.name}</td><td>${r.date}</td><td>${r.state}</td><td>${r.profile}</td><td>${'★'.repeat(r.commitCount)}</td>`;
    tbody.appendChild(tr);
  });
}
window.onload=loadPledges;