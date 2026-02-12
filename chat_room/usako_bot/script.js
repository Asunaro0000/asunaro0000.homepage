/**
 * 設定エリア
 */
const GAS_URL = "https://script.google.com/macros/s/AKfycbyw8KuPAQifE85osH6RKUBlqEWdlbNTADrnTGLNCTDu9YWvn-Bo0H3u4Kh6vkpXqF9VsQ/exec";

/**
 * 相互リンク（案内板）のデータ
 */
const GUIDE_LINKS = {
  ja: [
    { name: "🎨 ギャラリー", url: "https://asunaro0000.github.io/asunaro0000.homepage/gallery/" },
    { name: "📖 制作ブログ", url: "https://asunaro0000.github.io/asunaro0000.homepage/process/" },
    { name: "🛍️ グッズショップ", url: "https://asunaro0000.github.io/asunaro0000.homepage/goods/" },
    { name: "✨ Patreon (資料更新中)", url: "https://www.patreon.com/Asunaro0000" }
  ],
  en: [
    { name: "🎨 Gallery", url: "https://asunaro0000.github.io/asunaro0000.homepage/gallery/" },
    { name: "📖 Dev Blog", url: "https://asunaro0000.github.io/asunaro0000.homepage/process/" },
    { name: "🛍️ Shop", url: "https://asunaro0000.github.io/asunaro0000.homepage/goods/" },
    { name: "✨ Patreon", url: "https://www.patreon.com/Asunaro0000" }
  ]
};

// ★ここを false にすると画面下のデバッグログが完全に消えます
const IS_DEBUG = true; 

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
        if (isEn) debugElement.innerText = "Debug Log: Ready";
    }

    // UIのテキスト切り替え
    if (isEn) {
        document.getElementById("msg").placeholder = "Chat with Usako...";
        document.getElementById("send-btn").textContent = "Send";
    }

    // 案内板（相互リンク）の描画
    renderGuideBoard(lang);

    // 最初の挨拶を開始（言語を渡す）
    initGreeting(lang);
});

/**
 * ライトボックスを表示する共通関数
 */
function openLightbox(src) {
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    if (lb && lbImg) {
        lbImg.src = src;
        lb.style.display = 'flex';
    }
}

/**
 * 最初の挨拶を2回に分けて表示する処理
 */
async function initGreeting(lang) {
    const chat = document.getElementById('chat');
    const container = document.getElementById('chat-container');
    if (!chat) return;

    chat.innerHTML = ""; // 初期化

    const isEn = (lang === 'en');

    // 1通目：はじめまして
    const msg1 = document.createElement('div');
    msg1.className = 'bubble ai';
    if (isEn) {
        msg1.innerHTML = `Nice to meet you✨ I'm Usako. I live quietly in the forest with animals while enjoying dance and shamisen🌸<br><img src="./assets/main.webp">`;
    } else {
        msg1.innerHTML = `はじめまして✨ 私はウサ子。<br><br>この静かな森で、舞踊と三味線を嗜みながら動物たちと暮らしています🌸<br><img src="./assets/main.webp">`;
    }
    chat.appendChild(msg1);

    // 画像に拡大機能を付与
    const img1 = msg1.querySelector('img');
    if (img1) {
        img1.style.cursor = "zoom-in";
        img1.onclick = () => openLightbox(img1.src);
    }
    container.scrollTop = container.scrollHeight;

    // 1.5秒待機
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 2通目：ガイドライン
    const msg2 = document.createElement('div');
    msg2.className = 'bubble ai';
    if (isEn) {
        msg2.innerHTML = `If you're not sure what to talk about, try sending these words✨<br><br>
・"What do you usually do?" ... Self-introduction<br>
・"Tell me a story" ... Daily life episodes<br>
・"Tell me about the scenery" ... Memories of scenery<br>
・"Dance (Perform)" ... I'll perform shamisen or dance<br>
・"Fortune-telling" ... I'll tell your fortune🌸<br><br>I'm looking forward to chatting with you🍵`;
    } else {
        msg2.innerHTML = `何をお話しするか迷ったら、この言葉をそのまま送ってみてくださいね✨<br><br>
・「普段は何してるの？（好きなことは？）」 … 私自身の自己紹介<br>
・「日常を話して」 … 私の周りで起きた面白い小話<br>
・「景色を教えて」 … 私の思い出の風景<br>
・「踊って（演奏して）」 … 舞や三味線を披露します<br>
・「占って」 … あなたの運勢を舞いで占います。自慢の宝物もお見せするね🪭✨<br><br>
あなたとのお喋り、楽しみにしています🍵`;
    }
    chat.appendChild(msg2);
    container.scrollTop = container.scrollHeight;
}

/**
 * 案内板（リンク集）を描画する
 */
function renderGuideBoard(lang) {
    const board = document.getElementById('guide-board');
    if (!board) return;

    board.innerHTML = ""; 
    GUIDE_LINKS[lang].forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.className = 'guide-chip';
        a.innerText = link.name;
        board.appendChild(a);
    });
}

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

    const userDiv = document.createElement('div');
    userDiv.className = 'bubble user';
    userDiv.innerText = text;
    chat.appendChild(userDiv);
    
    input.value = "";
    container.scrollTop = container.scrollHeight;

    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'bubble ai loading';
    // 言語判定を簡易的に
    const isEn = !navigator.language.startsWith('ja');
    loadingDiv.innerText = isEn ? "Usako is thinking..." : "……考え中だよ🌸";
    chat.appendChild(loadingDiv);
    container.scrollTop = container.scrollHeight;

    try {
        const res = await fetch(GAS_URL, {
            method: "POST",
            body: JSON.stringify({ message: text })
        });

        const data = await res.json();
        if (IS_DEBUG && debugLog) debugLog.innerText = "【RAW】: " + JSON.stringify(data);

        loadingDiv.remove();

        const responseItems = Array.isArray(data) ? data : [data];
        for (let i = 0; i < responseItems.length; i++) {
            const item = responseItems[i];
            if (i > 0) await new Promise(resolve => setTimeout(resolve, 3000));

            const aiDiv = document.createElement('div');
            aiDiv.className = 'bubble ai';
            aiDiv.innerHTML = item.msg || "...";

            if (item.imgUrl && item.imgUrl !== "画像なし" && item.imgUrl !== "") {
                const img = document.createElement('img');
                img.src = item.imgUrl;
                img.style.cursor = "zoom-in";
                img.onclick = () => openLightbox(img.src);
                img.onload = () => { container.scrollTop = container.scrollHeight; };
                aiDiv.appendChild(img);
            }
            chat.appendChild(aiDiv);
            container.scrollTop = container.scrollHeight;
        }

    } catch (error) {
        console.error("Error:", error);
        if (loadingDiv) loadingDiv.remove();
        const errDiv = document.createElement('div');
        errDiv.className = 'bubble ai';
        errDiv.innerText = "Error occurred.";
        chat.appendChild(errDiv);
    }
    container.scrollTop = container.scrollHeight;
}

/**
 * イベントリスナー
 */
document.getElementById('send-btn').addEventListener('click', send);
document.getElementById('msg').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') send();
});