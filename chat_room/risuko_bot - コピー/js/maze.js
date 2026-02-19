/**
 * 迷路ゲーム専用ロジック (maze.js)
 */
const MAZE_GAS_URL = "https://script.google.com/macros/s/AKfycby6K0DqTElScVeZBmHGEOibYJdqA5qSKU5OqSnDjvzdstS_dCnrhrkBmKQdc61wVSdZSw/exec";
let isMazeMode = false;
let currentX = 0;
let currentY = 0;

function mazeAppendMessage(role, text, imgUrl = null) {
    const chat = document.getElementById('chat');
    const container = document.getElementById('chat-container');
    if (!chat) return;
    const div = document.createElement('div');
    div.className = (role === 'risuko') ? 'bubble ai' : 'bubble user';
    let content = text || "...";
    if (imgUrl && imgUrl !== "画像なし" && imgUrl !== "") {
        content += `<br><img src="${imgUrl}" style="max-width:100%; border-radius:8px; margin-top:8px; cursor:zoom-in;" onclick="if(window.openLightbox) openLightbox('${imgUrl}')">`;
    }
    div.innerHTML = content;
    chat.appendChild(div);
    if (container) container.scrollTop = container.scrollHeight;
}

/**
 * 送信ボタンの制御を「完全横取り」する
 */
function initMazeController() {
    const sendBtn = document.getElementById('send-btn');
    const msgInput = document.getElementById('msg');

    if (sendBtn) {
        // script.js 側のイベントより先に実行させるために capture モードを使用
        window.addEventListener('click', (e) => {
            if (e.target === sendBtn && isMazeMode) {
                // 迷路モードなら、script.js の処理を止めてこっちを実行
                e.stopImmediatePropagation(); 
                e.preventDefault();
                
                const text = msgInput.value.trim();
                if (!text) return;
                msgInput.value = "";
                executeMazeSend(text, currentX, currentY, false);
            }
        }, true); // true = キャプチャフェーズで先に捕まえる
    }

    // エンターキーも同様に横取り
    msgInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && isMazeMode) {
            e.stopImmediatePropagation();
            // 送信ボタンのクリックイベントを発火（上記で横取りされる）
            sendBtn.click();
        }
    }, true);
}

// 初期化実行
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMazeController);
} else {
    initMazeController();
}

/**
 * チップ（ボタン）クリック時の処理
 */
function renderMazeButtons(container, isEn) {
    if (!container) return;
    container.innerHTML = "";

    if (!isMazeMode) {
        const startBtn = document.createElement('button');
        startBtn.className = 'quick-chip';
        startBtn.style.background = "#ffcc80";
        startBtn.innerText = isEn ? "🏁 Start Exploration" : "🏁 探検を開始するおぉ！";
        startBtn.onclick = (e) => {
            e.stopPropagation(); // script.jsに伝わらないようにガード
            isMazeMode = true;   // ここで確実にスイッチON
            currentX = 0; currentY = 0;
            executeMazeSend(isEn ? "Let's start!" : "探検スタートだおぉ！", 0, 0, isEn);
        };
        container.appendChild(startBtn);
        return;
    }

    const moves = [
        { label: isEn ? "⬆️ Forward" : "⬆️ 前へ", dx: 0, dy: 1, text: isEn ? "Go forward" : "前に進むよぉ" },
        { label: isEn ? "⬅️ Left" : "⬅️ 左へ", dx: -1, dy: 0, text: isEn ? "Go left" : "左に進むよぉ" },
        { label: isEn ? "⬇️ Back" : "⬇️ 後へ", dx: 0, dy: -1, text: isEn ? "Go back" : "後ろに下がるおぉ" },
        { label: isEn ? "➡️ Right" : "➡️ 右へ", dx: 1, dy: 0, text: isEn ? "Go right" : "右に進むよぉ" }
    ];

    moves.forEach(m => {
        const btn = document.createElement('button');
        btn.className = 'quick-chip';
        btn.innerText = m.label;
        btn.onclick = (e) => {
            e.stopPropagation();
            const nextX = Math.max(-1, Math.min(1, currentX + m.dx));
            const nextY = Math.max(-1, Math.min(1, currentY + m.dy));
            if (nextX === currentX && nextY === currentY) {
                mazeAppendMessage('risuko', isEn ? "Can't go further!" : "これ以上は進めないおぉ！");
                return;
            }
            currentX = nextX; currentY = nextY;
            executeMazeSend(m.text, currentX, currentY, isEn);
        };
        container.appendChild(btn);
    });
}

/**
 * maze.js の executeMazeSend 関数内の try ブロックを以下に差し替え
 */
async function executeMazeSend(text, x, y, isEn) {
    mazeAppendMessage('user', text);
    const chat = document.getElementById('chat');
    const container = document.getElementById('chat-container');
    const debugLog = document.getElementById('debug-log'); // ログ取得用
    
    const loadDiv = document.createElement('div');
    loadDiv.className = 'bubble ai loading';
    loadDiv.innerText = isEn ? "Thinking..." : "考え中...";
    chat.appendChild(loadDiv);

    try {
        const response = await fetch(MAZE_GAS_URL, {
            method: "POST",
            body: JSON.stringify({ message: text, x: x, y: y, lang: isEn ? "en" : "ja" })
        });
        const data = await response.json();
        
        // --- 【追加】デバッグログへの書き出し ---
        if (debugLog) {
            debugLog.innerText = `【RAW JSON】: ${JSON.stringify(data, null, 2)}`;
        }

        const res = data[0];
        if (loadDiv) loadDiv.remove();

        let displayMsg = res.msg || "";
        if (displayMsg.includes(":(")) displayMsg = displayMsg.split(":(")[0];
        if (displayMsg.includes("|")) displayMsg = displayMsg.split("|")[0].trim();

        mazeAppendMessage('risuko', displayMsg, res.bgImage);
    } catch (e) {
        if (loadDiv) loadDiv.remove();
        if (debugLog) debugLog.innerText = `【ERROR】: ${e.toString()}`;
        mazeAppendMessage('risuko', "エラーだおぉ。URLかGASの設定を確認してほしいおぉ。");
    } finally {
        const qContainer = document.getElementById('quick-btn-container');
        renderMazeButtons(qContainer, isEn);
    }
}