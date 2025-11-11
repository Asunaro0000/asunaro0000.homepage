// 画像フォルダ（相対パス）。必要に応じて変更
const STAMP_PATH_2 = "./stamps2/";

// ファイル名（拡張子なし）。1つ目と同じ配列を使い回すならコピペでOK
const stampNames2 = [
  "おやつ日和！","りんごタイム♪","ほっぺが落ちそう〜♡","香ばしいっ！","甘党ばんざい！",
  "花よりだんご♪","できたてだよっ！","野菜も好きっ！","あま〜い幸せ🍯","ほっと一息〜☕","あったかいね☕",
  "あまやか時間～","秋でもアイス！","あま〜い幸せ🍰","ほっとミルク♪","あったまるぅ〜🍲","分けっこしよっ🥕",
  "秋のごほうび🍊","これ、ぜんぶリス子の！？✨","秋のごほうび♡","あったか夜ごはん🌙","できたてタルトです♪",
  "おべんとう〜！","ほっとするね🦉","ピクニック日和🍞","しあわせ暴走中！🥞",
];

// 要素取得（※ここが1つ目と違う）
const wrap2 = document.getElementById("risuko-stamp-2");
const img2  = document.getElementById("risuko-stamp-img-2");
const text2 = document.getElementById("risuko-stamp-text-2");
const btn2  = document.getElementById("risuko-stamp-btn-2");

// 年内通し日で日替わりインデックス
function dayOfYear2(d){
  const s = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d - s) / 86400000);
}
let currentIndex2 = dayOfYear2(new Date()) % stampNames2.length;

// 表示適用
function applyByIndex2(i){
  const name = stampNames2[i];
  // フェードアウト
  img2.classList.add("rs-swap-out");
  // 少し待って差し替え → フェードイン
  setTimeout(() => {
    img2.src = STAMP_PATH_2 + encodeURIComponent(name) + ".png";
    img2.alt = name;
    text2.textContent = name;
    img2.onload = () => img2.classList.remove("rs-swap-out");
  }, 120);
}

applyByIndex2(currentIndex2);

// クリック（ボタン）でランダム切替
btn2.addEventListener("click", () => {
  let r = Math.floor(Math.random() * stampNames2.length);
  if (r === currentIndex2) r = (r + 1) % stampNames2.length;
  currentIndex2 = r;
  applyByIndex2(currentIndex2);

  // GAイベント名も分けたい場合
  // if (window.gtag) gtag("event", "risuko2_click", { value: currentIndex2 });
});

// 画像自体のクリックでも切替（ボタン以外のクリックで反応）
wrap2.addEventListener("click", (e) => {
  if (e.target.id !== "risuko-stamp-btn-2") btn2.click();
});
