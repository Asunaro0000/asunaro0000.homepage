document.addEventListener("DOMContentLoaded", () => {
  const sceneListEl = document.getElementById("storyboard-scene-list");

  // 各シーンの外部リンク
  const SCENE_LINKS = {
    "scene-001": "https://asunaro0000.github.io/risuko/",
    "scene-002": "./scenes/The-Winter-Encounter/index.html",
    "scene-003": "./scenes/This-Is-Our-Place/index.html",
    "scene-004": "./scenes/Aiming-for-the-summit/index.html" ,
    "scene-005": "./scenes/04_The-Songstresses-and-Their-First-Fan/index.html" ,
    "scene-006": "./scenes/05_Feather-Letter-and-the-Forest-Signposts/index.html" ,
    "scene-007": "./scenes/06_Busy-Day-at-the-Chicken-Coop/index.html" ,
    "scene-008": "./scenes/07_Warm-Moment-in-Winter/index.html" ,
    "scene-009": "./scenes/08_The-beginning-of-a-new-feast" 


/*     "scene-002": "https://www.amazon.co.jp/dp/B0GC8KM6YZ",
    "scene-003": "https://www.amazon.co.jp/dp/B0GC8KM6YZ",
    "scene-004": "https://www.amazon.co.jp/dp/B0GC8KM6YZ"  */

  };

/* const KDP_EXCLUSIVE_IDS = new Set([
  "scene-002",
  "scene-003",
  "scene-004"
]); */


  const SCENES = [
    {
      id: "scene-001",
      thumb: "./assets/images/00.webp",
      title: "#00 初めての森 ― リス子の小さな旅",
      text: [
        "初めてやってきたこの森で、少しずつ仲間たちと心が通っていくまでのお話なんだ。",
        "はじめは緊張してたけど、だんだんと一緒に笑えるようになっていく様子を見てもらえると嬉しいな。"
      ]
    },
    {
      id: "scene-002",
      thumb: "./assets/images/01.webp",
      title: "#01 雪の森で出会った日。",
      text: [
        "スズ子との最初の出会い。",
        "この日からぜんぶ変わり始めた気がするんだ。"
      ]
    },
    {
      id: "scene-003",
      thumb: "./assets/images/02.webp",
      title: "#02 ここが、わたしたちの場所。",
      text: [
        "秘密基地を作ろうと決めた日。",
        "目印をつけたら、そこはもう帰ってこれる場所だった。"
      ]
    },
    {
      id: "scene-004",
      thumb: "./assets/images/03.webp",
      title: "#03 山頂を目指して。",
      text: [
        "むかし見た絵本の景色と、",
        "いま目の前の景色が、ぴったり重なった。",
        "「いま行かなきゃ！」",
        "そう思ったら、もう止まれなかった。"
      ]
    },
    {
      id: "scene-005",
      thumb: "./assets/images/04.webp",
      title: "#04 歌姫達と初めてのファン。",
      text: [
        "雪の森で、リス子とスズ子は音を探しました。",
        "笛を吹くと、いつもタヌキが聞きに来ます。",
        "気づけば今度は歌が始まり、森が客席になりました。"
      ]
    },
    {
      id: "scene-006",
      thumb: "./assets/images/05.webp",
      title: "#05 羽の手紙と、森の道しるべ。",
      text: [
        "雪の森で、リス子とスズ子は白紙の手紙を預かりました。",
        "理由は分からないけれど、フクロウの顔はやけに真剣です。",
        "どうやら森では、文字より気持ちが先に届くらしい。"
      ]
    },
    {
      id: "scene-007",
      thumb: "./assets/images/06.webp",
      title: "#06 鶏小屋での慌ただしい一日。",
      text: [
        "掃除中の油断から鶏が雪原へ逃げ出し、リス子とスズ子は追いかけることに。",
        "近づけば逃げ、落ち込んではやり方を変え、少しずつ距離が縮まっていく。",
        "別の鶏、卵を守る行動、新しい作戦――対応はまだ続いていきます。"
      ]
    },
  {
    id: "scene-008",
    thumb: "./assets/images/07.webp",
    title: "#07 冬のもふもふと、あたたかな居場所。",
    text: [
      "寒い冬の森で、リス子とスズ子はコーヒーやもふもふを頼りに体を温めます。",
      "雨の中で出会った子羊をきっかけに、夜の森を進み、群れを探すことに。",
      "たどり着いた先で見つけたのは、体も心も落ち着く、安心できる場所でした。"
    ]
  },
{
  "id": "scene-009",
  "thumb": "./assets/images/08.webp",
  "title": "#08 新しいごちそうの始まり",
  "text": [
    "雪のキッチンでクッキー作り。つまみ食いするリス子とスズ子の賑やかな料理が始まります。",
    "オーブンを目指す道中、香りに誘われた鹿やヤギたちも加わり、いつしかおやつパレードに。",
    "最後は仲間みんなで食卓を囲み、寒さを忘れるほど満腹で幸せな一日になりました。"
  ]
}

  ];

  // ===== リスト描画 =====
  function renderScenes() {
    sceneListEl.innerHTML = "";

    SCENES.forEach(scene => {
      const li = document.createElement("li");
      li.className = "storyboard-scene";

      const link = SCENE_LINKS[scene.id] ?? null;

       li.innerHTML = `
        <figure class="storyboard-scene-image">
          ${link
            ? `<a href="${link}" class="scene-link"><img src="${scene.thumb}" alt="${scene.title}"></a>`
            : `<img src="${scene.thumb}" alt="${scene.title}">`
          }
        </figure>

        <div class="storyboard-scene-text">
          <p class="storyboard-scene-title">${scene.title}</p>
          ${scene.text.map(t => `<p>${t}</p>`).join("")}
        </div>
      `; 
/*       li.innerHTML = `
  <figure class="storyboard-scene-image">
    ${link
      ? `<a href="${link}" class="scene-link">
          <img src="${scene.thumb}" alt="${scene.title}">
          ${KDP_EXCLUSIVE_IDS.has(scene.id)
            ? `<span class="kdp-exclusive-badge">2026年3月25日（水）まで\nKindleにて独占配信中\nKindle Unlimited</span>`
            : ``}
        </a>`
      : `<img src="${scene.thumb}" alt="${scene.title}">`
    }
  </figure>

  <div class="storyboard-scene-text">
    <p class="storyboard-scene-title">${scene.title}</p>
    ${scene.text.map(t => `<p>${t}</p>`).join("")}
  </div>
`; */


      sceneListEl.appendChild(li);
    });
  }

  renderScenes();
});
