/**
 * 設定エリア
 */
const GAS_URL = "https://script.google.com/macros/s/AKfycbxVi1HTzUBH8uZGsfxzVzib6K7ExtM08OL9Fi7HIvBb1eF1LvbHv4cpZAxX9nW6jq9DIw/exec";
let currentLang = 'ja'; // 現在の言語状態を保持

/**
 * 相互リンク（案内板）のデータ
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

const IS_DEBUG = true; 

/**
 * 初期化処理
 */
window.addEventListener('DOMContentLoaded', () => {
    // 1. 初期の言語判定
    const params = new URLSearchParams(window.location.search);
    const isEnDefault = params.get('lang') === 'en' || (!navigator.language.startsWith('ja'));
    currentLang = isEnDefault ? 'en' : 'ja';

    // 2. 言語切り替えボタン
    const toggleBtn = document.getElementById('lang-toggle-btn');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            currentLang = (currentLang === 'ja') ? 'en' : 'ja';
            applyLanguage(currentLang);
        });
    } // ← ここできちんと閉じる

    // 3. モード選択リストの変更イベント
    // script.js 内の初期化処理 (DOMContentLoaded内) を書き換え
    const modeSelect = document.getElementById('mode-select');
    if (modeSelect) {
        // script.js のモード切替部分
        modeSelect.addEventListener('change', () => {
            const episodeList = document.getElementById('episode-list');
            const mazeList = document.getElementById('maze-location-list');

            if (modeSelect.value === 'maze') {
                // 森ナビモード：チャットを隠してナビを出す
                episodeList.classList.add('hidden');
                mazeList.classList.remove('hidden');
                
                // リストの読み込みだけはJSで実行するお！
                updateMazeLocationList(); 
            } else {
                // チャットモード：ナビを隠してチャットを出す
                episodeList.classList.remove('hidden');
                mazeList.classList.add('hidden');
                isMazeMode = false;
            }
        });
    }
// --- script.js の DOMContentLoaded 内に追加するおぉ！ ---

const episodeSelect = document.getElementById('episode-list');
if (episodeSelect) {
    episodeSelect.addEventListener('change', () => {
        const selectedValue = episodeSelect.value;
        if (!selectedValue) return; // 「✨選ぶ」に戻した時は何もしないお

        // 言語に合わせてメッセージを作るお
        const message = (currentLang === 'en') 
            ? `Tell me the story of "${selectedValue}"` 
            : `${selectedValue}の話を聞かせて`;

        // クイック送信！
        quickSend(message);
        
        // 送信した後はセレクトボックスを「✨選ぶ」に戻しておくと親切だお
        episodeSelect.selectedIndex = 0;
    });
}
    // 5. 初回の表示適用
    applyLanguage(currentLang);
});

/**
 * 言語に応じてUI（見た目）を更新する
 */
function applyLanguage(lang) {
    const isEn = (lang === 'en');
    
    // 既存の入力欄などの更新
    document.getElementById("msg").placeholder = isEn ? "Chat with Risuko..." : "リス子にお話ししてぇ...";
    document.getElementById("send-btn").textContent = isEn ? "Send" : "送信";

    // --- 【追加】クイックボタンを生成・更新 ---
    renderQuickButtons(lang);

    // 案内板や挨拶の更新
    renderGuideBoard(lang);
    initGreeting(lang);
    loadEpisodeList(lang);
}

/**
 * クイック送信ボタンを動的に生成する
 */
/**
 * renderQuickButtons の修正
 * モード選択の状態を見て、描画するボタンを切り替える
 */
function renderQuickButtons(lang) {
    const container = document.getElementById('quick-btn-container');
    const mode = document.getElementById('mode-select')?.value || 'chat'; // 現在のモードを取得
    if (!container) return;

    container.innerHTML = "";
    const isEn = (lang === 'en');

    if (mode === 'maze') {
        // --- リス子の森ナビゲームモードのボタン (maze.jsの関数を呼ぶ) ---
        renderMazeButtons(container, isEn);
    } else {
        // --- 通常チャットモードのボタン ---
        const buttons = [
            { label: isEn ? "🐾 Next?" : "🐾 続きは？", text: isEn ? "And then?" : "続きは？" },
            { label: isEn ? "📖 Story" : "📖 お話してぇ", action: () => sendRandomStoryFromList(lang) },
            { label: isEn ? "✨ Item" : "✨ お宝っ", text: isEn ? "Show me your treasure" : "宝物を見せて" }
        ];

        buttons.forEach(btn => {
            const button = document.createElement('button');
            button.className = 'quick-chip';
            button.innerText = btn.label;
            button.onclick = btn.action ? btn.action : () => quickSend(btn.text);
            container.appendChild(button);
        });
    }
}
/**
 * すでに取得済みのエピソードリストからランダムに選んで送信する
 */
function sendRandomStoryFromList(lang) {
    const select = document.getElementById('episode-list');
    if (!select || select.options.length <= 1) {
        // リストが空っぽの時の保険だよぉ
        const failMsg = lang === 'en' ? "Tell me a story!" : "何かお話してぇ";
        quickSend(failMsg);
        return;
    }

    // 0番目は「✨選ぶ」だから、1番目以降からランダムに選ぶよぉ！
    const randomIndex = Math.floor(Math.random() * (select.options.length - 1)) + 1;
    const selectedStory = select.options[randomIndex].value;

    // 「〜の話を聞かせて」というメッセージを作るねぇ
    const message = lang === 'en' 
        ? `Tell me the story of "${selectedStory}"` 
        : `${selectedStory}の話を聞かせて`;

    quickSend(message);
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
    loadingDiv.innerText = (currentLang === 'en') ? "Risuko is thinking..." : "リス子、考え中だねぇ...";
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
/**
 * 最初の挨拶を表示する
 */
async function initGreeting(lang) {
    const chat = document.getElementById('chat');
    const container = document.getElementById('chat-container');
    const modeSelect = document.getElementById('mode-select'); // モード選択を取得
    if (!chat) return;

    chat.innerHTML = ""; 
    const isEn = (lang === 'en');

// --- 1通目（メイン画像と挨拶） ---
    const msg1 = document.createElement('div');
    msg1.className = 'bubble ai';
    
    if (isEn) {
        msg1.innerHTML = `Hiya! I'm Risuko🐿️✨
I've been waiting for you with my tail wagging!
Let's enjoy exploring and chatting together!
<img src="./assets/main.webp">`;
    } else {
        msg1.innerHTML = `やっほー！リス子だよ！🐿️✨
あなたに会えるのを、しっぽを長くして待ってたよぉ！
これからの探検や内緒のお話し、リス子と一緒にいっぱい楽しもうねぇ。
<img src="./assets/main.webp">`;
    }
    chat.appendChild(msg1);

    const img1 = msg1.querySelector('img');
    if (img1) {
        img1.style.cursor = "zoom-in";
        img1.onclick = () => openLightbox(img1.src);
    }
    container.scrollTop = container.scrollHeight;

    // --- 【ここが重要！】 ---
    // リス子の森ナビモードが選択されている場合は、ここでおしまいにするよぉ！
    // 2通目の「使い方案内」は表示させないよぉ。
    if (modeSelect && modeSelect.value === 'maze') {
        return; 
    }

// --- チャットモード専用のプチ案内だよぉ！ ---
    await new Promise(resolve => setTimeout(resolve, 1500));

    const msg2 = document.createElement('div');
    msg2.className = 'bubble ai';
    
if (isEn) {
        msg2.innerHTML = `Not sure what to say? Try these!✨
・"Tell me a story"：My memories🐿️
・"And then?"：More fluffy talk🐾
・"Treasures!"：My forest collection✨

------------Button Guide--------------

🌎 Left: Language (JP/EN)
🔄 Center: Mode Switch
    ・Chat: Talk with me!💬
    ・Forest Nav: Explore the woods!🌲
✨ Right: Topics
    ・Pick something to talk about!`;
    } else {
        msg2.innerHTML = `迷ったらボタンをポチッとしてねぇ✨
・「お話してぇ」：リス子の思い出🐿️
・「続きは？」：しっぽフリフリお話し🐾
・「お宝っ！」：自慢のコレクション✨

------------ボタン説明--------------

🌎 左：言葉の切替 (日本語/英語)
🔄 中央：モード切替
    ・チャット：のんびりお話し💬
    ・森ナビ：一緒に森を探検！🌲
✨ 右：話題を選ぶ
    ・お願いや質問が選べるよぉ！`;
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

/**
 * スマホ用ポップアップ入力の制御
 */
const originalInput = document.getElementById('msg');
const expandedContainer = document.getElementById('expanded-input-container');
const expandedTextarea = document.getElementById('expanded-msg');
const charCount = document.getElementById('char-count');

// スマホ判定（768px以下）
const isMobile = () => window.innerWidth <= 768;

// 元の入力欄をクリックした時の挙動
originalInput.addEventListener('mousedown', (e) => {
    if (isMobile()) {
        e.preventDefault(); // キーボード立ち上がりを防止
        expandedTextarea.value = originalInput.value;
        updateCharCount();
        expandedContainer.style.display = 'flex';
        expandedTextarea.focus();
    }
});

// 文字数カウント
function updateCharCount() {
    charCount.textContent = `${expandedTextarea.value.length} / 100`;
}
expandedTextarea.addEventListener('input', updateCharCount);

// 閉じる
document.getElementById('close-expanded').addEventListener('click', () => {
    originalInput.value = expandedTextarea.value;
    expandedContainer.style.display = 'none';
});

// 拡大版から送信
document.getElementById('expanded-send-btn').addEventListener('click', () => {
    const text = expandedTextarea.value.trim();
    if (text) {
        originalInput.value = text;
        send(); // 既存のsend()関数を流用
        expandedContainer.style.display = 'none';
    }
});
/* script.js の最後の方に追加してねぇ！ */

/**
 * クイック送信ボタン用
 */
function quickSend(text) {
    const input = document.getElementById('msg');
    const expandedTextarea = document.getElementById('expanded-msg');
    
    // 入力欄に文字を入れてから send() を呼ぶよぉ
    input.value = text;
    if (expandedTextarea) expandedTextarea.value = text;
    
    // 既存の send 関数をそのまま実行！
    send();
}