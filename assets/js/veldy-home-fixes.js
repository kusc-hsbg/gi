(function(){
  function ensureStyle(){
    var st=document.getElementById('veldy-home-fixes-style');
    if(!st){st=document.createElement('style');st.id='veldy-home-fixes-style';(document.head||document.documentElement).appendChild(st);}
    st.textContent=
      'html,body{overflow-x:hidden!important}' +
      'section[data-framer-name="Testimonial"],section[data-framer-name="Testimonial"] .framer-1y8re1e{overflow:visible!important}' +
      'section[data-framer-name="Testimonial"] .framer-1yqd1cr{position:sticky!important;position:-webkit-sticky!important;top:0!important;height:100vh!important;z-index:1!important;align-self:stretch!important}' +
      'section[data-framer-name="Testimonial"] .framer-1ci02mx{position:relative!important;z-index:2!important}' +
      'section[data-framer-name="Client"],section[data-framer-name="Client"] .framer-aw0pws{overflow:visible!important}' +
      'section[data-framer-name="Client"] .framer-aw0pws{position:relative!important;min-height:2100px!important}' +
      'section[data-framer-name="Client"] .framer-uhiquf{position:sticky!important;position:-webkit-sticky!important;top:0!important;height:100vh!important;z-index:2!important}' +
      '.framer-1th58uk{position:relative!important;top:auto!important;inset:auto!important;z-index:auto!important}' +
      '.framer-l8tp04,.framer-hrs0gc,.framer-1ue40ad,.framer-bngqg2,.framer-1snsm42,.framer-1oqrrs3{width:100vw!important;max-width:none!important;position:relative!important;left:50%!important;margin-left:-50vw!important;margin-right:-50vw!important}' +
      '.framer-dlgb9u-container{width:100vw!important;max-width:none!important;position:relative!important;left:50%!important;margin-left:-50vw!important;margin-right:-50vw!important}' +
      '.framer-dlgb9u-container>.framer-YOzNv{width:100%!important;max-width:none!important}' +
      '@media(max-width:809.98px){section[data-framer-name="Client"] .framer-aw0pws{min-height:1500px!important}section[data-framer-name="Testimonial"] .framer-1yqd1cr,section[data-framer-name="Client"] .framer-uhiquf{height:100svh!important}}';
  }

  function repair(){
    ensureStyle();
    var soul=document.querySelector('.framer-1th58uk');
    if(soul){soul.style.setProperty('position','relative','important');soul.style.setProperty('top','auto','important');}
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',repair);else repair();
  [100,400,900,1800,3500].forEach(function(t){setTimeout(repair,t);});
  window.addEventListener('resize',repair);
})();