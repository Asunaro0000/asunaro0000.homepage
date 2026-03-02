/**
 * リス子ガイドゲーム専用ロジック (maze.js)
 */
const MAZE_GAS_URL = "https://script.google.com/macros/s/AKfycby3jiPmncy9eVTa10tbFWaPhv9G9skmZapwPmQ-pQ_1YA9VIdaHv5nMLpy9I5y83vwh/exec";
let isMazeMode = false;
let currentX = 0;
let currentY = 0;

// --- ユーザーID（セーブデータ鍵）の確定ロジック ---
function getPersistentUserId() {
  // 1. まずブラウザの記憶(localStorage)を確認
  let id = localStorage.getItem('maze_user_id');

  // 2. なければランダムに新規発行
  if (!id) {
    id = "u_" + Math.random().toString(36).substring(2, 10);
    // 3. ブラウザに保存して固定！
    localStorage.setItem('maze_user_id', id);
  }
  
  // URL書き換え(#)を廃止してスッキリさせたおぉ！
  return id;
}

const MY_USER_ID = getPersistentUserId();

/**
 * 1. 【リスト選択時】目的地を選んだ瞬間に判定させるお！
 */
async function updateMazeLocationList() {
    const mazeList = document.getElementById('maze-location-list');
    if (!mazeList) return;

    const isEn = (typeof currentLang !== 'undefined' && currentLang === 'en');
    mazeList.innerHTML = `<option value="">${isEn ? "🗺️ Loading coordinates..." : "🗺️ 座標を読み込み中..."}</option>`;

    try {
        const response = await fetch(MAZE_GAS_URL, {
            method: "POST",
            body: JSON.stringify({ type: "getMapList" }) 
        });
        const locations = await response.json();

        mazeList.innerHTML = `<option value="">${isEn ? "📍 Choose destination" : "📍 目的地を選ぶおぉ"}</option>`;
        
        locations.forEach(loc => {
            const option = document.createElement('option');
            option.value = `${loc.x},${loc.y}`;
            option.innerText = `${loc.display || ""} ${loc.name}`;
            mazeList.appendChild(option);
        });

        // --- ここでリスト変更時の処理を確定させるお！ ---
        mazeList.onchange = (e) => {
            if (!e.target.value) return;
            const [nx, ny] = e.target.value.split(',').map(Number);
            
            // 座標を更新
            currentX = nx;
            currentY = ny;
            
            const isEnNow = (typeof currentLang !== 'undefined' && currentLang === 'en');
            const moveMsg = isEnNow ? "I want to go here!" : "ここに行きたいおぉ！";
            
            // 1. 移動指示を送信
            executeMazeSend(moveMsg, currentX, currentY, isEnNow);

            // リスト変更時、即座にボタンを用意して座標チェック！
            addEpisodeStartButton();
            checkEpisodeAtPosition(currentX, currentY);
        };

    } catch (e) {
        console.error("座標リストの取得失敗:", e);
        mazeList.innerHTML = `<option value="">${isEn ? "❌ Loading failed" : "❌ 読み込み失敗"}</option>`;
    }
}

// --- GASへ送る関数（アルバム形式のJSON送信） ---
async function sendProgressToGAS(x, y, userText) {
  const payload = {
    userId: MY_USER_ID, // 固定されたID
    x: x,
    y: y,
    message: userText,
    lang: "ja" // 必要に応じて
  };

    const response = await fetch(MAZE_GAS_URL, {
        method: "POST",
        body: JSON.stringify({ 
            userId: MY_USER_ID, // ← これを追加！これで固定されるおぉ！
            message: text, 
            x: currentX, 
            y: currentY, 
            lang: isEn ? "en" : "ja" 
        })
    });
}


/**
 * 統一版：メッセージと画像をbubble（吹き出し）に追加する
 * スズ子(user)は右、リス子(ai/risuko)は左に出るお！
 */
function mazeAppendMessage(role, text, imgUrl = null) {
    const chat = document.getElementById('chat');
    const container = document.getElementById('chat-container');
    if (!chat) return;

    const div = document.createElement('div');
    // roleが 'user' なら右側の吹き出し、それ以外（risuko/ai）なら左側の吹き出しにするお
    div.className = (role === 'user') ? 'bubble user' : 'bubble ai';
    
    // 改行を<br>に変換して、読みやすくするお
    let content = text ? text.replace(/\n/g, '<br>') : "...";
    
    // GoogleドライブのURLをサムネイル表示用に変換
    const finalImgUrl = convertDriveUrlForImg(imgUrl);
    
    // 画像がある場合のみ、imgタグを追加するお！
    if (finalImgUrl && finalImgUrl !== "画像なし" && finalImgUrl !== "") {
        content += `<br><img src="${finalImgUrl}" 
            style="max-width:100%; border-radius:8px; margin-top:8px; cursor:zoom-in; min-height:50px; background:#f0f0f0;" 
            onload="const c=document.getElementById('chat-container'); if(c) c.scrollTop=c.scrollHeight;"
            onerror="this.onerror=null; console.error('画像読み込み失敗:', this.src); this.style.display='none';"
            onclick="if(typeof openLightbox==='function') openLightbox('${finalImgUrl}'); else window.open('${finalImgUrl}', '_blank');">`;
    }
    
    div.innerHTML = content;
    chat.appendChild(div);

    // 新しいメッセージが出たら、一番下までスルスルっとスクロールさせるお
    if (container) {
        container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth'
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
        { label: isEn ? "⬆️" : "⬆️", dx: 0, dy: 1, text: isEn ? "Go forward" : "前に進むよぉ" },
        { label: isEn ? "⬇️" : "⬇️", dx: 0, dy: -1, text: isEn ? "Go back" : "後ろに下がるよぉ" },
        { label: isEn ? "⬅️" : "⬅️", dx: -1, dy: 0, text: isEn ? "Go left" : "左に進むよぉ" },
        { label: isEn ? "➡️" : "➡️", dx: 1, dy: 0, text: isEn ? "Go right" : "右に進むよぉ" }
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
            // 移動ボタン（前後左右）で座標が更新された後に executeMazeSend 内で判定が走るお！
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
    mapBtn.innerText = isEn ? "🗺️ View Map" : "🗺️ マップ";
    
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
            // ★ここが大事！JSON.stringify の中身を全部これに入れ替えてねぇ！
            body: JSON.stringify({ 
                userId: MY_USER_ID, // ← これがないとGAS側で誰かわからないおぉ！
                message: text, 
                x: currentX, 
                y: currentY, 
                lang: isEn ? "en" : "ja" 
            })
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
        const errorMsg = isEn ? "Error! Please check GAS settings." : "エラーだよぉ。URLかGASの設定を確認してほしいよぉ。";
        mazeAppendMessage('risuko', errorMsg);
    } finally {
        const qContainer = document.getElementById('quick-btn-container');
        // 通信が終わったら、その言語とモードに合わせたボタン（方向キー）を出す
        // 【追加】移動（前後左右ボタン）が完了し、座標が確定した瞬間に物語があるか判定するお！
        checkEpisodeAtPosition(currentX, currentY);
    }
}
/**
 * 2. 【モード切替時】mazeモードになった瞬間に判定させるお！
 */
function observeModeAndRenderButtons() {
    const modeSelect = document.getElementById('mode-select');
    if (!modeSelect) return;

    const handleModeChange = () => {
        // mazeモードが選ばれたか判定
        isMazeMode = (modeSelect.value === 'maze');
        
        const lang = typeof currentLang !== 'undefined' ? currentLang : 'ja';
        renderQuickButtons(lang);

if (isMazeMode) {
            console.log("森ナビモード開始！(0,0)からチェックするお！");
            // 1. 座標を(0,0)にリセット
            currentX = 0;
            currentY = 0;
            
            // 2. リスト更新
             updateMazeLocationList();
            
            // 3. 即座にボタン生成と座標判定を実行！
            addEpisodeStartButton();
            setTimeout(() => checkEpisodeAtPosition(currentX, currentY), 300);
         }
     };

    modeSelect.addEventListener('change', handleModeChange);
    // 初回実行
    handleModeChange();
}

// --- 3. 起動時の初期化を整理したおぉ！ ---

// 無駄な呼び出しを消して、必要なものだけ並べるお
document.addEventListener('DOMContentLoaded', () => {
    // ボタン生成ループ（DOMが書き換わっても大丈夫なように）
    setInterval(addEpisodeStartButton, 1000);

    // GASからのデータ復元
    loadStatusFromGAS();

    // モード切替の監視開始（この中でリスト更新も呼ばれるお）
    observeModeAndRenderButtons();
});




/**
 * GASから届いた本物のエピソード（scenes配列）を1つずつ順番に表示する
 */
async function playEpisodeScenes(scenes) {
    if (!scenes || !Array.isArray(scenes)) return;

    for (const scene of scenes) {
        // GASのJSON構造（scene.text / scene.image）をそのまま使うお！
        // もし画像URLが Drive のリンクなら convertToDirectLink 的な処理が必要だけど、
        // まずはそのまま mazeAppendMessage に投げるお。
        mazeAppendMessage('risuko', scene.text, scene.image || scene.bgImage);

        // 吹き出しがポコポコ出るように、2.5秒の間隔を空けるお。
        // これで「序・破・急」が順番に並ぶはずだおぉ！
        await new Promise(resolve => setTimeout(resolve, 2500));
    }
}

















/**
 * ==========================================
 * エピソード管理・メインクエスト方式（リピート対応版）
 * ==========================================
 */
let scenarioQueue = []; 
let isScenarioActive = false;
let completedEpisodes = new Set(); 

/**
 * GoogleドライブURLを画像表示用(thumbnail)に変換
 */
function convertDriveUrlForImg(url) {
    if (!url) return "";
    if (!url.includes("drive.google.com")) return url;
    const match = url.match(/\/d\/([^/]+)/) || url.match(/id=([^&]+)/);
    if (match && match[1]) {
        return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
    }
    return url; 
}

/**
 * GASのI列から進行状況を読み込む
 */
async function loadStatusFromGAS() {
    try {
        const response = await fetch(MAZE_GAS_URL, {
            method: "POST",
            body: JSON.stringify({
                type: "syncUserInfo",
                action: "load",
                userId: MY_USER_ID
            })
        });
        const data = await response.json();
        if (data[0] && data[0].userInfo) {
            // カンマ区切りの文字列をSetに変換するお！
            const rawData = data[0].userInfo; 
            // スプレッドシートの「E001-1,E002-1」形式を読み込むお！
            const list = (rawData && typeof rawData === 'string') ? rawData.split(',') : [];
            completedEpisodes = new Set(list.filter(id => id !== ""));
            console.log("進行状況を復元したお！:", Array.from(completedEpisodes));
        }
    } catch (e) {
        console.warn("GASからの復元に失敗したお。", e);
    }
}

/**
 * GASのI列に進行状況を保存する
 */
async function saveStatusToGAS() {
    try {
        await fetch(MAZE_GAS_URL, {
            method: "POST",
            body: JSON.stringify({
                type: "syncUserInfo",
                action: "save",
                userId: MY_USER_ID,
                // Setをカンマ区切りの文字列にして保存するお！
                userInfo: Array.from(completedEpisodes).join(',')
            })
        });
    } catch (e) {
        console.error("保存エラー:", e);
    }
}

/**
 * YAMLを参照してエピソード開始
 */
async function playEpisodeById(episodeId) {
    const LIST_PATH = "./assets/json/episode-list.yaml";
    const BASE_PATH = "./assets/json/";
    if (typeof jsyaml === 'undefined') return;
    
    try {
        const response = await fetch(LIST_PATH);
        const yamlText = await response.text();
        const listData = jsyaml.load(yamlText);
        const epInfo = listData.episodes.find(e => e.id === episodeId);
        if (!epInfo) return;

        const res = await fetch(BASE_PATH + epInfo.fileName);
        const data = await res.json();
        
        // 言語設定 (ja / en)
        const lang = (typeof currentLang !== 'undefined' && currentLang === 'en') ? 'en' : 'ja';

        const scenario = data.scenarios.find(s => s.id === episodeId) || data.scenarios[0];
        
        // タイトルがオブジェクトなら言語選択
        const episodeTitle = (typeof scenario.title === 'object') ? scenario.title[lang] : (scenario.title || epInfo.title);

        scenarioQueue = [];
        const stepsObj = scenario.steps;
        for (const key of ["序", "破", "急"]) {
            const step = stepsObj[key];
            if (!step) continue;
            const bg = convertDriveUrlForImg(step.bgImage);
            for (const talk of step.dialogue) {
                // 名前とセリフを言語に合わせて抽出
                const speaker = (typeof talk.ch === 'object') ? talk.ch[lang] : talk.ch;
                const message = (typeof talk.msg === 'object') ? talk.msg[lang] : talk.msg;

                scenarioQueue.push({
                    speaker: speaker,
                    message: message,
                    image: (speaker === "スズ子" || speaker === "Suzuko") ? null : bg,
                    id: episodeId,
                    title: episodeTitle
                });
            }
        }
        
        isScenarioActive = true;
        const inputArea = document.getElementById('input-area');
        if (inputArea) inputArea.style.opacity = "0.5";
        
        const btn = document.getElementById('episode-btn');
        if (btn) btn.style.display = "none"; // 再生中はボタンを隠す

        showClickGuide(true);
        nextStep();
    } catch (err) { console.error("エピソード開始エラー:", err); }
}

/**
 * 次のセリフを表示
 */
function nextStep() {
    if (!isScenarioActive || scenarioQueue.length === 0) return;

    const data = scenarioQueue.shift();
    const isEn = (typeof currentLang !== 'undefined' && currentLang === 'en');
    const role = (data.speaker === "スズ子" || data.speaker === "Suzuko") ? "user" : "risuko";
    mazeAppendMessage(role, `【${data.speaker}】\n${data.message}`, data.image);

    if (scenarioQueue.length === 0) {
        isScenarioActive = false;
        showClickGuide(false);
        
        const inputArea = document.getElementById('input-area');
        if (inputArea) inputArea.style.opacity = "1";

        // 初回のみ記録
        if (data.id && !completedEpisodes.has(data.id)) {
            completedEpisodes.add(data.id);
            saveStatusToGAS();
        }

        setTimeout(() => {
            const finishMsg = isEn ? `"${data.title}" is finished! 🐿️✨` : `「${data.title}」はおしまい！🐿️✨`;
            mazeAppendMessage('risuko', finishMsg, null);
            // 読了後、その場に留まるならボタンを再表示
            checkEpisodeAtPosition(currentX, currentY);
        }, 1000);
    }
}

/**
 * 座標チェック（JS内の currentX, currentY を利用）
 */
async function checkEpisodeAtPosition(x, y) {
    const LIST_PATH = "./assets/json/episode-list.yaml";
    if (isScenarioActive || typeof jsyaml === 'undefined') return;

    try {
        const response = await fetch(LIST_PATH);
        const yamlText = await response.text();
        const listData = jsyaml.load(yamlText);
        
        // YAMLの "(x,y)" 形式と JSの x, y を比較
        const currentCoord = `${x},${y}`;
        const epInfo = listData.episodes.find(e => {
            const pos = e["(x,y)"].replace(/\s+/g, "").replace(/[()]/g, ""); 
            return pos === currentCoord; // completedEpisodesのチェックを外したので何度でも出るお！
        });

        const btn = document.getElementById('episode-btn');
        if (btn) {
            if (epInfo) {
                const isEn = (typeof currentLang !== 'undefined' && currentLang === 'en');
                btn.style.display = "inline-block";
                btn.innerText = isEn ? "🎬 Read Story" : "🎬 物語を読む";
                btn.onclick = (e) => { 
                    e.stopPropagation(); 
                    playEpisodeById(epInfo.id); 
                };
            } else {
                btn.style.display = "none";
            }
        }
    } catch (err) { console.error("座標判定エラー:", err); }
}

/**
 * 送信処理（移動直後に判定を走らせる）
 */
if (typeof executeMazeSend === 'function') {
    const originalExecuteMazeSend = executeMazeSend;
    executeMazeSend = async function(text, x, y, isEn) {
        if (isScenarioActive) return; 
        
        await originalExecuteMazeSend(text, x, y, isEn);
        
        // 通信後の座標確定を待ってからチェック
        setTimeout(() => {
            checkEpisodeAtPosition(currentX, currentY); 
        }, 800); 
    };
}

/**
 * ボタン生成
 */
function addEpisodeStartButton() {
    const qContainer = document.getElementById('quick-btn-container');
    if (!qContainer || document.getElementById('episode-btn')) return;

    const btn = document.createElement('button');
    btn.id = 'episode-btn';
    btn.className = 'quick-chip';
    btn.style.cssText = "background: #ff7043 !important; color: #fff !important; font-weight: bold; border-radius: 20px; padding: 5px 15px; border: none; cursor: pointer; margin-left: 5px; display: none;";
    btn.innerText = "🎬 物語を読む";
    qContainer.appendChild(btn);
}

/**
 * クリックガイド
 */
function showClickGuide(show) {
    let guide = document.getElementById('click-guide');
    if (!guide) {
        const styleSheet = document.createElement("style");
        styleSheet.innerText = `@keyframes subtle-blink { 0%, 100% { opacity: 0.1; } 50% { opacity: 0.3; } }`;
        document.head.appendChild(styleSheet);
        guide = document.createElement('div');
        guide.id = 'click-guide';
        guide.innerText = "click here ↓";
        guide.style.cssText = `text-align: center; width: 100%; padding: 2px 0; color: #000; opacity: 0.15; font-size: 14px; letter-spacing: 2px; cursor: pointer; user-select: none; display: none; animation: subtle-blink 3s infinite; margin-bottom: 5px;`;
        const chatContainer = document.getElementById('chat-container');
        if (chatContainer) chatContainer.appendChild(guide);
        guide.onclick = (e) => { e.stopPropagation(); nextStep(); };
    }
    guide.style.display = show ? 'block' : 'none';
}

// 画面クリックで進行
document.addEventListener('click', (e) => {
    if (e.target.closest('button') || e.target.closest('.quick-chip') || e.target.closest('#input-area')) return;
    if (isScenarioActive) nextStep();
});

document.addEventListener('DOMContentLoaded', () => {
    // ボタン生成ループ
    setInterval(addEpisodeStartButton, 1000);

    // GASからのデータ復元
    loadStatusFromGAS();

    // モード切替の監視開始
    observeModeAndRenderButtons();
});
