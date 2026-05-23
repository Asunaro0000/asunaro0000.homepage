/**
 * Asunaro Works 統合計測スクリプト (最終安定版)
 * GA4 / Pinterest / Click / Scroll / Debug 全盛り
 */
(function() {
    const head = document.getElementsByTagName('head')[0];

    // AI学習を拒否するタグを生成
    const metaNoAI = document.createElement('meta');
    metaNoAI.name = 'robots';
    metaNoAI.content = 'noai';
    head.appendChild(metaNoAI);

    const metaNoImageAI = document.createElement('meta');
    metaNoImageAI.name = 'robots';
    metaNoImageAI.content = 'noimageai';
    head.appendChild(metaNoImageAI);
})();
// --- (1) タグの読み込みと初期化 ---
const initAsunaroTags = () => {
  // GA4
  var gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-1NCR09VMKR';
  document.head.appendChild(gaScript);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function(){dataLayer.push(arguments);};
  gtag('js', new Date());
  
  // 自動スクロール計測をオフにし、手動の監視と衝突させない
  gtag('config', 'G-1NCR09VMKR', { 
    'debug_mode': true,
    'enhanced_measurement': false 
  });

  // Pinterest
  !function(e){if(!window.pintrk){window.pintrk=function(){window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var n=window.pintrk;n.queue=[],n.version="3.0";var t=document.createElement("script");t.async=!0,t.src=e;var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/lib/main.js");
  pintrk('load', '2612917956775');
  pintrk('page');
};

// 実行開始
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAsunaroTags);
} else {
  initAsunaroTags();
}

// --- (2) 統合送信関数 ---
window.logEvent = function(name, label, extra = {}) {
  const ts = new Date().toLocaleTimeString() + "." + new Date().getMilliseconds();
  const params = { event_label: label, ts: Date.now(), ...extra };

  // コンソールに目立つように表示 (デバッグ用)
  console.log(`%c[EVENT] ${ts} | ${name} | ${label}`, "background: #222; color: #00ff00; font-weight: bold; border-left: 4px solid #00ff00; padding: 2px 8px;");

  // 各プラットフォームへ送信
  if (typeof gtag === 'function') gtag('event', name, params);
  if (typeof pintrk === 'function') pintrk('track', name, params);
};

// --- (3) 全クリック監視 (最優先割り込みモード) ---
window.addEventListener('click', (e) => {
  const target = e.target.closest('button, a, [onclick], [data-image-id], .ctrl, .btn, img, .ga-track');
  if (target) {
    const label = target.innerText.trim() || 
                  target.getAttribute('data-image-id') || 
                  target.getAttribute('onclick') || 
                  target.getAttribute('aria-label') ||
                  target.getAttribute('src')?.split('/').pop() ||
                  'interaction';

    window.logEvent('user_click', label, { element: target.tagName });
  }
}, { capture: true, passive: true });

// --- (4) スクロール継続監視 (最初の一回で終わらせない) ---
let lastLoggedPos = 0;
let isScrolling = false;

window.addEventListener('scroll', () => {
  if (!isScrolling) {
    window.requestAnimationFrame(() => {
      const currentPos = window.scrollY;
      // 200px動くごとに「動いていること」を証明するログを出す
      if (Math.abs(currentPos - lastLoggedPos) > 200) {
        window.logEvent('user_scroll', `Pos: ${Math.round(currentPos)}px`);
        lastLoggedPos = currentPos;
      }
      isScrolling = false;
    });
    isScrolling = true;
  }
}, { passive: true });


console.log('%c🚀 System Online: All events are being monitored.', 'color: #00ccff; font-weight: bold;');