const Immutable = require( "immutable" );
const LOYALTY_NONE = 0;

function createWeatherStory( blurbText, articleText ) {
	return Immutable.Map({
		loyalty: LOYALTY_NONE,
		interesting: true,
		blurbText,
		articleText
	});
}
