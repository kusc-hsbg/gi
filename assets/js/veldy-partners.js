/*
 * veldy-partners.js — independent PARTNERS (subscription) section
 *
 * Recreates the veldy.co.kr/Partnership page as a self-contained section in OUR
 * dark editorial style (black canvas, gold brand accent, Inter/Inter Display,
 * thin 0.2 divider lines) — not the cream/brown original. It carries its own
 * markup + styles and is NOT part of Framer's DOM tree, so Framer's hydration
 * and responsive re-renders can never delete it. On boot it inserts itself
 * directly ABOVE the FAQ section (".framer-122h8qz", the "구독 서비스는 어떤
 * 방식으로 운영되나요?" block) and a MutationObserver keeps it anchored there if
 * Framer re-renders. The "지금 구독하기" CTA links to contact.html, which the
 * shared veldy-inquiry.js delegates on to open the PROJECT INQUIRY form.
 */
(function () {
  var FAQ_SEL = '.framer-122h8qz';

  var ROLES = [
    '브랜딩 디렉터', '챗봇 디자이너', '그래픽 디자이너', '커뮤니케이션 디자이너',
    '모션 그래픽 디자이너', '시각 디자이너', '웹 디자이너', '패키지 디자이너',
    '웹사이트 프로듀서', '비즈니스 컨설턴트', '마케팅 어드바이저', '마케팅 매니저',
    '프로젝트 매니저', '브랜드 저널리스트', '콘텐츠 작가', '콘텐츠 PD',
    '교정·교열·윤문 에디터', '촬영 감독', '영상 편집자', '번역가', '출판 담당자'
  ];
  var WHYS = [
    '실력 있는 전문가가 필요하신가요?',
    '직원 채용·관리 때문에 고민이신가요?',
    '고용 비용이 부담이신가요?'
  ];

  var CSS =
'#veldy-partners{--vp-bg:var(--token-2d91bfb1-1bb0-467e-bf37-8ef020f4f815,#000);--vp-fg:var(--token-9811e40b-3ed8-4237-98e5-61535bb22d2f,#fff);--vp-mut:var(--token-e5a511bf-849c-4ac6-b942-175c537ace13,#bbb);--vp-dim:var(--token-af1df47b-ea84-448e-bdf0-a5ce0f875a59,#999);--vp-line:var(--token-01c07c7e-a9ae-45ca-a79a-cc49e2fa5e89,rgba(187,187,187,.2));--vp-gold:#d8c36e;--vp-gold-2:#b9a04f;background:var(--vp-bg);color:var(--vp-fg);width:100%;font-family:"Inter","Inter Placeholder",sans-serif;-webkit-font-smoothing:antialiased}' +
'#veldy-partners *{box-sizing:border-box}' +
'#veldy-partners .vp-inner{max-width:1200px;margin:0 auto;padding:clamp(72px,10vw,140px) 24px}' +
'#veldy-partners .vp-labelrow{display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--vp-line);padding-top:18px;margin-bottom:clamp(48px,7vw,96px)}' +
'#veldy-partners .vp-eyebrow{margin:0;font-size:12px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--vp-dim)}' +
'#veldy-partners .vp-kicker{margin:0 0 22px;font-size:13px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:var(--vp-gold)}' +
'#veldy-partners .vp-title{margin:0;font-family:"Inter Display","Inter","Inter Placeholder",sans-serif;font-weight:600;font-size:clamp(34px,6.2vw,76px);line-height:1.04;letter-spacing:-.025em;color:var(--vp-fg)}' +
'#veldy-partners .vp-title em{font-style:normal;color:var(--vp-gold)}' +
'#veldy-partners .vp-lede{margin:26px 0 0;max-width:46ch;font-size:clamp(15px,1.7vw,19px);line-height:1.6;color:var(--vp-mut)}' +
'#veldy-partners .vp-cta{display:flex;flex-wrap:wrap;gap:12px;margin-top:clamp(34px,4vw,48px)}' +
'#veldy-partners .vp-btn{display:inline-flex;align-items:center;gap:.5em;padding:15px 28px;border-radius:999px;font-size:15px;font-weight:600;letter-spacing:.01em;text-decoration:none;cursor:pointer;transition:transform .2s ease,background .2s ease,color .2s ease,border-color .2s ease;border:1px solid transparent}' +
'#veldy-partners .vp-btn-primary{background:var(--vp-gold);color:#2a2410}' +
'#veldy-partners .vp-btn-primary:hover{transform:translateY(-2px);background:var(--vp-gold-2)}' +
'#veldy-partners .vp-btn-ghost{background:transparent;color:var(--vp-fg);border-color:var(--vp-line)}' +
'#veldy-partners .vp-btn-ghost:hover{border-color:var(--vp-fg);transform:translateY(-2px)}' +
'#veldy-partners .vp-why{margin-top:clamp(72px,9vw,128px)}' +
'#veldy-partners .vp-sub-kicker{margin:0 0 26px;font-size:12px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:var(--vp-dim)}' +
'#veldy-partners .vp-why-list{list-style:none;margin:0;padding:0;border-top:1px solid var(--vp-line)}' +
'#veldy-partners .vp-why-item{display:flex;align-items:baseline;gap:20px;padding:clamp(20px,3vw,34px) 0;border-bottom:1px solid var(--vp-line)}' +
'#veldy-partners .vp-why-mark{flex:none;font-family:"Inter Display","Inter",sans-serif;font-size:clamp(20px,2.4vw,30px);font-weight:600;color:var(--vp-gold);line-height:1}' +
'#veldy-partners .vp-why-text{font-family:"Inter Display","Inter",sans-serif;font-size:clamp(21px,3vw,40px);font-weight:600;letter-spacing:-.02em;line-height:1.2;color:var(--vp-fg)}' +
'#veldy-partners .vp-roles{margin-top:clamp(72px,9vw,128px)}' +
'#veldy-partners .vp-roles-head{max-width:640px;margin-bottom:clamp(36px,5vw,60px)}' +
'#veldy-partners .vp-roles-title{margin:0;font-family:"Inter Display","Inter",sans-serif;font-weight:600;font-size:clamp(26px,3.6vw,46px);line-height:1.12;letter-spacing:-.02em;color:var(--vp-fg)}' +
'#veldy-partners .vp-roles-desc{margin:18px 0 0;font-size:clamp(15px,1.7vw,18px);line-height:1.65;color:var(--vp-mut)}' +
'#veldy-partners .vp-role-grid{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--vp-line);border-left:1px solid var(--vp-line)}' +
'#veldy-partners .vp-role{display:flex;align-items:center;gap:12px;padding:22px 20px;border-right:1px solid var(--vp-line);border-bottom:1px solid var(--vp-line);transition:background .2s ease}' +
'#veldy-partners .vp-role:hover{background:rgba(216,195,110,.06)}' +
'#veldy-partners .vp-role-no{font-size:11px;font-weight:500;letter-spacing:.08em;color:var(--vp-dim);font-variant-numeric:tabular-nums}' +
'#veldy-partners .vp-role:hover .vp-role-no{color:var(--vp-gold)}' +
'#veldy-partners .vp-role-name{font-size:clamp(14px,1.5vw,16px);font-weight:500;letter-spacing:-.01em;color:var(--vp-fg)}' +
'#veldy-partners .vp-foot{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px;margin-top:clamp(48px,6vw,80px);padding-top:22px;border-top:1px solid var(--vp-line)}' +
'#veldy-partners .vp-foot p{margin:0;font-size:14px;line-height:1.6;color:var(--vp-mut);max-width:52ch}' +
'@media (max-width:1024px){#veldy-partners .vp-role-grid{grid-template-columns:repeat(3,1fr)}}' +
'@media (max-width:768px){#veldy-partners .vp-role-grid{grid-template-columns:repeat(2,1fr)}#veldy-partners .vp-why-item{gap:14px}}' +
'@media (max-width:480px){#veldy-partners .vp-role-grid{grid-template-columns:1fr}}';

  function pad2(n) { return (n < 10 ? '0' : '') + n; }

  function buildHTML() {
    var whyItems = WHYS.map(function (w) {
      return '<li class="vp-why-item"><span class="vp-why-mark">?</span><span class="vp-why-text">' + w + '</span></li>';
    }).join('');
    var roleItems = ROLES.map(function (r, i) {
      return '<li class="vp-role"><span class="vp-role-no">' + pad2(i + 1) + '</span><span class="vp-role-name">' + r + '</span></li>';
    }).join('');

    return '<div class="vp-inner">' +
      '<div class="vp-labelrow"><h6 class="vp-eyebrow">&copy; Partners</h6><h6 class="vp-eyebrow">(VELDY&reg; &mdash; 구독제)</h6></div>' +
      '<div class="vp-hero"><p class="vp-kicker">PARTNERS</p>' +
      '<h2 class="vp-title">1인 급여로<br>전문 디자이너가 포함된<br><em>업무팀을 구독</em>하세요</h2>' +
      '<p class="vp-lede">한 명을 채용하는 비용으로, 브랜딩·디자인·마케팅·콘텐츠 전문가가 한 팀으로 움직입니다. 필요한 만큼 구독하고, 필요 없을 땐 멈추세요.</p>' +
      '<div class="vp-cta"><a class="vp-btn vp-btn-primary" href="contact.html">지금 구독하기 →</a>' +
      '<a class="vp-btn vp-btn-ghost" href="https://pf.kakao.com/_WYExcs" target="_blank" rel="noopener">카카오톡 상담</a></div></div>' +
      '<div class="vp-why"><p class="vp-sub-kicker">WHY SUBSCRIBE?</p><ul class="vp-why-list">' + whyItems + '</ul></div>' +
      '<div class="vp-roles"><div class="vp-roles-head">' +
      '<h3 class="vp-roles-title">전문가 팀을 통째로 구독하세요</h3>' +
      '<p class="vp-roles-desc">브랜딩부터 마케팅·콘텐츠·영상·출판까지, 21개 직군의 전문가가 하나의 팀으로 프로젝트를 책임집니다.</p></div>' +
      '<ul class="vp-role-grid">' + roleItems + '</ul></div>' +
      '<div class="vp-foot"><p>채용·4대보험·관리 부담 없이, 매월 구독으로 전문가 팀을 운영하세요. 자세한 구독 방식은 아래 자주 묻는 질문에서 확인하실 수 있습니다.</p>' +
      '<a class="vp-btn vp-btn-ghost" href="contact.html">구독 상담 신청</a></div>' +
      '</div>';
  }

  function ensureStyle() {
    if (document.getElementById('veldy-partners-style')) return;
    var s = document.createElement('style');
    s.id = 'veldy-partners-style';
    s.textContent = CSS;
    (document.head || document.documentElement).appendChild(s);
  }

  function getNode() {
    var n = document.getElementById('veldy-partners');
    if (n) return n;
    var sec = document.createElement('section');
    sec.id = 'veldy-partners';
    sec.setAttribute('data-framer-name', 'Partners');
    sec.setAttribute('data-vldy-independent', '1');
    sec.innerHTML = buildHTML();
    return sec;
  }

  var observer = null;
  function placed() {
    var node = document.getElementById('veldy-partners');
    var faq = document.querySelector(FAQ_SEL);
    return !!(node && faq && node.nextElementSibling === faq && node.parentNode === faq.parentNode);
  }

  function place() {
    ensureStyle();
    var faq = document.querySelector(FAQ_SEL);
    if (!faq || !faq.parentNode) return;           // FAQ not rendered yet — try again later
    if (placed()) return;                          // already anchored, nothing to do
    var node = getNode();
    // Disconnect while we mutate so our own insertion doesn't retrigger us.
    if (observer) observer.disconnect();
    faq.parentNode.insertBefore(node, faq);
    if (observer) observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  var pending = false;
  function apply() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(function () { pending = false; try { place(); } catch (e) {} });
  }

  function boot() {
    apply();
    // Framer hydration/layout settles over time and can re-render the region.
    [120, 300, 600, 1000, 1600, 2600, 4000].forEach(function (t) { setTimeout(apply, t); });
    window.addEventListener('load', apply);
    window.addEventListener('resize', apply);
    try {
      observer = new MutationObserver(function () { if (!placed()) apply(); });
      observer.observe(document.documentElement, { childList: true, subtree: true });
    } catch (e) {}
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
