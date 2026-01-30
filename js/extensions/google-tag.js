/**
 * Asunaro Works 統合計測スクリプト (全クリック捕捉版)
 */

// --- (1) GA4 & Pinterest 読み込み ---
var gaScript = document.createElement('script');
gaScript.async = true;
gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-1NCR09VMKR';
document.head.appendChild(gaScript);

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-1NCR09VMKR');

!function(e){if(!window.pintrk){window.pintrk=function(){window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var n=window.pintrk;n.queue=[],n.version="3.0";var t=document.createElement("script");t.async=!0,t.src=e;var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/lib/main.js");
pintrk('load', '2612917956775');
pintrk('page');

// --- (2) 送信ボタン（窓口） ---
window.sendGAEvent = function(eventName, params) {
  gtag('event', eventName, params);
  pintrk('track', eventName, params);
  console.log('📊 送信:', eventName, params);
};

// --- (3) 全クリック監視（条件無視） ---
document.addEventListener('click', (e) => {
  // クリックされた要素、またはその親にある「ボタン」や「リンク」を探す
  const target = e.target.closest('button, a, [onclick], [data-image-id], .btn');
  
  if (target) {
    // ラベルとして使う情報をかき集める（テキスト、ID、または直接のコード）
    const label = target.innerText.trim() || 
                  target.getAttribute('data-image-id') || 
                  target.getAttribute('onclick') || 
                  'unnamed_element';

    window.sendGAEvent('click_action', {
      event_category: 'user_interaction',
      event_label: label
    });
  }
}, true);

console.log('🚀 計測システム起動：全クリックの監視を開始しました');