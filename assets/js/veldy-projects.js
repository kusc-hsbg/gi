(function () {
  var PROJECTS = [
    {slug:'patchking',title:'PATCHKING',category:'Branding Design',image:'assets/img/projects/patchking.svg',href:'work/patchking.html',count:'06'},
    {slug:'teoljabi',title:'TEOLJABI',category:'Branding Design',image:'assets/img/projects/teoljabi.svg',href:'work/teoljabi.html',count:'07'},
    {slug:'soulju',title:'SOULJU',category:'Branding Design',image:'assets/img/projects/soulju.svg',href:'work/soulju.html',count:'08'},
    {slug:'bibimcha',title:'BIBIMCHA',category:'Branding Design',image:'assets/img/projects/bibimcha.svg',href:'work/bibimcha.html',count:'09'},
    {slug:'davinci-code',title:'DAVINCI CODE',category:'Branding Design',image:'assets/img/projects/davinci-code.svg',href:'work/davinci-code.html',count:'10'}
  ];

  var DISABLED_JOURNAL=[
    'article/hemingway-audio.html','article/soulju.html','article/raven-claw.html','article/essel.html'
  ];

  function ensureStyle(){
    if(document.getElementById('veldy-projects-style'))return;
    var s=document.createElement('style');
    s.id='veldy-projects-style';
    s.textContent=
      '.vpj-home-more,.vpj-work-more{box-sizing:border-box;color:#fff;font-family:"Inter Display","Inter Display Placeholder",Arial,sans-serif}' +
      '.vpj-home-more *,.vpj-work-more *{box-sizing:border-box}' +
      '.vpj-home-more{max-width:1480px;margin:0 auto;padding:90px 24px 150px;display:grid;grid-template-columns:repeat(12,1fr);grid-auto-rows:80px;column-gap:24px;row-gap:34px}' +
      '.vpj-scatter-card{display:block;color:#fff;text-decoration:none;min-width:0}' +
      '.vpj-scatter-card:nth-child(1){grid-column:1/6;grid-row:1/6}' +
      '.vpj-scatter-card:nth-child(2){grid-column:8/13;grid-row:2/7}' +
      '.vpj-scatter-card:nth-child(3){grid-column:3/8;grid-row:7/12}' +
      '.vpj-scatter-card:nth-child(4){grid-column:8/13;grid-row:8/13}' +
      '.vpj-scatter-card:nth-child(5){grid-column:1/6;grid-row:13/18}' +
      '.vpj-scatter-media{width:100%;height:calc(100% - 42px);min-height:260px;overflow:hidden;border-radius:10px;background:#111}' +
      '.vpj-scatter-media img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .5s ease}' +
      '.vpj-scatter-card:hover img{transform:scale(1.025)}' +
      '.vpj-scatter-meta{display:grid;grid-template-columns:1fr auto;gap:18px;padding-top:13px;font-size:14px;line-height:1.25}' +
      '.vpj-scatter-count{text-align:right}' +
      '.vpj-work-more{width:100%;padding:80px 0 160px}' +
      '.vpj-work-grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:24px;row-gap:110px;width:100%;align-items:start}' +
      '.vpj-work-card{display:block;color:#fff;text-decoration:none;min-width:0}' +
      '.vpj-work-card:nth-child(1){grid-column:1/7}' +
      '.vpj-work-card:nth-child(2){grid-column:8/13;margin-top:140px}' +
      '.vpj-work-card:nth-child(3){grid-column:2/7;margin-top:10px}' +
      '.vpj-work-card:nth-child(4){grid-column:7/13;margin-top:150px}' +
      '.vpj-work-card:nth-child(5){grid-column:1/7;margin-top:20px}' +
      '.vpj-work-img{aspect-ratio:1.17/1;border-radius:10px;overflow:hidden;background:#111}' +
      '.vpj-work-img img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .5s ease}' +
      '.vpj-work-card:hover img{transform:scale(1.02)}' +
      '.vpj-work-meta{display:grid;grid-template-columns:1fr auto;gap:16px;padding:14px 0 0}' +
      '.vpj-work-title,.vpj-work-count{font-size:19px;font-weight:500;line-height:1.25}' +
      '.vpj-work-count{text-align:right}' +
      '@media(max-width:809.98px){' +
        '.vpj-home-more{padding:50px 20px 80px;display:grid;grid-template-columns:1fr;grid-auto-rows:auto;gap:42px}' +
        '.vpj-scatter-card:nth-child(n){grid-column:auto;grid-row:auto}' +
        '.vpj-scatter-media{height:auto;min-height:0;aspect-ratio:1.22/1}' +
        '.vpj-scatter-meta{font-size:14px}' +
        '.vpj-work-more{padding:45px 0 100px}' +
        '.vpj-work-grid{display:grid;grid-template-columns:1fr;row-gap:62px}' +
        '.vpj-work-card:nth-child(n){grid-column:auto;margin-top:0}' +
        '.vpj-work-img{aspect-ratio:1.2/1}' +
        '.vpj-work-title,.vpj-work-count{font-size:16px}' +
        'section[data-framer-name="Client"] .framer-xrlw7a img{transform:scale(1.28)!important}' +
      '}';
    (document.head||document.documentElement).appendChild(s);
  }

  function isDisabledJournalHref(href){
    return DISABLED_JOURNAL.some(function(x){return href===x||href.endsWith('/'+x);});
  }
  function disableJournalLinks(){
    DISABLED_JOURNAL.forEach(function(href){
      [].slice.call(document.querySelectorAll('a[href="'+href+'"]')).forEach(function(a){
        a.removeAttribute('href');a.setAttribute('aria-disabled','true');a.style.cursor='default';
        a.querySelectorAll('[data-framer-cursor]').forEach(function(n){n.removeAttribute('data-framer-cursor');n.style.cursor='default';});
      });
    });
  }

  function makeCard(p,home){
    var a=document.createElement('a');
    a.className=home?'vpj-scatter-card':'vpj-work-card';
    a.href=p.href;
    a.innerHTML=home
      ? '<div class="vpj-scatter-media"><img loading="lazy" src="'+p.image+'" alt="'+p.title+'"></div><div class="vpj-scatter-meta"><span>'+p.title+'</span><span class="vpj-scatter-count">('+p.count+')</span></div>'
      : '<div class="vpj-work-img"><img loading="lazy" src="'+p.image+'" alt="'+p.title+'"></div><div class="vpj-work-meta"><div class="vpj-work-title">'+p.title+'</div><div class="vpj-work-count">('+p.count+')</div></div>';
    return a;
  }

  function injectHome(){
    if(document.getElementById('vpj-home-more'))return;
    var cards=document.querySelector('section[data-framer-name="Work"] [data-framer-name="Cards"]');
    if(!cards)return;
    var section=document.createElement('section');section.id='vpj-home-more';section.className='vpj-home-more';
    PROJECTS.forEach(function(p){section.appendChild(makeCard(p,true));});
    cards.insertAdjacentElement('afterend',section);
  }

  function injectWork(){
    if(document.getElementById('vpj-work-more'))return;
    var container=document.querySelector('[data-framer-name="Work"] [data-framer-name="Container"]');
    if(!container)return;
    var num=container.querySelector('[data-framer-name="Number"] h3');
    if(num)num.textContent='(10)';
    var section=document.createElement('section');section.id='vpj-work-more';section.className='vpj-work-more';
    var grid=document.createElement('div');grid.className='vpj-work-grid';
    PROJECTS.forEach(function(p){grid.appendChild(makeCard(p,false));});
    section.appendChild(grid);container.appendChild(section);
  }

  function fixClients(){
    if(window.matchMedia&&window.matchMedia('(max-width:809.98px)').matches){
      var h=document.querySelector('section[data-framer-name="Client"] [data-framer-name="Responsive Heading"] [data-framer-name="Number"] h3');
      if(h)h.textContent='(5)';
    }
  }

  function tightenLogoMarquees(){
    [].slice.call(document.querySelectorAll('ul')).forEach(function(ul){
      var lis=ul.children||[];
      if(lis.length<4)return;
      var imgs=ul.querySelectorAll('img');
      if(imgs.length<4)return;
      var cs=getComputedStyle(ul);
      var anc=ul.parentElement;
      var acs=anc?getComputedStyle(anc):null;
      if(cs.display.indexOf('flex')===-1)return;
      if((acs&&acs.overflow==='hidden')||ul.closest('[style*="overflow:hidden"]')){
        ul.style.setProperty('gap','16px','important');
        ul.style.setProperty('column-gap','16px','important');
      }
    });
  }

  function run(){
    ensureStyle();
    var path=location.pathname.toLowerCase();
    if(path.endsWith('/index.html')||path.endsWith('/farmer/')||path==='/'){disableJournalLinks();injectHome();fixClients();tightenLogoMarquees();}
    if(path.endsWith('/work.html'))injectWork();
  }

  document.addEventListener('click',function(e){
    var a=e.target&&e.target.closest?e.target.closest('a[href]'):null;if(!a)return;
    var href=a.getAttribute('href')||'';
    if(isDisabledJournalHref(href)){e.preventDefault();e.stopImmediatePropagation();}
  },true);

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
  [400,1000,1800].forEach(function(t){setTimeout(run,t);});
  try{new MutationObserver(function(){fixClients();tightenLogoMarquees();}).observe(document.documentElement,{childList:true,subtree:true});}catch(e){}
})();