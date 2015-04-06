const Immutable = require( "immutable" );
const LOYALTY_NONE = 0;

function createWeatherStory( [ blurbText, articleText ] ) {
	return Immutable.Map({
		loyalty: LOYALTY_NONE,
		interesting: true,
		blurbText,
		articleText
	});
}

const weatherStories = Immutable.Set(
	[
		[
			"Skies and temperatures will remain calm today",
			"Another Sunny Day!"
		],
		[
			"Storms predicted to wash western coast out to sea",
			"Western Storms Threaten Coast!"
		],
		[
			"Forecast expects heavy rains in the north and east",
			"Showers Rain Down!"
		],
		[
			"Expect unseasonal snow in the south",
			"Blizzard Incoming?"
		],
		[
			"Sunny morning and cloudy evening for the day",
			"Warm To Cloudy!"
		],
		[
			"Light showers throughout the day",
			"Warm To Cloudy This Week!"
		],
		[
			"Hurricane-level winds spotted off eastern coast",
			"Eastern Hurricanes Return!"
		],
		[
			"Clear skies and no sign of rain",
			"Another Dry Day!"
		],
		[
			"Freezing sleet and snow expected in northern mountains",
			"Buckle Down For Ice!"
		],
		[
			"Tropical breezes blow across southeastern coast",
			"Sea Breeze Incoming!"
		]
	].map( createWeatherStory )
);

const allStories = Immutable.Set().concat( weatherStories );

module.exports = allStories;
