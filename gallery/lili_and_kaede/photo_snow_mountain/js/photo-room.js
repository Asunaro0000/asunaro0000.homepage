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

  // --- キャプション ---
  const CAPTIONS = {
    "1-1": "雪の坂道ダッシュ始まった❄️💨\n 開幕から全力疾走とか体力配分って概念どこ行った？でも楽しいからヨシ！！",
    "1-2": "森の一本道、ただ歩いてるだけなのに冒険してる気分🌲✨\n 「あっち行ってみる？」って言われると即うなずく自分がいる。",
    "1-3": "景色に浸ってるのに、背中から雪玉職人がスタンバイしてるの笑う🤣❄️\n このあと絶対バトルになる雰囲気しかしない！",
    "1-4": "雪トンネルに入った瞬間テンション爆発⛄️🎉\n 「せーの！」で飛んだら、予想以上に高く跳んで二人で絶叫したやつ。",
    "1-5": "どこ向かうか決めてないのに全力ダッシュってどういうこと!?😆💥\nでも“この勢いのまま行こう”で全部うまくいく気がしてる！",
    "1-6": "洞窟に入った瞬間テンション急上昇🔦❄️\n ちょっと怖いけど、隣にいるから強気でいられるのがいい！",
    "1-7": "海と雪の組み合わせ、意味わからんくらい綺麗だった🌊❄️\n ホットドリンク片手に「帰りたくない」が口癖になる時間。",
    "1-8": "ベンチでまったりタイム☕️💤\n さっきまで走ってたのに急に電池切れして、二人とも動かないのが逆におもしろい。",
    "1-9": "息が整ってきた瞬間に笑いがまたぶり返す🔥😆\n 今日のハイライトどころか、ここからさらに面白くなりそうな空気してる！",

    "2-1": "座っただけで物語スタート❄️🔥\n 「見て見て雪舞ってる！」ってはしゃぐの見て、こっちまで胸の中あったかくなるやつ！",
    "2-2": "スピード遊びは絶対こうなる💨🤣\n 『もっといける！』って顔してるの見たら加速しないわけない！",
    "2-3": "勝手に冒険リーダー名乗って先導し出すヤツ🤣❄️\n 『ついてこーい！』が聞こえた瞬間テンションのギア上がるの最高！",
    "2-4": "ほぼ無茶なジャンプなのに自信満々🏂💥\n 挑戦するときのあの目、間違いなく一番ワクワクしてる瞬間だ！",
    "2-5": "洞窟の地図（自作）を使う探検ムーブ📍🧭\n 絶対迷ってるけど楽しそうだからまぁいっか…！",
    "2-6": "氷の玉座でカメラ向けられた瞬間に演技スイッチ入る📸❄️\n ノリが完全に一致した時のワクワク、まだまだ止まらない！",
    "2-7": "氷のトンネル爆走タイム💫🛼\n 後ろから追いかけられるスリルと笑い声が反響する感じ、忘れられない！",
    "2-8": "氷壁で登山チャレンジ！？🧗‍♀️🔥\n 全力すぎて、見てる方が息切れするレベル。楽しさは100点満点！",
    "2-9": "この先が気になりすぎて一歩が速くなる💫😳\n まだ遊び足りない感じぜんぜん隠せてない、むしろそれが最高！",

    "3-1": "怖がって一歩引いた自分にめっちゃ悔しそうな顔してる🧊😣\n それでも近づこうとする勢いがにじみ出てて、もう次は絶対引かないの分かる！",
    "3-2": "わざわざポーズで道を示してくるのノリ良すぎ💫🤣\n 誘われたら断る理由ゼロ、面白そうの匂いしかしない！",
    "3-3": "突然の贈り物イベントで動揺してるのが丸見え🎁😆\n 驚きと嬉しさがごちゃまぜになってる顔、最高にレア！",
    "3-4": "古い乗り物を見つけた瞬間にテンション爆上がり⚙️🔥\n 仕組みなんて分からなくても“試してみたい”が正義だろ！",
    "3-5": "灯りの下で『秘密会議』スタート🕯️🌙\n 声小さくしてるのにテンションは爆上がりしてるの、完全に楽しいやつ！",
    "3-6": "路地の奥に吸い寄せられるみたいに進む感じ🎒💫\n 『ヤバいの見つけるかも』って歩く瞬間がいちばんゾクゾクする！",
    "3-7": "落ちても止まっても関係ないって顔で全力アタック💥😆\n 楽しさを挑戦に変える瞬間の勢いヤバい、ここから絶対もっと面白くなる！",
    "3-8": "ランタンの光だけで探索する夜の回廊🕯️🌌\n ちょっと怖いのに笑ってるの、その“怖いも楽しみたい”の気持ち丸出しで胸熱！",
    "3-9": "古い端末を触ったら何か光った💡⚡️\n 『ちょ！今の何！？』って騒ぎながら大笑い、予想外のドキドキが一番クセになる！",

    "4-1": "雪道で光の力みたいなのをキャッチしちゃって、風景まるごとバフが乗った気分😎✨\n このまま何が起きても笑って楽しめる自信だけは満タンになった！",
    "4-2": "近くに立つだけで空気がふわっとやわらかくなる🤝😊\n 一緒に歩くほど安心できる距離になってるの、本人たち絶対気づいてる！",
    "4-3": "焚き火の前で笑い合うと心まで温まる🔥😌\n この落ち着きじゃ絶対終われない、もっと話したくなる空気してる！",
    "4-4": "雪景色の中で赤が走ってくるだけで、シーン丸ごと主役感になってて笑う😂🔥\n もう次の一手を迎える準備できちゃった！",
    "4-5": "大樹の前で語り出したら止まらない🌙🕯️\n 『今日いちばん楽しかった瞬間なに？』語る声が弾んでて胸が熱くなった…",
    "4-6": "夜空の色がヤバいレベルで綺麗🌌✨\n 寒いのに帰りたくなくて、言葉もなくじっと眺めてた。あれ完全に幸福のやつ。",
    "4-7": "ストーブ前で『指先あったけぇ〜！』って騒ぎすぎ🤣🔥\n 静かな森とパチパチ音のコラボがクセになって、ここを中継地点にまた走りだしたくなる！",
    "4-8": "星明かりで照らされながら寄りかかる距離🌟😳\n しゃべらなくても幸せって理解できた瞬間。静かすぎて心臓の鼓動がうるさかった…",
    "4-9": "スマホの写真に映る自分たちが楽しそうすぎて、見た瞬間体温まで上がる📱🔥\n “うちらめっちゃ最高だったじゃん！”って確信してしまう！",

    "5-1": "楽しかった道のりに向かって手振ってるの、完全に青春ムーブ🤣✨\n 『この景色覚えとこ！』って気持ちが溢れて止まらない！",
    "5-2": "周りはみんなそれぞれの夜なのに、こっちはただ青春フルスロットル🤣✨\n 街のざわめきの中で2人の思い出だけ音量MAXなの面白すぎ！",
    "5-3": "肩寄せられた瞬間、全身フリーズ→脳内オーバーヒート😳🔥\n でも離れたくなくてそのまま固まってた…！",
    "5-4": "見惚れてたの気づかれて『なに？』って言われた時の破壊力やばい😱❤️\n 誤魔化そうとしてもニヤけ止まんないの終わってる！",
    "5-5": "夜景全部キラキラしてたのに、視界の中心は結局ひとりだけだった🌃💞\n 冬の風が冷たいほど気持ちが熱くなるって何？",
    "5-6": "屋根の上は絶対怒られるやつなのに、やりたい気持ちが勝った🤣⛄️\n 叫んだ声が空に吸い込まれてくの最高だった！",
    "5-7": "スープであたたまりながら他愛ない話してただけなのに、あの時間が今日いちばん幸せだった🔥❄️\n こういうのが一番大事な気がする。",
    "5-8": "渡す前のドキドキで2人まとめて爆発寸前なんだけど!?🤣💝\n プレゼント1つで心臓こんな騒ぐの青春すぎる！",
    "5-9": "腕まわされた瞬間、景色全部ぼやけて相手しか見えなくなった🙌🔥\n 喜び方豪快すぎて抱きしめられてる側まで笑顔止まらん！",
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

  // === ライトボックス用配列（DOM順） ===
  const orderedImages = images.map(img => ({
    src: img.getAttribute("src"),
    id: img.dataset.imageId
  }));

  let lightboxIndex = -1;

  // index指定でライトボックスを表示
  function showLightboxByIndex(i) {
    if (i < 0 || i >= orderedImages.length) return;

    const item = orderedImages[i];
    lightboxIndex = i;
    lightboxImg.src = item.src;
    lightboxImg.alt = item.id;
    lightboxCaption.textContent = CAPTIONS[item.id] || "Today’s snapshot ❄️";

    lightbox.classList.remove("hidden");
  }

  // サムネイルクリック時
  function openLightbox(imgEl) {
    const id = imgEl.dataset.imageId || "";
    const index = orderedImages.findIndex(v => v.id === id);
    if (index === -1) return;
    showLightboxByIndex(index);
  }

  function closeLightbox() {
    lightbox.classList.add("hidden");
    lightboxImg.src = "";
    lightboxImg.alt = "";
    lightboxCaption.textContent = "";
    lightboxIndex = -1;
  }

  // 画像クリック → ライトボックスを開く
  images.forEach((img) => {
    img.addEventListener("click", () => openLightbox(img));
  });

  // ライトボックス画像をクリック → 同じ章の次へ
  lightboxImg.addEventListener("click", () => {
    if (lightboxIndex < 0) return;

    const current = orderedImages[lightboxIndex];
    const [chapter, numStr] = (current.id || "").split("-");
    const num = Number(numStr);

    if (!chapter || !Number.isFinite(num)) return;

    const nextId = `${chapter}-${num + 1}`;
    const nextIndex = orderedImages.findIndex(v => v.id === nextId);

    // その章に次がなければ（例: 1-9 → 1-10 不在）そこで停止
    if (nextIndex === -1) return;

    showLightboxByIndex(nextIndex);
  });

  // 閉じる系
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
// bgm.js - 3曲プレイリスト再生
document.addEventListener("DOMContentLoaded", () => {
  // ====== プレイリスト定義 ======
  // ★ここを自分のファイル名に差し替えて使う
  const PLAYLIST = [
    "./assets/bgm/雪空ハチャメチャ.mp3",
    "./assets/bgm/冬の隣で.mp3",

  ];

  const audio = document.getElementById("bgm-audio");
  const btn = document.getElementById("bgm-toggle");
  const label = document.getElementById("bgm-file-label");

  if (!audio || !btn) return;

  let currentIndex = 0;

function getFileNameFromPath(path) {
  if (!path) return "";
  const noQuery = path.split("?")[0];
  const file = noQuery.split("/").pop();
  return file.replace(/\.mp3$/i, "");   // .mp3 を削除
}

  function setTrack(index) {
    if (!PLAYLIST.length) return;
    currentIndex = (index + PLAYLIST.length) % PLAYLIST.length;
    const src = PLAYLIST[currentIndex];
    audio.src = src;
    if (label) {
      label.textContent = getFileNameFromPath(src);
    }
  }

  // 最初の曲をセット
  setTrack(0);

  // ====== ボタン操作 ======
  btn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      btn.classList.add("is-playing");
      if (label) label.style.opacity = "1";
    } else {
      audio.pause();
      btn.classList.remove("is-playing");
      if (label) label.style.opacity = "0.7";
    }
  });

  // ====== 曲が終わったら次の曲へ（3曲ループ） ======
  audio.addEventListener("ended", () => {
    setTrack(currentIndex + 1);  // 次の曲へ
    audio.play();                // 自動再生
  });
});
