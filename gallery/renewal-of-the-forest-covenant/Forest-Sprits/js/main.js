// =====================================
// 1. 背景の森スクロール（PC / スマホで速度分岐）
// =====================================
(() => {
  const bg = document.querySelector(".forest-bg");
  if (!bg) return;

  const images = [
    "assets/images/bg-forest1.webp",
    "assets/images/bg-forest2.webp",
    "assets/images/bg-forest3.webp",
    // 必要ならここに追加
  ];

  let index = 0;
  let posY = 100;

  // PC（768px以上）: ゆっくり、スマホ: やや速く
  const isMobile = window.innerWidth < 768;
  const SPEED = isMobile ? 0.1 : 0.02;

  function setImage(i) {
    bg.style.backgroundImage = `url("${images[i]}")`;
    posY = 100;
    bg.style.backgroundPosition = `center ${posY}%`;
  }

  setImage(index);

  function animate() {
    posY -= SPEED;
    bg.style.backgroundPosition = `center ${posY}%`;

    if (posY <= 0) {
      index++;
      if (index >= images.length) index = 0;
      setImage(index);
    }

    requestAnimationFrame(animate);
  }

  animate();
})();


// =====================================
// 2. ギャラリーカード定義（プレイリスト管理）
// =====================================
const galleryItems = [
  {
    src: "assets/images/1.webp",
    alt: "精霊と少女の情景1",
    caption: "灯りに呼ばれた、小さな青い声。"
  },
  {
    src: "assets/images/2.webp",
    alt: "精霊と少女の情景2",
    caption: "焼きたての香りに、森の時間がゆるむ。"
  },
  {
    src: "assets/images/3.webp",
    alt: "精霊と少女の情景3",
    caption: "ひとつ灯せば、道は静かにひらく。"
  }, 
  {
    src: "assets/images/4.webp",
    alt: "精霊と少女の情景3",
    caption: "ひとつ灯せば、道は静かにひらく。"
  }, 
  {
    src: "assets/images/5.webp",
    alt: "精霊と少女の情景3",
    caption: "ひとつ灯せば、道は静かにひらく。"
  }, 
  {
    src: "assets/images/6.webp",
    alt: "精霊と少女の情景3",
    caption: "ひとつ灯せば、道は静かにひらく。"
  }, 
  {
    src: "assets/images/7.webp",
    alt: "精霊と少女の情景3",
    caption: "ひとつ灯せば、道は静かにひらく。"
  }, 
  {
    src: "assets/images/8.webp",
    alt: "精霊と少女の情景3",
    caption: "ひとつ灯せば、道は静かにひらく。"
  }, 
  {
    src: "assets/images/9.webp",
    alt: "精霊と少女の情景3",
    caption: "ひとつ灯せば、道は静かにひらく。"
  }, 
  {
    src: "assets/images/10.webp",
    alt: "精霊と少女の情景3",
    caption: "ひとつ灯せば、道は静かにひらく。"
  }, 
  {
    src: "assets/images/11.webp",
    alt: "精霊と少女の情景3",
    caption: "ひとつ灯せば、道は静かにひらく。"
  }, 
  {
    src: "assets/images/12.webp",
    alt: "精霊と少女の情景3",
    caption: "ひとつ灯せば、道は静かにひらく。"
  }, 
  {
    src: "assets/images/13.webp",
    alt: "精霊と少女の情景3",
    caption: "ひとつ灯せば、道は静かにひらく。"
  }, 
  {
    src: "assets/images/14.webp",
    alt: "精霊と少女の情景3",
    caption: "ひとつ灯せば、道は静かにひらく。"
  }, 
  {
    src: "assets/images/15.webp",
    alt: "精霊と少女の情景3",
    caption: "ひとつ灯せば、道は静かにひらく。"
  }, 
  {
    src: "assets/images/16.webp",
    alt: "精霊と少女の情景3",
    caption: "ひとつ灯せば、道は静かにひらく。"
  }, 
  {
    src: "assets/images/17.webp",
    alt: "精霊と少女の情景3",
    caption: "ひとつ灯せば、道は静かにひらく。"
  }, 
  {
    src: "assets/images/18.webp",
    alt: "精霊と少女の情景3",
    caption: "ひとつ灯せば、道は静かにひらく。"
  }, 
  {
    src: "assets/images/19.webp",
    alt: "精霊と少女の情景3",
    caption: "ひとつ灯せば、道は静かにひらく。"
  }, 
  {
    src: "assets/images/20.webp",
    alt: "精霊と少女の情景3",
    caption: "ひとつ灯せば、道は静かにひらく。"
  }, 
  {
    src: "assets/images/21.webp",
    alt: "精霊と少女の情景3",
    caption: "ひとつ灯せば、道は静かにひらく。"
  }, 
  {
    src: "assets/images/22.webp",
    alt: "精霊と少女の情景3",
    caption: "ひとつ灯せば、道は静かにひらく。"
  }, 
  {
    src: "assets/images/23.webp",
    alt: "精霊と少女の情景3",
    caption: "ひとつ灯せば、道は静かにひらく。"
  }, 
  {
    src: "assets/images/24.webp",
    alt: "精霊と少女の情景3",
    caption: "ひとつ灯せば、道は静かにひらく。"
  }
  // ここに追加していけばカードが増える
];


// =====================================
// 3. ギャラリーDOM生成
// =====================================
function renderGallery() {
  const grid = document.getElementById("fg-grid");
  if (!grid) return;

  grid.innerHTML = "";

  galleryItems.forEach((item) => {
    const link = document.createElement("a");
    link.className = "fg-card";
    link.href = "#";

    const fig = document.createElement("figure");
    fig.className = "fg-figure";

    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.alt || "";
    img.loading = "lazy";

    const cap = document.createElement("figcaption");
    cap.className = "fg-caption";
    cap.textContent = item.caption || "";

    fig.appendChild(img);
    fig.appendChild(cap);
    link.appendChild(fig);
    grid.appendChild(link);
  });
}


// =====================================
// 4. ライトボックス初期化
// =====================================
function setupLightbox() {
  const cards = document.querySelectorAll(".fg-card");
  const lightbox = document.getElementById("fg-lightbox");
  const imgEl = document.getElementById("fg-lightbox-img");
  const capEl = document.getElementById("fg-lightbox-caption");
  const closeBtn = document.querySelector(".fg-lightbox-close");

  if (!cards.length || !lightbox || !imgEl || !capEl) return;

  function openLightbox(src, alt, caption) {
    imgEl.src = src;
    imgEl.alt = alt || "";
    capEl.textContent = caption || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    imgEl.src = "";
    imgEl.alt = "";
    capEl.textContent = "";
  }

  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      e.preventDefault();
      const img = card.querySelector("img");
      const cap = card.querySelector(".fg-caption");
      if (!img) return;
      openLightbox(img.src, img.alt, cap ? cap.textContent : "");
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeLightbox);
  }

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
}


// =====================================
// 5. DOM構築後にギャラリーとライトボックスを準備
// =====================================
document.addEventListener("DOMContentLoaded", () => {
  renderGallery();
  setupLightbox();
});
