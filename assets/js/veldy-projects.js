(function(){
  var PROJECTS=[
    {title:'DAVINCI CODE',count:'06',category:'Branding Design',href:'work/davinci-code.html',bg:'assets/img/projects/davinci-code-bg.webp',center:'assets/img/projects/davinci-code-center.webp'},
    {title:'PATCHKING',count:'07',category:'Brand Identity',href:'work/patchking.html',bg:'assets/img/projects/patchking-bg.webp',center:'assets/img/projects/patchking-center.webp'},
    {title:'SOULJU',count:'08',category:'BI·CI & Profile',href:'work/soulju.html',bg:'assets/img/projects/soulju-bg.webp',center:'assets/img/projects/soulju-center.webp'},
    {title:'TEOLJABI',count:'09',category:'Web Site & Branding',href:'work/teoljabi.html',bg:'assets/img/projects/teoljabi-bg.webp',center:'assets/img/projects/teoljabi-center.webp'},
    {title:'BIBIMCHA',count:'10',category:'Branding Design',href:'work/bibimcha.html',bg:'assets/img/projects/bibimcha-bg.webp',center:'assets/img/projects/bibimcha-center.webp'}
  ];
  var DISABLED=['article/hemingway-audio.html','article/soulju.html','article/raven-claw.html','article/essel.html'];

  function ensureStyle(){
    var st=document.getElementById('vp-project-fix-style');
    if(!st){st=document.createElement('style');st.id='vp-project-fix-style';(document.head||document.documentElement).appendChild(st);}
    st.textContent=
      'html,body{overflow-x:hidden!important}' +
      '#vp-home-clones,#vp-work-clones{box-sizing:border-box;width:100%;display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:24px;row-gap:130px;margin:120px 0 0;padding:0;overflow:visible}' +
      '.vp-project-card{display:block!important;min-width:0;color:#fff;text-decoration:none!important;position:relative}' +
      '#vp-home-clones .vp-project-card:nth-child(1),#vp-work-clones .vp-project-card:nth-child(1){grid-column:1 / span 7}' +
      '#vp-home-clones .vp-project-card:nth-child(2),#vp-work-clones .vp-project-card:nth-child(2){grid-column:1 / span 5}' +
      '#vp-home-clones .vp-project-card:nth-child(3),#vp-work-clones .vp-project-card:nth-child(3){grid-column:8 / span 5;margin-top:110px}' +
      '#vp-home-clones .vp-project-card:nth-child(4),#vp-work-clones .vp-project-card:nth-child(4){grid-column:3 / span 7}' +
      '#vp-home-clones .vp-project-card:nth-child(5),#vp-work-clones .vp-project-card:nth-child(5){grid-column:8 / span 5}' +
      '.vp-project-visual{position:relative;width:100%;aspect-ratio:1.34/1;border-radius:10px;overflow:hidden;background:#111;isolation:isolate}' +
      '.vp-project-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;filter:brightness(1);transition:filter .45s cubic-bezier(.2,.7,.2,1),transform .7s cubic-bezier(.2,.7,.2,1)}' +
      '.vp-project-center{position:absolute;z-index:2;left:50%;top:50%;width:48%;height:52%;object-fit:contain;transform:translate(-50%,-50%) scale(1);transition:transform .55s cubic-bezier(.2,.7,.2,1)}' +
      '.vp-project-shade{position:absolute;inset:0;z-index:1;background:rgba(0,0,0,0);transition:background .4s ease}' +
      '.vp-project-banner{position:absolute;z-index:4;left:0;right:0;top:50%;height:24px;transform:translateY(-50%) scaleX(0);transform-origin:center;background:#fff;color:#000;display:flex;align-items:center;justify-content:center;overflow:hidden;transition:transform .45s cubic-bezier(.75,0,.25,1)}' +
      '.vp-project-banner span{font-family:"Inter Display","Inter Display Placeholder",sans-serif;font-size:14px;font-weight:600;line-height:1;white-space:nowrap;opacity:0;transform:translateY(10px);transition:opacity .2s ease .2s,transform .35s ease .16s}' +
      '.vp-project-meta{display:flex;align-items:flex-start;justify-content:space-between;gap:18px;margin-top:14px;font-family:"Inter Display","Inter Display Placeholder",sans-serif;font-size:14px;font-weight:500;line-height:18px}' +
      '.vp-roll{display:block;height:18px;overflow:hidden;white-space:nowrap}' +
      '.vp-roll-inner{display:flex;flex-direction:column;transition:transform .5s cubic-bezier(.82,.08,.29,1)}' +
      '.vp-roll-inner span{display:block;height:18px;line-height:18px;white-space:nowrap}' +
      '.vp-project-card:hover .vp-project-bg{filter:brightness(.48);transform:scale(1.015)}' +
      '.vp-project-card:hover .vp-project-shade{background:rgba(0,0,0,.08)}' +
      '.vp-project-card:hover .vp-project-center{transform:translate(-50%,-50%) scale(1.025)}' +
      '.vp-project-card:hover .vp-project-banner{transform:translateY(-50%) scaleX(1)}' +
      '.vp-project-card:hover .vp-project-banner span{opacity:1;transform:translateY(0)}' +
      '.vp-project-card:hover .vp-roll-inner{transform:translateY(-18px)}' +
      '@media(max-width:809.98px){#vp-home-clones,#vp-work-clones{grid-template-columns:1fr;row-gap:54px;margin-top:70px}#vp-home-clones .vp-project-card,#vp-work-clones .vp-project-card{grid-column:1!important;margin-top:0!important}.vp-project-center{width:50%;height:54%}.vp-project-meta{font-size:14px}}';
  }

  function card(p){
    var a=document.createElement('a');
    a.className='vp-project-card';
    a.href=p.href;
    a.setAttribute('aria-label',p.title);
    a.innerHTML=
      '<div class="vp-project-visual">'+
        '<img class="vp-project-bg" src="'+p.bg+'" alt="">'+
        '<div class="vp-project-shade"></div>'+
        '<img class="vp-project-center" src="'+p.center+'" alt="'+p.title+'">'+
        '<div class="vp-project-banner"><span>'+p.category+'</span></div>'+
      '</div>'+
      '<div class="vp-project-meta">'+
        '<span class="vp-roll"><span class="vp-roll-inner"><span>'+p.title+'</span><span>'+p.title+'</span></span></span>'+
        '<span class="vp-roll"><span class="vp-roll-inner"><span>('+p.count+')</span><span>('+p.count+')</span></span></span>'+
      '</div>';
    return a;
  }

  function buildHost(id){
    var host=document.createElement('div');host.id=id;
    PROJECTS.forEach(function(p){host.appendChild(card(p));});
    return host;
  }

  function disableJournal(){
    DISABLED.forEach(function(h){
      document.querySelectorAll('a[href="'+h+'"]').forEach(function(a){a.removeAttribute('href');a.setAttribute('aria-disabled','true');a.style.cursor='default';});
    });
  }

  function injectHome(){
    var old=document.getElementById('vp-home-clones');if(old)old.remove();
    var sec=document.querySelector('section[data-framer-name="Work"]');if(!sec)return;
    var cards=sec.querySelector('[data-framer-name="Cards"]');if(!cards)return;
    cards.appendChild(buildHost('vp-home-clones'));
  }

  function injectWork(){
    var old=document.getElementById('vp-work-clones');if(old)old.remove();
    var sec=document.querySelector('section[data-framer-name="Work"]');if(!sec)return;
    var num=sec.querySelector('[data-framer-name="Number"] h3');if(num)num.textContent='(10)';
    var crystal=sec.querySelector('a[href="work/crystaloz.html"],a[href$="/work/crystaloz.html"]');
    var parent=crystal&&crystal.parentElement?crystal.parentElement:sec;
    parent.appendChild(buildHost('vp-work-clones'));
  }

  function clients(){
    if(window.matchMedia&&window.matchMedia('(max-width:809.98px)').matches){
      var n=document.querySelector('section[data-framer-name="Client"] [data-framer-name="Responsive Heading"] [data-framer-name="Number"] h3');
      if(n)n.textContent='(5)';
    }
  }

  function run(){
    ensureStyle();
    var path=(location.pathname||'').toLowerCase().replace(/\/+$/,'');
    var file=(path.split('/').pop()||'');
    var isHome=(file===''||file==='index.html'||file==='farmer');
    var isWork=(file==='work.html');
    if(isHome){disableJournal();if(!document.getElementById('vp-home-clones'))injectHome();clients();}
    if(isWork&&!document.getElementById('vp-work-clones'))injectWork();
  }

  document.addEventListener('click',function(e){
    var a=e.target&&e.target.closest?e.target.closest('a[href]'):null;if(!a)return;
    var h=a.getAttribute('href')||'';
    if(DISABLED.some(function(x){return h===x||h.endsWith('/'+x)})){e.preventDefault();e.stopImmediatePropagation();}
  },true);

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
  [80,250,600,1200,2500,5000].forEach(function(t){setTimeout(run,t);});
})();