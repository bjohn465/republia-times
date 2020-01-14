// @flow strict-local
import t from 'format-message'

const LOYALTY_UP = 1
const LOYALTY_DOWN = -1
const LOYALTY_NONE = 0

type NewsItemState = {
  governmentId: 'democria' | 'republia',
  goalStatus: 'notWorking' | 'workingTowards' | 'met',
  ...
}

type NewsItem = $ReadOnly<{|
  id: string,
  getBlurb: (state: NewsItemState) => string,
  getArticle: (state: NewsItemState) => string | null,
  isInteresting: boolean,
  loyalty: -1 | 0 | 1,
  dayRangeStart?: number,
  dayRangeEnd?: number,
  messageType?: 'weather' | 'rebelLeader',
|}>

const allNewsItems: $ReadOnlyArray<NewsItem> = [
  /*
        Plot messages
  */
  {
    getBlurb: () =>
      t('The rebellion has been crushed. Peace returns to all sectors'),
    getArticle: () => t('Rebellion Crushed, Peace Restored!'),
    isInteresting: true,
    loyalty: LOYALTY_UP,
  },
  {
    getBlurb: () =>
      t({
        default: '*** ####....##...####..## ***',
        description:
          'Meant to represent a transmission that didn’t come through correctly',
      }),
    getArticle: () => null,
    isInteresting: true,
    loyalty: LOYALTY_NONE,
    dayRangeStart: 3,
    dayRangeEnd: -1,
    messageType: 'rebelLeader',
  },
  {
    getBlurb: () =>
      t({
        default: '*** ##is...sec##..###commu###tion ***',
        description:
          'Meant to represent a transmission that only partially made it through, containing parts of the words "this", "secret", and "communication"',
      }),
    getArticle: () => null,
    isInteresting: true,
    loyalty: LOYALTY_NONE,
    dayRangeStart: 4,
    dayRangeEnd: -1,
    messageType: 'rebelLeader',
  },
  {
    getBlurb: () =>
      t(
        '*** #Please hear me. I am Kurstov, leader of the rebellion. We need your help. ***'
      ),
    getArticle: () => null,
    isInteresting: true,
    loyalty: LOYALTY_NONE,
    dayRangeStart: 6,
    dayRangeEnd: -1,
    messageType: 'rebelLeader',
  },
  {
    getBlurb: () =>
      t(
        '*** We can rescue your family. Sow disloyalty to strengthen the rebels. You have 4 days. ***'
      ),
    getArticle: () => null,
    isInteresting: true,
    loyalty: LOYALTY_NONE,
    dayRangeStart: 7,
    dayRangeEnd: -1,
    messageType: 'rebelLeader',
  },
  {
    getBlurb: ({ goalStatus }) =>
      t(
        `{goalStatus, select,
        met {*** It’s working! Your efforts have strengthened us unimaginably! ***}
        workingTowards {*** Your family will soon be safe! Drop the public’s loyalty to -30 and get 1000 readers in 3 days! ***}
        other {*** Please help us. The government’s tyranny must end! Place negative articles! ***}
      }`,
        { goalStatus }
      ),
    getArticle: () => null,
    isInteresting: true,
    loyalty: LOYALTY_NONE,
    dayRangeStart: 8,
    dayRangeEnd: -1,
    messageType: 'rebelLeader',
  },
  {
    getBlurb: ({ goalStatus }) =>
      t(
        `{goalStatus, select,
        met {'*** Yes! Our operations are in order. Soon we overthrow! ***}
        workingTowards {*** Your family’s safety is assured! Convince 1000 readers to be disloyal in 2 days! ***}
        other {*** The government cannot win! Seal their fate! Place negative articles! ***}
      }`,
        { goalStatus }
      ),
    getArticle: () => null,
    isInteresting: true,
    loyalty: LOYALTY_NONE,
    dayRangeStart: 9,
    dayRangeEnd: -1,
    messageType: 'rebelLeader',
  },
  {
    getBlurb: ({ goalStatus }) =>
      t(
        `{goalStatus, select,
        met {'*** Oh glorious day! We strike at sundown. Prepare yourself! ***}
        workingTowards {*** Our time is at hand! Hurry! Get 1000 readers with -30 loyalty by the end of today! ***}
        other {*** We have no time! The people must be free! Spread negative news! ***}
      }`,
        { goalStatus }
      ),
    getArticle: () => null,
    isInteresting: true,
    loyalty: LOYALTY_NONE,
    dayRangeStart: 10,
    dayRangeEnd: -1,
    messageType: 'rebelLeader',
  },
  {
    getBlurb: () => t('Terrorist rebel hideout near Central Chem destroyed'),
    getArticle: () => t('Rebels Routed At Factory!'),
    isInteresting: true,
    loyalty: LOYALTY_UP,
    dayRangeStart: 7,
    dayRangeEnd: 100,
  },
  {
    getBlurb: () => t('Rebels at Central Chem sabotage important machinary'),
    getArticle: () => t('Factory Sabotaged!'),
    isInteresting: true,
    loyalty: LOYALTY_DOWN,
    dayRangeStart: 8,
    dayRangeEnd: 100,
  },
  {
    getBlurb: ({ governmentId }) =>
      t(
        `{governmentId, select,
          democria {Terrorist 2nd-in-command captured. Renounces fight against Democria}
          other {Terrorist 2nd-in-command captured. Renounces fight against Republia}
        }`,
        { governmentId }
      ),
    getArticle: () => t('Terrorist Leader Buckles!'),
    isInteresting: true,
    loyalty: LOYALTY_UP,
    dayRangeStart: 9,
    dayRangeEnd: 100,
  },
  {
    getBlurb: () =>
      t('Rebels regroup in western towns. Growing in strength and number.'),
    getArticle: () => t('Rebels Gaining Support!'),
    isInteresting: true,
    loyalty: LOYALTY_DOWN,
    dayRangeStart: 10,
    dayRangeEnd: 100,
  },

  /*
        War messages (Interesting and Loyalty Up)
  */
  {
    getBlurb: ({ governmentId }) =>
      t(
        `{governmentId, select,
        democria {Democria forces have destroyed Antegria’s illegal satellites}
        other {Republia forces have destroyed Antegria’s illegal satellites}
      }`,
        {
          governmentId,
        }
      ),
    getArticle: ({ governmentId }) =>
      t(
        `{governmentId, select,
        democria {Democria Downs Enemy Satellite!}
        other {Republia Downs Enemy Satellite!}
      }`,
        { governmentId }
      ),
    isInteresting: true,
    loyalty: LOYALTY_UP,
  },
  {
    getBlurb: ({ governmentId }) =>
      t(
        `{governmentId, select,
          democria {Democria borders have been reinforced with 200,000 additional troops}
          other {Republia borders have been reinforced with 200,000 additional troops}
        }`,
        { governmentId }
      ),
    getArticle: () => t('Borders Reinforced!'),
    isInteresting: true,
    loyalty: LOYALTY_UP,
  },
  {
    getBlurb: () =>
      t('State-of-the-art military spy satellites now used to reduce crime'),
    getArticle: () => t('Keeping An Eye On Crime!'),
    isInteresting: true,
    loyalty: LOYALTY_UP,
  },
  {
    getBlurb: ({ governmentId }) =>
      t(
        `{governmentId, select,
          democria {Democria Navy commissions an additional 500 destroyers to patrol coast}
          other {Republia Navy commissions an additional 500 destroyers to patrol coast}
        }`,
        { governmentId }
      ),
    getArticle: () => t('Safeguarding The Coasts!'),
    isInteresting: true,
    loyalty: LOYALTY_UP,
  },
  {
    getBlurb: ({ governmentId }) =>
      t(
        `{governmentId, select,
        democria {Democria Air Force tactical fighter sets new speed record}
        other {Republia Air Force tactical fighter sets new speed record}
      }`,
        {
          governmentId,
        }
      ),
    getArticle: () => t('Faster Fighter Flown!'),
    isInteresting: true,
    loyalty: LOYALTY_UP,
  },
  {
    getBlurb: () =>
      t('Multiple terrorist cells in central district foiled in operation'),
    getArticle: () => t('Central Terrorists Terminated!'),
    isInteresting: true,
    loyalty: LOYALTY_UP,
  },
  {
    getBlurb: ({ governmentId }) =>
      t(
        `{governmentId, select,
          democria {Democria Army 5th Divison shuts down bomb factory in northern mountains}
          other {Republia Army 5th Divison shuts down bomb factory in northern mountains}
        }`,
        { governmentId }
      ),
    getArticle: () => t('Bomb Factory Found, Destroyed!'),
    isInteresting: true,
    loyalty: LOYALTY_UP,
  },
  {
    getBlurb: ({ governmentId }) =>
      t(
        `{governmentId, select,
          democria {Democria soldiers strongest in the world according to latest tests}
          other {Republia soldiers strongest in the world according to latest tests}
        }`,
        { governmentId }
      ),
    getArticle: () => t('Our Boys Are the Best!'),
    isInteresting: true,
    loyalty: LOYALTY_UP,
  },
  {
    getBlurb: () => t('Peace enforcement squad rounds up 200 terrorist rebels'),
    getArticle: () => t('Peace Restored, Rebels Captured!'),
    isInteresting: true,
    loyalty: LOYALTY_UP,
  },
  /*
        War messages (Interesting and Loyalty Down)
  */
  {
    getBlurb: () =>
      t('40,000 gallons of military gasoline stolen from western bases'),
    getArticle: () => t('Military Gas Gone!'),
    isInteresting: true,
    loyalty: LOYALTY_DOWN,
  },
  {
    getBlurb: () => t('Critical oil fields in the north have been sabotaged'),
    getArticle: () => t('Pipelines Crippled!'),
    isInteresting: true,
    loyalty: LOYALTY_DOWN,
  },
  {
    getBlurb: () =>
      t('Terrorist bomb explodes on northern bay ferry. 600 people missing'),
    getArticle: () => t('Explosion Rocks The Seas!'),
    isInteresting: true,
    loyalty: LOYALTY_DOWN,
  },
  {
    getBlurb: ({ governmentId }) =>
      t(
        `{governmentId, select,
          democria {Democria Air Force tactical fighter test flight ends in crash. Crew lost}
          other {Republia Air Force tactical fighter test flight ends in crash. Crew lost}
        }`,
        { governmentId }
      ),
    getArticle: () => t('Futuristic Fight Crashes, Burns!'),
    isInteresting: true,
    loyalty: LOYALTY_DOWN,
  },
  {
    getBlurb: ({ governmentId }) =>
      t(
        `{governmentId, select,
          democria {Democria Navy identifies critical fault in all operational submarines}
          other {Republia Navy identifies critical fault in all operational submarines}
        }`,
        { governmentId }
      ),
    getArticle: () => t('Our Subs Are Faulty!'),
    isInteresting: true,
    loyalty: LOYALTY_DOWN,
  },
  {
    getBlurb: () =>
      t('The top general in charge of southern forces has died suddenly'),
    getArticle: () => t('General Dies Overnight!'),
    isInteresting: true,
    loyalty: LOYALTY_DOWN,
  },
  {
    getBlurb: ({ governmentId }) =>
      t(
        `{governmentId, select,
          democria {Antegria secret code remains unbreakable. Top Democria minds are flumoxed}
          other {Antegria secret code remains unbreakable. Top Republia minds are flumoxed}
        }`,
        { governmentId }
      ),
    getArticle: () => t('The Enemy’s Unbreakable Code!'),
    isInteresting: true,
    loyalty: LOYALTY_DOWN,
  },
  {
    getBlurb: () =>
      t(
        'Tank production falls behind schedule. Poor factory conditions blamed'
      ),
    getArticle: () => t('Tanking Tanks!'),
    isInteresting: true,
    loyalty: LOYALTY_DOWN,
  },
  {
    getBlurb: ({ governmentId }) =>
      t(
        `{governmentId, select,
          democria {Worldwide survey finds Democria soldiers worst trained, with worst aim}
          other {Worldwide survey finds Republia soldiers worst trained, with worst aim}
        }`,
        { governmentId }
      ),
    getArticle: () => t('Our Boys Can’t Fire Straight!'),
    isInteresting: true,
    loyalty: LOYALTY_DOWN,
  },
  {
    getBlurb: ({ governmentId }) =>
      t(
        `{governmentId, select,
        democria {Antegria Navy sinks Democria battleship off eastern coast}
        other {Antegria Navy sinks Republia battleship off eastern coast}
      }`,
        {
          governmentId,
        }
      ),
    getArticle: ({ governmentId }) =>
      t(
        `{governmentId, select,
        democria {Democria Battleship Bested!}
        other {Republia Battleship Bested!}
      }`,
        { governmentId }
      ),
    isInteresting: true,
    loyalty: LOYALTY_DOWN,
  },

  /*
        Political messages (Not Interesting and Loyalty Up)
  */
  {
    getBlurb: () =>
      t('The Honorable and Great Leader awarded Lifetime Glory medal'),
    getArticle: () => t('A Lifetime of Glory!'),
    isInteresting: false,
    loyalty: LOYALTY_UP,
  },
  {
    getBlurb: () =>
      t(
        'Agricultural output from the farming sector doubles for 10th straight month'
      ),
    getArticle: () => t('More Corn Than Air!'),
    isInteresting: false,
    loyalty: LOYALTY_UP,
  },
  {
    getBlurb: () =>
      t(
        'Income reallocation scheme contributes 400 million to schools. Proves system works'
      ),
    getArticle: () => t('Education Spending Up!'),
    isInteresting: false,
    loyalty: LOYALTY_UP,
  },
  {
    getBlurb: () =>
      t('Latest polls show broad satisfaction with government leaders'),
    getArticle: () => t('Politics Polls Positive!'),
    isInteresting: false,
    loyalty: LOYALTY_UP,
  },
  {
    getBlurb: () =>
      t('Newest regional administrator fights for worker’s rights'),
    getArticle: () => t('Power To The People!'),
    isInteresting: false,
    loyalty: LOYALTY_UP,
  },
  /*
        Political messages (Not Interesting and Loyalty Down)
  */
  {
    getBlurb: () =>
      t('Party officials have voted to adjust ration quotas for all orphans'),
    getArticle: () => t('Less Food For Orphans'),
    isInteresting: false,
    loyalty: LOYALTY_DOWN,
  },
  {
    getBlurb: () =>
      t('The Honorable and Great Leader photographed in women’s clothes'),
    getArticle: () => t('Great Leader, In A Dress!'),
    isInteresting: false,
    loyalty: LOYALTY_DOWN,
  },
  {
    getBlurb: () =>
      t('30,000 teachers and academics reassigned to more useful labor tasks'),
    getArticle: () => t('Educators Punished For Being Smart!'),
    isInteresting: false,
    loyalty: LOYALTY_DOWN,
  },
  {
    getBlurb: () =>
      t(
        'Local citizen council votes will be eliminated in favor of suggestive comments'
      ),
    getArticle: () => t('Local Councils Lose Vote!'),
    isInteresting: false,
    loyalty: LOYALTY_DOWN,
  },
  {
    getBlurb: () =>
      t(
        'Yearly donations to the state must increase to support growing government oversight'
      ),
    getArticle: () => t('Taxes Rise For 8th Year!'),
    isInteresting: false,
    loyalty: LOYALTY_DOWN,
  },

  /*
        Weather messages (Interesting and no Loyalty effect)
  */
  {
    getBlurb: () => t('Weather: Skies and temperatures will remain calm today'),
    getArticle: () => t('Another Sunny Day!'),
    isInteresting: true,
    loyalty: LOYALTY_NONE,
    messageType: 'weather',
  },
  {
    getBlurb: () =>
      t('Weather: Storms predicted to wash western coast out to sea'),
    getArticle: () => t('Western Storms Threaten Coast!'),
    isInteresting: true,
    loyalty: LOYALTY_NONE,
    messageType: 'weather',
  },
  {
    getBlurb: () =>
      t('Weather: Forecast expects heavy rains in the north and east'),
    getArticle: () => t('Showers Rain Down!'),
    isInteresting: true,
    loyalty: LOYALTY_NONE,
    messageType: 'weather',
  },
  {
    getBlurb: () => t('Weather: Expect unseasonal snow in the south'),
    getArticle: () => t('Blizzard Incoming?'),
    isInteresting: true,
    loyalty: LOYALTY_NONE,
    messageType: 'weather',
  },
  {
    getBlurb: () => t('Weather: Sunny morning and cloudy evening for the day'),
    getArticle: () => t('Warm To Cloudy!'),
    isInteresting: true,
    loyalty: LOYALTY_NONE,
    messageType: 'weather',
  },
  {
    getBlurb: () => t('Weather: Light showers throughout the day'),
    getArticle: () => t('Warm To Cloudy This Week!'),
    isInteresting: true,
    loyalty: LOYALTY_NONE,
    messageType: 'weather',
  },
  {
    getBlurb: () =>
      t('Weather: Hurricane-level winds spotted off eastern coast'),
    getArticle: () => t('Eastern Hurricanes Return!'),
    isInteresting: true,
    loyalty: LOYALTY_NONE,
    messageType: 'weather',
  },
  {
    getBlurb: () => t('Weather: Clear skies and no sign of rain'),
    getArticle: () => t('Another Dry Day!'),
    isInteresting: true,
    loyalty: LOYALTY_NONE,
    messageType: 'weather',
  },
  {
    getBlurb: () =>
      t('Weather: Freezing sleet and snow expected in northern mountains'),
    getArticle: () => t('Buckle Down For Ice!'),
    isInteresting: true,
    loyalty: LOYALTY_NONE,
    messageType: 'weather',
  },
  {
    getBlurb: () =>
      t('Weather: Tropical breezes blow across southeastern coast'),
    getArticle: () => t('Sea Breeze Incoming!'),
    isInteresting: true,
    loyalty: LOYALTY_NONE,
    messageType: 'weather',
  },

  /*
        Sports messages (Interesting and Loyalty Up)
  */
  {
    getBlurb: ({ governmentId }) =>
      t(
        `{governmentId, select,
        democria {Democria National Team has won the global football tournament}
        other {Republia National Team has won the global football tournament}
      }`,
        {
          governmentId,
        }
      ),
    getArticle: ({ governmentId }) =>
      t(
        `{governmentId, select,
        democria {Democria Wins Football Crown!}
        other {Republia Wins Football Crown!}
      }`,
        { governmentId }
      ),
    isInteresting: true,
    loyalty: LOYALTY_UP,
  },
  {
    getBlurb: ({ governmentId }) =>
      t(
        `{governmentId, select,
        democria {Antegria ski team soundly defeated by Democria crew}
        other {Antegria ski team soundly defeated by Republia crew}
      }`,
        { governmentId }
      ),
    getArticle: ({ governmentId }) =>
      t(
        `{governmentId, select,
        democria {Democria Defeats Antegria Skiers!}
        other {Republia Defeats Antegria Skiers!}
      }`,
        { governmentId }
      ),
    isInteresting: true,
    loyalty: LOYALTY_UP,
  },
  {
    getBlurb: () => t('Tennis star Restojiu powers through semifinal brackets'),
    getArticle: () => t('Tennis Star Advances!'),
    isInteresting: true,
    loyalty: LOYALTY_UP,
  },
  {
    getBlurb: ({ governmentId }) =>
      t(
        `{governmentId, select,
          democria {Young Democria atheletes dominate track and field. May win Olympic gold}
          other {Young Republia atheletes dominate track and field. May win Olympic gold}
        }`,
        { governmentId }
      ),
    getArticle: () => t('Our Young Heroes!'),
    isInteresting: true,
    loyalty: LOYALTY_UP,
  },
  {
    getBlurb: ({ governmentId }) =>
      t(
        `{governmentId, select,
          democria {Skilled Democria baseball team finishes record season. Thanks Leader for support}
          other {Skilled Republia baseball team finishes record season. Thanks Leader for support}
        }`,
        { governmentId }
      ),
    getArticle: () => t('Baseball Success Sealed!'),
    isInteresting: true,
    loyalty: LOYALTY_UP,
  },
  /*
        Sports messages (Interesting and no Loyalty effect)
  */
  {
    getBlurb: () =>
      t('Championship weight lifter Lekshou retires due to crippling injury'),
    getArticle: () => t('Muscleman Retires!'),
    isInteresting: true,
    loyalty: LOYALTY_NONE,
  },
  /*
        Sports messages (Interesting and Loyalty Down)
  */
  {
    getBlurb: ({ governmentId }) =>
      t(
        `{governmentId, select,
          democria {Democria National Football Team has lost the regional finals to Antegria}
          other {Republia National Football Team has lost the regional finals to Antegria}
        }`,
        { governmentId }
      ),
    getArticle: ({ governmentId }) =>
      t(
        `{governmentId, select,
        democria {Democria Football Stumbles!}
        other {Republia Football Stumbles!}
      }`,
        { governmentId }
      ),
    isInteresting: true,
    loyalty: LOYALTY_DOWN,
  },
  {
    getBlurb: ({ governmentId }) =>
      t(
        `{governmentId, select,
        democria {Entire Democria National Hockey team killed in plane crash}
        other {Entire Republia National Hockey team killed in plane crash}
      }`,
        {
          governmentId,
        }
      ),
    getArticle: () => t('Tragedy Strikes Hockey!'),
    isInteresting: true,
    loyalty: LOYALTY_DOWN,
  },
  {
    getBlurb: ({ governmentId }) =>
      t(
        `{governmentId, select,
        democria {Athletic training in Democria is years behind the competition}
        other {Athletic training in Republia is years behind the competition}
      }`,
        {
          governmentId,
        }
      ),
    getArticle: () => t('Our Athletes: Behind The Curve?'),
    isInteresting: true,
    loyalty: LOYALTY_DOWN,
  },
  {
    getBlurb: () => t('National kayaking team has defected to Antegria'),
    getArticle: () => t('Kayaking For The Enemy!'),
    isInteresting: true,
    loyalty: LOYALTY_DOWN,
  },

  /*
        Entertainment messages (Interesting and Loyalty Up)
  */
  {
    getBlurb: () =>
      t(
        'Cherrywood’s newest stars attended recent gala ball to honor verterans'
      ),
    getArticle: () => t('Stars Dance For Vets!'),
    isInteresting: true,
    loyalty: LOYALTY_UP,
  },
  {
    getBlurb: ({ governmentId }) =>
      t(
        `{governmentId, select,
          other {New fall TV programming will focus on Republia’s rebuilding}
        }`,
        { governmentId }
      ),
    getArticle: () => t('Fall TV Revealaed!'),
    isInteresting: true,
    loyalty: LOYALTY_UP,
  },
  {
    getBlurb: () =>
      t(
        'Beloved children’s book "Mumpit Mush" finally coming to the big screen'
      ),
    getArticle: () => t('Mumpit Mush Is Coming!'),
    isInteresting: true,
    loyalty: LOYALTY_UP,
  },
  {
    getBlurb: () =>
      t('Superstars Chad and Jenlyn preparing for Cherrywood wedding tomorrow'),
    getArticle: () => t('C&J To Tie the Knot!'),
    isInteresting: true,
    loyalty: LOYALTY_UP,
    dayRangeStart: 2,
    dayRangeEnd: -1,
  },
  {
    getBlurb: () =>
      t('Superstars Chad and Jenlyn marry in extravagant festival'),
    getArticle: () => t('C&J Finally Hitched!'),
    isInteresting: true,
    loyalty: LOYALTY_UP,
    dayRangeStart: 3,
    dayRangeEnd: -1,
  },
  /*
        Entertainment messages (Interesting and no Loyalty effect)
  */
  {
    getBlurb: () =>
      t('"My butt is not too fat, just right" claims TV star Aprelica'),
    getArticle: () => t('Butt Within Spec!'),
    isInteresting: true,
    loyalty: LOYALTY_NONE,
  },
  /*
        Entertainment messages (Interesting and Loyalty Down)
  */
  {
    getBlurb: () =>
      t('Reality star Mestonda found dead from apparent overdose'),
    getArticle: () => t('Reality Star Overdoses!'),
    isInteresting: true,
    loyalty: LOYALTY_DOWN,
  },
  {
    getBlurb: () => t('Fashion designer CrevyCrevy has defected to Antegria'),
    getArticle: () => t('Fashion Icon Defects!'),
    isInteresting: true,
    loyalty: LOYALTY_DOWN,
  },
  {
    getBlurb: () =>
      t(
        'Mega-group HugginBoyz admits to not singing on any albums, can barely dance'
      ),
    getArticle: () => t('HugginBoyz: Talentless After All!'),
    isInteresting: true,
    loyalty: LOYALTY_DOWN,
  },
  {
    getBlurb: () =>
      t('Superstars Chad and Jenlyn file for divorce. Both claim infidelity'),
    getArticle: () => t('C&J Fairytale Ends!'),
    isInteresting: true,
    loyalty: LOYALTY_DOWN,
    dayRangeStart: 6,
    dayRangeEnd: -1,
  },
].map(function addIdToMessage(message, index) {
  return {
    id: `news-item-${index}`,
    ...message,
  }
})

export function getShuffledNewsItems(
  newsItems?: $ReadOnlyArray<NewsItem> = allNewsItems
): $ReadOnlyArray<NewsItem> {
  let index = -1
  const length = newsItems.length
  const lastIndex = length - 1
  const shuffledArray: Array<NewsItem> = Array(length)

  while (++index < length) {
    const randomIndex =
      index + Math.floor(Math.random() * (lastIndex - index + 1))
    const value = newsItems[randomIndex]

    shuffledArray[randomIndex] = newsItems[index]
    shuffledArray[index] = value
  }

  return shuffledArray
}
