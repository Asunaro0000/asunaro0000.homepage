// suzuko-room.js
document.addEventListener("DOMContentLoaded", () => {
  const sceneListEl = document.getElementById("suzuko-scene-list");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxCloseBtn = document.querySelector(".lightbox-close");
  const lightboxBackdrop = document.querySelector(".lightbox-backdrop");
  const btnPrev = document.querySelector(".lightbox-prev");
  const btnNext = document.querySelector(".lightbox-next");

  if (!sceneListEl || !lightbox || !lightboxImg || !lightboxCaption || !btnPrev || !btnNext) return;

  // ===== スズ子のシーン定義（サムネ n-0.png ＋ スライダー n-1～n-9.webp） =====
  const SUZUKO_SCENES = [
    {
      id: "suzuko-1",
      thumb: "./assets/images/1-0.png",
      slides: [
        "./assets/images/1-1.webp",
        "./assets/images/1-2.webp",
        "./assets/images/1-3.webp",
        "./assets/images/1-4.webp",
        "./assets/images/1-5.webp",
        "./assets/images/1-6.webp",
        "./assets/images/1-7.webp",
        "./assets/images/1-8.webp",
        "./assets/images/1-9.webp"
      ],
      title: "① この子がスズ子。",
      text: [
        "この子がスズ子。",
        "冬になると森に遊びに来る、すっごく可愛い白いリスさん！",
        "並んで歩くだけで、なんか自分までキラキラしてる気がするんだ。"
      ]
    },
    {
      id: "suzuko-2",
      thumb: "./assets/images/2-0.png",
      slides: [
        "./assets/images/2-1.webp",
        "./assets/images/2-2.webp",
        "./assets/images/2-3.webp",
        "./assets/images/2-4.webp",
        "./assets/images/2-5.webp",
        "./assets/images/2-6.webp",
        "./assets/images/2-7.webp",
        "./assets/images/2-8.webp",
        "./assets/images/2-9.webp"
      ],
      title: "② 一緒に山登り。光が当たると妖精さんみたい。",
      text: [
        "今日はふたりで雪山にお出かけ。",
        "日が当たると、スズ子のしっぽの模様が光をひろって、ほんとに妖精さんみたいになるんだ。",
        "ねえ、これもう“みたい”じゃなくてほぼ本物じゃない？"
      ]
    },
    {
      id: "suzuko-3",
      thumb: "./assets/images/3-0.png",
      slides: [
        "./assets/images/3-1.webp",
        "./assets/images/3-2.webp",
        "./assets/images/3-3.webp",
        "./assets/images/3-4.webp",
        "./assets/images/3-5.webp",
        "./assets/images/3-6.webp",
        "./assets/images/3-7.webp",
        "./assets/images/3-8.webp",
        "./assets/images/3-9.webp"
      ],
      title: "③ スズ子の家で本を一緒に読む。",
      text: [
        "ここがスズ子のおうち。",
        "本棚、星とか月の本ばっかりでびっくりした。",
        "ページをめくるたびに、外の雪がちょっときらっと光るの、あれ絶対この子の魔法だよね。",
        "暖炉もぽかぽかで、帰りたくなくなるやつ。"
      ]
    },
    {
      id: "suzuko-4",
      thumb: "./assets/images/4-0.png",
      slides: [
        "./assets/images/4-1.webp",
        "./assets/images/4-2.webp",
        "./assets/images/4-3.webp",
        "./assets/images/4-4.webp",
        "./assets/images/4-5.webp",
        "./assets/images/4-6.webp",
        "./assets/images/4-7.webp",
        "./assets/images/4-8.webp",
        "./assets/images/4-9.webp"
      ],
      title: "④ 一緒に星を見に行く。",
      text: [
        "夜になったら、今度は星を見におでかけ。",
        "月明かりの前にスズ子が立つと、髪もドレスも、雪の結晶もぜんぶ透きとおって見えて……",
        "さっきまで「妖精さんみたい！」って言ってたけど、",
        "この景色見たら、もう“ほんとに妖精”って認めるしかないでしょ。"
      ]
    },
    {
      id: "suzuko-5",
      thumb: "./assets/images/5-0.png",
      slides: [
        "./assets/images/5-1.webp",
        "./assets/images/5-2.webp",
        "./assets/images/5-3.webp",
        "./assets/images/5-4.webp",
        "./assets/images/5-5.webp",
        "./assets/images/5-6.webp",
        "./assets/images/5-7.webp",
        "./assets/images/5-8.webp",
        "./assets/images/5-9.webp"
      ],
      title: "⑤ おまけ：一緒に作った雪だるま。",
      text: [
        "帰りぎわに、一緒に雪だるまも作ったんだ。",
        "スズ子がちょっと魔法を足してくれたから、ほっぺがほんのり光ってるの、見える？",
        "完成したときのスズ子のドヤ顔、たぶん今日いちばん可愛かったと思う。"
      ]
    }
  ];

  // ライトボックス用キャプション：今回はカード本文をまとめて使う
  const CAPTIONS = {};
  SUZUKO_SCENES.forEach(scene => {
    CAPTIONS[scene.id] = [scene.title, "", ...scene.text].join("\n");
  });

  // ===== リスト描画（レイアウトは今のまま） =====
  function renderSuzukoScenes() {
    sceneListEl.innerHTML = "";

    SUZUKO_SCENES.forEach(scene => {
      const li = document.createElement("li");
      li.className = "suzuko-scene";

      li.innerHTML = `
        <figure class="suzuko-scene-image">
          <img
            src="${scene.thumb}"
            alt="${scene.title}"
            data-scene-id="${scene.id}"
          >
        </figure>
        <div class="suzuko-scene-text">
          <p class="suzuko-scene-title">${scene.title}</p>
          ${scene.text.map(line => `<p>${line}</p>`).join("")}
        </div>
      `;

      sceneListEl.appendChild(li);
    });
  }

  renderSuzukoScenes();

  // ===== ライトボックス＋スライダー =====
  let currentSceneIndex = 0; // 0〜4
  let currentSlideIndex = 0; // 0〜8

  function updateNavState() {
    const slides = SUZUKO_SCENES[currentSceneIndex].slides;
    const last = slides.length - 1;

    // 先頭で prev 無効
    if (currentSlideIndex === 0) {
      btnPrev.disabled = true;
      btnPrev.classList.add("is-disabled");
    } else {
      btnPrev.disabled = false;
      btnPrev.classList.remove("is-disabled");
    }

    // 最後で next 無効（ループしない）
    if (currentSlideIndex === last) {
      btnNext.disabled = true;
      btnNext.classList.add("is-disabled");
    } else {
      btnNext.disabled = false;
      btnNext.classList.remove("is-disabled");
    }
  }

  function updateLightboxImage() {
    const scene = SUZUKO_SCENES[currentSceneIndex];
    const slides = scene.slides;
    if (!slides || !slides.length) return;

    const src = slides[currentSlideIndex];
    lightboxImg.src = src;
    lightboxImg.alt = `${scene.title} - ${currentSlideIndex + 1}`;
    lightboxCaption.textContent =
      `${CAPTIONS[scene.id]}\n\n(${currentSlideIndex + 1} / ${slides.length})`;

    updateNavState();
  }

  function openLightbox(sceneIndex, slideIndex = 0) {
    currentSceneIndex = sceneIndex;
    currentSlideIndex = slideIndex;
    updateLightboxImage();
    lightbox.classList.remove("hidden");
  }

  function closeLightbox() {
    lightbox.classList.add("hidden");
    lightboxImg.src = "";
    lightboxImg.alt = "";
    lightboxCaption.textContent = "";
  }

  // カード内のサムネクリック → そのグループのスライダーを開く
  sceneListEl.addEventListener("click", (e) => {
    const img = e.target.closest("img[data-scene-id]");
    if (!img) return;
    const sceneId = img.dataset.sceneId;
    const idx = SUZUKO_SCENES.findIndex(s => s.id === sceneId);
    if (idx === -1) return;
    openLightbox(idx, 0);
  });

  // 閉じる系
  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener("click", closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightbox.classList.contains("hidden")) {
      closeLightbox();
    }
  });

  // 前へ
  btnPrev.addEventListener("click", () => {
    if (currentSlideIndex <= 0) return; // 先頭でストップ
    currentSlideIndex -= 1;
    updateLightboxImage();
  });

  // 次へ
  btnNext.addEventListener("click", () => {
    const slides = SUZUKO_SCENES[currentSceneIndex].slides;
    const last = slides.length - 1;
    if (currentSlideIndex >= last) return; // 最後でストップ
    currentSlideIndex += 1;
    updateLightboxImage();
  });

  // 画像クリックで「次へ」（任意・いらなければこのブロック削る）
  lightboxImg.addEventListener("click", () => {
    const slides = SUZUKO_SCENES[currentSceneIndex].slides;
    const last = slides.length - 1;
    if (currentSlideIndex >= last) return;
    currentSlideIndex += 1;
    updateLightboxImage();
  });
});
