// bgm.js

// 既に他で base が定義されている場合はそれを使う。なければ定義。
if (typeof base === 'undefined') {
  const isGitHub = window.location.hostname.includes('github.io');
  const isLocal = window.location.protocol === 'file:';
  window.base = (isGitHub && !isLocal) 
    ? '/asunaro0000.homepage/gallery/renewal-of-the-forest-covenant/Forest-Sprits' 
    : '/gallery/renewal-of-the-forest-covenant/Forest-Sprits';
}

(() => {
  const btn = document.getElementById("bgm-toggle");
  if (!btn) return;

  // 重要：パスが正しいかコンソールで確認できるようにする
  const BGM_SRC = `${base}/assets/bgm/bgm.m4a`;
  console.log("Attempting to load BGM from:", BGM_SRC);

  let audio = null;
  let isPlaying = false;
  let isInitialized = false;

  function updateButton() {
    btn.classList.toggle("is-on", isPlaying);
    btn.setAttribute("aria-pressed", isPlaying ? "true" : "false");
    btn.textContent = isPlaying ? "♪ BGM ON" : "♪ BGM";
  }

  function initAudio() {
    if (isInitialized) return;
    isInitialized = true;

    audio = new Audio(BGM_SRC);
    audio.loop = true;
    audio.volume = 0.6;

    audio.addEventListener("error", (e) => {
      console.error("BGM load error. Path might be wrong:", BGM_SRC);
    });
  }

  async function togglePlay() {
    if (!audio) initAudio();
    if (!audio) return;

    if (!isPlaying) {
      try {
        await audio.play();
        isPlaying = true;
      } catch (err) {
        console.warn("Playback blocked by browser. User interaction required.");
        isPlaying = false;
      }
    } else {
      audio.pause();
      isPlaying = false;
    }
    updateButton();
  }

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    togglePlay();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden && audio && isPlaying) {
      audio.pause();
      isPlaying = false;
      updateButton();
    }
  });

  updateButton();
})();