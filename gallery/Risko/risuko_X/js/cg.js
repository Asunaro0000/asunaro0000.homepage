// Minimal card gallery with lightbox navigation
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

/**
 * 【ここを編集】グループごとの表示名を個別に設定します
 */
const groupNames = {
  "1": "1～",
  "2": "100～",
  "3": "200～",
};

/**
 * データの管理
 * ここにある全データに自動で「リス子」のaltが付与されます
 */
const items = [
 { src: './images/1-1.webp', title: '木漏れ日のひるね', tags: ['森', '木漏れ日', '日常', '昼寝'],
  caption:
`#1
リス子だよ！🐿️️️
木漏れ日があったかくて、
しっぽがふわふわで…そのまま寝ちゃった。🌿✨

#しっぽ貸します #森の休憩所`
},
{ src: './images/1-2.webp', title: '冷めないうちに', tags: ['日常', 'コーヒー', '冬', '休憩'],
  caption:
`#2
リス子だよ！🐿️️️
スズ子は急いでるみたい。
リス子は急がない。
だってコーヒーが冷めちゃうから。☕❄️

#一口休憩 #冬のひととき`
},
{ src: './images/1-3.webp', title: '散歩の道しるべ', tags: ['日常', '秋', '散歩', '寄り道'],
  caption:
`#3
リス子だよ！🐿️️️
リス子は前を向いて、スズ子は周りを見てる。
「こっち楽しそう」
その一言で、今日の道が決まる。🍁 
#散歩が本編 #寄り道は正義`
},
{ src: './images/1-4.webp', title: '月夜の探検', tags: ['日常', '月夜', 'ファンタジー', '冒険'],
  caption:
`#4
リス子だよ！🐿️️️
ちょっとだけドキドキするけど、やめない。
ちょっとだけ高いけど、たのしい。
だから今日も、この道をえらんじゃう。🌙 
#ワクワク優先  #森のバランス感覚`
},
{ src: './images/1-5.webp', title: '森のオーディション', tags: ['森', '音楽', '動物', '笛'],
  caption:
`#5
リス子だよ！🐿️️️
笛をふいたら、タヌキが真顔で聞いてた。
うん、今日は合格っぽい。 
#森の演奏会  #森の審査員`
},
{ src: './images/1-6.webp', title: '二人のアンサンブル', tags: ['森', '音楽', '楽器', '協力'],
  caption:
`#6
リス子だよ！🐿️️️
走る係と、ひく係です。 
#走る音と弦の音 #森のチームワーク`
},
{ src: './images/1-7.webp', title: 'スズ子の旋律', tags: ['森', '音楽', '動物', '真剣'],
  caption:
`#7
スズ子だよ。🤍
静かに息を入れて、吹いてみた。
タヌキの顔、動かない。
#森の演奏会 #森の審査員`
},
{ src: './images/1-8.webp', title: '演奏のあとに', tags: ['森', '友情', '動物', '交流'],
  caption:
`#8
リス子とスズ子。それから、たぬき。
笛の音のあと、いつのまにか並んで座ってた。
#森の合格サイン  #音のあとの関係`
},
{ src: './images/1-9.webp', title: 'お菓子選び', tags: ['日常', 'お菓子', '食べ物', '幸せ'],
  caption:
`#9
リス子だよ！🐿️️
お菓子タイム！🍪✨
#先着順 #甘いもの正義`
},
{ src: './images/1-10.webp', title: '冬のバーガー', tags: ['冬', '食べ物', '冬ファッション', '団らん'],
  caption:
`#10
リス子だよ！🐿️️
寒い日は、くっついて食べるのが正解なんだよ🍔❄️ 
#冬の知恵 #あったかい時間`
},
{ src: './images/1-11.webp', title: '練習の成果', tags: ['森', '音楽', '冬', '努力'],
  caption:
`#11
リス子だよ！🐿️️️
ほっぺた赤くして、ふー。
#がんばるリス子  #笛は気分次第  #ほっこりの森`
},
{ src: './images/1-12.webp', title: '凍った川の恵み', tags: ['冬', '川', '生活', '優しさ'],
  caption:
`#12
川は凍っちゃったけど、気持ちは止まらない。
#冬のやさしさ #森のくらし`
},
{ src: './images/1-13.webp', title: '川べりの休息', tags: ['川', '日常', 'リラックス', 'のんびり'],
  caption:
`#13
リス子だよ!🐿️️️
川の音、気持ちいいね。
#ゆっくり時間 #足ぷらぷら`
},
{ src: './images/1-14.webp', title: 'ミッション完了', tags: ['日常', '川', '達成感', 'カワウソ'],
  caption:
`#14
リス子だよ!🐿️️️
ミッション、コンプリート!
#森のひととき    #やさしい達成`
},
{ src: './images/1-15.webp', title: '至福のティータイム', tags: ['室内', '紅茶', '冬', '休息'],
  caption:
`#15
リス子だよ！🐿️️️
静かな部屋に、いい紅茶。
#冬の部屋  #動かない選択`
},
{ src: './images/1-16.webp', title: 'クリスマス待機', tags: ['冬', 'クリスマス', 'ケーキ', '楽しみ'],
  caption:
`#16
リス子だよ！🐿️️️
部屋はすっかりクリスマス。
#カウントダウン #待つのもイベント`
},
{ src: './images/1-17.webp', title: '森の太鼓', tags: ['森', '音楽', '動物', '太鼓'],
  caption:
`#17
リス子だよ！🐿️️️
太鼓の練習、開始！
#森の仲間  #即席バンド`
},
{ src: './images/1-18.webp', title: 'タヌキの盛り上げ', tags: ['森', '音楽', '動物', '賑やか'],
  caption:
`#18
リス子だよ！🐿️️️
太鼓の練習してたら、たぬきさんが一番テンション高かった🥁
#盛り上がり係  #主役交代`
},
{ src: './images/1-19.webp', title: 'クッキーの香り', tags: ['冬', 'クリスマス', 'クッキー', '幸せ'],
  caption:
`#19
リス子だよ！🐿️️
メリークッキークリスマス！🍪
#Merry Christmas  #焼きたての幸せ`
},
{ src: './images/1-20.webp', title: '星降る夜', tags: ['冬', 'クリスマス', '星空', 'ファンタジー'],
  caption:
`#20
リス子だよ！🐿️️
聖なる夜を、ひとっ跳び。
#HolyNight #聖なる森`
},
{ src: './images/1-21.webp', title: '森のサンタ', tags: ['冬', 'クリスマス', 'サンタ', '配達'],
  caption:
`#21
リス子だよ！🐿️️
サンタさんは空、わたしは森担当です🎄
#森のサンタ  #しっぽ揺らして配達中`
},
{ src: './images/1-22.webp', title: 'スズ子の見守り', tags: ['冬', 'クリスマス', '友情', '夜道'],
  caption:
`#22
スズ子だよ！
リス子ちゃん、先に行っちゃった。
#森の配達 #見つからない美学`
},
{ src: './images/1-23.webp', title: '配達のあとに', tags: ['冬', 'クリスマス', '睡眠', '満足'],
  caption:
`#23
リス子だよ！🐿️️
夜の配達、がんばりすぎた。ねむい。
#夜勤明け #ねむいけど幸せ`
},
{ src: './images/1-24.webp', title: '贈りもの', tags: ['冬', 'クリスマス', 'プレゼント', '友情'],
  caption:
`#24
リス子だよ！🐿️️
スズ子からのプレゼント。
#森のクリスマス  #冬のおはなし`
},
{ src: './images/1-25.webp', title: '釣りの極意', tags: ['川', '釣り', '日常', '集中'],
  caption:
`#25
リス子だよ！🐿️️
一番大事なのは姿勢。
#姿勢が9割 #釣りの哲学`
},
{ src: './images/1-26.webp', title: 'カワウソの視点', tags: ['川', '釣り', '動物', '知恵'],
  caption:
`#26
リス子だよ！🐿️️
わたしたちは水面を見てる。カワウソは、流れを見てる。
#森の知恵  #時間の厚み`
},
{ src: './images/1-27.webp', title: '釣果の差', tags: ['川', '釣り', '日常', '結果'],
  caption:
`#27
リス子だよ！🐿️️
同じ川、同じ時間。結果だけが違いました。
#才能の差 #コンビの日常`
},
{ src: './images/1-28.webp', title: '森のルール', tags: ['森', '日常', '動物', '心理'],
  caption:
`#28
リス子だよ！🐿️️
あげる側が前のめりだと、受け取る側は様子を見るもよう。
#森のルール #前のめり注意`
},
{ src: './images/1-29.webp', title: '雪の日のウサギ', tags: ['冬', '雪', 'ウサギ', '距離感'],
  caption:
`#29
スズ子だよ。うさぎが……かわいい。
#スズ子の距離感  #追わない美学`
},
{ src: './images/1-30.webp', title: '風景に溶ける', tags: ['冬', '雪', '静寂', '観察'],
  caption:
`#30
スズ子だよ。同じフォーム。同じ高さ。
#スズ子の距離感  #風景になった日`
},
{ src: './images/1-31.webp', title: '森の集まり', tags: ['森', '友情', '交流', 'ケモミミ'],
  caption:
`#31
リス子とスズ子だよ！🐿️️
今日は森の集まりにおじゃまするよ！
#ケモミミ・立ち耳垂れ耳企画 #森の交流会`
},
{ src: './images/1-32.webp', title: '下請け監督', tags: ['森', '日常', '動物', '役割'],
  caption:
`#32
リス子だよ！🐿️️  
わたしたちは足。上は監督さん。 
#下請けポジション  #森の役職`
},
{ src: './images/1-33.webp', title: '森の乗り物', tags: ['森', '日常', '動物', '移動'],
  caption:
`#33
リス子だよ！🐿️️
運転中。足、貸してます。 
#森の乗り物 #本日も通常運転`
},
{ src: './images/1-34.webp', title: '飛べる鶏', tags: ['森', '驚き', '動物', '日常'],
  caption:
`#34
リス子だよ！🐿️️
鶏「飛べます」スズ子「聞いてない！」
#森の本気  #平和な混乱`
},
{ src: './images/1-35.webp', title: '雪と鶏', tags: ['冬', '雪', '動物', '静か'],
  caption:
`#35
リス子だよ！🐿️️
雪は静か。鶏はぴったり。
#森の空気  #半径確保`
},
{ src: './images/1-36.webp', title: '内緒の目撃', tags: ['森', '日常', '動物', '秘密'],
  caption:
`#36
リス子だよ！🐿️️
いまスズ子の後ろ。理由？内緒だよ。
#鹿さん黙ってて  #森の目撃者`
},
{ src: './images/1-37.webp', title: '甘いものの誘惑', tags: ['日常', 'お菓子', '猫', '我慢'],
  caption:
`#37
スズ子だよ。私はお菓子に真剣。猫は尻尾に本気。
#優先順位問題  #ちょっと待って`
},
{ src: './images/1-38.webp', title: '年末のご挨拶', tags: ['冬', '正月', '馬', '挨拶'],
  caption:
`#38
リス子だよ！🐿️️
雪の神社まで、年末のごあいさつ便。
#AIart #また来年`
},
{ src: './images/1-39.webp', title: '森ともち', tags: ['冬', '正月', 'もち', '2026'],
  caption:
`#39
リス子だよ！🐿️️
新年も、持ちネタは変わりません。
#新年のごあいさつ #リス子だよ`
},
{ src: './images/1-40.webp', title: '初詣のしっぽ', tags: ['冬', '正月', '神社', '防寒'],
  caption:
`#40
スズ子だよ。初詣、行ってきました。
#新年のごあいさつ #スズ子`
},
{ src: './images/1-41.webp', title: '大吉スマイル', tags: ['冬', '正月', 'おみくじ', '笑顔'],
  caption:
`#41
リス子だよ！🐿️️
大吉ひいた。笑顔、配布中。
#頬袋スマイル  #森の縁起物`
},
{ src: './images/1-42.webp', title: 'みかん頬袋', tags: ['冬', '正月', 'みかん', '食いしん坊'],
  caption:
`#42
リス子だよ！🐿️️
口の中みかんでぱんぱん。
#貯め込み癖  #理性より習性`
},
{ src: './images/1-43.webp', title: '測られた距離', tags: ['森', '動物', '日常', '観察'],
  caption:
`#43
リス子だよ！🐿️️
距離は測れた。気配も読めた。許可は、出なかった。
#気分屋さん #だがそれがいい`
},
{ src: './images/1-44.webp', title: '羊ヒーター', tags: ['冬', '羊', '日常', 'あったかい'],
  caption:
`#44
リス子だよ！🐿️️
森の防寒具ランキング、今年の1位は羊。
#天然ヒーター  #これは反則`
},
{ src: './images/1-45.webp', title: '猫ポーズ挑戦', tags: ['森', '猫', '日常', '挑戦'],
  caption:
`#45
リス子だよ！🐿️️
猫の前で猫ポーズ。
#無言の圧  #森は厳しい`
},
{ src: './images/1-46.webp', title: '森の達人', tags: ['川', '釣り', '友情', 'チームワーク'],
  caption:
`#46
リス子だよ！🐿️️
釣る人、読む人、支える人。
#森の達人たち #わたしたちの戦いはこれからだ`
},
{ src: './images/1-47.webp', title: '釣り疲れ', tags: ['川', '睡眠', '本', '夢'],
  caption:
`#47
おはようございます。☀️ リス子だよ！
きっと、釣りをがんばりすぎた。
#がんばり屋さん  #森のひととき`
},
{ src: './images/1-48.webp', title: '夢の本番', tags: ['室内', '睡眠', '夜', '夢'],
  caption:
`#48
リス子だよ！🐿️️
起きてるあいだは練習中。眠ったら本番。
#夢の表彰台 #夜のひととき`
},
{ src: './images/1-49.webp', title: 'リンゴの数', tags: ['森', 'リンゴ', '食べ物', 'つまみ食い'],
  caption:
`#49
リス子だよ！🐿️️
リンゴは数えない。数えると、だいたい減る。
#森あるある  #つまみ食い疑惑`
},
{ src: './images/1-50.webp', title: 'ウサギとニンジン', tags: ['森', 'ウサギ', 'ニンジン', '笑顔'],
  caption:
`#50
リス子だよ！🐿️️
ウサギに餌槍をしようとしているところ。
#にこにこ作戦  #笑顔の圧`
},
{ src: './images/1-51.webp', title: 'ヤギの期待', tags: ['森', 'ヤギ', '食べ物', '無言'],
  caption:
`#51
リス子だよ！🐿️️
食料は軽い。ヤギの期待は重い。
#沈黙の圧力  #あげるとは言ってない`
},
{ src: './images/1-52.webp', title: 'ぬくぬく協定', tags: ['冬', '猫', '膝の上', '日常'],
  caption:
`#52
リス子だよ！🐿️️
猫は膝の上でぬくぬく。
#需要と供給 #ぬくぬく協定`
},
{ src: './images/1-53.webp', title: '甘い会話', tags: ['冬', 'おやつ', '日常', '会話'],
  caption:
`#53
リス子だよ！🐿️️
「まだかな？」「もうちょっと！」
#甘さは会話  #冬のおやつ会議`
},
{ src: './images/1-54.webp', title: '上下の世界', tags: ['室内', 'お茶会', 'ドラマ', '日常'],
  caption:
`#54
リス子だよ！🐿️️
上はお茶会。下は、恋愛ドラマ。
#本編は足元  #見えてない物語`
},
{ src: './images/1-55.webp', title: 'ぬくぬく誤認', tags: ['冬', 'ヤギ', '日常', '困惑'],
  caption:
`#55
リス子だよ！🐿️️
……でもヤギさんは、そういう役じゃなかったはず。
#困惑ヤギ #ぬくぬく誤認`
},
{ src: './images/1-56.webp', title: '森の温もり', tags: ['森', '食べ物', '日常', '温かい'],
  caption:
`#56
リス子だよ！🐿️️
取れたては、冷たくない。あったかくて、やさしい味。 
#森の恵み #ぬくもり補給`
},
{ src: './images/1-57.webp', title: '小屋の秘密', tags: ['森', 'ヤギ', '睡眠', '友情'],
  caption:
`#57
リス子だよ！🐿️️
スズ子、仕事中いないと思ったら小屋の中。 
#頭隠して尻尾隠さず  #任務中断`
},
{ src: './images/1-58.webp', title: '森のコーヒー', tags: ['冬', 'コーヒー', '日常', '一杯'],
  caption:
`#58
リス子だよ！🐿️️
寒い日に効く、この一杯。
#選ばれる一杯 #待たせました森のコーヒー`
},
{ src: './images/1-59.webp', title: '舞台の準備', tags: ['山', '音楽', 'ファンタジー', '景色'],
  caption:
`#59
リス子だよ！🐿️️
壮大な山、笛、鹿。役者はそろった。
#開幕前の山場 #ファンタジー控室`
},
{ src: './images/1-60.webp', title: '吟遊詩人の役', tags: ['山', '音楽', 'ファンタジー', '吟遊詩人'],
  caption:
`#60
リス子だよ！🐿️️
今日の役割は、吟遊詩人。世界にBGMをつけていく。
#ファンタジー準備中  #お楽しみに`
},
{ src: './images/1-61.webp', title: '森のデュオ', tags: ['森', '音楽', '動物', '驚き'],
  caption:
`#61
リス子だよ！🐿️️
タヌキが歌っているだけでも事件なのに。
#森のデュオ #ForestUnit`
},
{ src: './images/1-62.webp', title: 'タヌキキャンバス', tags: ['森', 'アート', 'タヌキ', '日常'],
  caption:
`#62
リス子だよ！🐿️️
描けるものがあれば描く。それがタヌキでも。
#タヌキキャンバス #表現の自由`
},
{ src: './images/1-63.webp', title: '招待制じゃないピクニック', tags: ['森', 'ピクニック', '日常', '交流'],
  caption:
`#63
リス子だよ！🐿️️
森のピクニックは、招待制ではありません。
#気づいたら仲間 #森の日常`
},
{ src: './images/1-64.webp', title: '実力派キッチン', tags: ['室内', '料理', 'ネズミ', '評価'],
  caption:
`#64
リス子だよ！🐿️️
料理の評価は言葉より体型。
#満点ボディ #実力派キッチン`
},
{ src: './images/1-65.webp', title: '焚き火ごはん', tags: ['森', '焚き火', 'タヌキ', '期待'],
  caption:
`#65
リス子だよ！🐿️️️
炎の料理人タヌキ、開幕。🔥
#焚き火ごはん #タヌキの奮闘記`
},
{ src: './images/1-66.webp', title: 'リンゴチャレンジ', tags: ['日常', 'リンゴ', '遊び', '平和'],
  caption:
`#66
リス子だよ！🐿️️️
落としたら負け。勝ったらおやつ。 
#リンゴチャレンジ  #今日も平和`
},
{ src: './images/1-67.webp', title: '背徳のアルデンテ', tags: ['室内', 'パスタ', '食べ物', '幸せ'],
  caption:
`#67
リス子だよ！🐿️️
フォークが止まらないこの背徳感。
#リス子の頬張る幸せ #背徳のアルデンテ`
},
{ src: './images/1-68.webp', title: '食後のリス', tags: ['室内', '睡眠', 'パスタ', '満足'],
  caption:
`#68
リス子だよ！🐿️️️
スズ子自慢のナポリタン、完食。
#リス子の本望 #ナポリタンの余韻`
},
{ src: './images/1-69.webp', title: 'お菓子作り失敗', tags: ['室内', 'お菓子作り', '日常', '失敗'],
  caption:
`#69
リス子だよ！🐿️️
お菓子作り、失敗。 焼きすぎた。
#鼻先メモ #甘さだけ一人前`
},
{ src: './images/1-70.webp', title: '楽しそうな顔', tags: ['森', '音楽', 'タヌキ', 'のんびり'],
  caption:
`#70
リス子だよ！🐿️️
参加条件は、楽しそうな顔。 
#音が出ればOK  #のんびり時間`
},
{ src: './images/1-71.webp', title: '街の味わい', tags: ['街', '祭り', '狐', '観光'],
  caption:
`#71
おはようございます。☀️ リス子だよ！
狐さんと一緒に、街を味わい中。
#お祭り気分 #街歩きコンビ`
},
{ src: './images/1-72.webp', title: 'モフモフの魔法', tags: ['日常', 'リラックス', 'モフモフ', '幸せ'],
  caption:
`#72
リス子だよ！🐿️️
ふかふかの特等席を見つけちゃった。
 #至福のひととき #モフモフの魔法`
},
{ src: './images/1-73.webp', title: '新しい家族', tags: ['室内', '赤ちゃん', 'ボディーガード', '可愛い'],
  caption:
`#73
リス子だよ！🐿️️️
みてみて、わが家に真っ白な赤ちゃんがやってきたよ✨
#今日の癒し枠 #守護獣リス子`
},
 { src: './images/1-74.webp', title: '森の審査員', tags: ['森', 'タヌキ', '緊張感', '無言'],
  caption:
`#74
リス子だよ！🐿️️️
タヌキ審査員、無言。これは…合格か、保留か。
#森の審査員 #現場の緊張感`
},
 { src: './images/1-75.webp', title: '赤ちゃんごっこ', tags: ['日常', 'ベビーカー', 'ごっこ遊び', 'お世話'],
  caption:
`#75
ベビーカーを発掘しちゃったから、突然の赤ちゃんごっこスタート！ 
#鳴り響くガラガラ #リス子は大喜び`
},
 { src: './images/1-76.webp', title: '雪山登山', tags: ['山', '雪山', '登山', '絶景'],
  caption:
`#76
リス子だよ！
今日は雪山登山！双眼鏡で遠くを眺めてたら。
#絶景スポット #わくわく探検隊`
},
 { src: './images/1-77.webp', title: '白ヒゲ選手権', tags: ['冬', '日常', '飲み物', '勝負'],
  caption:
`#77
リス子だよ！🐿️️
一気に飲むと頭がキーンとするけど。
#冬のガチンコ勝負 #白ヒゲ選手権`
},
 { src: './images/1-78.webp', title: '水辺のダンス', tags: ['川', '白鳥', 'ダンス', '魔法'],
  caption:
`#78
リス子だよ！🐿️️️
白鳥さんと一緒に水辺でダンス！
#ぴょんの時間 #ごきげん散歩`
},
 { src: './images/1-79.webp', title: 'ゆるふわコンビ', tags: ['川', '白鳥', '日常', '可愛い'],
  caption:
`#79
リス子だよ！ 🐿️️
真っ白でフワフワだけど、くちばしが平べったくて可愛い！
#どっちでも可愛い #ゆるふわコンビ`
},
 { src: './images/1-80.webp', title: '流れ星にお願い', tags: ['夜', '星空', '願い事', '食べ物'],
  caption:
`#80
リス子だよ！🐿️️
星が流れる瞬間に「どんぐり・クルミ・ピスタチオー！」
#流れ星にお願い #食いしん坊リスト`
},
 { src: './images/1-81.webp', title: '幸せのお裾分け', tags: ['日常', 'リス', 'ドーナツ', '幸せ'],
  caption:
`#81
リス子だよ！🐿️️
リス仲間も集まって、もぐもぐが止まらない！
#幸せのお裾分け #ドーナツの穴はゼロキロカロリー`
},
 { src: './images/1-82.webp', title: '夜のピクニック', tags: ['冬', '夜', 'ポップコーン', '日常'],
  caption:
`#82
リス子だよ！🐿️️
「星が綺麗だね」って言う前に、ポップコーンがなくなっちゃいそう！
#夜のピクニック #ノンストップもぐもぐ`
},
 { src: './images/1-83.webp', title: 'ふわふわメロメロ', tags: ['日常', 'ウサギ', 'ブラッシング', 'モフモフ'],
  caption:
`#83
リス子だよ！🐿️️️
うさぎさんのブラッシング完了！
#うさぎ好きさんと繋がりたい #今日のうちの子`
},
 { src: './images/1-84.webp', title: '屋台の誘惑', tags: ['祭り', '屋台', 'カステラ', '食いしん坊'],
  caption:
`#84
リス子だよ！🐿️️️
甘いカステラに、ジューシーなお肉の匂い……。
#お腹ぺこぺこ #屋台巡り`
},
  { src: './images/1-85.webp', title: '羊と魔法の国へ', tags: ['山', '羊', 'メルヘン', 'ファンタジー'],
    caption:
`#85
スズ子だよ。
羊さんたちと一緒に、魔法の国へお出かけしてくるね。
#ふわふわメルヘン #ゆめかわドリームランド`
  },
  { src: './images/1-86.webp', title: 'ふわふわお泊り会', tags: ['室内', 'お泊まり', 'パジャマ', '友情'],
    caption:
`#86
リス子だよ！🐿️
スズ子とお泊り会！ふわふわのパジャマで朝までお喋り。
#ふわもこ部 #夢でも女子会`
  },
  { src: './images/1-87.webp', title: 'リスの夢日記', tags: ['草原', '羊', 'メルヘン', '幸せ'],
    caption:
`#87
リス子だよ！🐿️️
羊さんと一緒にパステルカラーの雲を追いかけっこ！
#メルヘンの住人 #リス子の夢日記`
  },
  { src: './images/1-88.webp', title: '巨大毛糸会議', tags: ['室内', '猫', '毛糸', '会議'],
    caption:
`#88
リス子だよ！🐿️
巨大毛糸を前に「解く派」と「守る派」で会議中！
#赤い誘惑 #肉球ディフェンス`
  },
  { src: './images/1-89.webp', title: 'リスの冒険メイキング', tags: ['日常', 'イラスト', '制作過程', 'HP'],
    caption:
`#89
リス子だよ！🐿️
100枚以上のストーリーボードで描く、リスさんの大冒険。
#HPでメイキング公開中 #Menu_processより`
  },
  { src: './images/1-90.webp', title: 'フクロウの無茶振り', tags: ['森', 'フクロウ', '手紙', '困惑'],
    caption:
`#90
リス子だよ！🐿️
フクロウさん、白い羽根を渡されても全然ヒントにならないよ！
#フクロウの無茶振り #ノーヒント攻略`
  },
  { src: './images/1-91.webp', title: '光の魔法とおめかし', tags: ['日常', '光', 'おめかし', '雰囲気'],
    caption:
`#91
リス子だよ！🐿️
今日はいつもと違う atmosphere で描いてもらったの。
#おめかしリス子  #光の魔法`
  },
  { src: './images/1-92.webp', title: '雪夜のランタン', tags: ['冬', '雪', 'ランタン', '睡眠'],
    caption:
`#92
リス子だよ！🐿️
雪の上でもランタンがあればぽかぽか。
#雪の夜 #ランタン의光`
  },
  { src: './images/1-93.webp', title: '冬の熱々肉まん', tags: ['冬', '肉まん', '食べ物', '幸せ'],
    caption:
`#93
リス子だよ！🐿️
蒸したて最高！一口食べれば溢れる肉汁。
#食べ歩きグルメ #肉まん`
  },
  { src: './images/1-94.webp', title: '羊のモコモコ癒やし', tags: ['冬', '羊', '日常', 'モフモフ'],
    caption:
`#94
リス子だよ！🐿️
一家に一台（一頭？）、モコモコの癒やし。
#羊のいる暮らし #もふもふ`
  },
  { src: './images/1-95.webp', title: 'うさぎ包囲網', tags: ['日常', 'ウサギ', '友情', 'モフモフ'],
    caption:
`#95
リス子だよ！🐿️
うさぎさんに囲まれてスズ子もニッコニコ 
#もふもふ包囲網 #可愛いの罠`
  },
  { src: './images/1-96.webp', title: 'かまくらのたぬき', tags: ['冬', '雪', 'かまくら', 'タヌキ'],
    caption:
`#96
リス子だよ！🐿️
かまくらの中で謎のたぬきを捕獲！
#かまくら #たぬき寝入り`
  },
  { src: './images/1-97.webp', title: '白銀の世界へ', tags: ['冬', '雪', '景色', '冒険'],
    caption:
`#97
リス子だよ！🐿️
白銀の世界に到着！空気がひんやりして気持ちいい〜。
#冬の景色 #リス子冒険記`
  },
  { src: './images/1-98.webp', title: '雪見のご馳走', tags: ['冬', '雪', '食べ物', '日常'],
    caption:
`#98
リス子だよ！🐿️
外で食べるご飯って、どうしてこんなに美味しいんだろう！
#冬のご馳走 #リス子`
  },
  { src: './images/1-99.webp', title: '幸せの青い鳥', tags: ['日常', '鳥', '幸運', 'スズ子'],
    caption:
`#99
スズ子だよ！
幸せを運ぶ青い鳥が遊びに来てくれたよ！
#幸せの青い鳥 #RT大歓迎`
  },
  { src: './images/1-100.webp', title: '森の星空と娘さん', tags: ['夜', '星空', '企画', '挨拶'],
    caption:
`#100
リス子だよ！🐿️
こんにちは、ねこのしっぽさん。
#AI色々な綺麗な星空と娘さん #森の星空`
  },
  { src: './images/2-101.webp', title: '夢の巨大綿菓子', tags: ['日常', '綿菓子', '幸せ', 'スズ子'],
    caption:
`#101
スズ子だよ。
ふわふわの大きな綿菓子、独り占めしちゃった！
#夢心地 #至福のひととき`
  },
  { src: './images/2-102.webp', title: '森のファッションショー', tags: ['森', 'ファッション', '花冠', '鳥'],
    caption:
`#102
リス子だよ！🐿️
新しい花冠を作ったんだ！鳥さんたちも褒めてくれて嬉しい。
#ハンドメイド #お花のある暮らし`
  },
  { src: './images/2-103.webp', title: '手のひらのスズメ', tags: ['日常', 'スズメ', '鳥', '友情'],
    caption:
`#103
リス子だよ！🐿️
テラスに可愛いスズメさんが遊びに来てくれたよ！
#野鳥観察 #癒やしの時間`
  },
  { src: './images/2-104.webp', title: '雪原のカラフルアート', tags: ['冬', '雪', 'アート', '鳥'],
    caption:
`#104
リス子だよ！🐿️️
白銀の世界に、オウム君の羽と虹色の筆跡がキラリ。
#冬の彩り #カラフルライフ`
  },
  { src: './images/2-105.webp', title: '滝と白鳥の虹', tags: ['川', '滝', '白鳥', '虹'],
    caption:
`#105
リス子だよ！🐿️️
見てみて！滝のパワーで虹が出たよ。
#大自然の力 #滝の魔法`
  },
  { src: './images/2-106.webp', title: '節分の豆数え', tags: ['日常', '正月', '節分', '食いしん坊'],
    caption:
`#106
リス子だよ！🐿️
お豆を数えてたら、ついつい食べたくなっちゃった！
#節分 #鬼は外福は内`
  },
  { src: './images/2-107.webp', title: 'キツネとピクニック', tags: ['森', 'ピクニック', 'キツネ', '友情'],
    caption:
`#107
リス子だよ！🐿️
森でピクニック中にキツネさんと遭遇！🦊
#青空ピクニック  #スローライフ`
  },
  { src: './images/2-108.webp', title: '橋の向こうの景色', tags: ['空', '橋', '絶景', '冒険'],
    caption:
`#108
リス子だよ！🐿️️
遠くに見えるあの大きな橋の向こうには。
#絶景スポット #冒険の予感`
  },
  { src: './images/2-109.webp', title: '秘密基地のおやつ', tags: ['森', '秘密基地', 'おやつ', 'ネズミ'],
    caption:
`#109
リス子だよ！🐿️️
密基地の特等席で、小さなネズミさんと日向ぼっこ。 
#森の遊び場  #木のぬくもり`
  },
  { src: './images/2-110.webp', title: '雨の日のお散歩', tags: ['雨', '散歩', '傘', 'カエル'],
    caption:
`#110
リス子だよ！🐿️️
雨の日だって、お気に入りの長靴と傘があれば。
#あめぱしゃ #るんるんお散歩`
  },
  { src: './images/2-111.webp', title: '陽だまりとネズミ', tags: ['日常', '陽だまり', 'ネズミ', 'おやつ'],
    caption:
`#111
リス子だよ！🐿️️ 
日向ぼっこしながらおやつタイム。🍎
#ひょっこりねずみ  #陽だまり의午後`
  },
  { src: './images/2-112.webp', title: '階段のステージ', tags: ['日常', '階段', '音楽', 'リズム'],
    caption:
`#112
リス子だよ！🐿️️
坂道の階段は天然のステージ！しっぽを揺らしながら。
#ほっぺた膨らませ隊  #しっぽがメトロノーム`
  },
  { src: './images/2-113.webp', title: '雪山のポテト会', tags: ['山', '雪', 'ジャガイモ', '食べ物'],
    caption:
`#113
リス子だよ！🐿️️
雪の中で焼くジャガイモは最高！あつあつ、ホクホクだよ！
 #雪の日のごちそう #森のポテトパーティー開催中`
  },
  { src: './images/2-114.webp', title: '雪景色のラーメン', tags: ['冬', '雪', 'ラーメン', '鳥'],
    caption:
`#114
リス子だよ！🐿️️
雪の中のラーメンタイム！ふーふーして食べるのが最高。 
#ラーメン大好き  #アヒルも狙う逸品`
  },
  { src: './images/2-115.webp', title: 'ビタミンカラーの午後', tags: ['日常', '果物', 'リラックス', '鳥'],
    caption:
`#115
スズ子だよ！
カゴ一杯のビタミンをどうぞ🍋 
#お疲れ様です #ビタミンカラーで元気に`
  },
  { src: './images/2-116.webp', title: '森のリス寄せの笛', tags: ['森', '笛', '音楽', 'リス'],
    caption:
`#116
リス子だよ！🐿️️
スズ子ちゃんの吹くピーッ！っていう音。
#森の笛吹き隊長  #リス寄せの笛`
  },
  { src: './images/2-117.webp', title: '絶景ハンバーガー', tags: ['山', 'ハンバーガー', '絶景', '食べ物'],
    caption:
`#117
リス子だよ！🐿️️
この絶景を見ながら食べるハンバーガーは、格別の味。
#絶景ランチ #ハンバーガー部`
  },
  { src: './images/2-118.webp', title: 'お花畑の蝶々追い', tags: ['草原', '花畑', '蝶', '遊び'],
    caption:
`#118
リス子だよ！🐿️️
スズ子の虫取り網が、青い蝶々さんを追いかけてるよ。
#ゆるふわ冒険 #お花畑`
  },
  { src: './images/2-119.webp', title: 'ペンギンのアイス', tags: ['冬', 'アイス', 'ペンギン', '日常'],
    caption:
`#119
リス子だよ！🐿️️
ペンギンさんが「あーん」ってアイスを差し出してくれてる。
#世界一優しいアイス #冬のあーん祭り`
  },
  { src: './images/2-120.webp', title: '特製トッピングアイス', tags: ['日常', 'アイス', 'お菓子', '幸せ'],
    caption:
`#120
リス子だよ！🐿️️
見てみて！トッピングいっぱいの特製アイスだよ🍦
#スイーツ部 #今日のご褒美`
  },
  { src: './images/2-121.webp', title: 'お城の鐘とアイス', tags: ['街', '城', 'アイス', '音楽'],
    caption:
`#121
リス子だよ！🐿️️
お城の鐘の音に合わせてアイスをペロリ！
#お城のメロディ #ほんわかタイム`
  },
  { src: './images/2-122.webp', title: '蒸籠の床暖房？', tags: ['日常', '朝', '妄想', '生活'],
    caption:
`#122
おはようございます。☀️
リス子だよ！この蒸籠、実は床暖房がわりに。
#あったかライフハック #妄想中`
  },
  { src: './images/2-123.webp', title: 'ポップコーン包囲網', tags: ['日常', 'ポップコーン', '鳥', 'おねだり'],
    caption:
`#123
リス子だよ！🐿️️
ポップコーンを狙う包囲網が完成しちゃったよ！
#スズメの偵察隊 #リスのおねだり`
  },
  { src: './images/2-124.webp', title: 'おねだりリスの偵察', tags: ['日常', 'ポップコーン', 'リス', '友情'],
    caption:
`#124
リス子だよ！🐿️️
スズメさんは空から、リスさんは膝から！
#スズメの偵察隊 #リスのおねだり`
  }
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

function getGroupId(src) {
  const filename = src.split('/').pop();
  return filename.split('-')[0];
}

/**
 * 【修正版】ギャラリー描画
 * alt属性にタイトル、タグ、キャプションを統合して付与します。
 * 画面上のデザインは変更せず、検索エンジンにのみ情報を伝えます。
 */
function renderGallery(groupId) {
  currentGroupItems = items.filter(it => getGroupId(it.src) === groupId);

  gallery.innerHTML = currentGroupItems.map((it, i) => {
    // タグを文字列化 (例: "森, 日常, 冬")
    const tagsStr = it.tags ? it.tags.join(", ") : "";
    
    // SEO用のaltテキストを構築
    // 「キャラ名 - タイトル | タグ | キャプション冒頭」の順で情報を濃縮
    const seoAlt = `黄色のマフラーを巻いたリスの女の子 リス子 - ${it.title || '森の物語'} ${tagsStr ? '| Tags: ' + tagsStr : ''} | ${it.caption.substring(0, 40).replace(/\n/g, ' ')}...`;

    return `
      <figure class="card" data-i="${i}" tabindex="0" aria-label="${it.title || 'リス子'}">
        <div class="card__imgwrap">
          <img src="${it.src}" 
               alt="${seoAlt}" 
               loading="lazy">
        </div>
        <figcaption class="card__meta">
          <h3 class="card__title">${it.title || 'リス子'}</h3>
          <p class="card__caption">${it.caption}</p>
        </figcaption>
      </figure>
    `;
  }).join("");
}

// フィルタボタン設定（中略：既存通り）
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

// ライトボックス関連（修正：alt付与）
function openLB(i){
  idx = (i + currentGroupItems.length) % currentGroupItems.length;
  const it = currentGroupItems[idx];
  lbImg.src = it.src;
  // 拡大画面でもしっかり属性を記述
  lbImg.alt = `黄色のマフラーを巻いたリスの女の子 リス子: ${it.title || '森の日常'}`;
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

// イベントリスナー（既存通り）
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
lbCaption.addEventListener("click", (e) => { e.stopPropagation(); });

/**
 * 【修正版】Google SEO対策
 * 構造化データの keywords と description にタグを反映させます。
 */
function injectGoogleSEOData() {
    const pageDescription = "黄色のマフラーがトレードマーク。しっぽがふわふわなリスの女の子「リス子」の毎日を描くアートギャラリー。";

    const ldJson = {
        "@context": "https://schema.org",
        "@type": "ImageGallery",
        "name": "リス子の森ギャラリー - 黄色のマフラーを巻いたリスの女の子",
        "description": pageDescription,
        "author": {
            "@type": "Person",
            "name": "Asunaro Works"
        },
        "hasPart": items.map(it => ({
            "@type": "ImageObject",
            "name": `リス子: ${it.title || '森の物語'}`,
            "description": it.caption.replace(/\n/g, ' '),
            "keywords": it.tags ? it.tags.join(", ") : "リス子, AIart, 森", // タグがあれば優先使用
            "contentUrl": window.location.origin + window.location.pathname.replace('index.html', '') + it.src.replace('./', '')
        }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(ldJson);
    document.head.appendChild(script);

    // noscript内にもタグ情報を隠しテキストとして含める
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<div style="display:none;"><h2>リス子 作品目録</h2><ul>` + 
        items.map(it => `<li>リス子 - ${it.title} [${it.tags ? it.tags.join(",") : ""}] : ${it.caption.substring(0, 50)}</li>`).join('') + 
        `</ul></div>`;
    document.body.appendChild(noscript);
}

// 実行
setupFilters();
injectGoogleSEOData();