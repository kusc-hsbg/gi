(function(){
  var PROJECTS=[
    {title:'PATCHKING',count:'06',category:'Branding Design',href:'work/patchking.html',img:'assets/img/projects/patchking.svg'},
    {title:'TEOLJABI',count:'07',category:'Branding Design',href:'work/teoljabi.html',img:'assets/img/projects/teoljabi.svg'},
    {title:'SOULJU',count:'08',category:'Branding Design',href:'work/soulju.html',img:'assets/img/projects/soulju.svg'},
    {title:'BIBIMCHA',count:'09',category:'Branding Design',href:'work/bibimcha.html',img:'assets/img/projects/bibimcha.svg'},
    {title:'DAVINCI CODE',count:'10',category:'Branding Design',href:'work/davinci-code.html',img:'assets/img/projects/davinci-code.svg'}
  ];
  var DISABLED=['article/hemingway-audio.html','article/soulju.html','article/raven-claw.html','article/essel.html'];

  function fixClone(root,p){
    var a=root.matches&&root.matches('a[data-framer-name="Project"]')?root:root.querySelector('a[data-framer-name="Project"]');
    if(a)a.setAttribute('href',p.href);
    root.querySelectorAll('img').forEach(function(img){
      img.removeAttribute('srcset'); img.removeAttribute('sizes');
      img.setAttribute('src',p.img); img.setAttribute('alt',p.title);
    });
    root.querySelectorAll('[data-framer-name="Title"] p').forEach(function(n){n.textContent=p.title;});
    root.querySelectorAll('[data-framer-name="Count"] p').forEach(function(n){n.textContent='('+p.count+')';});
    root.querySelectorAll('[data-framer-name="Banner"] [data-framer-name="Text"] p').forEach(function(n){n.textContent=p.category;});
    root.querySelectorAll('[data-framer-appear-id]').forEach(function(n){n.removeAttribute('data-framer-appear-id');});
    return root;
  }

  function disableJournal(){
    DISABLED.forEach(function(h){
      document.querySelectorAll('a[href="'+h+'"]').forEach(function(a){
        a.removeAttribute('href');a.setAttribute('aria-disabled','true');a.style.cursor='default';
      });
    });
  }

  function injectHome(){
    if(document.getElementById('vp-home-clones'))return;
    var sec=document.querySelector('section[data-framer-name="Work"]'); if(!sec)return;
    var cards=sec.querySelector('[data-framer-name="Cards"]'); if(!cards)return;
    var crystal=sec.querySelector('a[href="work/crystaloz.html"]'); if(!crystal)return;
    var wrap=crystal.closest('[data-framer-name^="Work Card"]') || crystal.parentElement;
    if(!wrap)return;
    var host=document.createElement('div'); host.id='vp-home-clones'; host.style.display='contents';
    cards.appendChild(host);
    PROJECTS.forEach(function(p){
      var c=wrap.cloneNode(true); fixClone(c,p); c.removeAttribute('data-framer-name');
      host.appendChild(c);
    });
  }

  function injectWork(){
    if(document.getElementById('vp-work-clones'))return;
    var sec=document.querySelector('section[data-framer-name="Work"]'); if(!sec)return;
    var num=sec.querySelector('[data-framer-name="Number"] h3'); if(num)num.textContent='(10)';
    var crystal=sec.querySelector('a[href="work/crystaloz.html"]'); if(!crystal)return;
    var parent=crystal.parentElement; if(!parent)return;
    var marker=document.createElement('span'); marker.id='vp-work-clones'; marker.style.display='none';
    parent.appendChild(marker);
    PROJECTS.forEach(function(p){
      var c=crystal.cloneNode(true); fixClone(c,p); parent.appendChild(c);
    });
  }

  function clients(){
    if(matchMedia('(max-width:809.98px)').matches){
      var n=document.querySelector('section[data-framer-name="Client"] [data-framer-name="Responsive Heading"] [data-framer-name="Number"] h3');
      if(n)n.textContent='(5)';
      document.querySelectorAll('section[data-framer-name="Client"] .framer-xrlw7a img').forEach(function(img){img.style.transform='scale(1.28)';});
    }
  }
  function run(){
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
  [300,800,1500].forEach(function(t){setTimeout(run,t);});
})();