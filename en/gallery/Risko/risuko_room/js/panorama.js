// panorama.js
const pano = document.getElementById('panorama');
const gotoBtn = document.querySelector('#panoGoto .pano-goto__btn');

// --- ベースパスの自動解決（修正版） ---
// file: プロトコルではない、かつ hostname に github が含まれるなら GitHub とみなす
const isGitHub = window.location.hostname.includes('github.io');
const isLocal = window.location.protocol === 'file:';

// GitHub上ならリポジトリ名ありのパス、そうでなければルートからのパス
// ※画像のエラー状況から、GitHub上ではリポジトリ名が必要なことが確定しています
const base = (isGitHub && !isLocal) 
  ? '/asunaro0000.homepage/gallery/Risko/risuko_room' 
  : '/gallery/Risko/risuko_room';

console.log("Current Mode: ", isGitHub ? "GitHub" : "Local");
console.log("Base Path: ", base);

// --- 画像を横に並べる ---
for (let i = 1; i <= 21; i++) {
  const img = document.createElement('img');
  img.src = `${base}/images/${i}.webp`;
  img.alt = `Risuko panorama ${i}`;
  pano.appendChild(img);
}

// ============================
// 自動スクロール
// ============================

let autoScroll = false;
let rafId = null;
const SPEED = 2.5;
let activated = false;

function activateButton() {
  if (activated) return;
  activated = true;
  gotoBtn.classList.remove('pano-disabled');
}

gotoBtn.addEventListener('click', (e) => {
  if (!activated) {
    e.preventDefault();
  }
});

function step() {
  if (!autoScroll) return;

  pano.scrollLeft += SPEED;
  const end = pano.scrollWidth - pano.clientWidth;

  if (pano.scrollLeft >= end - 2) {
    autoScroll = false;
    if (rafId !== null) cancelAnimationFrame(rafId);
    activateButton();
    return;
  }

  rafId = requestAnimationFrame(step);
}

// ★ パノラマクリック：自動送りON/OFF ＋ 初回はBGMにスタート依頼
pano.addEventListener('click', () => {
  if (window.bgmControl && window.bgmControl.playOnFirstInteraction) {
    window.bgmControl.playOnFirstInteraction();
  }

  autoScroll = !autoScroll;

  if (autoScroll && rafId === null) {
    rafId = requestAnimationFrame(step);
  } else if (!autoScroll && rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
});

// 手動スクロールでも最後まで行けばボタン有効化
pano.addEventListener('scroll', () => {
  const end = pano.scrollWidth - pano.clientWidth;
  if (pano.scrollLeft >= end - 2) {
    activateButton();
  }
});

// ============================
// スマホスワイプ
// ============================

let pDown = false;
let pStartX = 0;
let pScroll = 0;

pano.addEventListener('pointerdown', e => {
  if (e.pointerType === 'mouse') return;
  pDown = true;
  pStartX = e.clientX;
  pScroll = pano.scrollLeft;
  pano.setPointerCapture(e.pointerId);
});

pano.addEventListener('pointermove', e => {
  if (!pDown) return;
  pano.scrollLeft = pScroll - (e.clientX - pStartX);
});

pano.addEventListener('pointerup', e => {
  if (!pDown) return;
  pDown = false;
  pano.releasePointerCapture(e.pointerId);
});

pano.addEventListener('pointercancel', e => {
  if (!pDown) return;
  pDown = false;
  pano.releasePointerCapture(e.pointerId);
});
