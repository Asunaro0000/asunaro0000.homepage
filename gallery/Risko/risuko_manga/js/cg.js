// Minimal card gallery with lightbox navigation
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

/**
 * 【ここを編集】グループごとの表示名を個別に設定します
 */
const groupNames = {
  "1": "1～",
  "2": "100～",
  "3": "200～",
};

/**
 * データの管理
 * ここにある全データに自動で「リス子」のaltが付与されます
 */
/**
 * 【修正版】items の二重配列を解消し、必要な情報を揃えた構造
 */
const items = [
  { "src": "./images/1-001.webp", "title": "冬の森！虹色アートと食欲の共犯者", "tags": ["森", "冬", "食事"], "caption": "" },
  { "src": "./images/1-002.webp", "title": "光速のホットドッグと収穫の因果応報", "tags": ["グルメ"], "caption": "" },
  { "src": "./images/1-003.webp", "title": "幻のお茶と、寿司と、時々レモン", "tags": ["冒険"], "caption": "" },
  { "src": "./images/1-004.webp", "title": "ハチミツを巡る大いなる寄り道", "tags": ["日常"], "caption": "" },
  { "src": "./images/1-005.webp", "title": "雪の口どけと森の朝ごはん", "tags": ["ファンタジー"], "caption": "" },
  { "src": "./images/1-006.webp", "title": "寝落ちとフルートと遺跡の謎", "tags": ["探索"], "caption": "" },
  { "src": "./images/1-007.webp", "title": "スクープと秘密の湧き水レストラン", "tags": ["日常"], "caption": "" },
  { "src": "./images/1-008.webp", "title": "最高のお茶会ポジションを探す寄り道ツアー", "tags": ["グルメ"], "caption": "" },
  { "src": "./images/1-009.webp", "title": "究極のキノコ出汁とお茶会マジック", "tags": ["日常"], "caption": "" },
  { "src": "./images/1-010.webp", "title": "終わらないお弁当タイムと渓流の誘惑", "tags": ["幻想的"], "caption": "" },
  { "src": "./images/1-011.webp", "title": "真夜中のピクニックと星屑のデザート", "tags": ["冒険"], "caption": "" },
 
];
const gallery = $("#cardGallery");
const filterContainer = $("#filterButtons");

let currentGroupItems = []; 
let idx = -1;

const lb = $("#lightbox");
const lbImg = $("#lbImg");
const lbTitle = $("#lbTitle");
const lbCaption = $("#lbCaption");
const zonePrev = $(".lb__zone--prev");
const zoneNext = $(".lb__zone--next");
const btnClose = $(".lb__close");

function getGroupId(src) {
  const filename = src.split('/').pop();
  return filename.split('-')[0];
}

/**
 * 【修正版】ギャラリー描画
 * alt属性にタイトル、タグ、キャプションを統合して付与します。
 * 画面上のデザインは変更せず、検索エンジンにのみ情報を伝えます。
 */
function renderGallery(groupId) {
  currentGroupItems = items.filter(it => getGroupId(it.src) === groupId);

  gallery.innerHTML = currentGroupItems.map((it, i) => {
    // タグを文字列化 (例: "森, 日常, 冬")
    const tagsStr = it.tags ? it.tags.join(", ") : "";
    
    // SEO用のaltテキストを構築
    // 「キャラ名 - タイトル | タグ | キャプション冒頭」の順で情報を濃縮
    const seoAlt = `黄色のマフラーを巻いたリスの女の子 リス子 - ${it.title || '森の物語'} ${tagsStr ? '| Tags: ' + tagsStr : ''} | ${it.caption.substring(0, 40).replace(/\n/g, ' ')}...`;

    return `
      <figure class="card" data-i="${i}" tabindex="0" aria-label="${it.title || 'リス子'}">
        <div class="card__imgwrap">
          <img src="${it.src}" 
               alt="${seoAlt}" 
               loading="lazy">
        </div>
        <figcaption class="card__meta">
          <h3 class="card__title">${it.title || 'リス子'}</h3>
          <p class="card__caption">${it.caption}</p>
        </figcaption>
      </figure>
    `;
  }).join("");
}

// フィルタボタン設定（中略：既存通り）
function setupFilters() {
  const groupIds = [...new Set(items.map(it => getGroupId(it.src)))].sort((a, b) => a - b);
  filterContainer.innerHTML = groupIds.map(id => {
    const label = groupNames[id] || `Group ${id}`;
    return `<button class="filter-btn" data-group="${id}">${label}</button>`;
  }).join("");
  filterContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if(!btn) return;
    $$(".filter-btn").forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    renderGallery(btn.dataset.group);
  });
  const firstBtn = $(".filter-btn");
  if(firstBtn) firstBtn.click();
}

// ライトボックス関連（修正：alt付与）
function openLB(i){
  idx = (i + currentGroupItems.length) % currentGroupItems.length;
  const it = currentGroupItems[idx];
  lbImg.src = it.src;
  // 拡大画面でもしっかり属性を記述
  lbImg.alt = `黄色のマフラーを巻いたリスの女の子 リス子: ${it.title || '森の日常'}`;
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
    const j = (k + currentGroupItems.length) % currentGroupItems.length;
    const img = new Image();
    img.src = currentGroupItems[j].src;
  });
}

// イベントリスナー（既存通り）
gallery.addEventListener("click", (e)=>{
  const card = e.target.closest(".card");
  if(!card) return;
  openLB(parseInt(card.dataset.i, 10));
});
btnClose.addEventListener("click", closeLB);
zonePrev.addEventListener("click", ()=> move(-1));
zoneNext.addEventListener("click", ()=> move(1));
lbImg.addEventListener("click", (e)=>{
  const rect = lbImg.getBoundingClientRect();
  if(e.clientX < rect.left + rect.width/2) move(-1); else move(1);
});
document.addEventListener("keydown", (e)=>{
  if(lb.hidden) return;
  if(e.key === "Escape") closeLB();
  if(e.key === "ArrowLeft") move(-1);
  if(e.key === "ArrowRight") move(1);
});
lbCaption.addEventListener("click", (e) => { e.stopPropagation(); });

/**
 * 【修正版】Google SEO対策
 * 構造化データの keywords と description にタグを反映させます。
 */
function injectGoogleSEOData() {
    const pageDescription = "黄色のマフラーがトレードマーク。しっぽがふわふわなリスの女の子「リス子」の毎日を描くアートギャラリー。";

    const ldJson = {
        "@context": "https://schema.org",
        "@type": "ImageGallery",
        "name": "リス子の森ギャラリー - 黄色のマフラーを巻いたリスの女の子",
        "description": pageDescription,
        "author": {
            "@type": "Person",
            "name": "Asunaro Works"
        },
        "hasPart": items.map(it => ({
            "@type": "ImageObject",
            "name": `リス子: ${it.title || '森の物語'}`,
            "description": it.caption.replace(/\n/g, ' '),
            "keywords": it.tags ? it.tags.join(", ") : "リス子, AIart, 森", // タグがあれば優先使用
            "contentUrl": window.location.origin + window.location.pathname.replace('index.html', '') + it.src.replace('./', '')
        }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(ldJson);
    document.head.appendChild(script);

    // noscript内にもタグ情報を隠しテキストとして含める
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<div style="display:none;"><h2>リス子 作品目録</h2><ul>` + 
        items.map(it => `<li>リス子 - ${it.title} [${it.tags ? it.tags.join(",") : ""}] : ${it.caption.substring(0, 50)}</li>`).join('') + 
        `</ul></div>`;
    document.body.appendChild(noscript);
}

// 実行
setupFilters();
injectGoogleSEOData();