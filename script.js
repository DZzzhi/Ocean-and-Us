(function(){
  const tabs=[...document.querySelectorAll('.nav-tab')];
  const pages=[...document.querySelectorAll('.page')];
  const nav=document.getElementById('mainNav');
  const menuToggle=document.getElementById('menuToggle');
  function showTab(id){
    if(!document.getElementById(id)) id='home';
    pages.forEach(p=>p.classList.toggle('active',p.id===id));
    tabs.forEach(t=>{const active=t.dataset.tab===id;t.classList.toggle('active',active);t.setAttribute('aria-current',active?'page':'false')});
    nav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');
    history.replaceState(null,'','#'+id);window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  }
  tabs.forEach(t=>t.addEventListener('click',()=>showTab(t.dataset.tab)));
  document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>showTab(b.dataset.go)));
  menuToggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open))});
  document.getElementById('backTop').addEventListener('click',()=>showTab('home'));
  if(location.hash && document.querySelector(location.hash+'.page')) showTab(location.hash.slice(1));
  const checks=[...document.querySelectorAll('#packingChecklist input')];
  function updateChecklist(){const done=checks.filter(c=>c.checked).length;document.getElementById('checkCount').textContent=done+' of '+checks.length+' completed';document.getElementById('checkPercent').textContent=Math.round(done/checks.length*100)+'%';document.getElementById('checkProgress').style.width=(done/checks.length*100)+'%'}
  checks.forEach(c=>c.addEventListener('change',updateChecklist));
  document.getElementById('resetChecklist').addEventListener('click',()=>{checks.forEach(c=>c.checked=false);updateChecklist()});
  const mass=document.getElementById('massSlider'),height=document.getElementById('heightSlider');
  function updateWork(){const m=Number(mass.value),h=Number(height.value)/100;const w=m*9.81*h;document.getElementById('massValue').textContent=m;document.getElementById('heightValue').textContent=h.toFixed(1);document.getElementById('workValue').textContent=w.toFixed(1)+' J';document.getElementById('workExplanation').textContent='At '+m+' kg lifted '+h.toFixed(1)+' m, the idealized calculation is about '+w.toFixed(1)+' joules of work against gravity.';document.getElementById('workFill').style.width=Math.min(100,w/(12*9.81*1.5)*100)+'%'}
  mass.addEventListener('input',updateWork);height.addEventListener('input',updateWork);updateWork();updateChecklist();
})();
