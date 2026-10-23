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


// Optional background music. Browsers require a visitor gesture before audio can play.
(function(){
  const toggle=document.getElementById('musicToggle'), mute=document.getElementById('musicMute'), status=document.getElementById('musicStatus'), holder=document.getElementById('musicPlayer'), widget=document.querySelector('.music-widget');
  if(!toggle||!mute||!holder||!widget) return;
  let player=null, apiReady=false, playing=false, muted=false, requestedPlay=false;
  window.onYouTubeIframeAPIReady=function(){apiReady=true;if(requestedPlay) createPlayer(true);};
  function createPlayer(autoplay){
    if(!apiReady){requestedPlay=autoplay;status.textContent='Preparing player…';return;}
    if(player){if(autoplay){player.unMute();player.setVolume(18);player.playVideo();}return;}
    player=new YT.Player(holder,{height:'1',width:'1',videoId:'hbyfofF4ePc',playerVars:{autoplay:autoplay?1:0,controls:0,disablekb:1,playsinline:1,rel:0,start:24},events:{onReady:function(e){e.target.setVolume(18);if(autoplay)e.target.playVideo();},onStateChange:function(e){if(e.data===YT.PlayerState.PLAYING){playing=true;toggle.textContent='Ⅱ Pause';toggle.setAttribute('aria-pressed','true');mute.disabled=false;status.textContent=muted?'Playing · muted':'Playing softly';widget.classList.add('is-playing');}else if(e.data===YT.PlayerState.PAUSED||e.data===YT.PlayerState.ENDED){playing=false;toggle.textContent='▶ Play';toggle.setAttribute('aria-pressed','false');status.textContent='Music is paused';widget.classList.remove('is-playing');}else if(e.data===YT.PlayerState.UNSTARTED){status.textContent='Ready to play';}}}});
  }
  toggle.addEventListener('click',function(){if(!apiReady){requestedPlay=true;status.textContent='Loading YouTube player…';return;}if(!player){createPlayer(true);return;}if(playing){player.pauseVideo();}else{player.unMute();player.setVolume(18);muted=false;mute.textContent='Mute';mute.setAttribute('aria-pressed','false');player.playVideo();}});
  mute.addEventListener('click',function(){if(!player)return;muted=!muted;if(muted){player.mute();mute.textContent='Unmute';status.textContent='Playing · muted';}else{player.unMute();player.setVolume(18);mute.textContent='Mute';status.textContent='Playing softly';}mute.setAttribute('aria-pressed',String(muted));});
})();
