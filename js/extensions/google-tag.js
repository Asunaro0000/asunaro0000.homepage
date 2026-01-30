/**
 * Asunaro Works 統合計測スクリプト (GA4 + Pinterest Tag)
 * 2026-01-30 最終安定版
 */

// --- (1) GA4 (gtag.js) の読み込み ---
var gaScript = document.createElement('script');
gaScript.async = true;
gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-1NCR09VMKR';
document.head.appendChild(gaScript);

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-1NCR09VMKR');

// --- (2) Pinterest Tag の読み込み ---
!function(e){if(!window.pintrk){window.pintrk=function(){window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var n=window.pintrk;n.queue=[],n.version="3.0";var t=document.createElement("script");t.async=!0,t.src=e;var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/lib/main.js");

pintrk('load', '2612917956775');
pintrk('page');

// --- (3) 共通送信関数（窓口） ---
window.sendGAEvent = function(eventName, params) {
  // GA4へ送信
  gtag('event', eventName, params);
  // Pinterestへも送信
  pintrk('track', eventName, params);
  
  console.log('📊 計測送信:', eventName, params);
};

// --- (4) 合体システム（超強化版） ---
const startAsunaroTracking = () => {
  let retryCount = 0;
  const maxRetries = 60; // 200ms × 60回 ＝ 最大12秒間探し続ける

  const attachTracking = () => {
    // window.renderAt が存在するか、直接 renderAt が存在するかチェック
    const targetFunc = window.renderAt || (typeof renderAt === 'function' ? renderAt : null);

    if (targetFunc && !targetFunc.isTracked) {
      const original = targetFunc;
      
      // グローバル関数を上書きして計測を差し込む
      window.renderAt = function(idx) {
        original(idx);
        window.sendGAEvent('interact', { 
          event_category: 'storyboard', 
          event_label: 'scene_' + idx,
          value: idx 
        });
      };
      
      window.renderAt.isTracked = true;
      console.log('✅ 【成功】計測機能をストーリーボードに合体しました');
    } 
    else if (retryCount < maxRetries) {
      retryCount++;
      setTimeout(attachTracking, 200);
    } 
    else {
      console.warn('⚠️ 【警告】ストーリーボード関数が見つかりませんでした。独自実装ページでない可能性があります。');
    }
  };

  attachTracking();

  // クリック計測の初期化
  document.addEventListener('click', (e) => {
    const trackTarget = e.target.closest('[data-track], [data-image-id], .ga-track');
    if (trackTarget) {
      const label = trackTarget.dataset.track || trackTarget.dataset.imageId || trackTarget.innerText || 'unnamed_click';
      window.sendGAEvent('click', { 
        event_category: 'ui_interaction', 
        event_label: label.trim() 
      });
    }
  }, true);
};

// 実行開始（ページの読み込み状態に関わらず即座に監視開始）
startAsunaroTracking();