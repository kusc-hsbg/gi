(function () {
  var PROJECTS = [
    {
      slug: 'patchking',
      title: 'PATCHKING',
      category: 'Brand Identity / Streetwear',
      image: 'assets/img/projects/patchking.svg',
      href: 'work/patchking.html',
      statement: '스트리트의 시선을 사로잡는 디자인, PATCHKING®. 로고와 캐릭터, 비주얼 시스템을 패치와 굿즈, 의류까지 확장했습니다.'
    },
    {
      slug: 'teoljabi',
      title: '국민털잡이',
      category: 'Brand & Editorial / Beauty',
      image: 'assets/img/projects/teoljabi.svg',
      href: 'work/teoljabi.html',
      statement: '합리적인 가격과 직관적인 사용성을 중심으로 누구나 쉽게 접근할 수 있는 셀프 왁싱 브랜드 경험을 정리했습니다.'
    },
    {
      slug: 'soulju',
      title: 'SOULJU',
      category: 'Brand Identity / Hospitality',
      image: 'assets/img/projects/soulju.svg',
      href: 'work/soulju.html',
      statement: '딥그린을 중심으로 메뉴, 사이니지, 그래픽 터치포인트 전반을 하나의 환대 경험으로 연결했습니다.'
    },
    {
      slug: 'bibimcha',
      title: 'BIBIMCHA',
      category: 'Brand Identity / F&B',
      image: 'assets/img/projects/bibimcha.svg',
      href: 'work/bibimcha.html',
      statement: 'Your Bowl, Your Rules. 고객의 방식대로 완성되는 한 그릇을 빠르고 대담한 브랜드 경험으로 설계했습니다.'
    },
    {
      slug: 'davinci-code',
      title: 'DAVINCI CODE',
      category: 'Brand Identity / Beauty',
      image: 'assets/img/projects/davinci-code.svg',
      href: 'work/davinci-code.html',
      statement: '다빈치의 비례와 조형 언어를 현대적인 선케어 혁신과 결합해 철학, 키비주얼, 제품 스토리까지 이어지는 아이덴티티를 구축했습니다.'
    }
  ];

  function ensureStyle() {
    if (document.getElementById('veldy-projects-style')) return;
    var style = document.createElement('style');
    style.id = 'veldy-projects-style';
    style.textContent =
      '.vpj-home-more,.vpj-work-more{box-sizing:border-box;color:#fff;font-family:"Inter Display","Inter Display Placeholder",Arial,sans-serif}' +
      '.vpj-home-more *,.vpj-work-more *{box-sizing:border-box}' +
      '.vpj-home-more{position:relative;max-width:1480px;height:920px;margin:0 auto;padding:72px 24px 100px;overflow:hidden}' +
      '.vpj-scatter-card{position:absolute;display:block;color:#fff;text-decoration:none;transition:transform .45s cubic-bezier(.2,.7,.2,1),opacity .3s ease}' +
      '.vpj-scatter-card:hover{z-index:20;transform:translateY(-10px) rotate(0deg)!important}' +
      '.vpj-scatter-media{width:100%;height:100%;overflow:hidden;border-radius:10px;background:#111}' +
      '.vpj-scatter-media img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .55s ease}' +
      '.vpj-scatter-card:hover img{transform:scale(1.035)}' +
      '.vpj-scatter-meta{display:flex;justify-content:space-between;gap:16px;padding-top:10px;font-size:14px;line-height:1.25}' +
      '.vpj-scatter-meta span:last-child{color:#999;text-align:right}' +
      '.vpj-scatter-card:nth-child(1){left:3%;top:85px;width:30%;height:310px;transform:rotate(-4deg)}' +
      '.vpj-scatter-card:nth-child(2){left:38%;top:18px;width:25%;height:270px;transform:rotate(2.5deg)}' +
      '.vpj-scatter-card:nth-child(3){right:3%;top:135px;width:28%;height:330px;transform:rotate(-2deg)}' +
      '.vpj-scatter-card:nth-child(4){left:18%;bottom:80px;width:27%;height:300px;transform:rotate(3deg)}' +
      '.vpj-scatter-card:nth-child(5){right:20%;bottom:34px;width:31%;height:315px;transform:rotate(-3.5deg)}' +
      '.vpj-work-more{width:100%;padding:48px 0 120px}' +
      '.vpj-work-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:56px 24px;width:100%}' +
      '.vpj-work-card{display:block;color:#fff;text-decoration:none;min-width:0}' +
      '.vpj-work-img{aspect-ratio:1.38/1;border-radius:10px;overflow:hidden;background:#111}' +
      '.vpj-work-img img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .5s ease}' +
      '.vpj-work-card:hover img{transform:scale(1.025)}' +
      '.vpj-work-meta{display:grid;grid-template-columns:1fr auto;gap:18px;padding:14px 0 0;border-bottom:1px solid rgba(187,187,187,.2);padding-bottom:18px}' +
      '.vpj-work-title{font-size:19px;font-weight:500;line-height:1.25}' +
      '.vpj-work-cat{font-size:14px;color:#999;text-align:right;line-height:1.35}' +
      '@media(max-width:809.98px){' +
        '.vpj-home-more{height:auto;padding:42px 20px 70px;display:grid;grid-template-columns:1fr;gap:32px;overflow:visible}' +
        '.vpj-scatter-card{position:relative!important;left:auto!important;right:auto!important;top:auto!important;bottom:auto!important;width:100%!important;height:auto!important;transform:none!important}' +
        '.vpj-scatter-media{aspect-ratio:1.35/1;height:auto}' +
        '.vpj-scatter-meta{font-size:13px}' +
        '.vpj-work-more{padding:30px 0 80px}' +
        '.vpj-work-grid{grid-template-columns:1fr;gap:38px}' +
      '}';
    document.head.appendChild(style);
  }

  function disableJournalLinks() {
    var disabled = [
      'article/hemingway-audio.html',
      'article/soulju.html',
      'article/raven-claw.html',
      'article/essel.html'
    ];
    disabled.forEach(function (href) {
      [].slice.call(document.querySelectorAll('a[href="' + href + '"]')).forEach(function (a) {
        a.removeAttribute('href');
        a.setAttribute('aria-disabled', 'true');
        a.style.cursor = 'default';
        a.querySelectorAll('[data-framer-cursor]').forEach(function (n) {
          n.removeAttribute('data-framer-cursor');
          n.style.cursor = 'default';
        });
        a.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); });
      });
    });
  }

  function makeScatterCard(p) {
    var a = document.createElement('a');
    a.className = 'vpj-scatter-card';
    a.href = p.href;
    a.innerHTML =
      '<div class="vpj-scatter-media"><img loading="lazy" src="' + p.image + '" alt="' + p.title + '"></div>' +
      '<div class="vpj-scatter-meta"><span>' + p.title + '</span><span>' + p.category + '</span></div>';
    return a;
  }

  function injectHome() {
    if (document.getElementById('vpj-home-more')) return;
    var target = document.querySelector('[data-framer-name="Scroll Animation Section"]');
    if (!target) return;
    var section = document.createElement('section');
    section.id = 'vpj-home-more';
    section.className = 'vpj-home-more';
    PROJECTS.forEach(function (p) { section.appendChild(makeScatterCard(p)); });
    target.insertAdjacentElement('afterend', section);
  }

  function injectWork() {
    if (document.getElementById('vpj-work-more')) return;
    var container = document.querySelector('[data-framer-name="Work"] [data-framer-name="Container"]');
    if (!container) return;

    var num = container.querySelector('[data-framer-name="Number"] h3');
    if (num && /^\(5\)$/.test((num.textContent || '').trim())) num.textContent = '(10)';

    var section = document.createElement('section');
    section.id = 'vpj-work-more';
    section.className = 'vpj-work-more';
    var grid = document.createElement('div');
    grid.className = 'vpj-work-grid';

    PROJECTS.forEach(function (p, idx) {
      var a = document.createElement('a');
      a.className = 'vpj-work-card';
      a.href = p.href;
      a.innerHTML =
        '<div class="vpj-work-img"><img loading="lazy" src="' + p.image + '" alt="' + p.title + '"></div>' +
        '<div class="vpj-work-meta"><div class="vpj-work-title">' + p.title + '</div>' +
        '<div class="vpj-work-cat">' + p.category + '<br>(' + String(idx + 6).padStart(2, '0') + ')</div></div>';
      grid.appendChild(a);
    });
    section.appendChild(grid);
    container.appendChild(section);
  }

  function run() {
    ensureStyle();
    var path = location.pathname.toLowerCase();
    if (path.endsWith('/index.html') || path.endsWith('/farmer/') || path === '/') {
      disableJournalLinks();
      injectHome();
    }
    if (path.endsWith('/work.html')) injectWork();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();

  setTimeout(run, 500);
  setTimeout(run, 1400);
})();