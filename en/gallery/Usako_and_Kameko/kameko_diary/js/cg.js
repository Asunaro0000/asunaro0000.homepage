// Minimal card gallery with lightbox navigation (left/right click zones)
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

// 画像ごとに個別キャプションを設定

const items = [
  { src: './images/70.webp', title: 'Records Spread by Lamplight', 
    caption: 'The lantern stains the paper in shades of orange. In her smiling eyes, a small flicker of tomorrow’s premonition was lit.' },

  { src: './images/69.webp', title: 'The High-Ceiled Corridor', 
    caption: 'Blue afternoon light gathers between the beams. She took in the quiet breathing of the manor with her whole being.' },

  { src: './images/68.webp', title: 'Afternoon Tea Table', 
    caption: 'Gazing at the white flowers and the steam from the teacup. Ivy by the window inscribed faint shadows upon the pages.' },

  { src: './images/67.webp', title: 'The Sunlit Preparation Room', 
    caption: 'The breeze rustles the small bottles. In a room where particles of light danced, she reached for the inspiration of a new scent.' },

  { src: './images/66.webp', title: 'Repose by the Window', 
    caption: 'Wrapped in the warmth of her scarf, she lowers her gaze. The lemon in the water bowl breathed within the sunlight.' },

  { src: './images/65.webp', title: 'Before the Celadon Shelves', 
    caption: 'Blue vessels color the morning with coolness. Each time she traced the silhouette of a bottle, the waves in her heart grew still.' },

  { src: './images/64.webp', title: 'The Veranda Where the Fan Rests', 
    caption: 'Light through the window scatters across the red fan. Before her diary, a moment of rest flowed quietly.' },

  { src: './images/63.webp', title: 'The Beginning Wind', 
    caption: 'She turns her gaze toward the garden filled with light. The red carpet beneath her feet quietly supported her steady steps.' },

  { src: './images/62.webp', title: 'The Corridor of Lengthening Shadows', 
    caption: 'Shadows stretch along the long hallway. As she stepped forward with a broom in hand, the old books were quietly awakening.' },

  { src: './images/61.webp', title: 'The Staff and Morning Light', 
    caption: 'Tracing the documents with her staff by her side. Sunlight from the window vividly colored the memories of her journey.' },

  { src: './images/60.webp', title: 'A Time to Open the Door', 
    caption: 'Reaching out toward the light outside. The air, scented with herbs, announced the arrival of a new season.' },

  { src: './images/59.webp', title: 'Morning of Sweeping Clean', 
    caption: 'Walking through the library where light dances. Picking up a fallen leaf, she slowly shaped the outline of the day.' },

  { src: './images/58.webp', title: 'Premonition of a Deep Blue Night', 
    caption: 'Gazing at the pages with the night-colored window at her back. The greenery in the water bowl filled the room with deep peace.' },

  { src: './images/57.webp', title: 'Candlelight and Ancient Manuscripts', 
    caption: 'Resting her hand on an old book. The rising flame softly illuminated the abyss of the story.' },

  { src: './images/56.webp', title: 'The Brush in a Sunbeam', 
    caption: 'Dappled sunlight dances on the paper. Beside the lined green bottles, she begins to record the events of the day.' },

  { src: './images/55.webp', title: 'Window for Admiring Stars', 
    caption: 'The silence of the night dwells within the telescope. Stardust in the water bowl and a candle carried the breath of the distant sky.' },

  { src: './images/54.webp', title: 'The Hallway of Archives', 
    caption: 'Holding a slip of paper up to the sun. The scent of wood from deep within the shelves enveloped fragments of old records.' },

  { src: './images/53.webp', title: 'Fan and Bamboo Staff', 
    caption: 'Softly spreading the green fan. Sunlight through the lattice left its heat upon her dignified presence.' },

  { src: './images/52.webp', title: 'Watering the Garden', 
    caption: 'Pouring water onto the flowers with a watering can. The patterns of light at her feet lightly colored the morning tasks.' },

  { src: './images/51.webp', title: 'The Study of Records', 
    caption: 'Adding to a map on a desk bathed in dappled light. Old books on the shelves watched over the accumulated wisdom.' },

  { src: './images/50.webp', title: 'Morning of Lined Porcelain', 
    caption: 'Writing characters in a room of blue light. The bottles by the window reflected the clear morning air.' },

  { src: './images/49.webp', title: 'Tidings of Crimson Leaves', 
    caption: 'Lowering her eyes to a letter atop the autumn leaves. A white-winged visitor conveyed the deepening of autumn.' },

  { src: './images/48.webp', title: 'Windowside in Spring', 
    caption: 'Pointing toward the spring sky before the flowers. Soft colors by the window celebrated the new season.' },

  { src: './images/47.webp', title: 'The Wisteria Gate', 
    caption: 'Passing through the gate of swaying purple flowers to gaze at the ridge. A cool breeze announced the start of a journey.' },

  { src: './images/46.webp', title: 'By the Ancient Pillar', 
    caption: 'Exchanging glances with a cat in the light from the skylight. Morning silence filled the walls that had marked time.' },

  { src: './images/45.webp', title: 'Slumber on the Veranda', 
    caption: 'Cradling a small life in a pool of sunshine. Cascading particles of light enveloped the peaceful sleep.' },

  { src: './images/44.webp', title: 'A Break with a Teacup', 
    caption: 'Turning pages while watching the steam from the teacup. Afternoon light softly supported her time of reading.' },

  { src: './images/43.webp', title: 'The Glass Conservatory', 
    caption: 'Fingertips reach toward the glass case. The enclosed greenery breathes quietly within the light.' },

  { src: './images/42.webp', title: 'A Moment of Repose', 
    caption: 'Resting hands on the desk while gazing out the window. A stray smile fills the room with warmth.' },

  { src: './images/41.webp', title: 'The Twilight Corridor', 
    caption: 'Moving between bookshelves by the light of a lantern. A red scarf softens the nocturnal silence.' },

  { src: './images/40.webp', title: 'Budding Observation Records', 
    caption: 'Tracing the outlines of leaves in an atlas. The drifting breeze colors the quiet afternoon work.' },

  { src: './images/39.webp', title: 'Night Lamps and Calculations', 
    caption: 'Chasing numbers amidst a sea of books. The lamp’s glow gently cradles a focused profile.' },

  { src: './images/38.webp', title: 'The Circular Study', 
    caption: 'The rhythmic clicking of an abacus echoes. The orderly air of the room supports the daily records.' },

  { src: './images/37.webp', title: 'Reminiscence at the Bookstacks', 
    caption: 'Pausing before the shelves. Beneath the hood, the scent of old paper carries a peaceful time.' },

  { src: './images/36.webp', title: 'Greenery Through Glass', 
    caption: 'Light shimmers through specimen jars. Memories of the forest, trapped in glass, twinkle silently.' },

  { src: './images/35.webp', title: 'Breath of the Seedbeds', 
    caption: 'Watching over young leaves together. The earthy scent in the wooden room conveys the sign of life.' },

  { src: './images/34.webp', title: 'Brushstrokes in the Sunlight', 
    caption: 'Morning light dances upon hands at work. Lined vials quietly color the time spent recording.' },

  { src: './images/33.webp', title: 'The Desk of Sealing Wax', 
    caption: 'Resting a finger upon a letter. The crimson wax shines as a testament to words locked away.' },

  { src: './images/32.webp', title: 'From the Ivy-Clad Window', 
    caption: 'Gazing at the high moon from the window frame. Swaying hair echoes faintly in the dead of night.' },

  { src: './images/31.webp', title: 'Midnight Lantern', 
    caption: 'Tending the flame beneath the eaves. Warm light carves a sanctuary out of the nocturnal silence.' },

  { src: './images/30.webp', title: 'Wall Notations and Candlelight', 
    caption: 'Standing still before ancient records. A small flame carves shadows of knowledge upon the wall.' },

  { src: './images/29.webp', title: 'A Smile Against the Sunlight', 
    caption: 'Smiling quietly while checking a document. Light through the lattice envelops her very being.' },

  { src: './images/28.webp', title: 'Butterfly Specimens and Green Shadows', 
    caption: 'Staring intently at the colors of wings. Butterflies in the sunlit dappling seem poised to fly.' },

  { src: './images/27.webp', title: 'Moonlit Night with Lanterns', 
    caption: 'Looking up at the moon amidst a crimson glow. The cool air deepens the forest night.' },

  { src: './images/26.webp', title: 'Midday Pause from the Brush', 
    caption: 'Casting a gaze toward the world outside. Sunlight reflecting off vials quietly colors the creation.' },

  { src: './images/25.webp', title: 'Specimen Shelves and Light Particles', 
    caption: 'Reaching up for a bottle on the high shelf. Sunlight vividly awakens the greenery within.' },

  { src: './images/24.webp', title: 'Wind and the Wandering Map', 
    caption: 'Tracing the outlines of the unknown. A passing breeze carries the premonition of a new journey.' },

  { src: './images/23.webp', title: 'Lattice Door in the Dappled Light', 
    caption: 'Light through the lattice patterns her shoulder. The fresh scent of green melts into the air.' },

  { src: './images/22.webp', title: 'The Verdant Greenhouse', 
    caption: 'Soft sunlight cradles the seedlings, as bottled greens melt into the morning light.' },

  { src: './images/21.webp', title: 'Mixing Table of Small Bottles', 
    caption: 'Tilting a small bottle, she examines the color. The herbs and tools neatly arranged signal the quiet start of the day’s work.' },

  { src: './images/20.webp', title: 'Library Hall of the Forest', 
    caption: 'She walks slowly down the corridor where patterns of light stretch across the floor. A small slip of paper on the shelf gleams softly in the stillness.' },

  { src: './images/19.webp', title: 'Morning Record Book', 
    caption: 'She writes quietly in the open notebook. A cup of steaming tea gently supports the beginning of her morning.' },

  { src: './images/18.webp', title: 'In Front of the Glass Cabinet', 
    caption: 'Each time she checks a label, sunlight reflects and creates soft colors. A calm warmth fills the room little by little.' },

  { src: './images/17.webp', title: 'Looking Over the Forest', 
    caption: 'She sets down her notebook and looks toward the greenery. The morning wind stirs the leaves, preparing the rhythm of the new day.' },

  { src: './images/16.webp', title: 'Holding Books at Dusk', 
    caption: 'The weight of the books warms her arms. Evening light gently brings out the scent of the wooden shelves.' },

  { src: './images/15.webp', title: 'Shelf of Shimmering Bottles', 
    caption: 'When she touches a bottle, its inner color flickers softly. The small glow spreads a quiet aftertone across the room.' },

  { src: './images/14.webp', title: 'Desk in Leaf-Shadow', 
    caption: 'Her gaze pauses on the open book. Ivy sways by the window, casting faint shadows in the afternoon air.' },

  { src: './images/13.webp', title: 'The Map Room', 
    caption: 'She follows the lines of the wall-mounted map. Candlelight shifts slowly, changing the expression of the old paper.' },

  { src: './images/12.webp', title: 'Lamplight and Paper', 
    caption: 'Tracing the manuscript with her fingertips, the paper gives a soft sound. Night light deepens the atmosphere around her hands.' },

  { src: './images/11.webp', title: 'Desk of Sunlit Leaves', 
    caption: 'The breeze from outside stirs the page gently. Shadows of the trees draw light patterns across the paper.' },

  { src: './images/10.webp', title: 'Between the Bookshelves', 
    caption: 'She glances back while walking between the rows of spines. Her red scarf sways, slicing lightly through the air.' },

  { src: './images/9.webp', title: 'In the Corner of the Library', 
    caption: 'She pauses with the book open. Light through the shoji gently reveals the outline of each character.' },

  { src: './images/8.webp', title: 'Autumn Mixing Desk', 
    caption: 'She organizes her notes while watching the changing colors outside. Wooden tools absorb the soft presence of autumn.' },

  { src: './images/7.webp', title: 'An Afternoon Doze', 
    caption: 'Her breath deepens as she drifts off with her face near the book. A cup still holding warmth supports the quiet flow of the afternoon.' },

  { src: './images/6.webp', title: 'The Shared Worktable', 
    caption: 'She watches closely beside her mother’s hands as the brush begins to move. Warm light leaves a gentle temperature between the two of them.' },

  { src: './images/5.webp', title: 'Room of Lamps and Maps', 
    caption: 'A lamp lights the desk where the map is spread. The paper’s ridges rise gently, revealing a quiet path beneath the glow.' },

  { src: './images/4.webp', title: 'Shelves of Night', 
    caption: 'The night outside settles softly onto her fingertips as she closes the lid. The jars reflect the faint glimmer of the sleeping seeds within.' },

  { src: './images/3.webp', title: 'A Page Half Written', 
    caption: 'Her brush pauses above the unfinished words. Shadows from the stacked books stretch quietly across the open notebook.' },

  { src: './images/2.webp', title: 'Moonlit Window', 
    caption: 'With her fingers resting on the scarf, she lifts her gaze toward the night sky. Moonlight fills the window, breathing depth into the silence.' },

  { src: './images/1.webp', title: 'Morning of Pressed Leaves', 
    caption: 'A faint color falls onto her fingertips as she checks each tag. The morning task before the jars carries a gentle sense of completion.' },
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
