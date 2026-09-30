(function(){
  var PROJECTS=[
    {title:'DAVINCI CODE',count:'06',category:'Branding Design',href:'work/davinci-code.html',bg:'assets/img/projects/davinci-code-bg.webp',center:'assets/img/projects/davinci-code-center.webp'},
    {title:'PATCHKING',count:'07',category:'Branding Design',href:'work/patchking.html',bg:'assets/img/projects/patchking-bg.webp',center:'assets/img/projects/patchking-center.webp'},
    {title:'SOULJU',count:'08',category:'Branding Design',href:'work/soulju.html',bg:'assets/img/projects/soulju-bg.webp',center:'assets/img/projects/soulju-center.webp'},
    {title:'TEOLJABI',count:'09',category:'Branding Design',href:'work/teoljabi.html',bg:'assets/img/projects/teoljabi-bg.webp',center:'assets/img/projects/teoljabi-center.webp'},
    {title:'BIBIMCHA',count:'10',category:'Branding Design',href:'work/bibimcha.html',bg:'assets/img/projects/bibimcha-bg.webp',center:'assets/img/projects/bibimcha-center.webp'}
  ];
  var DISABLED=['article/hemingway-audio.html','article/soulju.html','article/raven-claw.html','article/essel.html'];

  function ensureStyle(){
    if(document.getElementById('vp-project-fix-style'))return;
    var st=document.createElement('style');st.id='vp-project-fix-style';
    st.textContent=
      'html,body{overflow-x:hidden!important}' +
      'header,footer{width:100vw!important;max-width:none!important;margin-left:calc(50% - 50vw)!important;margin-right:calc(50% - 50vw)!important}' +
      'header [data-framer-name="Line"],footer [data-framer-name="Line"]{width:100vw!important;max-width:none!important;margin-left:calc(50% - 50vw)!important;margin-right:calc(50% - 50vw)!important}' +
      '#vp-home-clones,#vp-work-clones{box-sizing:border-box;width:100%!important;max-width:none!important;min-width:0;display:grid!important;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:24px;row-gap:140px;margin:110px 0 0;padding:0}' +
      '#vp-home-clones>a,#vp-work-clones>a{width:100%!important;max-width:none!important;min-width:0!important;margin:0!important;align-self:start}' +
      '#vp-home-clones>a:nth-child(1),#vp-work-clones>a:nth-child(1){grid-column:1 / span 7}' +
      '#vp-home-clones>a:nth-child(2),#vp-work-clones>a:nth-child(2){grid-column:1 / span 5}' +
      '#vp-home-clones>a:nth-child(3),#vp-work-clones>a:nth-child(3){grid-column:8 / span 5;margin-top:110px!important}' +
      '#vp-home-clones>a:nth-child(4),#vp-work-clones>a:nth-child(4){grid-column:4 / span 6}' +
      '#vp-home-clones>a:nth-child(5),#vp-work-clones>a:nth-child(5){grid-column:8 / span 5}' +
      '#vp-home-clones img,#vp-work-clones img{max-width:100%!important}' +
      '#vp-home-clones [data-framer-name="Image/Video"],#vp-work-clones [data-framer-name="Image/Video"]{overflow:hidden!important}' +
      '#vp-home-clones [data-framer-name="Inner Image"],#vp-work-clones [data-framer-name="Inner Image"]{position:absolute!important;inset:0!important;display:flex!important;align-items:center!important;justify-content:center!important;pointer-events:none!important}' +
      '#vp-home-clones [data-framer-name="Inner Image"] img,#vp-work-clones [data-framer-name="Inner Image"] img{width:46%!important;height:46%!important;object-fit:contain!important}' +
      '@media(max-width:809.98px){#vp-home-clones,#vp-work-clones{grid-template-columns:1fr!important;row-gap:42px!important;margin-top:56px!important}#vp-home-clones>a,#vp-work-clones>a{grid-column:1!important;width:100%!important;margin-top:0!important}#vp-home-clones [data-framer-name="Inner Image"] img,#vp-work-clones [data-framer-name="Inner Image"] img{width:52%!important;height:52%!important}}';
    (document.head||document.documentElement).appendChild(st);
  }

  function setImg(img,src,alt){
    if(!img)return;
    img.removeAttribute('srcset');img.removeAttribute('sizes');
    img.setAttribute('src',src);img.setAttribute('alt',alt||'');
  }

  function fixClone(root,p,prefix){
    prefix=prefix||'';
    var a=root.matches&&root.matches('a[data-framer-name="Project"]')?root:root.querySelector('a[data-framer-name="Project"]');
    if(a)a.setAttribute('href',prefix+p.href);

    root.querySelectorAll('[data-framer-name="Image/Video"] img').forEach(function(img){setImg(img,prefix+p.bg,p.title);});
    root.querySelectorAll('[data-framer-name="Inner Image"] img').forEach(function(img){setImg(img,prefix+p.center,p.title+' detail');});

    root.querySelectorAll('[data-framer-name="Title"] p').forEach(function(n){n.textContent=p.title;});
    root.querySelectorAll('[data-framer-name="Count"] p').forEach(function(n){n.textContent='('+p.count+')';});
    root.querySelectorAll('[data-framer-name="Banner"] [data-framer-name="Text"] p').forEach(function(n){n.textContent=p.category;});
    root.querySelectorAll('[data-framer-appear-id]').forEach(function(n){n.removeAttribute('data-framer-appear-id');n.style.opacity='1';n.style.transform='none';});
    bindHover(root);
    return root;
  }

  function bindHover(root){
    var comps=[].slice.call(root.querySelectorAll('.framer-uxrJc'));
    comps.forEach(function(c){if(!c.dataset.vpBaseClass)c.dataset.vpBaseClass=c.className;});
    root.addEventListener('mouseenter',function(){
      comps.forEach(function(c){
        c.className=(c.dataset.vpBaseClass||c.className).replace(/framer-v-[^\s]+/g,'framer-v-btlrul');
        var ban=c.querySelector('[data-framer-name="Banner"]');
        if(ban){ban.style.opacity='1';ban.style.transform='translateY(-50%)';}
      });
    });
    root.addEventListener('mouseleave',function(){
      comps.forEach(function(c){
        c.className=c.dataset.vpBaseClass||c.className;
        var ban=c.querySelector('[data-framer-name="Banner"]');
        if(ban){ban.style.opacity='0';ban.style.transform='translateY(-50%)';}
      });
    });
  }

  function disableJournal(){
    DISABLED.forEach(function(h){
      document.querySelectorAll('a[href="'+h+'"]').forEach(function(a){a.removeAttribute('href');a.setAttribute('aria-disabled','true');a.style.cursor='default';});
    });
  }

  function buildGallery(crystal,prefix){
    var host=document.createElement('div');
    PROJECTS.forEach(function(p){
      var clone=crystal.cloneNode(true);
      clone.classList.add('vp-added-work');
      fixClone(clone,p,prefix||'');
      host.appendChild(clone);
    });
    return host;
  }

  function injectHome(){
    if(document.getElementById('vp-home-clones'))return;
    var sec=document.querySelector('section[data-framer-name="Work"]');if(!sec)return;
    var cards=sec.querySelector('[data-framer-name="Cards"]');if(!cards)return;
    var crystal=sec.querySelector('a[href="work/crystaloz.html"],a[href$="/work/crystaloz.html"]');
    if(!crystal){
      crystal=[].slice.call(sec.querySelectorAll('a[data-framer-name="Project"]')).filter(function(a){
        return /Crystal\s*OZ/i.test(a.textContent||'');
      })[0];
    }
    if(!crystal)return;
    var host=buildGallery(crystal,'');host.id='vp-home-clones';
    cards.appendChild(host);
  }

  function injectWork(){
    if(document.getElementById('vp-work-clones'))return;
    var sec=document.querySelector('section[data-framer-name="Work"]');if(!sec)return;
    var num=sec.querySelector('[data-framer-name="Number"] h3');if(num)num.textContent='(10)';
    var crystal=sec.querySelector('a[href="work/crystaloz.html"]');if(!crystal)return;
    var column=crystal.parentElement;if(!column)return;
    var host=buildGallery(crystal,'');host.id='vp-work-clones';
    column.appendChild(host);
  }

  function clients(){
    if(window.matchMedia&&window.matchMedia('(max-width:809.98px)').matches){
      var n=document.querySelector('section[data-framer-name="Client"] [data-framer-name="Responsive Heading"] [data-framer-name="Number"] h3');
      if(n)n.textContent='(5)';
      document.querySelectorAll('section[data-framer-name="Client"] .framer-xrlw7a img').forEach(function(img){img.style.transform='scale(1.28)';});
    }
  }

  function run(){
    ensureStyle();
    var path=(location.pathname||'').toLowerCase().replace(/\/+$/,'');
    var file=(path.split('/').pop()||'');
    var isHome=(file===''||file==='index.html'||file==='farmer');
    var isWork=(file==='work.html');
    if(isHome){disableJournal();injectHome();clients();}
    if(isWork)injectWork();
  }

  document.addEventListener('click',function(e){
    var a=e.target&&e.target.closest?e.target.closest('a[href]'):null;if(!a)return;
    var h=a.getAttribute('href')||'';
    if(DISABLED.some(function(x){return h===x||h.endsWith('/'+x)})){e.preventDefault();e.stopImmediatePropagation();}
  },true);

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
  [100,300,700,1400,2600,5000,9000].forEach(function(t){setTimeout(run,t);});
  try{
    new MutationObserver(function(){
      var path=(location.pathname||'').toLowerCase();
      if((path==='/'||/\/index\.html$/.test(path)||/\/farmer\/?$/.test(path))&&!document.getElementById('vp-home-clones'))run();
      if(/\/work\.html$/.test(path)&&!document.getElementById('vp-work-clones'))run();
    }).observe(document.documentElement,{childList:true,subtree:true});
  }catch(e){}
})();