document.addEventListener("DOMContentLoaded", () => {
  const sceneListEl = document.getElementById("storyboard-scene-list");

  // 各シーンの外部リンク
  const SCENE_LINKS = {
    "scene-001": "https://asunaro0000.github.io/risuko/",
    "scene-002": "./scenes/The-Winter-Encounter/index.html",
    "scene-003": "./scenes/This-Is-Our-Place/index.html",
    "scene-004": "./scenes/Aiming-for-the-summit/index.html"
  };

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

      sceneListEl.appendChild(li);
    });
  }

  renderScenes();
});
