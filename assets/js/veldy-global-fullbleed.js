(function(){
  var STYLE_ID='veldy-global-fullbleed-style';
  var CLASS='veldy-fullbleed';

  function style(){
    var s=document.getElementById(STYLE_ID);
    if(!s){s=document.createElement('style');s.id=STYLE_ID;(document.head||document.documentElement).appendChild(s);}
    s.textContent=
      'html,body{overflow-x:hidden!important}' +
      '.'+CLASS+'{box-sizing:border-box!important;width:100vw!important;max-width:none!important;margin-left:calc(50% - 50vw)!important;margin-right:calc(50% - 50vw)!important}' +
      'header.'+CLASS+',footer.'+CLASS+'{left:auto!important;right:auto!important}' +
      '[data-framer-name="Line"].'+CLASS+'{min-width:100vw!important}' +
      '@supports(width:100dvw){.'+CLASS+'{width:100dvw!important;margin-left:calc(50% - 50dvw)!important;margin-right:calc(50% - 50dvw)!important}[data-framer-name="Line"].'+CLASS+'{min-width:100dvw!important}}';
  }

  function rgbWhite(v){
    if(!v||v==='transparent'||v==='rgba(0, 0, 0, 0)')return false;
    var m=v.match(/rgba?\((\d+)[, ]+(\d+)[, ]+(\d+)/i);
    if(!m)return false;
    return (+m[1]>=235&&+m[2]>=235&&+m[3]>=235);
  }

  function add(el){
    if(!el||!el.classList)return;
    el.classList.add(CLASS);
  }

  function markNamed(){
    document.querySelectorAll('header,footer,[data-framer-name="Line"]').forEach(add);
    document.querySelectorAll('[data-framer-name]').forEach(function(el){
      var n=(el.getAttribute('data-framer-name')||'').toLowerCase();
      if(/ticker|marquee|scrolling|logo strip|logo ticker|rolling|carousel strip/.test(n)) add(el);
    });
  }

  function markHorizontalBands(){
    var vw=Math.max(document.documentElement.clientWidth||0,window.innerWidth||0);
    if(!vw)return;
    document.querySelectorAll('body *').forEach(function(el){
      if(el.classList&&el.classList.contains(CLASS))return;
      var r=el.getBoundingClientRect();
      if(!r.width||!r.height)return;
      if(r.width<Math.min(vw*.45,520))return;
      if(r.width>=vw-4)return;
      if(r.height>220||r.height<2)return;
      var cs=getComputedStyle(el);
      var white=rgbWhite(cs.backgroundColor);
      var animated=(cs.animationName&&cs.animationName!=='none')||(cs.animationDuration&&cs.animationDuration!=='0s');
      var nowrap=cs.whiteSpace==='nowrap';
      var overflowX=cs.overflowX==='hidden'||cs.overflowX==='scroll'||cs.overflowX==='auto';
      var hasMany=el.children&&el.children.length>=3;
      if(white || (animated&&overflowX) || (nowrap&&overflowX&&hasMany)) add(el);
    });
  }

  function repair(){
    style();
    markNamed();
    markHorizontalBands();
  }

  var queued=false;
  function schedule(){
    if(queued)return;queued=true;
    requestAnimationFrame(function(){queued=false;repair();});
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',repair);else repair();
  [120,400,900,1800,3500,6500].forEach(function(t){setTimeout(repair,t);});
  window.addEventListener('load',repair);
  window.addEventListener('resize',schedule);
  try{new MutationObserver(schedule).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['style','class']});}catch(e){}
})();