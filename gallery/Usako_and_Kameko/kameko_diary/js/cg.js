// Minimal card gallery with lightbox navigation (left/right click zones)
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
// 例：alt属性の組み立て


// 画像ごとに個別キャプションを設定
// ここにある全データに自動で「カメコ」のaltが付与されます
const items = [


  /* { 
    src: './images/185.webp', 
    title: '木漏れ日の筆', 
    tags: ['昼下がり', '書斎', '筆記具', '執筆・記録'],
    caption: '揺れる陽光を机に並べて。静かな書斎に、墨の香りが満ちていく。' 
  },
  { 
    src: './images/184.webp', 
    title: '黄昏の厨', 
    tags: ['夕暮れ', '台所', 'ランプ', '休息'],
    caption: '温かなランプの灯る場所。立ち上る湯気が、暮らしの温もりを伝える。' 
  },
  { 
    src: './images/183.webp', 
    title: '石造りの窓', 
    tags: ['朝の光', '窓辺', '木の札', '日常'],
    caption: '見上げた空は高く青い。木の札を手に、新しい季節の訪れを知る。' 
  },
  { 
    src: './images/182.webp', 
    title: '黒猫と書き置き', 
    tags: ['静謐', '書斎', '古書・記録', '執筆・記録'],
    caption: '文机の傍らで丸まる影。綴ったばかりの便りに、猫が鼻を寄せた。' 
  },
  { 
    src: './images/181.webp', 
    title: '薬師の調合', 
    tags: ['昼下がり', '調合室', '薬草瓶', '制作・調合'],
    caption: '棚に並ぶ彩り豊かな瓶。薬草の香りに満ちた、午後の調べものを。' 
  },
  { 
    src: './images/180.webp', 
    title: '竹林の茶の湯', 
    tags: ['昼下がり', '自然・庭', '茶具', '休息'],
    caption: '青竹の香が窓を抜ける。温かな茶の湯気に、心まで解けてゆく。' 
  },
  { 
    src: './images/179.webp', 
    title: '紅椿の書状', 
    tags: ['昼下がり', '書斎', '古書・記録', '思索・読書'],
    caption: '光が描く木の葉の影。掛け軸に記された言葉を、一文字ずつ紐解く。' 
  },
  { 
    src: './images/178.webp', 
    title: '灯火の回廊', 
    tags: ['夜の静寂', '回廊', '提灯', '日常'],
    caption: '吊るされた提灯が揺れる。古びた書物と薬瓶に囲まれた、秘密の通路。' 
  },
{ src: './images/177.webp', title: '白梟の休息', tags: ['昼下がり', '鏡の部屋', '梟', '休息'], caption: '鏡の並ぶ不思議な部屋。頭上の梟と共に、午後の静寂を分かち合う。' },
  { src: './images/176.webp', title: '田園の風音', tags: ['昼下がり', '縁側', 'スカーフ', '日常'], caption: '緑の海を眺める縁側。赤いスカーフを整え、遠い空へ想いを馳せる。' },
  { src: './images/175.webp', title: '木漏れ日の蓮', tags: ['朝の光', '室内', '蓮', '休息'], caption: '紅い垂れ幕に蓮が咲く。柔らかな光に包まれ、静かに春を待つ。' },
  { src: './images/174.webp', title: '竹の隠れ家', tags: ['昼下がり', '森', '道具', '休息'], caption: '木陰のベンチで一休み。手入れの道具を置き、深い森の息吹を聞く。' },
  { src: './images/173.webp', title: '朱色の身支度', tags: ['夜の静寂', '室内', '扇', '日常'], caption: '鏡の前で扇を手に。揺れる提灯の灯りが、室内を優しく照らす。' },
  { src: './images/172.webp', title: '書庫の庭仕事', tags: ['昼下がり', '書斎', '筆', '執筆・記録'], caption: '本棚の傍らで筆を執る。庭先に広がる黄金の景色が、目を潤す。' },
  { src: './images/171.webp', title: '竹林の五重塔', tags: ['昼下がり', '縁側', '竹林', '日常'], caption: '縁側から望む遠い塔。風に揺れる竹の葉が、涼やかな音を運ぶ。' },
  { src: './images/170.webp', title: '万緑の執筆', tags: ['昼下がり', '書斎', '草花', '執筆・記録'], caption: '窓一面の緑を背に。透き通る瓶の草花が、物語に色を添える。' },
  { src: './images/169.webp', title: '夕暮れの調合', tags: ['夕暮れ', '調合室', '図譜', '制作・調合'], caption: '椿の図譜に囲まれて。橙色の光の中で、筆を動かす静謐な刻。' },
  { src: './images/168.webp', title: '青い小鳥と朱壁', tags: ['昼下がり', '格子戸', '小鳥', '日常'], caption: '赤い格子戸に手を添える。頭上に留まった小鳥と、心を通わせる。' },
  { src: './images/167.webp', title: '翠の回廊', tags: ['昼下がり', '回廊', '竹垣', '日常'], caption: '竹垣の続く石畳の道。新緑の香りに包まれ、歩みを進めていく。' },
  { src: './images/166.webp', title: '木漏れ日の微睡', tags: ['昼下がり', '書斎', '文机', '休息'], caption: '机に頬を寄せて。窓から差し込む光が、穏やかな時間を刻む。' },
  { src: './images/165.webp', title: '紅桜の吐息', tags: ['春の陽光', '自然・庭', '桜', '日常'], caption: '降り注ぐ淡い春의 陽光。桜の枝の下で、静かに空を仰ぎ見る。' },
  { src: './images/164.webp', title: '青い花と春霞', tags: ['朝の光', '窓辺', '一輪挿し', '日常'], caption: '窓の外は淡い桃色。一輪の青い花が、春の訪れを静かに告げた。' },
  { src: './images/163.webp', title: '書庫のまどろみ', tags: ['昼下がり', '書斎', '猫', '思索・読書'], caption: '緑の背表紙を指でなぞる。足元では黒猫が、静かに夢を見ている。' },
  { src: './images/162.webp', title: '庭師のひととき', tags: ['昼下がり', '自然・庭', '園芸鋏', '日常'], caption: '白い花弁に刃を寄せる。深い森の息吹が、白い袖を通り過ぎた。' },
  { src: './images/161.webp', title: '琥珀色の収穫', tags: ['昼下がり', '調合室', '保存瓶', '制作・調合'], caption: '果実の蜜が瓶に溶ける。棚に並んだ秋の記憶を、一つずつ確かめる。' },
  { src: './images/160.webp', title: '格子窓の秘密', tags: ['昼下がり', '窓辺', '青い瓶', '日常'], caption: '瓶の青が影を染める。格子の向こうにある、見えぬ景色を想う。' },
  { src: './images/159.webp', title: '星霜の窓辺', tags: ['夜の静寂', '窓辺', '天文図', '日常'], caption: '月が天頂に掛かる頃。古い天文図の前で、祈りをささげる。' },
  { src: './images/158.webp', title: '硝子の回廊', tags: ['昼下がり', '回廊', '薬瓶', '日常'], caption: '涼やかな扇を手に。棚に並ぶ薬瓶が、午後の陽光を弾いている。' },
  { src: './images/157.webp', title: '封じられた伝言', tags: ['夜の静寂', '書斎', '手紙', '日常'], caption: '青い書棚に囲まれて。誰かに宛てた手紙が、夜の灯に揺れる。' },
  { src: './images/156.webp', title: '山嶺を望む書斎', tags: ['昼下がり', '書斎', '筆記具', '執筆・記録'], caption: '雪嶺を背に筆を置く。古い書物の隙間から、新しい風が抜けた。' },
  { src: './images/155.webp', title: '緑の香る朝', tags: ['朝の光', '寝所', '鏡', '日常'], caption: '竹林の光が部屋を満たす。鏡のような二人の、静かな目覚め。' },
  { src: './images/154.webp', title: '白梟と微笑み', tags: ['昼下がり', '書斎', '梟', '日常'], caption: '賢者の隣で浮かべる笑み。赤い布を広げ、新しい旅を始める。' },
  { src: './images/153.webp', title: '書庫の静寂', tags: ['昼下がり', '書斎', '櫛', '思索・読書'], caption: '本に囲まれた昼下がりの席。古い櫛に、過ぎ去った時を思う。' },
  { src: './images/152.webp', title: '翠葉の薫香', tags: ['昼下がり', '調合室', '薬草瓶', '日常'], caption: '一枚の葉に鼻を寄せる。瓶の中に詰まった、森の記憶を辿る。' },
  { src: './images/151.webp', title: '湯気の贈り物', tags: ['昼下がり', '縁側', 'せいろ', '日常'], caption: '竹林の風を感じながら。蒸したての温もりを、大切な人へ。' },
   */{ src: './images/150.webp', title: '机上の思索', tags: ['昼下がり', '書斎', '手紙', '執筆・記録'], caption: '手紙に綴る静かな想い。赤いマフラーが、冬の訪れを告げる。' },
  { src: './images/149.webp', title: '花の薬草棚', tags: ['朝の光', '調合室', '薬草瓶', '日常'], caption: '青い花々を閉じ込めた瓶。朝の光が、秘密の棚を照らしていく。' },
  { src: './images/148.webp', title: '星降る小瓶', tags: ['夜の静寂', '調合室', '小瓶', '制作・調合'], caption: '棚に並ぶ紫の輝き。調合の合間に、棚の奥の物語を探す。' },
  { src: './images/147.webp', title: '庭を望む背中', tags: ['昼下がり', '窓辺', '鍵', '日常'], caption: '窓の外に広がる翠の世界。鍵を手に、遠い異国を夢見る。' },
  { src: './images/146.webp', title: '木漏れ日の窓辺', tags: ['昼下がり', '窓辺', '車輪', '日常'], caption: '回る車輪と揺れる木々。静かな部屋に、柔らかな光が差し込む。' },
  { src: './images/145.webp', title: '緑の書斎にて', tags: ['昼下がり', '書斎', '茶杯', '休息'], caption: '陽光が踊る午後のひととき。お茶の香りと共に、筆を休める。' },
  { src: './images/144.webp', title: '庭先の贈り物', tags: ['朝の光', '石畳', '籠', '日常'], caption: '籠に詰めた春の息吹。赤いショールを揺らし、石畳を歩み出す。' },
  { src: './images/143.webp', title: '青の降る家', tags: ['昼下がり', '室内', '青い花', '日常'], caption: '天井から零れる蒼。柔らかな微笑みが、青い花々と溶け合う。' },
  { src: './images/142.webp', title: '紅の帳', tags: ['昼下がり', '室内', '杖', '休息'], caption: '大輪の華に守られて。杖を携え、静かに次の季節を待つ。' },
  { src: './images/141.webp', title: '影踏みの対話', tags: ['昼下がり', '室内', '黒猫', '日常'], caption: '黒い獣が足元に寄る。扇を手に、影の言葉に耳を傾けていた。' },
  { src: './images/140.webp', title: '黄金の鍵', tags: ['朝の光', '書斎', '白鳩', '日常'], caption: '胸に秘めた鍵が光る。白鳩が舞う部屋で、新たな物語を紐解く。' },
  { src: './images/139.webp', title: '竹林の書斎', tags: ['昼下がり', '書斎', '犬', '休息'], caption: '遠くの山を背に寛ぐ。忠実な犬と過ごす、午後の穏やかな時間。' },
  { src: './images/138.webp', title: '紫陽の袖', tags: ['昼下がり', '回廊', '紫陽花', '日常'], caption: '紫の花びらを纏う。風に舞う香りを追い、ふと足を止めた。' },
  { src: './images/137.webp', title: '瑠璃の花影', tags: ['昼下がり', '縁側', '茶杯', '休息'], caption: '青い花が格子に揺れる。温かな茶を啜り、庭の静寂を飲み干す。' },
  { src: './images/136.webp', title: '静謐な執務', tags: ['昼下がり', '書斎', '鍵', '執筆・記録'], caption: '鍵の置かれた古い机。積まれた書物と木漏れ日が、思考を深める。' },
  { src: './images/135.webp', title: '春陽の訪れ', tags: ['朝の光', '縁側', '鹿', '休息'], caption: '鹿の気配に目を細める。桜色の帳が、縁側に春を運んできた。' },
  { src: './images/134.webp', title: '花咲く薬室', tags: ['朝の光', '調合室', '青い花', '日常'], caption: '青い花びらが舞い散る中で、微笑みと共に春を迎え入れる。' },
  { src: './images/133.webp', title: '森の剪定', tags: ['昼下がり', '自然・庭', '剪定鋏', '日常'], caption: '鋭い刃先で枝を整える。薬草の香りが、指先に深く馴染んで。' },
  { src: './images/132.webp', title: '山稜を望む', tags: ['夕暮れ', '高台', '野花', '日常'], caption: '手折った花をそっと持ち、遠く霞む山々の物語に思いを馳せる。' },
  { src: './images/131.webp', title: '窓辺の読書', tags: ['昼下がり', '窓辺', '古書', '思索・読書'], caption: '揺れる影が頁をなぞる。静謐な午後の時間を、独り占めして。' },
  { src: './images/130.webp', title: '木漏れ日の回廊', tags: ['昼下がり', '回廊', '扇', '日常'], caption: '光の粒が肩に降り積もる。温かな風に誘われ、空を仰ぎ見た。' },
  { src: './images/129.webp', title: '翠の筆音', tags: ['昼下がり', '書斎', '筆記具', '執筆・記録'], caption: '墨の香が漂う書棚の前で、古き記録を静かに書き記していく。' },
  { src: './images/128.webp', title: '黒翼の来客', tags: ['夕暮れ', 'テラス', '黒鳥', '日常'], caption: '赤い布を手に空を仰ぐ。羽を休める黒鳥と、静かな言葉を交わす。' },
  { src: './images/127.webp', title: '新緑の地図', tags: ['昼下がり', '書斎', '拡大鏡', '思索・読書'], caption: '拡大鏡が映す未知の道。まだ見ぬ森の深淵へ、心を馳せる。' },
  { src: './images/126.webp', title: '陶花の陳列', tags: ['昼下がり', '棚前', '陶磁器', '日常'], caption: '指先でなぞる陶器の肌。棚に並ぶ春の彩りを、一つずつ数えて。' },
  { src: './images/125.webp', title: '緑光の薬湯', tags: ['昼下がり', '自然・庭', '茶器', '休息'], caption: '陽光が踊る森の庵で、果実の香る茶を静かに注ぎ入れる。' },
  { src: './images/124.webp', title: '箒と猫の重み', tags: ['朝の光', '回廊', '箒', '日常'], caption: '肩に乗る重みを愛おしみ、新しい季節を掃き出そう。' },
  { src: './images/123.webp', title: '秘密を秘めた瓶', tags: ['昼下がり', '調合室', '青い瓶', '制作・調合'], caption: '並ぶ青色の冷たさに触れ、次の調合を静かに思い描く。' },
  { src: './images/122.webp', title: '青の部屋の微睡み', tags: ['昼下がり', '室内', 'ウサギ', '休息'], caption: 'ウサギの柔らかな毛並みに触れ、お茶の香りに心を預ける。' },
  { src: './images/121.webp', title: '木霊する赤の傘', tags: ['昼下がり', '竹林', '和傘', '日常'], caption: '森の落とし物を掲げ、竹林に響く静寂に耳を澄ませる。' },
  { src: './images/120.webp', title: '香りが満ちる床', tags: ['昼下がり', '調合室', 'レモン', '制作・調合'], caption: 'レモンの酸味を混ぜ合わせ、薬草の香りを深く噛みしめる。' },
  { src: './images/119.webp', title: '翼が運ぶ便り', tags: ['昼下がり', '窓辺', '手紙', '日常'], caption: '手紙の重みを掌に感じ、窓辺に差し込む光を仰ぎ見た。' },
  { src: './images/118.webp', title: 'ガラスの緑を覗く', tags: ['昼下がり', '書斎', '拡大鏡', '日常'], caption: '拡大鏡越しに見える宇宙。小さな葉の脈動を指先で追う。' },
  { src: './images/117.webp', title: '光が綴る図譜', tags: ['昼下がり', '書斎', '図譜', '執筆・記録'], caption: '指先に陽だまりをのせて、花の記憶を静かに書き留める。' },
  { src: './images/116.webp', title: '散り敷く春の背', tags: ['朝の光', '自然・庭', '猫', '休息'], caption: '柔らかな絨毯に腰を下ろす。猫の温もりが足元に伝わる。' },
  { src: './images/115.webp', title: '森の呼吸を聴く', tags: ['朝の光', '自然・庭', '日常'], caption: 'ひんやりした風を頬に受け、緑の深まりを深く吸い込む。' },
  { src: './images/114.webp', title: '藤の降る書庫', tags: ['朝の光', '書庫', '薬液', '制作・調合'], caption: '紫の花房が天井を彩る。透き通る薬液に、春の記憶を閉じ込める。' },
  { src: './images/113.webp', title: '星霜の小部屋', tags: ['昼下がり', '窓辺', '星図', '日常'], caption: '星図の壁に背を預ける。開かれた扉から、庭の薫香が流れ込む。' },
  { src: './images/112.webp', title: '蒼い柱の傍ら', tags: ['昼下がり', '館', '日常'], caption: '影の網目が頬をなぞる。静かな館の呼吸を、背中で感じていた。' },
  { src: './images/111.webp', title: '筆に灯る紅', tags: ['昼下がり', '縁側', '筆記具', '執筆・記録'], caption: '筆先に想いを一滴。縁側の陽光が、白い紙を優しく包んでいた。' },
  { src: './images/110.webp', title: '扇と木漏れ日', tags: ['昼下がり', '窓辺', '扇', '休息'], caption: '風を仰ぎ、青い帳を揺らす。窓の外の緑が、瞳に鮮やかに映る。' },
  { src: './images/109.webp', title: '色彩の薬棚', tags: ['昼下がり', '調合室', '小瓶', '制作・調合'], caption: '小瓶の影が床に伸びる。午後の光の中で、調合の時を待っていた。' },
  { src: './images/108.webp', title: '牡丹灯籠の縁', tags: ['夜の静寂', '縁側', '提灯', '日常'], caption: '灯火が紅を引く。格子戸に触れる指先に、夜の涼しさが忍び寄る。' },
  { src: './images/107.webp', title: '陽光と青の幕', tags: ['朝の光', '室内', '暖簾', '日常'], caption: '木漏れ日が畳を刻む。揺れる暖簾の向こう、新しい季節が待っていた。' },
  { src: './images/106.webp', title: '花の灯る棚', tags: ['朝の光', '調合室', 'マフラー', '日常'], caption: '瓶に閉じ込めた春を眺める。マフラーを直し、冬の気配を感じていた。' },
  { src: './images/105.webp', title: '本と蔦の書庫', tags: ['昼下がり', '書斎', '古書', '日常'], caption: '緑の天蓋の下で背表紙をなぞる。古びた紙の香りが、時を止めていた。' },
  { src: './images/104.webp', title: '翠緑の調合', tags: ['昼下がり', '調合室', '茶具', '制作・調合'], caption: '茶を淹れる湯気が、緑の壁に溶ける。午後の静寂を飲み干していた。' },
  { src: './images/103.webp', title: '硝子瓶の回廊', tags: ['昼下がり', '回廊', '標本瓶', '日常'], caption: '標本が並ぶ棚を通り抜ける。瓶の中の彩りが、歩みを静かに見守る。' },
  { src: './images/102.webp', title: '紅葉の窓辺', tags: ['夕暮れ', '窓辺', '手紙', '執筆・記録'], caption: '緋色の葉が揺れる。文にしたためる想いが、陽光に透けていた。' },
  { src: './images/101.webp', title: '朝露の採集', tags: ['朝の光', '自然・庭', '小瓶', '日常'], caption: '輝く雫を小瓶に詰め、森の目覚めを共にする。' },
  { src: './images/100.webp', title: '碧の筆跡', tags: ['昼下がり', '書斎', '筆記具', '執筆・記録'], caption: '瑞々しい緑を墨に、心に咲く花を描き記す。' },
  { src: './images/99.webp', title: '宵待の彩り', tags: ['夕暮れ', '調合室', '薬瓶', '日常'], caption: '並ぶ薬瓶に灯が落ち、秘密の時間が始まる。' },
  { src: './images/98.webp', title: '調合の小部屋', tags: ['昼下がり', '調合室', '小瓶', '制作・調合'], caption: '色とりどりの瓶に囲まれ、新しい香を想う。' },
  { src: './images/97.webp', title: '書庫の探索者', tags: ['昼下がり', '書斎', '古書', '思索・読書'], caption: '背表紙をなぞり、物語の断片を拾い集める。' },
  { src: './images/96.webp', title: '虹色の硝子戸', tags: ['昼下がり', '窓辺', '色硝子', '日常'], caption: '色硝子を透かす光。瞳に万華鏡が映り込む。' },
  { src: './images/95.webp', title: '陽だまりの休息', tags: ['昼下がり', '室内', '日常'], caption: '膝を抱え微睡む。光の粒が肩を優しく撫でる。' },
  { src: './images/94.webp', title: '深緑の展望', tags: ['朝の光', '窓辺', '日常'], caption: '窓いっぱいの緑を背に、静かな朝を見つめる。' },
  { src: './images/93.webp', title: '書架の森', tags: ['昼下がり', '書斎', '日常'], caption: '本に囲まれた床に座り、静かな時に身を浸す。' },
  { src: './images/92.webp', title: '赤い手紙', tags: ['朝の光', '室内', '手紙', '日常'], caption: '白い花に見守られ、届いた便りに心を躍らせる。' },
  { src: './images/91.webp', title: '瓶の中の庭', tags: ['夜の静寂', '室内', 'テラリウム', '日常'], caption: '小さな森を瓶に詰め、揺れる火影に瞳を潤す。' },
  { src: './images/90.webp', title: '仰ぐ光', tags: ['朝の光', '室内', '日常'], caption: '高い窓から差す陽光に、心の澱を預けていた。' },
  { src: './images/89.webp', title: '硝子の温室', tags: ['昼下がり', '室内', '瓶入りの花', '日常'], caption: '瓶の中に咲く青い花へ、静かな祈りを捧げる。' },
  { src: './images/88.webp', title: '水鉢の呼吸', tags: ['朝の光', '窓辺', '水鉢', '日常'], caption: '透明な鉢に触れ、揺れる緑を愛おしく見つめる。' },
  { src: './images/87.webp', title: '筆跡の記憶', tags: ['昼下がり', '書斎', '筆記具', '執筆・記録'], caption: '散る光の中で、大切な誰かへ言葉を紡いでゆく。' },
  { src: './images/86.webp', title: '物語の鍵', tags: ['朝の光', '室内', '鍵', '日常'], caption: '朱色の床に置かれた鍵が、次の扉の予感を運ぶ。' },
  { src: './images/85.webp', title: '緑光の窓辺', tags: ['昼下がり', '窓辺', '日常'], caption: '窓いっぱいの緑に包まれ、遠い空へ想いを馳せる。' },
  { src: './images/84.webp', title: '午後の読書', tags: ['昼下がり', '書斎', '古書', '思索・読書'], caption: '開いた頁に光が落ち、静かな思考が満ちていく。' },
  { src: './images/83.webp', title: '花影の回廊', tags: ['昼下がり', '回廊', '日常'], caption: '壁の花模様に、木漏れ日の影が静かに重なる。' },
  { src: './images/82.webp', title: '白菊と櫛の音', tags: ['朝の光', '書斎', '櫛', '日常'], caption: '光射す書架の前で、日々の輪郭を整えていく。' },
  { src: './images/81.webp', title: '緑光に浸る午後', tags: ['昼下がり', '調合室', '瓶の灯り', '日常'], caption: '瓶の灯りを見つめ、深緑の海に想いを馳せる。' },
  { src: './images/80.webp', title: '竹林の筆跡', tags: ['昼下がり', '書斎', '筆記具', '執筆・記録'], caption: '静寂のなか、緋色の鏡を傍らに墨を躍らせる。' },
  { src: './images/79.webp', title: '青き棚の追憶', tags: ['朝の光', '室内', '茶杯', '休息'], caption: '茶杯を手に、格子戸から溢れる光を惜しむ。' },
  { src: './images/78.webp', title: '彩花灯る室内', tags: ['夜の静寂', '室内', '赤き灯', '日常'], caption: '赤き灯に手を添え、草木の息吹を愛でる。' },
  { src: './images/77.webp', title: '月光と茶の香り', tags: ['夜の静寂', '丸窓', '茶杯', '休息'], caption: '丸窓の夜を眺め、温かな湯気に心を預ける。' },
  { src: './images/76.webp', title: '星図と瞬く窓', tags: ['夜の静寂', '窓辺', '星図', '思索・読書'], caption: '木漏れ日の格子を抜け、心はすでに銀河の彼方へ。' },
  { src: './images/75.webp', title: '光射す回廊の扉', tags: ['昼下がり', '回廊', '杖', '日常'], caption: '杖が光を捉え、閉ざされた時を静かに開く。' },
  { src: './images/74.webp', title: '緋色の道標', tags: ['朝の光', '室内', '日常'], caption: '紅い布を整え、来るべき季節を迎え入れる。' },
  { src: './images/73.webp', title: '紺碧と紅の書斎', tags: ['昼下がり', '書斎', '箒', '日常'], caption: '箒を手に、色鮮やかな静寂の中を歩む。' },
  { src: './images/72.webp', title: '叡智の書架を仰ぐ', tags: ['朝の光', '書庫', '日常'], caption: '陽光に躍る埃さえ、古き記録の一部のように。' },
  { src: './images/71.webp', title: '木漏れ日の守り人', tags: ['昼下がり', '自然・庭', '日常'], caption: '新緑の灯火を背に、静かな決意が瞳に宿る。' },
  { src: './images/70.webp', title: '灯火と広がる記', tags: ['夕暮れ', '書斎', 'ランタン', '執筆・記録'], caption: 'ランタンが紙を橙に染める。微笑む瞳に、明日の予感が小さく灯っていた。' },
  { src: './images/69.webp', title: '高い天井の回廊', tags: ['昼下がり', '回廊', '日常'], caption: '梁の間に午後の青い光が溜まる。静かな館の呼吸を、全身で受け止めていた。' },
  { src: './images/68.webp', title: '昼下がりの茶卓', tags: ['昼下がり', '窓辺', '茶杯', '休息'], caption: '白い花と茶杯の湯気を見つめる。窓辺の蔦が、頁に淡い影を書き記していた。' },
  { src: './images/67.webp', title: '陽光の調合室', tags: ['朝の光', '調合室', '小瓶', '制作・調合'], caption: '風が小瓶を揺らす。光の粒が舞う部屋で、新しい香りの着想を手繰り寄せていた。' },
  { src: './images/66.webp', title: '窓辺の休息', tags: ['昼下がり', '窓辺', '水鉢', '休息'], caption: 'マフラーの温もりに包まれ視線を落とす。水鉢の檸檬が、陽光の中で呼吸していた。' },
  { src: './images/65.webp', title: '青磁の棚の前にて', tags: ['朝の光', '調合室', '青磁の器', '日常'], caption: '青い器が朝を涼やかに彩る。瓶の輪郭をなぞるたび、心の波が静まっていく。' },
  { src: './images/64.webp', title: '扇を置く縁側', tags: ['昼下がり', '縁側', '扇', '休息'], caption: '赤い扇に窓越しの光が散る。日記を前に、しばしの休息が静かに流れていた。' },
  { src: './images/63.webp', title: '始まりの風', tags: ['朝の光', '室内', '日常'], caption: '光満ちる庭へ視線を送る。足元の赤い絨毯が、確かな歩みを静かに支えていた。' },
  { src: './images/62.webp', title: '影伸びる回廊', tags: ['夕暮れ', '回廊', '箒', '日常'], caption: '長い廊下に影が伸びる。箒を手に踏み出すと、古本たちが静かに目覚めていた。' },
  { src: './images/61.webp', title: '錫杖と朝の光', tags: ['朝の光', '書斎', '錫杖', '日常'], caption: '杖を傍らに書面をなぞる。窓からの陽光が、旅の記憶を鮮やかに彩っていた。' },
  { src: './images/60.webp', title: '扉を開く時', tags: ['朝の光', '室内', '薬草', '日常'], caption: '外の光へと手を掛ける。薬草の香る空気が、新しい季節の訪れを告げていた。' },
  { src: './images/59.webp', title: '掃き清める朝', tags: ['朝の光', '書庫', '木の葉', '日常'], caption: '光舞う書庫を歩く。散った木の葉を拾い上げ、一日の輪郭をゆっくり整えていく。' },
  { src: './images/58.webp', title: '蒼い夜の予感', tags: ['夜の静寂', '書斎', '水鉢', '日常'], caption: '夜色の窓を背に頁を見つめる。水鉢の緑が、部屋に深い安らぎを満たしていた。' },
  { src: './images/57.webp', title: '燭台と古文書', tags: ['夜の静寂', '書斎', '燭台', '思索・読書'], caption: '古い書に手を添える。立ち昇る灯火が、物語の深淵をそっと照らしていた。' },
  { src: './images/56.webp', title: '陽だまりの筆', tags: ['朝の光', '書斎', '筆記具', '執筆・記録'], caption: '木漏れ日が紙面で踊る。並んだ緑の小瓶に、今日という日の記録を綴り始める。' },
  { src: './images/55.webp', title: '星を仰ぐ窓', tags: ['夜の静寂', '窓辺', '望遠鏡', '日常'], caption: '望遠鏡に夜の静寂が宿る。水鉢の星屑と蝋燭が、遠い空の呼気を運んでいた。' },
  { src: './images/54.webp', title: '蔵書の廊下', tags: ['朝の光', '回廊', '紙片', '日常'], caption: '紙片を陽に透かす。本棚の奥の木の香りが、古い記録の断片を包んでいた。' },
  { src: './images/53.webp', title: '扇と竹杖', tags: ['昼下がり', '室内', '扇', '日常'], caption: '緑の扇をそっと広げる。格子越しの陽射しが、凛とした佇まいに熱を残していた。' },
  { src: './images/52.webp', title: '庭先の水やり', tags: ['朝の光', '自然・庭', '如雨露', '日常'], caption: '花々に如雨露で水を注ぐ。足元の光の模様が、朝の作業を軽やかに彩っていた。' },
  { src: './images/51.webp', title: '記録の書斎', tags: ['昼下がり', '書斎', '地図', '執筆・記録'], caption: '木漏れ日の机で地図に筆を入れる。棚の古書たちが、積まれた知恵を見守っていた。' },
  { src: './images/50.webp', title: '白磁の並ぶ朝', tags: ['朝の光', '室内', '白磁の瓶', '執筆・記録'], caption: '青い光の部屋で文字を記す。窓辺の瓶たちが、朝の澄んだ空気を映していた。' },
  { src: './images/49.webp', title: '紅葉の便り', tags: ['夕暮れ', '自然・庭', '手紙', '日常'], caption: '紅葉の上で手紙に目を落とす。白い翼の訪問者が、秋の深まりを伝えてくれた。' },
  { src: './images/48.webp', title: '春の窓辺', tags: ['朝の光', '窓辺', '花器', '日常'], caption: '花を前に春の空を指さす。窓辺の柔らかな色が、新しい季節を祝っていた。' },
  { src: './images/47.webp', title: '藤色の山門', tags: ['朝の光', '高台', '山門', '日常'], caption: '紫の花揺れる門を抜け嶺を仰ぐ。冷涼な風が、旅の始まりを告げていた。' },
  { src: './images/46.webp', title: '古き柱の傍らで', tags: ['朝の光', '室内', '猫', '日常'], caption: '天窓の光を浴び猫と視線を交わす。時を刻んだ壁に、朝の静寂が満ちていた。' },
  { src: './images/45.webp', title: '縁側のまどろみ', tags: ['朝の光', '縁側', '猫', '休息'], caption: '日だまりの中で小さな命を抱く。降り注ぐ光の粒が、穏やかな眠りを包んでいた。' },
  { src: './images/44.webp', title: '茶杯の休息', tags: ['昼下がり', '書斎', '茶杯', '思索・読書'], caption: '茶杯の湯気を眺め頁をめくる。午後の光が、読書の時間をそっと支えていた。' },
  { src: './images/43.webp', title: '硝子の温室', tags: ['昼下がり', '温室', '硝子ケース', '日常'], caption: '硝子ケースへ指先を伸ばす。閉じ込められた緑が、光の中で静かに呼吸していた。' },
  { src: './images/42.webp', title: 'ひとときの安らぎ', tags: ['昼下がり', '窓辺', '日常'], caption: '机に手をつき窓の外を眺める。こぼれた笑みが、部屋を温かな温度で満たしていた。' },
  { src: './images/41.webp', title: '宵闇の廊下', tags: ['夜の静寂', '回廊', '灯籠', '日常'], caption: '灯籠の明かりで本棚の間を進む。赤いマフラーが、夜の静寂を和らげていた。' },
  { src: './images/40.webp', title: '芽吹きの観察記', tags: ['昼下がり', '書斎', '図譜', '日常'], caption: '図譜を開き葉の輪郭をなぞる。吹き込む風が、午後の静かな作業を彩っていた。' },
  { src: './images/39.webp', title: '夜の灯と計算', tags: ['夜の静寂', '書斎', 'ランプ', '執筆・記録'], caption: '本の間で数字を追い続ける。ランプの光が、集中する横顔を優しく包んでいた。' },
  { src: './images/38.webp', title: '円環の書斎', tags: ['昼下がり', '書斎', '算盤', '日常'], caption: '算盤の音が規則正しく響く。整然とした部屋の空気が、日々の記録を支えていた。' },
  { src: './images/37.webp', title: '書架の追憶', tags: ['朝の光', '書斎', '古書', '日常'], caption: '本棚の前で視線を止める。フード越しに、古い紙の香りが穏やかな時間を運んでいた。' },
  { src: './images/36.webp', title: '硝子に透ける緑', tags: ['夜の静寂', '書斎', '標本瓶', '日常'], caption: '標本瓶に灯が透ける。瓶の中に閉じ込めた森の記憶が、静かにまたたいていた。' },
  { src: './images/35.webp', title: '苗床の息吹', tags: ['朝の光', '調合室', '苗床', '日常'], caption: '若葉の様子を二人で見守る。木の部屋に満ちる土の香りが、命の気配を伝えていた。' },
  { src: './images/34.webp', title: '陽だまりの筆跡', tags: ['朝の光', '書斎', '筆記具', '執筆・記録'], caption: '筆を走らせる手元に朝の光が踊る。並んだ小瓶が、記録の時間を静かに彩っていた。' },
  { src: './images/33.webp', title: '封蝋を施す机', tags: ['昼下がり', '書斎', '封蝋', '執筆・記録'], caption: '手紙に指先を添える。赤く固まった封蝋が、言葉を閉じ込めた証として光っていた。' },
  { src: './images/32.webp', title: '蔦の絡まる窓辺から', tags: ['夜の静寂', '窓辺', '三日月', '日常'], caption: '窓枠に手をかけ高い月を仰ぐ。揺れる髪が、静まり返った夜に微かな音を響かせる。' },
  { src: './images/31.webp', title: '夜半の灯火', tags: ['夜の静寂', '軒先', 'ランタン', '日常'], caption: '軒先でランタンの火を整える。温かな光が、足元の夜の静寂を切り取っていた。' },
  { src: './images/30.webp', title: '壁の書付と蝋燭の火', tags: ['夜の静寂', '室内', '蝋燭', '日常'], caption: '古い記録を背に立ち尽くす。小さな灯火が、知識の陰影を壁に刻んでいた。' },
  { src: './images/29.webp', title: '陽光を背にした微笑', tags: ['昼下がり', '室内', '執筆・記録'], caption: '書面を確かめ静かに微笑む。格子越しの光が、彼女の纏う空気を包んでいた。' },
  { src: './images/28.webp', title: '蝶の標本と緑の影', tags: ['昼下がり', '書斎', '蝶の標本', '日常'], caption: '羽の色彩をじっと見つめる。木漏れ日を浴びた蝶たちが、羽ばたきそうな気配を湛える。' },
  { src: './images/27.webp', title: '提灯にともる月夜', tags: ['夜の静寂', '森', '提灯', '日常'], caption: '赤く灯る光の中で月を見上げる。ひんやりとした空気が、森の夜を深めていた。' },
  { src: './images/26.webp', title: '筆を休める昼下がり', tags: ['昼下がり', '窓辺', '筆記具', '日常'], caption: '窓の外へ視線を預ける。小瓶に反射する陽光が、創作の時間を静かに彩っていた。' },
  { src: './images/25.webp', title: '標本の棚と光の粒', tags: ['朝の光', '回廊', '標本瓶', '日常'], caption: '背伸びをして瓶に手を伸ばす。窓からの光が、中の緑を鮮やかに呼び覚ましていた。' },
  { src: './images/24.webp', title: '風と巡る地図', tags: ['朝の光', '高台', '地図', '日常'], caption: '未知の輪郭をなぞる。吹き抜ける風が、新たな旅の予感を運んでいた。' },
  { src: './images/23.webp', title: '木漏れ日の格子戸', tags: ['昼下がり', '格子戸', '日常'], caption: '格子を抜ける光が肩に模様を落とす。瑞々しい緑の気配が、外の空気に溶けていた。' },
  { src: './images/22.webp', title: '翠（みどり）の温室', tags: ['朝の光', '温室', '苗', '日常'], caption: '木漏れ日が苗を優しく包み、瓶に詰めた緑が朝の光に溶ける。静かな呼吸が満ちていた. ' },
  { src: './images/21.webp', title: '小瓶の調合台', tags: ['朝の光', '調合室', '薬草', '制作・調合'], caption: '小瓶を傾けて色を確かめる。薬草と器具の並びが、朝の作業の始まりを静かに知らせていた。' },
  { src: './images/20.webp', title: '森の図書廊下', tags: ['朝の光', '回廊', '紙片', '日常'], caption: '光の模様が床に伸びる廊下をゆっくり進む。棚の端に置かれた紙片が、静けさの中で白く際立っていた。' },
  { src: './images/19.webp', title: '朝の記録帳', tags: ['朝の光', '室内', '茶杯', '執筆・記録'], caption: '開いたノートに静かに書き込む。湯気の立つ茶杯が、始まりの時間をそっと支えてくれた。' },
  { src: './images/18.webp', title: 'ガラス棚の前で', tags: ['朝の光', '調合室', '小瓶', '日常'], caption: '瓶のラベルを確かめるたび、陽の反射が淡い色を生んでいく。室内に穏やかな温度が満ちていた。' },
  { src: './images/17.webp', title: '窓辺で森を見渡す', tags: ['朝の光', '窓辺', '手帳', '日常'], caption: '手帳を置き、緑へ視線を向ける。朝の風が葉をゆっくり揺らし、一日の気配を整えていた。' },
  { src: './images/16.webp', title: '本を抱える夕暮れ', tags: ['夕暮れ', '室内', '古書', '日常'], caption: '胸に抱えた本の重みがじんわり伝わる。夕の明かりが木の香りをそっと引き立てていた。' },
  { src: './images/15.webp', title: '光る瓶の棚', tags: ['朝の光', '調合室', '光る瓶', '日常'], caption: '棚の瓶に触れると、内部の色がきらりと返る。小さな輝きが部屋にやわらかな余韻を広げていた。' },
  { src: './images/14.webp', title: '葉影の机', tags: ['昼下がり', '書斎', '古書', '日常'], caption: '本を開いたまま視線を止める。窓辺の蔦が揺れ、午後の空気に淡い影を落としていた。' },
  { src: './images/13.webp', title: '地図の部屋', tags: ['夜の静寂', '書斎', '地図', '日常'], caption: '壁に掛けられた地図をなぞる。揺れる蝋燭の明かりが古い紙の表情をゆっくり変えていった。' },
  { src: './images/12.webp', title: 'ランプの光と紙の音', tags: ['夜の静寂', '書斎', 'ランプ', '執筆・記録'], caption: '指先で原稿をなぞると、紙が静かに鳴る。夜の明かりが手元に深みを与えていた。' },
  { src: './images/11.webp', title: '木漏れ日の机', tags: ['昼下がり', '書斎', '古書', '日常'], caption: '外から吹き込む風にページがかすかに揺れ、木々の影が紙面に軽い模様を描いていった。' },
  { src: './images/10.webp', title: '本棚の通路で', tags: ['昼下がり', '書庫', 'マフラー', '日常'], caption: '並ぶ背表紙の間を抜けながら振り返る。赤いマフラーが空気を切るように揺れていた。' },
  { src: './images/9.webp', title: '図書室の片隅で', tags: ['朝の光', '書斎', '古書', '日常'], caption: '本を開いて一歩止まる。障子越しの光が文字の輪郭をやわらかく浮かべていた。' },
  { src: './images/8.webp', title: '秋の調合机', tags: ['昼下がり', '調合室', '木の道具', '執筆・記録'], caption: '色づく外の景色を眺めながら記録を整える。木の道具たちが、秋の静かな気配を受け止めていた。' },
  { src: './images/7.webp', title: 'うたた寝の午後', tags: ['昼下がり', '室内', '茶杯', '休息'], caption: '本に顔を寄せたまま深い息が落ちる。温かさの残るカップが、ゆっくりと午後の時間を支えていた。' },
  { src: './images/6.webp', title: '二人の作業台', tags: ['昼下がり', '書斎', '筆記具', '日常'], caption: '筆を取る母の手元に寄り添うようにして見守る。柔らかな光がふたりの間に静かな温度を残していた。' },
  { src: './images/5.webp', title: '灯りと地図の部屋', tags: ['夜の静寂', '書斎', '地図', '日常'], caption: '地図を広げた机に灯がともる。紙面の起伏が浮かび上がり、静かに道筋を示していた。' },
  { src: './images/4.webp', title: '夜の瓶棚', tags: ['夜の静寂', '調合室', '瓶', '日常'], caption: 'ふたを閉じる指先に、外の夜色がそっと寄り添う。棚の瓶が、眠る種をほのかに映していた。' },
  { src: './images/3.webp', title: '書きかけの頁', tags: ['朝の光', '書斎', '筆記具', '執筆・記録'], caption: '綴りかけの文字の前で筆が止まる。開いたノートに、積まれた本の影が静かに伸びていた。' },
  { src: './images/2.webp', title: '月を見上げる窓辺', tags: ['夜の静寂', '窓辺', 'マフラー', '日常'], caption: 'マフラーに指先を添え、夜空へそっと視線を上げる。月の明かりが窓辺を満たし、静けさが深く息づいていた。' },
  { src: './images/1.webp', title: '葉を記す朝', tags: ['朝の光', '調合室', '札', '制作・調合'], caption: '札を確かめる指先に淡い色が落ちる。瓶を前にした朝の作業が、ひと区切りの気配を帯びていた。' },
];
const gallery = $("#cardGallery");

/**
 * 【修正ポイント】ギャラリー描画
 * 全ての画像に「カメコ」を冠したaltを自動で生成・付与します
 */
gallery.innerHTML = items.map((it, i) => {
  const tagStr = it.tags ? `（タグ: ${it.tags.join('、')}）` : ""; // タグを文字列化
  return `
  <figure class="card" data-i="${i}" tabindex="0" aria-label="${it.title}">
    <div class="card__imgwrap">
      <img src="${it.src}" alt="緑髪和服の少女 カメコのアート作品: ${it.title} - ${it.caption}${tagStr}" loading="lazy">
    </div>
    <figcaption class="card__meta">
      <h3 class="card__title">${it.title}</h3>
      <p class="card__caption">${it.caption}</p>
    </figcaption>
  </figure>
`}).join("");

const lb = $("#lightbox");
const lbImg = $("#lbImg");
const lbTitle = $("#lbTitle");
const lbCaption = $("#lbCaption");
const zonePrev = $(".lb__zone--prev");
const zoneNext = $(".lb__zone--next");
const btnClose = $(".lb__close");

let idx = -1;

// ライトボックス内のaltにも反映
function openLB(i){
  idx = (i + items.length) % items.length;
  const it = items[idx];
  const tagStr = it.tags ? `[${it.tags.join('][')}]` : "";
  
  lbImg.src = it.src;
  lbImg.alt = `緑髪和服の少女 カメコ: ${it.title} ${tagStr}`;
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
// 構造化データ（JSON-LD）への反映
const scriptLD = document.createElement('script');
scriptLD.type = 'application/ld+json';
scriptLD.innerHTML = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  "name": "Kameko’s Workshop",
  "hasPart": items.map(it => ({
    "@type": "ImageObject",
    "name": `カメコ: ${it.title}`,
    "description": `${it.caption}${it.tags ? ' 分類: ' + it.tags.join(', ') : ''}`,
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