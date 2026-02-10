const GAS_URL = "https://script.google.com/macros/s/AKfycbxVBfr7sfyYt9sxI8AaFVhk1jM_OWLIUNgFgHUU3dnkg45pu-sJFc_jZ22Fg0XpVLn31Q/exec";

// --- 言語リソース辞書 ---
const UI_TEXT = {
  ja: {
    title: "🐿️ リス子とスズ子の観察日記",
    desc: "森の二人の日常をのぞき見できます。1、2時間毎に会話してます。",
    labelLimit: "表示する履歴：",
    genBtn: "🐿️ お喋りさせる",
    talkBtn: "💬 二人と話す",
    loading: "森の様子を読み込み中...",
    generating: "二人がお喋りを考えてるよ...",
    done: "完了だよぉ！",
    noData: "まだ記録がないよ。"
  },
  en: {
    title: "🐿️ Risuko & Suzuko's Diary",
    desc: "A peek into their daily forest life. They chat every 1-2 hours.",
    labelLimit: "History Limit:",
    genBtn: "🐿️ Make them talk",
    talkBtn: "💬 Talk to them",
    loading: "Reading the forest...",
    generating: "They are thinking of what to say...",
    done: "All done!",
    noData: "No logs found yet."
  }
};

let currentLogs = []; // 取得したデータを保持

/**
 * 初期化処理
 * ページ読み込み時に言語判定を行い、セレクトボックスをセットする
 */
document.addEventListener('DOMContentLoaded', () => {
  const langSelect = document.getElementById('lang-select');
  
  // 1. URLパラメータを確認 (?lang=en など)
  const params = new URLSearchParams(window.location.search);
  let targetLang = params.get('lang');

  // 2. パラメータがない場合はブラウザの言語設定を確認
  if (!targetLang) {
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('en')) {
      targetLang = 'en';
    }
  }

  // 3. セレクトボックスの値を更新
  if (targetLang === 'en' && langSelect) {
    langSelect.value = 'en';
  }

  // 初回データ取得
  fetchLogs(false);
});

async function fetchLogs(isGen = false) {
  const langSelect = document.getElementById('lang-select');
  const lang = langSelect ? langSelect.value : 'ja';
  const display = document.getElementById('log-display');
  const btn = document.getElementById('gen-btn');
  const status = document.getElementById('status-msg');
  const limitSelect = document.getElementById('limit-select');
  const limit = limitSelect ? limitSelect.value : 10;

  if (btn) btn.disabled = true;
  if (status) status.innerText = isGen ? UI_TEXT[lang].generating : UI_TEXT[lang].loading;

  try {
    let url = `${GAS_URL}?limit=${limit}&offset=0&t=${new Date().getTime()}`;
    if (isGen) url += "&gen=true";

    const response = await fetch(url);
    const data = await response.json();
    
    currentLogs = data.history || [];
    renderLogs(); // 描画処理を実行

    if (status) status.innerText = UI_TEXT[lang].done;
  } catch (e) {
    if (status) status.innerText = "Error!";
    console.error(e);
  } finally {
    if (btn) btn.disabled = false;
  }
}

// 言語設定に応じてUIとログを描画する関数
function renderLogs() {
  const display = document.getElementById('log-display');
  const langSelect = document.getElementById('lang-select');
  const lang = langSelect ? langSelect.value : 'ja';
  if (!display) return;

  // UIテキストの更新 (IDが存在する場合のみ)
  const updateText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
  };

  updateText('diary-title', UI_TEXT[lang].title);
  updateText('diary-desc', UI_TEXT[lang].desc);
  updateText('label-limit', UI_TEXT[lang].labelLimit);
  updateText('gen-btn', UI_TEXT[lang].genBtn);
  updateText('talk-btn', UI_TEXT[lang].talkBtn);

  display.innerHTML = "";

  if (currentLogs.length === 0) {
    display.innerHTML = `<div class="timestamp">${UI_TEXT[lang].noData}</div>`;
    return;
  }

  currentLogs.forEach(item => {
    const dateObj = new Date(item.time);
    const timeDiv = document.createElement('div');
    timeDiv.className = 'timestamp';
    timeDiv.innerText = isNaN(dateObj.getTime()) ? "Log" : dateObj.toLocaleString(lang === 'ja' ? 'ja-JP' : 'en-US');
    display.appendChild(timeDiv);

    const rawDialogue = (lang === 'en' && item.dialogueEn) ? item.dialogueEn : item.dialogue;
    const segments = rawDialogue.split(/(リス子[：:]|スズ子[：:]|Risuko[：:]|Suzuko[：:])/);
    
    let activeSpeaker = "";
    segments.forEach(segment => {
      const text = segment.trim();
      if (!text) return;
      if (text.match(/リス子[：:]|Risuko[：:]/)) { activeSpeaker = "risuko"; }
      else if (text.match(/スズ子[：:]|Suzuko[：:]/)) { activeSpeaker = "suzuko"; }
      else if (activeSpeaker !== "") {
        const bubble = document.createElement('div');
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