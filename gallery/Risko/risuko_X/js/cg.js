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
 { src: './images/1-1.webp', title: '',
  caption:
`#1
リス子だよ！🐿️️️
木漏れ日があったかくて、
しっぽがふわふわで…そのまま寝ちゃった。🌿✨

#しっぽ貸します #森の休憩所`
},

{ src: './images/1-2.webp', title: '',
  caption:
`#2
リス子だよ！🐿️️️
スズ子は急いでるみたい。
リス子は急がない。
だってコーヒーが冷めちゃうから。☕❄️

#一口休憩 #冬のひととき`
},
{ src: './images/1-3.webp', title: '',
  caption:
`#3
リス子だよ！🐿️️️

リス子は前を向いて、スズ子は周りを見てる。
「こっち楽しそう」
その一言で、今日の道が決まる。🍁 

#散歩が本編 #寄り道は正義`
},
{ src: './images/1-4.webp', title: '',
  caption:
`#4
リス子だよ！🐿️️️
ちょっとだけドキドキするけど、やめない。
ちょっとだけ高いけど、たのしい。
だから今日も、この道をえらんじゃう。🌙 

#ワクワク優先  #森のバランス感覚`
},
{ src: './images/1-5.webp', title: '',
  caption:
`#5
リス子だよ！🐿️️️
笛をふいたら、タヌキが真顔で聞いてた。
うん、今日は合格っぽい。 

#森の演奏会  #森の審査員`
},
{ src: './images/1-6.webp', title: '',
  caption:
`#6
リス子だよ！🐿️️️
ダダダッ、シャラン♪
走る係と、ひく係です。 

#走る音と弦の音 #森のチームワーク`
},
{ src: './images/1-7.webp', title: '',
  caption:
`#7
スズ子だよ。🤍
静かに息を入れて、吹いてみた。
タヌキの顔、動かない。

リス子は「合格っぽい」って言うけど、
私は最後まで様子を見る。

#森の演奏会 #森の審査員`
},

{ src: './images/1-8.webp', title: '',
  caption:
`#8
リス子とスズ子。
それから、たぬき。

笛の音のあと、
いつのまにか並んで座ってた。
仲良くなるのって、たぶんこんな感じ。 

#森の合格サイン  #音のあとの関係`
},

{ src: './images/1-9.webp', title: '',
  caption:
`#9
リス子だよ！🐿️️
お菓子タイム！🍪✨
今ならまだ、選び放題だよ！ 

#先着順 #甘いもの正義`
},

{ src: './images/1-10.webp', title: '',
  caption:
`#10
リス子だよ！🐿️️
寒い日は、
くっついて食べるのが正解なんだよ🍔❄️ 

#冬の知恵 #あったかい時間`
},

{ src: './images/1-11.webp', title: '',
  caption:
`#11
リス子だよ！🐿️️️
ほっぺた赤くして、
ふー。
音は、これから。 

#がんばるリス子  #笛は気分次第  #ほっこりの森`
},

{ src: './images/1-12.webp', title: '',
  caption:
`#12
川は凍っちゃったけど、
気持ちは止まらない。
今日の魚は、
ちゃんと用意するよ。 

#冬のやさしさ #森のくらし`
},
{ src: './images/1-13.webp', title: '',
  caption:
`#13
リス子だよ!🐿️️️
川の音、気持ちいいね。
カワウソさん、まっててね。
今は、のんびりする時間。 

#ゆっくり時間 #足ぷらぷら`
},

{ src: './images/1-14.webp', title: '',
  caption:
`#14
リス子だよ!🐿️️️
ミッション、コンプリート!
カワウソさん、見てた?
ちゃんとできました。 

#森のひととき    #やさしい達成`
},

{ src: './images/1-15.webp', title: '',
  caption:
`#15
リス子だよ！🐿️️️
静かな部屋に、
いい紅茶。
これはもう、動かない。

#冬の部屋  #動かない選択`
},

{ src: './images/1-16.webp', title: '',
  caption:
`#16
リス子だよ！🐿️️️
部屋はすっかりクリスマス。
ケーキだけ、
まだ来ない。 

#カウントダウン #待つのもイベント`
},

{ src: './images/1-17.webp', title: '',
  caption:
`#17
リス子だよ！🐿️️️
太鼓の練習、開始！
たぬきさんはタンバリン担当だよ✨🥁

#森の仲間  #即席バンド`
},

{ src: './images/1-18.webp', title: '',
  caption:
`#18
リス子だよ！🐿️️️
太鼓の練習してたら、
たぬきさんが一番テンション高かった🥁✨

#盛り上がり係  #主役交代`
},
{ src: './images/1-19.webp', title: '',
  caption:
`#19
リス子だよ！🐿️️
メリークッキークリスマス！🍪
冬の光と、焼きたての匂い。
クリスマスって、こういう時間だね🎄

#Merry Christmas  #焼きたての幸せ`
},

{ src: './images/1-20.webp', title: '',
  caption:
`#20
リス子だよ！🐿️️
聖なる夜を、ひとっ跳び。
星の光、つかまえにいくよ✨🎄 

#HolyNight #聖なる森`
},

{ src: './images/1-21.webp', title: '',
  caption:
`#21
リス子だよ！🐿️️
サンタさんは空、
わたしは森担当です🎄🌲 

#森のサンタ  #しっぽ揺らして配達中`
},

{ src: './images/1-22.webp', title: '',
  caption:
`#22
スズ子だよ！
リス子ちゃん、先に行っちゃった。
見つからないほうが、
うまくいってる証拠。

#森の配達 #見つからない美学`
},

{ src: './images/1-23.webp', title: '',
  caption:
`#23
リス子だよ！🐿️️
夜の配達、がんばりすぎた。
ねむい。でも、満足。

#夜勤明け #ねむいけど幸せ`
},

{ src: './images/1-24.webp', title: '',
  caption:
`#24
リス子だよ！🐿️️
スズ子からのプレゼント。
クリスマス、ちゃんと届きました🎄 

#森のクリスマス  #冬のおはなし`
},
{ src: './images/1-25.webp', title: '',
  caption:
`#25
リス子だよ！🐿️️
一番大事なのは姿勢。
二番目も姿勢。
三番目は…運。

#姿勢が9割 #釣りの哲学`
},

{ src: './images/1-26.webp', title: '',
  caption:
`#26
リス子だよ！🐿️️
わたしたちは水面を見てる。
カワウソは、流れを見てる。

たぶん、
年季の差。

#森の知恵  #時間の厚み`
},

{ src: './images/1-27.webp', title: '',
  caption:
`#27
リス子だよ！🐿️️
同じ川、同じ時間。
結果だけが違いました。

#才能の差 #コンビの日常`
},

{ src: './images/1-28.webp', title: '',
  caption:
`#28
リス子だよ！🐿️️
あげる側が前のめりだと、
受け取る側は様子を見るもよう。 

#森のルール #前のめり注意`
},

{ src: './images/1-29.webp', title: '',
  caption:
`#29
スズ子だよ。

うさぎが……
かわいい。

かわいすぎて、
立ち止まっているあいだに足あとが雪に埋もれていく。
今日は追いかけない。

かわいいは、眺めるものだから。 ❄️🐰

#スズ子の距離感  #追わない美学`
},

{ src: './images/1-30.webp', title: '',
  caption:
`#30
スズ子だよ。

同じフォーム。
同じ高さ。

この距離なら、
警戒もされない。

だから今日は、
見られてる気がしない。

#スズ子の距離感  #風景になった日`
},
{ src: './images/1-31.webp', title: '',
  caption:
`#31
リス子とスズ子だよ！🐿️️
今日は森の集まりにおじゃまするよ！

立ち耳は「うん！」が早くて、もう次の話題に行ってる。
たれ耳は黙って聞いて、あとから「それ、いいね」って笑う。
どっちも優秀で、わたしの頭だけ追いつかない。

#ケモミミ・立ち耳垂れ耳企画 #森の交流会`
},

{ src: './images/1-32.webp', title: '',
  caption:
`#32
リス子だよ！🐿️️  
わたしたちは足。  
上は監督さん。 

#下請けポジション  #森の役職`
},

{ src: './images/1-33.webp', title: '',
  caption:
`#33
リス子だよ！🐿️️
運転中。
足、貸してます。 

#森の乗り物 #本日も通常運転`
},

{ src: './images/1-34.webp', title: '',
  caption:
`#34
リス子だよ！🐿️️
鶏「飛べます」
スズ子「聞いてない！」
わたし「森レベル高い！」

#森の本気  #平和な混乱`
},

{ src: './images/1-35.webp', title: '',
  caption:
`#35
リス子だよ！🐿️️
雪は静か。
鶏はぴったり。
わたしは距離を守る。

#森の空気  #半径確保`
},

{ src: './images/1-36.webp', title: '',
  caption:
`#36
リス子だよ！🐿️️
いまスズ子の後ろ。
理由？
ふふふ……内緒だよ✨🌲

#鹿さん黙ってて  #森の目撃者`
},
{ src: './images/1-37.webp', title: '',
  caption:
`#37
スズ子だよ。

私はお菓子に真剣。
猫は尻尾に本気。
どちらも正しい。
甘いは正義。
でも今じゃない。 

#優先順位問題  #ちょっと待って`
},

{ src: './images/1-38.webp', title: '',
  caption:
`#38
リス子だよ！🐿️️

雪の神社まで、年末のごあいさつ便。
馬さんは静か、スズ子は元気、わたしは案内役。

今年も森に足を運んでくれて、ありがとう。
来年も、あったかい寄り道を一緒に増やそうね。

それでは、みんな良いお年を🌲❄️ 

#AIart #また来年`
},

{ src: './images/1-39.webp', title: '',
  caption:
`#39
リス子だよ！🐿️️
新年も、持ちネタは変わりません。
森と、もち。
2026もよろしくね🎍 

#新年のごあいさつ #リス子だよ`
},

{ src: './images/1-40.webp', title: '',
  caption:
`#40
スズ子だよ。
初詣、行ってきました。
並んでるあいだ、しっぽがあったかい。
2026、よろしくね⛩️ 

#新年のごあいさつ #スズ子`
},

{ src: './images/1-41.webp', title: '',
  caption:
`#41
リス子だよ！🐿️️
大吉ひいた。
笑顔、配布中。

#頬袋スマイル  #森の縁起物`
},

{ src: './images/1-42.webp', title: '',
  caption:
`#42
リス子だよ！🐿️️
口の中みかんでぱんぱん。
スズ子、これ以上はいらないよ… 

#貯め込み癖  #理性より習性`
},
{ src: './images/1-43.webp', title: '',
  caption:
`#43
リス子だよ！🐿️️
距離は測れた。
気配も読めた。
許可は、出なかった。

#気分屋さん #だがそれがいい`
},

{ src: './images/1-44.webp', title: '',
  caption:
`#44
リス子だよ！🐿️️
森の防寒具ランキング、
今年の1位は羊。
着るより早い。

#天然ヒーター  #これは反則`
},

{ src: './images/1-45.webp', title: '',
  caption:
`#45
リス子だよ！🐿️️
猫の前で猫ポーズ。
たぶん森では、
挑戦行為。

#無言の圧  #森は厳しい`
},

{ src: './images/1-46.webp', title: '',
  caption:
`#46
リス子だよ！🐿️️

釣る人、
読む人、
支える人。

わたしは最後のやつ。
ぐらっときても動きません。

おさかなさん、
観念して お縄の時間 だよ。

#森の達人たち #わたしたちの戦いはこれからだ`
},

{ src: './images/1-47.webp', title: '',
  caption:
`#47
おはようございます。☀️

リス子だよ！🐿️️
きっと、釣りをがんばりすぎた。
本を開いたまま、夢の中へ。

寝言で、
「ここ…当たり……」って言ってる。

#がんばり屋さん  #森のひととき`
},

{ src: './images/1-48.webp', title: '',
  caption:
`#48
リス子だよ！🐿️️

起きてるあいだは練習中。
眠ったら本番。
一等賞は、夢の中。

#夢の表彰台 #夜のひととき`
},
{ src: './images/1-49.webp', title: '',
  caption:
`#49
リス子だよ！🐿️️
リンゴは数えない。
数えると、
だいたい減る。

#森あるある  #つまみ食い疑惑`
},

{ src: './images/1-50.webp', title: '',
  caption:
`#50
リス子だよ！🐿️️
ウサギに餌槍をしようとしているところ。
どっちが渡すか相談中。
スズ子は笑顔。
にんじんは、まだ離さない。 

#にこにこ作戦  #笑顔の圧`
},

{ src: './images/1-51.webp', title: '',
  caption:
`#51
リス子だよ！🐿️️
食料は軽い。
ヤギの期待は重い。
きっと、もらえる気。

#沈黙の圧力  #あげるとは言ってない`
},

{ src: './images/1-52.webp', title: '',
  caption:
`#52
リス子だよ！🐿️️
外はまだ、冬のまま。
猫は膝の上でぬくぬく、体はひんやり 
私たちは、その光景に納得している。

#需要と供給 #ぬくぬく協定`
},

{ src: './images/1-53.webp', title: '',
  caption:
`#53
リス子だよ！🐿️️
「まだかな？」
「もうちょっと！」
このやりとりが、
一番甘い気がする。 

#甘さは会話  #冬のおやつ会議`
},

{ src: './images/1-54.webp', title: '',
  caption:
`#54
リス子だよ！🐿️️
上はお茶会。
下は、
恋愛ドラマ。

#本編は足元  #見えてない物語`
},
{ src: './images/1-55.webp', title: '',
  caption:
`#55
リス子だよ！🐿️️
今日は寒くて、
ぬくぬく枠が増えた気がしてた。
……でもヤギさんは、
そういう役じゃなかったはず。

#困惑ヤギ #ぬくぬく誤認`
},

{ src: './images/1-56.webp', title: '',
  caption:
`#56
リス子だよ！🐿️️
取れたては、
冷たくない。
あったかくて、
やさしい味。 

#森の恵み #ぬくもり補給`
},

{ src: './images/1-57.webp', title: '',
  caption:
`#57
リス子だよ！🐿️️
スズ子、仕事中いないと思ったら小屋の中。 

子ヤギを抱いて寝ているあたり、
きっと可愛いの我慢不足。  

#頭隠して尻尾隠さず  #任務中断`
},

{ src: './images/1-58.webp', title: '',
  caption:
`#58
リス子だよ！🐿️️
寒い日に効く、
この一杯。

森のコーヒー、
ここにあります。 

#選ばれる一杯 #待たせました森のコーヒー`
},

{ src: './images/1-59.webp', title: '',
  caption:
`#59
リス子だよ！🐿️️
壮大な山、笛、鹿。
役者はそろった。
あとは壮大なファンタジーが出番待ち。 

#開幕前の山場 #ファンタジー控室`
},

{ src: './images/1-60.webp', title: '',
  caption:
`#60
リス子だよ！🐿️️
この景色、この高さ、この笛。
今日の役割は、吟遊詩人。
世界にBGMをつけていく。

#ファンタジー準備中  #お楽しみに`
},
{ src: './images/1-61.webp', title: '',
  caption:
`#61
リス子だよ！🐿️️
タヌキが歌っているだけでも事件なのに、
スズ子が自然にハモっている。

どうやらこの森では、
わたしだけが事情を知らないらしい。

#森のデュオ #ForestUnit`
},

{ src: './images/1-62.webp', title: '',
  caption:
`#62
リス子だよ！🐿️️
描けるものがあれば描く。
それがタヌキでも、迷いはない。

#タヌキキャンバス #表現の自由`
},

{ src: './images/1-63.webp', title: '',
  caption:
`#63
リス子だよ！🐿️️
森のピクニックは、
招待制ではありません。

来たら参加、
それが基本です。

#気づいたら仲間 #森の日常`
},

{ src: './images/1-64.webp', title: '',
  caption:
`#64
リス子だよ！🐿️️

料理の評価は言葉より体型。

このネズミ、
スズ子に満点を出しています。

#満点ボディ #実力派キッチン`
},

{ src: './images/1-65.webp', title: '',
  caption:
`#65
リス子だよ！🐿️️️
炎の料理人タヌキ、開幕。🔥
無茶ぶりだって分かってる。
分かってるけど、期待は下げない。 

#焚き火ごはん #タヌキの奮闘記`
},

{ src: './images/1-66.webp', title: '',
  caption:
`#66
リス子だよ！🐿️️️
落としたら負け。
勝ったらおやつ。 

#リンゴチャレンジ  #今日も平和`
},
{ src: './images/1-67.webp', title: '',
  caption:
`#67
リス子だよ！🐿️️
フォークが止まらないこの背徳感。
スズ子が腕を振るうと
森中がいい匂いに包まれる。
巻いて、巻いて、幸せの渦を作るんだ。 

#リス子の頬張る幸せ #背徳のアルデンテ`
},

{ src: './images/1-68.webp', title: '',
  caption:
`#68
リス子だよ！🐿️️️

スズ子自慢のナポリタン、完食。
お腹がぽんぽんで、もう一歩も動けないや 
「食べてすぐ寝るとリスになる」って言われたけど
もうリスだから、思う存分ゴロゴロしちゃう。

#リス子の本望 #ナポリタンの余韻`
},

{ src: './images/1-69.webp', title: '',
  caption:
`#69
リス子だよ！🐿️️
お菓子作り、失敗。 
焼きすぎた。
ふくらまなかった。 
鼻の粉は、かわいく残った。 

#鼻先メモ #甘さだけ一人前`
},

{ src: './images/1-70.webp', title: '',
  caption:
`#70
リス子だよ！🐿️️

私たちは笛。
タヌキは口笛。
参加条件は、楽しそうな顔。 

#音が出ればOK  #のんびり時間`
},

{ src: './images/1-71.webp', title: '',
  caption:
`#71
おはようございます。☀️

リス子だよ！🐿️️️
灯りも匂いも人の声も、
全部楽しくて。
狐さんと一緒に、街を味わい中。

#お祭り気分 #街歩きコンビ`
},

{ src: './images/1-72.webp', title: '',
  caption:
`#72
リス子だよ！🐿️️
ふかふかの特等席を見つけちゃった。
今日はもうここから動きません！

 #至福のひととき #モフモフの魔法`
},

{ src: './images/1-73.webp', title: '新しい家族',
  caption:
`#73
リス子だよ！🐿️️️
みてみて、わが家に真っ白な赤ちゃんがやってきたよ✨
可愛すぎて大事件。
リス子お姉ちゃん、ボディガード就任です！キリッ🐿️️️💨

#今日の癒し枠 #守護獣リス子`
},
 { src: './images/1-74.webp', title: '森の審査員',
  caption:
`#74
リス子だよ！🐿️️️
タヌキ審査員、無言。
これは…合格か、保留か。

#森の審査員 #現場の緊張感`
},
 { src: './images/1-75.webp', title: '赤ちゃんごっこ',
  caption:
`#75
ベビーカーを発掘しちゃったから、
突然の赤ちゃんごっこスタート！ 
「これ,なんの修行…？」って泣きそうなスズ子おねえちゃん。
でもお世話の手を止めないところ、やっぱりお姉ちゃんだよね！ 

#鳴り響くガラガラ #リス子は大喜び`
},
 { src: './images/1-76.webp', title: '雪山登山',
  caption:
`#76
リス子だよ！

今日は雪山登山！双眼鏡で遠くを眺めてたら、
カッコいい鷹さんともお友達になっちゃった。
この景色、最高にわくわくするね！

#絶景スポット #わくわく探検隊`
},
 { src: './images/1-77.webp', title: '白ヒゲ選手権',
  caption:
`#77
リス子だよ！🐿️️
一気に飲むと頭がキーンとするけど、
この勝負だけは譲れない！おかわりも大歓迎！

#冬のガチンコ勝負 #白ヒゲ選手権`
},
 { src: './images/1-78.webp', title: '水辺のダンス',
  caption:
`#78
リス子だよ！🐿️️️
白鳥さんと一緒に水辺でダンス！
しぶきがキラキラして、
まるで魔法の泉にいるみたい！ 

#ぴょんの時間 #ごきげん散歩`
},
 { src: './images/1-79.webp', title: 'ゆるふわコンビ',
  caption:
`#79
リス子だよ！ 🐿️️
真っ白でフワフワだけど、くちばしが平べったくて可愛い！
「首の長いアヒルさん」なのか「お口の大きな白鳥さん」なのか
もうどっちでもいいよね！

#どっちでも可愛い #ゆるふわコンビ`
},
 { src: './images/1-80.webp', title: '流れ星にお願い',
  caption:
`#80
リス子だよ！🐿️️

星が流れる瞬間に
「どんぐり・クルミ・ピスタチオー！」って叫んだら、
スズ子に「それ、ただの注文だよ」って突っ込まれちゃった！

#流れ星にお願い #食いしん坊リスト`
},
 { src: './images/1-81.webp', title: '幸せのお裾分け',
  caption:
`#81
リス子だよ！🐿️️
リス仲間も集まって、もぐもぐが止まらない！
この冬一番の「おいしい」を詰め込んじゃう。

#幸せのお裾分け #ドーナツの穴はゼロキロカロリー`
},
 { src: './images/1-82.webp', title: '夜のピクニック',
  caption:
`#82
リス子だよ！🐿️️

「星が綺麗だね」って言う前に、
ポップコーンがなくなっちゃいそう！
雪の上に食べるサクサク、これぞ冬の醍醐味。

#夜のピクニック #ノンストップもぐもぐ`
},
 { src: './images/1-83.webp', title: 'ふわふわメロメロ',
  caption:
`#83
リス子だよ！🐿️️️
うさぎさんのブラッシング完了！
換毛期もこれでバッチリだね。
ふわふわすぎて、もうメロメロだよ。

#うさぎ好きさんと繋がりたい #今日のうちの子`
},
 { src: './images/1-84.webp', title: '屋台の誘惑',
  caption:
`#84
リス子だよ！🐿️️️

甘いカステラに、ジューシーなお肉の匂い……。
屋台の誘惑が多すぎて困っちゃう！
お腹がすきすぎて、目に入るもの全部食べたくなっちゃうよ。

#お腹ぺこぺこ #屋台巡り`
},
{ src: './images/1-84.webp', title: '屋台の誘惑',
    caption:
`#84
リス子だよ！🐿️️️

甘いカステラに、ジューシーなお肉の匂い……。
屋台の誘惑が多すぎて困っちゃう！
お腹がすきすぎて,目に入るもの全部食べたくなっちゃうよ。

#お腹ぺこぺこ #屋台巡り`
  },

  { src: './images/1-85.webp', title: '羊と魔法の国へ', 
    caption:
`#85
スズ子だよ。

空も山もお花も、今日は全部スズ子の味方！
羊さんたちと一緒に、魔法の国へお出かけしてくるね。

#ふわふわメルヘン #ゆめかわドリームランド`
  },

  { src: './images/1-86.webp', title: 'ふわふわお泊り会', 
    caption:
`#86
リス子だよ！🐿️

スズ子とお泊り会！
ふわふわのパジャマで朝までお喋りしちゃうんだから。

#ふわもこ部 #夢でも女子会`
  },

  { src: './images/1-87.webp', title: 'リスの夢日記', 
    caption:
`#87
リス子だよ！🐿️️

お花の香りに包まれて、
羊さんと一緒にパステルカラーの雲を追いかけっこ！
ふかふかの草原に転がったら、
お砂糖みたいな幸せな気持ちになっちゃった✨

#メルヘンの住人 #リス子の夢日記`
  },

  { src: './images/1-88.webp', title: '巨大毛糸会議', 
    caption:
`#88
リス子だよ！🐿️

巨大毛糸を前に「解く派」と「守る派」で会議中！
猫ちゃんのは、完全に獲物を狙ってるね。

#赤い誘惑 #肉球ディフェンス`
  },

  { src: './images/1-89.webp', title: 'リスの冒険メイキング', 
    caption:
`#89
リス子だよ！🐿️
ノート1冊じゃ足りない！？ 
100枚以上のストーリーボードで描く、リスさんの大冒険🐿️️📖
「どうやって描いてるの？」の答えはHPに置いてきたよ！

English version available. 

#HPでメイキング公開中 #Menu_processより`
  },

  { src: './images/1-90.webp', title: 'フクロウの無茶振り', 
    caption:
`#90
リス子だよ！🐿️

フクロウさん、白い羽根を渡されても全然ヒントにならないよ！
この手紙、そもそも上下逆じゃない？
まずはそこから教えてくれないかなぁ。

#フクロウの無茶振り #ノーヒント攻略`
  },

  { src: './images/1-91.webp', title: '光の魔法とおめかし', 
    caption:
`#91
リス子だよ！🐿️

今日はいつもと違う atmosphere で描いてもらったの。
柔らかい日差しがとっても綺麗！

#おめかしリス子  #光の魔法`
  },

  { src: './images/1-92.webp', title: '雪夜のランタン', 
    caption:
`#92
リス子だよ！🐿️

雪の上でもランタンがあればぽかぽか。
みんなでおやすみなさい…💤

#雪の夜 #ランタン의光`
  },

  { src: './images/1-93.webp', title: '冬の熱々肉まん', 
    caption:
`#93
リス子だよ！🐿️

蒸したて最高！一口食べれば溢れる肉汁。
この幸せ、冬だけの贅沢だよね！

#食べ歩きグルメ #肉まん`
  },

  { src: './images/1-94.webp', title: '羊のモコモコ癒やし', 
    caption:
`#94
リス子だよ！🐿️

一家に一台（一頭？）、モコモコの癒やし。
ぎゅっとすれば寒さも吹き飛ぶね！

#羊のいる暮らし #もふもふ`
  },

  { src: './images/1-95.webp', title: 'うさぎ包囲網', 
    caption:
`#95
リス子だよ！🐿️

うさぎさんに囲まれてスズ子もニッコニコ 
もふもふの波に飲み込まれて、もう自力では脱出不可能だね。 

#もふもふ包囲網 #可愛いの罠`
  },

  { src: './images/1-96.webp', title: 'かまくらのたぬき', 
    caption:
`#96
リス子だよ！🐿️

かまくらの中で謎のたぬきを捕獲！スズ子ちゃん、
それぬいぐるみじゃなくて本物のたぬきじゃない？
置物みたいに動かないね。

#かまくら #たぬき寝入り`
  },

  { src: './images/1-97.webp', title: '白銀の世界へ', 
    caption:
`#97
リス子だよ！🐿️

白銀の世界に到着！空気がひんやりして気持ちいい〜。
みんなも冬の景色を楽しんでるかな？

#冬の景色 #リス子冒険記`
  },

  { src: './images/1-98.webp', title: '雪見のご馳走', 
    caption:
`#98
リス子だよ！🐿️

外で食べるご飯って、どうしてこんなに美味しいんだろう！
キラキラの雪景色がおかずだよ。いただきまーす！

#冬のご馳走 #リス子`
  },

  { src: './images/1-99.webp', title: '幸せの青い鳥', 
    caption:
`#99
スズ子だよ！

幸せを運ぶ青い鳥が遊びに来てくれたよ！
みんなにもハッピーをお裾分け✨

#幸せの青い鳥 #RT大歓迎`
  },

  { src: './images/1-100.webp', title: '森の星空と娘さん', 
    caption:
`#100
リス子だよ！🐿️
こんにちは、ねこのしっぽさん。
企画に参加させてもらうね。よろしくね！✨🌲

#AI色々な綺麗な星空と娘さん #森の星空`
  },

  { src: './images/2-101.webp', title: '夢の巨大綿菓子', 
    caption:
`#101
スズ子だよ。

ふわふわの大きな綿菓子、独り占めしちゃった！
甘くて幸せな香りがして、まるでお口の中が雲の上みたい。

#夢心地 #至福のひととき`
  },

  { src: './images/2-102.webp', title: '森のファッションショー', 
    caption:
`#102
リス子だよ！🐿️
見て見て、新しい花冠を作ったんだ！
鳥さんたちも褒めてくれて嬉しいな。
森のファッションリーダー目指しちゃうよ！

#ハンドメイド #お花のある暮らし`
  },

  { src: './images/2-103.webp', title: '手のひらのスズメ', 
    caption:
`#103
リス子だよ！🐿️

テラスに可愛いスズメさんが遊びに来てくれたよ！
手の上でちょこんとしてて、とっても仲良くなれそうな予感。

#野鳥観察 #癒やしの時間`
  },

  { src: './images/2-104.webp', title: '雪原のカラフルアート', 
    caption:
`#104
リス子だよ！🐿️️
白銀の世界に、オウム君の羽と虹色の筆跡がキラリ。
寒い日もおしゃべりとアートがあれば、心はいつでも春爛漫だよ！

#冬の彩り #カラフルライフ`
  },

  { src: './images/2-105.webp', title: '滝と白鳥の虹', 
    caption:
`#105
リス子だよ！🐿️️

見てみて！滝のパワーで虹が出たよ。
白鳥さんも嬉しそうに羽を広げて、
みんなで自然の美しさに感謝する素敵な一日になったよ！

#大自然の力 #滝の魔法`
  },

  { src: './images/2-106.webp', title: '節分の豆数え', 
    caption:
`#106
リス子だよ！🐿️

お豆を数えてたら、ついつい食べたくなっちゃった！
年の数だけ食べるの、忘れちゃダメだよ？

#節分 #鬼は外福は内`
  },

  { src: './images/2-107.webp', title: 'キツネとピクニック', 
    caption:
`#107
リス子だよ！🐿️
森でピクニック中にキツネさんと遭遇！🦊
新しいお友達ができて、ランチタイムがもっと楽しくなっちゃった✨

#青空ピクニック  #スローライフ`
  },

  { src: './images/2-108.webp', title: '橋の向こうの景色', 
    caption:
`#108
リス子だよ！🐿️️
遠くに見えるあの大きな橋の向こうには、どんな世界が広がってるんだろう？ 
空気が澄んでいて、遠くの景色までくっきり見えるよ！

#絶景スポット #冒険の予感`
  },

  { src: './images/2-109.webp', title: '秘密基地のおやつ', 
    caption:
`#109
リス子だよ！🐿️️

密基地の特等席で、小さなネズミさんと日向ぼっこ。 
ベルが鳴ったら、おやつの時間の合図だよ！ 

#森の遊び場  #木のぬくもり`
  },

  { src: './images/2-110.webp', title: '雨の日のお散歩', 
    caption:
`#110
リス子だよ！🐿️️
雨の日だって、お気に入りの長靴と傘があれば最高のお散歩日和！
カエルさんと一緒に水たまりで遊んじゃおう。

#あめぱしゃ #るんるんお散歩`
  },

  { src: './images/2-111.webp', title: '陽だまりとネズミ', 
    caption:
`#111
リス子だよ！🐿️️ 

日向ぼっこしながらおやつタイム。🍎
カゴの中のねずみさんも,おいしい匂いにつられてやってきたみたい！ 

#ひょっこりねずみ  #陽だまりの午後`
  },

  { src: './images/2-112.webp', title: '階段のステージ', 
    caption:
`#112
リス子だよ！🐿️️
坂道の階段は天然のステージ！しっぽを揺らしながら、
ご機嫌なリズムを刻むよ。

#ほっぺた膨らませ隊  #しっぽがメトロノーム`
  },

  { src: './images/2-113.webp', title: '雪山のポテト会', 
    caption:
`#113
リス子だよ！🐿️️

雪の中で焼くジャガイモは最高！バターをのせて食べたいな。
あつあつ、ホクホクだよ！

 #雪の日のごちそう #森のポテトパーティー開催中`
  },

  { src: './images/2-114.webp', title: '雪景色のラーメン', 
    caption:
`#114
リス子だよ！🐿️️

雪の中のラーメンタイム！ふーふーして食べるのが最高なんだ✨ 
アヒルさんもお裾分けを待ってるのかな？🦆

#ラーメン大好き  #アヒルも狙う逸品`
  },

  { src: './images/2-115.webp', title: 'ビタミンカラーの午後', 
    caption:
`#115
スズ子だよ！

カゴ一杯のビタミンをどうぞ🍋 
幸せを運ぶ黄色い鳥さんと一緒に、
心からリラックスできる午後を過ごしてね。

#お疲れ様です #ビタミンカラーで元気に`
  },

  { src: './images/2-116.webp', title: '森のリス寄せの笛', 
    caption:
`#116
リス子だよ！🐿️️

スズ子ちゃんの吹くピーッ！っていう音、
森のリスさんにも届いたみたい。
冬の静かな森が、一気に賑やかになるね。

#森の笛吹き隊長  #リス寄せの笛`
  },

  { src: './images/2-117.webp', title: '絶景ハンバーガー', 
    caption:
`#117
リス子だよ！🐿️️

スズ子が鳥さんと優雅にお喋りしてる横で、
私は花より団子！
この絶景を見ながら食べるハンバーガーは、格別の味だよ！

#絶景ランチ #ハンバーガー部`
  },

  { src: './images/2-118.webp', title: 'お花畑の蝶々追い', 
    caption:
`#118
リス子だよ！🐿️️

スズ子の虫取り網が、ゆらゆら揺れる青い蝶々さんを追いかけてるよぉ。
わたしも大きなしっぽを揺らして、後ろからふわふわついていくんだぁ。

#ゆるふわ冒険 #お花畑`
  },

  { src: './images/2-119.webp', title: 'ペンギンのアイス', 
    caption:
`#119
リス子だよ！🐿️️

ペンギンさんが「あーん」ってアイスを差し出してくれてるよ。
一生懸命なペンギンさんと、甘えるわたしたち…
なんだか、ゆる～い時間が流れてるねぇ。

#世界一優しいアイス #冬のあーん祭り`
  },

  { src: './images/2-120.webp', title: '特製トッピングアイス', 
    caption:
`#120
リス子だよ！🐿️️
見て見て！トッピングいっぱいの特製アイスだよ🍦
クッキーもサクサクで、ほっぺが落ちそうになっちゃうねぇ。

#スイーツ部 #今日のご褒美`
  },

  { src: './images/2-121.webp', title: 'お城の鐘とアイス', 
    caption:
`#121
リス子だよ！🐿️️

お城の鐘の音に合わせてアイスをペロリ！
リズム良く食べてたら、なんだか楽しい音楽が聞こえてくる気がしちゃうねぇ♪

#お城のメロディ #ほんわかタイム`
  },

  { src: './images/2-122.webp', title: '蒸籠の床暖房？', 
    caption:
`#122
おはようございます。☀️

リス子だよ！🐿️️
この蒸籠、実は足元に置くと床暖房がわりになる…わけないよねぇ。

#あったかライフハック #妄想中`
  },

  { src: './images/2-123.webp', title: 'ポップコーン包囲網', 
    caption:
`#123
リス子だよ！🐿️️

スズメさんは空から、リスさんは膝から！
ポップコーンを狙う包囲網が完成しちゃったよ！
わたしピンチだねぇ。

#スズメの偵察隊 #リスのおねだり`
  },

  { src: './images/2-124.webp', title: 'おねだりリスの偵察', 
    caption:
`#124
リス子だよ！🐿️️

スズメさんは空から、リスさんは膝から！
ポップコーンを狙う包囲網が完成しちゃったよ！
わたしピンチだねぇ。

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
 * 【修正ポイント1】ギャラリー描画
 * 表示される画像すべてに「リス子」を含むaltを自動付与します
 */
function renderGallery(groupId) {
  currentGroupItems = items.filter(it => getGroupId(it.src) === groupId);

  gallery.innerHTML = currentGroupItems.map((it, i)=>`
      <figure class="card" data-i="${i}" tabindex="0" aria-label="${it.title || '黄色のマフラーを巻いたリス子'}">
        <div class="card__imgwrap">
          <img src="${it.src}" 
              alt="黄色のマフラーを巻いたリスの女の子 リス子 - ${it.title || ''} | ${it.caption.substring(0, 30).replace(/\n/g, ' ')}..." 
              loading="lazy">
        </div>
        <figcaption class="card__meta">
          <h3 class="card__title">${it.title || 'リス子'}</h3>
          <p class="card__caption">${it.caption}</p>
        </figcaption>
      </figure>
    `).join("");
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
 * 【修正ポイント2】Google SEO対策
 * 700枚以上の全アイテムを「リス子」という名前と共にGoogleへ送信します。
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
            // 検索結果のタイトルを最適化
            "name": `黄色のマフラーを巻いたリスの女の子 リス子: ${it.title || '森の物語'}`,
            "description": it.caption.replace(/\n/g, ' '),
            "contentUrl": window.location.origin + window.location.pathname.replace('index.html', '') + it.src.replace('./', '')
        }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(ldJson);
    document.head.appendChild(script);

    // noscript: JS無効時やクローラー向けの目録
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<div style="display:none;"><h2>黄色のマフラーを巻いたリスの女の子 リス子 作品目録</h2><ul>` + 
        items.map(it => `<li>リス子（黄色のマフラーのリス） - ${it.caption.substring(0, 50)}</li>`).join('') + 
        `</ul></div>`;
    document.body.appendChild(noscript);
}

// 実行
setupFilters();
injectGoogleSEOData();