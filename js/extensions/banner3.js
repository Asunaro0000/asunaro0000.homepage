// 自動切り替えバナー（バナー3専用）
(function () {
  const bannerImage   = document.getElementById("bannerImage3");
  const bannerCaption = document.getElementById("bannerCaption3");
  const bannerLink    = document.getElementById("bannerLink3");
  const bannerDotsBox = document.getElementById("bannerDots3");

  if (!bannerImage || !bannerCaption || !bannerLink || !bannerDotsBox) return;

  // ★ バナー3の内容（自由に書き換えてくださいまし！）
  const banners = [
    {
      src: "./assets/banner/banner13.webp",
      caption: "ウサ子とお話しできます。色々な話題を選んで話を膨らませてね。🐰",
      href: "./chat_room/usako_bot/index.html",
      btnLabel: "▶ 「AIチャット部屋」ウサ子と話す"
    },
    {
      src: "./assets/banner/risuko_bot.webp",
      caption: "リス子とお話しできます。何している？と聞けば話題を振ってくれるのでぜひ話し相手になって上げてください",
      href: "./chat_room/risuko_bot/index.html",
      btnLabel: "▶ 「AIチャット部屋」リス子と話す"
    },
    {
      src: "./assets/banner/banner14.webp",
      caption: "リス子とスズ子の観察日記部屋を追加しました。1時間毎に森の日常を記録し続けています🐿️",
      href: "./chat_room/risuko_logroom/index.html",
      btnLabel: "▶ リス子とスズ子の観察日記部屋へ"
    }
  ];

  let index = 0;
  const INTERVAL_MS = 4000; 
  let timer = null;

  const dots = banners.map((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "top-banner__dot";
    dot.setAttribute("aria-label", `バナー3 ${i + 1}`);
    dot.addEventListener("click", () => {
      index = i;
      showBanner(index, true);
      resetTimer();
    });
    bannerDotsBox.appendChild(dot);
    return dot;
  });

  function updateDots(activeIndex) {
    dots.forEach((dot, i) => {
      if (i === activeIndex) {
        dot.classList.add("is-active");
      } else {
        dot.classList.remove("is-active");
      }
    });
  }

  function showBanner(i, immediate) {
    const item = banners[i];

    bannerImage.classList.add("is-fading");
    bannerCaption.style.opacity = 0;
    bannerLink.style.opacity = 0;

    const delay = immediate ? 0 : 250;

    setTimeout(() => {
      bannerImage.src = item.src;
      bannerCaption.textContent = item.caption;
      bannerLink.href = item.href;
      bannerLink.textContent = item.btnLabel;

      requestAnimationFrame(() => {
        bannerImage.classList.remove("is-fading");
        bannerCaption.style.opacity = 1;
        bannerLink.style.opacity = 1;
      });

      updateDots(i);
    }, delay);
  }

  function nextBanner() {
    index = (index + 1) % banners.length;
    showBanner(index);
  }

  function startTimer() {
    if (timer) clearInterval(timer);
    timer = setInterval(nextBanner, INTERVAL_MS);
  }

  function resetTimer() {
    startTimer();
  }

  showBanner(index, true);
  updateDots(index);
  startTimer();
})();