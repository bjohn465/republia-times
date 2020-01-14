// @flow strict-local
import React from 'react'
import t from 'format-message'

export default function NewsFeed() {
  return (
    <>
      <h2 id="news-feed-heading">{t('News Feed')}</h2>
      <ul aria-labelledby="news-feed-heading"></ul>
    </>
  )
}

const LOYALTY_UP = 1
const LOYALTY_DOWN = -1
const LOYALTY_NONE = 0

type NewsItem = $ReadOnly<{|
  blurb: string,
  article: string | null,
  isInteresting: boolean,
  loyalty: -1 | 0 | 1,
  dayRangeStart?: number,
  dayRangeEnd?: number,
  messageType?: 'weather' | 'rebelLeader',
|}>

function getAllNewsItems(): $ReadOnlyArray<NewsItem> {
  // democria | republia
  const governmentId = 'republia'

  // notWorking | workingTowards | met
  const goalStatus = 'notWorking'

  return [
    /*
        Plot messages
    */
    {
      blurb: t('The rebellion has been crushed. Peace returns to all sectors'),
      article: t('Rebellion Crushed, Peace Restored!'),
      isInteresting: true,
      loyalty: LOYALTY_UP,
    },
    {
      blurb: t({
        default: '*** ####....##...####..## ***',
        description:
          'Meant to represent a transmission that didn’t come through correctly',
      }),
      article: null,
      isInteresting: true,
      loyalty: LOYALTY_NONE,
      dayRangeStart: 3,
      dayRangeEnd: -1,
      messageType: 'rebelLeader',
    },
    {
      blurb: t({
        default: '*** ##is...sec##..###commu###tion ***',
        description:
          'Meant to represent a transmission that only partially made it through, containing parts of the words "this", "secret", and "communication"',
      }),
      article: null,
      isInteresting: true,
      loyalty: LOYALTY_NONE,
      dayRangeStart: 4,
      dayRangeEnd: -1,
      messageType: 'rebelLeader',
    },
    {
      blurb: t(
        '*** #Please hear me. I am Kurstov, leader of the rebellion. We need your help. ***'
      ),
      article: null,
      isInteresting: true,
      loyalty: LOYALTY_NONE,
      dayRangeStart: 6,
      dayRangeEnd: -1,
      messageType: 'rebelLeader',
    },
    {
      blurb: t(
        '*** We can rescue your family. Sow disloyalty to strengthen the rebels. You have 4 days. ***'
      ),
      article: null,
      isInteresting: true,
      loyalty: LOYALTY_NONE,
      dayRangeStart: 7,
      dayRangeEnd: -1,
      messageType: 'rebelLeader',
    },
    {
      blurb: t(
        `{goalStatus, select,
        met {*** It’s working! Your efforts have strengthened us unimaginably! ***}
        workingTowards {*** Your family will soon be safe! Drop the public’s loyalty to -30 and get 1000 readers in 3 days! ***}
        other {*** Please help us. The government’s tyranny must end! Place negative articles! ***}
      }`,
        { goalStatus }
      ),
      article: null,
      isInteresting: true,
      loyalty: LOYALTY_NONE,
      dayRangeStart: 8,
      dayRangeEnd: -1,
      messageType: 'rebelLeader',
    },
    {
      blurb: t(
        `{goalStatus, select,
        met {'*** Yes! Our operations are in order. Soon we overthrow! ***}
        workingTowards {*** Your family’s safety is assured! Convince 1000 readers to be disloyal in 2 days! ***}
        other {*** The government cannot win! Seal their fate! Place negative articles! ***}
      }`,
        { goalStatus }
      ),
      article: null,
      isInteresting: true,
      loyalty: LOYALTY_NONE,
      dayRangeStart: 9,
      dayRangeEnd: -1,
      messageType: 'rebelLeader',
    },
    {
      blurb: t(
        `{goalStatus, select,
        met {'*** Oh glorious day! We strike at sundown. Prepare yourself! ***}
        workingTowards {*** Our time is at hand! Hurry! Get 1000 readers with -30 loyalty by the end of today! ***}
        other {*** We have no time! The people must be free! Spread negative news! ***}
      }`,
        { goalStatus }
      ),
      article: null,
      isInteresting: true,
      loyalty: LOYALTY_NONE,
      dayRangeStart: 10,
      dayRangeEnd: -1,
      messageType: 'rebelLeader',
    },
    {
      blurb: t('Terrorist rebel hideout near Central Chem destroyed'),
      article: t('Rebels Routed At Factory!'),
      isInteresting: true,
      loyalty: LOYALTY_UP,
      dayRangeStart: 7,
      dayRangeEnd: 100,
    },
    {
      blurb: t('Rebels at Central Chem sabotage important machinary'),
      article: t('Factory Sabotaged!'),
      isInteresting: true,
      loyalty: LOYALTY_DOWN,
      dayRangeStart: 8,
      dayRangeEnd: 100,
    },
    {
      blurb: t(
        `{governmentId, select,
          democria {Terrorist 2nd-in-command captured. Renounces fight against Democria}
          other {Terrorist 2nd-in-command captured. Renounces fight against Republia}
        }`,
        { governmentId }
      ),
      article: t('Terrorist Leader Buckles!'),
      isInteresting: true,
      loyalty: LOYALTY_UP,
      dayRangeStart: 9,
      dayRangeEnd: 100,
    },
    {
      blurb: t(
        'Rebels regroup in western towns. Growing in strength and number.'
      ),
      article: t('Rebels Gaining Support!'),
      isInteresting: true,
      loyalty: LOYALTY_DOWN,
      dayRangeStart: 10,
      dayRangeEnd: 100,
    },

    /*
        War messages (Interesting and Loyalty Up)
    */
    {
      blurb: t(
        `{governmentId, select,
        democria {Democria forces have destroyed Antegria’s illegal satellites}
        other {Republia forces have destroyed Antegria’s illegal satellites}
      }`,
        {
          governmentId,
        }
      ),
      article: t(
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
      blurb: t(
        `{governmentId, select,
          democria {Democria borders have been reinforced with 200,000 additional troops}
          other {Republia borders have been reinforced with 200,000 additional troops}
        }`,
        { governmentId }
      ),
      article: t('Borders Reinforced!'),
      isInteresting: true,
      loyalty: LOYALTY_UP,
    },
    {
      blurb: t(
        'State-of-the-art military spy satellites now used to reduce crime'
      ),
      article: t('Keeping An Eye On Crime!'),
      isInteresting: true,
      loyalty: LOYALTY_UP,
    },
    {
      blurb: t(
        `{governmentId, select,
          democria {Democria Navy commissions an additional 500 destroyers to patrol coast}
          other {Republia Navy commissions an additional 500 destroyers to patrol coast}
        }`,
        { governmentId }
      ),
      article: t('Safeguarding The Coasts!'),
      isInteresting: true,
      loyalty: LOYALTY_UP,
    },
    {
      blurb: t(
        `{governmentId, select,
        democria {Democria Air Force tactical fighter sets new speed record}
        other {Republia Air Force tactical fighter sets new speed record}
      }`,
        {
          governmentId,
        }
      ),
      article: t('Faster Fighter Flown!'),
      isInteresting: true,
      loyalty: LOYALTY_UP,
    },
    {
      blurb: t(
        'Multiple terrorist cells in central district foiled in operation'
      ),
      article: t('Central Terrorists Terminated!'),
      isInteresting: true,
      loyalty: LOYALTY_UP,
    },
    {
      blurb: t(
        `{governmentId, select,
          democria {Democria Army 5th Divison shuts down bomb factory in northern mountains}
          other {Republia Army 5th Divison shuts down bomb factory in northern mountains}
        }`,
        { governmentId }
      ),
      article: t('Bomb Factory Found, Destroyed!'),
      isInteresting: true,
      loyalty: LOYALTY_UP,
    },
    {
      blurb: t(
        `{governmentId, select,
          democria {Democria soldiers strongest in the world according to latest tests}
          other {Republia soldiers strongest in the world according to latest tests}
        }`,
        { governmentId }
      ),
      article: t('Our Boys Are the Best!'),
      isInteresting: true,
      loyalty: LOYALTY_UP,
    },
    {
      blurb: t('Peace enforcement squad rounds up 200 terrorist rebels'),
      article: t('Peace Restored, Rebels Captured!'),
      isInteresting: true,
      loyalty: LOYALTY_UP,
    },
    /*
        War messages (Interesting and Loyalty Down)
    */
    {
      blurb: t('40,000 gallons of military gasoline stolen from western bases'),
      article: t('Military Gas Gone!'),
      isInteresting: true,
      loyalty: LOYALTY_DOWN,
    },
    {
      blurb: t('Critical oil fields in the north have been sabotaged'),
      article: t('Pipelines Crippled!'),
      isInteresting: true,
      loyalty: LOYALTY_DOWN,
    },
    {
      blurb: t(
        'Terrorist bomb explodes on northern bay ferry. 600 people missing'
      ),
      article: t('Explosion Rocks The Seas!'),
      isInteresting: true,
      loyalty: LOYALTY_DOWN,
    },
    {
      blurb: t(
        `{governmentId, select,
          democria {Democria Air Force tactical fighter test flight ends in crash. Crew lost}
          other {Republia Air Force tactical fighter test flight ends in crash. Crew lost}
        }`,
        { governmentId }
      ),
      article: t('Futuristic Fight Crashes, Burns!'),
      isInteresting: true,
      loyalty: LOYALTY_DOWN,
    },
    {
      blurb: t(
        `{governmentId, select,
          democria {Democria Navy identifies critical fault in all operational submarines}
          other {Republia Navy identifies critical fault in all operational submarines}
        }`,
        { governmentId }
      ),
      article: t('Our Subs Are Faulty!'),
      isInteresting: true,
      loyalty: LOYALTY_DOWN,
    },
    {
      blurb: t(
        'The top general in charge of southern forces has died suddenly'
      ),
      article: t('General Dies Overnight!'),
      isInteresting: true,
      loyalty: LOYALTY_DOWN,
    },
    {
      blurb: t(
        `{governmentId, select,
          democria {Antegria secret code remains unbreakable. Top Democria minds are flumoxed}
          other {Antegria secret code remains unbreakable. Top Republia minds are flumoxed}
        }`,
        { governmentId }
      ),
      article: t('The Enemy’s Unbreakable Code!'),
      isInteresting: true,
      loyalty: LOYALTY_DOWN,
    },
    {
      blurb: t(
        'Tank production falls behind schedule. Poor factory conditions blamed'
      ),
      article: t('Tanking Tanks!'),
      isInteresting: true,
      loyalty: LOYALTY_DOWN,
    },
    {
      blurb: t(
        `{governmentId, select,
          democria {Worldwide survey finds Democria soldiers worst trained, with worst aim}
          other {Worldwide survey finds Republia soldiers worst trained, with worst aim}
        }`,
        { governmentId }
      ),
      article: t('Our Boys Can’t Fire Straight!'),
      isInteresting: true,
      loyalty: LOYALTY_DOWN,
    },
    {
      blurb: t(
        `{governmentId, select,
        democria {Antegria Navy sinks Democria battleship off eastern coast}
        other {Antegria Navy sinks Republia battleship off eastern coast}
      }`,
        {
          governmentId,
        }
      ),
      article: t(
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
      blurb: t('The Honorable and Great Leader awarded Lifetime Glory medal'),
      article: t('A Lifetime of Glory!'),
      isInteresting: false,
      loyalty: LOYALTY_UP,
    },
    {
      blurb: t(
        'Agricultural output from the farming sector doubles for 10th straight month'
      ),
      article: t('More Corn Than Air!'),
      isInteresting: false,
      loyalty: LOYALTY_UP,
    },
    {
      blurb: t(
        'Income reallocation scheme contributes 400 million to schools. Proves system works'
      ),
      article: t('Education Spending Up!'),
      isInteresting: false,
      loyalty: LOYALTY_UP,
    },
    {
      blurb: t('Latest polls show broad satisfaction with government leaders'),
      article: t('Politics Polls Positive!'),
      isInteresting: false,
      loyalty: LOYALTY_UP,
    },
    {
      blurb: t('Newest regional administrator fights for worker’s rights'),
      article: t('Power To The People!'),
      isInteresting: false,
      loyalty: LOYALTY_UP,
    },
    /*
        Political messages (Not Interesting and Loyalty Down)
    */
    {
      blurb: t(
        'Party officials have voted to adjust ration quotas for all orphans'
      ),
      article: t('Less Food For Orphans'),
      isInteresting: false,
      loyalty: LOYALTY_DOWN,
    },
    {
      blurb: t(
        'The Honorable and Great Leader photographed in women’s clothes'
      ),
      article: t('Great Leader, In A Dress!'),
      isInteresting: false,
      loyalty: LOYALTY_DOWN,
    },
    {
      blurb: t(
        '30,000 teachers and academics reassigned to more useful labor tasks'
      ),
      article: t('Educators Punished For Being Smart!'),
      isInteresting: false,
      loyalty: LOYALTY_DOWN,
    },
    {
      blurb: t(
        'Local citizen council votes will be eliminated in favor of suggestive comments'
      ),
      article: t('Local Councils Lose Vote!'),
      isInteresting: false,
      loyalty: LOYALTY_DOWN,
    },
    {
      blurb: t(
        'Yearly donations to the state must increase to support growing government oversight'
      ),
      article: t('Taxes Rise For 8th Year!'),
      isInteresting: false,
      loyalty: LOYALTY_DOWN,
    },

    /*
        Weather messages (Interesting and no Loyalty effect)
    */
    {
      blurb: t('Weather: Skies and temperatures will remain calm today'),
      article: t('Another Sunny Day!'),
      isInteresting: true,
      loyalty: LOYALTY_NONE,
      messageType: 'weather',
    },
    {
      blurb: t('Weather: Storms predicted to wash western coast out to sea'),
      article: t('Western Storms Threaten Coast!'),
      isInteresting: true,
      loyalty: LOYALTY_NONE,
      messageType: 'weather',
    },
    {
      blurb: t('Weather: Forecast expects heavy rains in the north and east'),
      article: t('Showers Rain Down!'),
      isInteresting: true,
      loyalty: LOYALTY_NONE,
      messageType: 'weather',
    },
    {
      blurb: t('Weather: Expect unseasonal snow in the south'),
      article: t('Blizzard Incoming?'),
      isInteresting: true,
      loyalty: LOYALTY_NONE,
      messageType: 'weather',
    },
    {
      blurb: t('Weather: Sunny morning and cloudy evening for the day'),
      article: t('Warm To Cloudy!'),
      isInteresting: true,
      loyalty: LOYALTY_NONE,
      messageType: 'weather',
    },
    {
      blurb: t('Weather: Light showers throughout the day'),
      article: t('Warm To Cloudy This Week!'),
      isInteresting: true,
      loyalty: LOYALTY_NONE,
      messageType: 'weather',
    },
    {
      blurb: t('Weather: Hurricane-level winds spotted off eastern coast'),
      article: t('Eastern Hurricanes Return!'),
      isInteresting: true,
      loyalty: LOYALTY_NONE,
      messageType: 'weather',
    },
    {
      blurb: t('Weather: Clear skies and no sign of rain'),
      article: t('Another Dry Day!'),
      isInteresting: true,
      loyalty: LOYALTY_NONE,
      messageType: 'weather',
    },
    {
      blurb: t(
        'Weather: Freezing sleet and snow expected in northern mountains'
      ),
      article: t('Buckle Down For Ice!'),
      isInteresting: true,
      loyalty: LOYALTY_NONE,
      messageType: 'weather',
    },
    {
      blurb: t('Weather: Tropical breezes blow across southeastern coast'),
      article: t('Sea Breeze Incoming!'),
      isInteresting: true,
      loyalty: LOYALTY_NONE,
      messageType: 'weather',
    },

    /*
        Sports messages (Interesting and Loyalty Up)
    */
    {
      blurb: t(
        `{governmentId, select,
        democria {Democria National Team has won the global football tournament}
        other {Republia National Team has won the global football tournament}
      }`,
        {
          governmentId,
        }
      ),
      article: t(
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
      blurb: t(
        `{governmentId, select,
        democria {Antegria ski team soundly defeated by Democria crew}
        other {Antegria ski team soundly defeated by Republia crew}
      }`,
        { governmentId }
      ),
      article: t(
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
      blurb: t('Tennis star Restojiu powers through semifinal brackets'),
      article: t('Tennis Star Advances!'),
      isInteresting: true,
      loyalty: LOYALTY_UP,
    },
    {
      blurb: t(
        `{governmentId, select,
          democria {Young Democria atheletes dominate track and field. May win Olympic gold}
          other {Young Republia atheletes dominate track and field. May win Olympic gold}
        }`,
        { governmentId }
      ),
      article: t('Our Young Heroes!'),
      isInteresting: true,
      loyalty: LOYALTY_UP,
    },
    {
      blurb: t(
        `{governmentId, select,
          democria {Skilled Democria baseball team finishes record season. Thanks Leader for support}
          other {Skilled Republia baseball team finishes record season. Thanks Leader for support}
        }`,
        { governmentId }
      ),
      article: t('Baseball Success Sealed!'),
      isInteresting: true,
      loyalty: LOYALTY_UP,
    },
    /*
        Sports messages (Interesting and no Loyalty effect)
    */
    {
      blurb: t(
        'Championship weight lifter Lekshou retires due to crippling injury'
      ),
      article: t('Muscleman Retires!'),
      isInteresting: true,
      loyalty: LOYALTY_NONE,
    },
    /*
        Sports messages (Interesting and Loyalty Down)
    */
    {
      blurb: t(
        `{governmentId, select,
          democria {Democria National Football Team has lost the regional finals to Antegria}
          other {Republia National Football Team has lost the regional finals to Antegria}
        }`,
        { governmentId }
      ),
      article: t(
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
      blurb: t(
        `{governmentId, select,
        democria {Entire Democria National Hockey team killed in plane crash}
        other {Entire Republia National Hockey team killed in plane crash}
      }`,
        {
          governmentId,
        }
      ),
      article: t('Tragedy Strikes Hockey!'),
      isInteresting: true,
      loyalty: LOYALTY_DOWN,
    },
    {
      blurb: t(
        `{governmentId, select,
        democria {Athletic training in Democria is years behind the competition}
        other {Athletic training in Republia is years behind the competition}
      }`,
        {
          governmentId,
        }
      ),
      article: t('Our Athletes: Behind The Curve?'),
      isInteresting: true,
      loyalty: LOYALTY_DOWN,
    },
    {
      blurb: t('National kayaking team has defected to Antegria'),
      article: t('Kayaking For The Enemy!'),
      isInteresting: true,
      loyalty: LOYALTY_DOWN,
    },

    /*
        Entertainment messages (Interesting and Loyalty Up)
    */
    {
      blurb: t(
        'Cherrywood’s newest stars attended recent gala ball to honor verterans'
      ),
      article: t('Stars Dance For Vets!'),
      isInteresting: true,
      loyalty: LOYALTY_UP,
    },
    {
      blurb: t(
        `{governmentId, select,
          other {New fall TV programming will focus on Republia’s rebuilding}
        }`,
        { governmentId }
      ),
      article: t('Fall TV Revealaed!'),
      isInteresting: true,
      loyalty: LOYALTY_UP,
    },
    {
      blurb: t(
        'Beloved children’s book "Mumpit Mush" finally coming to the big screen'
      ),
      article: t('Mumpit Mush Is Coming!'),
      isInteresting: true,
      loyalty: LOYALTY_UP,
    },
    {
      blurb: t(
        'Superstars Chad and Jenlyn preparing for Cherrywood wedding tomorrow'
      ),
      article: t('C&J To Tie the Knot!'),
      isInteresting: true,
      loyalty: LOYALTY_UP,
      dayRangeStart: 2,
      dayRangeEnd: -1,
    },
    {
      blurb: t('Superstars Chad and Jenlyn marry in extravagant festival'),
      article: t('C&J Finally Hitched!'),
      isInteresting: true,
      loyalty: LOYALTY_UP,
      dayRangeStart: 3,
      dayRangeEnd: -1,
    },
    /*
        Entertainment messages (Interesting and no Loyalty effect)
    */
    {
      blurb: t('"My butt is not too fat, just right" claims TV star Aprelica'),
      article: t('Butt Within Spec!'),
      isInteresting: true,
      loyalty: LOYALTY_NONE,
    },
    /*
        Entertainment messages (Interesting and Loyalty Down)
    */
    {
      blurb: t('Reality star Mestonda found dead from apparent overdose'),
      article: t('Reality Star Overdoses!'),
      isInteresting: true,
      loyalty: LOYALTY_DOWN,
    },
    {
      blurb: t('Fashion designer CrevyCrevy has defected to Antegria'),
      article: t('Fashion Icon Defects!'),
      isInteresting: true,
      loyalty: LOYALTY_DOWN,
    },
    {
      blurb: t(
        'Mega-group HugginBoyz admits to not singing on any albums, can barely dance'
      ),
      article: t('HugginBoyz: Talentless After All!'),
      isInteresting: true,
      loyalty: LOYALTY_DOWN,
    },
    {
      blurb: t(
        'Superstars Chad and Jenlyn file for divorce. Both claim infidelity'
      ),
      article: t('C&J Fairytale Ends!'),
      isInteresting: true,
      loyalty: LOYALTY_DOWN,
      dayRangeStart: 6,
      dayRangeEnd: -1,
    },
  ]
}
