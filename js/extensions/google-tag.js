/**
 * Asunaro Works 統合計測スクリプト (イベント奪取・最優先版)
 */

// --- (1) 基本設定 (GA4 & Pinterest) ---
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

// --- (2) 送信関数 ---
window.sendGAEvent = function(label) {
  const params = {
    event_category: 'user_interaction',
    event_label: label,
    ts: Date.now()
  };
  console.log("%c📊 計測実行: " + label, "color: #00ff00; font-weight: bold; border: 1px solid #00ff00; padding: 2px;");
  gtag('event', 'click_action', params);
  pintrk('track', 'click_action', params);
};

// --- (3) 【重要】最優先のクリック監視 ---
// 第3引数を true にすることで、他のスクリプトが動く「前」に割り込みます
window.addEventListener('click', (e) => {
  // クリックされた地点の要素を特定
  const target = e.target.closest('button, a, [onclick], [data-image-id], .ctrl, .btn, img');
  
  if (target) {
    const label = target.innerText.trim() || 
                  target.getAttribute('data-image-id') || 
                  target.getAttribute('aria-label') ||
                  target.getAttribute('src') ||
                  'interactive_element';

    window.sendGAEvent(label);
  }
}, true); // ← この 'true' が、横取りを可能にする魔法のパラメータです

console.log('%c🔥 [緊急対策] クリック横取りモード起動完了', 'color: #ff0000; font-weight: bold;');