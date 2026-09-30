(function(){
  var PROJECTS=[
    {title:'Davinci Code',count:'06',category:'Branding Design',href:'work/davinci-code.html',bg:'https://cdn.imweb.me/upload/S20200310d1b0c0f80c87d/6779242cd6cc1.png',center:'https://cdn.imweb.me/upload/S20200310d1b0c0f80c87d/7043c842a2b54.png'},
    {title:'Patchking',count:'07',category:'Brand Identity',href:'work/patchking.html',bg:'https://cdn.imweb.me/upload/S20200310d1b0c0f80c87d/7b536b7ec8290.png',center:'https://cdn.imweb.me/upload/S20200310d1b0c0f80c87d/71fc83a8043be.png'},
    {title:'Soulju',count:'08',category:'BI·CI & Profile',href:'work/soulju.html',bg:'https://cdn.imweb.me/upload/S20200310d1b0c0f80c87d/66d0b5485ebc9.png',center:'https://cdn.imweb.me/upload/S20200310d1b0c0f80c87d/5e1323c7de71e.png'},
    {title:'Teoljabi',count:'09',category:'Web Site & Branding',href:'work/teoljabi.html',bg:'https://cdn.imweb.me/upload/S20200310d1b0c0f80c87d/91fee34ffc57c.jpg',center:'https://cdn.imweb.me/upload/S20200310d1b0c0f80c87d/8647f8504f55a.jpg'},
    {title:'Bibimcha',count:'10',category:'Branding Design',href:'work/bibimcha.html',bg:'https://cdn.imweb.me/upload/S20200310d1b0c0f80c87d/af0ba9bf48dfc.png',center:'https://cdn.imweb.me/upload/S20200310d1b0c0f80c87d/0881de41247e0.png'}
  ];
  var DISABLED=['article/hemingway-audio.html','article/soulju.html','article/raven-claw.html','article/essel.html'];

  function ensureStyle(){
    var st=document.getElementById('vp-project-fix-style');
    if(!st){st=document.createElement('style');st.id='vp-project-fix-style';(document.head||document.documentElement).appendChild(st);}
    st.textContent=
      '#vp-home-clones,#vp-work-clones{box-sizing:border-box;width:100%;display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:24px;row-gap:130px;margin:120px 0 0;padding:0;overflow:visible}' +
      '#vp-home-clones>a,#vp-work-clones>a{width:100%!important;max-width:none!important;min-width:0!important;margin:0!important;align-self:start;cursor:none!important}' +
      '#vp-home-clones>a:nth-child(1),#vp-work-clones>a:nth-child(1){grid-column:1 / span 7}' +
      '#vp-home-clones>a:nth-child(2),#vp-work-clones>a:nth-child(2){grid-column:1 / span 5}' +
      '#vp-home-clones>a:nth-child(3),#vp-work-clones>a:nth-child(3){grid-column:8 / span 5;margin-top:110px!important}' +
      '#vp-home-clones>a:nth-child(4),#vp-work-clones>a:nth-child(4){grid-column:3 / span 7}' +
      '#vp-home-clones>a:nth-child(5),#vp-work-clones>a:nth-child(5){grid-column:8 / span 5}' +
      '#vp-home-clones [data-framer-name="Top"],#vp-work-clones [data-framer-name="Top"]{aspect-ratio:1.16/1!important;height:auto!important;min-height:0!important;overflow:hidden!important}' +
      '#vp-home-clones [data-framer-name="Image/Video"],#vp-work-clones [data-framer-name="Image/Video"],#vp-home-clones [data-framer-name="Inner Image"],#vp-work-clones [data-framer-name="Inner Image"]{position:absolute!important;inset:0!important;width:100%!important;height:100%!important}' +
      '#vp-home-clones [data-framer-name="Inner Image"],#vp-work-clones [data-framer-name="Inner Image"]{z-index:2!important;display:flex!important;align-items:center!important;justify-content:center!important;pointer-events:none!important;overflow:visible!important}' +
      '#vp-home-clones [data-framer-name="Inner Image"]>[data-framer-name="Image"],#vp-work-clones [data-framer-name="Inner Image"]>[data-framer-name="Image"]{position:relative!important;width:50%!important;height:50%!important;flex:none!important;border-radius:10px!important;overflow:hidden!important}' +
      '#vp-home-clones [data-framer-name="Inner Image"] img,#vp-work-clones [data-framer-name="Inner Image"] img{object-fit:cover!important;object-position:center!important;border-radius:10px!important;transform:scale(1)!important;transition:transform .55s cubic-bezier(.2,.7,.2,1)!important}' +
      '#vp-home-clones [data-framer-name="Image/Video"] img,#vp-work-clones [data-framer-name="Image/Video"] img{object-fit:cover!important;object-position:center!important;transition:filter .35s ease,transform .55s cubic-bezier(.2,.7,.2,1)!important}' +
      '#vp-home-clones .vp-framer-clone:hover [data-framer-name="Image/Video"] img,#vp-work-clones .vp-framer-clone:hover [data-framer-name="Image/Video"] img{filter:brightness(.48)!important;transform:scale(1.01)!important}' +
      '#vp-home-clones .vp-framer-clone:hover [data-framer-name="Inner Image"] img,#vp-work-clones .vp-framer-clone:hover [data-framer-name="Inner Image"] img{transform:scale(1.10)!important}' +
      '#vp-home-clones .vp-framer-clone [data-framer-name="Banner"],#vp-work-clones .vp-framer-clone [data-framer-name="Banner"]{z-index:6!important;display:flex!important;position:absolute!important;left:0!important;top:50%!important;width:100%!important;height:24px!important;min-height:24px!important;background:#fff!important;opacity:0!important;transform:translateY(-50%)!important;overflow:hidden!important;transition:opacity .22s ease!important}' +
      '#vp-home-clones .vp-framer-clone:hover [data-framer-name="Banner"],#vp-work-clones .vp-framer-clone:hover [data-framer-name="Banner"]{opacity:1!important}' +
      '#vp-home-clones .vp-framer-clone [data-framer-name="Banner"] [data-framer-name="Filler"],#vp-work-clones .vp-framer-clone [data-framer-name="Banner"] [data-framer-name="Filler"]{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;background:#fff!important}' +
      '#vp-home-clones .vp-framer-clone [data-framer-name="Banner"] [data-framer-name="Text"],#vp-work-clones .vp-framer-clone [data-framer-name="Banner"] [data-framer-name="Text"]{z-index:3!important;opacity:1!important;transform:none!important;margin:auto!important}' +
      '#vp-home-clones .vp-framer-clone [data-framer-name="Banner"] p,#vp-work-clones .vp-framer-clone [data-framer-name="Banner"] p{font-family:"Inter Display","Inter Display Placeholder",sans-serif!important;font-size:16px!important;font-weight:600!important;line-height:24px!important;color:#000!important}' +
      '#vp-home-clones .vp-framer-clone [data-framer-name="Title"],#vp-work-clones .vp-framer-clone [data-framer-name="Title"]{height:25px!important;overflow:hidden!important;justify-content:flex-start!important}' +
      '#vp-home-clones .vp-framer-clone [data-framer-name="Title"]>[data-framer-name="Text 1"],#vp-home-clones .vp-framer-clone [data-framer-name="Title"]>[data-framer-name="Text 2"],#vp-work-clones .vp-framer-clone [data-framer-name="Title"]>[data-framer-name="Text 1"],#vp-work-clones .vp-framer-clone [data-framer-name="Title"]>[data-framer-name="Text 2"]{height:25px!important;min-height:25px!important;transition:transform .45s cubic-bezier(.82,.08,.29,1)!important}' +
      '#vp-home-clones .vp-framer-clone:hover [data-framer-name="Title"]>[data-framer-name="Text 1"],#vp-home-clones .vp-framer-clone:hover [data-framer-name="Title"]>[data-framer-name="Text 2"],#vp-work-clones .vp-framer-clone:hover [data-framer-name="Title"]>[data-framer-name="Text 1"],#vp-work-clones .vp-framer-clone:hover [data-framer-name="Title"]>[data-framer-name="Text 2"]{transform:translateY(-25px)!important}' +
      '#vp-home-clones .vp-framer-clone [data-framer-name="Count"],#vp-work-clones .vp-framer-clone [data-framer-name="Count"]{transform:none!important;rotate:none!important;transition:none!important}' +
      '.vp-view-cursor{position:fixed;z-index:2147483000;left:0;top:0;display:none;pointer-events:none;transform:translate(-50%,-50%);padding:7px 14px 8px;border-radius:999px;background:#fff;color:#000;font-family:"Inter Display","Inter Display Placeholder",sans-serif;font-size:18px;font-weight:700;line-height:1;white-space:nowrap}' +
      '@media(pointer:coarse){#vp-home-clones>a,#vp-work-clones>a{cursor:pointer!important}.vp-view-cursor{display:none!important}}' +
      '@media(max-width:809.98px){#vp-home-clones,#vp-work-clones{grid-template-columns:1fr;row-gap:54px;margin-top:70px}#vp-home-clones>a,#vp-work-clones>a{grid-column:1!important;margin-top:0!important}#vp-home-clones [data-framer-name="Inner Image"]>[data-framer-name="Image"],#vp-work-clones [data-framer-name="Inner Image"]>[data-framer-name="Image"]{width:50%!important;height:50%!important}}';
  }

  function setImg(img,src,alt){
    if(!img)return;
    img.removeAttribute('srcset');img.removeAttribute('sizes');img.removeAttribute('width');img.removeAttribute('height');
    img.setAttribute('src',src);img.setAttribute('alt',alt||'');
  }

  function cursor(){
    var c=document.getElementById('vp-view-cursor');
    if(!c){c=document.createElement('div');c.id='vp-view-cursor';c.className='vp-view-cursor';c.textContent='VIEW';document.body.appendChild(c);}
    return c;
  }

  function prepareTemplate(template,p){
    var clone=template.cloneNode(true);
    clone.classList.add('vp-framer-clone');
    clone.setAttribute('href',p.href);
    clone.querySelectorAll('[id]').forEach(function(n){n.removeAttribute('id');});
    clone.querySelectorAll('[data-framer-appear-id]').forEach(function(n){n.removeAttribute('data-framer-appear-id');});
    clone.querySelectorAll('[data-framer-name="Image/Video"] img').forEach(function(img){setImg(img,p.bg,p.title+' background');});
    clone.querySelectorAll('[data-framer-name="Inner Image"] img').forEach(function(img){setImg(img,p.center,p.title);});
    clone.querySelectorAll('[data-framer-name="Title"] p').forEach(function(n){n.textContent=p.title;});
    clone.querySelectorAll('[data-framer-name="Count"] p').forEach(function(n){n.textContent='('+p.count+')';});

    var templateText=clone.querySelector('[data-framer-name="Banner"] [data-framer-name="Text"]');
    clone.querySelectorAll('[data-framer-name="Banner"]').forEach(function(banner){
      var txt=banner.querySelector('[data-framer-name="Text"]');
      if(!txt&&templateText){txt=templateText.cloneNode(true);banner.insertBefore(txt,banner.firstChild);}
      if(!txt){txt=document.createElement('div');txt.setAttribute('data-framer-name','Text');txt.innerHTML='<p></p>';banner.insertBefore(txt,banner.firstChild);}
      var pp=txt.querySelector('p');if(pp)pp.textContent=p.category;
      var filler=banner.querySelector('[data-framer-name="Filler"]');
      if(!filler){filler=document.createElement('div');filler.setAttribute('data-framer-name','Filler');banner.appendChild(filler);}
    });

    var c=cursor();
    clone.addEventListener('mouseenter',function(){c.style.display='block';});
    clone.addEventListener('mousemove',function(e){c.style.left=e.clientX+'px';c.style.top=e.clientY+'px';});
    clone.addEventListener('mouseleave',function(){c.style.display='none';});
    return clone;
  }

  function buildHost(id,template){
    var host=document.createElement('div');host.id=id;
    PROJECTS.forEach(function(p){host.appendChild(prepareTemplate(template,p));});
    return host;
  }

  function findTemplate(sec){
    return sec.querySelector('a[data-framer-name="Project"][href="work/crystaloz.html"]') ||
           sec.querySelector('a[data-framer-name="Project"][href$="/work/crystaloz.html"]') ||
           [].slice.call(sec.querySelectorAll('a[data-framer-name="Project"]')).filter(function(a){return /Crystal\s*OZ/i.test(a.textContent||'');})[0];
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
    var template=findTemplate(sec);if(!template)return;
    cards.appendChild(buildHost('vp-home-clones',template));
  }

  function injectWork(){
    var old=document.getElementById('vp-work-clones');if(old)old.remove();
    var sec=document.querySelector('section[data-framer-name="Work"]');if(!sec)return;
    var num=sec.querySelector('[data-framer-name="Number"] h3');if(num)num.textContent='(10)';
    var template=findTemplate(sec);if(!template)return;
    var parent=template.parentElement||sec;
    parent.appendChild(buildHost('vp-work-clones',template));
  }

  function run(){
    ensureStyle();
    var path=(location.pathname||'').toLowerCase();
    var file=(path.split('/').pop()||'');
    if(file===''||file==='index.html'||file==='farmer'){disableJournal();if(!document.getElementById('vp-home-clones'))injectHome();}
    if(file==='work.html'&&!document.getElementById('vp-work-clones'))injectWork();
  }

  document.addEventListener('click',function(e){
    var a=e.target&&e.target.closest?e.target.closest('a[href]'):null;if(!a)return;
    var h=a.getAttribute('href')||'';
    if(DISABLED.some(function(x){return h===x||h.endsWith('/'+x)})){e.preventDefault();e.stopImmediatePropagation();}
  },true);

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
  [80,250,600,1200,2500,5000].forEach(function(t){setTimeout(run,t);});
})();