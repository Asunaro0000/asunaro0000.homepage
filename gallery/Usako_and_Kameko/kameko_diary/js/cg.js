// Minimal card gallery with lightbox navigation (left/right click zones)
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

// 画像ごとに個別キャプションを設定
// ここにある全データに自動で「カメコ」のaltが付与されます
const items = [
  { src: './images/114.webp', title: '藤の降る書庫', 
    caption: '紫の花房が天井を彩る。透き通る薬液に、春の記憶を閉じ込める。' },

  { src: './images/113.webp', title: '星霜の小部屋', 
    caption: '星図の壁に背を預ける。開かれた扉から、庭の薫香が流れ込む。' },

  { src: './images/112.webp', title: '蒼い柱の傍ら', 
    caption: '影の網目が頬をなぞる。静かな館の呼吸を、背中で感じていた。' },

  { src: './images/111.webp', title: '筆に灯る紅', 
    caption: '筆先に想いを一滴。縁側の陽光が、白い紙を優しく包んでいた。' },

  { src: './images/110.webp', title: '扇と木漏れ日', 
    caption: '風を仰ぎ、青い帳を揺らす。窓の外の緑が、瞳に鮮やかに映る。' },

  { src: './images/109.webp', title: '色彩の薬棚', 
    caption: '小瓶の影が床に伸びる。午後の光の中で、調合の時を待っていた。' },

  { src: './images/108.webp', title: '牡丹灯籠の縁', 
    caption: '灯火が紅を引く。格子戸に触れる指先に、夜の涼しさが忍び寄る。' },

  { src: './images/107.webp', title: '陽光と青の幕', 
    caption: '木漏れ日が畳を刻む。揺れる暖簾の向こう、新しい季節が待っていた。' },

  { src: './images/106.webp', title: '花の灯る棚', 
    caption: '瓶に閉じ込めた春を眺める。マフラーを直し、冬の気配を感じていた。' },

  { src: './images/105.webp', title: '本と蔦の書庫', 
    caption: '緑の天蓋の下で背表紙をなぞる。古びた紙の香りが、時を止めていた。' },

  { src: './images/104.webp', title: '翠緑の調合', 
    caption: '茶を淹れる湯気が、緑の壁に溶ける。午後の静寂を飲み干していた。' },

  { src: './images/103.webp', title: '硝子瓶の回廊', 
    caption: '標本が並ぶ棚を通り抜ける。瓶の中の彩りが、歩みを静かに見守る。' },

  { src: './images/102.webp', title: '紅葉の窓辺', 
    caption: '緋色の葉が揺れる。文にしたためる想いが、陽光に透けていた。' },

  { src: './images/101.webp', title: '朝露の採集', caption: '輝く雫を小瓶に詰め、森の目覚めを共にする。' },
  { src: './images/100.webp', title: '碧の筆跡', caption: '瑞々しい緑を墨に、心に咲く花を描き記す。' },
  { src: './images/99.webp', title: '宵待の彩り', caption: '並ぶ薬瓶に灯が落ち、秘密の時間が始まる。' },
  { src: './images/98.webp', title: '調合の小部屋', caption: '色とりどりの瓶に囲まれ、新しい香を想う。' },
  { src: './images/97.webp', title: '書庫の探索者', caption: '背表紙をなぞり、物語の断片を拾い集める。' },
  { src: './images/96.webp', title: '虹色の硝子戸', caption: '色硝子を透かす光。瞳に万華鏡が映り込む。' },
  { src: './images/95.webp', title: '陽だまりの休息', caption: '膝を抱え微睡む。光の粒が肩を優しく撫でる。' },
  { src: './images/94.webp', title: '深緑の展望', caption: '窓いっぱいの緑を背に、静かな朝を見つめる。' },
  { src: './images/93.webp', title: '書架の森', caption: '本に囲まれた床に座り、静かな時に身を浸す。' },
  { src: './images/92.webp', title: '赤い手紙', caption: '白い花に見守られ、届いた便りに心を躍らせる。' },
  { src: './images/91.webp', title: '瓶の中の庭', caption: '小さな森を瓶に詰め、揺れる火影に瞳を潤す。' },
  { src: './images/90.webp', title: '仰ぐ光', caption: '高い窓から差す陽光に、心の澱を預けていた。' },
  { src: './images/89.webp', title: '硝子の温室', caption: '瓶の中に咲く青い花へ、静かな祈りを捧げる。' },
  { src: './images/88.webp', title: '水鉢の呼吸', caption: '透明な鉢に触れ、揺れる緑を愛おしく見つめる。' },
  { src: './images/87.webp', title: '筆跡の記憶', caption: '散る光の中で、大切な誰かへ言葉を紡いでゆく。' },
  { src: './images/86.webp', title: '物語の鍵', caption: '朱色の床に置かれた鍵が、次の扉の予感を運ぶ。' },
  { src: './images/85.webp', title: '緑光の窓辺', caption: '窓いっぱいの緑に包まれ、遠い空へ想いを馳せる。' },
  { src: './images/84.webp', title: '午後の読書', caption: '開いた頁に光が落ち、静かな思考が満ちていく。' },
  { src: './images/83.webp', title: '花影の回廊', caption: '壁の花模様に、木漏れ日の影が静かに重なる。' },
  { src: './images/82.webp', title: '白菊と櫛の音', caption: '光射す書架の前で、日々の輪郭を整えていく。' },
  { src: './images/81.webp', title: '緑光に浸る午後', caption: '瓶の灯りを見つめ、深緑の海に想いを馳せる。' },
  { src: './images/80.webp', title: '竹林の筆跡', caption: '静寂のなか、緋色の鏡を傍らに墨を躍らせる。' },
  { src: './images/79.webp', title: '青き棚の追憶', caption: '茶杯を手に、格子戸から溢れる光を惜しむ。' },
  { src: './images/78.webp', title: '彩花灯る室内', caption: '赤き灯に手を添え、草木の息吹を愛でる。' },
  { src: './images/77.webp', title: '月光と茶の香り', caption: '丸窓の夜を眺め、温かな湯気に心を預ける。' },
  { src: './images/76.webp', title: '星図と瞬く窓', caption: '木漏れ日の格子を抜け、心はすでに銀河の彼方へ。' },
  { src: './images/75.webp', title: '光射す回廊の扉', caption: '杖が光を捉え、閉ざされた時を静かに開く。' },
  { src: './images/74.webp', title: '緋色の道標', caption: '紅い布を整え、来るべき季節を迎え入れる。' },
  { src: './images/73.webp', title: '紺碧と紅の書斎', caption: '箒を手に、色鮮やかな静寂の中を歩む。' },
  { src: './images/72.webp', title: '叡智の書架を仰ぐ', caption: '陽光に躍る埃さえ、古き記録の一部のように。' },
  { src: './images/71.webp', title: '木漏れ日の守り人', caption: '新緑の灯火を背に、静かな決意が瞳に宿る。' },

  { src: './images/70.webp', title: '灯火と広がる記',
    caption: 'ランタンが紙を橙に染める。微笑む瞳に、明日の予感が小さく灯っていた。' },

  { src: './images/69.webp', title: '高い天井の回廊',
    caption: '梁の間に午後の青い光が溜まる。静かな館の呼吸を、全身で受け止めていた。' },

  { src: './images/68.webp', title: '昼下がりの茶卓',
    caption: '白い花と茶杯の湯気を見つめる。窓辺の蔦が、頁に淡い影を書き記していた。' },

  { src: './images/67.webp', title: '陽光の調合室',
    caption: '風が小瓶を揺らす。光の粒が舞う部屋で、新しい香りの着想を手繰り寄せていた。' },

  { src: './images/66.webp', title: '窓辺の休息',
    caption: 'マフラーの温もりに包まれ視線を落とす。水鉢の檸檬が、陽光の中で呼吸していた。' },

  { src: './images/65.webp', title: '青磁の棚の前にて',
    caption: '青い器が朝を涼やかに彩る。瓶の輪郭をなぞるたび、心の波が静まっていく。' },

  { src: './images/64.webp', title: '扇を置く縁側',
    caption: '赤い扇に窓越しの光が散る。日記を前に、しばしの休息が静かに流れていた。' },

  { src: './images/63.webp', title: '始まりの風',
    caption: '光満ちる庭へ視線を送る。足元の赤い絨毯が、確かな歩みを静かに支えていた。' },

  { src: './images/62.webp', title: '影伸びる回廊',
    caption: '長い廊下に影が伸びる。箒を手に踏み出すと、古本たちが静かに目覚めていた。' },

  { src: './images/61.webp', title: '錫杖と朝の光',
    caption: '杖を傍らに書面をなぞる。窓からの陽光が、旅の記憶を鮮やかに彩っていた。' },

  { src: './images/60.webp', title: '扉を開く時',
    caption: '外の光へと手を掛ける。薬草の香る空気が、新しい季節の訪れを告げていた。' },

  { src: './images/59.webp', title: '掃き清める朝',
    caption: '光舞う書庫を歩く。散った木の葉を拾い上げ、一日の輪郭をゆっくり整えていく。' },

  { src: './images/58.webp', title: '蒼い夜の予感',
    caption: '夜色の窓を背に頁を見つめる。水鉢の緑が、部屋に深い安らぎを満たしていた。' },

  { src: './images/57.webp', title: '燭台と古文書',
    caption: '古い書に手を添える。立ち昇る灯火が、物語の深淵をそっと照らしていた。' },

  { src: './images/56.webp', title: '陽だまりの筆',
    caption: '木漏れ日が紙面で踊る。並んだ緑の小瓶に、今日という日の記録を綴り始める。' },

  { src: './images/55.webp', title: '星を仰ぐ窓',
    caption: '望遠鏡に夜の静寂が宿る。水鉢の星屑と蝋燭が、遠い空の呼気を運んでいた。' },

  { src: './images/54.webp', title: '蔵書の廊下',
    caption: '紙片を陽に透かす。本棚の奥の木の香りが、古い記録の断片を包んでいた。' },

  { src: './images/53.webp', title: '扇と竹杖',
    caption: '緑の扇をそっと広げる。格子越しの陽射しが、凛とした佇まいに熱を残していた。' },

  { src: './images/52.webp', title: '庭先の水やり',
    caption: '花々に如雨露で水を注ぐ。足元の光の模様が、朝の作業を軽やかに彩っていた。' },

  { src: './images/51.webp', title: '記録の書斎',
    caption: '木漏れ日の机で地図に筆を入れる。棚の古書たちが、積まれた知恵を見守っていた。' },

  { src: './images/50.webp', title: '白磁の並ぶ朝',
    caption: '青い光の部屋で文字を記す。窓辺の瓶たちが、朝の澄んだ空気を映していた。' },

  { src: './images/49.webp', title: '紅葉の便り',
    caption: '紅葉の上で手紙に目を落とす。白い翼の訪問者が、秋の深まりを伝えてくれた。' },

  { src: './images/48.webp', title: '春の窓辺',
    caption: '花を前に春の空を指さす。窓辺の柔らかな色が、新しい季節を祝っていた。' },

  { src: './images/47.webp', title: '藤色の山門',
    caption: '紫の花揺れる門を抜け嶺を仰ぐ。冷涼な風が、旅の始まりを告げていた。' },

  { src: './images/46.webp', title: '古き柱の傍らで',
    caption: '天窓の光を浴び猫と視線を交わす。時を刻んだ壁に、朝の静寂が満ちていた。' },

  { src: './images/45.webp', title: '縁側のまどろみ',
    caption: '日だまりの中で小さな命を抱く。降り注ぐ光の粒が、穏やかな眠りを包んでいた。' },

  { src: './images/44.webp', title: '茶杯の休息',
    caption: '茶杯の湯気を眺め頁をめくる。午後の光が、読書の時間をそっと支えていた。' },

  { src: './images/43.webp', title: '硝子の温室',
    caption: '硝子ケースへ指先を伸ばす。閉じ込められた緑が、光の中で静かに呼吸していた。' },

  { src: './images/42.webp', title: 'ひとときの安らぎ',
    caption: '机に手をつき窓の外を眺める。こぼれた笑みが、部屋を温かな温度で満たしていた。' },

  { src: './images/41.webp', title: '宵闇の廊下',
    caption: '灯籠の明かりで本棚の間を進む。赤いマフラーが、夜の静寂を和らげていた。' },

  { src: './images/40.webp', title: '芽吹きの観察記',
    caption: '図譜を開き葉の輪郭をなぞる。吹き込む風が、午後の静かな作業を彩っていた。' },

  { src: './images/39.webp', title: '夜の灯と計算',
    caption: '本の間で数字を追い続ける。ランプの光が、集中する横顔を優しく包んでいた。' },

  { src: './images/38.webp', title: '円環の書斎',
    caption: '算盤の音が規則正しく響く。整然とした部屋の空気が、日々の記録を支えていた。' },

  { src: './images/37.webp', title: '書架の追憶',
    caption: '本棚の前で視線を止める。フード越しに、古い紙の香りが穏やかな時間を運んでいた。' },

  { src: './images/36.webp', title: '硝子に透ける緑',
    caption: '標本瓶に灯が透ける。瓶の中に閉じ込めた森の記憶が、静かにまたたいていた。' },

  { src: './images/35.webp', title: '苗床の息吹',
    caption: '若葉の様子を二人で見守る。木の部屋に満ちる土の香りが、命の気配を伝えていた。' },

  { src: './images/34.webp', title: '陽だまりの筆跡',
    caption: '筆を走らせる手元に朝の光が踊る。並んだ小瓶が、記録の時間を静かに彩っていた。' },

  { src: './images/33.webp', title: '封蝋を施す机',
    caption: '手紙に指先を添える。赤く固まった封蝋が、言葉を閉じ込めた証として光っていた。' },

  { src: './images/32.webp', title: '蔦の絡まる窓辺から',
    caption: '窓枠に手をかけ高い月を仰ぐ。揺れる髪が、静まり返った夜に微かな音を響かせる。' },

  { src: './images/31.webp', title: '夜半の灯火',
    caption: '軒先でランタンの火を整える。温かな光が、足元の夜の静寂を切り取っていた。' },

  { src: './images/30.webp', title: '壁の書付と蝋燭の火',
    caption: '古い記録を背に立ち尽くす。小さな灯火が、知識の陰影を壁に刻んでいた。' },

  { src: './images/29.webp', title: '陽光を背にした微笑',
    caption: '書面を確かめ静かに微笑む。格子越しの光が、彼女の纏う空気を包んでいた。' },

  { src: './images/28.webp', title: '蝶の標本と緑の影',
    caption: '羽の色彩をじっと見つめる。木漏れ日を浴びた蝶たちが、羽ばたきそうな気配を湛える。' },

  { src: './images/27.webp', title: '提灯にともる月夜',
    caption: '赤く灯る光の中で月を見上げる。ひんやりとした空気が、森の夜を深めていた。' },

  { src: './images/26.webp', title: '筆を休める昼下がり',
    caption: '窓の外へ視線を預ける。小瓶に反射する陽光が、創作の時間を静かに彩っていた。' },

  { src: './images/25.webp', title: '標本の棚と光の粒',
    caption: '背伸びをして瓶に手を伸ばす。窓からの光が、中の緑を鮮やかに呼び覚ましていた。' },

  { src: './images/24.webp', title: '風と巡る地図',
    caption: '未知の輪郭をなぞる。吹き抜ける風が、新たな旅の予感を運んでいた。' },

  { src: './images/23.webp', title: '木漏れ日の格子戸',
    caption: '格子を抜ける光が肩に模様を落とす。瑞々しい緑の気配が、外の空気に溶けていた。' },

  { src: './images/22.webp', title: '翠（みどり）の温室',
    caption: '木漏れ日が苗を優しく包み、瓶に詰めた緑が朝の光に溶ける。静かな呼吸が満ちていた。' },

  { src: './images/21.webp', title: '小瓶の調合台',
    caption: '小瓶を傾けて色を確かめる。薬草と器具の並びが、朝の作業の始まりを静かに知らせていた。' },

  { src: './images/20.webp', title: '森の図書廊下',
    caption: '光の模様が床に伸びる廊下をゆっくり進む。棚の端に置かれた紙片が、静けさの中で白く際立っていた。' },

  { src: './images/19.webp', title: '朝の記録帳',
    caption: '開いたノートに静かに書き込む。湯気の立つ茶杯が、始まりの時間をそっと支えてくれた。' },

  { src: './images/18.webp', title: 'ガラス棚の前で',
    caption: '瓶のラベルを確かめるたび、陽の反射が淡い色を生んでいく。室内に穏やかな温度が満ちていた。' },

  { src: './images/17.webp', title: '窓辺で森を見渡す',
    caption: '手帳を置き、緑へ視線を向ける。朝の風が葉をゆっくり揺らし、一日の気配を整えていた。' },

  { src: './images/16.webp', title: '本を抱える夕暮れ',
    caption: '胸に抱えた本の重みがじんわり伝わる。夕の明かりが木の香りをそっと引き立てていた。' },

  { src: './images/15.webp', title: '光る瓶の棚',
    caption: '棚の瓶に触れると、内部の色がきらりと返る。小さな輝きが部屋にやわらかな余韻を広げていた。' },

  { src: './images/14.webp', title: '葉影の机',
    caption: '本を開いたまま視線を止める。窓辺の蔦が揺れ、午後の空気に淡い影を落としていた。' },

  { src: './images/13.webp', title: '地図の部屋',
    caption: '壁に掛けられた地図をなぞる。揺れる蝋燭の明かりが古い紙の表情をゆっくり変えていった。' },

  { src: './images/12.webp', title: 'ランプの光と紙の音',
    caption: '指先で原稿をなぞると、紙が静かに鳴る。夜の明かりが手元に深みを与えていた。' },

  { src: './images/11.webp', title: '木漏れ日の机',
    caption: '外から吹き込む風にページがかすかに揺れ、木々の影が紙面に軽い模様を描いていった。' },

  { src: './images/10.webp', title: '本棚の通路で',
    caption: '並ぶ背表紙の間を抜けながら振り返る。赤いマフラーが空気を切るように揺れていた。' },

  { src: './images/9.webp', title: '図書室の片隅で',
    caption: '本を開いて一歩止まる。障子越しの光が文字の輪郭をやわらかく浮かべていた。' },

  { src: './images/8.webp', title: '秋の調合机',
    caption: '色づく外の景色を眺めながら記録を整える。木の道具たちが、秋の静かな気配を受け止めていた。' },

  { src: './images/7.webp', title: 'うたた寝の午後',
    caption: '本に顔を寄せたまま深い息が落ちる。温かさの残るカップが、ゆっくりと午後の時間を支えていた。' },

  { src: './images/6.webp', title: '二人の作業台',
    caption: '筆を取る母の手元に寄り添うようにして見守る。柔らかな光がふたりの間に静かな温度を残していた。' },

  { src: './images/5.webp', title: '灯りと地図の部屋',
    caption: '地図を広げた机に灯がともる。紙面の起伏が浮かび上がり、静かに道筋を示していた。' },

  { src: './images/4.webp', title: '夜の瓶棚',
    caption: 'ふたを閉じる指先に、外の夜色がそっと寄り添う。棚の瓶が、眠る種をほのかに映していた。' },

  { src: './images/3.webp', title: '書きかけの頁',
    caption: '綴りかけの文字の前で筆が止まる。開いたノートに、積まれた本の影が静かに伸びていた。' },

  { src: './images/2.webp', title: '月を見上げる窓辺',
    caption: 'マフラーに指先を添え、夜空へそっと視線を上げる。月の明かりが窓辺を満たし、静けさが深く息づいていた。' },

  { src: './images/1.webp', title: '葉を記す朝',
    caption: '札を確かめる指先に淡い色が落ちる。瓶を前にした朝の作業が、ひと区切りの気配を帯びていた。' },
];
const gallery = $("#cardGallery");

/**
 * 【修正ポイント】ギャラリー描画
 * 全ての画像に「カメコ」を冠したaltを自動で生成・付与します
 */
gallery.innerHTML = items.map((it, i)=>`
  <figure class="card" data-i="${i}" tabindex="0" aria-label="${it.title}">
    <div class="card__imgwrap">
      <img src="${it.src}" alt="緑髪和服の少女 カメコのアート作品: ${it.title} - ${it.caption}" loading="lazy">
    </div>
    <figcaption class="card__meta">
      <h3 class="card__title">${it.title}</h3>
      <p class="card__caption">${it.caption}</p>
    </figcaption>
  </figure>
`).join("");

const lb = $("#lightbox");
const lbImg = $("#lbImg");
const lbTitle = $("#lbTitle");
const lbCaption = $("#lbCaption");
const zonePrev = $(".lb__zone--prev");
const zoneNext = $(".lb__zone--next");
const btnClose = $(".lb__close");

let idx = -1;

function openLB(i){
  idx = (i + items.length) % items.length;
  const it = items[idx];
  lbImg.src = it.src;
  lbImg.alt = `緑髪和服の少女 カメコ: ${it.title}`; // ライトボックス内にもaltを付与
  lbTitle.textContent = it.title || "";
  lbCaption.textContent = it.caption || "";
  lb.hidden = false;
  document.body.style.overflow = "hidden";
  preloadAround(idx);
}

function closeLB(){
  lb.hidden = true;
  document.body.style.overflow = "";
  idx = -1;
}

function move(delta){
  if(idx < 0) return;
  openLB(idx + delta);
}

function preloadAround(i){
  [i-1, i+1].forEach(k=>{
    const j = (k + items.length) % items.length;
    const img = new Image();
    img.src = items[j].src;
  });
}

// Card click / Enter key
gallery.addEventListener("click", (e)=>{
  const card = e.target.closest(".card");
  if(!card) return;
  openLB(parseInt(card.dataset.i,10));
});
gallery.addEventListener("keydown", (e)=>{
  if(e.key === "Enter" || e.key === " "){
    const card = e.target.closest(".card");
    if(card){ e.preventDefault(); openLB(parseInt(card.dataset.i,10)); }
  }
});

// Lightbox controls
btnClose.addEventListener("click", closeLB);
zonePrev.addEventListener("click", ()=> move(-1));
zoneNext.addEventListener("click", ()=> move(1));

// Click on image: decide left/right half
lbImg.addEventListener("click", (e)=>{
  const rect = lbImg.getBoundingClientRect();
  const mid = rect.left + rect.width/2;
  if(e.clientX < mid) move(-1); else move(1);
});

// Keyboard navigation
document.addEventListener("keydown", (e)=>{
  if(lb.hidden) return;
  if(e.key === "Escape") closeLB();
  if(e.key === "ArrowLeft") move(-1);
  if(e.key === "ArrowRight") move(1);
});

// Swipe (basic)
let sx = null;
lb.addEventListener("pointerdown", (e)=>{
  if(e.pointerType === "mouse") return; // touch only
  sx = e.clientX;
  lb.setPointerCapture(e.pointerId);
});
lb.addEventListener("pointerup", (e)=>{
  if(sx == null) return;
  const dx = e.clientX - sx;
  if(Math.abs(dx) > 40) move(dx < 0 ? 1 : -1);
  sx = null;
});

/**
 * 【修正ポイント】Google検索エンジンに「カメコ」情報を一括認識させるための構造化データ
 */
const scriptLD = document.createElement('script');
scriptLD.type = 'application/ld+json';
scriptLD.innerHTML = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  "name": "Kameko’s Workshop — 森の静かな作業部屋",
  "description": "森の光が差し込む部屋で、静かに手を動かすカメコの日常アート。幻想的な背景と物語のコレクション。",
  "author": {
    "@type": "Person",
    "name": "Asunaro Works"
  },
  "hasPart": items.map(it => ({
    "@type": "ImageObject",
    "name": `緑髪和服の少女 カメコ: ${it.title}`, // 名前を「カメコ」で統一
    "description": it.caption,
    "contentUrl": window.location.origin + window.location.pathname.replace('index.html', '') + it.src.replace('./', '')
  }))
});
document.head.appendChild(scriptLD);

// noscript（クローラー向けテキスト）
const noscript = document.createElement('noscript');
noscript.innerHTML = `<div style="display:none;"><h2>カメコ 作品目録</h2><ul>` + 
    items.map(it => `<li>カメコのアート作品 - ${it.title}: ${it.caption}</li>`).join('') + 
    `</ul></div>`;
document.body.appendChild(noscript);