/**
 * 舞踊モード専用ロジック (dance.js)
 */
const URL_DANCE_ONLY = "https://script.google.com/macros/s/AKfycbzo2zYgBJEpqto-csZU2G2PnRe_F-74ibttNE59ApmldLbGUZxRRG-hNBKCRFb5bbHk/exec";

const DANCE_USER_ID = (() => {
    let id = localStorage.getItem('dance_user_id');
    if (!id) {
        id = "u_" + Math.random().toString(36).substring(2, 10);
        localStorage.setItem('dance_user_id', id);
    }
    return id;
})();

/**
 * 送信処理の横取り
 */
function initDanceInterceptor() {
    const sendBtn = document.getElementById('send-btn');
    const msgInput = document.getElementById('msg');
    const modeSelect = document.getElementById('mode-select');

    if (sendBtn) {
        window.addEventListener('click', (e) => {
            if (e.target === sendBtn && modeSelect.value === 'dance') {
                const text = msgInput.value.trim();
                if (!text) return;
                e.stopImmediatePropagation();
                e.preventDefault();
                danceSendProcess(text);
            }
        }, true);
    }
}

/**
 * 描画ロジック（独立）
 */
/**
 * dance.js 内の「danceAppendBubble」関数を探して、ここを書き換え！
 */
function danceAppendBubble(text, isUser) {
    const chat = document.getElementById('chat');
    const container = document.getElementById('chat-container');
    if (!chat || !container) return;

    const div = document.createElement('div');
    div.className = isUser ? 'bubble user' : 'bubble ai';
    
    // ↓ ここが .innerText になっているはずだから、 .innerHTML に変える！
    div.innerHTML = text; 
    
    chat.appendChild(div);
    container.scrollTop = container.scrollHeight;
    return div;
}
/**
 * 演目モード専用デバッグ出力
 * 不要な時は関数内を全てコメントアウトしてね
 */
function danceLog(label, data) {
    const el = document.getElementById('dance-debug');
    if (!el) return;
    const time = new Date().toLocaleTimeString();
    const content = (data && typeof data === 'object') ? JSON.stringify(data) : data;
    el.innerText = `[${time}] ${label}: ${content}\n` + el.innerText;
}

async function danceSendProcess(text) {
    const input = document.getElementById('msg');
    danceAppendBubble(text, true);
    input.value = "";
    const isEn = (typeof currentLang !== 'undefined' && currentLang === 'en');
    const chat = document.getElementById('chat');
    const container = document.getElementById('chat-container');
    const loadDiv = document.createElement('div');
    loadDiv.className = 'bubble ai loading';
    loadDiv.innerText = isEn ? "...Preparing the lesson🌸" : "……お稽古の準備中よ🌸";
    chat.appendChild(loadDiv);
    container.scrollTop = container.scrollHeight;

    // デバッグ：送信データ確認
    const payload = { 
        userId: DANCE_USER_ID,
        message: text, 
        lang: (typeof currentLang !== 'undefined') ? currentLang : 'ja',
        mode: 'dance'
    };
    danceLog("SEND", payload);

    try {
        const res = await fetch(URL_DANCE_ONLY, {
            method: "POST",
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        
        // デバッグ：受信データ確認
        danceLog("RECV", data);

        loadDiv.remove();
        
        const responseItems = Array.isArray(data) ? data : [data];
        for (const item of responseItems) {
            const aiDiv = danceAppendBubble(item.msg, false);
            
            // 画像判定のログ
            if (item.imgUrl && item.imgUrl !== "画像なし") {
                danceLog("IMG_FOUND", item.imgUrl);

                const img = document.createElement('img');
                img.src = item.imgUrl;
                img.style.width = "100%";
                img.style.marginTop = "10px";
                img.onclick = () => { if (typeof openLightbox === 'function') openLightbox(img.src); };
                
                // デバッグ：読み込み失敗検知
                img.onerror = () => {
                    danceLog("IMG_LOAD_ERROR", item.imgUrl);
                };

                aiDiv.appendChild(img);
            } else {
                danceLog("IMG_SKIP", "画像データなし");
            }
        }
        container.scrollTop = container.scrollHeight;
    } catch (error) {
        if (loadDiv) loadDiv.remove();
        danceLog("FETCH_ERROR", error.toString());
        const isEn = (typeof currentLang !== 'undefined' && currentLang === 'en');
        const errorMsg = isEn ? "Connection error. Please try again." : "通信エラーよぉ。もう一度送ってね。";
        danceAppendBubble(errorMsg, false);
    }
}

/**
 * 【重要】クイックボタンと「専用セレクトボックス」を生成
 */
/**
 * 【重要】演目リストをGASから取得してセレクトボックスを生成
 */
async function updateDanceUI() {
    const modeSelect = document.getElementById('mode-select');
    const container = document.getElementById('quick-btn-container');
    if (!modeSelect || !container) return;

    // --- 【重要】danceモード以外なら、通常のクイックボタンを再描画して終了 ---
    if (modeSelect.value !== 'dance') {
        if (typeof renderQuickButtons === 'function') {
            renderQuickButtons(currentLang);
        }
        return;
    }
    // ----------------------------------------------------------------------

    container.innerHTML = ""; // 一旦クリア
    const isEn = (typeof currentLang !== 'undefined' && currentLang === 'en');

    // 1. 演目セレクトボックスの土台作成
    const danceList = document.createElement('select');
    danceList.id = "dance-episode-list";
    danceList.className = "quick-select";
    danceList.style.padding = "5px";
    danceList.style.borderRadius = "15px";
    danceList.style.border = "1px solid #ffb7c5";
    danceList.style.backgroundColor = "#fff";

    const defaultLabel = isEn ? "✨ Plays" : "✨ 演目を選ぶ";
    danceList.innerHTML = `<option value="">${defaultLabel} (読み込み中...)</option>`;
    container.appendChild(danceList); // 先に表示しておく

    // 2. クイックボタン（続き、最初から）の作成
    const buttons = [
        { label: isEn ? "🐾 Continue" : "🐾 続き", text: isEn ? "Tell me more" : "続きを教えて" },
        
    ];
    buttons.forEach(btn => {
        const button = document.createElement('button');
        button.className = 'quick-chip';
        button.innerText = btn.label;
        button.onclick = () => danceSendProcess(btn.text);
        container.appendChild(button);
    });

    // 3. スプレッドシートから演目リストを取得
    try {
        // ★現在の言語(currentLang)をパラメータとして追加！
        const langParam = (typeof currentLang !== 'undefined') ? currentLang : 'ja';
        const res = await fetch(`${URL_DANCE_ONLY}?action=getDanceList&lang=${langParam}`);

        const list = await res.json(); 

        // リストをリセットして中身を入れる
        danceList.innerHTML = `<option value="">${defaultLabel}</option>`;
        
        list.forEach(name => {
            if (!name) return; // 空行飛ばし
            const el = document.createElement('option');
            el.value = name;
            el.textContent = "🌸 " + name;
            danceList.appendChild(el);
        });
    } catch (e) {
        if (typeof danceLog === 'function') danceLog("LIST_LOAD_ERROR", e);
        danceList.innerHTML = `<option value="">${isEn ? "Load Failed" : "演目取得失敗"}</option>`;
    }

    danceList.onchange = () => {
        if (danceList.value) {
            danceSendProcess(danceList.value);
            danceList.value = "";
        }
    };
}
// 初期化
document.addEventListener('DOMContentLoaded', () => {
    initDanceInterceptor();
    const modeSelect = document.getElementById('mode-select');
    if (modeSelect) {
        modeSelect.addEventListener('change', updateDanceUI);
        // 初期読み込み時にdanceなら表示
        if (modeSelect.value === 'dance') updateDanceUI();
    }
});

/**
 * 演目モード専用デバッグ出力
 */
function danceLog(label, data) {
    const el = document.getElementById('dance-debug');
    if (!el) return;
    const time = new Date().toLocaleTimeString();
    // オブジェクトならJSON文字列に、文字列ならそのまま表示
    const content = typeof data === 'object' ? JSON.stringify(data) : data;
    el.innerText = `[${time}] ${label}: ${content}\n` + el.innerText;
}