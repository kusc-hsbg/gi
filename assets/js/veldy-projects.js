(function(){
  var PROJECTS=[
    {title:'PATCHKING',count:'06',category:'Branding Design',href:'work/patchking.html',img:'assets/img/projects/patchking.svg'},
    {title:'TEOLJABI',count:'07',category:'Branding Design',href:'work/teoljabi.html',img:'assets/img/projects/teoljabi.svg'},
    {title:'SOULJU',count:'08',category:'Branding Design',href:'work/soulju.html',img:'assets/img/projects/soulju.svg'},
    {title:'BIBIMCHA',count:'09',category:'Branding Design',href:'work/bibimcha.html',img:'assets/img/projects/bibimcha.svg'},
    {title:'DAVINCI CODE',count:'10',category:'Branding Design',href:'work/davinci-code.html',img:'assets/img/projects/davinci-code.svg'}
  ];
  var DISABLED=['article/hemingway-audio.html','article/soulju.html','article/raven-claw.html','article/essel.html'];

  function ensureStyle(){
    if(document.getElementById('veldy-projects-style'))return;
    var s=document.createElement('style');s.id='veldy-projects-style';
    s.textContent=
      '.vp-added-grid{width:100%;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:64px 24px;padding:58px 0 0;box-sizing:border-box}' +
      '.vp-project-card{display:block;color:#fff;text-decoration:none;min-width:0;font-family:"Inter Display","Inter Display Placeholder",Arial,sans-serif}' +
      '.vp-project-media{position:relative;width:100%;aspect-ratio:1.16/1;overflow:hidden;border-radius:10px;background:#080b13}' +
      '.vp-project-bg,.vp-project-inner{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;transition:filter .35s ease,transform .45s cubic-bezier(.2,.7,.2,1),opacity .35s ease}' +
      '.vp-project-bg{filter:brightness(.78);transform:scale(1.02)}' +
      '.vp-project-inner{inset:18% 22%;width:56%;height:64%;border-radius:8px;filter:none;transform:scale(1);box-shadow:0 20px 50px rgba(0,0,0,.18)}' +
      '.vp-project-banner{position:absolute;z-index:4;left:0;right:0;top:50%;height:34px;transform:translateY(-50%) scaleY(0);transform-origin:center;background:#fff;color:#000;display:flex;align-items:center;justify-content:center;font-size:13px;line-height:1;font-weight:500;transition:transform .28s cubic-bezier(.2,.7,.2,1)}' +
      '.vp-project-view{position:absolute;z-index:5;left:50%;top:50%;transform:translate(-50%,-50%) scale(.92);opacity:0;border:1px solid rgba(255,255,255,.8);border-radius:999px;background:rgba(0,0,0,.55);padding:6px 10px;font-size:12px;line-height:1;color:#fff;transition:opacity .25s ease,transform .25s ease}' +
      '.vp-project-bottom{display:grid;grid-template-columns:1fr auto;gap:16px;padding-top:12px;font-size:15px;line-height:20px}' +
      '.vp-title-roll{height:20px;overflow:hidden;position:relative}.vp-title-roll span{display:block;height:20px;transition:transform .45s cubic-bezier(.82,.08,.29,1)}' +
      '.vp-project-card:hover .vp-project-bg{filter:brightness(.36);transform:scale(1.055)}' +
      '.vp-project-card:hover .vp-project-inner{filter:brightness(.72);transform:scale(1.035)}' +
      '.vp-project-card:hover .vp-project-banner{transform:translateY(-50%) scaleY(1)}' +
      '.vp-project-card:hover .vp-project-view{opacity:1;transform:translate(-50%,-50%) scale(1)}' +
      '.vp-project-card:hover .vp-title-roll span{transform:translateY(-20px)}' +
      '.vp-work-list-card{width:100%;display:block;margin-top:0}' +
      '.vp-work-list-card+.vp-work-list-card{margin-top:0}' +
      '.vp-home-added .vp-project-card:nth-child(even){margin-top:110px}' +
      '.vp-home-added .vp-project-card:nth-child(5){margin-top:0}' +
      '@media(max-width:809.98px){' +
        '.vp-added-grid{grid-template-columns:1fr;gap:44px;padding-top:42px}' +
        '.vp-home-added .vp-project-card:nth-child(n){margin-top:0}' +
        '.vp-project-media{aspect-ratio:1.1/1}' +
        '.vp-project-bottom{font-size:14px}' +
        '.vp-project-inner{inset:18% 20%;width:60%;height:64%}' +
        'section[data-framer-name="Client"] .framer-xrlw7a img{transform:scale(1.28)!important}' +
      '}';
    (document.head||document.documentElement).appendChild(s);
  }

  function card(p,cls){
    var a=document.createElement('a');a.className='vp-project-card '+(cls||'');a.href=p.href;
    a.innerHTML='<div class="vp-project-media">'+
      '<img class="vp-project-bg" loading="lazy" src="'+p.img+'" alt="'+p.title+' background">'+
      '<img class="vp-project-inner" loading="lazy" src="'+p.img+'" alt="'+p.title+' mockup">'+
      '<div class="vp-project-banner">'+p.category+'</div><div class="vp-project-view">VIEW</div></div>'+
      '<div class="vp-project-bottom"><div class="vp-title-roll"><span>'+p.title+'</span><span>'+p.title+'</span></div><div>('+p.count+')</div></div>';
    return a;
  }

  function disableJournal(){
    DISABLED.forEach(function(href){
      [].slice.call(document.querySelectorAll('a[href="'+href+'"]')).forEach(function(a){
        a.removeAttribute('href');a.setAttribute('aria-disabled','true');a.style.cursor='default';
      });
    });
  }

  function home(){
    if(document.getElementById('vp-home-added'))return;
    var cards=document.querySelector('section[data-framer-name="Work"] [data-framer-name="Cards"]');
    if(!cards)return;
    var g=document.createElement('div');g.id='vp-home-added';g.className='vp-added-grid vp-home-added';
    PROJECTS.forEach(function(p){g.appendChild(card(p,''));});
    cards.insertAdjacentElement('afterend',g);
  }

  function work(){
    if(document.getElementById('vp-work-added'))return;
    var container=document.querySelector('[data-framer-name="Work"] [data-framer-name="Container"]');
    if(!container)return;
    var num=container.querySelector('[data-framer-name="Number"] h3');if(num)num.textContent='(10)';
    var first=container.querySelector('[data-framer-name="Work Card"]');
    var right=first&&first.firstElementChild;
    if(!right)return;
    var g=document.createElement('div');g.id='vp-work-added';g.className='vp-added-grid';
    g.style.gridTemplateColumns='1fr';g.style.gap='48px';g.style.paddingTop='48px';
    PROJECTS.forEach(function(p){g.appendChild(card(p,'vp-work-list-card'));});
    right.appendChild(g);
  }

  function clients(){
    if(window.matchMedia&&window.matchMedia('(max-width:809.98px)').matches){
      var h=document.querySelector('section[data-framer-name="Client"] [data-framer-name="Responsive Heading"] [data-framer-name="Number"] h3');
      if(h)h.textContent='(5)';
    }
  }

  function tightenLogos(){
    [].slice.call(document.querySelectorAll('ul')).forEach(function(ul){
      if(ul.querySelectorAll('img').length<4)return;
      var cs=getComputedStyle(ul),p=ul.parentElement,pcs=p?getComputedStyle(p):null;
      if(cs.display.indexOf('flex')===-1)return;
      if((pcs&&pcs.overflow==='hidden')||ul.closest('[style*="overflow:hidden"]')){
        ul.style.setProperty('gap','12px','important');ul.style.setProperty('column-gap','12px','important');
      }
    });
  }

  function run(){
    ensureStyle();var p=location.pathname.toLowerCase();
    if(p.endsWith('/index.html')||p.endsWith('/farmer/')||p==='/'){disableJournal();home();clients();tightenLogos();}
    if(p.endsWith('/work.html'))work();
  }
  document.addEventListener('click',function(e){
    var a=e.target&&e.target.closest?e.target.closest('a[href]'):null;if(!a)return;
    var h=a.getAttribute('href')||'';if(DISABLED.some(function(x){return h===x||h.endsWith('/'+x);})){e.preventDefault();e.stopImmediatePropagation();}
  },true);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
  [350,900,1600].forEach(function(t){setTimeout(run,t);});
  try{new MutationObserver(function(){clients();tightenLogos();}).observe(document.documentElement,{childList:true,subtree:true});}catch(e){}
})();