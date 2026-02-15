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
const items = [
{ src: `${base}/images/1-1.webp`, title: '',
caption:
`#1
It’s Risuko! 🐿️️️
The sunlight filtering through the leaves felt so warm,
my tail got all fluffy… and I fell asleep right there. 🌿✨

#BorrowMyTail #ForestRestSpot`
},

{ src: `${base}/images/1-2.webp`, title: '',
caption:
`#2
It’s Risuko! 🐿️️️
Suzuko seems to be in a hurry.
Risuko is not.
Because the coffee would get cold. ☕❄️

#OneSipBreak #WinterMoments`
},

{ src: `${base}/images/1-3.webp`, title: '',
caption:
`#3
It’s Risuko! 🐿️️️

Risuko looks ahead, Suzuko looks around.
“That way looks fun.”
With that one sentence, today’s path is decided. 🍁

#WalkingIsTheMainStory #DetoursAreJustice`
},

{ src: `${base}/images/1-4.webp`, title: '',
caption:
`#4
It’s Risuko! 🐿️️️
It’s a little scary, but I won’t stop.
It’s a little high, but it’s fun.
So today again, I choose this path. 🌙

#FunFirst #ForestSenseOfBalance`
},

{ src: `${base}/images/1-5.webp`, title: '',
caption:
`#5
It’s Risuko! 🐿️️️
When I played the flute, the tanuki listened with a serious face.
Yeah, feels like I passed today.

#ForestConcert #ForestJudge`
},

{ src: `${base}/images/1-6.webp`, title: '',
caption:
`#6
It’s Risuko! 🐿️️️
Dash dash, sharan♪
One runs, one plays.

#RunningSoundsAndStrings #ForestTeamwork`
},

{ src: `${base}/images/1-7.webp`, title: '',
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
caption:
`#9
It’s Risuko! 🐿️️
Snack time! 🍪✨
For now, everything is still up for grabs!

#FirstComeFirstServed #SweetsAreJustice`
},

{ src: `${base}/images/1-10.webp`, title: '',
caption:
`#10
It’s Risuko! 🐿️️
On cold days,
the correct answer is eating close together. 🍔❄️

#WinterWisdom #WarmMoments`
},

{ src: `${base}/images/1-11.webp`, title: '',
caption:
`#11
It’s Risuko! 🐿️️️
Cheeks all red,
fuu.
The sound comes later.

#DoingMyBestRisuko #FluteDependsOnMood #CozyForest`
},

{ src: `${base}/images/1-12.webp`, title: '',
caption:
`#12
The river is frozen,
but my feelings aren’t.
Today’s fish
will be prepared properly.

#WinterKindness #ForestLife`
},

{ src: `${base}/images/1-13.webp`, title: '',
caption:
`#13
It’s Risuko! 🐿️️️
The sound of the river feels nice.
Otter, wait for me.
Now is a time to relax.

#SlowTime #FeetInTheWater`
},

{ src: `${base}/images/1-14.webp`, title: '',
caption:
`#14
It’s Risuko! 🐿️️️
Mission complete!
Otter, were you watching?
I did it properly.

#ForestMoment #GentleAchievement`
},

{ src: `${base}/images/1-15.webp`, title: '',
caption:
`#15
It’s Risuko! 🐿️️️
A quiet room,
good tea.
I’m not moving anymore.

#WinterRoom #ChoosingStillness`
},

{ src: `${base}/images/1-16.webp`, title: '',
caption:
`#16
It’s Risuko! 🐿️️️
The room is fully Christmas.
Only the cake
hasn’t arrived yet.

#Countdown #WaitingIsPartOfIt`
},

{ src: `${base}/images/1-17.webp`, title: '',
caption:
`#17
It’s Risuko! 🐿️️️
Drum practice starts!
Tanuki is on tambourine duty ✨🥁

#ForestFriends #InstantBand`
},

{ src: `${base}/images/1-18.webp`, title: '',
caption:
`#18
It’s Risuko! 🐿️️️
While practicing drums,
the tanuki got the most excited 🥁✨

#HypeManager #RoleSwap`
},

{ src: `${base}/images/1-19.webp`, title: '',
caption:
`#19
It’s Risuko! 🐿️️
Merry Cookie Christmas! 🍪
Winter light and the smell of fresh baking.
This is what Christmas feels like 🎄

#MerryChristmas #FreshBakedHappiness`
},

{ src: `${base}/images/1-20.webp`, title: '',
caption:
`#20
It’s Risuko! 🐿️️
A holy night, one big leap.
Going to catch the light of the stars ✨🎄

#HolyNight #SacredForest`
},

{ src: `${base}/images/1-21.webp`, title: '',
caption:
`#21
It’s Risuko! 🐿️️
Santa is in the sky,
I’m in charge of the forest 🎄🌲

#ForestSanta #TailWigglingDelivery`
},

{ src: `${base}/images/1-22.webp`, title: '',
caption:
`#22
It’s Suzuko.
Risuko went ahead.
Not being found
means it’s going well.

#ForestDelivery #TheArtOfNotBeingSeen`
},

{ src: `${base}/images/1-23.webp`, title: '',
caption:
`#23
It’s Risuko! 🐿️️
Worked too hard on night delivery.
Sleepy. But satisfied.

#AfterNightShift #SleepyButHappy`
},

{ src: `${base}/images/1-24.webp`, title: '',
caption:
`#24
It’s Risuko! 🐿️️
A present from Suzuko.
Christmas arrived properly 🎄

#ForestChristmas #WinterStory`
},

{ src: `${base}/images/1-25.webp`, title: '',
caption:
`#25
It’s Risuko! 🐿️️
Posture matters most.
Second is posture.
Third… luck.

#PostureIsEverything #FishingPhilosophy`
},

{ src: `${base}/images/1-26.webp`, title: '',
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
caption:
`#27
It’s Risuko! 🐿️️
Same river, same time.
Only the results were different.

#TalentGap #DailyDuo`
},

{ src: `${base}/images/1-28.webp`, title: '',
caption:
`#28
It’s Risuko! 🐿️️
If the giver leans in too much,
the receiver watches carefully.

#ForestRules #CarefulEnthusiasm`
},

{ src: `${base}/images/1-29.webp`, title: '',
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
caption:
`#32
It’s Risuko! 🐿️️
We are the legs.
Up above is the supervisor.

#SubcontractPosition #ForestRoles`
},

{ src: `${base}/images/1-33.webp`, title: '',
caption:
`#33
It’s Risuko! 🐿️️
Driving.
Lending my legs.

#ForestVehicle #BusinessAsUsual`
},

{ src: `${base}/images/1-34.webp`, title: '',
caption:
`#34
It’s Risuko! 🐿️️
Chicken: “I can fly.”
Suzuko: “That wasn’t mentioned!”
Me: “This forest is high-level!”

#ForestSeriousMode #PeacefulChaos`
},

{ src: `${base}/images/1-35.webp`, title: '',
caption:
`#35
It’s Risuko! 🐿️️
Snow is quiet.
The chicken stays close.
I keep my distance.

#ForestAtmosphere #PersonalSpace`
},

{ src: `${base}/images/1-36.webp`, title: '',
caption:
`#36
It’s Risuko! 🐿️️
Right behind Suzuko.
Why?
Hehe… secret ✨🌲

#DeerPleaseBeQuiet #ForestWitness`
},

{ src: `${base}/images/1-37.webp`, title: '',
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
caption:
`#39
It’s Risuko! 🐿️️
Same old jokes in the new year.
Forest and mochi.
Looking forward to 2026 🎍

#NewYearGreetings #ItsRisuko`
},

{ src: `${base}/images/1-40.webp`, title: '',
caption:
`#40
It’s Suzuko.
Went to the first shrine visit.
While waiting in line, my tail stayed warm.
Here’s to 2026 ⛩️

#NewYearGreetings #Suzuko`
},

{ src: `${base}/images/1-41.webp`, title: '',
caption:
`#41
It’s Risuko! 🐿️️
I drew great fortune.
Smiles, now being distributed.

#CheekPouchSmile #ForestGoodLuck`
},

{ src: `${base}/images/1-42.webp`, title: '',
caption:
`#42
It’s Risuko! 🐿️️
My mouth is stuffed with mandarins.
Suzuko, I really can’t take any more…

#HoardingHabit #InstinctOverReason`
},

{ src: `${base}/images/1-43.webp`, title: '',
caption:
`#43
It’s Risuko! 🐿️️
Distance measured.
Presence read.
Permission denied.

#MoodyType #ButThatIsFine`
},

{ src: `${base}/images/1-44.webp`, title: '',
caption:
`#44
It’s Risuko! 🐿️️
Forest winter gear ranking:
this year’s number one is sheep.
Faster than wearing clothes.

#NaturalHeater #TotallyUnfair`
},

{ src: `${base}/images/1-45.webp`, title: '',
caption:
`#45
It’s Risuko! 🐿️️
Cat pose in front of a cat.
In the forest,
this is probably a challenge.

#SilentPressure #ForestIsStrict`
},

{ src: `${base}/images/1-46.webp`, title: '',
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
caption:
`#48
It’s Risuko! 🐿️️

Practice while awake.
Performance while asleep.
First prize is in dreams.

#DreamPodium #NightMoment`
},

{ src: `${base}/images/1-49.webp`, title: '',
caption:
`#49
It’s Risuko! 🐿️️
I don’t count apples.
If I do,
they usually decrease.

#ForestCommonThings #SuspiciousSnacking`
},

{ src: `${base}/images/1-50.webp`, title: '',
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
caption:
`#51
It’s Risuko! 🐿️️
Food is light.
The goat’s expectations are heavy.
Probably thinks it’ll get some.

#SilentPressure #NeverSaidIdGive`
},

{ src: `${base}/images/1-52.webp`, title: '',
caption:
`#52
It’s Risuko! 🐿️️
Outside is still winter.
Cat is warm on my lap, body cool.
We all agree with this scene.

#SupplyAndDemand #WarmthAgreement`
},

{ src: `${base}/images/1-53.webp`, title: '',
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
caption:
`#54
It’s Risuko! 🐿️️
Upstairs is a tea party.
Down below,
a romance drama.

#MainStoryAtYourFeet #UnseenNarrative`
},

{ src: `${base}/images/1-55.webp`, title: '',
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
caption:
`#59
It’s Risuko! 🐿️️
Grand mountains, flute, deer.
The cast is ready.
Now the epic fantasy waits backstage.

#BeforeTheClimax #FantasyWaitingRoom`
},

{ src: `${base}/images/1-60.webp`, title: '',
caption:
`#60
It’s Risuko! 🐿️️
This view, this height, this flute.
Today’s role: bard.
Adding BGM to the world.

#FantasyInPreparation #StayTuned`
},

{ src: `${base}/images/1-61.webp`, title: '',
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
caption:
`#62
It’s Risuko! 🐿️️
If there’s something to draw, I draw it.
Even if it’s a tanuki, no hesitation.

#TanukiCanvas #FreedomOfExpression`
},

{ src: `${base}/images/1-63.webp`, title: '',
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
caption:
`#64
It’s Risuko! 🐿️️

Cooking is judged by body shape, not words.

This mouse
gives Suzuko full marks.

#PerfectScoreBody #SkilledKitchen`
},

{ src: `${base}/images/1-65.webp`, title: '',
caption:
`#65
It’s Risuko! 🐿️️️
Flame Chef Tanuki, opening act. 🔥
I know it’s unreasonable.
I know—but I won’t lower my expectations.

#CampfireCooking #TanukiStruggles`
},

{ src: `${base}/images/1-66.webp`, title: '',
caption:
`#66
It’s Risuko! 🐿️️️
Drop it and you lose.
Win and you get snacks.

#AppleChallenge #AnotherPeacefulDay`
},

{ src: `${base}/images/1-67.webp`, title: '',
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
caption:
`#70
It’s Risuko! 🐿️️

We are flutes.
Tanuki is whistling.
The only requirement is a happy face.

#SoundIsEnough #RelaxedTime`
},

{ src: `${base}/images/1-71.webp`, title: '',
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
caption:
`#72
It’s Risuko! 🐿️️
I found the fluffiest VIP seat.
I’m not moving from here today!

#BlissfulMoment #MagicOfFluff`
},

{ src: `${base}/images/1-73.webp`, title: 'A New Family Member',
  caption:
`#73
It's Risuko! 🐿️️
Look, look! A tiny, snowy-white baby has joined our home! ✨
It's a major event of cuteness.
Big sister Risuko is now officially on bodyguard duty! *Salute* 🐿️️💨

#DailyCuteness #GuardianRisuko`
},

{ src: `${base}/images/1-74.webp`, title: 'Forest Judge',
  caption:
`#74
It's Risuko! 🐿️️
Mr. Tanuki, the judge, is silent.
Is this... a pass, or is it on hold?

#ForestJudge #HighTension`
},

{ src: `${base}/images/1-75.webp`, title: 'Playing Baby',
  caption:
`#75
We found an old stroller, so 
suddenly it's "playing baby" time! 
Big sister Suzuko looks like she's about to cry, thinking "Is this some kind of training...?" 
But she never stops helping—she really is the best big sister!

#RattleSound #RisukoIsThrilled`
},

{ src: `${base}/images/1-76.webp`, title: 'Snowy Mountain Hike',
  caption:
`#76
It's Risuko!

Today is snowy mountain climbing! While looking through my binoculars, 
I made friends with a cool Mr. Hawk.
This view is absolutely thrilling!

#StunningViews #ExcitingExpedition`
},

{ src: `${base}/images/1-77.webp`, title: 'White Moustache Championship',
  caption:
`#77
It's Risuko! 🐿
Drinking it all at once gives me a brain freeze, 
but I can't back down from this challenge! Refills are more than welcome!

#WinterShowdown #WhiteMoustacheChampionship`
},

{ src: `${base}/images/1-78.webp`, title: 'Dancing by the Water',
  caption:
`#78
It's Risuko! 🐿️️
Dancing by the water with Mr. Swan!
The splashes are sparkling...
it's like being in a magic spring!

#HopTime #HappyStroll`
},

{ src: `${base}/images/1-79.webp`, title: 'Fluffy Duo',
  caption:
`#79
It's Risuko! 🐿
He’s pure white and fluffy, but his beak is so flat and cute!
Is he a "long-necked duck" or a "big-mouthed swan"? 
Either way, he's adorable!

#CuteEitherWay #FluffyDuo`
},

{ src: `${base}/images/1-80.webp`, title: 'Wishing on a Star',
  caption:
`#80
It's Risuko! 🐿

The moment the star shot across the sky, 
I yelled "Acorns, Walnuts, Pistachios!" 
Suzuko snapped at me, "That's just a food order!"

#ShootingStarWish #HungryList`
},

{ src: `${base}/images/1-81.webp`, title: 'Sharing the Happiness',
  caption:
`#81
It's Risuko! 🐿
My squirrel friends gathered around, and we can't stop munching!
Packing in all the "yummy" moments of winter.

#SharingHappiness #DonutHolesAreZeroCalories`
},

{ src: `${base}/images/1-82.webp`, title: 'Night Picnic',
  caption:
`#82
It's Risuko! 🐿

Before I can say "The stars are beautiful," 
the popcorn might be all gone!
Crunching away on the snow—this is the best part of winter.

#NightPicnic #NonstopMunching`
},

{ src: `${base}/images/1-83.webp`, title: 'Head Over Heels for Fluff',
  caption:
`#83
It's Risuko! 🐿️️
Done brushing Mr. Rabbit!
Now he's all set for shedding season.
He's so fluffy, I'm totally head over heels!

#BunnyLovers #PetOfTheDay`
},

{ src: `${base}/images/1-84.webp`, title: 'The Temptation of Food Stalls',
  caption:
`#84
It's Risuko! 🐿️️

Sweet castella, juicy grilled meat...
There are too many temptations at these stalls!
I'm so hungry, I want to eat everything in sight!

#SoHungry #FoodStallHopping`
},

{ src: `${base}/images/1-84.webp`, title: 'Food Stall Temptation',
    caption:
`#84
It's Risuko! 🐿️️️

Sweet castella, juicy grilled meat...
There are so many temptations at the food stalls, I’m in trouble!
I'm so hungry, I want to eat everything I see!

#SoHungry #FestivalFood`
  },

  { src: `${base}/images/1-85.webp`, title: 'To the Magical Land', 
    caption:
`#85
It's Suzu-ko.

The sky, the mountains, and the flowers—everything is on my side today!
I’m heading off to a magical land with the sheep.

#FluffyFairytale #DreamyLand`
  },

  { src: `${base}/images/1-86.webp`, title: 'Fluffy Sleepover', 
    caption:
`#86
It's Risuko! 🐿️

A sleepover with Suzu-ko!
We're going to chat all night in our fluffy pajamas.

#FluffyClub #GirlsNightDreams`
  },

  { src: `${base}/images/1-87.webp`, title: 'Risu-ko’s Dream Diary', 
    caption:
`#87
It's Risuko! 🐿️️

Surrounded by the scent of flowers,
I’m chasing pastel clouds with the sheep!
Rolling around on the soft grass
makes me feel as happy as sweet sugar ✨

#FairytaleLife #RisuKosDreamDiary`
  },

  { src: `${base}/images/1-88.webp`, title: 'Giant Yarn Meeting', 
    caption:
`#88
It's Risuko! 🐿️

We're in a meeting over this giant ball of yarn: "Team Unravel" vs. "Team Protect"!
The cat is definitely looking at it like prey.

#RedTemptation #PawDefense`
  },

  { src: `${base}/images/1-89.webp`, title: 'Making Of Adventure', 
    caption:
`#89
It's Risuko! 🐿️
One notebook isn't enough!?
A squirrel's great adventure told through over 100 storyboards 🐿️️📖
The answer to "How do you draw them?" is on my website!

English version available.

#MakingOf #Menu_process`
  },

  { src: `${base}/images/1-90.webp`, title: 'Owl’s Unreasonable Task', 
    caption:
`#90
It's Risuko! 🐿️

Mr. Owl, being handed a white feather doesn't help at all!
And isn't this letter upside down to begin with?
Could you tell me that first?

#OwlQuest #NoHints`
  },

  { src: `${base}/images/1-91.webp`, title: 'Magic of Light', 
    caption:
`#91
It's Risuko! 🐿️

I had myself drawn in a different atmosphere today.
The soft sunlight is so beautiful!

#DressUpRisuKo #MagicOfLight`
  },

  { src: `${base}/images/1-92.webp`, title: 'Snowy Lantern Night', 
    caption:
`#92
It's Risuko! 🐿️

Even on the snow, it's cozy with a lantern.
Goodnight, everyone... 💤

#SnowyNight #LanternLight`
  },

  { src: `${base}/images/1-93.webp`, title: 'Hot Winter Meat Buns', 
    caption:
`#93
It's Risuko! 🐿️

Freshly steamed is the best! One bite and the juices overflow.
This happiness is a special winter treat!

#StreetFood #MeatBun`
  },

  { src: `${base}/images/1-94.webp`, title: 'Fluffy Sheep Life', 
    caption:
`#94
It's Risuko! 🐿️

Every home needs one (or one sheep?), a fluffy bit of comfort.
One hug and the cold just flies away!

#LifeWithSheep #Fluffy`
  },

  { src: `${base}/images/1-95.webp`, title: 'Fluffy Bunny Trap', 
    caption:
`#95
It's Risuko! 🐿️

Suzu-ko is all smiles surrounded by bunnies.
Swallowed by a wave of fluff, there's no way to escape now!

#FluffAmbush #CuteTrap`
  },

  { src: `${base}/images/1-96.webp`, title: 'Igloo Tanuki Capture', 
    caption:
`#96
It's Risuko! 🐿️

Caught a mysterious tanuki inside the igloo! Suzu-ko,
isn't that a real tanuki, not a stuffed animal?
It's sitting as still as a statue.

#Igloo #PlayingPossum`
  },

  { src: `${base}/images/1-97.webp`, title: 'To the Silver World', 
    caption:
`#97
It's Risuko! 🐿️

We've arrived in the silver world! The air is so crisp and cool.
I hope everyone is enjoying the winter scenery too!

#WinterLandscape #RisuKoAdventure`
  },

  { src: `${base}/images/1-98.webp`, title: 'Snowy Feast', 
    caption:
`#98
It's Risuko! 🐿️

Why does food taste so much better outdoors!
The sparkling snowy scenery is my side dish. Let's eat!

#WinterFeast #RisuKo`
  },

  { src: `${base}/images/1-99.webp`, title: 'Blue Bird of Happiness', 
    caption:
`#99
It's Suzu-ko!

A blue bird of happiness came to visit!
Sharing some happy vibes with everyone ✨

#BlueBirdOfHappiness #RT`
  },

  { src: `${base}/images/1-100.webp`, title: 'Starry Forest Night', 
    caption:
`#100
It's Risuko! 🐿️
Hello, Neko-no-Shippo-san.
I'm joining the project! Nice to meet you! ✨🌲

#AIGirlAndStarrySky #ForestStars`
  },

  { src: `${base}/images/2-101.webp`, title: 'Giant Cotton Candy', 
    caption:
`#101
It's Suzu-ko.

I have this big, fluffy cotton candy all to myself!
It smells so sweet and happy, like my mouth is floating on a cloud.

#Dreamy #Bliss`
  },

  { src: `${base}/images/2-102.webp`, title: 'Forest Fashion Leader', 
    caption:
`#102
It's Risuko! 🐿️
Look, look! I made a new flower crown!
Even the birds are complimenting me.
I'm aiming to be the forest's fashion leader!

#Handmade #LifeWithFlowers`
  },

  { src: `${base}/images/2-103.webp`, title: 'Friend on My Hand', 
    caption:
`#103
It's Risuko! 🐿️

A cute sparrow came to visit the terrace!
It's perched right on my hand, and I have a feeling we're going to be great friends.

#BirdWatching #HealingTime`
  },

  { src: `${base}/images/2-104.webp`, title: 'Colorful Winter Art', 
    caption:
`#104
It's Risuko! 🐿️️
In the silver world, the parrot's feathers and rainbow brushstrokes sparkle.
With chatter and art, even a cold day feels like spring!

#WinterColors #ColorfulLife`
  },

  { src: `${base}/images/2-105.webp`, title: 'Waterfall Rainbow', 
    caption:
`#105
It's Risuko! 🐿️️

Look! The power of the waterfall made a rainbow.
The swan is spreading its wings happily—what a wonderful day to appreciate nature!

#NaturePower #WaterfallMagic`
  },

  { src: `${base}/images/2-106.webp`, title: 'Setsubun Bean Count', 
    caption:
`#106
It's Risuko! 🐿️

I was counting the beans, but I ended up wanting to eat them!
Don't forget to eat as many as your age, okay?

#Setsubun #FortuneIn`
  },

  { src: `${base}/images/2-107.webp`, title: 'Forest Fox Picnic', 
    caption:
`#107
It's Risuko! 🐿️
Met a fox while picnicking in the forest! 🦊
Lunchtime just got more fun with a new friend ✨

#BlueSkyPicnic #SlowLife`
  },

  { src: `${base}/images/2-108.webp`, title: 'Beyond the Bridge', 
    caption:
`#108
It's Risuko! 🐿️️
I wonder what kind of world lies beyond that big bridge in the distance?
The air is so clear, I can see so far!

#GreatView #AdventureAwaits`
  },

  { src: `${base}/images/2-109.webp`, title: 'Secret Base Snacks', 
    caption:
`#109
It's Risuko! 🐿️️

Sunbathing with a little mouse at our secret base's best spot.
When the bell rings, it's time for a snack!

#ForestPlayground #WoodVibes`
  },

  { src: `${base}/images/2-110.webp`, title: 'Rainy Day Puddles', 
    caption:
`#110
It's Risuko! 🐿️️
Even on rainy days, my favorite boots and umbrella make it a perfect day for a stroll!
Let's play in the puddles with the frogs.

#RainyDay #SplishSplash`
  },

  { src: `${base}/images/2-111.webp`, title: 'Sun & Mouse Friend', 
    caption:
`#111
It's Risuko! 🐿️️

Snack time while sunbathing. 🍎
The mouse in the basket must have followed the delicious smell here!

#PeekabooMouse #SunnyAfternoon`
  },

  { src: `${base}/images/2-112.webp`, title: 'Stairway Stage', 
    caption:
`#112
It's Risuko! 🐿️️
These stairs on the slope are a natural stage!
I'll keep the beat with my wagging tail.

#PuffyCheeks #TailMetronome`
  },

  { src: `${base}/images/2-113.webp`, title: 'Snowy Potato Party', 
    caption:
`#113
It's Risuko! 🐿️️

Potatoes baked in the snow are the best! I want to eat them with butter.
So hot and fluffy!

#WinterFeast #ForestPotatoParty`
  },

  { src: `${base}/images/2-114.webp`, title: 'Ramen in the Snow', 
    caption:
`#114
It's Risuko! 🐿️️

Ramen time in the snow! Blowing on it to cool it down is the best part ✨
Is the duck waiting for a share too? 🦆

#RamenLover #DuckWantsBite`
  },

  { src: `${base}/images/2-115.webp`, title: 'Vitamin Afternoon', 
    caption:
`#115
It's Suzu-ko!

Here's a basket full of vitamins for you 🍋
Have a relaxing afternoon with the yellow bird of happiness.

#GoodJob #VitaminColors`
  },

  { src: `${base}/images/2-116.webp`, title: 'Forest Squirrel Call', 
    caption:
`#116
It's Risuko! 🐿️️

The sound of Suzu-ko's whistle reached the forest squirrels.
The quiet winter forest suddenly got very lively!

#ForestWhistleLeader #SquirrelCall`
  },

  { src: `${base}/images/2-117.webp`, title: 'Scenic Burger Lunch', 
    caption:
`#117
It's Risuko! 🐿️️

While Suzu-ko chats elegantly with the birds,
I'm all about the food!
A burger with this amazing view tastes incredible!

#ScenicLunch #BurgerClub`
  },

  { src: `${base}/images/2-118.webp`, title: 'Butterfly Chase', 
    caption:
`#118
It's Risuko! 🐿️️

Suzu-ko's net is chasing a fluttering blue butterfly.
I'm following behind, wagging my big fluffy tail.

#FluffyAdventure #FlowerField`
  },

  { src: `${base}/images/2-119.webp`, title: 'Ice Cream from Penguin', 
    caption:
`#119
It's Risuko! 🐿️️

A penguin is holding out an ice cream for a "say aah"!
The hard-working penguin and us being spoiled...
It's such a relaxing time.

#KindestIceCream #WinterTreat`
  },

  { src: `${base}/images/2-120.webp`, title: 'Special Topped Ice', 
    caption:
`#120
It's Risuko! 🐿️️
Look, look! A special ice cream with tons of toppings 🍦
The cookies are so crunchy, it's delicious!

#SweetsClub #DailyTreat`
  },

  { src: `${base}/images/2-121.webp`, title: 'Melody of the Castle', 
    caption:
`#121
It's Risuko! 🐿️️

Licking ice cream to the sound of the castle bells!
Eating in rhythm makes me feel like I can hear happy music ♪

#CastleMelody #CozyTime`
  },

  { src: `${base}/images/2-122.webp`, title: 'Steamer Floor Heater?', 
    caption:
`#122
Good morning! ☀️

It's Risuko! 🐿️️
This steamer basket... maybe it could work as a foot warmer if I put it on the floor? Just kidding!

#CozyLifeHack #Daydreaming`
  },

  { src: `${base}/images/2-123.webp`, title: 'Popcorn Siege', 
    caption:
`#123
It's Risuko! 🐿️️

Sparrows from the sky, squirrels from my lap!
A siege for the popcorn has been completed!
I'm in a pinch!

#SparrowScouts #SquirrelBegging`
  },

  { src: `${base}/images/2-124.webp`, title: 'Ambush for Popcorn', 
    caption:
`#124
It's Risuko! 🐿️️

Sparrows from the sky, squirrels from my lap!
A siege for the popcorn has been completed!
I'm in a pinch!

#SparrowScouts #SquirrelBegging`
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
 * 全ての画像に "Artwork of Risuko:" を含むaltを自動付与し、英語圏のSEOを強化します。
 */
function renderGallery(groupId) {
  currentGroupItems = items.filter(it => getGroupId(it.src) === groupId);

  gallery.innerHTML = currentGroupItems.map((it, i)=>`
    <figure class="card" data-i="${i}" tabindex="0" aria-label="${it.title || 'Risuko, Squirrel girl with a yellow scarf' }">
      <div class="card__imgwrap">
        <img src="${it.src}" 
             alt="Squirrel girl with a yellow scarf, Risuko - ${it.title || ''} | ${it.caption.substring(0, 40).replace(/\n/g, ' ')}..." 
             loading="lazy">
      </div>
      <figcaption class="card__meta">
        <h3 class="card__title">${it.title || 'Risuko'}</h3>
        <p class="card__caption">${it.caption}</p>
      </figcaption>
    </figure>
  `).join("");
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
 * 【修正ポイント2】ライトボックスのalt付与
 */
function openLB(i){
  idx = (i + currentGroupItems.length) % currentGroupItems.length;
  const it = currentGroupItems[idx];
  lbImg.src = it.src;
  // 拡大表示時も「属性名 + キャラ名」でSEO効果を持続
  lbImg.alt = `Squirrel girl with a yellow scarf, Risuko: ${it.title || 'Forest Life'}`;
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
 * 【修正ポイント3】Google SEO対策（英語版・構造化データ）
 * 英語圏のクローラー（Googleボット）に対し、Risukoの全作品を一括でインデックスさせます。
 */
function injectGoogleSEOData() {
    const pageDescription = "Explore the daily life of Risuko, a squirrel girl with a yellow scarf and a fluffy tail. A collection of enchanting fantasy art set in a magical forest.";

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
            // 英語圏の検索結果でクリックされやすいタイトルに最適化
            "name": `Squirrel girl with a yellow scarf, Risuko: ${it.title || 'Tales from the Forest'}`,
            "description": it.caption.replace(/\n/g, ' '),
            "contentUrl": window.location.origin + window.location.pathname.replace('index.html', '') + it.src.replace('./', '')
        }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(ldJson);
    document.head.appendChild(script);

    // noscript: JS無効時やクローラー向けのテキスト目録
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<div style="display:none;"><h2>Squirrel girl with a yellow scarf, Risuko - Artwork Index</h2><ul>` + 
        items.map(it => `<li>Squirrel girl with a yellow scarf, Risuko - ${it.caption.substring(0, 60).replace(/\n/g, ' ')}</li>`).join('') + 
        `</ul></div>`;
    document.body.appendChild(noscript);
}

// 実行
setupFilters();
// キャプション内のクリックでは画像切り替えをさせない
lbCaption.addEventListener("click", (e) => {
  e.stopPropagation();
});
