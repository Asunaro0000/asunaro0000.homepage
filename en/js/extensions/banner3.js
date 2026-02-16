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
    src: "../assets/banner/banner13.webp",
    caption: "You can chat with Usako. Choose different topics and expand the conversation. 🐰",
    href: "../chat_room/usako_bot/index.html",
    btnLabel: "▶ 'AI Chat Room' Talk with Usako"
  },
  {
    src: "../assets/banner/risuko_bot.webp",
    caption: "You can chat with Risuko. Just ask 'What are you doing?' and she will start a topic, so please be her conversation partner.",
    href: "../chat_room/risuko_bot/index.html",
    btnLabel: "▶ 'AI Chat Room' Talk with Risuko"
  },
  {
    src: "../assets/banner/banner14.webp",
    caption: "We have added the Risuko and Suzuko Observation Log Room. It records daily life in the forest every hour. 🐿️",
    href: "../chat_room/risuko_logroom/index.html",
    btnLabel: "▶ Go to the Risuko and Suzuko Observation Log Room"
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