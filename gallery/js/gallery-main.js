/**
 * ギャラリーデータ
 */
const GALLERY_DATA = {
  exhibits: [
    {
      id: "story-board",
      title: "ストーリーボード",
      ratio: "1 / 1",
      slides: [
        { src: "./story_board/kv01.png", thumb: "./story_board/kv01.png", title: "ウサ子とカメコ" },
        { src: "./story_board/kv01.webp", thumb: "./story_board/kv01.webp", title: "森の贈りもの ― リス子の小さな旅" },
        { src: "./story_board/kv02.png", thumb: "./story_board/kv02.png", title: "森의 契約更新譚" },
        { src: "./story_board/kv04.png", thumb: "./story_board/kv04.png", title: "リリと楓のHappy Halloween" }
      ]
    }
  ],
  // 【新規追加】AIチャット用データ
  aiChat: [
    {
      id: "ai-demo",
      title: "AI Character Demo",
      ratio: "16 / 9", 
      slides: [
        { src: "./ai_chat/demo01.webp", thumb: "./ai_chat/demo01.webp", title: "AIアシスタントとの対話デモ", href: "../ai-chat/demo/" }
      ]
    }
  ],
  games: [
    {
      id: "games-main",
      title: "メインタイトル",
      ratio: "16 / 9",
      slides: [
        { src: "./hero01.webp", thumb: "./hero01.webp", title: "PrismCat Memory — 記憶の光譜", href: "./prismcat/" },
        { src: "./hero02.webp", thumb: "./hero02.webp", title: "CyberCats — ターン制バトル", href: "./CyberCats/" }
      ]
    }
  ]
};

// --- createSlider 関数は変更なし（前の回答のロジックをそのまま使用） ---
function createSlider(container, slides = [], ratio = "1 / 1") {
  /* 前回のロジックをそのまま記述 */
  container.innerHTML = `
    <div class="sld">
      <button class="sld__nav sld__prev" aria-label="Previous">‹</button>
      <div class="sld__viewport" aria-roledescription="carousel">
        <div class="sld__track"></div>
      </div>
      <button class="sld__nav sld__next" aria-label="Next">›</button>
      <div class="sld__meta">
        <h3 class="sld__title"></h3>
        <div class="sld__dots" role="tablist" aria-label="Slides"></div>
      </div>
    </div>
    <div class="sld__thumbs"></div>
  `;

  const el = {
    track:  container.querySelector(".sld__track"),
    prev:   container.querySelector(".sld__prev"),
    next:   container.querySelector(".sld__next"),
    dots:   container.querySelector(".sld__dots"),
    thumbs: container.querySelector(".sld__thumbs"),
    title:  container.querySelector(".sld__title"),
  };

  el.track.innerHTML = slides.map(s => `
    <div class="sld__slide">
      ${s.href ? `<a class="sld__link" href="${s.href}">` : `<span class="sld__link">`}
        <img src="${s.src}" alt="${s.title ?? ""}" loading="eager" style="aspect-ratio: ${ratio};">
      ${s.href ? `</a>` : `</span>`}
    </div>
  `).join("");

  el.dots.innerHTML = slides.map((_, i) => `<button class="sld__dot" data-i="${i}"></button>`).join("");
  el.thumbs.innerHTML = slides.map((s, i) => `
    <button class="sld__th" data-i="${i}">
      <img src="${s.thumb || s.src}" alt="">
    </button>
  `).join("");

  let idx = 0;
  const n = slides.length;
  function update(i) {
    if (!n) return;
    idx = (i + n) % n;
    el.track.style.transform = `translateX(${-100 * idx}%)`;
    Array.from(el.dots.querySelectorAll(".sld__dot")).forEach((d, k) => d.classList.toggle("active", k === idx));
    Array.from(el.thumbs.querySelectorAll(".sld__th")).forEach((t, k) => t.classList.toggle("active", k === idx));
    el.title.textContent = slides[idx]?.title || "";
  }

  el.prev.addEventListener("click", () => update(idx - 1));
  el.next.addEventListener("click", () => update(idx + 1));
  el.dots.addEventListener("click", (e) => {
    const b = e.target.closest(".sld__dot"); if (!b) return;
    update(parseInt(b.dataset.i, 10));
  });
  el.thumbs.addEventListener("click", (e) => {
    const b = e.target.closest(".sld__th"); if (!b) return;
    update(parseInt(b.dataset.i, 10));
  });

  let sx = null;
  let downAnchor = null;
  el.track.addEventListener("pointerdown", (e) => {
    downAnchor = e.target.closest("a");
    sx = e.clientX;
    if (!downAnchor) el.track.setPointerCapture(e.pointerId);
  });
  el.track.addEventListener("pointerup", (e) => {
    if (sx === null) return;
    const dx = e.clientX - sx;
    if (!downAnchor && Math.abs(dx) > 40) {
      update(idx + (dx < 0 ? 1 : -1));
    } else if (downAnchor && Math.abs(dx) < 6) {
      downAnchor.click();
    }
    sx = null;
    downAnchor = null;
  });

  update(0);
}

function init() {
  const data = GALLERY_DATA;
  const $ = (s) => document.querySelector(s);

  // 1. ストーリーボード
  const exWrap = $("#exhibits");
  if (exWrap && data.exhibits) {
    exWrap.innerHTML = data.exhibits.map((x, xi) => `
      <section class="g-exhibit">
        <h3 class="g-exhibit__title">${x.title || ""}</h3>
        <div class="sld-wrap" id="ex-sld-${xi}"></div>
      </section>
    `).join("");
    data.exhibits.forEach((x, xi) => {
      const hrefMap = ["../gallery/Usako_and_Kameko/", "../gallery/Risko/", "../gallery/renewal-of-the-forest-covenant/", "../gallery/lili_and_kaede/"];
      const slides = x.slides.map((s, i) => ({ ...s, href: hrefMap[i] || s.href }));
      createSlider(document.getElementById(`ex-sld-${xi}`), slides, x.ratio);
    });
  }

  // 2. 【新規追加】AIチャット
  const aiWrap = $("#ai-chat");
  if (aiWrap && data.aiChat) {
    aiWrap.innerHTML = data.aiChat.map((a, ai) => `
      <section class="g-ai-chat">
        <h3 class="g-exhibit__title">${a.title || ""}</h3>
        <div class="sld-wrap" id="ai-sld-${ai}"></div>
      </section>
    `).join("");
    data.aiChat.forEach((a, ai) => {
      createSlider(document.getElementById(`ai-sld-${ai}`), a.slides, a.ratio);
    });
  }

  // 3. ゲーム
  const gamesWrap = $("#games");
  if (gamesWrap && data.games) {
    gamesWrap.innerHTML = data.games.map((g, gi) => `
      <article class="g-game">
        <header class="g-game__head">
          <h2 class="g-game__title">${g.title || ""}</h2>
        </header>
        <div class="sld-wrap" id="game-sld-${gi}"></div>
      </article>
    `).join("");
    data.games.forEach((g, gi) => {
      createSlider(document.getElementById(`game-sld-${gi}`), g.slides, g.ratio);
    });
  }
}

document.addEventListener("DOMContentLoaded", init);