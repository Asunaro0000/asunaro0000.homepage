/**
 * 設定エリア
 */
const GAS_URL = "https://script.google.com/macros/s/AKfycbyw8KuPAQifE85osH6RKUBlqEWdlbNTADrnTGLNCTDu9YWvn-Bo0H3u4Kh6vkpXqF9VsQ/exec";

// ★ここを false にすると画面下のデバッグログが完全に消えます
const IS_DEBUG = true; 

/**
 * 初期化処理
 */
window.addEventListener('DOMContentLoaded', () => {
    const debugElement = document.getElementById('debug-log');
    if (debugElement) {
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
    
    // 送信直後にスクロール
    container.scrollTop = container.scrollHeight;

    // 2. ローディング表示
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'bubble ai loading';
    loadingDiv.innerText = "……考え中だよ🌸";
    chat.appendChild(loadingDiv);
    container.scrollTop = container.scrollHeight;

    try {
        const res = await fetch(GAS_URL, {
            method: "POST",
            body: JSON.stringify({ message: text })
        });

        const data = await res.json();

        // デバッグログの更新
        if (IS_DEBUG && debugLog) {
            debugLog.innerText = "【RAWデータ】: " + JSON.stringify(data);
        }

        // ローディングを消す
        loadingDiv.remove();

        // --- 連投対応のループ処理 ---
        const responseItems = Array.isArray(data) ? data : [data];

        for (let i = 0; i < responseItems.length; i++) {
            const item = responseItems[i];

            // 2件目以降の送信（占い結果など）であれば、3秒待機する
            if (i > 0) {
                await new Promise(resolve => setTimeout(resolve, 3000));
            }

            const aiDiv = document.createElement('div');
            aiDiv.className = 'bubble ai';
            aiDiv.innerHTML = item.msg || "（考え込んじゃったみたい…）";

            // 画像があれば追加
            if (item.imgUrl && item.imgUrl !== "画像なし" && item.imgUrl !== "") {
                const img = document.createElement('img');
                img.src = item.imgUrl;
                img.style.display = "block";
                img.style.marginTop = "10px";
                img.style.maxWidth = "100%";
                img.alt = "ウサ子の写真";
                
                // 【重要】画像が読み込み完了した瞬間にスクロールを再実行
                img.onload = () => {
                    container.scrollTop = container.scrollHeight;
                };

                img.onclick = () => {
                    const lb = document.getElementById('lightbox');
                    const lbImg = document.getElementById('lightbox-img');
                    lbImg.src = img.src;
                    lb.style.display = 'flex';
                };
                aiDiv.appendChild(img);
            }
            
            chat.appendChild(aiDiv);
            
            // 新しい吹き出しが追加された直後にスクロール
            container.scrollTop = container.scrollHeight;
        }

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
    
    // 最終的なスクロール位置の調整
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