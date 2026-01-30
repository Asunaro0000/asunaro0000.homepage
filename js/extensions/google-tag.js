/**
 * Asunaro Works 統合計測スクリプト (デバッグ特化型)
 */

// --- (1) GA4 & Pinterest 読み込み (従来通り) ---
var gaScript = document.createElement('script');
gaScript.async = true;
gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-1NCR09VMKR';
document.head.appendChild(gaScript);

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-1NCR09VMKR', { 'debug_mode': true });

!function(e){if(!window.pintrk){window.pintrk=function(){window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var n=window.pintrk;n.queue=[],n.version="3.0";var t=document.createElement("script");t.async=!0,t.src=e;var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/lib/main.js");
pintrk('load', '2612917956775');
pintrk('page');

// --- (2) 送信窓口 (コンソール表示を最優先) ---
window.sendGAEvent = function(eventName, params) {
  // ブラウザのコンソールに「時刻・回数・内容」をハッキリ出す
  const now = new Date();
  const timeStr = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + "." + now.getMilliseconds();
  
  console.group("%c🖱️ クリック検知: " + timeStr, "color: #ffd54a; background: #222; padding: 2px 5px; border-radius: 3px;");
  console.log("イベント:", eventName);
  console.log("詳細データ:", params);
  console.groupEnd();

  // 実際の送信処理
  gtag('event', eventName, { ...params, ts: Date.now() });
  pintrk('track', eventName, { ...params, ts: Date.now() });
};

// --- (3) 全クリック監視 (伝搬・競合対策済み) ---
document.addEventListener('click', (e) => {
  // .closest() で親要素に遡ってインタラクティブな要素を探す
  const target = e.target.closest('button, a, [onclick], [data-image-id], .btn, .ctrl, .calendar-strip img');
  
  if (target) {
    // 1. ラベルの取得
    const label = target.innerText.trim() || 
                  target.getAttribute('data-image-id') || 
                  target.getAttribute('onclick') || 
                  target.getAttribute('aria-label') ||
                  target.getAttribute('src') ||
                  'unnamed_element';

    // 2. 送信関数を呼ぶ
    window.sendGAEvent('click_action', {
      event_category: 'user_interaction',
      event_label: label,
      element_type: target.tagName.toLowerCase()
    });
  }
}, { capture: true, passive: true }); // capture: true で他のスクリプトに邪魔されずに捕まえる

console.log('%c🚀 デバッグシステム：全クリック監視中...', 'color: #00ff00; font-weight: bold;');