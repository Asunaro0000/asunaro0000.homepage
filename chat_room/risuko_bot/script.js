/**
 * 設定エリア
 */
const GAS_URL = "https://script.google.com/macros/s/AKfycbzTCcgpN10qdWm83UTH0_rV21nu-DK4X1croX-UQE6avoRPdWIJ4ixyAlTtrUolCRjVIw/exec";
/**
 * 案内板（リンク集）のデータ
 */
const GUIDE_LINKS = {
  ja: [
    { name: "📅 リス子とスズ子の観察日記", url: "https://asunaro0000.github.io/asunaro0000.homepage/chat_room/risuko_logroom/index.html" },
    { name: "🎨 ギャラリー", url: "https://asunaro0000.github.io/asunaro0000.homepage/gallery/Risko/index.html" },
    { name: "📖 ストーリーボード", url: "https://asunaro0000.github.io/asunaro0000.homepage/gallery/Risko/storyboard_room/index.html" },
  
  ],
  en: [
    { name: "📅 Observation Diary", url: "https://asunaro0000.github.io/asunaro0000.homepage/chat_room/risuko_logroom/index.html" },
    { name: "🎨 Gallery", url: "https://asunaro0000.github.io/asunaro0000.homepage/en/gallery/Risko/" },
    { name: "📖 Storyboard", url: "https://asunaro0000.github.io/asunaro0000.homepage/en/gallery/Risko/storyboard_room/index.html" },
  ]
};



// ★ここを false にすると画面下のデバッグログが完全に消えます
const IS_DEBUG = false; 

/**
 * 初期化処理
 */
window.addEventListener('DOMContentLoaded', () => {
    const debugElement = document.getElementById('debug-log');
    if (debugElement) {
        // IS_DEBUGの設定に合わせて表示・非表示を切り替え
        debugElement.style.display = IS_DEBUG ? 'block' : 'none';
    }
});

/**
 * 送信処理
 */
async function send() {
    const input = document.getElementById('msg');
    const chat = document.getElementById('chat');
    const container = document.getElementById('chat-container');
    const debugLog = document.getElementById('debug-log');
    
    const text = input.value.trim();
    if (!text) return;

    // 1. ユーザー発言の追加
    const userDiv = document.createElement('div');
    userDiv.className = 'bubble user';
    userDiv.innerText = text;
    chat.appendChild(userDiv);
    
    input.value = "";
    container.scrollTop = container.scrollHeight;

    // 2. ローディング表示
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'bubble ai loading';
    loadingDiv.innerText = "リス子、考え中だねぇ...";
    chat.appendChild(loadingDiv);
    container.scrollTop = container.scrollHeight;

    try {
        const res = await fetch(GAS_URL, {
            method: "POST",
            body: JSON.stringify({ message: text })
        });

        const data = await res.json();

        // デバッグログの更新（IS_DEBUGがtrueの時のみ）
        if (IS_DEBUG && debugLog) {
            debugLog.innerText = "【RAWデータ】: " + JSON.stringify(data);
        }

        // ローディングを消してAIの返信を表示
        loadingDiv.remove();

        const aiDiv = document.createElement('div');
        aiDiv.className = 'bubble ai';
        aiDiv.innerText = data.msg || "（リス子、考え込んじゃったみたい…）";

        // 画像があれば追加
        if (data.imgUrl && data.imgUrl !== "画像なし" && data.imgUrl !== "") {
            const img = document.createElement('img');
            img.src = data.imgUrl;
            img.alt = "リス子の写真";
            img.onclick = () => {
                const lb = document.getElementById('lightbox');
                const lbImg = document.getElementById('lightbox-img');
                lbImg.src = img.src;
                lb.style.display = 'flex';
            };
            aiDiv.appendChild(img);
        }
        
        chat.appendChild(aiDiv);

    } catch (error) {
        console.error("Error:", error);
        if (loadingDiv) loadingDiv.remove();
        
        const errDiv = document.createElement('div');
        errDiv.className = 'bubble ai';
        errDiv.innerText = "ごめんね、エラーが起きちゃった。";
        chat.appendChild(errDiv);

        if (IS_DEBUG && debugLog) {
            debugLog.innerText = "【エラーログ】: " + error.toString();
        }
    }
    
    // 常に最新のメッセージが見えるようにスクロール
    container.scrollTop = container.scrollHeight;
}

/**
 * イベントリスナーの設定
 */
document.getElementById('send-btn').addEventListener('click', send);

document.getElementById('msg').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        send();
    }
});


/**
 * 初期化処理
 */
window.addEventListener('DOMContentLoaded', () => {
    // 言語判定
    const params = new URLSearchParams(window.location.search);
    const isEn = params.get('lang') === 'en' || (!navigator.language.startsWith('ja'));
    const lang = isEn ? 'en' : 'ja';

    // デバッグログ表示設定
    const debugElement = document.getElementById('debug-log');
    if (debugElement) {
        debugElement.style.display = IS_DEBUG ? 'block' : 'none';
    }

    // 案内板の描画
    renderGuideBoard(lang);
    
    // 英語アクセス時のUI初期化（HTML内のscriptタグで行っていた処理を統合）
    if (isEn) {
        const greeting = document.querySelector(".bubble.ai");
        if (greeting) greeting.innerHTML = 'Hi there! I\'m Risuko. Let\'s chat!<img src="./assets/main.jpg" >';
        document.getElementById("msg").placeholder = "Chat with Risuko...";
        document.getElementById("send-btn").textContent = "Send";
    }
});

/**
 * 案内板（リンク集）を描画する
 */
function renderGuideBoard(lang) {
    const board = document.getElementById('guide-board');
    if (!board) return;

    board.innerHTML = ""; // クリア
    GUIDE_LINKS[lang].forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.className = 'guide-chip';
        a.innerText = link.name;
        board.appendChild(a);
    });
}