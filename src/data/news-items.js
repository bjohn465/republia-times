const Immutable = require( "immutable" );
const LOYALTY_UP = 1;
const LOYALTY_NONE = 0;
const LOYALTY_DOWN = -1;

function createWeatherStory( { blurb, article } ) {
	return Immutable.Map({
		loyalty: LOYALTY_NONE,
		interesting: true,
		blurb,
		article
	});
}

function createPoliticalStory( { blurb, article, loyalty } ) {
	return Immutable.Map({
		loyalty,
		interesting: false,
		blurb,
		article
	});
}

const weatherStories = Immutable.Set(
	[
		{
			blurb: "Skies and temperatures will remain calm today",
			article: "Another Sunny Day!"
		},
		{
			blurb: "Storms predicted to wash western coast out to sea",
			article: "Western Storms Threaten Coast!"
		},
		{
			blurb: "Forecast expects heavy rains in the north and east",
			article: "Showers Rain Down!"
		},
		{
			blurb: "Expect unseasonal snow in the south",
			article: "Blizzard Incoming?"
		},
		{
			blurb: "Sunny morning and cloudy evening for the day",
			article: "Warm To Cloudy!"
		},
		{
			blurb: "Light showers throughout the day",
			article: "Warm To Cloudy This Week!"
		},
		{
			blurb: "Hurricane-level winds spotted off eastern coast",
			article: "Eastern Hurricanes Return!"
		},
		{
			blurb: "Clear skies and no sign of rain",
			article: "Another Dry Day!"
		},
		{
			blurb: "Freezing sleet and snow expected in northern mountains",
			article: "Buckle Down For Ice!"
		},
		{
			blurb: "Tropical breezes blow across southeastern coast",
			article: "Sea Breeze Incoming!"
		}
	].map( createWeatherStory )
);

const politicalStories = Immutable.Set(
	[
		{
			blurb: "The Honorable and Great Leader" +
				" awarded Lifetime Glory medal",
			article: "A Lifetime of Glory!",
			loyalty: LOYALTY_UP
		},
		{
			blurb: "Agricultural output from the farming sector doubles" +
				" for 10th straight month",
			article: "More Corn Than Air!",
			loyalty: LOYALTY_UP
		},
		{
			blurb: "Income reallocation scheme contributes 400 million" +
				" to schools. Proves system works",
			article: "Education Spending Up!",
			loyalty: LOYALTY_UP
		},
		{
			blurb: "Latest polls show broad satisfaction" +
				" with government leaders",
			article: "Politics Polls Positive!",
			loyalty: LOYALTY_UP
		},
		{
			blurb: "Newest regional administrator fights for worker's rights",
			article: "Power To The People!",
			loyalty: LOYALTY_UP
		},

		{
			blurb: "Party officials have voted to adjust ration quotas" +
				" for all orphans",
			article: "Less Food For Orphans",
			loyalty: LOYALTY_DOWN
		},
		{
			blurb: "The Honorable and Great Leader photographed" +
				" in women's clothes",
			article: "Great Leader, In A Dress!",
			loyalty: LOYALTY_DOWN
		},
		{
			blurb: "30,000 teachers and academics reassigned" +
				" to more useful labor tasks",
			article: "Educators Punished For Being Smart!",
			loyalty: LOYALTY_DOWN
		},
		{
			blurb: "Local citizen council votes will be eliminated" +
				" in favor of suggestive comments",
			article: "Local Councils Lose Vote!",
			loyalty: LOYALTY_DOWN
		},
		{
			blurb: "Yearly donations to the state must increase" +
				" to support growing government oversight",
			article: "Taxes Rise For 8th Year!",
			loyalty: LOYALTY_DOWN
		}
	].map( createPoliticalStory )
);

const allStories = Immutable.Set().concat(
	weatherStories,
	politicalStories
);

module.exports = allStories;
