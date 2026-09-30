(function(){
  var STYLE_ID='veldy-global-fullbleed-style';
  var FULL='veldy-section-fullbleed';
  var STRIP='veldy-section-strip';
  var TICKER='veldy-section-logo-ticker';

  function style(){
    var s=document.getElementById(STYLE_ID);
    if(!s){s=document.createElement('style');s.id=STYLE_ID;(document.head||document.documentElement).appendChild(s);}
    s.textContent=
      'html,body{overflow-x:hidden!important}' +
      '.'+FULL+'{box-sizing:border-box!important;width:100vw!important;max-width:none!important;min-width:100vw!important;position:relative!important;left:50%!important;right:auto!important;margin-left:-50vw!important;margin-right:-50vw!important}' +
      '.'+FULL+'-parent{overflow:visible!important}' +
      '[data-framer-name="Line"].'+FULL+'{min-width:100vw!important}' +
      '.'+STRIP+'{overflow:hidden!important;justify-content:flex-start!important;gap:0!important}' +
      '.'+STRIP+'>.veldy-strip-track{display:flex!important;flex:none!important;width:max-content!important;animation:veldyStripMove 34s linear infinite!important;will-change:transform}' +
      '.'+STRIP+' .veldy-strip-group{display:flex!important;flex:none!important;width:100vw!important;min-width:100vw!important;align-items:center!important;justify-content:space-around!important;gap:48px!important}' +
      '.'+STRIP+' .veldy-strip-group>*{flex:none!important}' +
      '@keyframes veldyStripMove{from{transform:translateX(0)}to{transform:translateX(-100vw)}}' +
      '@media(max-width:809px){.'+STRIP+'>.veldy-strip-track{animation-duration:26s!important}.'+STRIP+' .veldy-strip-group{gap:32px!important}}';
  }

  function rgbWhite(v){
    if(!v||v==='transparent'||v==='rgba(0, 0, 0, 0)')return false;
    var m=v.match(/rgba?\((\d+)[, ]+(\d+)[, ]+(\d+)/i);
    return !!m && (+m[1]>=235&&+m[2]>=235&&+m[3]>=235);
  }

  function add(el){
    if(!el||!el.classList)return;
    el.classList.add(FULL);
    if(el.parentElement)el.parentElement.classList.add(FULL+'-parent');
  }

  function interactiveAncestorBeforeSection(el){
    var p=el.parentElement;
    while(p && p.tagName!=='SECTION' && p.tagName!=='BODY'){
      if(p.tagName==='A' || p.hasAttribute('data-framer-cursor'))return true;
      p=p.parentElement;
    }
    return false;
  }

  function richDirect(el){
    return [].slice.call(el.children||[]).filter(function(ch){
      return ch.matches('[data-framer-component-type="RichTextContainer"]');
    });
  }

  function makeTextStrip(el){
    if(!el||el.classList.contains(STRIP)||el.querySelector('.veldy-strip-track'))return;
    var kids=richDirect(el);
    if(kids.length<4)return;
    var group=document.createElement('div');group.className='veldy-strip-group';
    kids.forEach(function(k){group.appendChild(k);});
    var clone=group.cloneNode(true);
    var track=document.createElement('div');track.className='veldy-strip-track';
    track.appendChild(group);track.appendChild(clone);
    el.appendChild(track);
    el.classList.add(STRIP);
  }

  function markTextStrips(){
    var vw=Math.max(document.documentElement.clientWidth||0,window.innerWidth||0);
    document.querySelectorAll('body *').forEach(function(el){
      if(el.closest('.veldy-strip-track'))return;
      var r=el.getBoundingClientRect();
      if(!r.width||!r.height||r.height<12||r.height>90)return;
      if(r.width<Math.min(vw*.45,480))return;
      if(!rgbWhite(getComputedStyle(el).backgroundColor))return;
      if(el.querySelectorAll('img').length>0)return;
      var kids=richDirect(el);
      if(kids.length<4||kids.length>8)return;
      add(el);makeTextStrip(el);
    });
  }

  function markLogoTickers(){
    var vw=Math.max(document.documentElement.clientWidth||0,window.innerWidth||0);
    document.querySelectorAll('body *').forEach(function(el){
      if(el.classList.contains(TICKER))return;
      var r=el.getBoundingClientRect();
      if(!r.width||!r.height||r.height<45||r.height>190)return;
      if(r.width<Math.min(vw*.6,650))return;
      if(!rgbWhite(getComputedStyle(el).backgroundColor))return;
      if(el.querySelectorAll('img').length<5)return;
      add(el);el.classList.add(TICKER);
    });
  }

  function markSectionLines(){
    var vw=Math.max(document.documentElement.clientWidth||0,window.innerWidth||0);
    document.querySelectorAll('[data-framer-name="Line"]').forEach(function(el){
      var r=el.getBoundingClientRect();
      if(!r.width||r.width<Math.min(vw*.48,520)||r.height>3)return;
      if(interactiveAncestorBeforeSection(el))return;
      add(el);
    });
  }

  function repair(){
    style();
    document.querySelectorAll('header,footer').forEach(add);
    markSectionLines();
    markTextStrips();
    markLogoTickers();
  }

  var queued=false;
  function schedule(){if(queued)return;queued=true;requestAnimationFrame(function(){queued=false;repair();});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',repair);else repair();
  [60,220,600,1200,2500,5000].forEach(function(t){setTimeout(repair,t);});
  window.addEventListener('load',repair);
  window.addEventListener('resize',schedule);
  try{new MutationObserver(schedule).observe(document.documentElement,{childList:true,subtree:true});}catch(e){}
})();