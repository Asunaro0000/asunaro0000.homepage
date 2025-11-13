// Minimal card gallery with lightbox navigation (left/right click zones)
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

// 画像ごとに個別キャプションを設定
const items = [
  { src: './images/1.webp',  title: '木漏れ日の中で',  caption: '光の粒が揺れる森の中で、ウサ子は静かに立ち止まる。やわらかな風とまなざしが、今日のページをそっとめくっていく。' },
  { src: './images/2.webp',  title: '空を見上げて',  caption: '高く伸びる雲の向こうに、ウサ子は静かに目を向けた。風が頬をなで、赤い紐が空へ溶けていく。' },
  { src: './images/3.webp',  title: '小鳥たちの巣',  caption: '黄金色の草の中で、ウサ子は小さなかごを抱えていた。 かすかな羽ばたきと鳴き声が、午後の光にとけていく' },
  { src: './images/4.webp',  title: '森のフクロウ',  caption: '大きな木の下で、ウサ子は腕にとまったフクロウを見上げた。 朝の光が差しこみ、羽の模様が金色にきらめいていた。' },
  { src: './images/5.webp',  title: '野原のうさぎたち',  caption: '春の光が降りそそぐ野原で、ウサ子は小さなうさぎたちに囲まれていた。 草の香りとやわらかなぬくもりが、心を静かに満たしていく。' },
  { src: './images/6.webp',  title: '夕暮れの道',  caption: '黄金色に染まる小道を、ウサ子は風を受けながら歩いていく。 夕日の光が背中を押し、遠くの空が静かに輝いていた。' },
  { src: './images/7.webp',  title: '草の上で',  caption: 'やわらかな風の吹く野原で、ウサ子は金色の草の中に身をあずけた。 空の青さと草の香りが、静かな午後を包みこんでいた。' },
  { src: './images/8.webp',  title: '森の風を聴く',  caption: '木漏れ日の射す森の中で、ウサ子はそっと目を閉じた。 鳥の羽音と風のざわめきが、胸の奥に静かに響いていく。' },
  { src: './images/9.webp',  title: '子猫を抱いて',  caption: '朝の光が差しこむ部屋で、ウサ子はかごに包んだ子猫をそっと抱きしめた。 カーテンのすきまから入る風が、やわらかく頬をなでていく。' },
  { src: './images/10.webp', title: '夕陽を見上げて', caption: '黄金色の草の上に横たわり、ウサ子はゆっくりと空を見上げた。 沈む陽がまぶたを照らし、静かな一日が終わりを告げていた。' },
  { src: './images/11.webp', title: '秋の縁側で', caption: '紅葉の舞う縁側で、ウサ子はほうきを手に落ち葉を集めていた。 木漏れ日の中、風が髪を揺らし、秋の匂いがふわりと広がっていく。' },
  { src: './images/12.webp', title: '森のかげから', caption: '木漏れ日が落ちる静かな森で、ウサ子はそっと木のかげから顔を出す。小さなリスが足もとで、次のページをめくるように見上げていた。' },
  { src: './images/13.webp', title: '桜の下で', caption: '春の陽ざしの中、ウサ子は桜の並木をゆっくりと歩いていた。 舞い散る花びらが肩に触れ、ひとひらの春が静かに息づいていた。' },
  { src: './images/14.webp', title: '紙飛行機を空へ', caption: '高原の風が吹く空の下、ウサ子は紙飛行機を放った。 白い翼が光を受けて舞い上がり、遠くの雲へと溶けていった。' },
  { src: './images/15.webp', title: '灯をともして', caption: '夕暮れの山あいで、ウサ子は小さな灯を手にして立っていた。 オレンジ色の光が頬を照らし、静かな夜の始まりを告げていた。' },
  { src: './images/16.webp', title: '縁側の小鳥たち', caption: '朝の光が差しこむ縁側で、ウサ子は小鳥たちにそっと餌をあげていた。 羽ばたきの音と笑みが重なり、穏やかな一日が始まっていく。' },
  { src: './images/17.webp', title: '森のきつねへ', caption: '木漏れ日の差す森の小道で、ウサ子はきつねにそっとごはんを差し出した。 光の粒がふたりの間に降りそそぎ、静かな時間が流れていく。' },
  { src: './images/18.webp', title: '朝の支度', caption: '朝の光が差し込む台所で、ウサ子は湯気の立つ鍋をかき混ぜる。湯気と香りが、今日の始まりをやさしく包みこんでいた。' },
  { src: './images/19.webp', title: '雨の木かげで', caption: '雨が降り続く森の中、ウサ子は木のそばで静かに立ち止まる。葉のしずくが肩をすべり落ち、風が小さく髪を揺らした。' },
  { src: './images/20.webp', title: '空へ羽ばたく朝', caption: '朝の風が頬をなで、ウサ子は手のひらにとまった小鳥を見上げた。羽音が光の中に溶けていき、空は新しい一日を迎えていた。' },
  { src: './images/21.webp', title: '森での再会', caption: '木漏れ日の差す小道で、ウサ子は小さなキツネをそっと抱き上げた。その瞳に映る光は、懐かしい記憶のようにやさしく揺れていた。' },
  { src: './images/22.webp', title: '竹の道を歩く', caption: '竹林を抜ける階段の上、ウサ子は風に髪を揺らしながら歩いていく。光が降りそそぎ、緑の香りが新しい季節を告げていた。' },
  { src: './images/23.webp', title: '竹林を抜けて', caption: '朝の光が差しこむ竹の道を、ウサ子は静かに歩いていく。風が葉を鳴らし、柔らかな影が足もとに揺れていた。' },
  { src: './images/24.webp', title: '花畑の真ん中で', caption: '花畑のまんなかで、ウサ子はそっと手を合わせた。風に揺れる花冠が光を受けて、静かに輝いていた。' },
];

const gallery = $("#cardGallery");
gallery.innerHTML = items.map((it, i)=>`
  <figure class="card" data-i="${i}" tabindex="0" aria-label="${it.title}">
    <div class="card__imgwrap">
      <img src="${it.src}" alt="${it.title}" loading="lazy">
    </div>
    <figcaption class="card__meta">
      <h3 class="card__title">${it.title}</h3>
      <p class="card__caption">${it.caption}</p>
    </figcaption>
  </figure>
`).join("");

const lb = $("#lightbox");
const lbImg = $("#lbImg");
const lbTitle = $("#lbTitle");
const lbCaption = $("#lbCaption");
const zonePrev = $(".lb__zone--prev");
const zoneNext = $(".lb__zone--next");
const btnClose = $(".lb__close");

let idx = -1;

function openLB(i){
  idx = (i + items.length) % items.length;
  const it = items[idx];
  lbImg.src = it.src;
  lbImg.alt = it.title || "";
  lbTitle.textContent = it.title || "";
  lbCaption.textContent = it.caption || "";
  lb.hidden = false;
  document.body.style.overflow = "hidden";
  preloadAround(idx);
}

function closeLB(){
  lb.hidden = true;
  document.body.style.overflow = "";
  idx = -1;
}

function move(delta){
  if(idx < 0) return;
  openLB(idx + delta);
}

function preloadAround(i){
  [i-1, i+1].forEach(k=>{
    const j = (k + items.length) % items.length;
    const img = new Image();
    img.src = items[j].src;
  });
}

// Card click / Enter key
gallery.addEventListener("click", (e)=>{
  const card = e.target.closest(".card");
  if(!card) return;
  openLB(parseInt(card.dataset.i,10));
});
gallery.addEventListener("keydown", (e)=>{
  if(e.key === "Enter" || e.key === " "){
    const card = e.target.closest(".card");
    if(card){ e.preventDefault(); openLB(parseInt(card.dataset.i,10)); }
  }
});

// Lightbox controls
btnClose.addEventListener("click", closeLB);
zonePrev.addEventListener("click", ()=> move(-1));
zoneNext.addEventListener("click", ()=> move(1));

// Click on image: decide left/right half
lbImg.addEventListener("click", (e)=>{
  const rect = lbImg.getBoundingClientRect();
  const mid = rect.left + rect.width/2;
  if(e.clientX < mid) move(-1); else move(1);
});

// Keyboard navigation
document.addEventListener("keydown", (e)=>{
  if(lb.hidden) return;
  if(e.key === "Escape") closeLB();
  if(e.key === "ArrowLeft") move(-1);
  if(e.key === "ArrowRight") move(1);
});

// Swipe (basic)
let sx = null;
lb.addEventListener("pointerdown", (e)=>{
  if(e.pointerType === "mouse") return; // touch only
  sx = e.clientX;
  lb.setPointerCapture(e.pointerId);
});
lb.addEventListener("pointerup", (e)=>{
  if(sx == null) return;
  const dx = e.clientX - sx;
  if(Math.abs(dx) > 40) move(dx < 0 ? 1 : -1);
  sx = null;
});
