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
    if(document.getElementById('vp-project-fix-style'))return;
    var st=document.createElement('style');st.id='vp-project-fix-style';
    st.textContent=
      '#vp-home-clones{width:100%;max-width:100%;min-width:0;overflow:hidden;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:56px 24px;margin:56px 0 0;padding:0}' +
      '#vp-home-clones>a{width:100%!important;max-width:100%!important;min-width:0!important;margin:0!important}' +
      '#vp-home-clones>a:nth-child(even){margin-top:110px!important}' +
      '#vp-home-clones img{max-width:100%!important}' +
      '#vp-work-clones{display:none!important}' +
      '.vp-added-work{width:100%!important;max-width:100%!important;min-width:0!important;margin-top:32px!important}' +
      '@media(max-width:809.98px){#vp-home-clones{grid-template-columns:1fr;gap:38px;margin-top:40px}#vp-home-clones>a:nth-child(even){margin-top:0!important}}';
    (document.head||document.documentElement).appendChild(st);
  }

  function fixClone(root,p,prefix){
    var a=root.matches&&root.matches('a[data-framer-name="Project"]')?root:root.querySelector('a[data-framer-name="Project"]');
    if(a)a.setAttribute('href',prefix+p.href);
    root.querySelectorAll('img').forEach(function(img){
      img.removeAttribute('srcset');img.removeAttribute('sizes');img.setAttribute('src',prefix+p.img);img.setAttribute('alt',p.title);
    });
    root.querySelectorAll('[data-framer-name="Title"] p').forEach(function(n){n.textContent=p.title;});
    root.querySelectorAll('[data-framer-name="Count"] p').forEach(function(n){n.textContent='('+p.count+')';});
    root.querySelectorAll('[data-framer-name="Banner"] [data-framer-name="Text"] p').forEach(function(n){n.textContent=p.category;});
    root.querySelectorAll('[data-framer-appear-id]').forEach(function(n){n.removeAttribute('data-framer-appear-id');n.style.opacity='1';n.style.transform='none';});
    bindHover(root);
    return root;
  }

  function bindHover(root){
    var comps=[].slice.call(root.querySelectorAll('.framer-uxrJc'));
    comps.forEach(function(c){
      if(!c.dataset.vpBaseClass)c.dataset.vpBaseClass=c.className;
    });
    root.addEventListener('mouseenter',function(){
      comps.forEach(function(c){
        c.className=(c.dataset.vpBaseClass||c.className).replace(/framer-v-[^\s]+/g,'framer-v-btlrul');
        var ban=c.querySelector('[data-framer-name="Banner"]');if(ban){ban.style.opacity='1';ban.style.transform='translateY(-50%)';}
      });
    });
    root.addEventListener('mouseleave',function(){
      comps.forEach(function(c){
        c.className=c.dataset.vpBaseClass||c.className;
        var ban=c.querySelector('[data-framer-name="Banner"]');if(ban){ban.style.opacity='0';ban.style.transform='translateY(-50%)';}
      });
    });
  }

  function disableJournal(){
    DISABLED.forEach(function(h){
      document.querySelectorAll('a[href="'+h+'"]').forEach(function(a){a.removeAttribute('href');a.setAttribute('aria-disabled','true');a.style.cursor='default';});
    });
  }

  function injectHome(){
    if(document.getElementById('vp-home-clones'))return;
    var sec=document.querySelector('section[data-framer-name="Work"]');if(!sec)return;
    var cards=sec.querySelector('[data-framer-name="Cards"]');if(!cards)return;
    var crystal=sec.querySelector('a[href="work/crystaloz.html"]');if(!crystal)return;
    var host=document.createElement('div');host.id='vp-home-clones';
    PROJECTS.forEach(function(p){
      var clone=crystal.cloneNode(true);
      clone.removeAttribute('class');
      clone.className='framer-tqvx7w framer-lux5qc';
      fixClone(clone,p,'');
      host.appendChild(clone);
    });
    cards.insertAdjacentElement('afterend',host);
  }

  function injectWork(){
    if(document.getElementById('vp-work-clones'))return;
    var sec=document.querySelector('section[data-framer-name="Work"]');if(!sec)return;
    var num=sec.querySelector('[data-framer-name="Number"] h3');if(num)num.textContent='(10)';
    var crystal=sec.querySelector('a[href="work/crystaloz.html"]');if(!crystal)return;
    var parent=crystal.parentElement;if(!parent)return;
    var marker=document.createElement('span');marker.id='vp-work-clones';parent.appendChild(marker);
    PROJECTS.forEach(function(p){
      var clone=crystal.cloneNode(true);
      clone.classList.add('vp-added-work');
      fixClone(clone,p,'');
      parent.appendChild(clone);
    });
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
    var path=location.pathname.toLowerCase();
    if(path.endsWith('/index.html')||path.endsWith('/farmer/')||path==='/'){disableJournal();injectHome();clients();}
    if(path.endsWith('/work.html'))injectWork();
  }

  document.addEventListener('click',function(e){
    var a=e.target&&e.target.closest?e.target.closest('a[href]'):null;if(!a)return;
    var h=a.getAttribute('href')||'';
    if(DISABLED.some(function(x){return h===x||h.endsWith('/'+x)})){e.preventDefault();e.stopImmediatePropagation();}
  },true);

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
  [250,700,1400,2600].forEach(function(t){setTimeout(run,t);});
})();