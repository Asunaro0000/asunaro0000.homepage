const GAS_URL = "https://script.google.com/macros/s/AKfycbxVBfr7sfyYt9sxI8AaFVhk1jM_OWLIUNgFgHUU3dnkg45pu-sJFc_jZ22Fg0XpVLn31Q/exec";
let currentLogs = []; // 言語切り替え時に再利用するためにログを保持

async function fetchLogs(isGen = false) {
  const display = document.getElementById('log-display');
  const btn = document.getElementById('gen-btn');
  const status = document.getElementById('status-msg');
  const limit = document.getElementById('limit-select').value;

  if (btn) btn.disabled = true;
  if (status) status.innerText = isGen ? "二人がお喋りを考えてるよ..." : "森の様子を読み込み中...";

  try {
    let url = `${GAS_URL}?limit=${limit}&offset=0&t=${new Date().getTime()}`;
    if (isGen) url += "&gen=true";

    const response = await fetch(url);
    const data = await response.json();
    
    currentLogs = data.history || []; // 取得したデータを保持
    renderLogs(); // 描画関数を呼び出し

    if (status) status.innerText = "完了だよぉ！";
  } catch (e) {
    if (status) status.innerText = "エラーが発生しました";
    console.error(e);
  } finally {
    if (btn) btn.disabled = false;
  }
}

// 言語設定に応じて描画のみを行う関数
function renderLogs() {
  const display = document.getElementById('log-display');
  const lang = document.getElementById('lang-select').value;
  display.innerHTML = "";

  if (currentLogs.length === 0) {
    display.innerHTML = '<div class="timestamp">まだ記録がないよ。</div>';
    return;
  }

  // キャラ名の英語対応用マップ
  const nameMap = {
    ja: { r: "リス子", s: "スズ子" },
    en: { r: "Risuko", s: "Suzuko" }
  };

  currentLogs.forEach(item => {
    const dateObj = new Date(item.time);
    const timeDiv = document.createElement('div');
    timeDiv.className = 'timestamp';
    timeDiv.innerText = isNaN(dateObj.getTime()) ? "記録" : dateObj.toLocaleString(lang === 'ja' ? 'ja-JP' : 'en-US');
    display.appendChild(timeDiv);

    // 言語に応じて使用するテキストを分岐
    const rawDialogue = (lang === 'en' && item.dialogueEn) ? item.dialogueEn : item.dialogue;
    
    // 英語と日本語のパース用（コロンが全角半角どちらでも対応できるように）
    const segments = rawDialogue.split(/(リス子[：:]|スズ子[：:]|Risuko[：:]|Suzuko[：:])/);
    let activeSpeaker = "";
    
    segments.forEach(segment => {
      const text = segment.trim();
      if (!text) return;
      if (text.match(/リス子[：:]|Risuko[：:]/)) { activeSpeaker = "risuko"; }
      else if (text.match(/スズ子[：:]|Suzuko[：:]/)) { activeSpeaker = "suzuko"; }
      else if (activeSpeaker !== "") {
        const bubble = document.createElement('div');
        // CSS変数で名前を切り替えるためのクラスを追加
        bubble.className = `bubble ${activeSpeaker} lang-${lang}`;
        bubble.innerText = text;
        display.appendChild(bubble);
      }
    });

    if (item.imgUrl && item.imgUrl.startsWith('http')) {
      const img = document.createElement('img');
      img.src = item.imgUrl;
      img.className = 'scene-img';
      display.appendChild(img);
    }
  });
}

function updateLanguage() {
  renderLogs();
}

document.addEventListener('DOMContentLoaded', () => fetchLogs(false));