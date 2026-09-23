/*
 * veldy-partners.js — independent PARTNERS (subscription) section
 *
 * Presents the veldy.co.kr/Partnership content as a section that matches THIS
 * site's own visual language exactly — pure black canvas, white Inter Display
 * headings, muted grey secondary text, hairline 0.2 divider lines, the three-up
 * "© Label / (VELDY® — n) / LABEL" header row, and outlined pill buttons — i.e.
 * the same components/typography the native Framer sections (FAQ, Contact, …)
 * use. No gold, no bespoke accent. Type sizes/weights/colours are lifted from
 * the site's own style presets:
 *   label   → Inter Display 13/400 #fff
 *   heading → Inter Display 49/500 #fff, -0.8px   (preset sng7in)
 *   number  → Inter Display 14/400 #fff           (preset 8vm16z)
 *   item    → Inter Display 19/500 #fff           (preset 14w8e6o)
 *
 * The section carries its own markup + styles and is kept OUTSIDE Framer's React
 * tree, injected directly above the FAQ section (".framer-122h8qz") and
 * re-anchored via a MutationObserver so hydration/re-renders can't remove it.
 * The "지금 구독하기" CTA links to contact.html, which veldy-inquiry.js delegates
 * on to open the PROJECT INQUIRY form.
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

  var CSS =
'#veldy-partners{--vp-bg:var(--token-2d91bfb1-1bb0-467e-bf37-8ef020f4f815,#000);--vp-fg:var(--token-9811e40b-3ed8-4237-98e5-61535bb22d2f,#fff);--vp-mut:var(--token-af1df47b-ea84-448e-bdf0-a5ce0f875a59,#999);--vp-mut2:var(--token-e5a511bf-849c-4ac6-b942-175c537ace13,#bbb);--vp-line:var(--token-01c07c7e-a9ae-45ca-a79a-cc49e2fa5e89,rgba(187,187,187,.2));background:var(--vp-bg);color:var(--vp-fg);width:100%;font-family:"Inter","Inter Placeholder",sans-serif;-webkit-font-smoothing:antialiased}' +
'#veldy-partners *{box-sizing:border-box}' +
'#veldy-partners .vp-inner{max-width:1480px;margin:0 auto;padding:clamp(80px,9vw,140px) 24px}' +
/* three-up header row: © PARTNERS / (VELDY® — 구독) / SUBSCRIPTION */
'#veldy-partners .vp-meta{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;align-items:center;border-top:1px solid var(--vp-line);padding-top:16px}' +
'#veldy-partners .vp-meta+ .vp-meta{border-top:1px solid var(--vp-line)}' +
'#veldy-partners .vp-meta span{font-family:"Inter Display","Inter Display Placeholder",sans-serif;font-size:13px;font-weight:400;line-height:13px;letter-spacing:0}' +
'#veldy-partners .vp-meta .m1{color:var(--vp-fg);justify-self:start}' +
'#veldy-partners .vp-meta .m2{color:var(--vp-mut);justify-self:center;text-align:center}' +
'#veldy-partners .vp-meta .m3{color:var(--vp-mut);justify-self:end;text-align:right}' +
/* hero */
'#veldy-partners .vp-hero{margin-top:clamp(40px,5vw,72px)}' +
'#veldy-partners .vp-h{margin:0;font-family:"Inter Display","Inter Display Placeholder",sans-serif;font-weight:500;font-size:clamp(30px,4.6vw,49px);line-height:1.32;letter-spacing:-.8px;color:var(--vp-fg)}' +
'#veldy-partners .vp-lede{margin:26px 0 0;max-width:52ch;font-size:clamp(15px,1.5vw,17px);line-height:1.65;color:var(--vp-mut2)}' +
'#veldy-partners .vp-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:clamp(30px,3.5vw,42px)}' +
'#veldy-partners .vp-btn{display:inline-flex;align-items:center;gap:.5em;padding:14px 26px;border-radius:100px;font-size:14px;font-weight:500;letter-spacing:.02em;text-decoration:none;cursor:pointer;border:1px solid rgba(255,255,255,.4);background:transparent;color:var(--vp-fg);transition:background .2s ease,color .2s ease,border-color .2s ease}' +
'#veldy-partners .vp-btn:hover{background:var(--vp-fg);color:var(--vp-bg);border-color:var(--vp-fg)}' +
'#veldy-partners .vp-btn.mut{border-color:rgba(255,255,255,.18);color:var(--vp-mut2)}' +
'#veldy-partners .vp-btn.mut:hover{border-color:var(--vp-fg);color:var(--vp-fg)}' +
/* two-column list block (mirrors the FAQ layout) */
'#veldy-partners .vp-block{margin-top:clamp(72px,9vw,132px)}' +
'#veldy-partners .vp-cols{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.55fr);gap:clamp(32px,5vw,72px);margin-top:clamp(40px,5vw,64px)}' +
'#veldy-partners .vp-colhead{align-self:start}' +
'#veldy-partners .vp-colhead .vp-h{font-size:clamp(26px,3.4vw,40px);line-height:1.2}' +
'#veldy-partners .vp-colhead p{margin:20px 0 0;font-size:15px;line-height:1.65;color:var(--vp-mut2);max-width:34ch}' +
'#veldy-partners .vp-list{list-style:none;margin:0;padding:0;border-top:1px solid var(--vp-line)}' +
'#veldy-partners .vp-item{display:flex;align-items:baseline;gap:clamp(20px,3vw,56px);padding:clamp(16px,1.7vw,22px) 0;border-bottom:1px solid var(--vp-line)}' +
'#veldy-partners .vp-no{flex:none;width:2ch;font-family:"Inter Display","Inter Display Placeholder",sans-serif;font-size:14px;font-weight:400;line-height:25px;letter-spacing:.1px;color:var(--vp-mut)}' +
'#veldy-partners .vp-name{font-family:"Inter Display","Inter Display Placeholder",sans-serif;font-size:clamp(17px,1.7vw,19px);font-weight:500;line-height:1.3;letter-spacing:0;color:var(--vp-fg)}' +
'#veldy-partners .vp-why{list-style:none;margin:0;padding:0}' +
'#veldy-partners .vp-why li{position:relative;padding:10px 0 10px 20px;font-size:15px;line-height:1.6;color:var(--vp-mut2)}' +
'#veldy-partners .vp-why li:before{content:"";position:absolute;left:0;top:18px;width:6px;height:6px;border-radius:50%;background:var(--vp-mut)}' +
'@media (max-width:810px){#veldy-partners .vp-cols{grid-template-columns:1fr;gap:28px}#veldy-partners .vp-meta{grid-template-columns:1fr auto;gap:8px}#veldy-partners .vp-meta .m2{display:none}}';

  function pad2(n) { return (n < 10 ? '0' : '') + n; }

  function meta(a, b, c) {
    return '<div class="vp-meta"><span class="m1">' + a + '</span><span class="m2">' + b + '</span><span class="m3">' + c + '</span></div>';
  }

  function buildHTML() {
    var roleRows = ROLES.map(function (r, i) {
      return '<li class="vp-item"><span class="vp-no">' + pad2(i + 1) + '</span><span class="vp-name">' + r + '</span></li>';
    }).join('');

    return '<div class="vp-inner">' +
      // ── hero block ─────────────────────────────────────────────
      meta('&copy; PARTNERS', '(VELDY&reg; &mdash; 구독)', 'SUBSCRIPTION') +
      '<div class="vp-hero">' +
      '<h2 class="vp-h">1인 급여로 전문 디자이너가<br>포함된 업무팀을 구독하세요.</h2>' +
      '<p class="vp-lede">한 명을 채용하는 비용으로 브랜딩·디자인·마케팅·콘텐츠 전문가 팀 전체를 매월 구독합니다. 필요한 만큼 쓰고, 필요 없을 땐 멈추면 됩니다 — 채용·4대보험·관리 부담 없이.</p>' +
      '<div class="vp-actions"><a class="vp-btn" href="contact.html">지금 구독하기</a>' +
      '<a class="vp-btn mut" href="https://pf.kakao.com/_WYExcs" target="_blank" rel="noopener">카카오톡 상담</a></div>' +
      '</div>' +
      // ── team roster block (mirrors the FAQ two-column layout) ──
      '<div class="vp-block">' +
      meta('&copy; THE TEAM', '(VELDY&reg; &mdash; 21)', 'ROLES') +
      '<div class="vp-cols">' +
      '<div class="vp-colhead"><h3 class="vp-h">구독에 포함된<br>전문가 팀.</h3>' +
      '<p>브랜딩부터 마케팅·콘텐츠·영상·출판까지, 21개 직군의 전문가가 하나의 팀으로 프로젝트를 책임집니다.</p>' +
      '<ul class="vp-why"><li>실력 있는 전문가가 필요하신가요?</li><li>직원 채용·관리가 부담이신가요?</li><li>고용 비용이 부담이신가요?</li></ul></div>' +
      '<ul class="vp-list">' + roleRows + '</ul>' +
      '</div></div>' +
      '</div>';
  }

  function ensureStyle() {
    var el = document.getElementById('veldy-partners-style');
    if (el) { if (el.textContent !== CSS) el.textContent = CSS; return; }
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
    if (observer) observer.disconnect();           // don't retrigger on our own insertion
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
