// file: プロトコルではない、かつ hostname に github が含まれるなら GitHub とみなす
const isGitHub = window.location.hostname.includes('github.io');
const isLocal = window.location.protocol === 'file:';

// GitHub上ならリポジトリ名ありのパス、そうでなければルートからのパス
const base = (isGitHub && !isLocal) 
  ? '/asunaro0000.homepage/gallery/Usako_and_Kameko/kameko_diary' 
  : '/gallery/Usako_and_Kameko/kameko_diary';

// Minimal card gallery with lightbox navigation (left/right click zones)
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
// 画像ごとに個別キャプションを設定

const items = [
    { src: `${base}/images/114.webp`, title: 'The Wisteria-Falling Library',
    caption: 'Clusters of violet blossoms adorn the ceiling. Within the clear solution, memories of spring are sealed away.' },

  { src: `${base}/images/113.webp`, title: 'A Chamber of Passing Years',
    caption: 'Leaning against walls of star charts. From the open door, fragrant incense from the garden drifts inside.' },

  { src: `${base}/images/112.webp`, title: 'Beside the Azure Pillars',
    caption: 'A lattice of shadows brushes the cheek. The quiet breathing of the manor is felt through the back.' },

  { src: `${base}/images/111.webp`, title: 'Crimson Lit Upon the Brush',
    caption: 'A single drop of feeling rests on the brush tip. Sunlight on the veranda gently wraps the white paper.' },

  { src: `${base}/images/110.webp`, title: 'Fan and Dappled Light',
    caption: 'Fanning the breeze, blue curtains sway. The greenery beyond the window reflects vividly in the eyes.' },

  { src: `${base}/images/109.webp`, title: 'The Shelf of Chromatic Elixirs',
    caption: 'Shadows of small bottles stretch across the floor. In the afternoon light, they wait for the moment of blending.' },

  { src: `${base}/images/108.webp`, title: 'By the Peony Lantern',
    caption: 'The flame draws lines of crimson. Cool night air creeps toward fingertips touching the lattice door.' },

  { src: `${base}/images/107.webp`, title: 'Sunlight and Blue Drapes',
    caption: 'Dappled light marks the tatami. Beyond the swaying noren, a new season waits.' },

  { src: `${base}/images/106.webp`, title: 'A Shelf Where Flowers Glow',
    caption: 'Gazing at spring sealed within bottles. Adjusting a scarf, the presence of winter is felt.' },

  { src: `${base}/images/105.webp`, title: 'Library of Books and Vines',
    caption: 'Tracing spines beneath a green canopy. The scent of aged paper stills time.' },

  { src: `${base}/images/104.webp`, title: 'Emerald Blending',
    caption: 'Steam from freshly poured tea melts into green walls. The quiet of afternoon is slowly consumed.' },

  { src: `${base}/images/103.webp`, title: 'The Corridor of Glass Bottles',
    caption: 'Passing through shelves of specimens. Colors within the bottles quietly watch each step.' },

  { src: `${base}/images/102.webp`, title: 'By the Autumn Window',
    caption: 'Crimson leaves sway. Feelings written into letters shine through the sunlight.' },

  { src: `${base}/images/101.webp`, title: 'Collecting Morning Dew',
    caption: 'Bright droplets are gathered into small vials, sharing in the forest’s awakening.' },

  { src: `${base}/images/100.webp`, title: 'Azure Brushstrokes',
    caption: 'Fresh greens become ink, recording flowers blooming within the heart.' },

  { src: `${base}/images/99.webp`, title: 'Colors Awaiting Dusk',
    caption: 'Light settles upon rows of bottles, and secret hours begin.' },

  { src: `${base}/images/98.webp`, title: 'The Alchemist’s Small Room',
    caption: 'Surrounded by colorful bottles, thoughts turn to a new fragrance.' },

  { src: `${base}/images/97.webp`, title: 'The Library Explorer',
    caption: 'Tracing book spines, gathering fragments of stories.' },

  { src: `${base}/images/96.webp`, title: 'The Rainbow Glass Door',
    caption: 'Light passing through colored glass. A kaleidoscope reflects in the eyes.' },

  { src: `${base}/images/95.webp`, title: 'Rest in the Sunlit Spot',
    caption: 'Knees drawn close in a light doze. Particles of light gently stroke the shoulders.' },

  { src: `${base}/images/94.webp`, title: 'Outlook in Deep Green',
    caption: 'With a wall of greenery behind, a quiet morning is observed.' },

  { src: `${base}/images/93.webp`, title: 'A Forest of Bookshelves',
    caption: 'Seated on the floor among books, the body sinks into quiet time.' },

  { src: `${base}/images/92.webp`, title: 'The Red Letter',
    caption: 'Watched over by white flowers, the heart leaps at a delivered message.' },

  { src: `${base}/images/91.webp`, title: 'A Garden Inside a Bottle',
    caption: 'A small forest sealed in glass, eyes moistened by flickering firelight.' },

  { src: `${base}/images/90.webp`, title: 'Gazing at the Light',
    caption: 'Into the sunlight pouring from a high window, the heart’s sediment is entrusted.' },

  { src: `${base}/images/89.webp`, title: 'The Glass Conservatory',
    caption: 'A quiet prayer is offered to the blue flowers blooming inside bottles.' },

  { src: `${base}/images/88.webp`, title: 'The Breath of the Water Basin',
    caption: 'Touching the clear basin, tenderly watching the swaying greenery.' },

  { src: `${base}/images/87.webp`, title: 'Memories of Brushstrokes',
    caption: 'Within scattered light, words are woven for someone dear.' },

  { src: `${base}/images/86.webp`, title: 'The Key to the Story',
    caption: 'A key placed on a vermilion floor carries the premonition of the next door.' },

  { src: `${base}/images/85.webp`, title: 'Window Bathed in Green Light',
    caption: 'Wrapped in greenery filling the window, thoughts drift toward a distant sky.' },

  { src: `${base}/images/84.webp`, title: 'Afternoon Reading',
    caption: 'Light falls upon open pages, and quiet thoughts begin to fill the space.' },

  { src: `${base}/images/83.webp`, title: 'The Corridor of Floral Shadows',
    caption: 'Shadows of dappled light softly overlap floral patterns on the walls.' },

  { src: `${base}/images/82.webp`, title: 'White Chrysanthemums and the Sound of a Comb',
    caption: 'Before a sunlit bookshelf, the contours of daily life are gently arranged.' },

  { src: `${base}/images/81.webp`, title: 'An Afternoon Immersed in Green Light',
    caption: 'Gazing at glowing bottles, thoughts wander through a sea of deep green.' },

  { src: `${base}/images/80.webp`, title: 'Brushstrokes in the Bamboo Grove',
    caption: 'In silence, ink dances beside a vermilion mirror.' },

  { src: `${base}/images/79.webp`, title: 'Recollections of the Blue Shelf',
    caption: 'With a teacup in hand, light spilling through the lattice door is savored.' },

  { src: `${base}/images/78.webp`, title: 'A Room Lit by Colored Flowers',
    caption: 'Hands rest near crimson light, admiring the breath of plants.' },

  { src: `${base}/images/77.webp`, title: 'Moonlight and the Scent of Tea',
    caption: 'Gazing at the night through a round window, the heart is entrusted to warm steam.' },

  { src: `${base}/images/76.webp`, title: 'Star Charts and a Flickering Window',
    caption: 'Passing through latticed light, the mind already drifts beyond the galaxy.' },

  { src: `${base}/images/75.webp`, title: 'The Door at the Sunlit Corridor',
    caption: 'A staff catches the light, quietly opening sealed time.' },

  { src: `${base}/images/74.webp`, title: 'The Vermilion Guidepost',
    caption: 'Adjusting red cloth, welcoming the season yet to come.' },

  { src: `${base}/images/73.webp`, title: 'A Study of Deep Blue and Crimson',
    caption: 'With a broom in hand, walking through vividly colored stillness.' },

  { src: `${base}/images/72.webp`, title: 'Looking Up at the Shelves of Wisdom',
    caption: 'Even dust dancing in sunlight feels like part of ancient records.' },

  { src: `${base}/images/71.webp`, title: 'Guardian of Dappled Light',
    caption: 'With the glow of fresh green behind, quiet resolve dwells in the eyes.' },

  { src: `${base}/images/70.webp`, title: 'Records Spread by Lamplight', 
    caption: 'The lantern stains the paper in shades of orange. In her smiling eyes, a small flicker of tomorrow’s premonition was lit.' },

  { src: `${base}/images/69.webp`, title: 'The High-Ceiled Corridor', 
    caption: 'Blue afternoon light gathers between the beams. She took in the quiet breathing of the manor with her whole being.' },

  { src: `${base}/images/68.webp`, title: 'Afternoon Tea Table', 
    caption: 'Gazing at the white flowers and the steam from the teacup. Ivy by the window inscribed faint shadows upon the pages.' },

  { src: `${base}/images/67.webp`, title: 'The Sunlit Preparation Room', 
    caption: 'The breeze rustles the small bottles. In a room where particles of light danced, she reached for the inspiration of a new scent.' },

  { src: `${base}/images/66.webp`, title: 'Repose by the Window', 
    caption: 'Wrapped in the warmth of her scarf, she lowers her gaze. The lemon in the water bowl breathed within the sunlight.' },

  { src: `${base}/images/65.webp`, title: 'Before the Celadon Shelves', 
    caption: 'Blue vessels color the morning with coolness. Each time she traced the silhouette of a bottle, the waves in her heart grew still.' },

  { src: `${base}/images/64.webp`, title: 'The Veranda Where the Fan Rests', 
    caption: 'Light through the window scatters across the red fan. Before her diary, a moment of rest flowed quietly.' },

  { src: `${base}/images/63.webp`, title: 'The Beginning Wind', 
    caption: 'She turns her gaze toward the garden filled with light. The red carpet beneath her feet quietly supported her steady steps.' },

  { src: `${base}/images/62.webp`, title: 'The Corridor of Lengthening Shadows', 
    caption: 'Shadows stretch along the long hallway. As she stepped forward with a broom in hand, the old books were quietly awakening.' },

  { src: `${base}/images/61.webp`, title: 'The Staff and Morning Light', 
    caption: 'Tracing the documents with her staff by her side. Sunlight from the window vividly colored the memories of her journey.' },

  { src: `${base}/images/60.webp`, title: 'A Time to Open the Door', 
    caption: 'Reaching out toward the light outside. The air, scented with herbs, announced the arrival of a new season.' },

  { src: `${base}/images/59.webp`, title: 'Morning of Sweeping Clean', 
    caption: 'Walking through the library where light dances. Picking up a fallen leaf, she slowly shaped the outline of the day.' },

  { src: `${base}/images/58.webp`, title: 'Premonition of a Deep Blue Night', 
    caption: 'Gazing at the pages with the night-colored window at her back. The greenery in the water bowl filled the room with deep peace.' },

  { src: `${base}/images/57.webp`, title: 'Candlelight and Ancient Manuscripts', 
    caption: 'Resting her hand on an old book. The rising flame softly illuminated the abyss of the story.' },

  { src: `${base}/images/56.webp`, title: 'The Brush in a Sunbeam', 
    caption: 'Dappled sunlight dances on the paper. Beside the lined green bottles, she begins to record the events of the day.' },

  { src: `${base}/images/55.webp`, title: 'Window for Admiring Stars', 
    caption: 'The silence of the night dwells within the telescope. Stardust in the water bowl and a candle carried the breath of the distant sky.' },

  { src: `${base}/images/54.webp`, title: 'The Hallway of Archives', 
    caption: 'Holding a slip of paper up to the sun. The scent of wood from deep within the shelves enveloped fragments of old records.' },

  { src: `${base}/images/53.webp`, title: 'Fan and Bamboo Staff', 
    caption: 'Softly spreading the green fan. Sunlight through the lattice left its heat upon her dignified presence.' },

  { src: `${base}/images/52.webp`, title: 'Watering the Garden', 
    caption: 'Pouring water onto the flowers with a watering can. The patterns of light at her feet lightly colored the morning tasks.' },

  { src: `${base}/images/51.webp`, title: 'The Study of Records', 
    caption: 'Adding to a map on a desk bathed in dappled light. Old books on the shelves watched over the accumulated wisdom.' },

  { src: `${base}/images/50.webp`, title: 'Morning of Lined Porcelain', 
    caption: 'Writing characters in a room of blue light. The bottles by the window reflected the clear morning air.' },

  { src: `${base}/images/49.webp`, title: 'Tidings of Crimson Leaves', 
    caption: 'Lowering her eyes to a letter atop the autumn leaves. A white-winged visitor conveyed the deepening of autumn.' },

  { src: `${base}/images/48.webp`, title: 'Windowside in Spring', 
    caption: 'Pointing toward the spring sky before the flowers. Soft colors by the window celebrated the new season.' },

  { src: `${base}/images/47.webp`, title: 'The Wisteria Gate', 
    caption: 'Passing through the gate of swaying purple flowers to gaze at the ridge. A cool breeze announced the start of a journey.' },

  { src: `${base}/images/46.webp`, title: 'By the Ancient Pillar', 
    caption: 'Exchanging glances with a cat in the light from the skylight. Morning silence filled the walls that had marked time.' },

  { src: `${base}/images/45.webp`, title: 'Slumber on the Veranda', 
    caption: 'Cradling a small life in a pool of sunshine. Cascading particles of light enveloped the peaceful sleep.' },

  { src: `${base}/images/44.webp`, title: 'A Break with a Teacup', 
    caption: 'Turning pages while watching the steam from the teacup. Afternoon light softly supported her time of reading.' },

  { src: `${base}/images/43.webp`, title: 'The Glass Conservatory', 
    caption: 'Fingertips reach toward the glass case. The enclosed greenery breathes quietly within the light.' },

  { src: `${base}/images/42.webp`, title: 'A Moment of Repose', 
    caption: 'Resting hands on the desk while gazing out the window. A stray smile fills the room with warmth.' },

  { src: `${base}/images/41.webp`, title: 'The Twilight Corridor', 
    caption: 'Moving between bookshelves by the light of a lantern. A red scarf softens the nocturnal silence.' },

  { src: `${base}/images/40.webp`, title: 'Budding Observation Records', 
    caption: 'Tracing the outlines of leaves in an atlas. The drifting breeze colors the quiet afternoon work.' },

  { src: `${base}/images/39.webp`, title: 'Night Lamps and Calculations', 
    caption: 'Chasing numbers amidst a sea of books. The lamp’s glow gently cradles a focused profile.' },

  { src: `${base}/images/38.webp`, title: 'The Circular Study', 
    caption: 'The rhythmic clicking of an abacus echoes. The orderly air of the room supports the daily records.' },

  { src: `${base}/images/37.webp`, title: 'Reminiscence at the Bookstacks', 
    caption: 'Pausing before the shelves. Beneath the hood, the scent of old paper carries a peaceful time.' },

  { src: `${base}/images/36.webp`, title: 'Greenery Through Glass', 
    caption: 'Light shimmers through specimen jars. Memories of the forest, trapped in glass, twinkle silently.' },

  { src: `${base}/images/35.webp`, title: 'Breath of the Seedbeds', 
    caption: 'Watching over young leaves together. The earthy scent in the wooden room conveys the sign of life.' },

  { src: `${base}/images/34.webp`, title: 'Brushstrokes in the Sunlight', 
    caption: 'Morning light dances upon hands at work. Lined vials quietly color the time spent recording.' },

  { src: `${base}/images/33.webp`, title: 'The Desk of Sealing Wax', 
    caption: 'Resting a finger upon a letter. The crimson wax shines as a testament to words locked away.' },

  { src: `${base}/images/32.webp`, title: 'From the Ivy-Clad Window', 
    caption: 'Gazing at the high moon from the window frame. Swaying hair echoes faintly in the dead of night.' },

  { src: `${base}/images/31.webp`, title: 'Midnight Lantern', 
    caption: 'Tending the flame beneath the eaves. Warm light carves a sanctuary out of the nocturnal silence.' },

  { src: `${base}/images/30.webp`, title: 'Wall Notations and Candlelight', 
    caption: 'Standing still before ancient records. A small flame carves shadows of knowledge upon the wall.' },

  { src: `${base}/images/29.webp`, title: 'A Smile Against the Sunlight', 
    caption: 'Smiling quietly while checking a document. Light through the lattice envelops her very being.' },

  { src: `${base}/images/28.webp`, title: 'Butterfly Specimens and Green Shadows', 
    caption: 'Staring intently at the colors of wings. Butterflies in the sunlit dappling seem poised to fly.' },

  { src: `${base}/images/27.webp`, title: 'Moonlit Night with Lanterns', 
    caption: 'Looking up at the moon amidst a crimson glow. The cool air deepens the forest night.' },

  { src: `${base}/images/26.webp`, title: 'Midday Pause from the Brush', 
    caption: 'Casting a gaze toward the world outside. Sunlight reflecting off vials quietly colors the creation.' },

  { src: `${base}/images/25.webp`, title: 'Specimen Shelves and Light Particles', 
    caption: 'Reaching up for a bottle on the high shelf. Sunlight vividly awakens the greenery within.' },

  { src: `${base}/images/24.webp`, title: 'Wind and the Wandering Map', 
    caption: 'Tracing the outlines of the unknown. A passing breeze carries the premonition of a new journey.' },

  { src: `${base}/images/23.webp`, title: 'Lattice Door in the Dappled Light', 
    caption: 'Light through the lattice patterns her shoulder. The fresh scent of green melts into the air.' },

  { src: `${base}/images/22.webp`, title: 'The Verdant Greenhouse', 
    caption: 'Soft sunlight cradles the seedlings, as bottled greens melt into the morning light.' },

  { src: `${base}/images/21.webp`, title: 'Mixing Table of Small Bottles', 
    caption: 'Tilting a small bottle, she examines the color. The herbs and tools neatly arranged signal the quiet start of the day’s work.' },

  { src: `${base}/images/20.webp`, title: 'Library Hall of the Forest', 
    caption: 'She walks slowly down the corridor where patterns of light stretch across the floor. A small slip of paper on the shelf gleams softly in the stillness.' },

  { src: `${base}/images/19.webp`, title: 'Morning Record Book', 
    caption: 'She writes quietly in the open notebook. A cup of steaming tea gently supports the beginning of her morning.' },

  { src: `${base}/images/18.webp`, title: 'In Front of the Glass Cabinet', 
    caption: 'Each time she checks a label, sunlight reflects and creates soft colors. A calm warmth fills the room little by little.' },

  { src: `${base}/images/17.webp`, title: 'Looking Over the Forest', 
    caption: 'She sets down her notebook and looks toward the greenery. The morning wind stirs the leaves, preparing the rhythm of the new day.' },

  { src: `${base}/images/16.webp`, title: 'Holding Books at Dusk', 
    caption: 'The weight of the books warms her arms. Evening light gently brings out the scent of the wooden shelves.' },

  { src: `${base}/images/15.webp`, title: 'Shelf of Shimmering Bottles', 
    caption: 'When she touches a bottle, its inner color flickers softly. The small glow spreads a quiet aftertone across the room.' },

  { src: `${base}/images/14.webp`, title: 'Desk in Leaf-Shadow', 
    caption: 'Her gaze pauses on the open book. Ivy sways by the window, casting faint shadows in the afternoon air.' },

  { src: `${base}/images/13.webp`, title: 'The Map Room', 
    caption: 'She follows the lines of the wall-mounted map. Candlelight shifts slowly, changing the expression of the old paper.' },

  { src: `${base}/images/12.webp`, title: 'Lamplight and Paper', 
    caption: 'Tracing the manuscript with her fingertips, the paper gives a soft sound. Night light deepens the atmosphere around her hands.' },

  { src: `${base}/images/11.webp`, title: 'Desk of Sunlit Leaves', 
    caption: 'The breeze from outside stirs the page gently. Shadows of the trees draw light patterns across the paper.' },

  { src: `${base}/images/10.webp`, title: 'Between the Bookshelves', 
    caption: 'She glances back while walking between the rows of spines. Her red scarf sways, slicing lightly through the air.' },

  { src: `${base}/images/9.webp`, title: 'In the Corner of the Library', 
    caption: 'She pauses with the book open. Light through the shoji gently reveals the outline of each character.' },

  { src: `${base}/images/8.webp`, title: 'Autumn Mixing Desk', 
    caption: 'She organizes her notes while watching the changing colors outside. Wooden tools absorb the soft presence of autumn.' },

  { src: `${base}/images/7.webp`, title: 'An Afternoon Doze', 
    caption: 'Her breath deepens as she drifts off with her face near the book. A cup still holding warmth supports the quiet flow of the afternoon.' },

  { src: `${base}/images/6.webp`, title: 'The Shared Worktable', 
    caption: 'She watches closely beside her mother’s hands as the brush begins to move. Warm light leaves a gentle temperature between the two of them.' },

  { src: `${base}/images/5.webp`, title: 'Room of Lamps and Maps', 
    caption: 'A lamp lights the desk where the map is spread. The paper’s ridges rise gently, revealing a quiet path beneath the glow.' },

  { src: `${base}/images/4.webp`, title: 'Shelves of Night', 
    caption: 'The night outside settles softly onto her fingertips as she closes the lid. The jars reflect the faint glimmer of the sleeping seeds within.' },

  { src: `${base}/images/3.webp`, title: 'A Page Half Written', 
    caption: 'Her brush pauses above the unfinished words. Shadows from the stacked books stretch quietly across the open notebook.' },

  { src: `${base}/images/2.webp`, title: 'Moonlit Window', 
    caption: 'With her fingers resting on the scarf, she lifts her gaze toward the night sky. Moonlight fills the window, breathing depth into the silence.' },

  { src: `${base}/images/1.webp`, title: 'Morning of Pressed Leaves', 
    caption: 'A faint color falls onto her fingertips as she checks each tag. The morning task before the jars carries a gentle sense of completion.' },
];


const gallery = $("#cardGallery");

/**
 * 【修正ポイント】英語版ギャラリー描画
 * alt属性に "Artwork of Kameko:" を追加し、英語の画像検索に対応させます
 */
gallery.innerHTML = items.map((it, i)=>`
  <figure class="card" data-i="${i}" tabindex="0" aria-label="${it.title}">
    <div class="card__imgwrap">
      <img src="${it.src}" 
           alt="Green-haired Girl in Kimono, Kameko - ${it.title} | ${it.caption}" 
           loading="lazy">
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
  lbImg.alt = `Green-haired Girl in Kimono, Kameko: ${it.title}`; // ライトボックス内もKameko名義で
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

// イベントリスナー
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

btnClose.addEventListener("click", closeLB);
zonePrev.addEventListener("click", ()=> move(-1));
zoneNext.addEventListener("click", ()=> move(1));

lbImg.addEventListener("click", (e)=>{
  const rect = lbImg.getBoundingClientRect();
  const mid = rect.left + rect.width/2;
  if(e.clientX < mid) move(-1); else move(1);
});

document.addEventListener("keydown", (e)=>{
  if(lb.hidden) return;
  if(e.key === "Escape") closeLB();
  if(e.key === "ArrowLeft") move(-1);
  if(e.key === "ArrowRight") move(1);
});

// Swipe設定
let sx = null;
lb.addEventListener("pointerdown", (e)=>{
  if(e.pointerType === "mouse") return;
  sx = e.clientX;
  lb.setPointerCapture(e.pointerId);
});
lb.addEventListener("pointerup", (e)=>{
  if(sx == null) return;
  const dx = e.clientX - sx;
  if(Math.abs(dx) > 40) move(dx < 0 ? 1 : -1);
  sx = null;
});

/**
 * 【修正ポイント】Google SEO対策（英語版）
 * 全アイテムのnameに "Kameko:" を追加。
 * また、inLanguage設定を補足して英語圏への露出を狙います。
 */
const scriptLD = document.createElement('script');
scriptLD.type = 'application/ld+json';
scriptLD.innerHTML = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  "name": "Kameko’s Workshop — Art Gallery of a Green-haired Girl in Kimono",
  "description": "Daily fantasy art of Kameko, a green-haired girl in kimono, quietly creating in a forest studio. A collection of enchanting backgrounds and stories.",
  "inLanguage": "en-US",
  "author": {
    "@type": "Person",
    "name": "Asunaro Works"
  },
  "hasPart": items.map(it => ({
    "@type": "ImageObject",
    // 検索結果の「タイトル」として表示される部分に属性を挿入
    "name": `Green-haired Girl in Kimono, Kameko: ${it.title}`, 
    "description": it.caption,
    "contentUrl": window.location.origin + window.location.pathname.replace('index.html', '') + it.src.replace('./', '')
  }))
});
document.head.appendChild(scriptLD);

// noscript（クローラー向けテキスト）
const noscript = document.createElement('noscript');
noscript.innerHTML = `<div style="display:none;"><h2>Kameko: Green-haired Girl in Kimono - Artwork Index</h2><ul>` + 
    items.map(it => `<li>Green-haired Girl in Kimono, Kameko - ${it.title}: ${it.caption}</li>`).join('') + 
    `</ul></div>`;
document.body.appendChild(noscript);