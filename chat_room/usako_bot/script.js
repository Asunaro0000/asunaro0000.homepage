/**
 * 設定エリア
 */
const GAS_URL = "https://script.google.com/macros/s/AKfycbyw8KuPAQifE85osH6RKUBlqEWdlbNTADrnTGLNCTDu9YWvn-Bo0H3u4Kh6vkpXqF9VsQ/exec";
let currentLang = 'ja'; // 現在の言語状態を保持

/**
 * 相互リンク（案内板）のデータ
 */
const GUIDE_LINKS = {
  ja: [
    { name: "🎨 ギャラリー", url: "https://asunaro0000.github.io/asunaro0000.homepage/gallery/Usako_and_Kameko/usako_diary/index.html" },
    { name: "📖 制作ブログ", url: "https://asunaro0000.github.io/asunaro0000.homepage/process/" },
    { name: "🛍️ グッズショップ", url: "https://asunaro0000.github.io/asunaro0000.homepage/goods/" },
    { name: "✨ Patreon (資料更新中)", url: "https://www.patreon.com/Asunaro0000" }
  ],
  en: [
    { name: "🎨 Gallery", url: "https://asunaro0000.github.io/asunaro0000.homepage/en/gallery/Usako_and_Kameko/usako_diary/index.html" },
    { name: "📖 Dev Blog", url: "https://asunaro0000.github.io/asunaro0000.homepage/en/process/" },
    { name: "🛍️ Shop", url: "https://asunaro0000.github.io/asunaro0000.homepage/en/goods/" },
    { name: "✨ Patreon", url: "https://www.patreon.com/Asunaro0000" }
  ]
};

const IS_DEBUG = true; 

/**
 * 初期化処理
 */
window.addEventListener('DOMContentLoaded', () => {
    // 1. 初期の言語判定（URLパラメータまたはブラウザ設定）
    const params = new URLSearchParams(window.location.search);
    const isEnDefault = params.get('lang') === 'en' || (!navigator.language.startsWith('ja'));
    currentLang = isEnDefault ? 'en' : 'ja';

    // 2. 言語切り替えボタンのイベント登録
    const toggleBtn = document.getElementById('lang-toggle-btn');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            currentLang = (currentLang === 'ja') ? 'en' : 'ja';
            applyLanguage(currentLang);
        });
    }

    // 3. エピソードリストの選択イベント
    document.getElementById('episode-list').addEventListener('change', (e) => {
        const msgInput = document.getElementById('msg');
        if (e.target.value) {
            msgInput.value = e.target.value; 
        }
    });

    // 4. 初回の表示適用
    applyLanguage(currentLang);
});

/**
 * 言語に応じてUI（見た目）を更新する
 */
function applyLanguage(lang) {
    const isEn = (lang === 'en');
    
    // 入力欄やボタンの文字
    document.getElementById("msg").placeholder = isEn ? "Chat with Usako..." : "ウサ子にお話しして...";
    document.getElementById("send-btn").textContent = isEn ? "Send" : "送信";
    
    // エピソードリストの最初の項目
    const epSelect = document.getElementById('episode-list');
    if (epSelect.options.length > 0) {
        epSelect.options[0].textContent = isEn ? "✨Select" : "✨選ぶ";
    }

    // デバッグログ
    const debugElement = document.getElementById('debug-log');
    if (debugElement) {
        debugElement.style.display = IS_DEBUG ? 'block' : 'none';
        debugElement.innerText = isEn ? "Debug Log: Ready" : "デバッグログ: 準備完了";
    }

    renderGuideBoard(lang); // 案内板の更新
    initGreeting(lang);    // 挨拶の更新
    loadEpisodeList(lang); // リストの再取得
}

/**
 * エピソードリストをGASから取得
 */
async function loadEpisodeList(lang) {
    try {
        const res = await fetch(GAS_URL, {
            method: "POST",
            body: JSON.stringify({ type: "get_list", lang: lang })
        });
        const data = await res.json();
        const select = document.getElementById('episode-list');
        
        // 「✨選ぶ」だけ残してクリア
        while (select.options.length > 1) select.remove(1);

        data.episodes.forEach(ep => {
            const opt = document.createElement('option');
            opt.value = ep;
            opt.textContent = ep;
            select.appendChild(opt);
        });
    } catch (e) { console.error("List load error", e); }
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

    // ユーザーの吹き出し
    const userDiv = document.createElement('div');
    userDiv.className = 'bubble user';
    userDiv.innerText = text;
    chat.appendChild(userDiv);
    
    input.value = "";
    container.scrollTop = container.scrollHeight;

    // ローディング表示
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'bubble ai loading';
    loadingDiv.innerText = (currentLang === 'en') ? "Usako is thinking..." : "……考え中だよ🌸";
    chat.appendChild(loadingDiv);
    container.scrollTop = container.scrollHeight;

    try {
        const res = await fetch(GAS_URL, {
            method: "POST",
            body: JSON.stringify({ message: text, lang: currentLang }) 
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
        errDiv.innerText = (currentLang === 'en') ? "Error occurred." : "エラーが発生しました。";
        chat.appendChild(errDiv);
    }
    container.scrollTop = container.scrollHeight;
}

/**
 * 最初の挨拶を表示する
 */
async function initGreeting(lang) {
    const chat = document.getElementById('chat');
    const container = document.getElementById('chat-container');
    if (!chat) return;

    chat.innerHTML = ""; // 画面をクリア
    const isEn = (lang === 'en');

    // 1通目
    const msg1 = document.createElement('div');
    msg1.className = 'bubble ai';
    if (isEn) {
        msg1.innerHTML = `Nice to meet you✨ I'm Usako. I live quietly in the forest with animals while enjoying dance and shamisen🌸<br><img src="./assets/main.webp">`;
    } else {
        msg1.innerHTML = `はじめまして✨ 私はウサ子。<br><br>この静かな森で、舞踊と三味線を嗜みながら動物たちと暮らしています🌸<br><img src="./assets/main.webp">`;
    }
    chat.appendChild(msg1);

    const img1 = msg1.querySelector('img');
    if (img1) {
        img1.style.cursor = "zoom-in";
        img1.onclick = () => openLightbox(img1.src);
    }
    container.scrollTop = container.scrollHeight;

    await new Promise(resolve => setTimeout(resolve, 1500));

    // 2通目
    const msg2 = document.createElement('div');
    msg2.className = 'bubble ai';
if (isEn) {
        msg2.innerHTML = `If you're not sure what to talk about, try these options✨<br>
・Please choose from the list to hear my stories.🐰<br>
・"Fortune-telling" ... I'll tell your fortune with a dance and show you my precious treasures!🪭✨<br>
Also, if you say **"Tell me more"** or **"And then?"**, I'll be delighted to share even more details with you!🍵`;
    } else {
        msg2.innerHTML = `何をお話しするか迷ったら、この言葉をそのまま送ってみてくださいね✨<br>
・リストから選んで話してくださいね。ウサ子のエピソードをお話しします。🐰

・「占い」 … あなたの運勢を舞いで占います。自慢の宝物もお見せするね🪭✨<br>
「続きを話して」や「それから？」など、お話を促してくれたらウサ子はもっと喜んでお話ししますよ🍵`;
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
    const links = GUIDE_LINKS[lang] || GUIDE_LINKS['ja'];
    links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.className = 'guide-chip';
        a.innerText = link.name;
        board.appendChild(a);
    });
}

/**
 * ライトボックス
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
 * イベントリスナー登録
 */
document.getElementById('send-btn').addEventListener('click', send);
document.getElementById('msg').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') send();
});