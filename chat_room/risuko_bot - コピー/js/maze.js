/**
 * 迷路ゲーム専用ロジック (maze.js)
 */
const MAZE_GAS_URL = "https://script.google.com/macros/s/AKfycbwe5aqIREuIdwuXzswkuMvUZxH9SoFKGOp8pp7-m5xurFR3fY-3HmGgDGbNrQY7hsmhIA/exec";
let isMazeMode = false;
let mazeStep = 0;
let mazeTargetWord = "";

const MAZE_KEYWORDS = ["ひかり", "どんぐり", "カギ", "きのこ", "お花", "しっぽ"];

/**
 * 迷路専用ボタン描画（script.js から呼ばれる）
 */
function renderMazeButtons(container, isEn) {
    container.innerHTML = "";

    // ゲーム開始前の表示
    if (!isMazeMode) {
        const startBtn = document.createElement('button');
        startBtn.className = 'quick-chip';
        startBtn.style.background = "#ffcc80";
        startBtn.innerText = isEn ? "🏁 Start Exploration" : "🏁 探索を開始するおぉ！";
        startBtn.onclick = () => startMazeGame();
        container.appendChild(startBtn);
        return;
    }

    // 進行中の表示
    const actions = [
        { label: isEn ? "⬅️ Left" : "⬅️ 左へ", text: "左に進むよぉ" },
        { label: isEn ? "🔍 Search" : "🔍 探索", text: "ここを調べるよぉ" },
        { label: isEn ? "➡️ Right" : "➡️ 右へ", text: "右に進むよぉ" }
    ];

    actions.forEach(act => {
        const btn = document.createElement('button');
        btn.className = 'quick-chip';
        btn.innerText = act.label;
        btn.onclick = () => {
            mazeStep++;
            sendToMaze(act.text);
        };
        container.appendChild(btn);
    });
}

/**
 * 迷路ゲーム開始
 */
function startMazeGame() {
    isMazeMode = true;
    mazeStep = 1;
    mazeTargetWord = MAZE_KEYWORDS[Math.floor(Math.random() * MAZE_KEYWORDS.length)];
    
    // UIを更新
    renderQuickButtons(currentLang);

    const startMsg = currentLang === 'en' ? "Let's explore the forest!" : "森の迷路を探検しよぉ！";
    sendToMaze(startMsg);
}

/**
 * 迷路専用通信処理
 */
async function sendToMaze(text) {
    if (text.includes(mazeTargetWord)) {
        isMazeMode = false;
        quickSend(currentLang === 'en' ? "I found it! It's the " + mazeTargetWord : "見つけたおぉ！「" + mazeTargetWord + "」だねぇ！");
        renderQuickButtons(currentLang);
        return;
    }

    // script.js 内の既存の送信ロジック（send関数）をベースに、宛先のみ書き換えて実行
    // ※executeSendProcessの代わりに、一時的にGAS_URLを差し替えてsend()を呼ぶなどの調整が必要です
    const originalUrl = GAS_URL;
    try {
        window.GAS_URL = MAZE_GAS_URL; // 一時的に宛先を迷路GASに変更
        const input = document.getElementById('msg');
        input.value = text;
        await send(); 
    } finally {
        window.GAS_URL = originalUrl; // 元に戻す
    }
}