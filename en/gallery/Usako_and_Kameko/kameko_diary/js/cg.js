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
  /* { 
    src: `${base}/images/185.webp`, 
    title: 'Brush of Dappled Light', 
    tags: ['Afternoon', 'Study', 'Writing Tools', 'Writing & Recording'],
    caption: 'Arranging swaying sunlight on the desk. The scent of ink fills the quiet study.' 
  },
  { 
    src: `${base}/images/184.webp`, 
    title: 'Twilight Kitchen', 
    tags: ['Dusk', 'Kitchen', 'Lamp', 'Rest'],
    caption: 'A place lit by a warm lamp. Rising steam conveys the warmth of daily life.' 
  },
  { 
    src: `${base}/images/183.webp`, 
    title: 'Stone-Framed Window', 
    tags: ['Morning Light', 'Windowside', 'Wooden Tag', 'Daily Life'],
    caption: 'The sky looked up at is high and blue. Holding a wooden tag, I feel the arrival of a new season.' 
  },
  { 
    src: `${base}/images/182.webp`, 
    title: 'Black Cat and Note', 
    tags: ['Serenity', 'Study', 'Old Books & Records', 'Writing & Recording'],
    caption: 'A shadow curling up by the desk. The cat nudged its nose against the freshly written letter.' 
  },
  { 
    src: `${base}/images/181.webp`, 
    title: 'Apothecary\'s Concoction', 
    tags: ['Afternoon', 'Apothecary', 'Herb Jars', 'Creation & Mixing'],
    caption: 'Colorful jars lined up on shelves. Spending an afternoon researching amidst the scent of herbs.' 
  },
  { 
    src: `${base}/images/180.webp`, 
    title: 'Tea in the Bamboo Grove', 
    tags: ['Afternoon', 'Nature & Garden', 'Tea Set', 'Rest'],
    caption: 'The scent of green bamboo wafts through the window. My heart melts into the warm steam of the tea.' 
  },
  { 
    src: `${base}/images/179.webp`, 
    title: 'Scroll of Red Camellias', 
    tags: ['Afternoon', 'Study', 'Old Books & Records', 'Thought & Reading'],
    caption: 'Shadows of leaves drawn by light. Unraveling the words written on the hanging scroll, one character at a time.' 
  },
  { 
    src: `${base}/images/178.webp`, 
    title: 'Corridor of Lanterns', 
    tags: ['Night Silence', 'Corridor', 'Lantern', 'Daily Life'],
    caption: 'Suspended lanterns sway. A secret passage surrounded by old books and medicine vials.' 
  },
  { 
    src: `${base}/images/177.webp`, 
    title: 'White Owl\'s Rest', 
    tags: ['Afternoon', 'Mirror Room', 'Owl', 'Rest'], 
    caption: 'A mysterious room lined with mirrors. Sharing the afternoon silence with the owl above.' 
  },
  { 
    src: `${base}/images/176.webp`, 
    title: 'Wind Over the Fields', 
    tags: ['Afternoon', 'Veranda', 'Scarf', 'Daily Life'], 
    caption: 'Looking out at the sea of green from the veranda. Adjusting a red scarf while dreaming of the distant sky.' 
  },
  { 
    src: `${base}/images/175.webp`, 
    title: 'Lotuses in Dappled Light', 
    tags: ['Morning Light', 'Indoor', 'Lotus', 'Rest'], 
    caption: 'Lotuses bloom against red drapery. Enveloped in soft light, quietly waiting for spring.' 
  },
  { 
    src: `${base}/images/174.webp`, 
    title: 'Bamboo Hideaway', 
    tags: ['Afternoon', 'Forest', 'Tools', 'Rest'], 
    caption: 'Taking a break on a bench in the shade. Setting down maintenance tools and listening to the deep forest breath.' 
  },
  { 
    src: `${base}/images/173.webp`, 
    title: 'Vermilion Grooming', 
    tags: ['Night Silence', 'Indoor', 'Fan', 'Daily Life'], 
    caption: 'Holding a fan before the mirror. The light of swaying lanterns gently illuminates the room.' 
  },
  { 
    src: `${base}/images/172.webp`, 
    title: 'Gardening in the Library', 
    tags: ['Afternoon', 'Study', 'Brush', 'Writing & Recording'], 
    caption: 'Taking up the brush beside the bookshelf. The golden scenery spreading in the garden refreshes the eyes.' 
  },
  { 
    src: `${base}/images/171.webp`, 
    title: 'Pagoda Through Bamboo', 
    tags: ['Afternoon', 'Veranda', 'Bamboo Grove', 'Daily Life'], 
    caption: 'Gazing at a distant pagoda from the veranda. Bamboo leaves swaying in the wind bring a cool sound.' 
  },
  { 
    src: `${base}/images/170.webp`, 
    title: 'Writing Amidst Verdure', 
    tags: ['Afternoon', 'Study', 'Plants', 'Writing & Recording'], 
    caption: 'With a wall of green behind the window. Flowers in transparent bottles add color to the story.' 
  },
  { 
    src: `${base}/images/169.webp`, 
    title: 'Twilight Concoction', 
    tags: ['Dusk', 'Apothecary', 'Botanical Illustration', 'Creation & Mixing'], 
    caption: 'Surrounded by camellia illustrations. A quiet moment of moving the brush in the orange light.' 
  },
  { 
    src: `${base}/images/168.webp`, 
    title: 'Blue Bird and Vermilion Wall', 
    tags: ['Afternoon', 'Lattice Door', 'Small Bird', 'Daily Life'], 
    caption: 'Placing a hand on the red lattice door. Communing with a small bird perched overhead.' 
  },
  { 
    src: `${base}/images/167.webp`, 
    title: 'Emerald Corridor', 
    tags: ['Afternoon', 'Corridor', 'Bamboo Fence', 'Daily Life'], 
    caption: 'A stone path following a bamboo fence. Moving forward enveloped in the scent of fresh greenery.' 
  },
  { 
    src: `${base}/images/166.webp`, 
    title: 'Dappled Slumber', 
    tags: ['Afternoon', 'Study', 'Writing Desk', 'Rest'], 
    caption: 'Resting a cheek on the desk. Light streaming through the window marks a peaceful time.' 
  },
  { 
    src: `${base}/images/165.webp`, 
    title: 'Breath of Red Cherry Blossoms', 
    tags: ['Spring Sunlight', 'Nature & Garden', 'Cherry Blossoms', 'Daily Life'], 
    caption: 'Pouring spring sunlight. Silently looking up at the sky under the cherry blossom branches.' 
  },
  { 
    src: `${base}/images/164.webp`, 
    title: 'Blue Flower and Spring Haze', 
    tags: ['Morning Light', 'Windowside', 'Single Flower Vase', 'Daily Life'], 
    caption: 'The world outside the window is pale pink. A single blue flower quietly announces the arrival of spring.' 
  },
  { 
    src: `${base}/images/163.webp`, 
    title: 'Library Drowse', 
    tags: ['Afternoon', 'Study', 'Cat', 'Thought & Reading'], 
    caption: 'Tracing the green spines with a finger. At my feet, a black cat is quietly dreaming.' 
  },
  { 
    src: `${base}/images/162.webp`, 
    title: 'Gardener\'s Moment', 
    tags: ['Afternoon', 'Nature & Garden', 'Pruning Shears', 'Daily Life'], 
    caption: 'Bringing the blade close to white petals. The breath of the deep forest passes through my white sleeves.' 
  },
  { 
    src: `${base}/images/161.webp`, 
    title: 'Amber Harvest', 
    tags: ['Afternoon', 'Apothecary', 'Preservation Jar', 'Creation & Mixing'], 
    caption: 'Fruit nectar dissolves in the jar. Checking autumn memories lined up on the shelf one by one.' 
  },
  { 
    src: `${base}/images/160.webp`, 
    title: 'Secret of the Lattice Window', 
    tags: ['Afternoon', 'Windowside', 'Blue Bottle', 'Daily Life'], 
    caption: 'The blue of the bottle dyes the shadows. Imagining the unseen scenery beyond the lattice.' 
  },
  { 
    src: `${base}/images/159.webp`, 
    title: 'Star-Crossed Windowside', 
    tags: ['Night Silence', 'Windowside', 'Celestial Map', 'Daily Life'], 
    caption: 'When the moon reaches its zenith. Offering a prayer before an old celestial map.' 
  },
  { 
    src: `${base}/images/158.webp`, 
    title: 'Glass Corridor', 
    tags: ['Afternoon', 'Corridor', 'Medicine Jars', 'Daily Life'], 
    caption: 'With a cool fan in hand. Medicine jars lined on the shelf bounce the afternoon sunlight.' 
  },
  { 
    src: `${base}/images/157.webp`, 
    title: 'Sealed Message', 
    tags: ['Night Silence', 'Study', 'Letter', 'Daily Life'], 
    caption: 'Surrounded by blue bookshelves. A letter addressed to someone sways in the night light.' 
  },
  { 
    src: `${base}/images/156.webp`, 
    title: 'Study Overlooking Peaks', 
    tags: ['Afternoon', 'Study', 'Writing Tools', 'Writing & Recording'], 
    caption: 'Setting down the brush against snowy peaks. A new breeze blew through the gaps in old books.' 
  },
  { 
    src: `${base}/images/155.webp`, 
    title: 'Morning Scented with Greenery', 
    tags: ['Morning Light', 'Bedchamber', 'Mirror', 'Daily Life'], 
    caption: 'Light from the bamboo grove fills the room. A quiet awakening of two, like mirror images.' 
  },
  { 
    src: `${base}/images/154.webp`, 
    title: 'White Owl and a Smile', 
    tags: ['Afternoon', 'Study', 'Owl', 'Daily Life'], 
    caption: 'A smile shared beside the sage. Spreading a red cloth to begin a new journey.' 
  },
  { 
    src: `${base}/images/153.webp`, 
    title: 'Library Silence', 
    tags: ['Afternoon', 'Study', 'Comb', 'Thought & Reading'], 
    caption: 'A seat in the afternoon surrounded by books. Thinking of passing time through an old comb.' 
  },
  { 
    src: `${base}/images/152.webp`, 
    title: 'Incense of Emerald Leaves', 
    tags: ['Afternoon', 'Apothecary', 'Herb Jar', 'Daily Life'], 
    caption: 'Bringing a single leaf to the nose. Tracing forest memories trapped within the jar.' 
  },
  { 
    src: `${base}/images/151.webp`, 
    title: 'Gift of Steam', 
    tags: ['Afternoon', 'Veranda', 'Steamer', 'Daily Life'], 
    caption: 'Feeling the breeze from the bamboo grove. Delivering freshly steamed warmth to a loved one.' 
  }, */
  { 
    src: `${base}/images/150.webp`, 
    title: 'Reflections on the Desk', 
    tags: ['Afternoon', 'Study', 'Letter', 'Writing & Recording'], 
    caption: 'Writing quiet thoughts in a letter. A red muffler announces the arrival of winter.' 
  },
  { 
    src: `${base}/images/149.webp`, 
    title: 'Floral Apothecary Shelf', 
    tags: ['Morning Light', 'Apothecary', 'Herb Jars', 'Daily Life'], 
    caption: 'Jars containing blue flowers. Morning light illuminates the secret shelves.' 
  },
  { 
    src: `${base}/images/148.webp`, 
    title: 'Vials of Falling Stars', 
    tags: ['Night Silence', 'Apothecary', 'Vial', 'Creation & Mixing'], 
    caption: 'Purple radiance lined on the shelf. Searching for stories in the depths of the shelf between mixing.' 
  },
  { 
    src: `${base}/images/147.webp`, 
    title: 'Back Overlooking the Garden', 
    tags: ['Afternoon', 'Windowside', 'Key', 'Daily Life'], 
    caption: 'The emerald world spreading outside the window. Holding a key, dreaming of distant lands.' 
  },
  { 
    src: `${base}/images/146.webp`, 
    title: 'Windowside in Dappled Light', 
    tags: ['Afternoon', 'Windowside', 'Wheel', 'Daily Life'], 
    caption: 'Turning wheels and swaying trees. Soft light streams into the quiet room.' 
  },
  { 
    src: `${base}/images/145.webp`, 
    title: 'In the Green Study', 
    tags: ['Afternoon', 'Study', 'Tea Cup', 'Rest'], 
    caption: 'A moment in the afternoon with dancing sunlight. Resting the brush with the scent of tea.' 
  },
  { 
    src: `${base}/images/144.webp`, 
    title: 'Garden Offering', 
    tags: ['Morning Light', 'Stone Pavement', 'Basket', 'Daily Life'], 
    caption: 'A basket filled with the breath of spring. Walking onto the stone pavement with a swaying red shawl.' 
  },
  { 
    src: `${base}/images/143.webp`, 
    title: 'House of Falling Blue', 
    tags: ['Afternoon', 'Indoor', 'Blue Flowers', 'Daily Life'], 
    caption: 'Azure spilling from the ceiling. A soft smile melts into the blue flowers.' 
  },
  { 
    src: `${base}/images/142.webp`, 
    title: 'Crimson Curtain', 
    tags: ['Afternoon', 'Indoor', 'Staff', 'Rest'], 
    caption: 'Protected by large blossoms. Carrying a staff, quietly waiting for the next season.' 
  },
  { 
    src: `${base}/images/141.webp`, 
    title: 'Dialogue in the Shadows', 
    tags: ['Afternoon', 'Indoor', 'Black Cat', 'Daily Life'], 
    caption: 'A black beast approaches my feet. Holding a fan, I was listening to the words of the shadows.' 
  },
  { 
    src: `${base}/images/140.webp`, 
    title: 'Golden Key', 
    tags: ['Morning Light', 'Study', 'White Dove', 'Daily Life'], 
    caption: 'A key hidden in the heart glows. Unraveling a new story in a room where white doves fly.' 
  },
  { 
    src: `${base}/images/139.webp`, 
    title: 'Bamboo Grove Study', 
    tags: ['Afternoon', 'Study', 'Dog', 'Rest'], 
    caption: 'Relaxing with distant mountains behind. A peaceful afternoon spent with a loyal dog.' 
  },
  { 
    src: `${base}/images/138.webp`, 
    title: 'Hydrangea Sleeve', 
    tags: ['Afternoon', 'Corridor', 'Hydrangea', 'Daily Life'], 
    caption: 'Wearing purple petals. Chasing the scent dancing in the wind, I suddenly stopped.' 
  },
  { 
    src: `${base}/images/137.webp`, 
    title: 'Lapis Flower Shadow', 
    tags: ['Afternoon', 'Veranda', 'Tea Cup', 'Rest'], 
    caption: 'Blue flowers sway in the lattice. Sipping warm tea, drinking in the silence of the garden.' 
  },
  { 
    src: `${base}/images/136.webp`, 
    title: 'Serene Duties', 
    tags: ['Afternoon', 'Study', 'Key', 'Writing & Recording'], 
    caption: 'An old desk with a key. Stacked books and dappled light deepen my thoughts.' 
  },
  { 
    src: `${base}/images/135.webp`, 
    title: 'Arrival of Spring Sun', 
    tags: ['Morning Light', 'Veranda', 'Deer', 'Rest'], 
    caption: 'Narrowing my eyes at the presence of a deer. Cherry-colored curtains brought spring to the veranda.' 
  },
  { 
    src: `${base}/images/134.webp`, 
    title: 'Blooming Apothecary Room', 
    tags: ['Morning Light', 'Apothecary', 'Blue Flowers', 'Daily Life'], 
    caption: 'Welcoming spring with a smile amidst falling blue petals.' 
  },
  { 
    src: `${base}/images/133.webp`, 
    title: 'Forest Pruning', 
    tags: ['Afternoon', 'Nature & Garden', 'Pruning Shears', 'Daily Life'], 
    caption: 'Trimming branches with a sharp blade. The scent of herbs becomes deeply familiar to my fingertips.' 
  },
  { 
    src: `${base}/images/132.webp`, 
    title: 'Gazing at the Ridges', 
    tags: ['Dusk', 'High Ground', 'Wildflowers', 'Daily Life'], 
    caption: 'Gently holding a plucked flower, dreaming of stories from the distant, hazy mountains.' 
  },
  { 
    src: `${base}/images/131.webp`, 
    title: 'Reading by the Window', 
    tags: ['Afternoon', 'Windowside', 'Old Book', 'Thought & Reading'], 
    caption: 'Swaying shadows trace the pages. Keeping the serene afternoon time all to myself.' 
  },
  { 
    src: `${base}/images/130.webp`, 
    title: 'Corridor of Dappled Light', 
    tags: ['Afternoon', 'Corridor', 'Fan', 'Daily Life'], 
    caption: 'Dust motes of light pile on my shoulders. Enticed by the warm breeze, I looked up at the sky.' 
  },
  { 
    src: `${base}/images/129.webp`, 
    title: 'Emerald Sound of Writing', 
    tags: ['Afternoon', 'Study', 'Writing Tools', 'Writing & Recording'], 
    caption: 'Before a bookshelf drifting with the scent of ink, quietly recording old tales.' 
  },
  { 
    src: `${base}/images/128.webp`, 
    title: 'Visitor of Black Wings', 
    tags: ['Dusk', 'Terrace', 'Black Bird', 'Daily Life'], 
    caption: 'Looking up at the sky with a red cloth. Exchanging quiet words with a black bird resting its wings.' 
  },
  { 
    src: `${base}/images/127.webp`, 
    title: 'Map of Fresh Greenery', 
    tags: ['Afternoon', 'Study', 'Magnifying Glass', 'Thought & Reading'], 
    caption: 'Unknown paths reflected in the magnifying glass. Sending my heart to the depths of a forest yet unseen.' 
  },
  { 
    src: `${base}/images/126.webp`, 
    title: 'Display of Ceramic Flowers', 
    tags: ['Afternoon', 'Before the Shelf', 'Ceramics', 'Daily Life'], 
    caption: 'Tracing the ceramic skin with my fingertips. Counting the colors of spring lined on the shelf one by one.' 
  },
  { 
    src: `${base}/images/125.webp`, 
    title: 'Herbal Tea of Green Light', 
    tags: ['Afternoon', 'Nature & Garden', 'Tea Set', 'Rest'], 
    caption: 'In a forest hermitage where sunlight dances, quietly pouring fruit-scented tea.' 
  },
  { 
    src: `${base}/images/124.webp`, 
    title: 'Broom and the Weight of a Cat', 
    tags: ['Morning Light', 'Corridor', 'Broom', 'Daily Life'], 
    caption: 'Cherishing the weight on my shoulder, let’s sweep away the new season.' 
  },
  { 
    src: `${base}/images/123.webp`, 
    title: 'Bottles with Secrets', 
    tags: ['Afternoon', 'Apothecary', 'Blue Bottle', 'Creation & Mixing'], 
    caption: 'Touching the coldness of lined-up blue, quietly envisioning the next concoction.' 
  },
  { 
    src: `${base}/images/122.webp`, 
    title: 'Drowse in the Blue Room', 
    tags: ['Afternoon', 'Indoor', 'Rabbit', 'Rest'], 
    caption: 'Touching the soft fur of a rabbit, entrusting my heart to the scent of tea.' 
  },
  { 
    src: `${base}/images/121.webp`, 
    title: 'Echoing Red Umbrella', 
    tags: ['Afternoon', 'Bamboo Grove', 'Japanese Umbrella', 'Daily Life'], 
    caption: 'Holding up a forest find, listening to the silence echoing in the bamboo grove.' 
  },
  { 
    src: `${base}/images/120.webp`, 
    title: 'Floor Filled with Scent', 
    tags: ['Afternoon', 'Apothecary', 'Lemon', 'Creation & Mixing'], 
    caption: 'Mixing the tartness of lemon, deeply savoring the scent of medicinal herbs.' 
  },
  { 
    src: `${base}/images/119.webp`, 
    title: 'Tidings Carried by Wings', 
    tags: ['Afternoon', 'Windowside', 'Letter', 'Daily Life'], 
    caption: 'Feeling the weight of the letter in my palm, I looked up at the light streaming through the window.' 
  },
  { 
    src: `${base}/images/118.webp`, 
    title: 'Peering Through Glass Green', 
    tags: ['Afternoon', 'Study', 'Magnifying Glass', 'Daily Life'], 
    caption: 'A universe visible through the magnifying glass. Tracing the tiny pulsations of a leaf with my fingertip.' 
  },
  { 
    src: `${base}/images/117.webp`, 
    title: 'Botanical Illustration of Light', 
    tags: ['Afternoon', 'Study', 'Illustrations', 'Writing & Recording'], 
    caption: 'Placing a sunbeam on my fingertip, quietly recording the memory of flowers.' 
  },
  { 
    src: `${base}/images/116.webp`, 
    title: 'Spring Littered Behind', 
    tags: ['Morning Light', 'Nature & Garden', 'Cat', 'Rest'], 
    caption: 'Sitting down on a soft carpet. The warmth of the cat reaches my feet.' 
  },
  { 
    src: `${base}/images/115.webp`, 
    title: 'Listening to the Forest\'s Breath', 
    tags: ['Morning Light', 'Nature & Garden', 'Daily Life'], 
    caption: 'Feeling the cool breeze on my cheek, deeply inhaling the deepening green.' 
  },
  { 
    src: `${base}/images/114.webp`, 
    title: 'Library of Falling Wisteria', 
    tags: ['Morning Light', 'Library', 'Medicinal Liquid', 'Creation & Mixing'], 
    caption: 'Purple clusters color the ceiling. Trapping spring memories in transparent liquid.' 
  },
  { 
    src: `${base}/images/113.webp`, 
    title: 'Small Room of Passing Time', 
    tags: ['Afternoon', 'Windowside', 'Star Map', 'Daily Life'], 
    caption: 'Leaning against the wall with the star map. The fragrance of the garden flows in from the open door.' 
  },
  { 
    src: `${base}/images/112.webp`, 
    title: 'Beside the Azure Pillar', 
    tags: ['Afternoon', 'Manor', 'Daily Life'], 
    caption: 'The mesh of shadows traces my cheek. I was feeling the breath of the quiet manor with my back.' 
  },
  { 
    src: `${base}/images/111.webp`, 
    title: 'Crimson Lit on the Brush', 
    tags: ['Afternoon', 'Veranda', 'Writing Tools', 'Writing & Recording'], 
    caption: 'A drop of thought on the brush tip. Sunlight on the veranda gently wrapped the white paper.' 
  },
  { 
    src: `${base}/images/110.webp`, 
    title: 'Fan and Dappled Light', 
    tags: ['Afternoon', 'Windowside', 'Fan', 'Rest'], 
    caption: 'Fanning the breeze and swaying the blue curtain. The green outside the window is vividly reflected in my eyes.' 
  },
  { 
    src: `${base}/images/109.webp`, 
    title: 'Apothecary Shelf of Colors', 
    tags: ['Afternoon', 'Apothecary', 'Vial', 'Creation & Mixing'], 
    caption: 'Shadows of vials stretch across the floor. Waiting for the time of concoction in the afternoon light.' 
  },
  { 
    src: `${base}/images/108.webp`, 
    title: 'Edge of the Peony Lantern', 
    tags: ['Night Silence', 'Veranda', 'Lantern', 'Daily Life'], 
    caption: 'The flame draws a crimson line. The coolness of the night creeps into the fingertips touching the lattice door.' 
  },
  { 
    src: `${base}/images/107.webp`, 
    title: 'Sunlight and Blue Curtain', 
    tags: ['Morning Light', 'Indoor', 'Noren', 'Daily Life'], 
    caption: 'Dappled light carves the tatami. Beyond the swaying curtain, a new season was waiting.' 
  },
  { 
    src: `${base}/images/106.webp`, 
    title: 'Shelf Lit by Flowers', 
    tags: ['Morning Light', 'Apothecary', 'Muffler', 'Daily Life'], 
    caption: 'Gazing at spring trapped in jars. Fixing my muffler, feeling the hint of winter.' 
  },
  { 
    src: `${base}/images/105.webp`, 
    title: 'Library of Books and Ivy', 
    tags: ['Afternoon', 'Study', 'Old Book', 'Daily Life'], 
    caption: 'Tracing the spines under a green canopy. The scent of old paper was stopping time.' 
  },
  { 
    src: `${base}/images/104.webp`, 
    title: 'Emerald Concoction', 
    tags: ['Afternoon', 'Apothecary', 'Tea Set', 'Creation & Mixing'], 
    caption: 'The steam from brewing tea melts into the green walls. Drinking in the afternoon silence.' 
  },
  { 
    src: `${base}/images/103.webp`, 
    title: 'Corridor of Glass Jars', 
    tags: ['Afternoon', 'Corridor', 'Specimen Jar', 'Daily Life'], 
    caption: 'Passing through shelves lined with specimens. The colors inside the jars quietly watch my progress.' 
  },
  { 
    src: `${base}/images/102.webp`, 
    title: 'Windowside of Autumn Leaves', 
    tags: ['Dusk', 'Windowside', 'Letter', 'Writing & Recording'], 
    caption: 'Scarlet leaves sway. The thoughts put into the letter were transparent in the sunlight.' 
  },
  { 
    src: `${base}/images/101.webp`, 
    title: 'Collecting Morning Dew', 
    tags: ['Morning Light', 'Nature & Garden', 'Vial', 'Daily Life'], 
    caption: 'Filling a vial with shining droplets, being at one with the awakening forest.' 
  },
  { 
    src: `${base}/images/100.webp`, 
    title: 'Azure Handwriting', 
    tags: ['Afternoon', 'Study', 'Writing Tools', 'Writing & Recording'], 
    caption: 'Using fresh green as ink, drawing the flowers that bloom in my heart.' 
  },
  { 
    src: `${base}/images/99.webp`, 
    title: 'Colors of Evening Wait', 
    tags: ['Dusk', 'Apothecary', 'Medicine Bottle', 'Daily Life'], 
    caption: 'Lights fall on the lined medicine bottles, and secret time begins.' 
  },
  { 
    src: `${base}/images/98.webp`, 
    title: 'The Concoction Room', 
    tags: ['Afternoon', 'Apothecary', 'Vial', 'Creation & Mixing'], 
    caption: 'Surrounded by vials of all colors, dreaming of new scents.' 
  },
  { 
    src: `${base}/images/97.webp`, 
    title: 'Library Explorer', 
    tags: ['Afternoon', 'Study', 'Old Book', 'Thought & Reading'], 
    caption: 'Tracing the spines and gathering fragments of stories.' 
  },
  { 
    src: `${base}/images/96.webp`, 
    title: 'Rainbow Glass Door', 
    tags: ['Afternoon', 'Windowside', 'Stained Glass', 'Daily Life'], 
    caption: 'Light through stained glass. A kaleidoscope is reflected in my eyes.' 
  },
  { 
    src: `${base}/images/95.webp`, 
    title: 'Rest in a Sunbeam', 
    tags: ['Afternoon', 'Indoor', 'Daily Life'], 
    caption: 'Drowsing while holding my knees. Dust motes of light gently stroke my shoulders.' 
  },
  { 
    src: `${base}/images/94.webp`, 
    title: 'Dark Green Prospect', 
    tags: ['Morning Light', 'Windowside', 'Daily Life'], 
    caption: 'Gazing at a quiet morning with a window full of green behind me.' 
  },
  { 
    src: `${base}/images/93.webp`, 
    title: 'Forest of Bookshelves', 
    tags: ['Afternoon', 'Study', 'Daily Life'], 
    caption: 'Sitting on the floor surrounded by books, immersing myself in quiet time.' 
  },
  { 
    src: `${base}/images/92.webp`, 
    title: 'The Red Letter', 
    tags: ['Morning Light', 'Indoor', 'Letter', 'Daily Life'], 
    caption: 'Watched over by white flowers, my heart dances at the arrived message.' 
  },
  { 
    src: `${base}/images/91.webp`, 
    title: 'Garden in a Bottle', 
    tags: ['Night Silence', 'Indoor', 'Terrarium', 'Daily Life'], 
    caption: 'Trapping a tiny forest in a jar, moistening my eyes in the swaying firelight.' 
  },
  { 
    src: `${base}/images/90.webp`, 
    title: 'Looking Up at the Light', 
    tags: ['Morning Light', 'Indoor', 'Daily Life'], 
    caption: 'Entrusting the sediment of my heart to the sunlight from the high window.' 
  },
  { 
    src: `${base}/images/89.webp`, 
    title: 'Glass Greenhouse', 
    tags: ['Afternoon', 'Indoor', 'Bottled Flower', 'Daily Life'], 
    caption: 'Offering a quiet prayer to the blue flower blooming in the bottle.' 
  },
  { 
    src: `${base}/images/88.webp`, 
    title: 'Breath of the Water Basin', 
    tags: ['Morning Light', 'Windowside', 'Water Basin', 'Daily Life'], 
    caption: 'Touching the transparent basin, gazing lovingly at the swaying green.' 
  },
  { 
    src: `${base}/images/87.webp`, 
    title: 'Memory of Handwriting', 
    tags: ['Afternoon', 'Study', 'Writing Tools', 'Writing & Recording'], 
    caption: 'Spinning words for someone dear amidst the falling light.' 
  },
  { 
    src: `${base}/images/86.webp`, 
    title: 'Key to the Story', 
    tags: ['Morning Light', 'Indoor', 'Key', 'Daily Life'], 
    caption: 'The key placed on the vermilion floor brings a premonition of the next door.' 
  },
  { 
    src: `${base}/images/85.webp`, 
    title: 'Emerald Windowside', 
    tags: ['Afternoon', 'Windowside', 'Daily Life'], 
    caption: 'Enveloped in a window full of green, dreaming of the distant sky.' 
  },
  { 
    src: `${base}/images/84.webp`, 
    title: 'Afternoon Reading', 
    tags: ['Afternoon', 'Study', 'Old Book', 'Thought & Reading'], 
    caption: 'Light falls on the open page, and quiet thoughts fill the space.' 
  },
  { 
    src: `${base}/images/83.webp`, 
    title: 'Corridor of Flower Shadows', 
    tags: ['Afternoon', 'Corridor', 'Daily Life'], 
    caption: 'The shadow of dappled light quietly overlaps with the flower patterns on the wall.' 
  },
  { 
    src: `${base}/images/82.webp`, 
    title: 'White Chrysanthemums and the Sound of a Comb', 
    tags: ['Morning Light', 'Study', 'Comb', 'Daily Life'], 
    caption: 'Setting the day\'s outline before the light-pierced bookshelves.' 
  },
  { 
    src: `${base}/images/81.webp`, 
    title: 'Afternoon Immersed in Green Light', 
    tags: ['Afternoon', 'Apothecary', 'Bottle Light', 'Daily Life'], 
    caption: 'Gazing at the bottle light, dreaming of a deep green sea.' 
  },
  { 
    src: `${base}/images/80.webp`, 
    title: 'Handwriting of the Bamboo Grove', 
    tags: ['Afternoon', 'Study', 'Writing Tools', 'Writing & Recording'], 
    caption: 'In the silence, letting ink dance with a vermilion mirror by my side.' 
  },
  { 
    src: `${base}/images/79.webp`, 
    title: 'Reminiscence of the Blue Shelf', 
    tags: ['Morning Light', 'Indoor', 'Tea Cup', 'Rest'], 
    caption: 'Holding a tea cup, begrudging the light overflowing from the lattice door.' 
  },
  { 
    src: `${base}/images/78.webp`, 
    title: 'Interior Lit by Colored Flowers', 
    tags: ['Night Silence', 'Indoor', 'Red Light', 'Daily Life'], 
    caption: 'Placing a hand on the red light, cherishing the breath of plants and trees.' 
  },
  { 
    src: `${base}/images/77.webp`, 
    title: 'Moonlight and the Scent of Tea', 
    tags: ['Night Silence', 'Round Window', 'Tea Cup', 'Rest'], 
    caption: 'Gazing at the night through the round window, entrusting my heart to the warm steam.' 
  },
  { 
    src: `${base}/images/76.webp`, 
    title: 'Star Map and Twinkling Window', 
    tags: ['Night Silence', 'Windowside', 'Star Map', 'Thought & Reading'], 
    caption: 'Through the dappled lattice, my heart is already beyond the galaxy.' 
  },
  { 
    src: `${base}/images/75.webp`, 
    title: 'Door to the Light-Filled Corridor', 
    tags: ['Afternoon', 'Corridor', 'Staff', 'Daily Life'], 
    caption: 'The staff catches the light, quietly opening the closed time.' 
  },
  { 
    src: `${base}/images/74.webp`, 
    title: 'Crimson Signpost', 
    tags: ['Morning Light', 'Indoor', 'Daily Life'], 
    caption: 'Arranging the red cloth, welcoming the coming season.' 
  },
  { 
    src: `${base}/images/73.webp`, 
    title: 'Study of Deep Blue and Red', 
    tags: ['Afternoon', 'Study', 'Broom', 'Daily Life'], 
    caption: 'With a broom in hand, walking through a colorful silence.' 
  },
  { 
    src: `${base}/images/72.webp`, 
    title: 'Looking Up at the Library of Wisdom', 
    tags: ['Morning Light', 'Library', 'Daily Life'], 
    caption: 'Even the dust dancing in the sunlight seems like a part of old records.' 
  },
  { 
    src: `${base}/images/71.webp`, 
    title: 'Guardian of Dappled Light', 
    tags: ['Afternoon', 'Nature & Garden', 'Daily Life'], 
    caption: 'With the verdant light behind me, a quiet determination dwells in my eyes.' 
  },
  { 
    src: `${base}/images/70.webp`, 
    title: 'Lantern and Spreading Records', 
    tags: ['Dusk', 'Study', 'Lantern', 'Writing & Recording'], 
    caption: 'The lantern dyes the paper orange. In her smiling eyes, a small premonition of tomorrow was lit.' 
  },
  { 
    src: `${base}/images/69.webp`, 
    title: 'Corridor with High Ceilings', 
    tags: ['Afternoon', 'Corridor', 'Daily Life'], 
    caption: 'Afternoon blue light pools between the beams. I was receiving the manor\'s quiet breath with my whole body.' 
  },
  { 
    src: `${base}/images/68.webp`, 
    title: 'Afternoon Tea Table', 
    tags: ['Afternoon', 'Windowside', 'Tea Cup', 'Rest'], 
    caption: 'Watching the white flowers and the steam of the tea cup. Ivy by the window wrote pale shadows on the page.' 
  },
  { 
    src: `${base}/images/67.webp`, 
    title: 'Morning in the Apothecary', 
    tags: ['Morning Light', 'Apothecary', 'Vial', 'Creation & Mixing'], 
    caption: 'The wind sways the vials. In a room where dust motes dance, I was pulling together inspirations for a new scent.' 
  },
  { 
    src: `${base}/images/66.webp`, 
    title: 'Rest by the Window', 
    tags: ['Afternoon', 'Windowside', 'Water Basin', 'Rest'], 
    caption: 'Wrapped in the warmth of a muffler, I look down. The lemons in the water basin were breathing in the sunlight.' 
  },
  { 
    src: `${base}/images/65.webp`, 
    title: 'Before the Celadon Shelf', 
    tags: ['Morning Light', 'Apothecary', 'Celadon Ware', 'Daily Life'], 
    caption: 'Blue vessels refreshingly color the morning. Each time I trace the outline of a jar, the waves of my heart calm.' 
  },
  { 
    src: `${base}/images/64.webp`, 
    title: 'Fan on the Veranda', 
    tags: ['Afternoon', 'Veranda', 'Fan', 'Rest'], 
    caption: 'Light from across the window scatters on the red fan. Before a diary, a brief rest was quietly flowing.' 
  },
  { 
    src: `${base}/images/63.webp`, 
    title: 'Beginning Wind', 
    tags: ['Morning Light', 'Indoor', 'Daily Life'], 
    caption: 'Sending a gaze to the light-filled garden. The red carpet at my feet was quietly supporting my certain steps.' 
  },
  { 
    src: `${base}/images/62.webp`, 
    title: 'Corridor of Stretching Shadows', 
    tags: ['Dusk', 'Corridor', 'Broom', 'Daily Life'], 
    caption: 'Shadows stretch across the long hall. Stepping out with a broom, the old books were quietly awakening.' 
  },
  { 
    src: `${base}/images/61.webp`, 
    title: 'Staff and Morning Light', 
    tags: ['Morning Light', 'Study', 'Staff', 'Daily Life'], 
    caption: 'Tracing the documents with a staff by my side. Morning light from the window vividly colored the memories of travel.' 
  },
  { 
    src: `${base}/images/60.webp`, 
    title: 'Time to Open the Door', 
    tags: ['Morning Light', 'Indoor', 'Herbs', 'Daily Life'], 
    caption: 'Placing a hand towards the outside light. Air scented with herbs was announcing the arrival of a new season.' 
  },
  { 
    src: `${base}/images/59.webp`, 
    title: 'Morning Sweeping', 
    tags: ['Morning Light', 'Library', 'Leaves', 'Daily Life'], 
    caption: 'Walking through the light-dancing library. Picking up fallen leaves, I slowly set the day\'s outline.' 
  },
  { 
    src: `${base}/images/58.webp`, 
    title: 'Premonition of an Azure Night', 
    tags: ['Night Silence', 'Study', 'Water Basin', 'Daily Life'], 
    caption: 'Gazing at pages with the night-colored window behind. The green of the water basin filled the room with deep peace.' 
  },
  { 
    src: `${base}/images/57.webp`, 
    title: 'Candelabra and Ancient Manuscripts', 
    tags: ['Night Silence', 'Study', 'Candelabra', 'Thought & Reading'], 
    caption: 'Placing a hand on an old book. The rising candlelight was gently illuminating the depths of the story.' 
  },
  { 
    src: `${base}/images/56.webp`, 
    title: 'Brush in the Sunbeam', 
    tags: ['Morning Light', 'Study', 'Writing Tools', 'Writing & Recording'], 
    caption: 'Dappled light dances on the paper. Beginning to record the day amidst the lined green vials.' 
  },
  { 
    src: `${base}/images/55.webp`, 
    title: 'Window Gazing at Stars', 
    tags: ['Night Silence', 'Windowside', 'Telescope', 'Daily Life'], 
    caption: 'Night silence dwells in the telescope. Stardust in the water basin and candles carried the breath of the distant sky.' 
  },
  { 
    src: `${base}/images/54.webp`, 
    title: 'Corridor of Collections', 
    tags: ['Morning Light', 'Corridor', 'Paper Scrap', 'Daily Life'], 
    caption: 'Peering through a paper scrap at the sun. The scent of wood from deep in the shelves wrapped fragments of old records.' 
  },
  { 
    src: `${base}/images/53.webp`, 
    title: 'Fan and Bamboo Staff', 
    tags: ['Afternoon', 'Indoor', 'Fan', 'Daily Life'], 
    caption: 'Gently spreading a green fan. Sunlight through the lattice left heat on my dignified presence.' 
  },
  { 
    src: `${base}/images/52.webp`, 
    title: 'Watering the Garden', 
    tags: ['Morning Light', 'Nature & Garden', 'Watering Can', 'Daily Life'], 
    caption: 'Pouring water on flowers with a watering can. Light patterns at my feet were lightly coloring the morning work.' 
  },
  { 
    src: `${base}/images/51.webp`, 
    title: 'Study of Records', 
    tags: ['Afternoon', 'Study', 'Map', 'Writing & Recording'], 
    caption: 'Adding to a map at a desk in dappled light. Old books on the shelf watched over the accumulated wisdom.' 
  },
  { 
    src: `${base}/images/50.webp`, 
    title: 'Morning of Lined White Porcelain', 
    tags: ['Morning Light', 'Indoor', 'Porcelain Jar', 'Writing & Recording'], 
    caption: 'Writing characters in a blue-lit room. Jars by the window were reflecting the clear morning air.' 
  },
  { 
    src: `${base}/images/49.webp`, 
    title: 'Tidings of Autumn Leaves', 
    tags: ['Dusk', 'Nature & Garden', 'Letter', 'Daily Life'], 
    caption: 'Gazing at a letter atop autumn leaves. A white-winged visitor told of the deepening fall.' 
  },
  { 
    src: `${base}/images/48.webp`, 
    title: 'Spring Windowside', 
    tags: ['Morning Light', 'Windowside', 'Flower Vase', 'Daily Life'], 
    caption: 'Pointing to the spring sky before flowers. Soft colors by the window were celebrating the new season.' 
  },
  { 
    src: `${base}/images/47.webp`, 
    title: 'Wisteria Mountain Gate', 
    tags: ['Morning Light', 'High Ground', 'Mountain Gate', 'Daily Life'], 
    caption: 'Passing through the gate with swaying purple flowers to gaze at the ridges. A cool wind announced the start of a journey.' 
  },
  { 
    src: `${base}/images/46.webp`, 
    title: 'By an Old Pillar', 
    tags: ['Morning Light', 'Indoor', 'Cat', 'Daily Life'], 
    caption: 'Exchanging looks with a cat in the skylight. Morning silence filled the walls that had marked time.' 
  },
  { 
    src: `${base}/images/45.webp`, 
    title: 'Veranda Drowse', 
    tags: ['Morning Light', 'Veranda', 'Cat', 'Rest'], 
    caption: 'Holding a small life in a sunbeam. Dancing light motes wrapped a peaceful sleep.' 
  },
  { 
    src: `${base}/images/44.webp`, 
    title: 'Tea Cup Break', 
    tags: ['Afternoon', 'Study', 'Tea Cup', 'Thought & Reading'], 
    caption: 'Turning pages while watching tea cup steam. Afternoon light was gently supporting the reading time.' 
  },
  { 
    src: `${base}/images/43.webp`, 
    title: 'Glass Greenhouse', 
    tags: ['Afternoon', 'Greenhouse', 'Glass Case', 'Daily Life'], 
    caption: 'Reaching out to a glass case. Trapped greenery was quietly breathing in the light.' 
  },
  { 
    src: `${base}/images/42.webp`, 
    title: 'Moment of Peace', 
    tags: ['Afternoon', 'Windowside', 'Daily Life'], 
    caption: 'Leaning on the desk and looking out the window. A spilled smile filled the room with a warm temperature.' 
  },
  { 
    src: `${base}/images/41.webp`, 
    title: 'Corridor of Twilight', 
    tags: ['Night Silence', 'Corridor', 'Stone Lantern', 'Daily Life'], 
    caption: 'Proceeding between bookshelves by the light of a stone lantern. A red muffler was softening the night silence.' 
  },
  { 
    src: `${base}/images/40.webp`, 
    title: 'Observation Record of Sprouting', 
    tags: ['Afternoon', 'Study', 'Illustrations', 'Daily Life'], 
    caption: 'Opening illustrations and tracing leaf outlines. The blowing wind colored the quiet afternoon work.' 
  },
  { 
    src: `${base}/images/39.webp`, 
    title: 'Night Light and Calculation', 
    tags: ['Night Silence', 'Study', 'Lamp', 'Writing & Recording'], 
    caption: 'Continuing to chase numbers between books. Lamp light gently wrapped the concentrated profile.' 
  },
  { 
    src: `${base}/images/38.webp`, 
    title: 'Circular Study', 
    tags: ['Afternoon', 'Study', 'Abacus', 'Daily Life'], 
    caption: 'The sound of the abacus echoed regularly. The orderly room air was supporting daily records.' 
  },
  { 
    src: `${base}/images/37.webp`, 
    title: 'Reminiscence of the Bookshelf', 
    tags: ['Morning Light', 'Study', 'Old Book', 'Daily Life'], 
    caption: 'Stopping my gaze before the bookshelf. Through the hood, the scent of old paper carried a peaceful time.' 
  },
  { 
    src: `${base}/images/36.webp`, 
    title: 'Green Transparent Through Glass', 
    tags: ['Night Silence', 'Study', 'Specimen Jar', 'Daily Life'], 
    caption: 'Lights shine through specimen jars. Forest memories trapped in jars were quietly twinkling.' 
  },
  { 
    src: `${base}/images/35.webp`, 
    title: 'Breath of the Seedbed', 
    tags: ['Morning Light', 'Apothecary', 'Seedbed', 'Daily Life'], 
    caption: 'Two of us watching over the young leaves. The scent of soil filling the wooden room conveyed the presence of life.' 
  },
  { 
    src: `${base}/images/34.webp`, 
    title: 'Handwriting in the Sunbeam', 
    tags: ['Morning Light', 'Study', 'Writing Tools', 'Writing & Recording'], 
    caption: 'Morning light dances on the hand moving the brush. Lined vials quietly colored the recording time.' 
  },
  { 
    src: `${base}/images/33.webp`, 
    title: 'Desk for Wax Sealing', 
    tags: ['Afternoon', 'Study', 'Wax Seal', 'Writing & Recording'], 
    caption: 'Placing a finger on the letter. Red, hardened wax shone as proof of sealing words.' 
  },
  { 
    src: `${base}/images/32.webp`, 
    title: 'From the Ivy-Covered Windowside', 
    tags: ['Night Silence', 'Windowside', 'Crescent Moon', 'Daily Life'], 
    caption: 'Placing hands on the window frame to gaze at the high moon. Swaying hair echoed a faint sound in the still night.' 
  },
  { 
    src: `${base}/images/31.webp`, 
    title: 'Midnight Lantern', 
    tags: ['Night Silence', 'Eaves', 'Lantern', 'Daily Life'], 
    caption: 'Adjusting the lantern fire at the eaves. Warm light was cutting out the night silence at my feet.' 
  },
  { 
    src: `${base}/images/30.webp`, 
    title: 'Wall Notes and Candlelight', 
    tags: ['Night Silence', 'Indoor', 'Candle', 'Daily Life'], 
    caption: 'Standing still against old records. Tiny flames were carving shadows of knowledge on the wall.' 
  },
  { 
    src: `${base}/images/29.webp`, 
    title: 'Smile Against the Sunlight', 
    tags: ['Afternoon', 'Indoor', 'Writing & Recording'], 
    caption: 'Quietly smiling while checking documents. Light through the lattice wrapped the air she carried.' 
  },
  { 
    src: `${base}/images/28.webp`, 
    title: 'Butterfly Specimen and Green Shadows', 
    tags: ['Afternoon', 'Study', 'Butterfly Specimen', 'Daily Life'], 
    caption: 'Staring intently at the colors of wings. Butterflies bathed in dappled light seemed ready to flutter.' 
  },
  { 
    src: `${base}/images/27.webp`, 
    title: 'Moonlit Night with Lanterns', 
    tags: ['Night Silence', 'Forest', 'Lantern', 'Daily Life'], 
    caption: 'Looking up at the moon in the red glow. Cool air was deepening the forest night.' 
  },
  { 
    src: `${base}/images/26.webp`, 
    title: 'Resting the Brush in the Afternoon', 
    tags: ['Afternoon', 'Windowside', 'Writing Tools', 'Daily Life'], 
    caption: 'Entrusting my gaze to the outside. Sunlight reflected in vials was quietly coloring the creative time.' 
  },
  { 
    src: `${base}/images/25.webp`, 
    title: 'Specimen Shelf and Dust Motes', 
    tags: ['Morning Light', 'Corridor', 'Specimen Jar', 'Daily Life'], 
    caption: 'Stretching to reach a jar. Light from the window was vividly awakening the green inside.' 
  },
  { 
    src: `${base}/images/24.webp`, 
    title: 'Map Turning with the Wind', 
    tags: ['Morning Light', 'High Ground', 'Map', 'Daily Life'], 
    caption: 'Tracing unknown outlines. The blowing wind carried a premonition of a new journey.' 
  },
  { 
    src: `${base}/images/23.webp`, 
    title: 'Lattice Door in Dappled Light', 
    tags: ['Afternoon', 'Lattice Door', 'Daily Life'], 
    caption: 'Light through the lattice drops patterns on my shoulder. Fresh green hints were melting into the outside air.' 
  },
  { 
    src: `${base}/images/22.webp`, 
    title: 'Verdant Greenhouse', 
    tags: ['Morning Light', 'Greenhouse', 'Seedling', 'Daily Life'], 
    caption: 'Dappled light gently wraps the seedlings, and green in bottles melts into the morning light. A quiet breath filled the space.' 
  },
  { 
    src: `${base}/images/21.webp`, 
    title: 'Small Bottle Concoction Stand', 
    tags: ['Morning Light', 'Apothecary', 'Herbs', 'Creation & Mixing'], 
    caption: 'Tilting a vial to check the color. The arrangement of herbs and tools quietly announced the start of morning work.' 
  },
  { 
    src: `${base}/images/20.webp`, 
    title: 'Forest Library Corridor', 
    tags: ['Morning Light', 'Corridor', 'Paper Scrap', 'Daily Life'], 
    caption: 'Slowly proceeding down the corridor where light patterns stretch. A paper scrap on the shelf edge stood out white in the silence.' 
  },
  { 
    src: `${base}/images/19.webp`, 
    title: 'Morning Record Book', 
    tags: ['Morning Light', 'Indoor', 'Tea Cup', 'Writing & Recording'], 
    caption: 'Quietly writing in an open notebook. A steaming tea cup gently supported the start of the day.' 
  },
  { 
    src: `${base}/images/18.webp`, 
    title: 'Before the Glass Shelf', 
    tags: ['Morning Light', 'Apothecary', 'Vial', 'Daily Life'], 
    caption: 'Each time I check a label, the sun\'s reflection creates pale colors. A peaceful temperature filled the room.' 
  },
  { 
    src: `${base}/images/17.webp`, 
    title: 'Overlooking the Forest from the Windowside', 
    tags: ['Morning Light', 'Windowside', 'Notebook', 'Daily Life'], 
    caption: 'Setting down the notebook and looking at the green. The morning breeze slowly swayed the leaves, settling the day\'s atmosphere.' 
  },
  { 
    src: `${base}/images/16.webp`, 
    title: 'Twilight Holding a Book', 
    tags: ['Dusk', 'Indoor', 'Old Book', 'Daily Life'], 
    caption: 'The weight of the book in my arms is felt gradually. Evening light was gently highlighting the scent of wood.' 
  },
  { 
    src: `${base}/images/15.webp`, 
    title: 'Shelf of Glowing Jars', 
    tags: ['Morning Light', 'Apothecary', 'Glowing Jar', 'Daily Life'], 
    caption: 'Touching a jar on the shelf, the internal color sparkles back. A small brilliance spread a soft resonance through the room.' 
  },
  { 
    src: `${base}/images/14.webp`, 
    title: 'Desk in the Leaf Shadows', 
    tags: ['Afternoon', 'Study', 'Old Book', 'Daily Life'], 
    caption: 'Stopping my gaze with a book left open. Ivy by the window swayed, dropping pale shadows into the afternoon air.' 
  },
  { 
    src: `${base}/images/13.webp`, 
    title: 'Room of Maps', 
    tags: ['Night Silence', 'Study', 'Map', 'Daily Life'], 
    caption: 'Tracing maps hung on the wall. Swaying candlelight slowly changed the expression of the old paper.' 
  },
  { 
    src: `${base}/images/12.webp`, 
    title: 'Lamp Light and Paper Sounds', 
    tags: ['Night Silence', 'Study', 'Lamp', 'Writing & Recording'], 
    caption: 'Tracing the manuscript with a fingertip makes the paper sound quietly. Night light gave depth to my hands.' 
  },
  { 
    src: `${base}/images/11.webp`, 
    title: 'Desk in Dappled Light', 
    tags: ['Afternoon', 'Study', 'Old Book', 'Daily Life'], 
    caption: 'Pages sway slightly in the breeze from outside, and tree shadows drew light patterns on the paper surface.' 
  },
  { 
    src: `${base}/images/10.webp`, 
    title: 'In the Library Passage', 
    tags: ['Afternoon', 'Library', 'Muffler', 'Daily Life'], 
    caption: 'Looking back while passing between lined-up spines. A red muffler swayed as if cutting through the air.' 
  },
  { 
    src: `${base}/images/9.webp`, 
    title: 'In a Corner of the Library', 
    tags: ['Morning Light', 'Study', 'Old Book', 'Daily Life'], 
    caption: 'Stopping a step with an open book. Light through the shoji screen was softly floating the outlines of the characters.' 
  },
  { 
    src: `${base}/images/8.webp`, 
    title: 'Autumn Concoction Desk', 
    tags: ['Afternoon', 'Apothecary', 'Wooden Tools', 'Writing & Recording'], 
    caption: 'Arranging records while gazing at the changing scenery outside. Wooden tools were receiving the quiet hints of autumn.' 
  },
  { 
    src: `${base}/images/7.webp`, 
    title: 'Afternoon Nap', 
    tags: ['Afternoon', 'Indoor', 'Tea Cup', 'Rest'], 
    caption: 'A deep breath falls with a face close to the book. A cup with remaining warmth was slowly supporting the afternoon time.' 
  },
  { 
    src: `${base}/images/6.webp`, 
    title: 'The Two of Us at the Workbench', 
    tags: ['Afternoon', 'Study', 'Writing Tools', 'Daily Life'], 
    caption: 'Watching over as if nestling close to my mother\'s hand taking up the brush. Soft light left a quiet temperature between them.' 
  },
  { 
    src: `${base}/images/5.webp`, 
    title: 'Room of Lights and Maps', 
    tags: ['Night Silence', 'Study', 'Map', 'Daily Life'], 
    caption: 'Lights come on at a desk with a spread map. The undulations of the paper surface emerged, quietly showing the way.' 
  },
  { 
    src: `${base}/images/4.webp`, 
    title: 'Night Jar Shelf', 
    tags: ['Night Silence', 'Apothecary', 'Jar', 'Daily Life'], 
    caption: 'Night colors from outside nestle close to the fingertip closing a lid. Jars on the shelf were faintly reflecting sleeping seeds.' 
  },
  { 
    src: `${base}/images/3.webp`, 
    title: 'Half-Written Page', 
    tags: ['Morning Light', 'Study', 'Writing Tools', 'Writing & Recording'], 
    caption: 'The brush stops before half-written characters. Shadows of stacked books were quietly stretching onto the open notebook.' 
  },
  { 
    src: `${base}/images/2.webp`, 
    title: 'Windowside Looking at the Moon', 
    tags: ['Night Silence', 'Windowside', 'Muffler', 'Daily Life'], 
    caption: 'Placing a fingertip on the muffler and softly looking at the night sky. Moonlight filled the windowside, and silence was breathing deeply.' 
  },
  { 
    src: `${base}/images/1.webp`, 
    title: 'Morning Recording Leaves', 
    tags: ['Morning Light', 'Apothecary', 'Tag', 'Creation & Mixing'], 
    caption: 'Pale colors fall on the fingertip checking a tag. Morning work before the jars bore a hint of completion.' 
  },
];
const gallery = $("#cardGallery");

// ギャラリー描画：alt属性にのみ情報を集約
gallery.innerHTML = items.map((it, i) => {
  // tags配列を [Tag1][Tag2] の形式の文字列に変換
  const tagStr = it.tags ? `[${it.tags.join('][')}]` : "";
  
  return `
  <figure class="card" data-i="${i}" tabindex="0" aria-label="${it.title}">
    <div class="card__imgwrap">
      <img src="${it.src}" 
           alt="Green-haired Girl in Kimono, Kameko: ${it.title} - ${tagStr} ${it.caption}" 
           loading="lazy">
    </div>
    <figcaption class="card__meta">
      <h3 class="card__title">${it.title}</h3>
      <p class="card__caption">${it.caption}</p>
    </figcaption>
  </figure>
`;
}).join("");

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
  
  // タグ文字列を作成
  const tagStr = it.tags ? `[${it.tags.join('][')}]` : "";

  lbImg.src = it.src;
  // ライトボックスのaltにもタグとキャプションを反映
  lbImg.alt = `Green-haired Girl in Kimono, Kameko: ${it.title} - ${tagStr} ${it.caption}`; 
  
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

/**
 * 3. noscript（クローラー向けテキスト）へのタグ反映
 */
const noscript = document.createElement('noscript');
noscript.innerHTML = `<div style="display:none;"><h2>Kameko: Green-haired Girl in Kimono - Artwork Index</h2><ul>` + 
    items.map(it => {
      const ts = it.tags ? `[${it.tags.join('][')}] ` : "";
      return `<li>Green-haired Girl in Kimono, Kameko - ${it.title}: ${ts}${it.caption}</li>`;
    }).join('') + 
    `</ul></div>`;
document.body.appendChild(noscript);