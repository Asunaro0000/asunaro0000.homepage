// Minimal card gallery with lightbox navigation
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

/**
 * 【ここを編集】グループごとの表示名を個別に設定します
 */
const groupNames = {
  "1": "日常",
  "2": "舞踊",
  "2ab": "演舞",
  "3": "風景",
  "4": "煌めく日",
};

/**
 * データの管理
 * ここにある全データに自動で「ウサ子」のaltが付与されます
 */
const items = [
  { src: './images/1-1.webp', title: '木漏れ日の中で', tags: ['日常', '森', '光'], caption: '差し込む光を手でさえぎり、木に寄りかかる。まぶしさに目を細めながら、静かに息を整えていた。' },
  { src: './images/1-2.webp', title: '空を見上げて', tags: ['日常', '草原', '風'], caption: '高く立ちのぼる雲を仰ぐと、風が草原を駆け抜ける。赤い紐がその流れに触れ、ひらりと揺れた。' },
  { src: './images/1-3.webp', title: '小鳥たちの巣', tags: ['日常', '動物', '小鳥', '温もり'], caption: 'かがんだ手元に小さな雛が寄り添う。午後の明るさがかごの中へ入り込み、静かな温もりが続いていた。' },
  { src: './images/1-4.webp', title: '森のフクロウ', tags: ['日常', '森', '動物', 'フクロウ'], caption: '差し出した手にフクロウがそっと身を乗せる。朝の光が羽を照らし、模様の輪郭がくっきりと浮かび上がった。' },
  { src: './images/1-5.webp', title: '野原のうさぎたち', tags: ['日常', '草原', '動物', 'うさぎ'], caption: '野原に腰を下ろすと、小さなうさぎたちが寄り添う。草の匂いが、胸の奥にそっと広がった。' },
  { src: './images/1-6.webp', title: '夕暮れの道', tags: ['日常', '道', '夕暮れ'], caption: '金色の道をゆっくり歩く。傾く光が背を押し、遠い空にあたたかな色が滲んでいた。' },
  { src: './images/1-7.webp', title: '草の上で', tags: ['日常', '草原', '休息'], caption: '草に身をあずけると、地面の温度が静かに伝わる。午後の穏やかさが、音もなく満ちていった。' },
  { src: './images/1-8.webp', title: '森の風を聴く', tags: ['日常', '森', '風', '静寂'], caption: '目を閉じると、枝が触れ合う気配がそっと寄ってくる。森全体が耳元でささやくようだった。' },
  { src: './images/1-9.webp', title: '子猫を抱いて', tags: ['日常', '部屋', '動物', '猫'], caption: '朝の光が差す部屋で、子猫をそっと胸もとに寄せる。かすかな体温が、静かな時間をあたためていた。' },
  { src: './images/1-10.webp', title: '夕陽を見上げて', tags: ['日常', '草原', '夕暮れ', '休息'], caption: '草の上に横たわり、空へ目を向ける。沈む陽の明るさがまぶたを淡く染めていった。' },
  { src: './images/1-11.webp', title: '秋の縁側で', tags: ['日常', '縁側', '秋', '紅葉'], caption: '縁側で落ち葉を集める手が止まる。紅葉の色が光と重なり、季節の匂いがふわりと広がった。' },
  { src: './images/1-12.webp', title: '森のかげから', tags: ['日常', '森', '動物', 'リス'], caption: '木の影を出たところで、リスが足元に現れた。森の明るさがその小さな動きを照らしていた。' },
  { src: './images/1-13.webp', title: '桜の下で', tags: ['日常', '春', '桜', '散歩'], caption: '並木を歩くと、花びらが肩に落ちる。ひとひらが触れただけで、春の気配がすっと近づいてきた。' },
  { src: './images/1-14.webp', title: '紙飛行機を空へ', tags: ['日常', '空', '遊び'], caption: '紙飛行機を放つと、白い翼が風をとらえた。空へ向かう軌跡が、朝の光を軽く跳ね返していた。' },
  { src: './images/1-15.webp', title: '灯をともして', tags: ['日常', '夜', '灯火', '静寂'], caption: '小さな灯を掲げると、橙色の明かりが手元に集まる。山あいの静けさが夜の始まりを告げていた。' },
  { src: './images/1-16.webp', title: '縁側の小鳥たち', tags: ['日常', '縁側', '動物', '小鳥'], caption: '縁側に腰掛け、小鳥へそっと餌を置く。羽ばたきが弾むように広がり、朝の気配がやわらかく動きだした。' },
  { src: './images/1-17.webp', title: '森のきつねへ', tags: ['日常', '森', '動物', 'きつね'], caption: '森でいつもの場所に腰を下ろし、器を差し出す。きつねは落ち着いた様子で近づき、馴染んだ空気がふたりを包んでいた。' },
  { src: './images/1-18.webp', title: '朝の支度', tags: ['日常', '台所', '料理', '朝'], caption: '鍋をかき混ぜると、湯気がふわりと立つ。香りが広がり、朝の始まりをそっと知らせていた。' },
  { src: './images/1-19.webp', title: '雨の木かげで', tags: ['日常', '森', '雨', '静寂'], caption: '雨音の下、木のそばでそっと立ち止まる。葉から落ちた雫が肩を滑り、ひんやりとした空気が肌をかすめた。' },
  { src: './images/1-20.webp', title: '空へ羽ばたく朝', tags: ['日常', '朝', '動物', '小鳥'], caption: '小鳥が羽を震わせる。光を受けたその姿に、朝の気配がやわらかく重なっていった。' },
  { src: './images/1-21.webp', title: '森での再会', tags: ['日常', '森', '動物', 'きつね'], caption: '目を閉じたきつねが腕に落ち着く。ウサ子は目を開け、その様子を静かに見守った。' },
  { src: './images/1-22.webp', title: '竹の道を歩く', tags: ['日常', '竹林', '道', '朝'], caption: '竹林の階段を下りる。緑の香りが足もとに満ち、光が新しい季節の予感を運んでいた。' },
  { src: './images/1-23.webp', title: '竹林を抜けて', tags: ['日常', '竹林', '朝', '光'], caption: '竹の道を進むたび、葉が小さく触れ合う。淡い影が足もとに落ち、静かな朝が続いていった。' },
  { src: './images/1-24.webp', title: '花畑の真ん中で', tags: ['日常', '花畑', '祈り'], caption: '花畑の中心でそっと手を合わせる。花冠が光を受け、やわらかなきらめきが風にほどけていった。' },
  { src: './images/1-25.webp', title: '水面の笛', tags: ['日常', '水辺', '演奏', '笛'], caption: '水辺に立ちながら、笛の音をまっすぐ空へ届ける。' },
  { src: './images/1-26.webp', title: '朝の支度', tags: ['日常', '朝', '光'], caption: '柔らかな光の中で、濡れた手ぬぐいを静かに絞る。' },
  { src: './images/1-27.webp', title: '春風の袖', tags: ['日常', '春', '桜', '風'], caption: '頬を撫でる柔らかな陽光と、桜の香る風' },
  { src: './images/1-28.webp', title: '雨上がりの森', tags: ['日常', '雨上がり', '森'], caption: '濡れた葉の間で、空気を感じている。' },
  { src: './images/1-29.webp', title: '山の鏡', tags: ['日常', '水辺', '山', '静寂'], caption: '水面に映る山を、静かに見つめる。' },
  { src: './images/1-30.webp', title: '静かな祈り', tags: ['日常', '森', '祈り', '光'], caption: '木漏れ日の中で、静かに明日を願う。' },
  { src: './images/1-31.webp', title: '読書の夜', tags: ['日常', '夜', '部屋', '読書', '灯火'], caption: '蝋燭の灯りが、古い物語を照らし出す。' },
  { src: './images/1-32.webp', title: '提灯の灯', tags: ['日常', '夕暮れ', '森', '灯火'], caption: '柔らかな光が、夕暮れの森を包み込む。' },
  { src: './images/1-33.webp', title: '雨の参道', tags: ['日常', '雨', '神社', '道'], caption: '傘に響く雨音を聞きながら、歩みを進める。' },
  { src: './images/1-34.webp', title: '森の収穫', tags: ['日常', '森', '収穫'], caption: '籠いっぱいの恵みを持ち、家路につく。' },
  { src: './images/1-35.webp', title: '白猫との出会い', tags: ['日常', '神社', '動物', '猫'], caption: '石段の途中で、小さな命をそっと抱き寄せる。' },
  { src: './images/1-36.webp', title: '波打ち際の友', tags: ['日常', '海', '動物', '犬'], caption: '潮風を感じながら、犬と貝殻を拾い集める。' },
  { src: './images/1-37.webp', title: 'うたた寝', tags: ['日常', '部屋', '微睡み', '動物', '猫'], caption: '陽だまりの机で、猫と共に夢の中へ。' },
  { src: './images/1-38.webp', title: '筆を走らせる', tags: ['日常', '部屋', '書道'], caption: '畳の上で、想いを文字に託していく。' },
  { src: './images/1-39.webp', title: '冬の便り', tags: ['日常', '冬', '部屋', '動物', '犬'], caption: '窓辺に届いた手紙を、犬と共に見つめる。' },
  { src: './images/1-40.webp', title: '指先に残る熱', tags: ['日常', '風', '温もり'], caption: '頬を撫でる風と、背に感じる木の温もり' },
  { src: './images/1-41.webp', title: '微睡みの熱', tags: ['日常', '部屋', '微睡み', '温もり'], caption: '畳から伝わる日向の熱と、お茶の温かさ' },
  { src: './images/1-42.webp', title: '柔らかな体温', tags: ['日常', '動物', '猫', '温もり'], caption: '指先に触れるふかふかの毛並み、伝わる鼓動' },
  { src: './images/1-43.webp', title: '光を吸う呼吸', tags: ['日常', '冬', '朝', '光'], caption: '肺を満たす冬の冷気と、肌を刺す眩光の白' },
  { src: './images/1-44.webp', title: '背中を追う風', tags: ['日常', '神社', '風', '道'], caption: '石段を上る足の重みと、背後を撫でる柔らかな風' },
  { src: './images/1-45.webp', title: '指先のくすぐり', tags: ['日常', '秋', '動物', '小鳥'], caption: '鼻先を掠める羽根の質感、乾いた秋の匂い' },
  { src: './images/1-46.webp', title: '飛沫の清涼', tags: ['日常', '水辺', '滝', '冷涼'], caption: '足首を浸す水の冷たさと、耳を叩く滝の轟音' },
  { src: './images/1-47.webp', title: '水桶の重み', caption: '掌に食い込む取っ手、揺れる水面が映す眩しさ', tags: ['日常', '水辺', '光'] },
  { src: './images/1-48.webp', title: 'かじかむ祈り', tags: ['日常', '冬', '祈り', '寒冷'], caption: '指先の感覚が消える寒さと、肺から漏れる熱' },
  { src: './images/1-49.webp', title: '雪を踏む音', tags: ['日常', '冬', '雪', '道'], caption: '雪を噛みしめる下駄の響き、頬を打つ冷たい風' },
  { src: './images/1-50.webp', title: '甘い香り', tags: ['日常', '部屋', '香り'], caption: '棚をなぞる指先の感触、胸を満たす瓶の甘い匂い' },
  { src: './images/1-51.webp', title: '薬草の苦み', tags: ['日常', '部屋', '香り', '冷涼'], caption: '鼻を突く葉の鋭い香りと、薄暗い廊下の冷気' },
  { src: './images/1-52.webp', title: '若葉の感触', tags: ['日常', '草原', '春', '光'], caption: '掌に刺さる青い草の勢い、背中に受ける陽光' },
  { src: './images/1-53.webp', title: '冷える吐息', tags: ['日常', '冬', '部屋', '寒冷'], caption: '窓辺に溜まる冬の冷たさと、掌に籠もる熱' },
  { src: './images/1-54.webp', title: '身を整える朝', tags: ['日常', '朝', '部屋', '鏡'], caption: '髪を梳く櫛の冷たい滑りと、鏡が映す背後の冷気' },
  { src: './images/1-55.webp', title: '陽だまりの影', tags: ['日常', '部屋', '冬', '温もり'], caption: '座布団の柔らかな弾力、足先に感じる冬の日差し' },
  { src: './images/1-56.webp', title: '触れ合う熱', tags: ['日常', '冬', '雪', '動物', '猫'], caption: '雪上の膝から伝わる芯の寒さと、鼻先の温もり' },
  { src: './images/1-57.webp', title: '林檎の重み', tags: ['日常', '秋', '果実'], caption: '掌に収まる果実の滑らかさと、甘い蜜の香り' },
  { src: './images/1-58.webp', title: '雪の散歩道', tags: ['日常', '冬', '雪', '道'], caption: 'カゴを持つ腕に伝わる重みと、弾む足取り' },
  { src: './images/1-59.webp', title: '窓辺の静寂', tags: ['日常', '冬', '部屋', '静寂'], caption: '背筋を伸ばし、冷えた窓に映る冬の静けさ' },
  { src: './images/1-60.webp', title: '冬の芽吹き', tags: ['日常', '冬', '草原', '静寂'], caption: '指先に触れる草の感触に、心安らぐひととき' },
  { src: './images/1-61.webp', title: '社での休息', tags: ['日常', '冬', '神社', '動物', '犬'], caption: '冷たい外気と、柴犬の隣で感じる確かな体温' },

  { src: './images/2-1.webp', title: '風を切る予感', tags: ['舞踊', '動', '風'] },
  { src: './images/2-2.webp', title: '呼吸を整えて', tags: ['舞踊', '静', '精神'] },
  { src: './images/2-3.webp', title: '一歩の重み', tags: ['舞踊', '足下', '精神'] },
  { src: './images/2-4.webp', title: '視線の先に', tags: ['舞踊', '静', '視線'] },
  { src: './images/2-5.webp', title: '床を掴む指先', tags: ['舞踊', '畳', '足下'] },
  { src: './images/2-6.webp', title: '加速する思考', tags: ['舞踊', '動', '精神'] },
  { src: './images/2-7.webp', title: '静寂の構え', tags: ['舞踊', '静', '構え'] },
  { src: './images/2-8.webp', title: '重力を忘れて', tags: ['舞踊', '動', '跳躍'] },
  { src: './images/2-9.webp', title: '舞う軌跡', tags: ['舞踊', '動', '軌跡'] },
  { src: './images/2-10.webp', title: '光をまとう', tags: ['舞踊', '動', '光'] },
  { src: './images/2-11.webp', title: '空を仰ぐ指先', tags: ['舞踊', '指先', '空'] },
  { src: './images/2-12.webp', title: '膝で感じる重心', tags: ['舞踊', '重心', '畳'] },
  { src: './images/2-13.webp', title: '浮遊する思考', tags: ['舞踊', '静', '精神'] },
  { src: './images/2-14.webp', title: '反転する景色', tags: ['舞踊', '動', '旋回'] },
  { src: './images/2-15.webp', title: '地を蹴る覚悟', tags: ['舞踊', '動', '精神'] },
  { src: './images/2-16.webp', title: '手の中に光を', tags: ['舞踊', '掌', '光'] },
  { src: './images/2-17.webp', title: '旋回する視界', tags: ['舞踊', '動', '旋回'] },
  { src: './images/2-18.webp', title: '静かなる踏み込み', tags: ['舞踊', '足下', '静'] },
  { src: './images/2-19.webp', title: '風の道筋を読む', tags: ['舞踊', '風', '精神'] },
  { src: './images/2-20.webp', title: '光を掴む指先', tags: ['舞踊', '指先', '光'] },
  { src: './images/2-21.webp', title: '静寂を蹴る', tags: ['舞踊', '動', '静寂'] },
  { src: './images/2-22.webp', title: '風を操る', tags: ['舞踊', '動', '風'] },
  { src: './images/2-23.webp', title: '扇に託す想い', tags: ['舞踊', '扇', '精神'] },
  { src: './images/2-24.webp', title: '舞の呼吸', tags: ['舞踊', '呼吸', '精神'] },
  { src: './images/2-25.webp', title: '凛と立つ', tags: ['舞踊', '静', '凛'] },
  { src: './images/2-26.webp', title: '宙を舞う身', tags: ['舞踊', '動', '跳躍'] },
  { src: './images/2-27.webp', title: '視線の先へ', tags: ['舞踊', '視線', '精神'] },
  { src: './images/2-28.webp', title: '次の一歩', tags: ['舞踊', '動', '足下'] },
  { src: './images/2-29.webp', title: '空に放つ願い', tags: ['舞踊', '空', '精神'] },
  { src: './images/2-30.webp', title: '風を捕まえて', tags: ['舞踊', '動', '風'] },
  { src: './images/2-31.webp', title: '踏み出す一歩', tags: ['舞踊', '動', '道'] },
  { src: './images/2-32.webp', title: '光を纏う舞', tags: ['舞踊', '動', '光'] },
  { src: './images/2-33.webp', title: '畳の香りと', tags: ['舞踊', '静', '畳'] },
  { src: './images/2-34.webp', title: '重心を感じて', tags: ['舞踊', '重心', '静'] },
  { src: './images/2-35.webp', title: '指先の余韻', tags: ['舞踊', '静', '指先'] },
  { src: './images/2-36.webp', title: '凛とした背中', tags: ['舞踊', '静', '凛'] },
  { src: './images/2-37.webp', title: '静かな鼓動', tags: ['舞踊', '静', '精神'] },
  { src: './images/2-38.webp', title: '柔らかな視線', tags: ['舞踊', '静', '視線'] },
  { src: './images/2-39.webp', title: '呼吸を整える', tags: ['舞踊', '静', '呼吸'] },
  { src: './images/2-40.webp', title: '空を仰ぐ指先', tags: ['舞踊', '指先', '空'] },
  { src: './images/2-41.webp', title: '風を纏う一歩', tags: ['舞踊', '動', '風'] },
  { src: './images/2-42.webp', title: '仮面の鼓動', tags: ['舞踊', '狐面', '精神'] },
  { src: './images/2-43.webp', title: '静止する視線', tags: ['舞踊', '静', '視線'] },
  { src: './images/2-44.webp', title: '扇に込める熱', tags: ['舞踊', '扇', '精神'] },
  { src: './images/2-45.webp', title: '紅葉を待つ背中', tags: ['舞踊', '静', '秋', '紅葉'] },
  { src: './images/2-46.webp', title: '光を掴む掌', tags: ['舞踊', '掌', '光'] },
  { src: './images/2-47.webp', title: '駆け抜ける予感', tags: ['舞踊', '動', '精神'] },
  { src: './images/2-48.webp', title: '畳を捉える膝', tags: ['舞踊', '畳', '重心'] },
  { src: './images/2-49.webp', title: '朱を揺らす呼吸', tags: ['舞踊', '袴', '呼吸'] },
  { src: './images/2-50.webp', title: '春光の袖返え', tags: ['舞踊', '春', '動'] },
  { src: './images/2-51.webp', title: '扇にのる風', tags: ['舞踊', '扇', '風'] },
  { src: './images/2-52.webp', title: '指先に綴る詞', tags: ['舞踊', '指先', '物語'] },
  { src: './images/2-53.webp', title: '畳を叩く足拍子', tags: ['舞踊', '動', '音', '畳'] },
  { src: './images/2-54.webp', title: '光庭への出端', tags: ['舞踊', '光', '道'] },
  { src: './images/2-55.webp', title: '驚きの見得', tags: ['舞踊', '静', '表情'] },
  { src: './images/2-56.webp', title: '朱を引く余韻', tags: ['舞踊', '静', '袴'] },
  { src: './images/2-57.webp', title: '影と舞う一人舞台', tags: ['舞踊', '影', '孤独'] },
  { src: './images/2-58.webp', title: '腰を据え、地を踏む', tags: ['舞踊', '重心', '精神'] },
  { src: './images/2-59.webp', title: '面裏の情念', tags: ['舞踊', '仮面', '精神'] },
  { src: './images/2-60.webp', title: '風をまとう摺り足', tags: ['舞踊', '足下', '風'] },
  { src: './images/2-61.webp', title: '瞬刻の蹴り出し', tags: ['舞踊', '動', '瞬刻'] },
  { src: './images/2-62.webp', title: '低く構える残心', tags: ['舞踊', '静', '精神'] },
  { src: './images/2-63.webp', title: '天光を仰ぐ差し手', tags: ['舞踊', '光', '空'] },
  { src: './images/2-64.webp', title: '障子を背に駆ける', tags: ['舞踊', '動', '部屋'] },
  { src: './images/2-65.webp', title: '引力に抗う跳躍', tags: ['舞踊', '動', '跳躍'] },
  { src: './images/2-66.webp', title: '団扇に込める気韻', tags: ['舞踊', '扇', '精神'] },
  { src: './images/2-67.webp', title: 'しなやかな背の反り', tags: ['舞踊', '動', '曲線'] },

  { src: './images/2a-1.webp', title: '地を蹴る、熱を編む', tags: ['演舞', '動', '精神'], caption: '' },
  { src: './images/2a-2.webp', title: '思考を研ぐ、無音の空間', tags: ['演舞', '静', '精神'], caption: '' },
  { src: './images/2a-3.webp', title: '夢の淵、熱をほどく', tags: ['演舞', '静', '夢'], caption: '' },
  { src: './images/2a-4.webp', title: '爪先から、空を泳ぐ', tags: ['演舞', '動', '跳躍'], caption: '' },
  { src: './images/2a-5.webp', title: '青い袖、自由を謳歌', tags: ['演舞', '動', '自由'], caption: '' },
  { src: './images/2a-6.webp', title: '風を切り、光を束ねる', tags: ['演舞', '動', '光'], caption: '' },
  { src: './images/2a-7.webp', title: '重力を脱ぎ、天を蹴る', tags: ['演舞', '動', '跳躍'], caption: '' },
  { src: './images/2a-8.webp', title: '静止、揺れる心の輪郭', tags: ['演舞', '静', '精神'], caption: '' },
  { src: './images/2a-9.webp', title: '微笑、鼓動が花開く', tags: ['演舞', '静', '表情'], caption: '' },
  { src: './images/2a-10.webp', title: '仰ぐ、金のさざめき', tags: ['演舞', '静', '光'], caption: '' },
  { src: './images/2a-11.webp', title: '枝に遊び、春を招く', tags: ['演舞', '春', '木'], caption: '' },
  { src: './images/2a-12.webp', title: '正対、青に溶ける私', tags: ['演舞', '静', '精神'], caption: '' },
  { src: './images/2a-13.webp', title: '黄金の扇、風を飼う', tags: ['演舞', '扇', '風'], caption: '' },
  { src: './images/2a-14.webp', title: '鏡合わせ、意志を研ぐ', tags: ['演舞', '静', '精神'], caption: '' },
  { src: './images/2a-15.webp', title: '面影、蒼き獣の咆哮', tags: ['演舞', '霊獣', '仮面'], caption: '' },
  { src: './images/2a-16.webp', title: '森閑、霊獣と歩む道', tags: ['演舞', '森', '霊獣'], caption: '' },
  { src: './images/2a-17.webp', title: '光射す、舞の余韻', tags: ['演舞', '光', '余韻'], caption: '' },
  { src: './images/2a-18.webp', title: '朱を背負い、天を舞う', tags: ['演舞', '空', '袴'], caption: '' },
  { src: './images/2a-19.webp', title: '旋風、紅の残像をまとう', tags: ['演舞', '動', '風'], caption: '' },
  { src: './images/2a-20.webp', title: '春光、呼吸が透き通る', tags: ['演舞', '春', '呼吸'], caption: '' },

  { src: './images/2b-1.webp', title: 'リズム跳ねる、打楽の音。', tags: ['演奏', '打楽器', '音'], caption: '' },
  { src: './images/2b-2.webp', title: '窓際の光、柔らかな音', tags: ['演奏', '部屋', '光'], caption: '' },
  { src: './images/2b-3.webp', title: '竹笛が震わす、喉の熱', tags: ['演奏', '笛', '竹林'], caption: '' },
  { src: './images/2b-4.webp', title: '春風とハミング、三味線', tags: ['演奏', '弦楽器', '春'], caption: '' },
  { src: './images/2b-5.webp', title: '撥が叩く、空気の膜', tags: ['演奏', '弦楽器', '動'], caption: '' },
  { src: './images/2b-6.webp', title: '指の腹、弦の震えと熱', tags: ['演奏', '弦楽器', '指先'], caption: '' },
  { src: './images/2b-7.webp', title: '爆ぜる音、胸を叩く律', tags: ['演奏', '打楽器', '音'], caption: '' },
  { src: './images/2b-8.webp', title: '水面を渡る、笛の吐息', tags: ['演奏', '水辺', '笛'], caption: '' },
  { src: './images/2b-9.webp', title: '高鳴る胸、跳ねる撥音', tags: ['演奏', '弦楽器', '音'], caption: '' },
  { src: './images/2b-11.webp', title: '青空に響く、三線の音', tags: ['演奏', '空', '弦楽器'], caption: '' },
  { src: './images/2b-12.webp', title: '秋風を叩く、紅の鼓動', tags: ['演奏', '秋', '打楽器'], caption: '' },
  { src: './images/2b-13.webp', title: '霊獣と舞う、月下の弦', tags: ['演奏', '夜', '霊獣', '弦楽器'], caption: '' },
  { src: './images/2b-14.webp', title: '竹林を抜ける、笛の風', tags: ['演奏', '竹林', '笛'], caption: '' },
  { src: './images/2b-15.webp', title: '乱舞する、勇壮なる鼓', tags: ['演奏', '打楽器', '動'], caption: '' },
  { src: './images/2b-16.webp', title: '水面に溶ける、竪琴の詩', tags: ['演奏', '水辺', '弦楽器'], caption: '' },
  { src: './images/2b-17.webp', title: '桜舞う、春陽の調べ', tags: ['演奏', '春', '桜'], caption: '' },
  { src: './images/2b-18.webp', title: '夕映えに踊る、琵琶の情', tags: ['演奏', '夕暮れ', '弦楽器'], caption: '' },
  { src: './images/2b-19.webp', title: '天を仰ぐ、歓喜の旋律', tags: ['演奏', '空', '音'], caption: '' },

  { src: './images/3-1.webp', title: '光の深呼吸', tags: ['風景', '森', '光'], caption: '背筋を伸ばすと、木の香りが胸に満ちていく。' },
  { src: './images/3-2.webp', title: '指先に宿る物語', tags: ['風景', '部屋', '仮面'], caption: '棚に並ぶお面に触れると、懐かしい鼓動が伝わってくる。' },
  { src: './images/3-3.webp', title: '空を仰ぐ決意', tags: ['風景', '空', '動'], caption: '幕を握りしめ、高鳴る胸と一緒に青い空へ飛び出す。' },
  { src: './images/3-4.webp', title: '風の境界線', tags: ['風景', '高台', '風'], caption: 'たなびく白布の重みを感じながら、遠くの街を見つめる。' },
  { src: './images/3-5.webp', title: '静寂の提灯', tags: ['風景', '夜', '灯火'], caption: 'カランと鳴る下駄の音。夜の冷気が頬に心地いい。' },
  { src: './images/3-6.webp', title: '狐のステップ', tags: ['風景', '部屋', '仮面', '動'], caption: '板張りの床を蹴って、お面の奥でいたずらに笑ってみる。' },
  { src: './images/3-7.webp', title: '光の深呼吸', tags: ['風景', '森', '光'], caption: '両手を広げ、木漏れ日の温かさを全身で受け止めた。' },
  { src: './images/3-8.webp', title: '蒼の通り道', tags: ['風景', '神社', '道'], caption: '石畳の冷たさが足裏に伝わり、背筋がすっと伸びる。' },
  { src: './images/3-9.webp', title: 'お散歩の連れ', tags: ['風景', '夜', '灯火', '猫'], caption: '揺れる提灯の熱を感じながら、白い猫と歩幅を合わせる。' },
  { src: './images/3-10.webp', title: '春を抱きしめて', tags: ['風景', '春', '桜'], caption: '舞い散る花びら。掌に届く春の軽さに心が躍りだす。' },
  { src: './images/3-11.webp', title: '灯火のぬくもり', tags: ['風景', '夜', '灯火'], caption: 'オレンジ色の光を見上げると、指先まで温もる気がした。' },
  { src: './images/3-12.webp', title: '柱のささやき', tags: ['風景', '神社', '建築'], caption: '朱塗りの柱に寄り添い、木の肌触りと歴史を確かめる。' },
  { src: './images/3-13.webp', title: '夕暮れの選択', tags: ['風景', '夕暮れ', '仮面'], caption: 'どのお面が私に似合う？指先に触れる木目が心地いい。' },
  { src: './images/3-14.webp', title: '紅に染まる風', tags: ['風景', '秋', '紅葉'], caption: '指先に触れる布の重み、秋が透けて見えるよ。' },
  { src: './images/3-15.webp', title: '月夜のともしび', tags: ['風景', '夜', '道'], caption: '足元の石畳がひんやり。静かな夜を歩こう。' },
  { src: './images/3-16.webp', title: '街角の赤色', tags: ['風景', '街', '光'], caption: 'ピンと張った布の感触。今日もいい日になりそう。' },
  { src: './images/3-17.webp', title: '木漏れ日の参道', tags: ['風景', '神社', '光'], caption: '柔らかな光を背中に受けて、一歩ずつ進むんだ。' },
  { src: './images/3-18.webp', title: '小さな友だち', tags: ['風景', '動物', '温もり'], caption: '見つめる瞳にドキドキ。伝わるかな、この温もり。' },
  { src: './images/3-19.webp', title: '見晴らす空', tags: ['風景', '高台', '風'], caption: '頬をなでる風が心地いい。どこまでも行けそう。' },
  { src: './images/3-20.webp', title: '雪降る軒先', tags: ['風景', '冬', '雪'], caption: '手のひらに落ちる冷たさ。冬の匂いがするよ。' },
  { src: './images/3-21.webp', title: '青空の社', tags: ['風景', '神社', '空'], caption: 'まぶたの裏まで青い。深い呼吸で心を満たすの。' },
  { src: './images/3-22.webp', title: '風とはためき', tags: ['風景', '風', '動'], caption: '高く腕を伸ばして。空とつながった気がした。' },
  { src: './images/3-23.webp', title: '黄金の帰り道', tags: ['風景', '夕暮れ', '道'], caption: '弾む足取りに合わせて、袴の裾が揺れている。' },
  { src: './images/3-24.webp', title: '静寂の回廊', tags: ['風景', '神社', '静寂'], caption: '赤い絨毯を踏みしめるたび、心が凛と引き締まっていく。' },
  { src: './images/3-25.webp', title: '見守る景色', tags: ['風景', '街', '高台'], caption: 'すーっと背筋を伸ばして、静かな街の息吹を感じる。' },
  { src: './images/3-26.webp', title: '夜明けの道', tags: ['風景', '夜明け', '道'], caption: '明かりの灯る方へ。私の足あとが白く輝いて見えた。' },
  { src: './images/3-27.webp', title: '駆けだす予感', tags: ['風景', '動', '猫'], caption: '風を切る頬が熱い。白猫たちと一緒にどこへ行こう？' },
  { src: './images/3-28.webp', title: '願いをのせて', tags: ['風景', '空', '風'], caption: '大きな旗がはためく音。空を見上げて深く息を吸った。' },
  { src: './images/3-29.webp', title: '光のなかへ', tags: ['風景', '夜', '灯火'], caption: '提灯のあかりに背中を押されて、一歩ずつ踏み出す。' },
  { src: './images/3-30.webp', title: 'ぬくもり、みっけ', tags: ['風景', '秋', '動物'], caption: '大きな背中をなでると、秋の陽だまりの匂いがした。' },
  { src: './images/3-31.webp', title: '準備はいい？', tags: ['風景', '日常', '精神'], caption: '髪をきゅっと結び直して、今日の私を始めてみる。' },
  { src: './images/3-32.webp', title: '雪あかりの朝', tags: ['風景', '冬', '雪'], caption: 'ほうきを持つ手に力が入る。雪の冷たさが心地いい。' },
  { src: './images/3-33.webp', title: '守り神と歩む', tags: ['風景', '神社', '霊獣'], caption: '鳥居を抜ける風。隣にいる君の足音に勇気をもらう。' },
  { src: './images/3-34.webp', title: '夕刻の帰り道', tags: ['風景', '夕暮れ', '道'], caption: '染まる頬。坂道を一歩ずつ噛みしめて歩く。' },
  { src: './images/3-35.webp', title: '回廊に響く足音', tags: ['風景', '建築', '道'], caption: '木の温もりが足裏に伝わって、心が落ち着くの。' },
  { src: './images/3-36.webp', title: '空へ伸ばす手', tags: ['風景', '空', '動'], caption: '指先から風を感じて。どこまでも飛べそう。' },
  { src: './images/3-37.webp', title: '光が踊る参道', tags: ['風景', '神社', '光'], caption: '木漏れ日が温かくて、背筋がすっと伸びる心地. ' },
  { src: './images/3-38.webp', title: 'お面の向こう側', tags: ['風景', '仮面', '装飾'], caption: '赤いリボンを揺らして、少し特別な私になる。' },
  { src: './images/3-39.webp', title: '芝生の上の内緒話', tags: ['風景', '春', '草原'], caption: '膝をついて視線を合わせたら、春の匂いがした。' },
  { src: './images/3-40.webp', title: 'あうんの呼吸', tags: ['風景', '霊獣', '温もり'], caption: '見上げたら、優しい体温が隣にあったんだ。' },
  { src: './images/3-41.webp', title: '光の背中', tags: ['風景', '森', '道'], caption: '石畳を蹴る足音が、静かな森に響いて心地いい。' },
  { src: './images/3-42.webp', title: '風の深呼吸', tags: ['風景', '空', '風'], caption: '空を仰ぐと、胸の奥まで青色が染み渡っていく。' },
  { src: './images/3-43.webp', title: '黄金のゆらぎ', tags: ['風景', '秋', '収穫'], caption: 'かごの重みを感じながら、秋の香りを追い越した。' },
  { src: './images/3-44.webp', title: '視線の温度', tags: ['風景', '仮面', '精神'], caption: '仮面の瞳と目が合って、背筋が少しだけ伸びた。' },
  { src: './images/3-45.webp', title: '朱に染まる', tags: ['風景', '神社', '建築'], caption: '鳥居をくぐれば、頬をなでる空気が凛と変わる。' },
  { src: './images/3-46.webp', title: '竹の重み', tags: ['風景', '日常', '竹林'], caption: '肩にのせた竹のしなりが、歩くリズムを作ってくれる。' },
  { src: './images/3-47.webp', title: '雨の調べ', tags: ['風景', '雨', '道'], caption: '傘を叩く雨音を聴きながら、水たまりを避けて歩く。' },
  { src: './images/3-48.webp', title: '土のささやき', tags: ['風景', '春', '道'], caption: '指先に触れる柔らかな感触。そっと春を拾い上げた。' },
  { src: './images/3-49.webp', title: '風と舞う朱色', tags: ['風景', '風', '動'], caption: '指先まで風が抜けて、私、今すごく自由だよ。' },
  { src: './images/3-50.webp', title: '夕暮れのお散歩', tags: ['風景', '夕暮れ', '猫'], caption: '提灯の灯りに誘われて、猫と一緒にどこまでも。' },
  { src: './images/3-51.webp', title: '秘密の横顔', tags: ['風景', '仮面', '部屋'], caption: 'たくさんのお面に囲まれて、鼓動が少し速くなる。' },
  { src: './images/3-52.webp', title: '見つけた光', tags: ['風景', '夜', '灯火'], caption: '腰を落として覗き込むと、夜の匂いがふわりとした。' },
  { src: './images/3-53.webp', title: '光射す石畳', tags: ['風景', '神社', '光'], caption: '眩しさに目を細めて、踏み出す足が軽くなるんだ。' },
  { src: './images/3-54.webp', title: '灯る回廊', tags: ['風景', '夜', '灯火'], caption: '背中を丸めて光を追う。この先に何があるのかな。' },

  { src: './images/4-1.webp', title: '陽だまり、背中に溶ける', tags: ['煌めく日', '光', '温もり'], caption: "" },
  { src: './images/4-2.webp', title: '光の粒、指ですくう', tags: ['煌めく日', '光', '掌'], caption: "" },
  { src: './images/4-3.webp', title: '風の道、髪が泳ぐ', tags: ['煌めく日', '風', '髪'], caption: "" },
  { src: './images/4-4.webp', title: '膝の熱、丸めた背中', tags: ['煌めく日', '休息', '温もり'], caption: "" },
  { src: './images/4-5.webp', title: '扇の風、空を仰ぐ', tags: ['煌めく日', '空', '扇'], caption: "" },
  { src: './images/4-6.webp', title: '畳を蹴る、凛の鼓動', tags: ['煌めく日', '動', '畳'], caption: "" },
  { src: './images/4-7.webp', title: '灯る体温、影のささやき', tags: ['煌めく日', '夜', '影'], caption: "" },
  { src: './images/4-8.webp', title: '扉の先、指先が踊る', tags: ['煌めく日', '部屋', '指先'], caption: "" },
  { src: './images/4-9.webp', title: '布の波、高く手を伸ばす', tags: ['煌めく日', '動', '空'], caption: "" },
  { src: './images/4-10.webp', title: '青に沈む、午後の微睡み', tags: ['煌めく日', '青', '微睡み'], caption: "" },
  { src: './images/4-11.webp', title: '畳の匂い、爪先で弾く', tags: ['煌めく日', '畳', '足下'], caption: "" },
  { src: './images/4-12.webp', title: '銀の毛並み、掌に余る', tags: ['煌めく日', '動物', '温もり'], caption: "" },
  { src: './images/4-13.webp', title: '仮面越し、呼吸が白む', tags: ['煌めく日', '仮面', '冬'], caption: "" },
  { src: './images/4-14.webp', title: '風を孕む、袴の重なり', tags: ['煌めく日', '風', '袴'], caption: "" },
  { src: './images/4-15.webp', title: '星のしずく、指が触れる', tags: ['煌めく日', '夜', '星'], caption: "" },
  { src: './images/4-16.webp', title: '開け放つ、光が喉を焼く', tags: ['煌めく日', '光', '朝'], caption: "" },
  { src: './images/4-17.webp', title: '眠る骨格、重力に甘えて', tags: ['煌めく日', '休息', '重力'], caption: "" },
  { src: './images/4-18.webp', title: '組んだ指、熱の居場所', tags: ['煌めく日', '静', '精神'], caption: "" },
  { src: './images/4-19.webp', title: '陽だまりを、踵で踏む', tags: ['煌めく日', '光', '足下'], caption: "" },
  { src: './images/4-20.webp', title: '灯火、芯を温める', tags: ['煌めく日', '夜', '灯火'], caption: "" },
  { src: './images/4-21.webp', title: '踏み出す、鼓動', tags: ['煌めく日', '動', '精神'], caption: "" },
  { src: './images/4-22.webp', title: '背筋に光が溶ける', tags: ['煌めく日', '光', '静'], caption: "" },
  { src: './images/4-23.webp', title: '床の冷たさ、微睡', tags: ['煌めく日', '冷涼', '微睡み'], caption: "" },
  { src: './images/4-24.webp', title: '膝を包む、春の陽', tags: ['煌めく日', '春', '光'], caption: "" },
  { src: './images/4-25.webp', title: '舞い踊る、身の軽さ', tags: ['煌めく日', '舞踊', '動'], caption: "" },
  { src: './images/4-26.webp', title: '花の香、肺を満たす', tags: ['煌めく日', '春', '香り'], caption: "" },
  { src: './images/4-27.webp', title: '扇とまどろみ', tags: ['煌めく日', '扇', '微睡み'], caption: "" },
  { src: './images/4-28.webp', title: '天を仰ぐ青', tags: ['煌めく日', '空', '青'], caption: "" },
  { src: './images/4-29.webp', title: '狐面と緋の袴', tags: ['煌めく日', '仮面', '袴'], caption: "" },
  { src: './images/4-30.webp', title: '静寂の祈り', tags: ['煌めく日', '祈り', '静寂'], caption: "" },
  { src: './images/4-31.webp', title: '陽光の中を駆ける', tags: ['煌めく日', '光', '動'], caption: "" },
  { src: './images/4-32.webp', title: '静寂に響く弦の音', tags: ['煌めく日', '演奏', '静寂'], caption: "" },
  { src: './images/4-33.webp', title: '畳の上での微笑み', tags: ['煌めく日', '畳', '表情'], caption: "" },
  { src: './images/4-34.webp', title: '桜舞う空の調べ', tags: ['煌めく日', '春', '桜'], caption: "" },
  { src: './images/4-35.webp', title: '憩いのひととき', tags: ['煌めく日', '休息', '温もり'], caption: "" },
  { src: './images/4-36.webp', title: '光を仰ぐ首筋', tags: ['煌めく日', '光', '静'], caption: "" },
  { src: './images/4-37.webp', title: '鼓動に響く太鼓', tags: ['煌めく日', '演奏', '打楽器'], caption: "" },
  { src: './images/4-38.webp', title: '弾む指先の熱', tags: ['煌めく日', '演奏', '指先'], caption: "" },
  { src: './images/4-39.webp', title: '扉の向こうの光', tags: ['煌めく日', '光', '扇'], caption: "" }
];
const gallery = $("#cardGallery");
const filterContainer = $("#filterButtons");

let currentGroupItems = []; 
let idx = -1;

const lb = $("#lightbox");
const lbImg = $("#lbImg");
const lbTitle = $("#lbTitle");
const lbCaption = $("#lbCaption");
const zonePrev = $(".lb__zone--prev");
const zoneNext = $(".lb__zone--next");
const btnClose = $(".lb__close");

// ファイル名からグループ番号を抽出
function getGroupId(src) {
  const filename = src.split('/').pop();
  let id = filename.split('-')[0];
  if (id === "2a" || id === "2b") return "2ab";
  return id;
}

/**
 * 【修正ポイント】ギャラリー描画
 * 表示される画像すべてに「ウサ子」を含むaltを自動付与します
 */
function renderGallery(groupId) {
  currentGroupItems = items.filter(it => getGroupId(it.src) === groupId);

  gallery.innerHTML = currentGroupItems.map((it, i) => {
    // タグを [Tag1][Tag2] 形式の文字列に変換
    const tagStr = it.tags ? `[${it.tags.join('][')}]` : "";

    return `
    <figure class="card" data-i="${i}" tabindex="0" aria-label="${it.title}">
      <div class="card__imgwrap">
        <img src="${it.src}" 
             alt="白髪和服の少女 ウサ子: ${it.title} - ${tagStr} ${it.caption || ''}" 
             loading="lazy">
      </div>
      <figcaption class="card__meta">
        <h3 class="card__title">${it.title}</h3>
        <p class="card__caption">${it.caption || ''}</p>
      </figcaption>
    </figure>
  `}).join("");
}

// フィルタボタン設定
function setupFilters() {
  const groupIds = [...new Set(items.map(it => getGroupId(it.src)))].sort((a, b) => a - b);
  
  filterContainer.innerHTML = groupIds.map(id => {
    const label = groupNames[id] || `Group ${id}`;
    return `<button class="filter-btn" data-group="${id}">${label}</button>`;
  }).join("");

  filterContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if(!btn) return;
    $$(".filter-btn").forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    renderGallery(btn.dataset.group);
  });

  const firstBtn = $(".filter-btn");
  if(firstBtn) firstBtn.click();
}

function openLB(i){
  idx = (i + currentGroupItems.length) % currentGroupItems.length;
  const it = currentGroupItems[idx];
  
  const tagStr = it.tags ? `[${it.tags.join('][')}]` : "";

  lbImg.src = it.src;
  // 拡大画像のaltにもタグを含める
  lbImg.alt = `白髪和服 少女 ウサ子: ${it.title} - ${tagStr} ${it.caption || ''}`;
  
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
    const j = (k + currentGroupItems.length) % currentGroupItems.length;
    const img = new Image();
    img.src = currentGroupItems[j].src;
  });
}

// イベントリスナー
gallery.addEventListener("click", (e)=>{
  const card = e.target.closest(".card");
  if(!card) return;
  openLB(parseInt(card.dataset.i, 10));
});

btnClose.addEventListener("click", closeLB);
zonePrev.addEventListener("click", ()=> move(-1));
zoneNext.addEventListener("click", ()=> move(1));

lbImg.addEventListener("click", (e)=>{
  const rect = lbImg.getBoundingClientRect();
  if(e.clientX < rect.left + rect.width/2) move(-1); else move(1);
});

document.addEventListener("keydown", (e)=>{
  if(lb.hidden) return;
  if(e.key === "Escape") closeLB();
  if(e.key === "ArrowLeft") move(-1);
  if(e.key === "ArrowRight") move(1);
});

setupFilters();

/**
 * 【修正ポイント】Google SEO対策
 * 200枚以上の全データを「ウサ子」という名前と共にGoogleへ一括送信します
 */
function injectGoogleSEOData() {
    const pageDescription = "ウサ子の毎日を一枚絵で描く日常の物語アート。";

    const ldJson = {
        "@context": "https://schema.org",
        "@type": "ImageGallery",
        "name": "ウサ子 アートギャラリー",
        "description": pageDescription,
        "inLanguage": "ja-JP", // 日本語設定
        "author": { "@type": "Person", "name": "Asunaro Works" },
        "hasPart": items.map(it => {
            const ts = it.tags ? `[${it.tags.join('][')}] ` : "";
            return {
                "@type": "ImageObject",
                "name": `白髪和服の少女 ウサ子: ${it.title}`, 
                // descriptionにタグを統合
                "description": `${ts}${it.caption || ''}`,
                "contentUrl": window.location.origin + window.location.pathname.replace('index.html', '') + it.src.replace('./', '')
            };
        })
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(ldJson);
    document.head.appendChild(script);

    // noscript: クローラー向けにタグ付き目録を生成
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<div style="display:none;"><h2>ウサ子 作品目録</h2><ul>` + 
        items.map(it => {
            const ts = it.tags ? `[${it.tags.join('][')}] ` : "";
            return `<li>白髪和服の少女 ウサ子 - ${it.title}: ${ts}${it.caption || ''}</li>`;
        }).join('') + 
        `</ul></div>`;
    document.body.appendChild(noscript);
}