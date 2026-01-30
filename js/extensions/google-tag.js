/**
 * Asunaro Works 統合計測スクリプト (GA4 + Pinterest Tag)
 */

// --- (1) GA4 (gtag.js) の読み込みと初期設定 ---
var gaScript = document.createElement('script');
gaScript.async = true;
gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-1NCR09VMKR';
document.head.appendChild(gaScript);

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-1NCR09VMKR');

// --- (2) Pinterest Tag の読み込みと初期設定 ---
!function(e){if(!window.pintrk){window.pintrk=function(){window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var n=window.pintrk;n.queue=[],n.version="3.0";var t=document.createElement("script");t.async=!0,t.src=e;var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/lib/main.js");

pintrk('load', '2612917956775'); // あなたのピンタレストID
pintrk('page'); // ページビューを送信

// --- (3) 共通送信関数 ---
window.sendGAEvent = function(eventName, params) {
  // GA4へ送信
  gtag('event', eventName, params);
  // Pinterestへも「カスタムイベント」として送信（必要に応じて）
  pintrk('track', eventName, params);
  
  console.log('📊 計測送信:', eventName, params);
};

// --- (4) ストーリーボード合体システム (リトライ監視) ---
const initTracking = () => {
  let count = 0;
  const check = () => {
    if (typeof renderAt === 'function' && !renderAt.isTracked) {
      const original = renderAt;
      window.renderAt = function(idx) {
        original(idx);
        window.sendGAEvent('interact', { category: 'storyboard', label: idx });
      };
      renderAt.isTracked = true;
      console.log('✅ 計測機能を合体しました');
    } else if (count < 20) {
      count++;
      setTimeout(check, 200);
    }
  };
  check();

  // クリック監視
  document.addEventListener('click', (e) => {
    const track = e.target.closest('[data-track], [data-image-id]');
    if (track) {
      const label = track.dataset.track || track.dataset.imageId || track.innerText;
      window.sendGAEvent('interact', { category: 'click', label: label });
    }
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTracking);
} else {
  initTracking();
}