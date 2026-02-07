// バナー表示用（切り替え機能なし・ID末尾2版）
(function () {
  const bannerImage   = document.getElementById("bannerImage2");
  const bannerCaption = document.getElementById("bannerCaption2");
  const bannerLink    = document.getElementById("bannerLink2");
  const bannerDotsBox = document.getElementById("bannerDots2");

  if (!bannerImage || !bannerCaption || !bannerLink) return;

  // 表示するデータ
  const item = {
    src: "./assets/banner/risuko_bot.png",
    caption: "リス子とお話しできます。何している？と聞けば話題を振ってくれるのでぜひ話し相手になって上げてください",
    href: "./risuko_bot/index.html",
    btnLabel: "▶ リス子の森のチャット部屋"
  };

  // データの反映
  bannerImage.src = item.src;
  bannerCaption.textContent = item.caption;
  bannerLink.href = item.href;
  bannerLink.textContent = item.btnLabel;

  // ドットインジケーターのエリアを非表示にする（要素が存在する場合）
  if (bannerDotsBox) {
    bannerDotsBox.style.display = "none";
  }
})();