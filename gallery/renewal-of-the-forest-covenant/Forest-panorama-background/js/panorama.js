// panorama.js
// ------------------------------------------------------
// リス子パノラマ：セット切り替え＋無限送り＋キャプション＋進行ランプ
// ------------------------------------------------------

// DOM参照
const pano = document.getElementById('panorama');
const thumbsWrap = document.getElementById('panoThumbs');
const captionTitleEl = document.getElementById('panoTitle');
const captionTextEl = document.getElementById('panoText');
const progressDots = document.querySelectorAll('.pano-progress-dot');

const IMAGE_BASE = './assets/images/';

// 表示したいセット一覧
// images: パノラマ用に横に繋げる画像のリスト（1〜2枚想定）
const panoSets = [
  {
    id: 'set1',
    label: 'セット1',
    images: ['1-1.png', '1-2.png'],
    title: '森の入り口でひと休み',
    caption: '木漏れ日の下でリス子が一息つくセット。手前から奥へ、視線を誘う構図で森の始まりを見せています。'
  },
  {
    id: 'set2',
    label: 'セット2',
    images: ['2-1.png', '2-2.png'],
    title: '小道を駆ける足音',
    caption: '落ち葉を踏む音が聞こえてきそうなセット。少し動きのある構図で、散歩の途中のワンシーンを切り取ります。'
  },
  {
    id: 'set3',
    label: 'セット3',
    images: ['3-1.png'],
    title: '木の上の見張り台',
    caption: '枝の上から森全体を見渡すようなセット。遠くの空気感を感じられる、少しだけ静かな場面です。'
  }
];

// ============================
// 無限ループ用の状態
// ============================
let loopWidth = 0;        // 1周ぶんの幅（オリジナルのみ）
let autoScroll = false;
let rafId = null;
const SPEED = 2.5;

let currentSetIndex = 0;

// スワイプ用
let pDown = false;
let pStartX = 0;
let pScroll = 0;

// ============================
// 進行ランプ
// ============================
function resetProgress() {
  if (!progressDots.length) return;
  progressDots.forEach(dot => dot.classList.remove('is-on'));
}

function updateProgress() {
  if (!pano || !loopWidth || !progressDots.length) return;

  // ほぼ先頭なら全部消灯
  if (pano.scrollLeft <= 1) {
    resetProgress();
    return;
  }

  // 0.0〜1.0 の範囲で1周ぶんの進行度
  let ratio = pano.scrollLeft / loopWidth;
  if (ratio < 0) ratio = 0;
  if (ratio > 0.999) ratio = 0.999;

  // 0〜(dots数-1) のインデックス
  const index = Math.floor(ratio * progressDots.length);

  progressDots.forEach((dot, i) => {
    dot.classList.toggle('is-on', i <= index);
  });
}

// ============================
// 画像読み込み待ちユーティリティ
// ============================
function waitImagesLoaded(container, cb) {
  const imgs = Array.from(container.querySelectorAll('img'));
  if (imgs.length === 0) {
    cb();
    return;
  }
  let remaining = imgs.length;
  const done = () => {
    remaining -= 1;
    if (remaining <= 0) cb();
  };
  imgs.forEach(img => {
    if (img.complete) {
      done();
    } else {
      img.addEventListener('load', done, { once: true });
      img.addEventListener('error', done, { once: true });
    }
  });
}

// ============================
// セット読み込み＋無限ループ化
// ============================
function stopAutoScroll() {
  autoScroll = false;
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}

function startAutoScroll() {
  autoScroll = true;
  if (rafId === null) {
    rafId = requestAnimationFrame(step);
  }
}

function loadSet(index) {
  const set = panoSets[index];
  if (!set || !pano) return;

  currentSetIndex = index;

  // 自動送りリセット
  stopAutoScroll();
  pano.scrollLeft = 0;
  loopWidth = 0;
  resetProgress();

  // キャプション更新
  if (captionTitleEl) captionTitleEl.textContent = set.title || '';
  if (captionTextEl) captionTextEl.textContent = set.caption || '';

  // 中身入れ替え
  pano.innerHTML = '';

  set.images.forEach(file => {
    const img = document.createElement('img');
    img.src = IMAGE_BASE + file;
    img.alt = set.title || 'Risuko panorama';
    pano.appendChild(img);
  });

  // 画像ロード後に 1周ぶんの幅を取得し、クローンで2周構成にする
  waitImagesLoaded(pano, () => {
    // オリジナルだけの幅を測る
    const originalsWidth = pano.scrollWidth;

    const originals = Array.from(pano.children);
    originals.forEach(node => {
      const clone = node.cloneNode(true);
      pano.appendChild(clone);
    });

    // ループ用の「1周ぶんの幅」はオリジナルだけ
    loopWidth = originalsWidth;

    // 初期状態のランプ更新（先頭なので全部消灯のまま）
    resetProgress();
  });

  updateActiveThumb();
}

// ============================
// サムネイル
// ============================
function createThumbnails() {
  if (!thumbsWrap) return;
  thumbsWrap.innerHTML = '';

  panoSets.forEach((set, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'pano-thumb';
    btn.dataset.index = String(idx);

    const thumbImg = document.createElement('img');
    const thumbFile = set.images[0];
    thumbImg.src = IMAGE_BASE + thumbFile;
    thumbImg.alt = set.label || set.title || `set ${idx + 1}`;

    const label = document.createElement('span');
    label.textContent = set.label || set.title || `セット${idx + 1}`;

    btn.appendChild(thumbImg);
    btn.appendChild(label);

    btn.addEventListener('click', () => {
      loadSet(idx);
      // セット切り替え後に自動送りを開始
      startAutoScroll();

      // BGM 初回再生トリガー
      if (window.bgmControl && window.bgmControl.playOnFirstInteraction) {
        window.bgmControl.playOnFirstInteraction();
      }
    });

    thumbsWrap.appendChild(btn);
  });

  updateActiveThumb();
}

function updateActiveThumb() {
  if (!thumbsWrap) return;
  const buttons = Array.from(thumbsWrap.querySelectorAll('.pano-thumb'));
  buttons.forEach((btn, i) => {
    if (i === currentSetIndex) {
      btn.classList.add('is-active');
    } else {
      btn.classList.remove('is-active');
    }
  });
}

// ============================
// 自動スクロール（無限送り）
// ============================
function step() {
  if (!autoScroll || !pano) return;

  pano.scrollLeft += SPEED;

  if (loopWidth > 0 && pano.scrollLeft >= loopWidth) {
    // 1周ぶん超えたら巻き戻し
    pano.scrollLeft -= loopWidth;
    // 先頭に戻った瞬間はランプ全消灯
    resetProgress();
  } else {
    // 途中は進行度更新
    updateProgress();
  }

  rafId = requestAnimationFrame(step);
}

// ============================
// イベント登録
// ============================
if (pano) {
  // パノラマクリックで再生/停止＋BGM初回トリガー
  pano.addEventListener('click', () => {
    if (window.bgmControl && window.bgmControl.playOnFirstInteraction) {
      window.bgmControl.playOnFirstInteraction();
    }

    if (autoScroll) {
      stopAutoScroll();
    } else {
      startAutoScroll();
    }
  });

  // スクロール（手動スワイプなど）でもランプ更新
  pano.addEventListener('scroll', () => {
    if (!loopWidth) return;
    updateProgress();
  });

  // スワイプ（タッチドラッグ）
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
}

// ============================
// 初期化
// ============================
window.addEventListener('load', () => {
  createThumbnails();
  loadSet(0);
});
