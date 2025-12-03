// photo-room.js
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".gallery-track");
  const panels = Array.from(document.querySelectorAll(".photo-panel"));
  const slideButtons = Array.from(document.querySelectorAll(".slide-btn"));
  const lamps = Array.from(document.querySelectorAll(".lamp"));
  const images = Array.from(document.querySelectorAll(".photo-card img"));

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxCloseBtn = document.querySelector(".lightbox-close");
  const lightboxBackdrop = document.querySelector(".lightbox-backdrop");

  let currentIndex = 0;
  let isMobile = window.matchMedia("(max-width: 720px)").matches;

  // --- サンプルキャプション（必要に応じて差し替え） ---
  const CAPTIONS = {
    "1-1": "今日の一コマ ❄️ 雪の入口でわくわくしてる二人。",
    "1-2": "走り出したら止まらないやつ😂💨",
    "1-3": "静かな森の小道も、二人なら完全に遊び場。",
    "2-1": "列車の窓から光が差し込む冬の朝。",
    "3-1": "笑いすぎて写真がブレても気にしない日。",
    "4-1": "雪のトンネルは秘密基地みたいな気配。",
    "5-1": "ストーブとソファと、ちょっと照れた横顔。"
    // 他は好きなタイミングで追加してOK
  };

  // --- スライド切り替え（PC向け） ---
  function goToPanel(index) {
    currentIndex = Math.max(0, Math.min(panels.length - 1, index));
    if (!isMobile) {
      const offset = -100 * currentIndex;
      track.style.transform = `translateX(${offset}%)`;
    } else {
      // モバイルは横スクロールで移動
      panels[currentIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start"
      });
    }

    slideButtons.forEach((btn, i) => {
      btn.classList.toggle("is-active", i === currentIndex);
    });

    lamps.forEach((lamp, i) => {
      lamp.classList.toggle("is-active", i === currentIndex);
    });
  }

  slideButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      goToPanel(index);
    });
  });

  // --- 画像クリック → ライトボックス ---
  function openLightbox(imgEl) {
    const src = imgEl.getAttribute("src");
    const id = imgEl.dataset.imageId || "";
    const caption = CAPTIONS[id] || "Today’s snapshot ❄️";

    lightboxImg.src = src;
    lightboxImg.alt = id;
    lightboxCaption.textContent = caption;

    lightbox.classList.remove("hidden");
  }

  function closeLightbox() {
    lightbox.classList.add("hidden");
    lightboxImg.src = "";
    lightboxImg.alt = "";
    lightboxCaption.textContent = "";
  }

  images.forEach((img) => {
    img.addEventListener("click", () => openLightbox(img));
  });

  lightboxCloseBtn.addEventListener("click", closeLightbox);
  lightboxBackdrop.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightbox.classList.contains("hidden")) {
      closeLightbox();
    }
  });

  // --- モード変更（PC / モバイル） ---
  function handleResize() {
    const mobileNow = window.matchMedia("(max-width: 720px)").matches;
    if (mobileNow !== isMobile) {
      isMobile = mobileNow;
      if (!isMobile) {
        // PCに戻ったらスライダー位置をリセット
        track.style.transform = `translateX(${-100 * currentIndex}%)`;
      } else {
        track.style.transform = "none";
      }
    }
  }

  window.addEventListener("resize", handleResize);

  // 初期状態
  handleResize();
  goToPanel(0);
});
