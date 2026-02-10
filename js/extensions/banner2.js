// バナー表示用（言語分岐・ID末尾2版）
(function () {
  const bannerImage   = document.getElementById("bannerImage2");
  const bannerCaption = document.getElementById("bannerCaption2");
  const bannerLink    = document.getElementById("bannerLink2");
  const bannerDotsBox = document.getElementById("bannerDots2");

  if (!bannerImage || !bannerCaption || !bannerLink) return;

  // ブラウザの言語設定を取得 (日本語 'ja' かどうかを判定)
  const isJapanese = navigator.language.startsWith('ja');

  // 言語に応じたデータ
  const contents = {
    ja: {
      src: "./assets/banner/risuko_bot.png",
      caption: "リス子とお話しできます。何している？と聞けば話題を振ってくれるのでぜひ話し相手になって上げてください",
      href: "./chat_room/risuko_bot/index.html",
      btnLabel: "▶ リス子の森のチャット部屋"
    },
    en: {
          src: "../../assets/banner/risuko_bot.png", 
          caption: "Chat with Risuko! She understands both English and Japanese. Ask 'What are you doing?' and she will share stories from the forest.",
          href: "../../chat_room/risuko_bot/index.html",
          btnLabel: "▶ Visit Risuko's Forest Chat"
        }
  };

  // 使用するデータを選択 (日本語以外はすべて英語を表示)
  const item = isJapanese ? contents.ja : contents.en;

  // データの反映
  bannerImage.src = item.src;
  bannerCaption.textContent = item.caption;
  bannerLink.href = item.href;
  bannerLink.textContent = item.btnLabel;

  // ドットインジケーターのエリアを非表示にする
  if (bannerDotsBox) {
    bannerDotsBox.style.display = "none";
  }
})();