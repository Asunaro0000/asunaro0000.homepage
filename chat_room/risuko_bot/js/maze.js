/**
 * リス子ガイドゲーム専用ロジック (maze.js)
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
    
    // 画像がある場合の処理
    if (imgUrl && imgUrl !== "画像なし" && imgUrl !== "") {
        // imgに onload を仕込んで、画像が表示された瞬間に再度スクロールさせるおぉ！
        content += `<br><img src="${imgUrl}" 
            style="max-width:100%; border-radius:8px; margin-top:8px; cursor:zoom-in;" 
            onload="const c=document.getElementById('chat-container'); if(c) c.scrollTop=c.scrollHeight;"
            onclick="if(window.openLightbox) openLightbox('${imgUrl}')">`;
    }
    
    div.innerHTML = content;
    chat.appendChild(div);

    // 1. まずはメッセージ追加直後にスクロール！
    if (container) {
        container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth' // スルッと動かすおぉ🐿️
        });
    }
}

/**
 * 送信ボタンの制御を「完全横取り」する
 */

function initMazeController() {
    const sendBtn = document.getElementById('send-btn');
    const msgInput = document.getElementById('msg');

    if (sendBtn) {
        window.addEventListener('click', (e) => {
            if (e.target === sendBtn && isMazeMode) {
                const text = msgInput.value.trim();
                if (!text) return;

                // --- 【ここがポイント！】 ---
                // 移動に関係なさそうな普通の言葉（3文字以上とか、特定のキーワード以外）は
                // 通常の script.js 側の send() に任せるよぉ！
                const moveKeywords = ["前", "左", "右", "後ろ", "進む", "戻る", "go", "left", "right", "back", "forward"];
                const isMoveCommand = moveKeywords.some(key => text.toLowerCase().includes(key));

                if (isMoveCommand) {
                    // リス子ガイドの移動コマンドなら、こっちで座標付き送信！
                    e.stopImmediatePropagation(); 
                    e.preventDefault();
                    msgInput.value = "";
                    executeMazeSend(text, currentX, currentY, false);
                } else {
                    // 普通のおしゃべりなら、何もしない（script.js の send() が動くよぉ！）
                    console.log("通常のおしゃべりとして送信するよぉ！");
                }
            }
        }, true);
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
/**
 * リス子ガイド操作ボタンの描画
 * モード切り替え時や移動直後に呼ばれ、即座に方向キーを表示するよぉ！
 */
function renderMazeButtons(container, isEn) {
    if (!container) return;
    container.innerHTML = "";

    // 1. 移動ボタンの生成（既存のロジック）
    const moves = [
        { label: isEn ? "⬆️ Forward" : "⬆️ 前へ", dx: 0, dy: 1, text: isEn ? "Go forward" : "前に進むよぉ" },
        { label: isEn ? "⬇️ Back" : "⬇️ 後へ", dx: 0, dy: -1, text: isEn ? "Go back" : "後ろに下がるよぉ" },
        { label: isEn ? "⬅️ Left" : "⬅️ 左へ", dx: -1, dy: 0, text: isEn ? "Go left" : "左に進むよぉ" },
        { label: isEn ? "➡️ Right" : "➡️ 右へ", dx: 1, dy: 0, text: isEn ? "Go right" : "右に進むよぉ" }
    ];

    moves.forEach(m => {
        const btn = document.createElement('button');
        btn.className = 'quick-chip';
        btn.innerText = m.label;
        btn.onclick = (e) => {
            e.stopPropagation();
            const nextX = Math.max(-5, Math.min(5, currentX + m.dx));
            const nextY = Math.max(-5, Math.min(5, currentY + m.dy));

            if (nextX === currentX && nextY === currentY) {
                mazeAppendMessage('risuko', isEn ? "Can't go further! There's a wall🐿️" : "これ以上は進めないよぉ！壁があるみたい🐿️💦");
                return;
            }

            currentX = nextX; 
            currentY = nextY;
            executeMazeSend(m.text, currentX, currentY, isEn);
        };
        container.appendChild(btn);
    });

    // --- 【追加】2. マップ表示ボタン ---
    const mapBtn = document.createElement('button');
    mapBtn.className = 'quick-chip';
    // 地図っぽく色を変えたい場合は style を追加（任意だおぉ！）
    mapBtn.style.background = "#81c784"; 
    mapBtn.style.color = "#fff";
    mapBtn.innerText = isEn ? "🗺️ View Map" : "🗺️ マップ確認";
    
    mapBtn.onclick = (e) => {
        e.stopPropagation();
        // 現在の座標を維持したまま、「地図を見せて」というメッセージを送る
        const mapRequest = isEn ? "Show me the map!" : "地図を見せてぇ！";
        executeMazeSend(mapRequest, currentX, currentY, isEn);
    };
    container.appendChild(mapBtn);
    
}

/**
 * maze.js の executeMazeSend 関数内の try ブロックを以下に差し替え
 */
/**
 * リス子ガイド通信の実行：リスト切り替え時や移動時に呼ばれる
 */
async function executeMazeSend(text, x, y, isEn) {
    // 実行された時点でリス子ガイドモードを確定させる
    isMazeMode = true; 
    currentX = x;
    currentY = y;

    mazeAppendMessage('user', text);
    const chat = document.getElementById('chat');
    const container = document.getElementById('chat-container');
    const debugLog = document.getElementById('debug-log');
    
    const loadDiv = document.createElement('div');
    loadDiv.className = 'bubble ai loading';
    loadDiv.innerText = isEn ? "Thinking..." : "考え中...";
    chat.appendChild(loadDiv);

    try {
        const response = await fetch(MAZE_GAS_URL, {
            method: "POST",
            // 常に最新の座標を飛ばす
            body: JSON.stringify({ message: text, x: currentX, y: currentY, lang: isEn ? "en" : "ja" })
        });
        const data = await response.json();
        
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
        mazeAppendMessage('risuko', "エラーだよぉ。URLかGASの設定を確認してほしいよぉ。");
    } finally {
        const qContainer = document.getElementById('quick-btn-container');
        // 通信が終わったら、その言語とモードに合わせたボタン（方向キー）を出す
        renderMazeButtons(qContainer, isEn);
    }
}