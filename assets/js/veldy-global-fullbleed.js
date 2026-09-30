(function(){
  var STYLE_ID='veldy-global-fullbleed-style';
  var CLASS='veldy-fullbleed';
  var MARQUEE='veldy-text-marquee';

  function style(){
    var s=document.getElementById(STYLE_ID);
    if(!s){s=document.createElement('style');s.id=STYLE_ID;(document.head||document.documentElement).appendChild(s);}
    s.textContent=
      'html,body{overflow-x:hidden!important}' +
      '.'+CLASS+'{box-sizing:border-box!important;width:100vw!important;max-width:none!important;min-width:100vw!important;position:relative!important;left:50%!important;right:auto!important;margin-left:-50vw!important;margin-right:-50vw!important}' +
      '.'+CLASS+'-parent{overflow:visible!important;max-width:none!important}' +
      '[data-framer-name="Line"].'+CLASS+'{height:1px!important;min-width:100vw!important}' +
      '.'+MARQUEE+'{overflow:hidden!important;justify-content:flex-start!important;gap:0!important}' +
      '.'+MARQUEE+'>.veldy-marquee-track{display:flex!important;flex:none!important;width:max-content!important;min-width:200vw!important;animation:veldyMarquee 32s linear infinite!important;will-change:transform}' +
      '.'+MARQUEE+' .veldy-marquee-group{display:flex!important;flex:none!important;width:100vw!important;min-width:100vw!important;align-items:center!important;justify-content:space-around!important;gap:48px!important}' +
      '.'+MARQUEE+' .veldy-marquee-group>*{flex:none!important}' +
      '@keyframes veldyMarquee{from{transform:translateX(0)}to{transform:translateX(-100vw)}}' +
      '@media(max-width:809px){.'+MARQUEE+'>.veldy-marquee-track{animation-duration:24s!important}.'+MARQUEE+' .veldy-marquee-group{gap:32px!important}}';
  }

  function rgbWhite(v){
    if(!v||v==='transparent'||v==='rgba(0, 0, 0, 0)')return false;
    var m=v.match(/rgba?\((\d+)[, ]+(\d+)[, ]+(\d+)/i);
    return !!m && (+m[1]>=235&&+m[2]>=235&&+m[3]>=235);
  }

  function add(el){
    if(!el||!el.classList)return;
    el.classList.add(CLASS);
    if(el.parentElement)el.parentElement.classList.add(CLASS+'-parent');
  }

  function directTextChildren(el){
    return [].slice.call(el.children||[]).filter(function(ch){
      return ch.matches('[data-framer-component-type="RichTextContainer"]') || ch.querySelector('[data-framer-component-type="RichTextContainer"]');
    });
  }

  function makeMarquee(el){
    if(!el||el.classList.contains(MARQUEE)||el.querySelector('.veldy-marquee-track'))return;
    var kids=directTextChildren(el);
    if(kids.length<4)return;
    if(!rgbWhite(getComputedStyle(el).backgroundColor))return;
    var group=document.createElement('div');group.className='veldy-marquee-group';
    kids.forEach(function(k){group.appendChild(k);});
    var clone=group.cloneNode(true);
    var track=document.createElement('div');track.className='veldy-marquee-track';
    track.appendChild(group);track.appendChild(clone);
    el.appendChild(track);
    el.classList.add(MARQUEE);
    add(el);
  }

  function markNamed(){
    document.querySelectorAll('header,footer,[data-framer-name="Line"]').forEach(add);
    document.querySelectorAll('[data-framer-name]').forEach(function(el){
      var n=(el.getAttribute('data-framer-name')||'').toLowerCase();
      if(/ticker|marquee|scrolling|logo strip|logo ticker|rolling|carousel strip/.test(n))add(el);
    });
  }

  function markBands(){
    var vw=Math.max(document.documentElement.clientWidth||0,window.innerWidth||0);
    if(!vw)return;
    document.querySelectorAll('body *').forEach(function(el){
      if(el.closest('.veldy-marquee-track'))return;
      var r=el.getBoundingClientRect();
      if(!r.width||!r.height||r.height<1||r.height>220)return;
      var cs=getComputedStyle(el);
      var isLine=(el.getAttribute('data-framer-name')||'').toLowerCase()==='line';
      if(isLine){add(el);return;}
      if(!rgbWhite(cs.backgroundColor))return;
      if(r.width<Math.min(vw*.35,420))return;
      var target=el;
      var p=el.parentElement;
      if(p){
        var pr=p.getBoundingClientRect();
        if(pr.height<=260 && Math.abs(pr.width-r.width)<12)target=p;
      }
      add(target);add(el);makeMarquee(el);
    });
  }

  function repair(){style();markNamed();markBands();}
  var queued=false;
  function schedule(){if(queued)return;queued=true;requestAnimationFrame(function(){queued=false;repair();});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',repair);else repair();
  [50,180,500,1000,2000,4000,7000].forEach(function(t){setTimeout(repair,t);});
  window.addEventListener('load',repair);window.addEventListener('resize',schedule);
  try{new MutationObserver(schedule).observe(document.documentElement,{childList:true,subtree:true});}catch(e){}
})();