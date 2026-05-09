// file: プロトコルではない、かつ hostname に github が含まれるなら GitHub とみなす
const isGitHub = window.location.hostname.includes('github.io');
const isLocal = window.location.protocol === 'file:';

// GitHub上ならリポジトリ名ありのパス、そうでなければルートからのパス
// ※画像のエラー状況から、GitHub上ではリポジトリ名が必要なことが確定しています
const base = (isGitHub && !isLocal) 
  ? '/asunaro0000.homepage/gallery/Risko/risuko_X' 
  : '/gallery/Risko/risuko_X';


// Minimal card gallery with lightbox navigation
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

/**
 * 【ここを編集】グループごとの表示名を個別に設定します
 * 番号（ファイル名の頭文字）: "表示したい名前"
 */
const groupNames = {
  "1": "1～",
  "2": "100～",
  "3": "200～",
  // 4, 5... と増えたらここに追加するだけ
};

/**
 * データの管理
 * srcのファイル名を '1-1.webp', '2-1.webp' ... という形式で判別します
 */
/**
 * データの管理
 * 個別に英語の正規化タグ (tags) を追加しました
 */
const items = [
{ src: `${base}/images/1-1.webp`, title: '',
  tags: ["Risuko", "fluffy tail", "forest", "sunlight", "sleeping"],
caption:
`#1
It’s Risuko! 🐿️️️
The sunlight filtering through the leaves felt so warm,
my tail got all fluffy… and I fell asleep right there. 🌿✨

#BorrowMyTail #ForestRestSpot`
},

{ src: `${base}/images/1-2.webp`, title: '',
  tags: ["Risuko", "Suzuko", "coffee", "winter", "break"],
caption:
`#2
It’s Risuko! 🐿️️️
Suzuko seems to be in a hurry.
Risuko is not.
Because the coffee would get cold. ☕❄️

#OneSipBreak #WinterMoments`
},

{ src: `${base}/images/1-3.webp`, title: '',
  tags: ["Risuko", "Suzuko", "walking", "forest path", "autumn"],
caption:
`#3
It’s Risuko! 🐿️️️

Risuko looks ahead, Suzuko looks around.
“That way looks fun.”
With that one sentence, today’s path is decided. 🍁

#WalkingIsTheMainStory #DetoursAreJustice`
},

{ src: `${base}/images/1-4.webp`, title: '',
  tags: ["Risuko", "climbing", "adventure", "night forest"],
caption:
`#4
It’s Risuko! 🐿️️️
It’s a little scary, but I won’t stop.
It’s a little high, but it’s fun.
So today again, I choose this path. 🌙

#FunFirst #ForestSenseOfBalance`
},

{ src: `${base}/images/1-5.webp`, title: '',
  tags: ["Risuko", "flute", "tanuki", "concert", "judge"],
caption:
`#5
It’s Risuko! 🐿️️️
When I played the flute, the tanuki listened with a serious face.
Yeah, feels like I passed today.

#ForestConcert #ForestJudge`
},

{ src: `${base}/images/1-6.webp`, title: '',
  tags: ["Risuko", "running", "playing instrument", "forest teamwork"],
caption:
`#6
It’s Risuko! 🐿️️️
Dash dash, sharan♪
One runs, one plays.

#RunningSoundsAndStrings #ForestTeamwork`
},

{ src: `${base}/images/1-7.webp`, title: '',
  tags: ["Suzuko", "flute", "tanuki", "practice", "forest judge"],
caption:
`#7
It’s Suzuko. 🤍
I quietly took a breath and tried playing.
The tanuki’s face didn’t move.

Risuko says “feels like a pass,”
but I’ll keep watching until the end.

#ForestConcert #ForestJudge`
},

{ src: `${base}/images/1-8.webp`, title: '',
  tags: ["Risuko", "Suzuko", "tanuki", "friendship", "after the music"],
caption:
`#8
Risuko and Suzuko.
And then, the tanuki.

After the sound of the flute,
somehow we ended up sitting side by side.
Maybe this is how friendship starts.

#ForestPassSign #AfterTheMusic`
},

{ src: `${base}/images/1-9.webp`, title: '',
  tags: ["Risuko", "snack time", "cookies", "sweets"],
caption:
`#9
It’s Risuko! 🐿️️
Snack time! 🍪✨
For now, everything is still up for grabs!

#FirstComeFirstServed #SweetsAreJustice`
},

{ src: `${base}/images/1-10.webp`, title: '',
  tags: ["Risuko", "winter", "eating", "burger", "warm moments"],
caption:
`#10
It’s Risuko! 🐿️️
On cold days,
the correct answer is eating close together. 🍔❄️

#WinterWisdom #WarmMoments`
},

{ src: `${base}/images/1-11.webp`, title: '',
  tags: ["Risuko", "flute", "cozy", "blushing"],
caption:
`#11
It’s Risuko! 🐿️️️
Cheeks all red,
fuu.
The sound comes later.

#DoingMyBestRisuko #FluteDependsOnMood #CozyForest`
},

{ src: `${base}/images/1-12.webp`, title: '',
  tags: ["Suzuko", "frozen river", "fishing", "winter kindness"],
caption:
`#12
The river is frozen,
but my feelings aren’t.
Today’s fish
will be prepared properly.

#WinterKindness #ForestLife`
},

{ src: `${base}/images/1-13.webp`, title: '',
  tags: ["Risuko", "river", "otter", "relaxing", "summer vibes"],
caption:
`#13
It’s Risuko! 🐿️️️
The sound of the river feels nice.
Otter, wait for me.
Now is a time to relax.

#SlowTime #FeetInTheWater`
},

{ src: `${base}/images/1-14.webp`, title: '',
  tags: ["Risuko", "otter", "achievement", "forest moment"],
caption:
`#14
It’s Risuko! 🐿️️️
Mission complete!
Otter, were you watching?
I did it properly.

#ForestMoment #GentleAchievement`
},

{ src: `${base}/images/1-15.webp`, title: '',
  tags: ["Risuko", "tea time", "winter room", "stillness"],
caption:
`#15
It’s Risuko! 🐿️️️
A quiet room,
good tea.
I’m not moving anymore.

#WinterRoom #ChoosingStillness`
},

{ src: `${base}/images/1-16.webp`, title: '',
  tags: ["Risuko", "Christmas", "waiting", "cake", "winter"],
caption:
`#16
It’s Risuko! 🐿️️️
The room is fully Christmas.
Only the cake
hasn’t arrived yet.

#Countdown #WaitingIsPartOfIt`
},

{ src: `${base}/images/1-17.webp`, title: '',
  tags: ["Risuko", "drum", "tanuki", "tambourine", "forest band"],
caption:
`#17
It’s Risuko! 🐿️️️
Drum practice starts!
Tanuki is on tambourine duty ✨🥁

#ForestFriends #InstantBand`
},

{ src: `${base}/images/1-18.webp`, title: '',
  tags: ["Risuko", "drumming", "tanuki", "excitement", "role swap"],
caption:
`#18
It’s Risuko! 🐿️️️
While practicing drums,
the tanuki got the most excited 🥁✨

#HypeManager #RoleSwap`
},

{ src: `${base}/images/1-19.webp`, title: '',
  tags: ["Risuko", "Christmas", "baking cookies", "winter light"],
caption:
`#19
It’s Risuko! 🐿️️
Merry Cookie Christmas! 🍪
Winter light and the smell of fresh baking.
This is what Christmas feels like 🎄

#MerryChristmas #FreshBakedHappiness`
},

{ src: `${base}/images/1-20.webp`, title: '',
  tags: ["Risuko", "holy night", "star light", "sacred forest", "leaping"],
caption:
`#20
It’s Risuko! 🐿️️
A holy night, one big leap.
Going to catch the light of the stars ✨🎄

#HolyNight #SacredForest`
},

{ src: `${base}/images/1-21.webp`, title: '',
  tags: ["Risuko", "Santa", "Christmas delivery", "forest", "winter"],
caption:
`#21
It’s Risuko! 🐿️️
Santa is in the sky,
I’m in charge of the forest 🎄🌲

#ForestSanta #TailWigglingDelivery`
},

{ src: `${base}/images/1-22.webp`, title: '',
  tags: ["Suzuko", "stealth", "forest delivery", "hidden"],
caption:
`#22
It’s Suzuko.
Risuko went ahead.
Not being found
means it’s going well.

#ForestDelivery #TheArtOfNotBeingSeen`
},

{ src: `${base}/images/1-23.webp`, title: '',
  tags: ["Risuko", "night shift", "sleepy", "satisfied", "winter"],
caption:
`#23
It’s Risuko! 🐿️️
Worked too hard on night delivery.
Sleepy. But satisfied.

#AfterNightShift #SleepyButHappy`
},

{ src: `${base}/images/1-24.webp`, title: '',
  tags: ["Risuko", "Suzuko", "Christmas present", "friendship", "winter"],
caption:
`#24
It’s Risuko! 🐿️️
A present from Suzuko.
Christmas arrived properly 🎄

#ForestChristmas #WinterStory`
},

{ src: `${base}/images/1-25.webp`, title: '',
  tags: ["Risuko", "fishing", "posture", "philosophy", "river"],
caption:
`#25
It’s Risuko! 🐿️️
Posture matters most.
Second is posture.
Third… luck.

#PostureIsEverything #FishingPhilosophy`
},

{ src: `${base}/images/1-26.webp`, title: '',
  tags: ["Risuko", "otter", "river", "wisdom", "watching flow"],
caption:
`#26
It’s Risuko! 🐿️️
We watch the surface.
The otter watches the flow.

Probably,
years of experience.

#ForestWisdom #WeightOfTime`
},

{ src: `${base}/images/1-27.webp`, title: '',
  tags: ["Risuko", "river", "daily life", "talent gap"],
caption:
`#27
It’s Risuko! 🐿️️
Same river, same time.
Only the results were different.

#TalentGap #DailyDuo`
},

{ src: `${base}/images/1-28.webp`, title: '',
  tags: ["Risuko", "giving", "forest rules", "careful"],
caption:
`#28
It’s Risuko! 🐿️️
If the giver leans in too much,
the receiver watches carefully.

#ForestRules #CarefulEnthusiasm`
},

{ src: `${base}/images/1-29.webp`, title: '',
  tags: ["Suzuko", "rabbit", "snow", "admiring", "winter"],
caption:
`#29
It’s Suzuko.

A rabbit…
cute.

So cute that
while I stopped, my footprints were buried in snow.
I won’t chase today.

Cute things are meant to be admired. ❄️🐰

#SuzukoDistance #ArtOfNotChasing`
},

{ src: `${base}/images/1-30.webp`, title: '',
  tags: ["Suzuko", "distance", "camouflage", "scenery"],
caption:
`#30
It’s Suzuko.

Same form.
Same height.

At this distance,
there’s no alarm.

So today,
I don’t feel watched.

#SuzukoDistance #BecomingScenery`
},

{ src: `${base}/images/1-31.webp`, title: '',
  tags: ["Risuko", "Suzuko", "kemomimi", "forest gathering", "ears"],
caption:
`#31
It’s Risuko and Suzuko! 🐿️️
We’re visiting a forest gathering today!

The upright ears say “yeah!” and jump to the next topic.
The floppy ears listen quietly, then smile and say “that’s nice.”
Both are excellent.
Only my head can’t keep up.

#KemomimiEarsProject #ForestGathering`
},

{ src: `${base}/images/1-32.webp`, title: '',
  tags: ["Risuko", "supervisor", "forest roles", "subcontractor"],
caption:
`#32
It’s Risuko! 🐿️️
We are the legs.
Up above is the supervisor.

#SubcontractPosition #ForestRoles`
},

{ src: `${base}/images/1-33.webp`, title: '',
  tags: ["Risuko", "driving", "forest vehicle", "legs"],
caption:
`#33
It’s Risuko! 🐿️️
Driving.
Lending my legs.

#ForestVehicle #BusinessAsUsual`
},

{ src: `${base}/images/1-34.webp`, title: '',
  tags: ["Risuko", "Suzuko", "chicken", "flying", "forest chaos"],
caption:
`#34
It’s Risuko! 🐿️️
Chicken: “I can fly.”
Suzuko: “That wasn’t mentioned!”
Me: “This forest is high-level!”

#ForestSeriousMode #PeacefulChaos`
},

{ src: `${base}/images/1-35.webp`, title: '',
  tags: ["Risuko", "chicken", "snow", "personal space", "atmosphere"],
caption:
`#35
It’s Risuko! 🐿️️
Snow is quiet.
The chicken stays close.
I keep my distance.

#ForestAtmosphere #PersonalSpace`
},

{ src: `${base}/images/1-36.webp`, title: '',
  tags: ["Risuko", "Suzuko", "deer", "secret", "witness"],
caption:
`#36
It’s Risuko! 🐿️️
Right behind Suzuko.
Why?
Hehe… secret ✨🌲

#DeerPleaseBeQuiet #ForestWitness`
},

{ src: `${base}/images/1-37.webp`, title: '',
  tags: ["Suzuko", "cat", "sweets", "tail", "priority"],
caption:
`#37
It’s Suzuko.

I’m serious about sweets.
The cat is serious about my tail.
Both are correct.
Sweetness is justice.
But not right now.

#PriorityProblem #WaitAMoment`
},

{ src: `${base}/images/1-38.webp`, title: '',
  tags: ["Risuko", "Suzuko", "horse", "New Year", "snow shrine", "shrine visit"],
caption:
`#38
It’s Risuko! 🐿️️

A year-end greeting delivery to the snowy shrine.
The horse is calm, Suzuko is energetic, and I’m the guide.

Thank you for walking through the forest with us this year.
Let’s add more warm detours together next year.

Wishing everyone a happy New Year 🌲❄️

#AIart #SeeYouNextYear`
},

{ src: `${base}/images/1-39.webp`, title: '',
  tags: ["Risuko", "New Year 2026", "mochi", "greetings"],
caption:
`#39
It’s Risuko! 🐿️️
Same old jokes in the new year.
Forest and mochi.
Looking forward to 2026 🎍

#NewYearGreetings #ItsRisuko`
},

{ src: `${base}/images/1-40.webp`, title: '',
  tags: ["Suzuko", "New Year 2026", "shrine visit", "warm tail"],
caption:
`#40
It’s Suzuko.
Went to the first shrine visit.
While waiting in line, my tail stayed warm.
Here’s to 2026 ⛩️

#NewYearGreetings #Suzuko`
},

{ src: `${base}/images/1-41.webp`, title: '',
  tags: ["Risuko", "fortune", "smile", "good luck", "cheeks"],
caption:
`#41
It’s Risuko! 🐿️️
I drew great fortune.
Smiles, now being distributed.

#CheekPouchSmile #ForestGoodLuck`
},

{ src: `${base}/images/1-42.webp`, title: '',
  tags: ["Risuko", "Suzuko", "mandarin", "hoarding", "winter snack"],
caption:
`#42
It’s Risuko! 🐿️️
My mouth is stuffed with mandarins.
Suzuko, I really can’t take any more…

#HoardingHabit #InstinctOverReason`
},

{ src: `${base}/images/1-43.webp`, title: '',
  tags: ["Risuko", "moody", "distance", "permission denied"],
caption:
`#43
It’s Risuko! 🐿️️
Distance measured.
Presence read.
Permission denied.

#MoodyType #ButThatIsFine`
},

{ src: `${base}/images/1-44.webp`, title: '',
  tags: ["Risuko", "sheep", "winter gear", "natural heater"],
caption:
`#44
It’s Risuko! 🐿️️
Forest winter gear ranking:
this year’s number one is sheep.
Faster than wearing clothes.

#NaturalHeater #TotallyUnfair`
},

{ src: `${base}/images/1-45.webp`, title: '',
  tags: ["Risuko", "cat", "pose", "forest challenge"],
caption:
`#45
It’s Risuko! 🐿️️
Cat pose in front of a cat.
In the forest,
this is probably a challenge.

#SilentPressure #ForestIsStrict`
},

{ src: `${base}/images/1-46.webp`, title: '',
  tags: ["Risuko", "fishing", "forest masters", "battle"],
caption:
`#46
It’s Risuko! 🐿️️

The catcher,
the reader,
the supporter.

I’m the last one.
Even if it wobbles, I won’t move.

Fish,
it’s time to give up.

#ForestMasters #OurBattleContinues`
},

{ src: `${base}/images/1-47.webp`, title: '',
  tags: ["Risuko", "dreaming", "fishing dreams", "sleeping", "book"],
caption:
`#47
Good morning ☀️

It’s Risuko! 🐿️️
I must have tried too hard at fishing.
Book open, already dreaming.

In my sleep I mutter,
“Here… bite…”

#HardWorker #ForestMoment`
},

{ src: `${base}/images/1-48.webp`, title: '',
  tags: ["Risuko", "practice", "dreams", "night moment", "performance"],
caption:
`#48
It’s Risuko! 🐿️️

Practice while awake.
Performance while asleep.
First prize is in dreams.

#DreamPodium #NightMoment`
},

{ src: `${base}/images/1-49.webp`, title: '',
  tags: ["Risuko", "apples", "snacking", "forest common things"],
caption:
`#49
It’s Risuko! 🐿️️
I don’t count apples.
If I do,
they usually decrease.

#ForestCommonThings #SuspiciousSnacking`
},

{ src: `${base}/images/1-50.webp`, title: '',
  tags: ["Risuko", "Suzuko", "rabbit", "carrot", "smile strategy"],
caption:
`#50
It’s Risuko! 🐿️️
About to feed the rabbit.
Discussing who hands it over.
Suzuko is smiling.
The carrot is still not released.

#SmileStrategy #PressureOfSmiles`
},

{ src: `${base}/images/1-51.webp`, title: '',
  tags: ["Risuko", "goat", "expectations", "food", "silent pressure"],
caption:
`#51
It’s Risuko! 🐿️️
Food is light.
The goat’s expectations are heavy.
Probably thinks it’ll get some.

#SilentPressure #NeverSaidIdGive`
},

{ src: `${base}/images/1-52.webp`, title: '',
  tags: ["Risuko", "cat", "lap", "winter", "warmth"],
caption:
`#52
It’s Risuko! 🐿️️
Outside is still winter.
Cat is warm on my lap, body cool.
We all agree with this scene.

#SupplyAndDemand #WarmthAgreement`
},

{ src: `${base}/images/1-53.webp`, title: '',
  tags: ["Risuko", "cooking", "waiting", "winter snack", "sweet conversation"],
caption:
`#53
It’s Risuko! 🐿️️
“Is it ready yet?”
“Just a bit more!”
This exchange
might be the sweetest part.

#SweetConversation #WinterSnackMeeting`
},

{ src: `${base}/images/1-54.webp`, title: '',
  tags: ["Risuko", "tea party", "mice", "drama", "unseen narrative"],
caption:
`#54
It’s Risuko! 🐿️️
Upstairs is a tea party.
Down below,
a romance drama.

#MainStoryAtYourFeet #UnseenNarrative`
},

{ src: `${base}/images/1-55.webp`, title: '',
  tags: ["Risuko", "goat", "cozy spots", "winter cold", "misunderstanding"],
caption:
`#55
It’s Risuko! 🐿️️
It was so cold,
I thought the cozy spots increased.
…but the goat
wasn’t supposed to be one of them.

#ConfusedGoat #CozyMisunderstanding`
},

{ src: `${base}/images/1-56.webp`, title: '',
  tags: ["Risuko", "warm recharge", "forest blessings", "tasting"],
caption:
`#56
It’s Risuko! 🐿️️
Freshly caught
isn’t cold.
Warm,
and gently flavored.

#ForestBlessings #WarmRecharge`
},

{ src: `${base}/images/1-57.webp`, title: '',
  tags: ["Risuko", "Suzuko", "baby goat", "sleeping", "cuteness overload"],
caption:
`#57
It’s Risuko! 🐿️️
Thought Suzuko was missing during work.

Sleeping in the shed,
hugging a baby goat—
probably couldn’t resist the cuteness.

#HeadHiddenTailOut #MissionPaused`
},

{ src: `${base}/images/1-58.webp`, title: '',
  tags: ["Risuko", "forest coffee", "winter cup", "cozy"],
caption:
`#58
It’s Risuko! 🐿️️
Perfect for cold days,
this one cup.

Forest coffee,
right here.

#ChosenCup #ForestCoffeeArrived`
},

{ src: `${base}/images/1-59.webp`, title: '',
  tags: ["Risuko", "mountains", "flute", "deer", "fantasy prologue"],
caption:
`#59
It’s Risuko! 🐿️️
Grand mountains, flute, deer.
The cast is ready.
Now the epic fantasy waits backstage.

#BeforeTheClimax #FantasyWaitingRoom`
},

{ src: `${base}/images/1-60.webp`, title: '',
  tags: ["Risuko", "bard", "flute", "view", "epic music"],
caption:
`#60
It’s Risuko! 🐿️️
This view, this height, this flute.
Today’s role: bard.
Adding BGM to the world.

#FantasyInPreparation #StayTuned`
},

{ src: `${base}/images/1-61.webp`, title: '',
  tags: ["Risuko", "Suzuko", "tanuki", "singing", "forest duo"],
caption:
`#61
It’s Risuko! 🐿️️
A tanuki singing is already an incident,
but Suzuko naturally harmonizing.

Seems in this forest,
I’m the only one out of the loop.

#ForestDuo #ForestUnit`
},

{ src: `${base}/images/1-62.webp`, title: '',
  tags: ["Risuko", "tanuki", "drawing", "art", "canvas"],
caption:
`#62
It’s Risuko! 🐿️️
If there’s something to draw, I draw it.
Even if it’s a tanuki, no hesitation.

#TanukiCanvas #FreedomOfExpression`
},

{ src: `${base}/images/1-63.webp`, title: '',
  tags: ["Risuko", "picnic", "friends", "forest gathering", "daily life"],
caption:
`#63
It’s Risuko! 🐿️️
Forest picnics
are not invitation-only.

If you come, you join.
That’s the rule.

#SuddenlyFriends #ForestDailyLife`
},

{ src: `${base}/images/1-64.webp`, title: '',
  tags: ["Risuko", "Suzuko", "mouse", "cooking", "skilled kitchen"],
caption:
`#64
It’s Risuko! 🐿️️

Cooking is judged by body shape, not words.

This mouse
gives Suzuko full marks.

#PerfectScoreBody #SkilledKitchen`
},

{ src: `${base}/images/1-65.webp`, title: '',
  tags: ["Risuko", "tanuki", "campfire cooking", "flame chef", "expectations"],
caption:
`#65
It’s Risuko! 🐿️️️
Flame Chef Tanuki, opening act. 🔥
I know it’s unreasonable.
I know—but I won’t lower my expectations.

#CampfireCooking #TanukiStruggles`
},

{ src: `${base}/images/1-66.webp`, title: '',
  tags: ["Risuko", "apple challenge", "snacks", "peaceful day"],
caption:
`#66
It’s Risuko! 🐿️️️
Drop it and you lose.
Win and you get snacks.

#AppleChallenge #AnotherPeacefulDay`
},

{ src: `${base}/images/1-67.webp`, title: '',
  tags: ["Risuko", "Suzuko", "pasta", "cooking", "eating joy"],
caption:
`#67
It’s Risuko! 🐿️️
This guilty pleasure where the fork won’t stop.
When Suzuko starts cooking,
the forest fills with good smells.
Roll it, roll it, make a whirlpool of happiness.

#RisukoEatingJoy #GuiltyPasta`
},

{ src: `${base}/images/1-68.webp`, title: '',
  tags: ["Risuko", "Suzuko", "napolitan", "full belly", "sleeping"],
caption:
`#68
It’s Risuko! 🐿️️️

Suzuko’s proud Napolitan, finished.
My belly is full—I can’t move another step.
They said “sleeping after eating turns you into a squirrel,”
but I’m already a squirrel, so I’ll roll around freely.

#RisukoDreamComeTrue #AfterNapolitan`
},

{ src: `${base}/images/1-69.webp`, title: '',
  tags: ["Risuko", "baking failed", "flour on nose", "cute"],
caption:
`#69
It’s Risuko! 🐿️️
Baking failed.
Overbaked.
Didn’t rise.
Flour stayed cutely on my nose.

#NoseMemo #SweetnessOnly`
},

{ src: `${base}/images/1-70.webp`, title: '',
  tags: ["Risuko", "flute", "tanuki", "whistling", "happy face"],
caption:
`#70
It’s Risuko! 🐿️️

We are flutes.
Tanuki is whistling.
The only requirement is a happy face.

#SoundIsEnough #RelaxedTime`
},

{ src: `${base}/images/1-71.webp`, title: '',
  tags: ["Risuko", "fox", "festival", "town walk", "morning"],
caption:
`#71
Good morning ☀️

It’s Risuko! 🐿️️️
The lights, the smells, the voices—
everything is fun.
Enjoying the town together with a fox.

#FestivalMood #CityWalkPair`
},

{ src: `${base}/images/1-72.webp`, title: '',
  tags: ["Risuko", "VIP seat", "fluff", "bliss"],
caption:
`#72
It’s Risuko! 🐿️️
I found the fluffiest VIP seat.
I’m not moving from here today!

#BlissfulMoment #MagicOfFluff`
},

{ src: `${base}/images/1-73.webp`, title: 'A New Family Member',
  tags: ["Risuko", "baby", "bodyguard", "new family", "cuteness"],
  caption:
`#73
It's Risuko! 🐿️️
Look, look! A tiny, snowy-white baby has joined our home! ✨
It's a major event of cuteness.
Big sister Risuko is now officially on bodyguard duty! *Salute* 🐿️️💨

#DailyCuteness #GuardianRisuko`
},

{ src: `${base}/images/1-74.webp`, title: 'Forest Judge',
  tags: ["Risuko", "tanuki", "judge", "high tension", "forest"],
  caption:
`#74
It's Risuko! 🐿️️
Mr. Tanuki, the judge, is silent.
Is this... a pass, or is it on hold?

#ForestJudge #HighTension`
},

{ src: `${base}/images/1-75.webp`, title: 'Playing Baby',
  tags: ["Risuko", "Suzuko", "stroller", "baby play", "rattle"],
  caption:
`#75
We found an old stroller, so 
suddenly it's "playing baby" time! 
Big sister Suzuko looks like she's about to cry, thinking "Is this some kind of training...?" 
But she never stops helping—she really is the best big sister!

#RattleSound #RisukoIsThrilled`
},

{ src: `${base}/images/1-76.webp`, title: 'Snowy Mountain Hike',
  tags: ["Risuko", "hawk", "binoculars", "mountain hiking", "snow"],
  caption:
`#76
It's Risuko!

Today is snowy mountain climbing! While looking through my binoculars, 
I made friends with a cool Mr. Hawk.
This view is absolutely thrilling!

#StunningViews #ExcitingExpedition`
},

{ src: `${base}/images/1-77.webp`, title: 'White Moustache Championship',
  tags: ["Risuko", "milk", "white moustache", "winter challenge"],
  caption:
`#77
It's Risuko! 🐿
Drinking it all at once gives me a brain freeze, 
but I can't back down from this challenge! Refills are more than welcome!

#WinterShowdown #WhiteMoustacheChampionship`
},

{ src: `${base}/images/1-78.webp`, title: 'Dancing by the Water',
  tags: ["Risuko", "swan", "dancing", "water splash", "magic spring"],
  caption:
`#78
It's Risuko! 🐿️️
Dancing by the water with Mr. Swan!
The splashes are sparkling...
it's like being in a magic spring!

#HopTime #HappyStroll`
},

{ src: `${base}/images/1-79.webp`, title: 'Fluffy Duo',
  tags: ["Risuko", "swan", "fluffy", "white", "cute"],
  caption:
`#79
It's Risuko! 🐿
He’s pure white and fluffy, but his beak is so flat and cute!
Is he a "long-necked duck" or a "big-mouthed swan"? 
Either way, he's adorable!

#CuteEitherWay #FluffyDuo`
},

{ src: `${base}/images/1-80.webp`, title: 'Wishing on a Star',
  tags: ["Risuko", "Suzuko", "shooting star", "wish", "nuts"],
  caption:
`#80
It's Risuko! 🐿

The moment the star shot across the sky, 
I yelled "Acorns, Walnuts, Pistachios!" 
Suzuko snapped at me, "That's just a food order!"

#ShootingStarWish #HungryList`
},

{ src: `${base}/images/1-81.webp`, title: 'Sharing the Happiness',
  tags: ["Risuko", "squirrel friends", "nuts", "sharing", "winter munching"],
  caption:
`#81
It's Risuko! 🐿
My squirrel friends gathered around, and we can't stop munching!
Packing in all the "yummy" moments of winter.

#SharingHappiness #DonutHolesAreZeroCalories`
},

{ src: `${base}/images/1-82.webp`, title: 'Night Picnic',
  tags: ["Risuko", "popcorn", "stars", "night picnic", "winter"],
  caption:
`#82
It's Risuko! 🐿

Before I can say "The stars are beautiful," 
the popcorn might be all gone!
Crunching away on the snow—this is the best part of winter.

#NightPicnic #NonstopMunching`
},

{ src: `${base}/images/1-83.webp`, title: 'Head Over Heels for Fluff',
  tags: ["Risuko", "rabbit", "brushing", "fluffy", "bunny lovers"],
  caption:
`#83
It's Risuko! 🐿️️
Done brushing Mr. Rabbit!
Now he's all set for shedding season.
He's so fluffy, I'm totally head over heels!

#BunnyLovers #PetOfTheDay`
},

{ src: `${base}/images/1-84.webp`, title: 'The Temptation of Food Stalls',
  tags: ["Risuko", "food stalls", "festival", "hungry", "temptation"],
  caption:
`#84
It's Risuko! 🐿️️

Sweet castella, juicy grilled meat...
There are too many temptations at these stalls!
I'm so hungry, I want to eat everything in sight!

#SoHungry #FoodStallHopping`
},

{ src: `${base}/images/1-85.webp`, title: 'To the Magical Land',
  tags: ["Suzuko", "sheep", "magical land", "fairytale", "dreamy"],
  caption:
`#85
It's Suzu-ko.

The sky, the mountains, and the flowers—everything is on my side today!
I’m heading off to a magical land with the sheep.

#FluffyFairytale #DreamyLand`
  },

{ src: `${base}/images/2-101.webp`, title: 'Giant Cotton Candy',
  tags: ["Suzuko", "cotton candy", "sweets", "cloud", "dreamy"],
  caption:
`#101
It's Suzu-ko.

I have this big, fluffy cotton candy all to myself!
It smells so sweet and happy, like my mouth is floating on a cloud.

#Dreamy #Bliss`
  },

{ src: `${base}/images/2-113.webp`, title: 'Snowy Potato Party',
  tags: ["Risuko", "baked potato", "snow", "winter feast", "fluffy"],
  caption:
`#113
It's Risuko! 🐿️️

Potatoes baked in the snow are the best! I want to eat them with butter.
So hot and fluffy!

#WinterFeast #ForestPotatoParty`
  },

{ src: `${base}/images/2-114.webp`, title: 'Ramen in the Snow',
  tags: ["Risuko", "duck", "ramen", "snow", "hot food"],
  caption:
`#114
It's Risuko! 🐿️️

Ramen time in the snow! Blowing on it to cool it down is the best part ✨
Is the duck waiting for a share too? 🦆

#RamenLover #DuckWantsBite`
  },

{ src: `${base}/images/2-119.webp`, title: 'Ice Cream from Penguin',
  tags: ["Risuko", "penguin", "ice cream", "winter treat", "kindness"],
  caption:
`#119
It's Risuko! 🐿️️

A penguin is holding out an ice cream for a "say aah"!
The hard-working penguin and us being spoiled...
It's such a relaxing time.

#KindestIceCream #WinterTreat`
  },

{ src: `${base}/images/2-124.webp`, title: 'Ambush for Popcorn',
  tags: ["Risuko", "sparrows", "squirrels", "popcorn", "siege"],
  caption:
`#124
It's Risuko! 🐿️️

Sparrows from the sky, squirrels from my lap!
A siege for the popcorn has been completed!
I'm in a pinch!

#SparrowScouts #SquirrelBegging`
  },
{ src: `${base}/images/2-125.webp`, title: 'Strawberry One-Bite Challenge', tags: ['strawberry', 'sparrow', 'heartwarming', 'Risuko'],
    caption:
`#125
It's Risuko! 🐿️
Ris-kun was so surprised, asking "Sparrow-san, are you really going for that in one bite!?"
Just watching them makes my heart feel all warm.
#StrawberryClub #OneBiteChallenge`
  },
  { src: `${base}/images/2-126.webp`, title: 'Winter\'s Best Seat', tags: ['winter gear', 'grill', 'piping hot', 'Risuko'],
    caption:
`#126
It's Risuko! 🐿️
I wonder what the temperature is outside? But right here on top of this grill,
it feels as hot as a tropical island!
#SquirrelWinterSurvival #BestSeatInWinter`
  },
  { src: `${base}/images/2-127.webp`, title: 'Reel in the Legend!', tags: ['fishing', 'winter', 'challenge', 'Risuko'],
    caption:
`#127
It's Risuko! 🐿️
Today is the day I finally catch the legendary "Master" of the lake!
What if it's bigger than my own tail!?
#WinterAngler #FeelingOfABigCatch`
  },
  { src: `${base}/images/2-128.webp`, title: 'Secret Choco-Party', tags: ['sweets', 'winter', 'friends', 'Risuko'],
    caption:
`#128
It's Risuko! 🐿️
Secret sweets party in progress!
We tried to eat without anyone finding us,
but the sweet aroma drew all the forest friends right to us!
#SecretChocolat #FragrantTrackers`
  },
  { src: `${base}/images/2-129.webp`, title: 'A Sweet Moment', tags: ['chocolate', 'parakeet', 'daily life', 'Suzuko'],
    caption:
`#129
It's Suzuko!
Sweet chocolate and my favorite parakeet friend.
Browsing for treats side by side.
This alone is enough to fill me with happiness.
#ChocolatAndRest #ParakeetAndSuzuko`
  },
  { src: `${base}/images/2-130.webp`, title: 'Sunset Glow', tags: ['sunset', 'scenery', 'winter', 'Risuko'],
    caption:
`#130
It's Risuko! 🐿️
This sunset has such a delicious toasted color.
Winter scenery isn't so bad after all!
#Sunset #WarmthInTheHeart`
  },
  { src: `${base}/images/2-131.webp`, title: 'Snowy Day Chats', tags: ['snow', 'chatting', 'winter', 'Risuko'],
    caption:
`#131
It's Risuko! 🐿️
When we're chatting away in the snow, we totally forget the cold.
I can't wait for spring!
#SnowyDayGifts #ChillyWinter`
  },
  { src: `${base}/images/2-132.webp`, title: 'The Owl Mansion', tags: ['building', 'owl', 'exploration', 'Risuko'],
    caption:
`#132
It's Risuko! 🐿️
A big Owl-san is here to welcome us!
This building feels so full of history. I wonder if there's any treasure?
#MysteriousMansion #OwlWatch`
  },
  { src: `${base}/images/2-133.webp`, title: 'The Tail Master', tags: ['observation', 'tail', 'training', 'Risuko'],
    caption:
`#133
It's Risuko! 🐿️
Under observation... This little one's tail-curling technique is pro-level!
Maybe I should become an apprentice!
#TailMaster #PerfectCurl`
  },
  { src: `${base}/images/2-134.webp`, title: 'Dancing with the Crow', tags: ['crow', 'distance', 'daily life', 'Risuko'],
    caption:
`#134
It's Risuko! 🐿️
That last meter between me and Crow-kun is so hard to close.
Every time I take a step forward, he takes a step back.
It's just like a dance!
#SocialDistance #PerfectGap`
  },
  { src: `${base}/images/2-135.webp`, title: 'Narcissist Duck-san', tags: ['duck', 'waterside', 'play', 'Risuko'],
    caption:
`#135
It's Risuko! 🐿️
I think Duck-san is checking himself out in the water's reflection.
While he's admiring how "white and sharp" his feathers look,
we're just splashing around right next to him!
#NarcissistDuck #MypaceFriends`
  },
  { src: `${base}/images/2-136.webp`, title: 'To the Land of Flowers', tags: ['butterfly', 'flower', 'walk', 'Risuko'],
    caption:
`#136
It's Risuko! 🐿️
If I follow the butterfly,
maybe I'll end up in a land of flowers that taste like candy!
#EarthlyParadise #SecretPlace`
  },
  { src: `${base}/images/2-137.webp`, title: 'The Sparrow Heater', tags: ['sparrow', 'fluffy', 'healing', 'Risuko'],
    caption:
`#137
It's Risuko! 🐿️
"These hands are so warm!"
Maybe Sparrow-san is using them as a little fireplace to warm up.
#Fluffy #HealingTime`
  },
  { src: `${base}/images/2-138.webp`, title: 'Forest Concert', tags: ['music', 'deer', 'flute', 'Risuko'],
    caption:
`#138
It's Risuko! 🐿️
The sound of the flute is making the deer so relaxed.
Maybe I can sneak a quick touch of those antlers while they're distracted?
#PowerOfMusic #ForestConcert`
  },
  { src: `${base}/images/2-139.webp`, title: 'Expectant Pups', tags: ['music', 'dog', 'trumpet', 'Risuko'],
    caption:
`#139
Whenever I play the trumpet,
the doggies gather around with faces that say, "Is it treat time?"
Sorry for getting your hopes up!
#DoggoClub #ForestBrassBand`
  },
  { src: `${base}/images/2-140.webp`, title: 'The Anticipated Present', tags: ['lunch box', 'surprise', 'meal', 'Risuko'],
    caption:
`#140
It's Risuko! 🐿️
Could this present be... a fancy lunch box for everyone to share!?
I'm absolutely famished!
#LunchTime #WhatsInTheBox`
  },
  { src: `${base}/images/2-141.webp`, title: 'Basking in the Sun', tags: ['sunbathing', 'nap', 'daily life', 'Risuko'],
    caption:
`#141
It's Risuko! 🐿️
Basking in the sun always makes me so sleepy.
I love these slow moments spent with friends.
#RelaxingTime #WarmAndSunny`
  },
  { src: `${base}/images/2-142.webp`, title: 'Buns over Bamboo', tags: ['dim sum', 'snack', 'scenery', 'Risuko'],
    caption:
`#142
It's Risuko! 🐿️
Forget "Dumplings over Flowers"—it's "Buns over Bamboo" for me!
This view is the perfect side dish.
#HotDimSum #TodaysSnack`
  },
  { src: `${base}/images/2-143.webp`, title: 'Risuko Engine', tags: ['swing', 'bell', 'play', 'Risuko', 'Suzuko'],
    caption:
`#143
Every time Suzuko's bell goes "Ding!",
it's like an engine starting up and I just go faster!
#RisukoEngine #SwingTime`
  },
  { src: `${base}/images/2-144.webp`, title: 'The Silent Hawk', tags: ['hawk', 'emblem', 'mystery', 'Risuko'],
    caption:
`#144
It's Risuko! 🐿️
Is this Hawk-san a royal familiar? Even when I ask about the emblem on the necklace,
he just spreads his wings in silence. ...The mystery deepens!
#SilentGuardian #RoyalEmblem`
  },
  { src: `${base}/images/2-145.webp`, title: 'Mystery of the Signboard', tags: ['hummingbird', 'honey', 'signboard', 'Risuko'],
    caption:
`#145
It's Risuko! 🐿️
Adding a "W" to make it "WHONEY"...
Could it be that it was originally just "HONEY,"
and Hummingbird-san forced a rewrite?
#SignboardMystery #HummingbirdsWork`
  },
  { src: `${base}/images/2-146.webp`, title: 'Elegant Tea Time', tags: ['tea', 'cake', 'secret', 'Risuko'],
    caption:
`#146
It's Risuko! 🐿️
While I'm pretending to sip tea elegantly,
my head is actually full of thoughts about that strawberry on the cake.
Eating it in one go is the ultimate luxury! 🍓✨
#SquirrelCheeks #OneBiteBliss`
  },
  { src: `${base}/images/2-147.webp`, title: 'Midnight Food Terror', tags: ['meal', 'food porn', 'night snack', 'Risuko'],
    caption:
`#147
It's Risuko! 🐿️
Sorry to everyone seeing this late at night!
This is the ultimate "Food Terror" post.
Can you smell that savory aroma through the screen? ✨
#FoodTerror #EatingTogether`
  },
  { src: `${base}/images/2-148.webp`, title: 'White Winter Breath', tags: ['winter', 'daily life', 'scenery', 'Risuko'],
    caption:
`#148
It's Risuko! 🐿️
Every time we say "It's cold," our white breath melts away between us.
#WinterLife #NumbFingers`
  },
  { src: `${base}/images/2-149.webp`, title: 'Seaside Scramble', tags: ['sea', 'bird', 'lunch', 'Risuko'],
    caption:
`#149
It's Risuko! 🐿️
The best spot with an ocean view!
But I'm so busy defending my food from the birds that I can't even look at the scenery!
#HeatedBattle #LunchScramble`
  },
  { src: `${base}/images/2-150.webp`, title: 'Cotton Candy Dance', tags: ['dance', 'cotton candy', 'winter', 'Risuko'],
    caption:
`#150
It's Risuko! 🐿️
This step is the traditional "Cotton Candy Dance" passed down in the forest!
Twirling cotton candy like a baton as you walk
makes you forget the cold and brings out a smile!
#TraditionalArt #CottonCandyDance`
  },
  { src: `${base}/images/2-151.webp`, title: 'Acorn Standard', tags: ['bird', 'acorn', 'mystery', 'Risuko'],
    caption:
`#151
It's Risuko! 🐿️
This bird weighs exactly three acorns.
Apparently, that's the universal standard of the forest.
Checking the weight always makes my stomach growl.
#Mystery #AcornStandard`
  },
  { src: `${base}/images/2-152.webp`, title: 'Log Runway', tags: ['log', 'daily life', 'play', 'Risuko'],
    caption:
`#152
It's Risuko! 🐿️
Look! This log is a dedicated runway for the squirrels🐾
While I'm fighting back sleep, everyone else is playing so energetically. It's so cute!
#SquirrelLife #Heartwarming`
  },
  { src: `${base}/images/2-153.webp`, title: 'Japanese Sunbeam', tags: ['japanese style', 'parasol', 'scenery', 'Risuko'],
    caption:
`#153
It's Risuko! 🐿️
Opening this paper parasol feels like creating a tiny patch of sunlight.
Surrounded by such elegant scenery, I feel myself becoming quite refined.
#WafūRisuko #PaperParasol`
  },
  { src: `${base}/images/2-154.webp`, title: 'Charismatic Angler', tags: ['fishing', 'charisma', 'daily life', 'Risuko', 'Suzuko'],
    caption:
`#154
It's Risuko! 🐿️
"I don't catch the fish; the fish are drawn to my charm!" she says!
It seems Suzuko's charisma even reaches underwater.
#CharismaSquirrel #TooPopular`
  },
  { src: `${base}/images/2-155.webp`, title: 'Miracle Blend', tags: ['juice', 'star', 'daily life', 'Risuko', 'Suzuko'],
    caption:
`#155
It's Risuko! 🐿️
I used the essence of Suzuko's shocked face to finish this special berry juice!
Drink this, and you'll surely become the forest's top star tomorrow!
#SuzukoSpeechless #MiracleBlend`
  },
  { src: `${base}/images/2-156.webp`, title: '1000 Followers Thanks', tags: ['thanks', 'anniversary', 'daily life', 'Risuko'],
    caption:
`#156
It's Risuko! 🐿️
When I asked, "Isn't this page a map of where I hid my acorns?", they just laughed!
Forgetting where you buried them is a squirrel's prerogative, right?
Yay! 1000 Followers 🎉
Thank you for watching me! 🐿️
Let's keep being friends! ✨ 
#SquirrelFriends #AcornGratitude`
  },
  { src: `${base}/images/2-157.webp`, title: 'Uber Crow', tags: ['crow', 'picnic', 'delivery', 'Risuko'],
    caption:
`#157
It's Risuko! 🐿️
It's like the new forest service, "Crow Express," has arrived!
But I didn't calculate for the delivery fee being half of my chicken...
#UberCrow #PicnicTime`
  },
  { src: `${base}/images/2-158.webp`, title: 'Tail: Ideal vs. Reality', tags: ['sea', 'tail', 'beauty', 'Risuko', 'Suzuko'],
    caption:
`#158
It's Risuko! 🐿️
When I said "The sea breeze makes your tail three times fluffier,"
Suzuko immediately replied, "In reality, it just gets sticky and stiff."
Ideal and reality are different, but I'll just borrow Suzuko's treatment to fix it!
#IdealVsReality #SuzukoGuidance`
  },
  { src: `${base}/images/2-159.webp`, title: 'Horse Meeting', tags: ['horse', 'meeting', 'holiday', 'Risuko'],
    caption:
`#159
It's Risuko! 🐿️
We spent three hours in a meeting just to decide where to go!
Thanks to that, the sun is setting and we haven't moved an inch.
But the horse's back is warm, so it's okay!
#TakingItTooEasy #ForestHoliday`
  },
  { src: `${base}/images/2-160.webp`, title: 'Mystery of the Nut', tags: ['mystery', 'macadamia nut', 'careless', 'Risuko'],
    caption:
`#160
It's Risuko! 🐿️
Investigating the forest's cold case: "The Mystery of the Vanished Macadamia Nut!"
I can't find any evidence, but I found one single nut shell stuck in the knit of my scarf.
...The culprit might have been last night's version of me!
#SolvedItMyself #CarelessRisuko`
  },
  { src: `${base}/images/2-161.webp`, title: 'The Cheek Challenge', tags: ['harvest', 'mochi', 'appetite', 'Risuko'],
    caption:
`#161
It's Risuko! 🐿️
I thought I could take it in one bite, but it was tougher than I expected!
But don't underestimate my cheek pouches.
I'm going to harvest every delicious bit!
#GrilledMochi #HugeAppetite`
  },
  { src: `${base}/images/2-162.webp`, title: 'Spring Strawberry Picking', tags: ['strawberry', 'spring', 'scenery', 'Risuko'],
    caption:
`#162
It's Risuko! 🐿️
I came deep into the forest for strawberry picking with the Snow-chan!
The scent of spring is everywhere,
making my tail and my heart puff up with fluffiness.
#StrawberryPicking #ArrivalOfSpring`
  },

{ src: `${base}/images/2-163.webp`, title: 'Forest Concert', tags: ['Concert', 'Conductor', 'Risuko'],
    caption:
`#163
It’s Risuko! 🐿️️
The forest concert is about to begin! The conductor is this little one on my lap.
They wag their tail like a baton in time with my performance.
#ForestConcert #ConductorSquirrel`
 },
 { src: `${base}/images/2-164.webp`, title: 'Four-Leaf Clover', tags: ['Four-Leaf Clover', 'Trivia', 'Risuko'],
    caption:
`#164
It’s Risuko! 🐿️
Did you know the four leaves of a clover stand for
"Cookies, Detours, Naps, and Refills"? 🍀
With this, Risuko’s life is guaranteed to be super happy!
#FourLeafClover #RisukosTrivia`
 },
 { src: `${base}/images/2-165.webp`, title: 'Forest Attraction', tags: ['Bluebird', 'Sky', 'Risuko'],
    caption:
`#165
It’s Risuko! 🐿️
I wanted to fly through the sky with the bluebirds, so I pedaled as hard as I could!
I’m almost reaching them... Risuko is becoming a bird!
#ForestAttraction #FlyRisuko`
 },
 { src: `${base}/images/2-166.webp`, title: 'Puppy Hat', tags: ['Puppy', 'Fluffy Outfit', 'Risuko'],
    caption:
`#166
It’s Risuko! 🐿
I put a little puppy on my head to make a "Puppy Hat"!
It’s like fluffy earmuffs and it's so warm.
The puppy doesn't seem to mind it either!
#FluffyOutfit #ForestFashion`
 },
 { src: `${base}/images/2-167.webp`, title: 'Snack Time Clock Tower', tags: ['Clock Tower', 'Tea Time', 'Risuko'],
    caption:
`#167
It’s Risuko! 🐿️
I heard this clock tower only moves to let everyone in town know it's snack time!
It’s the best partner I could ask for. Come on, it's tea time!
#SnackChime #StomachCountdown`
 },
 { src: `${base}/images/2-168.webp`, title: 'Finding the Greedy Culprit', tags: ['Cookie', 'Chipmunk', 'Risuko'],
    caption:
`#168
It’s Risuko! 🐿️
Oh? One of the cookies I lined up is missing...
Hey, little chipmunk who was just there,
why is there sweet crumbs around your mouth?
#GreedyEater #SharingInTheEnd`
 },
 { src: `${base}/images/2-169.webp`, title: 'I Love Corn', tags: ['Corn', 'Autumn', 'Risuko'],
    caption:
`#169
It’s Risuko! 🐿️
Should I boil this corn in halves? Or maybe roast it...
Smearing it with butter and taking a big crunchy bite would be pure bliss! 🍂
#SavoryIsTheBest #LoveCorn`
 },
 { src: `${base}/images/2-170.webp`, title: 'Forest Adventure', tags: ['Owl', 'Friends', 'Risuko'],
    caption:
`#170
It’s Risuko! 🐿️
A tiny friend at my feet is working hard to tell me something.
Adventure preparations are complete! I’m heading out with Mr. Owl to find a delicious spring!
#ForestFriends #AdventureJourney`
 },
 { src: `${base}/images/2-171.webp`, title: 'Rapids Rafting', tags: ['Bagel', 'River Rafting', 'Risuko'],
    caption:
`#171
It’s Risuko! 🐿️
I’m using all my squirrel reflexes to make sure I don't drop my bagel in the rapids!
A supreme snack time is waiting for me at the end of this river!
#RapidsRafting #BagelLove`
 },
 { src: `${base}/images/2-172.webp`, title: 'Secret Picnic', tags: ['Cave Exploration', 'Snacks', 'Risuko'],
    caption:
`#172
It’s Risuko! 🐿️
The true purpose of exploring this cave is to find a spot for a secret picnic!
Snacks eaten in a place no one else knows must taste like the best in the world!
#ExplorationAmbition #SecretPicnic`
 },
 { src: `${base}/images/2-173.webp`, title: 'Fried Egg Power', tags: ['Breakfast', 'Fried Egg', 'Risuko'],
    caption:
`#173
It’s Risuko! 🐿️
Eating a fried egg to give my tail some yellow nutrition!
Now my tail is fluffy and I’m ready for today's adventure!
The forest chipmunks are cheering me on, too!
#MunchingAdventure #FriedEggPower`
 },
 { src: `${base}/images/2-174.webp`, title: 'Night Sky Stalls', tags: ['Festival', 'Late Night Snack', 'Risuko'],
    caption:
`#174
It’s Risuko! 🐿️
On festival nights, I focus more on the smell of the food stalls than the glow of the lanterns! ✨
This excitement makes my tail so fluffy I feel like I could fly to outer space!
Heading out for the best night snack with plenty of detours!
#NightSkyStalls #FluffyNight`
 },
 { src: `${base}/images/2-175.webp`, title: 'Painting the World', tags: ['Rainbow', 'Art', 'Risuko'],
    caption:
`#175
It’s Risuko! 🐿️
I tried painting a rainbow! The line between inside and outside the canvas has vanished...
Next, I’ll paint a delicious "Acorn Rainbow" and surprise everyone! ✨
#PaintingTheWorld #RisukosCanvasDiary`
 },
 { src: `${base}/images/2-176.webp`, title: 'Street Performer Debut', tags: ['Market', 'Street Performance', 'Risuko'],
    caption:
`#176
It’s Risuko! 🐿️
I’ve made my debut as a street performer!
Payment in bread and nuts, please!
Forgive me—I need the energy for practice! 🐿️💨
#MarketScene #StreetPerformerDebut`
 },
 { src: `${base}/images/2-177.webp`, title: 'Playing Hero', tags: ['Baguette', 'Holy Sword', 'Risuko'],
    caption:
`#177
It’s Risuko! 🐿️
I have obtained the legendary holy sword, "Baguette"!
Attack Power +10, Aroma +100! Now, off to the toaster!
#FrenchBread #PlayingHero`
 },
 { src: `${base}/images/2-178.webp`, title: 'Forest Restaurant', tags: ['Stew', 'Magic', 'Risuko'],
    caption:
`#178
It’s Risuko! 🐿️
Welcome to the Forest Restaurant!
Today's menu is "Magic Stew that turns you into a squirrel for 10 minutes."
I’m not responsible if you grow a tail!
#ForestRestaurant #MagicStew`
 },
 { src: `${base}/images/2-179.webp`, title: 'Board Game', tags: ['Competitive', 'Board Game', 'Risuko'],
    caption:
`#179
It’s Risuko! 🐿️
Umm, that last loss was just a "strategic withdrawal"!
If I flip the board and start over, Risuko’s comeback victory is guaranteed!
#BoardGame #Competitive`
 },
 { src: `${base}/images/2-180.webp`, title: 'Spring Pickled Plum', tags: ['Cherry Blossom', 'Spring', 'Risuko'],
    caption:
`#180
It’s Risuko! 🐿️
Oh, a cherry blossom petal drifted on the wind and landed right in the middle of my white rice.
Is this a "Spring Pickled Plum" substitute?
#CherryBlossomViewing #SignsOfSpring`
 },
 { src: `${base}/images/2-181.webp`, title: 'Winter Morning', tags: ['Snowy Mountain', 'Sunrise', 'Risuko'],
    caption:
`#181
It’s Risuko! 🐿️
The mountains are glowing gold because the sun is saying "Good morning."
Snowy mountains are harsh, but they look so mystical in the morning light.
#WinterMorning #SnowyMountain`
 },
 { src: `${base}/images/2-182.webp`, title: 'Summer Memories', tags: ['Say Ahh', 'Shaved Ice', 'Risuko'],
    caption:
`#182
It’s Risuko! 🐿️
The distance during a "say ahh" is so nerve-wracking.
If I get 5mm closer, my nose might touch the cold ice!
I’m carrying this delicious bite very carefully.
#NotCrunchyButFluffy #SummerMemories`
 },
 { src: `${base}/images/2-183.webp`, title: 'Smile Ambassador Lost Dog', tags: ['Lost Dog', 'Healing', 'Risuko'],
    caption:
`#183
It’s Risuko! 🐿️
I’m looking after a lost puppy!
But this little one doesn't seem anxious at all; instead, they're giving me the best smile.
They’re not a lost dog anymore—they’re a "Smile Ambassador"!
#LostDog #ForestHealing`
 },
 { src: `${base}/images/2-184.webp`, title: 'Forest Outdoor Meal', tags: ['Hot Pot', 'Marinated Egg', 'Risuko'],
    caption:
`#184
It’s Risuko! 🐿️
Acorns are good, but sometimes a hearty hot pot with meat and marinated eggs is the best!
An outdoor meal in the forest warms my heart and my belly.
#OutdoorDining #VerySatisfied`
 },
 { src: `${base}/images/2-185.webp`, title: 'Winter Etiquette', tags: ['Cat', 'Healing', 'Risuko'],
    caption:
`#185
It’s Risuko! 🐿️
Letting a kitty sleep on your lap is part of being an elegant lady.
Staying still so I don't wake them up makes my heart feel calm and peaceful.
#CatTime #WinterEtiquette`
 },
 { src: `${base}/images/2-186.webp`, title: 'A Little Friendship', tags: ['Apple', 'Present', 'Risuko'],
    caption:
`#186
It’s Risuko! 🐿️
Seeing them stretch their tiny body to give me an apple makes me want to give them my whole bag of acorns.
A gift from a tiny friend in the forest!
#Heartwarming #LittleFriendship`
 },
 { src: `${base}/images/2-187.webp`, title: 'Cat Lover’s Limit', tags: ['Cat', 'Heartwarming', 'Risuko'],
    caption:
`#187
It’s Risuko! 🐿️
You’re too close! The kitty’s nose is touching mine, and I’m about to sneeze!
It’s cute, but I’m at my limit~!
#CatLover #Heartwarming`
 },
 { src: `${base}/images/2-188.webp`, title: 'Snack Defense', tags: ['Owl', 'Walnut', 'Risuko'],
    caption:
`#188
It’s Risuko! 🐿️
For some reason, they’re charging right at the snack pouch on my waist! 🦅
It’s just walnuts inside!? I’m not giving them to you!
#WildOwl #SnackDefense`
 },
 { src: `${base}/images/2-189.webp`, title: 'Dawn of the Hungry', tags: ['Fantasy', 'Adventure', 'Risuko'],
    caption:
`#189
It’s Risuko! 🐿️
Beyond the ancient cobblestones, a snack I’ve never seen awaits...! ✨
Risuko’s Adventure, Chapter One: "Dawn of the Hungry" begins!
#AdventurePose #Fantasy`
 },
 { src: `${base}/images/2-190.webp`, title: 'Forest Hide and Seek', tags: ['Puppy', 'Play Meeting', 'Risuko'],
    caption:
`#190
It’s Risuko! 🐿️
Hey puppy, what should we play today?
First, hide and seek in the forest... but wait,
whenever I hide, I always get caught because I start eating a snack! 🤔
#Puppy #PlayMeeting`
 },
 { src: `${base}/images/2-191.webp`, title: 'Peaceful Walnut Conference', tags: ['Pigeon', 'Symbol of Peace', 'Risuko'],
    caption:
`#191
It’s Risuko! 🐿️
Hello, Mr. Pigeon, the "Symbol of Peace"!
If you’re a messenger of peace, you’ll share this walnut I’m holding
in a "peaceful" way... right? Right?
#Pigeon #Walnut`
 },
 { src: `${base}/images/2-192.webp`, title: 'Great View Observatory', tags: ['Observatory', 'Great View', 'Risuko'],
    caption:
`#192
It’s Risuko! 🐿️
The view from up high is truly beautiful!
While looking through the telescope, I felt like I locked eyes with someone far away.
I wonder if everyone was looking at me too?
#GreatView #Observatory`
 },
 { src: `${base}/images/2-193.webp`, title: 'Forest Exploration', tags: ['Parrot', 'Map', 'Risuko'],
    caption:
`#193
It’s Risuko! 🐿️
The parrot keeps pointing at the map saying "Here!",
but they peck it so much I’m afraid it’ll be full of holes!
Find some snacks instead of treasure!
#ForestExploration #Parrot`
 },
 { src: `${base}/images/2-194.webp`, title: 'Library Daily Life', tags: ['Owl', 'Librarian', 'Risuko'],
    caption:
`#194
It’s Risuko! 🐿️
This owl is actually the library’s librarian.
My mission today is to turn the pages quietly
so I don't wake up Suzuko, who is dozing off!
#Owl #LibraryDailyLife`
 },
 { src: `${base}/base/images/2-195.webp`, title: 'Forest Taxi', tags: ['Frog', 'Rainy Walk', 'Risuko'],
    caption:
`#195
It’s Risuko! 🐿️
Does this frog think I’m a forest taxi?
They won't get off my shoulder at all.
We look like a matching exploration team—it's fun!
#RainyWalk #Partner`
 },
 { src: `${base}/images/2-196.webp`, title: 'Snack Time Mischief', tags: ['Chocolate', 'Mischief', 'Risuko'],
    caption:
`#196
It’s Risuko! 🐿️
The moment Suzuko looked away from the kitchen, I took a bite!
The thrill makes the chocolate taste even better.
Suzuko’s surprised face is the best!
#Mischief #SnackTime`
 },
 { src: `${base}/images/2-197.webp`, title: 'Special Curry', tags: ['Curry', 'Greedy Eater', 'Risuko'],
    caption:
`#197
It’s Risuko! 🐿️
Lunch today is special curry! The plate is bigger than my face,
but Risuko’s stomach is infinite, so no problem!
Eat up, everyone!
#Curry #GreedyEater`
 },
 { src: `${base}/images/2-198.webp`, title: 'Friendship Comparison', tags: ['Friends', 'Squirrel', 'Risuko'],
    caption:
`#198
It’s Risuko! 🐿️
This squirrel and I are competing to see who's cuter!...
But since Suzuko is watching with a smile, maybe we both win?
It’s a draw!
#Friends #SpringMemories`
 },
 { src: `${base}/images/2-199.webp`, title: 'Spring River Play', tags: ['Bamboo Grove', 'River Play', 'Risuko'],
    caption:
`#199
It’s Risuko! 🐿️
Heading to the bamboo grove to fix my post-hibernation lack of exercise!
The river water was so cold it woke me up instantly.
Spring weather is the best!
#RiverPlay #SignsOfSpring`
 },
 { src: `${base}/images/3-200.webp`, title: 'Squirrel VIP Seat', tags: ['Lounge', 'Sunbathing', 'Risuko'],
    caption:
`#200
It’s Risuko! 🐿️
This branch is our best private lounge!
Bathed in sunlight, our chat is really going to thrive today.
#SquirrelVIPSeat #SpringAfternoon`
 },
 { src: `${base}/images/3-201.webp`, title: 'Secret of the Tail', tags: ['Walking', 'Tail', 'Risuko'],
    caption:
`#201
It’s Risuko! 🐿️
When I run up the stairs, my tail hits the steps making a "pon-pon" sound.
It’s so funny it's becoming a habit!
The rhythm of this sound is so much fun!
#Walking #TailSecret`
 },
 { src: `${base}/images/3-202.webp`, title: 'Cherry Blossom Season', tags: ['Cherry Blossom', 'Takeout', 'Suzuko'],
    caption:
`#202
It’s Suzuko! 🔔
Filling my little basket with cherry blossom petals,
I’m all ready to take spring home!
I want to decorate my house and enjoy spring forever.
#Suzuko #Takeout #CherryBlossomSeason`
 },
 { src: `${base}/images/3-203.webp`, title: 'Tail Sofa', tags: ['Sofa', 'Fluffy', 'Risuko'],
    caption:
`#203
It’s Risuko! 🐿️
When I sit on the sofa, my big tail ends up taking all the space.
Half of it is a special seat just for my tail!
It’s so fluffy it works as a cushion too.
#TailSofa #Fluffy`
 },
 { src: `${base}/images/3-204.webp`, title: 'The Ultimate Choice', tags: ['Reading', 'Cat', 'Risuko'],
    caption:
`#204
It’s Risuko! 🐿️
Stuck in the ultimate choice: pet the kitty’s fur or the open book!
Both are so healing, I never have enough time~!
#ReadingTime #ForestKitty`
 },
  { src: `${base}/images/3-205.webp`, title: 'The Magic Flute', tags: ['magic', 'flute', 'flowers', 'deer'],
    caption:
`#205
It's Risuko! 🐿️
There's a rumor that if you play this flute, the flowers bloom a little bit faster.
I'm currently undergoing special magic training with the deer to make lots of flowers bloom!

#MagicFlute #MysteriousForest`
  },
  { src: `${base}/images/3-206.webp`, title: 'Giant Omelet Dream', tags: ['eggs', 'omelet', 'hungry', 'cooking'],
    caption:
`#206
It's Risuko! 🐿️
How many eggs do you think are in this basket?
I'm already getting hungry just thinking about how big the omelet would be if I used them all! 🍳

#GiantOmeletDream #PremonitionOfAFeast`
  },
  { src: `${base}/images/3-207.webp`, title: 'Relaxing Day by the River', tags: ['river', 'fishing', 'everyday', 'healing'],
    caption:
`#207
It's Risuko! 🐿️
I'm on a fishing date with an otter by the green riverbank.
Even if we don't catch anything, just soaking in the dappled sunlight and relaxing feels like pure happiness.

#ForestHoliday #HealingTime`
  },
  { src: `${base}/images/3-208.webp`, title: 'Potato Showdown', tags: ['potato', 'squirrel', 'walk', 'everyday'],
    caption:
`#208
It's Risuko! 🐿️
A squirrel and a potato peeking out of a paper bag—it looks like they're competing to see who's cuter!
They’re both adorable, but as a snack, I think the potato wins.

#RoastedPotato #WhosCuter`
  },
  { src: `${base}/images/3-209.webp`, title: 'Snow Artist', tags: ['snow', 'sculpture', 'winter', 'art'],
    caption:
`#209
It's Risuko! 🐿️
This snowy landscape is the perfect canvas for art!
I’m planning to use my knife to turn this snowman into a masterpiece of cuteness.
Stay tuned!

#SnowSculpture #ArtistRisuko`
  },
  { src: `${base}/images/3-210.webp`, title: 'Hot Spring Dreams', tags: ['capybara', 'hotspring', 'autumn', 'travel'],
    caption:
`#210
It's Risuko! 🐿️
Since the capybara is leading the way, I have a feeling there might be a hot spring ahead!
My dream for today is to soak in the warm water while looking at the autumn leaves.

#Capybara #HotSpringDreams`
  },
  { src: `${base}/images/3-211.webp`, title: 'Gentle Snow Mountain Stroll', tags: ['horse', 'snow', 'stroll', 'winter'],
    caption:
`#211
It's Risuko! 🐿️
This horse can run at 300km/h... just kidding!
In reality, he’s a very gentle soul who walks slowly to match my pace.

#TallTales #SnowyStroll`
  },
  { src: `${base}/images/3-212.webp`, title: 'Tail Talk', tags: ['squirrel', 'communication', 'teamwork', 'forest'],
    caption:
`#212
It's Risuko! 🐿️
"Right! No, left!" Trying to communicate with the other squirrels.
We don't use words; we use our tails to give instructions.
This is what I call true squirrel teamwork!

#Communication #SquirrelLanguage`
  },
  { src: `${base}/images/3-213.webp`, title: 'Full-Speed Snow Play', tags: ['snow', 'winter', 'play', 'memories'],
    caption:
`#213
It's Risuko! 🐿️
My ears are standing straight up from the speed!
The cold snow and Suzuko's enthusiasm make the winter forest look like it's sparkling.
Today, I'm forgetting about acorns and playing with all my might!

#SnowPlay #WinterMemories`
  },
  { src: `${base}/images/3-214.webp`, title: 'Forest Detective Diary', tags: ['detective', 'observation', 'acorns', 'forest'],
    caption:
`#214
It's Risuko! 🐿️
As a forest detective, here is my observation log #1: "Everyone in the forest is hungry."
...Yeah, I'm getting super hungry too. Time to go look for acorns!

#DetectivePlay #ForestLife`
  },
  { src: `${base}/images/3-215.webp`, title: 'Mysterious Cake Plate', tags: ['sweets', 'snack', 'bird', 'mystery'],
    caption:
`#215
It's Risuko! 🐿️
I asked the little bird what was written on the cake plate, but all he said was "Piyo!"
...Could it possibly say "Reserved for Risuko"?

#SnackTime #ForestConversation`
  },
  { src: `${base}/images/3-216.webp`, title: 'Proper Snack-Strolling', tags: ['donut', 'streetfood', 'Suzuko', 'sweets'],
    caption:
`#216
It's Risuko! 🐿️
Suzuko carries the bag, and I’m the professional taster!
That’s the correct way to snack-stroll, right? We were supposed to share, but before I knew it, the donut vanished from my mouth!

#SnackStrolling #SweetHappiness`
  },
  { src: `${base}/images/3-217.webp`, title: 'Dinner Planning at Sunset', tags: ['sunset', 'dinner', 'nuts', 'wayhome'],
    caption:
`#217
It's Risuko! 🐿️
When I said the sunset was beautiful, Suzuko asked, "What's for dinner?"
...Oh! That's important too! Now I can't decide what to make with these nuts.

#Sunset #WayHome`
  },
  { src: `${base}/images/3-218.webp`, title: 'Picnic Under the Cherry Blossoms', tags: ['sakura', 'picnic', 'spring', 'outing'],
    caption:
`#218
It's Risuko! 🐿️
The goal of our trip? To have a picnic under the most beautiful cherry blossom tree, of course!
Even carrying the snacks feels lighter today.

#UnderTheSakura #PerfectDayForAnOuting`
  },
  { src: `${base}/images/3-219.webp`, title: 'Carrot Balance Dash', tags: ['carrot', 'meeting', 'sprint', 'hungry'],
    caption:
`#219
It's Risuko! 🐿️
Dashing to our meeting spot while keeping my carrot balanced!
This way, I’ll never lose it. I’m getting hungry, but I won’t drop it!

#MeetingUp #DesperateBalance`
  },
  { src: `${base}/images/3-220.webp`, title: 'Searching for Four-Leaf Clovers', tags: ['clover', 'lucky', 'sheep', 'happiness'],
    caption:
`#220
It's Suzuko! 🔔
Today I'm looking for four-leaf clovers with the fluffy sheep!
It's a contest to see who finds one first.
If we find one, let's be happy together!

#LuckyClover #Sheep`
  },
  { src: `${base}/images/3-221.webp`, title: 'Cleaning or Hiding?', tags: ['cleaning', 'hideandseek', 'game', 'forest'],
    caption:
`#221
It's Risuko! 🐿️
Cleaning with a broom! ...Or at least that's what I'm pretending to do, while actually looking for the best hide-and-seek spot.
Partner, can you find me?

#SpringCleaning #HideAndSeek`
  },
  { src: `${base}/images/3-222.webp`, title: 'Pickaxe Adventure', tags: ['pickaxe', 'digging', 'potato', 'adventure'],
    caption:
`#222
It's Risuko! 🐿️
I’ve equipped my pickaxe, so I can dig anything!
For now, I’ll just keep digging until I find some delicious potatoes.

#Pickaxe #DigUntilYouFindSomething`
  },
  { src: `${base}/images/3-223.webp`, title: 'Tulip Field Rendezvous', tags: ['tulips', 'flowers', 'grownup', 'spring'],
    caption:
`#223
It's Risuko! 🐿️
Meeting at the tulip field. "The flowers are extra beautiful today, aren't they?" I said, trying to sound a bit more mature.
Do I look like a grown-up yet?

#FlowerField #SpringMeeting`
  },
  { src: `${base}/images/3-224.webp`, title: 'Ruins Flute Concert', tags: ['ruins', 'flute', 'music', 'squirrel'],
    caption:
`#224
It's Risuko! 🐿️
I played my flute in the ruins, and a squirrel with an acorn came to listen!
It was such a lovely concert, I could have played forever.

#RuinsExploration #Flute`
  },
  { src: `${base}/images/3-225.webp`, title: 'Dual-Wielding Carrot Strategy', tags: ['carrot', 'strategy', 'genius', 'survival'],
    caption:
`#225
It's Risuko! 🐿️
This carrot is actually a "dual-wielding bait-and-weapon" style!
When hungry, it's food; when fighting, it’s a distraction.
I have to say, my strategy is perfect!

#GeniusStrategy #CarrotLife`
  },
  { src: `${base}/images/3-226.webp`, title: 'Power-Up on the Snowy Trail', tags: ['snowyroad', 'energy', 'adventure', 'bottle'],
    caption:
`#226
It's Risuko! 🐿️
The path ahead looks tough, so I’m refueling now!
What's in my bottle? It’s a secret energy drink.
With this, I’m not afraid of any snowy road!

#Risuko #Adventure #PowerCharge`
  },
  { src: `${base}/images/3-227.webp`, title: 'Forest Exploration Pilots', tags: ['exploration', 'lost', 'partner', 'forest'],
    caption:
`#227
It's Risuko! 🐿️
The partner on my head is my pilot.
She gives me directions like "Go this way!" but sometimes she gets distracted by the smell of something delicious and leads us to a dead end.

#ForestExploration #DynamicDuo`
  },
  { src: `${base}/images/3-228.webp`, title: 'Springtime Butterfly Chat', tags: ['butterfly', 'basket', 'flowers', 'spring'],
    caption:
`#228
It's Risuko! 🐿️
While I was picking flowers, a butterfly took the best seat in my basket!
It matches my blue hair accessory perfectly.
I’m so happy to be sharing this spring moment with her.

#Risuko #PickingFlowers #ArrivalOfSpring`
  },
  { src: `${base}/images/3-229.webp`, title: 'Bread and Puppy Brunch', tags: ['bread', 'dog', 'sharing', 'stroll'],
    caption:
`#229
It's Risuko! 🐿️
A cute customer flew in, eyeing my walking bread!
To sniff out that it's filled with cheese? What a genius!
When looked at with those hungry eyes, I have no choice but to share!

#BreadAndDog #GluttonousHoliday`
  },
  { src: `${base}/images/3-230.webp`, title: 'Rainy Day Shared Umbrella', tags: ['rainyday', 'umbrella', 'frog', 'Suzuko'],
    caption:
`#230
It's Suzuko! 🐿️
It started raining. It's a bit tight, but won't you come under my leaf umbrella?
With the frog and the squirrel here too, it feels just like we're sharing a romantic moment!

#RainyDay #LeafUmbrella`
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

// ファイル名からグループ番号を抽出
function getGroupId(src) {
  const filename = src.split('/').pop();
  return filename.split('-')[0];
}

/**
 * 【修正ポイント1】英語版ギャラリー描画
 * tagsをalt属性に含めることで、より詳細なコンテキストを検索エンジンに伝えます。
 */
function renderGallery(groupId) {
  currentGroupItems = items.filter(it => getGroupId(it.src) === groupId);

  gallery.innerHTML = currentGroupItems.map((it, i) => {
    // タグをカンマ区切りの文字列に変換
    const tagString = it.tags ? it.tags.join(", ") : "";
    
    return `
      <figure class="card" data-i="${i}" tabindex="0" aria-label="${it.title || 'Risuko, Squirrel girl with a yellow scarf' }">
        <div class="card__imgwrap">
          <img src="${it.src}" 
               alt="Squirrel girl, Risuko - ${it.title || ''} | Tags: ${tagString} | ${it.caption.substring(0, 40).replace(/\n/g, ' ')}..." 
               loading="lazy">
        </div>
        <figcaption class="card__meta">
          <h3 class="card__title">${it.title || 'Risuko'}</h3>
          <p class="card__caption">${it.caption}</p>
        </figcaption>
      </figure>
    `;
  }).join("");
}

// 切り替えボタンの生成
function setupFilters() {
  const groupIds = [...new Set(items.map(it => getGroupId(it.src)))].sort((a, b) => a - b);
  
  filterContainer.innerHTML = groupIds.map(id => {
    // groupNamesに定義があればそれを使う、なければデフォルトを表示
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

/**
 * 【修正ポイント2】ライトボックスのalt付与（タグ対応）
 */
function openLB(i){
  idx = (i + currentGroupItems.length) % currentGroupItems.length;
  const it = currentGroupItems[idx];
  const tagString = it.tags ? it.tags.join(", ") : "";

  lbImg.src = it.src;
  // 拡大時もタグを含めた詳細なaltを設定
  lbImg.alt = `Squirrel girl Risuko: ${it.title || 'Forest Life'} - Keywords: ${tagString}`;
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
/**
 * 【修正ポイント3】Google SEO対策（タグ・構造化データ対応）
 * "keywords" 属性を追加し、タグを検索エンジンに一括報告します。
 */
function injectGoogleSEOData() {
    const pageDescription = "Explore the daily life of Risuko, a squirrel girl with a yellow scarf. A collection of enchanting fantasy art with detailed metadata.";

    const ldJson = {
        "@context": "https://schema.org",
        "@type": "ImageGallery",
        "name": "Risuko's Forest Gallery - Squirrel girl with a yellow scarf",
        "description": pageDescription,
        "inLanguage": "en-US",
        "author": {
            "@type": "Person",
            "name": "Asunaro Works"
        },
        "hasPart": items.map(it => ({
            "@type": "ImageObject",
            "name": `Squirrel girl Risuko: ${it.title || 'Tales from the Forest'}`,
            "description": it.caption.replace(/\n/g, ' '),
            // 構造化データにキーワード（タグ）を注入
            "keywords": it.tags ? it.tags.join(", ") : "",
            "contentUrl": window.location.origin + window.location.pathname.replace('index.html', '') + it.src.replace('./', '')
        }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(ldJson);
    document.head.appendChild(script);

    // noscript: クローラー向けの目録にもタグを反映
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<div style="display:none;"><h2>Risuko Art Index</h2><ul>` + 
        items.map(it => `<li>Risuko - ${it.title || 'Story'}: ${it.tags ? it.tags.join(' ') : ''}</li>`).join('') + 
        `</ul></div>`;
    document.body.appendChild(noscript);
}

// 最後に実行
setupFilters();
injectGoogleSEOData(); // これを呼び出すことでSEOデータが注入されます