/**
 * 設定エリア
 */
const GAS_URL = "https://script.google.com/macros/s/AKfycbyo2S5ywIae6wC0NXUjQHfR0wBSnCyn-sFHitUoupx_PLlndBLk6fhYAGA3SsahS6dXHQ/exec";
let currentLang = 'ja'; // 現在の言語状態を保持

/**
 * 相互リンク（案内板）のデータ
 */
const GUIDE_LINKS = {
  ja: [
    { name: "🎨 ギャラリー", url: "https://asunaro0000.github.io/asunaro0000.homepage/gallery/Usako_and_Kameko/usako_diary/index.html" },
    { name: "📖 機能と仕組み", url: "https://asunaro0000.github.io/asunaro0000.homepage/process/article/20260216_usako-chat/usako-chat.html" },
    { name: "✨ Patreon (資料更新中)", url: "https://www.patreon.com/Asunaro0000" }
  ],
  en: [
    { name: "🎨 Gallery", url: "https://asunaro0000.github.io/asunaro0000.homepage/en/gallery/Usako_and_Kameko/usako_diary/index.html" },
    { name: "📖 Dev Blog", url: "https://asunaro0000.github.io/asunaro0000.homepage/en/process/article/20260216_usako-chat/usako-chat.html" },
    { name: "✨ Patreon", url: "https://www.patreon.com/Asunaro0000" }
  ]
};
/**
 * ユーザーID（セーブデータ鍵）の確定ロジック
 * localStorageを使用して、ブラウザを閉じても同じIDを保持するおぉ！
 */
function getPersistentUserId() {
    let id = localStorage.getItem('usako_user_id');
    if (!id) {
        id = "u_" + Math.random().toString(36).substring(2, 10);
        localStorage.setItem('usako_user_id', id);
    }
    return id;
}

const MY_USER_ID = getPersistentUserId();

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
/**
 * 言語に応じてUI（見た目）を更新する
 */
function applyLanguage(lang) {
    const isEn = (lang === 'en');
    
    // --- 【追加】モード切替（チャット/演目）の多言語化 ---
    const modeSelect = document.getElementById('mode-select');
    if (modeSelect && modeSelect.options.length >= 2) {
        modeSelect.options[0].textContent = isEn ? "💬 Chat" : "💬 チャット";
        modeSelect.options[1].textContent = isEn ? "🪭 Plays" : "🪭 演目";
    }

    // 既存の入力欄などの更新
    const msgInput = document.getElementById("msg");
    if (msgInput) {
        msgInput.placeholder = isEn ? "Chat with Usako..." : "ウサ子にお話しして...";
    }
    
    const sendBtn = document.getElementById("send-btn");
    if (sendBtn) {
        sendBtn.textContent = isEn ? "Send" : "送信";
    }
    
    // エピソード選択の初期表示を更新
    const episodeList = document.getElementById("episode-list");
    if (episodeList && episodeList.options.length > 0) {
        episodeList.options[0].textContent = isEn ? "✨ Select" : "✨ 選ぶ";
    }

    // クイックボタンを再描画（モードがdanceならdance.js側が呼ばれるように設計済み）
    if (modeSelect && modeSelect.value === 'dance') {
        if (typeof updateDanceUI === 'function') updateDanceUI();
    } else {
        renderQuickButtons(lang);
    }

    // 案内板や挨拶の更新
    renderGuideBoard(lang);
    initGreeting(lang);
    loadEpisodeList(lang);
}

/**
 * クイック送信ボタンを動的に生成する
 */
function renderQuickButtons(lang) {
    const container = document.getElementById('quick-btn-container');
    if (!container) return;

    container.innerHTML = "";

    const isEn = (lang === 'en');
    const buttons = [
        { label: isEn ? "🪭 Next?" : "🪭 続きは？", text: isEn ? "Next?" : "続きは？" },
        // --- 「お話してぇ」ボタン：既存のリストを流用するよぉ！ ---
        { 
            label: isEn ? "📖 Story" : "📖 お話して", 
            action: () => sendRandomStoryFromList(lang) 
        },
        // ---------------------------------------------------
        { label: isEn ? "🔮 fortune" : "🔮占って", text: isEn ? "fortune telling" : "占って" }
    ];

    buttons.forEach(btn => {
        const button = document.createElement('button');
        button.className = 'quick-chip';
        button.innerText = btn.label;
        
        if (btn.action) {
            button.onclick = btn.action;
        } else {
            button.onclick = () => quickSend(btn.text);
        }
        
        container.appendChild(button);
    });
}
/**
 * すでに取得済みのエピソードリストからランダムに選んで送信する
 */
function sendRandomStoryFromList(lang) {
    const select = document.getElementById('episode-list');
    if (!select || select.options.length <= 1) {
        // リストが空っぽの時の保険だおぉ
        const failMsg = lang === 'en' ? "Chat with Usako..." : "ウサ子にお話しして...";
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
            body: JSON.stringify({ 
                type: "get_list", 
                userId: MY_USER_ID, // ← 追加
                lang: lang 
            })
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
    const modeSelect = document.getElementById('mode-select');
    const input = document.getElementById('msg');
    const text = input.value.trim();
    if (!text) return;

    // --- 【追加】演目モード（dance）の場合は dance.js の処理に委譲して終了 ---
    if (modeSelect && modeSelect.value === 'dance') {
        if (typeof danceSendProcess === 'function') {
            danceSendProcess(text);
        }
        return;
    }
    // -------------------------------------------------------------------

    const chat = document.getElementById('chat');
    const container = document.getElementById('chat-container');
    const debugLog = document.getElementById('debug-log');
    
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

    // （この後に続く fetch 処理などはそのまま）
try {
        const res = await fetch(GAS_URL, {
            method: "POST",
            body: JSON.stringify({ 
                userId: MY_USER_ID, // ← ここにIDを追加！これでGAS側のハッシュ構造と紐付くよぉ！
                message: text, 
                lang: currentLang 
            }) 
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

    chat.innerHTML = ""; 
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
・"Story" ... I'll share random memories with you.🐰<br>
・"Next?" ... **Click three times to complete the tale.** The true story unfolds only for those who go deeper...🍵<br>
・"Fortune" ... I'll tell your fortune with a dance and show you my treasures!🪭✨`;
    } else {
        msg2.innerHTML = `何をお話しするか迷ったら、下の３つのボタンを押してね。<br>
・「お話して」… ウサ子の思い出をお話しするよ！✨<br>
・「続きは？」… **三度（みたび）押せば、物語の真実に手が届くわ。** 連続で押してウサ子の深淵を覗いてみて🍵<br>
・「占い」 … あなたの運勢を舞いで占います。自慢の宝物もお見せするね🪭✨`;
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